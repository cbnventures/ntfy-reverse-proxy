import { describe, expect, it } from 'vitest';

import { configSchema } from '../../lib/schema.js';

import type {
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalAllowedFromOnEmailContext_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalAllowedFromOnEmailContext_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEvents_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEvents_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEventsOnEmailContext_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEventsOnEmailContext_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorTopic_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorTopic_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalSessionOnHTTPContext_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalSessionOnHTTPContext_Valid,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalTokenOnHTTPContext_Result,
  Tests_Lib_Schema_ConfigSchema_AllowsOptionalTokenOnHTTPContext_Valid,
  Tests_Lib_Schema_ConfigSchema_RejectsAContextWithBothTokenAndSession_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsAContextWithBothTokenAndSession_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsAllowedFromFieldOnHTTPContext_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsAllowedFromFieldOnHTTPContext_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsASessionSecretShorterThan32Characters_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsASessionSecretShorterThan32Characters_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsContextWithoutTypeDiscriminator_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsContextWithoutTypeDiscriminator_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId,
  Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_InvalidIds,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidErrorEventsValues_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidErrorEventsValues_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidInterpreterNames_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidInterpreterNames_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidModeValues_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidModeValues_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidTypeDiscriminatorValue_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsInvalidTypeDiscriminatorValue_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsServerURLsNotStartingWithHttps_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsServerURLsNotStartingWithHttps_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsTokenFieldOnEmailContext_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsTokenFieldOnEmailContext_Result,
  Tests_Lib_Schema_ConfigSchema_RejectsTokensNotStartingWithTk_Invalid,
  Tests_Lib_Schema_ConfigSchema_RejectsTokensNotStartingWithTk_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidEmailContextConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidEmailContextConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidHTTPContextConfig_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidHTTPContextConfig_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesConfigWithMixedHTTPAndEmailContexts_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesConfigWithMixedHTTPAndEmailContexts_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesEmailInterpreter_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesEmailInterpreter_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesPfsenseInterpreter_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesPfsenseInterpreter_Valid,
  Tests_Lib_Schema_ConfigSchema_ValidatesUnifiInterpreter_Result,
  Tests_Lib_Schema_ConfigSchema_ValidatesUnifiInterpreter_Valid,
} from '../../types/tests/lib/schema.test.d.ts';

/**
 * Tests - Lib - Schema - Config Schema.
 *
 * @since 2.0.0
 */
describe('configSchema', () => {
  it('validates a complete valid HTTP context config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidHTTPContextConfig_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc123',
      }],
      contexts: [{
        name: 'test-context',
        type: 'http',
        id: 'abc123',
        interpreter: 'plain-text',
        topic: 'test-topic',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidHTTPContextConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects HTTP context IDs that cannot be host labels', () => {
    const invalidIds: Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_InvalidIds = [
      'Uppercase',
      'has.dot',
      'has_underscore',
      '-leading',
      'trailing-',
      'a'.repeat(64),
    ];

    const assertInvalidId: Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId = (invalidId) => {
      const invalid: Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId_Invalid = {
        settings: {
          worker_name: 'test-worker',
          base_domain: 'ntfy.example.com',
          show_response_output: false,
        },
        servers: [{
          name: 'primary',
          server: 'https://ntfy.example.com',
          token: 'tk_abc123',
        }],
        contexts: [{
          name: 'test-context',
          type: 'http',
          id: invalidId,
          interpreter: 'plain-text',
          topic: 'test-topic',
          mode: 'send-once',
          show_visitor_info: true,
          primary_server: 'primary',
          servers: ['primary'],
        }],
      };
      const result: Tests_Lib_Schema_ConfigSchema_RejectsHTTPContextIDsThatCannotBeHostLabels_AssertInvalidId_Result = configSchema.safeParse(invalid);

      expect(result['success']).toBe(false);

      return;
    };

    invalidIds.forEach(assertInvalidId);

    return;
  });

  it('validates a complete valid email context config', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidEmailContextConfig_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc123',
      }],
      contexts: [{
        name: 'pfsense',
        type: 'email',
        id: 'pfsense',
        interpreter: 'pfsense',
        topic: 'pfsense',
        error_topic: 'errors',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesACompleteValidEmailContextConfig_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects tokens not starting with tk_', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsTokensNotStartingWithTk_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'bad_token',
      }],
      contexts: [],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsTokensNotStartingWithTk_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid interpreter names', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidInterpreterNames_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'unknown-interpreter',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidInterpreterNames_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid mode values', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidModeValues_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'invalid-mode',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidModeValues_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('allows optional error_topic', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorTopic_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        error_topic: 'errors',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorTopic_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows optional error_events', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEvents_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        error_topic: 'errors',
        error_events: ['interpretation'],
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEvents_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows optional error_events on email context', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEventsOnEmailContext_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'email',
        id: 'abc',
        interpreter: 'pfsense',
        topic: 'test',
        error_topic: 'errors',
        error_events: ['authentication'],
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalErrorEventsOnEmailContext_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects invalid error_events values', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidErrorEventsValues_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        error_topic: 'errors',
        error_events: ['not-a-category'],
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidErrorEventsValues_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects server URLs not starting with https://', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsServerURLsNotStartingWithHttps_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'http://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsServerURLsNotStartingWithHttps_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects context without type discriminator', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsContextWithoutTypeDiscriminator_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsContextWithoutTypeDiscriminator_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid type discriminator value', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsInvalidTypeDiscriminatorValue_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'websocket',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsInvalidTypeDiscriminatorValue_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('allows optional token on HTTP context', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalTokenOnHTTPContext_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'homebridge',
        type: 'http',
        id: 'abcdefghijklmnopqrst',
        interpreter: 'plain-text',
        topic: 'homebridge',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
        token: 'my_webhook_secret',
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalTokenOnHTTPContext_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows optional session on HTTP context', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalSessionOnHTTPContext_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'homebridge',
        type: 'http',
        id: 'abcdefghijklmnopqrst',
        interpreter: 'plain-text',
        topic: 'homebridge',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
        session: {
          secret: 'a-session-secret-that-is-at-least-32-characters',
          ttl_seconds: 300,
          max_per_hour: 10,
        },
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalSessionOnHTTPContext_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects a context with both token and session', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsAContextWithBothTokenAndSession_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'homebridge',
        type: 'http',
        id: 'abcdefghijklmnopqrst',
        interpreter: 'plain-text',
        topic: 'homebridge',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
        token: 'my_webhook_secret',
        session: {
          secret: 'a-session-secret-that-is-at-least-32-characters',
        },
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsAContextWithBothTokenAndSession_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects a session secret shorter than 32 characters', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsASessionSecretShorterThan32Characters_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'homebridge',
        type: 'http',
        id: 'abcdefghijklmnopqrst',
        interpreter: 'plain-text',
        topic: 'homebridge',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
        session: {
          secret: 'too-short',
        },
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsASessionSecretShorterThan32Characters_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('allows optional allowed_from on email context', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_AllowsOptionalAllowedFromOnEmailContext_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'pfsense',
        type: 'email',
        id: 'pfsense',
        interpreter: 'pfsense',
        topic: 'pfsense',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
        allowed_from: '*@pfsense.local',
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_AllowsOptionalAllowedFromOnEmailContext_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects token field on email context', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsTokenFieldOnEmailContext_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'email',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
        token: 'some_token',
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsTokenFieldOnEmailContext_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects allowed_from field on HTTP context', () => {
    const invalid: Tests_Lib_Schema_ConfigSchema_RejectsAllowedFromFieldOnHTTPContext_Invalid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
        allowed_from: '*@example.com',
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_RejectsAllowedFromFieldOnHTTPContext_Result = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates pfsense interpreter', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesPfsenseInterpreter_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'email',
        id: 'abc',
        interpreter: 'pfsense',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesPfsenseInterpreter_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates unifi interpreter', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesUnifiInterpreter_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'http',
        id: 'abc',
        interpreter: 'unifi',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesUnifiInterpreter_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates email interpreter', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesEmailInterpreter_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary',
        server: 'https://ntfy.example.com',
        token: 'tk_abc',
      }],
      contexts: [{
        name: 'test',
        type: 'email',
        id: 'abc',
        interpreter: 'pfsense',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'primary',
        servers: ['primary'],
      }],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesEmailInterpreter_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates config with mixed HTTP and email contexts', () => {
    const valid: Tests_Lib_Schema_ConfigSchema_ValidatesConfigWithMixedHTTPAndEmailContexts_Valid = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [
        {
          name: 'alpha',
          server: 'https://alpha.example.com',
          token: 'tk_alpha',
        },
        {
          name: 'beta',
          server: 'https://beta.example.com',
          token: 'tk_beta',
        },
      ],
      contexts: [
        {
          name: 'homebridge',
          type: 'http',
          id: 'abcdefghijklmnopqrst',
          interpreter: 'plain-text',
          topic: 'homebridge',
          error_topic: 'errors',
          mode: 'send-once',
          show_visitor_info: true,
          primary_server: 'alpha',
          servers: [
            'alpha',
            'beta',
          ],
          token: 'my_webhook_secret',
        },
        {
          name: 'pfsense',
          type: 'email',
          id: 'pfsense',
          interpreter: 'pfsense',
          topic: 'pfsense',
          error_topic: 'errors',
          mode: 'send-once',
          show_visitor_info: false,
          primary_server: 'alpha',
          servers: [
            'alpha',
            'beta',
          ],
          allowed_from: '*@pfsense.local',
        },
      ],
    };

    const result: Tests_Lib_Schema_ConfigSchema_ValidatesConfigWithMixedHTTPAndEmailContexts_Result = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  return;
});
