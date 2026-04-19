import { describe, expect, it } from 'vitest';

import { route } from '../../../worker/pipeline/route.js';

import type {
  TestsWorkerPipelineRouteMockConfig,
  TestsWorkerPipelineRouteResult,
} from '../../../types/tests/worker/pipeline/route.test.d.ts';

/**
 * Tests - Worker - Pipeline - Route - Mock Config.
 *
 * @since 2.0.0
 */
const mockConfig: TestsWorkerPipelineRouteMockConfig = {
  settings: {
    worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
  },
  servers: [
    {
      name: 'alpha', server: 'https://ntfy.alpha.example.com', token: 'tk_abc',
    },
    {
      name: 'beta', server: 'https://ntfy.beta.example.com', token: 'tk_def',
    },
  ],
  contexts: [
    {
      id: 'aBcDeFgHiJkLmNoPqRsT',
      name: 'homebridge',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'homebridge-alerts',
      error_topic: undefined,
      mode: 'send-once',
      show_visitor_info: true,
      primary_server: 'alpha',
      servers: [
        'alpha',
        'beta',
      ],
      token: undefined,
    },
    {
      id: 'pfsense',
      name: 'pfsense-email',
      type: 'email',
      interpreter: 'pfsense',
      topic: 'pfsense-alerts',
      error_topic: undefined,
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      allowed_from: undefined,
    },
  ],
};

/**
 * Tests - Worker - Pipeline - Route.
 *
 * @since 2.0.0
 */
describe('route', () => {
  /**
   * Tests - Worker - Pipeline - Route - HTTP Routing.
   *
   * @since 2.0.0
   */
  describe('HTTP routing', () => {
    it('matches a context by id for HTTP type', () => {
      const result: TestsWorkerPipelineRouteResult = route('http', 'aBcDeFgHiJkLmNoPqRsT', mockConfig);

      expect(result['context']).toBeDefined();

      expect(result['context']!['name']).toBe('homebridge');

      return;
    });

    it('resolves server configs from context server names', () => {
      const result: TestsWorkerPipelineRouteResult = route('http', 'aBcDeFgHiJkLmNoPqRsT', mockConfig);

      expect(result['resolvedServers']).toHaveLength(2);

      expect(result['resolvedServers']![0]!['name']).toBe('alpha');

      return;
    });

    it('identifies the primary server', () => {
      const result: TestsWorkerPipelineRouteResult = route('http', 'aBcDeFgHiJkLmNoPqRsT', mockConfig);

      expect(result['primaryServer']).toBeDefined();

      expect(result['primaryServer']!['name']).toBe('alpha');

      return;
    });

    it('returns error when no context matches', () => {
      const result: TestsWorkerPipelineRouteResult = route('http', 'unknown', mockConfig);

      expect(result['error']).toBeDefined();

      expect(result['context']).toBeUndefined();

      return;
    });

    it('does not match email contexts for HTTP route type', () => {
      const result: TestsWorkerPipelineRouteResult = route('http', 'pfsense', mockConfig);

      expect(result['error']).toBeDefined();

      expect(result['context']).toBeUndefined();

      return;
    });

    return;
  });

  /**
   * Tests - Worker - Pipeline - Route - Email Routing.
   *
   * @since 2.0.0
   */
  describe('Email routing', () => {
    it('matches a context by id for email type', () => {
      const result: TestsWorkerPipelineRouteResult = route('email', 'pfsense', mockConfig);

      expect(result['context']).toBeDefined();

      expect(result['context']!['name']).toBe('pfsense-email');

      return;
    });

    it('resolves server configs for email context', () => {
      const result: TestsWorkerPipelineRouteResult = route('email', 'pfsense', mockConfig);

      expect(result['resolvedServers']).toHaveLength(1);

      expect(result['resolvedServers']![0]!['name']).toBe('alpha');

      return;
    });

    it('identifies the primary server for email context', () => {
      const result: TestsWorkerPipelineRouteResult = route('email', 'pfsense', mockConfig);

      expect(result['primaryServer']).toBeDefined();

      expect(result['primaryServer']!['name']).toBe('alpha');

      return;
    });

    it('returns error when no email context matches', () => {
      const result: TestsWorkerPipelineRouteResult = route('email', 'unknown', mockConfig);

      expect(result['error']).toBeDefined();

      expect(result['context']).toBeUndefined();

      return;
    });

    it('does not match HTTP contexts for email route type', () => {
      const result: TestsWorkerPipelineRouteResult = route('email', 'aBcDeFgHiJkLmNoPqRsT', mockConfig);

      expect(result['error']).toBeDefined();

      expect(result['context']).toBeUndefined();

      return;
    });

    return;
  });

  return;
});
