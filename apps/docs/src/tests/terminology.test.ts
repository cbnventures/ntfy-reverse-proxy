import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registerTerminologySuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Terminology - Current File Path.
 *
 * This site self-checks its Terminology components THROUGH the published kit.
 * The suite logic lives in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this site's conventions.
 *
 * This site has no "docs/quickstart" category, so the terminology page lives
 * under "docs/reference" instead — the path and route below are overridden
 * to match, since the published kit's defaults assume the "quickstart" layout.
 *
 * @since 0.20.0
 */
const currentFilePath = fileURLToPath(import.meta.url);
const workspaceRoot = join(dirname(currentFilePath), '../../');

registerTerminologySuite({
  vitest,
  enable: 'all',
  terminologyPath: join(workspaceRoot, 'docs', 'reference', 'terminology.mdx'),
  expectedBase: '/docs/reference/terminology',
});
