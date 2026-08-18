import { describe, expect, it } from 'vitest';

import { interactiveMenu } from '../../../cli/menu/interactive.js';

import type { Tests_Cli_Menu_Interactive_InteractiveMenu_ExportsTheInteractiveMenuFunction_ExportedType } from '../../../types/tests/cli/menu/interactive.test.d.ts';

/**
 * Tests - CLI - Menu - Interactive - Menu.
 *
 * @since 2.0.0
 */
describe('interactiveMenu', () => {
  it('exports the interactiveMenu function', () => {
    const exportedType: Tests_Cli_Menu_Interactive_InteractiveMenu_ExportsTheInteractiveMenuFunction_ExportedType = typeof interactiveMenu;

    expect(exportedType).toBe('function');

    return;
  });

  return;
});
