import { describe, expect, it } from 'vitest';

import { plainTextInterpreter } from '../../../worker/interpreters/plain-text.js';

import type {
  Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HandlesBinaryInputByConvertingToStringRepresentation_Buffer,
  Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HandlesBinaryInputByConvertingToStringRepresentation_Result,
  Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HasNoAttachment_Result,
  Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_PassesTextThroughAsBody_Result,
  Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_StringifiesObjectInput_Result,
} from '../../../types/tests/worker/interpreters/plain-text.test.d.ts';

/**
 * Tests - Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * @since 2.0.0
 */
describe('plainTextInterpreter', () => {
  it('passes text through as body', () => {
    const result: Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_PassesTextThroughAsBody_Result = plainTextInterpreter('Hello world');

    expect(result['notification']['body']).toBe('Hello world');

    return;
  });

  it('has no attachment', () => {
    const result: Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HasNoAttachment_Result = plainTextInterpreter('test');

    expect(result['attachment']).toBeUndefined();

    return;
  });

  it('handles binary input by converting to string representation', () => {
    const buffer: Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HandlesBinaryInputByConvertingToStringRepresentation_Buffer = new TextEncoder().encode('binary content').buffer as ArrayBuffer;
    const result: Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_HandlesBinaryInputByConvertingToStringRepresentation_Result = plainTextInterpreter(buffer);

    expect(result['notification']['body']).toBe('binary content');

    return;
  });

  it('stringifies object input', () => {
    const result: Tests_Worker_Interpreters_PlainText_PlainTextInterpreter_StringifiesObjectInput_Result = plainTextInterpreter({ key: 'value' });

    expect(result['notification']['body']).toContain('key');

    expect(result['notification']['body']).toContain('value');

    return;
  });

  return;
});
