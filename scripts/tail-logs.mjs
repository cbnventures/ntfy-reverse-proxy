import { spawn } from 'node:child_process';
import {
  appendFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import prompts from 'prompts';

import { PATTERN_CLOUDFLARE_API_TOKEN } from './lib/regex.mjs';

/**
 * Tail Logs - Toolkit.
 *
 * Holds nova's toolkit namespace, populated by the guarded dynamic import below
 * so this maintenance script fails loudly when nova is unbuilt.
 *
 * @since 2.0.0
 */
let toolkit = /** @type {typeof import('@cbnventures/nova/toolkit') | undefined} */ (undefined);

try {
  toolkit = await import('@cbnventures/nova/toolkit');
} catch {
  process.stderr.write('tail-logs.mjs: requires @cbnventures/nova to be built. Run "npm run build" first.\n');

  process.exit(1);
}

/**
 * Tail Logs - Bootstrap.
 *
 * Holds nova's Bootstrap toolkit battery, read from the namespace above so
 * config directory lookups run only once nova has been built.
 *
 * @since 2.0.0
 */
const bootstrap = toolkit['Bootstrap'];

/**
 * Tail Logs - Logger.
 *
 * Holds nova's Logger toolkit battery, read from the namespace above so status
 * output flows through the project logging format.
 *
 * @since 2.0.0
 */
const logger = toolkit['Logger'];

/**
 * Tail Logs - Output File.
 *
 * Streams Cloudflare Worker real-time logs to this file and auto-restarts
 * wrangler tail before the session expires, reading the real expiry from the
 * Cloudflare API since wrangler suppresses status messages when piped.
 *
 * @since 2.0.0
 */
const OUTPUT_FILE = 'tail-logs.jsonl';

/**
 * Tail Logs - Cloudflare API Base.
 *
 * Base URL for the Cloudflare v4 REST API used to look up the account and
 * manage tail sessions for the worker being streamed.
 *
 * @since 2.0.0
 */
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

/**
 * Tail Logs - Restart Buffer Ms.
 *
 * Milliseconds ahead of the reported session expiry to trigger a restart so
 * the stream reconnects before Cloudflare tears the old session down.
 *
 * @since 2.0.0
 */
const RESTART_BUFFER_MS = 300_000; // Restart 5 min before expiry.

/**
 * Tail Logs - Tail Session.
 *
 * Shape of one Cloudflare tail session as returned by the API, limited to the
 * id used for deletion and the expiry used to schedule restarts.
 *
 * @typedef {{ id: string, expires_at: string }} TailSession
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Server Result.
 *
 * Shape of one per-server interpreter result parsed out of a debug log line so
 * the summary can print each server outcome.
 *
 * @typedef {{ name?: string, success?: boolean, status?: number }} ServerResult
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Request Cf.
 *
 * Shape of the Cloudflare metadata block attached to a tail request, covering
 * only the network fields printed on the request line.
 *
 * @typedef {{ asn?: number, asOrganization?: string, httpProtocol?: string, country?: string }} TailRequestCf
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Request.
 *
 * Shape of the request block inside a tail event, covering the method, url,
 * Cloudflare metadata, and headers the summary reads.
 *
 * @typedef {{ method?: string, url?: string, cf?: TailRequestCf, headers?: Record<string, string> }} TailRequest
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Response.
 *
 * Shape of the response block inside a tail event, holding only the status code
 * shown next to the request line.
 *
 * @typedef {{ status?: number }} TailResponse
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Event.
 *
 * Shape of the event block inside a tail entry, holding the request and
 * response pair for HTTP events.
 *
 * @typedef {{ request?: TailRequest, response?: TailResponse }} TailEvent
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Log.
 *
 * Shape of one console log record inside a tail entry, whose message may be a
 * single value or an array of values.
 *
 * @typedef {{ message?: unknown, level?: string }} TailLog
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Exception.
 *
 * Shape of one uncaught exception record inside a tail entry, whose message is
 * printed when present.
 *
 * @typedef {{ message?: unknown }} TailException
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - Tail Entry.
 *
 * Shape of one wrangler tail entry, covering only the fields the summarizers
 * read out of the streamed JSON.
 *
 * @typedef {{ event?: TailEvent, logs?: TailLog[], eventTimestamp?: number, outcome?: string, exceptions?: TailException[] }} TailEntry
 *
 * @since 2.0.0
 */

/**
 * Tail Logs - C.
 *
 * ANSI color helpers that wrap a string in a terminal escape sequence and a
 * reset so streamed log lines render with color in the console.
 *
 * @since 2.0.0
 */
const c = {
  dim: (/** @type {string} */ s) => `\x1b[2m${s}\x1b[0m`,
  bold: (/** @type {string} */ s) => `\x1b[1m${s}\x1b[0m`,
  green: (/** @type {string} */ s) => `\x1b[32m${s}\x1b[0m`,
  red: (/** @type {string} */ s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (/** @type {string} */ s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (/** @type {string} */ s) => `\x1b[36m${s}\x1b[0m`,
  magenta: (/** @type {string} */ s) => `\x1b[35m${s}\x1b[0m`,
  blue: (/** @type {string} */ s) => `\x1b[34m${s}\x1b[0m`,
};

/**
 * Tail Logs - Load Token.
 *
 * Reads the Cloudflare API token from the project .env file, exiting with an
 * error when it is missing so downstream API calls never run unauthenticated.
 *
 * @since 2.0.0
 */
function loadToken() {
  try {
    const env = readFileSync('.env', 'utf-8');
    const match = env.match(PATTERN_CLOUDFLARE_API_TOKEN);

    if (
      match !== null
      && match[1] !== undefined
      && match[1] !== ''
    ) {
      return match[1];
    }
  } catch {
    // Ignore.
  }

  logger.error('Missing CLOUDFLARE_API_TOKEN in .env');

  process.exit(1);
}

/**
 * Tail Logs - Find Project Root.
 *
 * Walks up from cwd looking for a package.json that declares workspaces so the
 * monorepo root can be searched for a matching config file.
 *
 * @since 2.0.0
 */
function findProjectRoot() {
  let dir = process.cwd();

  while (dir !== dirname(dir)) {
    const pkgPath = join(dir, 'package.json');

    if (existsSync(pkgPath) === true) {
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
 * Tail Logs - Discover Configs.
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
    bootstrap.getConfigDir('ntfy-reverse-proxy'),
  ];

  const seen = new Set();
  const found = [];

  for (const dir of candidates) {
    if (dir === undefined) {
      continue;
    }

    const resolved = resolve(dir);

    if (seen.has(resolved) === true) {
      continue;
    }

    seen.add(resolved);

    const configPath = join(resolved, 'config.json');

    if (existsSync(configPath) === true) {
      try {
        const config = JSON.parse(readFileSync(configPath, 'utf-8'));
        const settings = config.settings;

        if (
          settings !== undefined
          && settings !== null
          && settings.worker_name !== undefined
          && settings.worker_name !== null
          && settings.worker_name !== ''
          && settings.base_domain !== undefined
          && settings.base_domain !== null
          && settings.base_domain !== ''
        ) {
          found.push({
            path: configPath,
            workerName: settings.worker_name,
            baseDomain: settings.base_domain,
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
 * Tail Logs - Choose Config.
 *
 * Discovers candidate configs and prompts the user to choose when several are
 * found, exiting cleanly when none exist or the prompt is cancelled.
 *
 * @since 2.0.0
 */
async function chooseConfig() {
  const configs = discoverConfigs();

  if (configs.length === 0) {
    logger.error('No config.json found with worker_name and base_domain in settings.');

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
      title: `${cfg['workerName']} (${cfg['path']})`,
      value: cfg,
    })),
  });

  if (response.config === undefined) {
    process.exit(0);
  }

  return response.config;
}

/**
 * Tail Logs - Get Account ID.
 *
 * Resolves the Cloudflare account id for the worker by querying the zone that
 * owns the registrable part of the configured base domain.
 *
 * @param {string} token      - Token.
 * @param {string} baseDomain - Base domain.
 *
 * @returns {Promise<string>}
 *
 * @since 2.0.0
 */
async function getAccountId(token, baseDomain) {
  const parts = baseDomain.split('.');
  const candidates = parts.slice(0, parts.length - 1).map((_unused, i) => parts.slice(i).join('.'));

  for (const candidate of candidates) {
    const response = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${candidate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = /** @type {{ success: boolean, result: { account: { id: string } }[] }} */ (await response.json());

    if (data['success'] === true && data['result'].length > 0) {
      const zone = data['result'][0];

      if (zone !== undefined) {
        return zone['account']['id'];
      }
    }
  }

  throw new Error(`Failed to find account for ${baseDomain}`);
}

/**
 * Tail Logs - Get Tail Sessions.
 *
 * Lists the active tail sessions Cloudflare currently holds for the worker so
 * stale ones can be cleaned up and expiry times can be read.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<TailSession[]>}
 *
 * @since 2.0.0
 */
async function getTailSessions(token, accountId, scriptName) {
  const response = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = /** @type {{ success: boolean, result: TailSession[] }} */ (await response.json());

  if (data['success'] === true) {
    return data['result'];
  }

  return [];
}

/**
 * Tail Logs - Delete Tail Session.
 *
 * Deletes a single tail session by id through the Cloudflare API so expired or
 * orphaned sessions do not accumulate against the worker.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} id         - Id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function deleteTailSession(token, accountId, id, scriptName) {
  await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts/${scriptName}/tails/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  return;
}

/**
 * Tail Logs - Cleanup Stale Sessions.
 *
 * Removes every tail session Cloudflare still holds for the worker so a fresh
 * stream starts without hitting the per-worker session limit.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function cleanupStaleSessions(token, accountId, scriptName) {
  const sessions = await getTailSessions(token, accountId, scriptName);

  if (sessions.length > 0) {
    logSection('startup', c.dim(`Cleaning up ${sessions.length} stale session(s)...`));

    for (const session of sessions) {
      await deleteTailSession(token, accountId, session['id'], scriptName);
    }
  }

  return;
}

/**
 * Tail Logs - Format Timestamp.
 *
 * Formats an epoch milliseconds value as a local time-of-day string for the
 * timestamp shown at the start of each streamed log line.
 *
 * @param {number} ms - Ms.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatTimestamp(ms) {
  return new Date(ms).toLocaleTimeString();
}

/**
 * Tail Logs - Last Section.
 *
 * Tracks the section of the previously printed line so logSection can insert a
 * blank separator whenever the section changes or traffic repeats.
 *
 * @since 2.0.0
 */
let lastSection = /** @type {string | null} */ (null);

/**
 * Tail Logs - Log Section.
 *
 * Prints a message, inserting a blank line first whenever the section changes
 * or a traffic line repeats so grouped output stays visually separated.
 *
 * @param {string} section - Section.
 * @param {string} message - Message.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function logSection(section, message) {
  if (
    lastSection !== null
    && (
      lastSection !== section
      || section === 'traffic'
    )
  ) {
    process.stdout.write('\n');
  }

  process.stdout.write(`${message}\n`);
  lastSection = section;

  return;
}

/**
 * Tail Logs - Format Method.
 *
 * Colors an HTTP method name (or the EMAIL pseudo-method) so request lines are
 * quick to scan, dimming any unrecognized value.
 *
 * @param {string} method - Method.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatMethod(method) {
  switch (method) {
    case 'GET': {
      return c.cyan(method);
    }

    case 'POST': {
      return c.green(method);
    }

    case 'HEAD': {
      return c.yellow(method);
    }

    case 'EMAIL': {
      return c.magenta(method);
    }

    default: {
      return c.dim(method);
    }
  }
}

/**
 * Tail Logs - Format Status.
 *
 * Colors a response status for display, showing red for errors or 4xx and 5xx
 * codes and green otherwise so failures stand out in the stream.
 *
 * @param {number | string} status   - Status.
 * @param {boolean}         hasError - Has error.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function formatStatus(status, hasError) {
  if (hasError === true) {
    return c.red('ERR');
  }

  if (typeof status === 'number' && status >= 400) {
    return c.red(`${status}`);
  }

  return c.green(`${status}`);
}

/**
 * Tail Logs - Summarize Email.
 *
 * Builds the colored multi-line summary for an email event, parsing the debug
 * logs for sender, recipient, subject, and per-server interpreter results.
 *
 * @param {TailEntry} entry - Entry.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function summarizeEmail(entry) {
  const logs = entry['logs'] ?? [];
  const timestamp = formatTimestamp(entry['eventTimestamp'] ?? Date.now());
  const lines = [];

  // Parse debug log for email metadata.
  let from = '?';
  let to = '?';
  let subject = '(none)';
  let context = '?';
  let interpreter = '?';
  let serverResults = /** @type {ServerResult[]} */ ([]);

  for (const log of logs) {
    const msg = (Array.isArray(log['message']) === true) ? log['message'][0] : log['message'];

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
      const icon = (s['success'] === true) ? c.green('OK') : c.red(`FAIL ${s['status'] ?? ''}`);

      return `${s['name']}: ${icon}`;
    });

    lines.push(`  ${c.dim(`${context} (${interpreter})`)} ${c.dim('→')} ${results.join(` ${c.dim('|')} `)}`);
  }

  return lines.join('\n');
}

/**
 * Tail Logs - Summarize HTTP.
 *
 * Builds the colored multi-line summary for an HTTP event, parsing request and
 * response metadata plus any interpreter results and exceptions in the logs.
 *
 * @param {TailEntry} entry - Entry.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function summarizeHttp(entry) {
  const event = /** @type {TailEvent} */ (entry['event'] ?? {});
  const request = /** @type {TailRequest} */ (event['request'] ?? {});
  const response = /** @type {TailResponse} */ (event['response'] ?? {});
  const cf = /** @type {TailRequestCf} */ (request['cf'] ?? {});
  const headers = /** @type {Record<string, string>} */ (request['headers'] ?? {});
  const logs = entry['logs'] ?? [];

  const method = request['method'] ?? '?';
  const status = response['status'] ?? '?';
  const url = request['url'] ?? '?';
  const asn = cf['asn'] ?? '?';
  const org = cf['asOrganization'] ?? '?';
  const http = cf['httpProtocol'] ?? '?';
  const country = cf['country'] ?? '?';
  const ua = headers['user-agent'] ?? '-';
  const timestamp = formatTimestamp(entry['eventTimestamp'] ?? Date.now());
  const outcome = entry['outcome'] ?? '?';

  const exceptions = entry['exceptions'] ?? [];
  const hasError = exceptions.length > 0 || outcome !== 'ok';

  const lines = [];

  lines.push(`${c.dim(timestamp)} ${formatMethod(method)} ${formatStatus(status, hasError)} ${c.bold(url)} ${c.dim(`${http} | ${country} | ${org} (ASN:${asn})`)}`);

  if (ua !== '-') {
    lines.push(`  ${c.dim(ua.substring(0, 80))}`);
  }

  // Parse interpreter results from logs.
  for (const log of logs) {
    const msg = (Array.isArray(log['message']) === true) ? log['message'][0] : log['message'];

    if (typeof msg !== 'string') {
      continue;
    }

    try {
      const parsed = JSON.parse(msg);

      if (parsed.context !== undefined && parsed.servers !== undefined) {
        const results = parsed.servers.map((/** @type {ServerResult} */ s) => {
          const icon = (s['success'] === true) ? c.green('OK') : c.red(`FAIL ${s['status'] ?? ''}`);

          return `${s['name']}: ${icon}`;
        });

        lines.push(`  ${c.dim(`${parsed.context} (${parsed.interpreter})`)} ${c.dim('→')} ${results.join(` ${c.dim('|')} `)}`);
      } else if (parsed.debug === 'raw_request') {
        lines.push(`  ${c.dim(`type: ${parsed.type}`)}`);
      }
    } catch {
      // Not JSON - show as-is.
      if (log['level'] === 'error') {
        lines.push(`  ${c.red('ERR:')} ${msg.substring(0, 150)}`);
      }
    }
  }

  for (const ex of exceptions) {
    const msg = (typeof ex['message'] === 'string') ? ex['message'] : JSON.stringify(ex);

    lines.push(`  ${c.red('EXC:')} ${msg.substring(0, 150)}`);
  }

  return lines.join('\n');
}

/**
 * Tail Logs - Summarize.
 *
 * Routes a tail entry to the email or HTTP summarizer based on whether the
 * event carries a request method, which only HTTP events include.
 *
 * @param {TailEntry} entry - Entry.
 *
 * @returns {string}
 *
 * @since 2.0.0
 */
function summarize(entry) {
  const event = /** @type {TailEvent} */ (entry['event'] ?? {});
  const request = /** @type {TailRequest} */ (event['request'] ?? {});

  // Email events have no request method.
  if (request['method'] === undefined) {
    return summarizeEmail(entry);
  }

  return summarizeHttp(entry);
}

/**
 * Tail Logs - Shutting Down.
 *
 * Guards the shutdown path so a second interrupt exits immediately while the
 * first lets the cleanup routine finish removing stale sessions.
 *
 * @since 2.0.0
 */
let shuttingDown = false;

/**
 * Tail Logs - Start Tail.
 *
 * Cleans up stale sessions, spawns wrangler tail from a throwaway directory,
 * and streams parsed entries to disk while auto-restarting before expiry.
 *
 * @param {string} token      - Token.
 * @param {string} accountId  - Account id.
 * @param {string} scriptName - Script name.
 *
 * @returns {Promise<void>}
 *
 * @since 2.0.0
 */
async function startTail(token, accountId, scriptName) {
  try {
    await cleanupStaleSessions(token, accountId, scriptName);
  } catch {
    logSection('startup', c.yellow('Could not clean up stale sessions (API unreachable). Continuing...'));
  }

  logSection('connection', c.green('Connecting...'));

  // Spawn wrangler from a temp directory so it doesn't read the project's .env file.
  // The .env token is for deploy only - wrangler tail uses OAuth from `wrangler login`.
  const tailDir = mkdtempSync(join(tmpdir(), 'nrp-tail-'));

  writeFileSync(join(tailDir, 'wrangler.toml'), `name = "${scriptName}"\n`);

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

  let restartTimer = /** @type {NodeJS.Timeout | undefined} */ (undefined);

  /**
   * Tail Logs - Start Tail - Schedule Restart.
   *
   * Fetches the real session expiry from the Cloudflare API
   * and sets a timer to restart before it expires.
   *
   * @returns {Promise<Date | null>}
   *
   * @since 2.0.0
   */
  async function scheduleRestart() {
    try {
      const sessions = await getTailSessions(token, accountId, scriptName);
      const latest = sessions.sort((a, b) => new Date(b['expires_at']).getTime() - new Date(a['expires_at']).getTime())[0];

      if (latest !== undefined) {
        const expiresAt = new Date(latest['expires_at']);
        const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MS);
        const restartMs = restartAt.getTime() - Date.now();

        if (restartMs > 0) {
          clearTimeout(restartTimer);

          restartTimer = setTimeout(() => {
            logSection('restart', c.yellow('Session expiring. Restarting...'));

            tail.kill();

            return;
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

    return;
  }, 5_000);

  // Periodic check every 30 minutes to keep the restart timer accurate.
  const checkInterval = setInterval(async () => {
    const expiresAt = await scheduleRestart();

    if (expiresAt !== null) {
      const restartAt = new Date(expiresAt.getTime() - RESTART_BUFFER_MS);

      logSection('session', c.dim(`Session check: expires at ${formatTimestamp(expiresAt.getTime())}, restart at ${formatTimestamp(restartAt.getTime())}`));
    }

    return;
  }, 1_800_000);

  let lineBuffer = '';

  /**
   * Tail Logs - Start Tail - Process Chunk.
   *
   * Buffers incoming stdout/stderr data and splits on newlines. Each complete
   * line is parsed as a JSON object (wrangler tail emits newline-delimited JSON).
   *
   * @param {Buffer | string} chunk - Chunk.
   *
   * @returns {void}
   *
   * @since 2.0.0
   */
  function processChunk(chunk) {
    lineBuffer += chunk.toString();

    const lines = lineBuffer.split('\n');

    lineBuffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.length === 0) {
        continue;
      }

      try {
        const entry = JSON.parse(trimmed);
        const compact = JSON.stringify(entry);

        appendFileSync(OUTPUT_FILE, `${compact}\n`);
        logSection('traffic', summarize(entry));
      } catch {
        // Non-JSON line (e.g. wrangler status message) - skip.
      }
    }

    return;
  }

  tail.stdout.on('data', (chunk) => {
    processChunk(chunk);

    return;
  });

  tail.stderr.on('data', (chunk) => {
    processChunk(chunk);

    return;
  });

  tail.on('error', (err) => {
    logger.error(`Spawn error: ${err.message}`);

    return;
  });

  tail.on('close', () => {
    clearTimeout(restartTimer);
    clearInterval(checkInterval);

    if (shuttingDown === true) {
      return;
    }

    logSection('restart', c.yellow('Tail ended. Restarting in 5 seconds...'));
    setTimeout(() => startTail(token, accountId, scriptName), 5_000);

    return;
  });

  return;
}

/**
 * Tail Logs - Config.
 *
 * The worker config chosen for this run, resolved from discovery and any
 * interactive prompt before streaming begins.
 *
 * @since 2.0.0
 */
const config = await chooseConfig();

/**
 * Tail Logs - Token.
 *
 * The Cloudflare API token read from .env, used to authenticate the account
 * lookup and every tail-session management call.
 *
 * @since 2.0.0
 */
const token = loadToken();

logSection('startup', c.dim(`Tailing ${c.bold(config.workerName)} to ${OUTPUT_FILE} (Ctrl+C to stop)...`));

/**
 * Tail Logs - Account ID.
 *
 * The Cloudflare account id resolved from the config base domain, used for all
 * tail-session API calls during the run.
 *
 * @since 2.0.0
 */
const accountId = await getAccountId(token, config.baseDomain);

/**
 * Tail Logs - Shutdown.
 *
 * Handles Ctrl+C and termination by removing stale sessions before exiting, or
 * exits immediately when a second signal arrives mid-cleanup.
 *
 * @since 2.0.0
 */
async function shutdown() {
  if (shuttingDown === true) {
    process.exit(1);
  }

  shuttingDown = true;

  logSection('shutdown', c.dim('Cleaning up...'));

  await cleanupStaleSessions(token, accountId, config.workerName);

  logSection('shutdown', c.dim('Stopped.'));

  return process.exit(0);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

startTail(token, accountId, config.workerName);
