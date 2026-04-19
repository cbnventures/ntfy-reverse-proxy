import { spawn } from 'node:child_process';
import {
  appendFileSync, existsSync, mkdtempSync, readFileSync, writeFileSync as writeTmp,
} from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import prompts from 'prompts';

/**
 * Scripts - Tail Logs.
 *
 * Stream Cloudflare Worker real-time logs to tail-logs.jsonl.
 * Auto-restarts wrangler tail before session expires.
 *
 * Uses Cloudflare API to fetch the real session expiry time
 * since wrangler suppresses status messages when piped.
 *
 * @since 2.0.0
 */
const OUTPUT_FILE = 'tail-logs.jsonl';
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';
const RESTART_BUFFER_MS = 300_000; // Restart 5 min before expiry.

/**
 * Scripts - Tail Logs - Load Token.
 *
 * @since 2.0.0
 */
function loadToken() {
  try {
    const env = readFileSync('.env', 'utf-8');
    const match = env.match(/CLOUDFLARE_API_TOKEN=["']?([^\s"']+)["']?/);

    if (match !== null && match[1] !== undefined && match[1] !== '') {
      return match[1];
    }
  } catch {
    // Ignore.
  }

  console.error('Missing CLOUDFLARE_API_TOKEN in .env');
  process.exit(1);
}

/**
 * Scripts - Tail Logs - Find Project Root.
 *
 * Walks up from cwd looking for a package.json with workspaces.
 *
 * @since 2.0.0
 */
function findProjectRoot() {
  let dir = process.cwd();

  while (dir !== dirname(dir)) {
    const pkgPath = join(dir, 'package.json');

    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

        if (pkg.workspaces !== undefined) {
          return dir;
        }
      } catch {
        // Ignore.
      }
    }

    dir = dirname(dir);
  }

  return undefined;
}

/**
 * Scripts - Tail Logs - Discover Configs.
 *
 * Searches cwd, project root, and config dir for config.json
 * files, matching the same strategy as the manage CLI.
 *
 * @since 2.0.0
 */
function discoverConfigs() {
  const candidates = [
    process.cwd(),
    findProjectRoot(),
    join(process.env.XDG_CONFIG_HOME ?? join(homedir(), '.config'), 'ntfy-reverse-proxy'),
  ];

  const seen = new Set();
  const found = [];

  for (const dir of candidates) {
    if (dir === undefined) {
      continue;
    }

    const resolved = resolve(dir);

    if (seen.has(resolved)) {
      continue;
    }

    seen.add(resolved);

    const configPath = join(resolved, 'config.json');

    if (existsSync(configPath)) {
      try {
        const config = JSON.parse(readFileSync(configPath, 'utf-8'));

        if (config.settings?.worker_name && config.settings?.base_domain) {
          found.push({
            path: configPath,
            workerName: config.settings.worker_name,
            baseDomain: config.settings.base_domain,
          });
        }
      } catch {
        // Ignore malformed configs.
      }
    }
  }

  return found;
}

/**
 * Scripts - Tail Logs - Choose Config.
 *
 * Prompts the user to select a config when multiple are found.
 *
 * @since 2.0.0
 */
async function chooseConfig() {
  const configs = discoverConfigs();

  if (configs.length === 0) {
    console.error('No config.json found with worker_name and base_domain in settings.');
    process.exit(1);
  }

  if (configs.length === 1) {
    return configs[0];
  }

  const response = await prompts({
    type: 'select',
    name: 'config',
    message: 'Which worker?',
    choices: configs.map((cfg) => ({
      title: `${cfg.workerName} (${cfg.path})`,
      value: cfg,
    })),
  });

  if (response.config === undefined) {
    process.exit(0);
  }

  return response.config;
}

/**
 * Scripts - Tail Logs - Get Account ID.
 *
 * @since 2.0.0
 */
async function getAccountId(token, baseDomain) {
  const parts = baseDomain.split('.');
  const domain = parts.slice(-2).join('.');
  const response = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${domain}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (data.success && data.result.length > 0) {
    return data.result[0].account.id;
  }

  throw new Error(`Failed to find account for ${domain}`);
}

/**
 * Scripts - Tail Logs - Get Tail Sessions.
 *
 * @since 2.0.0
 */
async function getTailSessions(token, accountId, scriptName) {
  const response = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (data.success) {
    return data.result;
  }

  return [];
}

/**
 * Scripts - Tail Logs - Delete Tail Session.
 *
 * @since 2.0.0
 */
async function deleteTailSession(token, accountId, id, scriptName) {
  await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * Scripts - Tail Logs - Cleanup Stale Sessions.
 *
 * @since 2.0.0
 */
async function cleanupStaleSessions(token, accountId, scriptName) {
  const sessions = await getTailSessions(token, accountId, scriptName);

  if (sessions.length > 0) {
    logSection('startup', c.dim(`Cleaning up ${sessions.length} stale session(s)...`));

    for (const session of sessions) {
      await deleteTailSession(token, accountId, session.id, scriptName);
    }
  }
}

/**
 * Scripts - Tail Logs - Format Timestamp.
 *
 * @since 2.0.0
 */
function formatTimestamp(ms) {
  return new Date(ms).toLocaleTimeString();
}

// ANSI color helpers.
const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  blue: (s) => `\x1b[34m${s}\x1b[0m`,
};

// Section-aware logger.
let lastSection = null;

function logSection(section, message) {
  if (lastSection !== null && (lastSection !== section || section === 'traffic')) {
    console.log('');
  }

  console.log(message);
  lastSection = section;
}

/**
 * Scripts - Tail Logs - Format Method.
 *
 * @since 2.0.0
 */
function formatMethod(method) {
  switch (method) {
    case 'GET': return c.cyan(method);
    case 'POST': return c.green(method);
    case 'HEAD': return c.yellow(method);
    case 'EMAIL': return c.magenta(method);
    default: return c.dim(method);
  }
}

/**
 * Scripts - Tail Logs - Format Status.
 *
 * @since 2.0.0
 */
function formatStatus(status, hasError) {
  if (hasError) {
    return c.red('ERR');
  }

  if (typeof status === 'number' && status >= 400) {
    return c.red(`${status}`);
  }

  return c.green(`${status}`);
}

/**
 * Scripts - Tail Logs - Summarize Email Entry.
 *
 * @since 2.0.0
 */
function summarizeEmail(entry) {
  const logs = entry.logs ?? [];
  const timestamp = formatTimestamp(entry.eventTimestamp ?? Date.now());
  const lines = [];

  // Parse debug log for email metadata.
  let from = '?';
  let to = '?';
  let subject = '(none)';
  let context = '?';
  let interpreter = '?';
  let serverResults = [];

  for (const log of logs) {
    const msg = Array.isArray(log.message) ? log.message[0] : log.message;

    if (typeof msg !== 'string') {
      continue;
    }

    try {
      const parsed = JSON.parse(msg);

      if (parsed.debug === 'raw_email') {
        from = parsed.from ?? '?';
        to = parsed.to ?? '?';
        subject = parsed.subject || '(none)';
      } else if (parsed.context !== undefined) {
        context = parsed.context;
        interpreter = parsed.interpreter ?? '?';
        serverResults = parsed.servers ?? [];
      }
    } catch {
      // Not JSON.
    }
  }

  // Format recipient as just the local part.
  const toLocal = to.split('@')[0] ?? to;

  lines.push(`${c.dim(timestamp)} ${formatMethod('EMAIL')} ${c.bold(toLocal)}`);
  lines.push(`  ${c.dim('From:')} ${from} ${c.dim('|')} ${c.dim('Subject:')} ${subject}`);

  // Server results.
  if (serverResults.length > 0) {
    const results = serverResults.map((s) => {
      const icon = s.success ? c.green('OK') : c.red(`FAIL ${s.status ?? ''}`);

      return `${s.name}: ${icon}`;
    });

    lines.push(`  ${c.dim(`${context} (${interpreter})`)} ${c.dim('→')} ${results.join(` ${c.dim('|')} `)}`);
  }

  return lines.join('\n');
}

/**
 * Scripts - Tail Logs - Summarize HTTP Entry.
 *
 * @since 2.0.0
 */
function summarizeHttp(entry) {
  const event = entry.event ?? {};
  const request = event.request ?? {};
  const response = event.response ?? {};
  const cf = request.cf ?? {};
  const headers = request.headers ?? {};
  const logs = entry.logs ?? [];

  const method = request.method ?? '?';
  const status = response.status ?? '?';
  const url = request.url ?? '?';
  const asn = cf.asn ?? '?';
  const org = cf.asOrganization ?? '?';
  const http = cf.httpProtocol ?? '?';
  const country = cf.country ?? '?';
  const ua = headers['user-agent'] ?? '-';
  const timestamp = formatTimestamp(entry.eventTimestamp ?? Date.now());
  const outcome = entry.outcome ?? '?';

  const exceptions = entry.exceptions ?? [];
  const hasError = exceptions.length > 0 || outcome !== 'ok';

  const lines = [];

  lines.push(`${c.dim(timestamp)} ${formatMethod(method)} ${formatStatus(status, hasError)} ${c.bold(url)} ${c.dim(`${http} | ${country} | ${org} (ASN:${asn})`)}`);

  if (ua !== '-') {
    lines.push(`  ${c.dim(ua.substring(0, 80))}`);
  }

  // Parse interpreter results from logs.
  for (const log of logs) {
    const msg = Array.isArray(log.message) ? log.message[0] : log.message;

    if (typeof msg !== 'string') {
      continue;
    }

    try {
      const parsed = JSON.parse(msg);

      if (parsed.context !== undefined && parsed.servers !== undefined) {
        const results = parsed.servers.map((s) => {
          const icon = s.success ? c.green('OK') : c.red(`FAIL ${s.status ?? ''}`);

          return `${s.name}: ${icon}`;
        });

        lines.push(`  ${c.dim(`${parsed.context} (${parsed.interpreter})`)} ${c.dim('→')} ${results.join(` ${c.dim('|')} `)}`);
      } else if (parsed.debug === 'raw_request') {
        lines.push(`  ${c.dim(`type: ${parsed.type}`)}`);
      }
    } catch {
      // Not JSON — show as-is.
      if (log.level === 'error') {
        lines.push(`  ${c.red('ERR:')} ${msg.substring(0, 150)}`);
      }
    }
  }

  for (const ex of exceptions) {
    const msg = typeof ex.message === 'string' ? ex.message : JSON.stringify(ex);
    lines.push(`  ${c.red('EXC:')} ${msg.substring(0, 150)}`);
  }

  return lines.join('\n');
}

/**
 * Scripts - Tail Logs - Summarize Entry.
 *
 * @since 2.0.0
 */
function summarize(entry) {
  const event = entry.event ?? {};
  const request = event.request ?? {};

  // Email events have no request method.
  if (request.method === undefined) {
    return summarizeEmail(entry);
  }

  return summarizeHttp(entry);
}

/**
 * Scripts - Tail Logs - Start Tail.
 *
 * @since 2.0.0
 */
let shuttingDown = false;

async function startTail(token, accountId, scriptName) {
  try {
    await cleanupStaleSessions(token, accountId, scriptName);
  } catch {
    logSection('startup', c.yellow('Could not clean up stale sessions (API unreachable). Continuing...'));
  }

  logSection('connection', c.green('Connecting...'));

  // Spawn wrangler from a temp directory so it doesn't read the project's .env file.
  // The .env token is for deploy only — wrangler tail uses OAuth from `wrangler login`.
  const tailDir = mkdtempSync(join(tmpdir(), 'nrp-tail-'));

  writeTmp(join(tailDir, 'wrangler.toml'), `name = "${scriptName}"\n`);

  const tail = spawn('npx', [
    'wrangler',
    'tail',
    '--format',
    'json',
  ], {
    stdio: [
      'ignore',
      'pipe',
      'pipe',
    ],
    cwd: tailDir,
  });

  let restartTimer;

  /**
   * Scripts - Tail Logs - Schedule Restart.
   *
   * Fetches the real session expiry from the Cloudflare API
   * and sets a timer to restart before it expires.
   *
   * @since 2.0.0
   */
  async function scheduleRestart() {
    try {
      const sessions = await getTailSessions(token, accountId, scriptName);

      if (sessions.length > 0) {
        const latest = sessions.sort((a, b) => new Date(b.expires_at).getTime() - new Date(a.expires_at).getTime())[0];
        const expiresAt = new Date(latest.expires_at);
        const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MS);
        const restartMs = restartAt.getTime() - Date.now();

        if (restartMs > 0) {
          clearTimeout(restartTimer);

          restartTimer = setTimeout(() => {
            logSection('restart', c.yellow('Session expiring. Restarting...'));
            tail.kill();
          }, restartMs);

          return expiresAt;
        }
      }
    } catch {
      // API call failed.
    }

    return null;
  }

  // Initial check after wrangler creates the session.
  setTimeout(async () => {
    const expiresAt = await scheduleRestart();

    if (expiresAt !== null) {
      const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MS);

      logSection('connection', c.green(`Connected. Session expires at ${formatTimestamp(expiresAt.getTime())}, restart at ${formatTimestamp(restartAt.getTime())}`));
    } else {
      logSection('connection', c.green('Connected (could not fetch session expiry).'));
    }
  }, 5_000);

  // Periodic check every 30 minutes to keep the restart timer accurate.
  const checkInterval = setInterval(async () => {
    const expiresAt = await scheduleRestart();

    if (expiresAt !== null) {
      const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MS);

      logSection('session', c.dim(`Session check: expires at ${formatTimestamp(expiresAt.getTime())}, restart at ${formatTimestamp(restartAt.getTime())}`));
    }
  }, 1_800_000);

  let jsonBuffer = '';
  let jsonDepth = 0;
  let inObject = false;

  function processChunk(chunk) {
    const text = chunk.toString();

    for (const char of text) {
      if (char === '{') {
        if (!inObject) {
          inObject = true;
          jsonBuffer = '';
        }

        jsonDepth += 1;
      }

      if (inObject) {
        jsonBuffer += char;
      }

      if (char === '}') {
        jsonDepth -= 1;

        if (inObject && jsonDepth === 0) {
          inObject = false;

          try {
            const entry = JSON.parse(jsonBuffer);
            const compact = JSON.stringify(entry);

            appendFileSync(OUTPUT_FILE, `${compact}\n`);
            logSection('traffic', summarize(entry));
          } catch {
            // Malformed JSON — skip.
          }

          jsonBuffer = '';
        }
      }
    }
  }

  tail.stdout.on('data', (chunk) => {
    processChunk(chunk);
  });

  tail.stderr.on('data', (chunk) => {
    processChunk(chunk);
  });

  tail.on('error', (err) => {
    console.error(`Spawn error: ${err.message}`);
  });

  tail.on('close', () => {
    clearTimeout(restartTimer);
    clearInterval(checkInterval);

    if (shuttingDown) {
      return;
    }

    logSection('restart', c.yellow('Tail ended. Restarting in 5 seconds...'));
    setTimeout(() => startTail(token, accountId, scriptName), 5_000);
  });
}

// Main.
const config = await chooseConfig();
const token = loadToken();

logSection('startup', c.dim(`Tailing ${c.bold(config.workerName)} to ${OUTPUT_FILE} (Ctrl+C to stop)...`));

const accountId = await getAccountId(token, config.baseDomain);

// Clean exit on Ctrl+C — cleanup stale sessions before exiting.
async function shutdown() {
  if (shuttingDown) {
    process.exit(1);
  }

  shuttingDown = true;

  logSection('shutdown', c.dim('Cleaning up...'));
  await cleanupStaleSessions(token, accountId, config.workerName);
  logSection('shutdown', c.dim('Stopped.'));
  process.exit(0);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

startTail(token, accountId, config.workerName);
