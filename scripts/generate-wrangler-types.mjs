import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WRANGLER_CONFIG = resolve(PROJECT_ROOT, 'wrangler.toml');

const PACKAGE_DIR = resolve(PROJECT_ROOT, 'packages', 'ntfy-reverse-proxy');

const OUTPUT_FILE = resolve(PACKAGE_DIR, 'worker-configuration.d.ts');

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

  execSync('wrangler types --config ../../wrangler.toml --strict-vars=false ./worker-configuration.d.ts', {
    cwd: PACKAGE_DIR,
    stdio: 'inherit',
  });

  process.stdout.write('generate-wrangler-types: Done.\n');
}

generateWranglerTypes();
