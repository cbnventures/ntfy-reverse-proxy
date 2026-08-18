import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv - Current File Path.
 *
 * This package self-checks its dotenv quote convention THROUGH the published kit. The
 * double-quote rule lives in @cbnventures/nova/rules/vitest; this wrapper supplies the
 * configuration that points at the repository-root .env files this package consumes.
 *
 * @since 0.20.0
 */
const currentFilePath = fileURLToPath(import.meta.url);
const repositoryRoot = join(dirname(currentFilePath), '../../../../');

registerDotenvSuite({
  vitest,
  enable: 'all',
  rootDir: repositoryRoot,
  envPaths: [
    '.env',
    '.env.sample',
  ],
});
