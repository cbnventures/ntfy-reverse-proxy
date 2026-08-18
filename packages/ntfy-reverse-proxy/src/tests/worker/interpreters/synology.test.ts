import { describe, expect, it } from 'vitest';

import { synologyInterpreter } from '../../../worker/interpreters/synology.js';

import type {
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_AddsSynologyTag_Result,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_EnablesMarkdown_Result,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_HandlesJSONSynologyWebhookWithKnownFields_Result,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_HandlesPlainTextSynologyWebhook_Result,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Error,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Info,
  Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Warning,
} from '../../../types/tests/worker/interpreters/synology.test.d.ts';

/**
 * Tests - Worker - Interpreters - Synology - Interpreter.
 *
 * @since 2.0.0
 */
describe('synologyInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('handles plain text Synology webhook', () => {
    const result: Tests_Worker_Interpreters_Synology_SynologyInterpreter_HandlesPlainTextSynologyWebhook_Result = synologyInterpreter('System: Storage pool 1 has degraded');

    expect(result['notification']['body']).toContain('Storage pool 1 has degraded');

    expect(result['notification']['tags']).toBeDefined();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('handles JSON Synology webhook with known fields', () => {
    const result: Tests_Worker_Interpreters_Synology_SynologyInterpreter_HandlesJSONSynologyWebhookWithKnownFields_Result = synologyInterpreter({
      event: 'SystemEvent',
      severity: 'warning',
      message: 'Disk 1 has bad sectors',
      hostname: 'nas-01',
    });

    expect(result['notification']['body']).toContain('Disk 1 has bad sectors');

    expect(result['notification']['title']).toContain('nas-01');

    expect(result['notification']['priority']).toBeGreaterThanOrEqual(3);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('maps severity to ntfy priority', () => {
    const warning: Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Warning = synologyInterpreter({
      message: 'test',
      severity: 'warning',
    });
    const error: Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Error = synologyInterpreter({
      message: 'test',
      severity: 'error',
    });
    const info: Tests_Worker_Interpreters_Synology_SynologyInterpreter_MapsSeverityToNtfyPriority_Info = synologyInterpreter({
      message: 'test',
      severity: 'info',
    });

    expect(warning['notification']['priority']).toBe(3);

    expect(error['notification']['priority']).toBe(4);

    expect(info['notification']['priority']).toBe(2);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('adds synology tag', () => {
    const result: Tests_Worker_Interpreters_Synology_SynologyInterpreter_AddsSynologyTag_Result = synologyInterpreter('test message');

    expect(result['notification']['tags']).toContain('synology');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('enables markdown', () => {
    const result: Tests_Worker_Interpreters_Synology_SynologyInterpreter_EnablesMarkdown_Result = synologyInterpreter('test');

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  return;
});
