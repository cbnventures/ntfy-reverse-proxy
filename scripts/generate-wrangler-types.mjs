import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { trimLineEnds } from './lib/line-endings.mjs';

/**
 * Generate Wrangler Types - Project Root.
 *
 * Absolute path to the repository root, resolved one level up from this
 * script's own directory so every other path anchors to it.
 *
 * @since 2.0.0
 */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Generate Wrangler Types - Wrangler Config.
 *
 * Absolute path to the wrangler.toml consulted when deciding whether to
 * regenerate types or fall back to the committed declaration file.
 *
 * @since 2.0.0
 */
const wranglerConfig = resolve(projectRoot, 'wrangler.toml');

/**
 * Generate Wrangler Types - Package Dir.
 *
 * Absolute path to the worker package directory that wrangler runs inside so
 * the generated declaration file lands beside its source.
 *
 * @since 2.0.0
 */
const packageDir = resolve(projectRoot, 'packages', 'ntfy-reverse-proxy');

/**
 * Generate Wrangler Types - Output File.
 *
 * Absolute path to the generated worker-configuration.d.ts that the strip step
 * post-processes and every check consumes.
 *
 * @since 2.0.0
 */
const outputFile = resolve(packageDir, 'worker-configuration.d.ts');

/**
 * Generate Wrangler Types - Strip Global Props.
 *
 * Removes the Cloudflare.GlobalProps interface from the generated types.
 * Wrangler generates a mainModule property that references the build
 * output path, which fails type checks when the build directory is absent.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function stripGlobalProps() {
  const content = readFileSync(outputFile, 'utf-8');
  const GLOBAL_PROPS_PATTERN_SOURCE = '\\tinterface GlobalProps \\{[^}]*\\}\\n';
  const globalPropsPattern = new RegExp(GLOBAL_PROPS_PATTERN_SOURCE, 's');
  const stripped = content.replace(globalPropsPattern, '');

  if (stripped !== content) {
    writeFileSync(outputFile, stripped);

    process.stdout.write('generate-wrangler-types: Stripped GlobalProps interface (references build output).\n');
  }

  return;
}

/**
 * Generate Wrangler Types - Point Durable Objects At Source.
 *
 * Rewrites Durable Object types that Wrangler imports through the generated Worker
 * entry in .wrangler, which is gitignored and fails type checks when it is absent,
 * to the Worker source that defines the classes the entry re-exports.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function pointDurableObjectsAtSource() {
  const content = readFileSync(outputFile, 'utf-8');
  const generatedEntryImport = 'import("../../.wrangler/ntfy-reverse-proxy/worker")';
  const workerSourceImport = 'import("./src/worker/index")';
  const pointed = content.replaceAll(generatedEntryImport, workerSourceImport);

  if (pointed !== content) {
    writeFileSync(outputFile, pointed);

    process.stdout.write('generate-wrangler-types: Pointed Durable Object types at the Worker source (generated entry is gitignored).\n');
  }

  return;
}

/**
 * Generate Wrangler Types - Strip Trailing Whitespace.
 *
 * Removes trailing spaces from Wrangler's generated comments so the committed
 * declaration remains compatible with repository whitespace checks.
 *
 * @returns {void}
 *
 * @since 2.1.3
 */
function stripTrailingWhitespace() {
  const content = readFileSync(outputFile, 'utf-8');
  const stripped = trimLineEnds(content);

  if (stripped !== content) {
    writeFileSync(outputFile, stripped);

    process.stdout.write('generate-wrangler-types: Stripped trailing whitespace.\n');
  }

  return;
}

/**
 * Generate Wrangler Types - Generate Wrangler Types.
 *
 * Generates Cloudflare Workers runtime type definitions from wrangler.toml.
 * If wrangler.toml does not exist (e.g. CI environments), the step is
 * skipped and the committed worker-configuration.d.ts is used instead.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function generateWranglerTypes() {
  if (existsSync(wranglerConfig) === false) {
    process.stdout.write('generate-wrangler-types: wrangler.toml not found. Using committed worker-configuration.d.ts.\n');

    if (existsSync(outputFile) === false) {
      process.stderr.write('generate-wrangler-types: worker-configuration.d.ts is also missing. Run this locally first to generate it.\n');

      throw new Error('worker-configuration.d.ts not found');
    }

    return;
  }

  process.stdout.write('generate-wrangler-types: Regenerating worker-configuration.d.ts from wrangler.toml ...\n');

  execSync('npx wrangler types --config ../../wrangler.toml --strict-vars=false ./worker-configuration.d.ts', {
    cwd: packageDir,
    stdio: 'inherit',
  });

  stripGlobalProps();
  pointDurableObjectsAtSource();
  stripTrailingWhitespace();

  process.stdout.write('generate-wrangler-types: Done.\n');

  return;
}

generateWranglerTypes();
