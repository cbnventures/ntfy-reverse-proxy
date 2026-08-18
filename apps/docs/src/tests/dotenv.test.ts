import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Dotenv - Current File Path.
 *
 * This site self-checks its dotenv quote convention THROUGH the published kit. The
 * double-quote rule lives in @cbnventures/nova/rules/vitest; this wrapper supplies the
 * configuration that points at this site's own .env files.
 *
 * @since 0.20.0
 */
const currentFilePath = fileURLToPath(import.meta.url);
const workspaceRoot = join(dirname(currentFilePath), '../../');

registerDotenvSuite({
  vitest,
  enable: 'all',
  rootDir: workspaceRoot,
  envPaths: [
    '.env',
    '.env.sample',
  ],
});
