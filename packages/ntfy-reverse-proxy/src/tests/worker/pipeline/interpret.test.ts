import { describe, expect, it } from 'vitest';

import { emailContextSchema, httpContextSchema } from '../../../lib/schema.js';
import { interpret, interpreterMap } from '../../../worker/pipeline/interpret.js';

import type {
  Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_Result,
  Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_Result,
  Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Input,
  Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Result,
  Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_Result,
  Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_EmailEnum,
  Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_HttpEnum,
  Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_MapKeys,
  Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Expectation,
  Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Promise,
} from '../../../types/tests/worker/pipeline/interpret.test.d.ts';

/**
 * Tests - Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
describe('interpret', () => {
  it('dispatches to plain-text interpreter', async () => {
    const result: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_Result = await interpret('plain-text', 'hello world');

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['body']).toBe('hello world');

    return;
  });

  it('dispatches to ntfy-json interpreter', async () => {
    const result: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_Result = await interpret('ntfy-json', { body: 'test message' });

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['body']).toBe('test message');

    return;
  });

  it('dispatches to synology interpreter', async () => {
    const result: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_Result = await interpret('synology', 'Disk warning');

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['tags']).toContain('synology');

    return;
  });

  it('dispatches to statuspage interpreter', async () => {
    const input: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Input = {
      page: { name: 'Test' },
      incident: {
        name: 'Outage',
        status: 'investigating',
        impact: 'major',
        incident_updates: [],
      },
    };

    const result: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Result = await interpret('statuspage', input);

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['tags']).toContain('statuspage');

    return;
  });

  it('throws on unknown interpreter', async () => {
    const promise: Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Promise = interpret('unknown', 'test');

    const expectation: Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Expectation = expect(promise).rejects.toThrow('Unknown interpreter');

    await expectation;

    return;
  });

  it('interpreterMap keys match the schema interpreter enums', () => {
    const mapKeys: Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_MapKeys = Object.keys(interpreterMap).sort();
    const httpEnum: Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_HttpEnum = [...httpContextSchema.shape['interpreter'].options].sort();
    const emailEnum: Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_EmailEnum = [...emailContextSchema.shape['interpreter'].options].sort();

    expect(httpEnum).toStrictEqual(mapKeys);

    expect(emailEnum).toStrictEqual(mapKeys);

    return;
  });

  return;
});
