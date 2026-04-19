import { describe, expect, it } from 'vitest';

import { configSchema } from '../../lib/schema.js';

import type {
  TestsLibSchemaInput,
  TestsLibSchemaParseResult,
} from '../../types/tests/lib/schema.test.d.ts';

/**
 * Tests - Lib - Schema - Config Schema.
 *
 * @since 2.0.0
 */
describe('configSchema', () => {
  it('validates a complete valid HTTP context config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc123',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates a complete valid email context config', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc123',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects tokens not starting with tk_', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'bad_token',
      }],
      contexts: [],
    };

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid interpreter names', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid mode values', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('allows optional error_topic', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects server URLs not starting with https://', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'http://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [],
    };

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects context without type discriminator', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects invalid type discriminator value', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('allows optional token on HTTP context', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [{
        name: 'homebridge',
        type: 'http',
        id: 'aBcDeFgHiJkLmNoPqRsT',
        interpreter: 'plain-text',
        topic: 'homebridge',
        mode: 'send-once',
        show_visitor_info: true,
        primary_server: 'primary',
        servers: ['primary'],
        token: 'my_webhook_secret',
      }],
    };

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('allows optional allowed_from on email context', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('rejects token field on email context', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('rejects allowed_from field on HTTP context', () => {
    const invalid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(invalid);

    expect(result['success']).toBe(false);

    return;
  });

  it('validates pfsense interpreter', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates unifi interpreter', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates email interpreter', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'primary', server: 'https://ntfy.example.com', token: 'tk_abc',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  it('validates config with mixed HTTP and email contexts', () => {
    const valid: TestsLibSchemaInput = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [
        {
          name: 'alpha', server: 'https://alpha.example.com', token: 'tk_alpha',
        },
        {
          name: 'beta', server: 'https://beta.example.com', token: 'tk_beta',
        },
      ],
      contexts: [
        {
          name: 'homebridge',
          type: 'http',
          id: 'aBcDeFgHiJkLmNoPqRsT',
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

    const result: TestsLibSchemaParseResult = configSchema.safeParse(valid);

    expect(result['success']).toBe(true);

    return;
  });

  return;
});
