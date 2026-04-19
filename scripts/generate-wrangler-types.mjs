import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WRANGLER_CONFIG = resolve(PROJECT_ROOT, 'wrangler.toml');

const PACKAGE_DIR = resolve(PROJECT_ROOT, 'packages', 'ntfy-reverse-proxy');

const OUTPUT_FILE = resolve(PACKAGE_DIR, 'worker-configuration.d.ts');

/**
 * Scripts - Generate Wrangler Types - Strip Global Props.
 *
 * Removes the Cloudflare.GlobalProps interface from the generated types.
 * Wrangler generates a mainModule property that references the build
 * output path (e.g. ./build/src/worker/index), which causes type errors
 * when the build directory does not exist (e.g. during check on CI).
 * No source code references GlobalProps, so it is safe to remove.
 *
 * @since 2.0.0
 */
function stripGlobalProps() {
  const content = readFileSync(OUTPUT_FILE, 'utf-8');
  const stripped = content.replace(/\tinterface GlobalProps \{[^}]*\}\n/s, '');

  if (stripped !== content) {
    writeFileSync(OUTPUT_FILE, stripped);
    process.stdout.write('generate-wrangler-types: Stripped GlobalProps interface (references build output).\n');
  }
}

/**
 * Scripts - Generate Wrangler Types.
 *
 * Generates Cloudflare Workers runtime type definitions from wrangler.toml.
 * If wrangler.toml does not exist (e.g. CI environments), the step is
 * skipped and the committed worker-configuration.d.ts is used instead.
 *
 * @since 2.0.0
 */
function generateWranglerTypes() {
  if (existsSync(WRANGLER_CONFIG) === false) {
    process.stdout.write('generate-wrangler-types: wrangler.toml not found. Using committed worker-configuration.d.ts.\n');

    if (existsSync(OUTPUT_FILE) === false) {
      process.stderr.write('generate-wrangler-types: worker-configuration.d.ts is also missing. Run this locally first to generate it.\n');

      throw new Error('worker-configuration.d.ts not found');
    }

    return;
  }

  process.stdout.write('generate-wrangler-types: Regenerating worker-configuration.d.ts from wrangler.toml ...\n');

  execSync('npx wrangler types --config ../../wrangler.toml --strict-vars=false ./worker-configuration.d.ts', {
    cwd: PACKAGE_DIR,
    stdio: 'inherit',
  });

  stripGlobalProps();

  process.stdout.write('generate-wrangler-types: Done.\n');
}

generateWranglerTypes();
