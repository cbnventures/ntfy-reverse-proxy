import { describe, expect, it } from 'vitest';

import { ntfyJsonInterpreter } from '../../../worker/interpreters/ntfy-json.js';

import type {
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_RecordCast,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_UnknownField,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_RequiresBodyField_Input,
  Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ThrowsOnNonJSONStringInput_Input,
} from '../../../types/tests/worker/interpreters/ntfy-json.test.d.ts';

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter.
 *
 * @since 2.0.0
 */
describe('ntfyJsonInterpreter', () => {
  it('maps JSON fields to notification object', () => {
    const result: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result = ntfyJsonInterpreter({
      title: 'Alert',
      body: 'Something happened',
      priority: 4,
      tags: ['warning'],
    });

    expect(result['notification']['title']).toBe('Alert');

    expect(result['notification']['body']).toBe('Something happened');

    expect(result['notification']['priority']).toBe(4);

    expect(result['notification']['tags']).toEqual(['warning']);

    return;
  });

  it('requires body field', () => {
    const input: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_RequiresBodyField_Input = { title: 'No body' };

    expect(() => ntfyJsonInterpreter(input)).toThrow();

    return;
  });

  it('ignores unknown fields', () => {
    const result: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result = ntfyJsonInterpreter({
      body: 'test',
      unknown_field: 'ignored',
    });

    const unknownField: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_UnknownField = (result['notification'] as Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_RecordCast)['unknown_field'];

    expect(result['notification']['body']).toBe('test');

    expect(unknownField).toBeUndefined();

    return;
  });

  it('handles string input by parsing JSON', () => {
    const result: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result = ntfyJsonInterpreter('{"body":"from string"}');

    expect(result['notification']['body']).toBe('from string');

    return;
  });

  it('throws on non-JSON string input', () => {
    const input: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ThrowsOnNonJSONStringInput_Input = 'not json';

    expect(() => ntfyJsonInterpreter(input)).toThrow(SyntaxError);

    return;
  });

  it('maps optional ntfy fields', () => {
    const result: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result = ntfyJsonInterpreter({
      body: 'test',
      icon: 'https://example.com/icon.png',
      attach: 'https://example.com/file.pdf',
      filename: 'report.pdf',
      markdown: true,
    });

    expect(result['notification']['icon']).toBe('https://example.com/icon.png');

    expect(result['notification']['attach']).toBe('https://example.com/file.pdf');

    expect(result['notification']['filename']).toBe('report.pdf');

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  return;
});
