import {
  describe, expect, it, vi,
} from 'vitest';

import { statuspageInterpreter } from '../../../worker/interpreters/statuspage.js';

import type {
  TestsWorkerInterpretersStatuspageExistingState,
  TestsWorkerInterpretersStatuspageImpact,
  TestsWorkerInterpretersStatuspageInput,
  TestsWorkerInterpretersStatuspageKvCast,
  TestsWorkerInterpretersStatuspageKvDeleteFn,
  TestsWorkerInterpretersStatuspageKvGetFn,
  TestsWorkerInterpretersStatuspageKvGetReturn,
  TestsWorkerInterpretersStatuspageKvInitial,
  TestsWorkerInterpretersStatuspageKvMock,
  TestsWorkerInterpretersStatuspageKvPutFn,
  TestsWorkerInterpretersStatuspageKvStore,
  TestsWorkerInterpretersStatuspageMakeInputReturn,
  TestsWorkerInterpretersStatuspageNotification,
  TestsWorkerInterpretersStatuspagePromise,
  TestsWorkerInterpretersStatuspageResult,
  TestsWorkerInterpretersStatuspageResultNotNull,
  TestsWorkerInterpretersStatuspageStoredComponentsRecord,
  TestsWorkerInterpretersStatuspageStoredParsed,
  TestsWorkerInterpretersStatuspageStoredRaw,
  TestsWorkerInterpretersStatuspageStoredRawCast,
  TestsWorkerInterpretersStatuspageStoreHasResult,
} from '../../../types/tests/worker/interpreters/statuspage.test.d.ts';

/**
 * Tests - Worker - Interpreters - Statuspage - Create Mock Kv.
 *
 * @param {TestsWorkerInterpretersStatuspageKvInitial} initial - Initial.
 *
 * @returns {TestsWorkerInterpretersStatuspageKvMock}
 *
 * @since 2.0.0
 */
function createMockKv(initial: TestsWorkerInterpretersStatuspageKvInitial = {}): TestsWorkerInterpretersStatuspageKvMock {
  const store: TestsWorkerInterpretersStatuspageKvStore = new Map(Object.entries(initial));

  const getFn: TestsWorkerInterpretersStatuspageKvGetFn = (key) => {
    const value: TestsWorkerInterpretersStatuspageStoredRaw = store.get(key);
    const resolved: TestsWorkerInterpretersStatuspageKvGetReturn = value ?? null;

    return Promise.resolve(resolved);
  };

  const putFn: TestsWorkerInterpretersStatuspageKvPutFn = (key, value) => {
    store.set(key, value);

    return Promise.resolve();
  };

  const deleteFn: TestsWorkerInterpretersStatuspageKvDeleteFn = (key) => {
    store.delete(key);

    return Promise.resolve();
  };

  return {
    get: vi.fn(getFn),
    put: vi.fn(putFn),
    delete: vi.fn(deleteFn),
    store,
  };
}

/**
 * Tests - Worker - Interpreters - Statuspage - Make Input.
 *
 * @param {TestsWorkerInterpretersStatuspageImpact} impact - Impact.
 *
 * @returns {TestsWorkerInterpretersStatuspageMakeInputReturn}
 *
 * @since 2.0.0
 */
function makeInput(impact: TestsWorkerInterpretersStatuspageImpact): TestsWorkerInterpretersStatuspageMakeInputReturn {
  return {
    page: { id: 'page123' },
    incident: {
      name: 'Test',
      status: 'investigating',
      impact,
      incident_updates: [{
        id: `upd-${impact}`, body: 'Testing.',
      }],
    },
  };
}

/**
 * Tests - Worker - Interpreters - Statuspage - Interpreter.
 *
 * @since 2.0.0
 */
describe('statuspageInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('silently accumulates component-only webhooks in KV', async () => {
    const kv: TestsWorkerInterpretersStatuspageKvMock = createMockKv();
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      component_update: {
        old_status: 'operational', new_status: 'partial_outage',
      },
      component: {
        id: 'comp1', name: 'Actions', status: 'partial_outage',
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input, { kv: kv as TestsWorkerInterpretersStatuspageKvCast as KVNamespace });

    expect(result).toBeNull();

    expect(kv['put']).toHaveBeenCalledOnce();

    const storedRaw: TestsWorkerInterpretersStatuspageStoredRaw = kv['store'].get('statuspage:page123');
    const stored: TestsWorkerInterpretersStatuspageStoredParsed = JSON.parse(storedRaw as TestsWorkerInterpretersStatuspageStoredRawCast);

    const storedComponents: TestsWorkerInterpretersStatuspageStoredComponentsRecord = stored['components'] as TestsWorkerInterpretersStatuspageStoredComponentsRecord;

    expect(storedComponents['comp1']).toEqual({
      name: 'Actions', status: 'partial_outage',
    });

    expect(stored['serviceName']).toBe('githubstatus.com');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('fires notification on incident webhook with accumulated components', async () => {
    const existingState: TestsWorkerInterpretersStatuspageExistingState = JSON.stringify({
      incidentId: undefined,
      incidentName: undefined,
      status: undefined,
      impact: undefined,
      body: undefined,
      shortlink: undefined,
      serviceName: 'githubstatus.com',
      unsubscribeUrl: 'https://githubstatus.com/unsubscribe',
      updateId: undefined,
      components: {
        comp1: {
          name: 'Actions', status: 'operational',
        },
        comp2: {
          name: 'Webhooks', status: 'operational',
        },
      },
    });

    const kv: TestsWorkerInterpretersStatuspageKvMock = createMockKv({ 'statuspage:page123': existingState });
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        id: 'inc1',
        name: 'Disruption with some GitHub services',
        status: 'investigating',
        impact: 'minor',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd1',
          body: 'We are investigating elevated error rates.',
          affected_components: [{
            code: 'comp1', name: 'Actions', old_status: 'operational', new_status: 'partial_outage',
          }],
        }],
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input, { kv: kv as TestsWorkerInterpretersStatuspageKvCast as KVNamespace });

    expect(result).not.toBeNull();

    const notification: TestsWorkerInterpretersStatuspageNotification = (result as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Disruption with some GitHub services');

    expect(notification['body']).toContain('**Status:** Investigating');

    expect(notification['body']).toContain('**Impact:** Minor');

    expect(notification['body']).toContain('> We are investigating elevated error rates.');

    expect(notification['body']).toContain('- Actions (Partial Outage)');

    expect(notification['body']).toContain('- Webhooks (Operational)');

    expect(notification['priority']).toBe(3);

    expect(notification['tags']).toContain('statuspage');

    expect(notification['tags']).toContain('investigating');

    expect(notification['markdown']).toBe(true);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('deduplicates identical incident webhooks with same updateId', async () => {
    const existingState: TestsWorkerInterpretersStatuspageExistingState = JSON.stringify({
      incidentId: 'inc1',
      incidentName: 'Outage',
      status: 'investigating',
      impact: 'minor',
      body: 'Investigating.',
      shortlink: 'https://stspg.io/abc',
      serviceName: 'githubstatus.com',
      unsubscribeUrl: 'https://githubstatus.com/unsubscribe',
      updateId: 'upd1',
      components: {},
    });

    const kv: TestsWorkerInterpretersStatuspageKvMock = createMockKv({ 'statuspage:page123': existingState });
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        id: 'inc1',
        name: 'Outage',
        status: 'investigating',
        impact: 'minor',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd1', body: 'Investigating.',
        }],
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input, { kv: kv as TestsWorkerInterpretersStatuspageKvCast as KVNamespace });

    expect(result).toBeNull();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('keeps KV state on resolved incident for dedup', async () => {
    const existingState: TestsWorkerInterpretersStatuspageExistingState = JSON.stringify({
      incidentId: 'inc1',
      incidentName: 'Outage',
      status: 'investigating',
      impact: 'minor',
      body: 'Investigating.',
      shortlink: 'https://stspg.io/abc',
      serviceName: 'githubstatus.com',
      unsubscribeUrl: 'https://githubstatus.com/unsubscribe',
      updateId: 'upd1',
      components: {},
    });

    const kv: TestsWorkerInterpretersStatuspageKvMock = createMockKv({ 'statuspage:page123': existingState });
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        id: 'inc1',
        name: 'Outage',
        status: 'resolved',
        impact: 'minor',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd2', body: 'This incident has been resolved.',
        }],
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input, { kv: kv as TestsWorkerInterpretersStatuspageKvCast as KVNamespace });

    expect(result).not.toBeNull();

    const notification: TestsWorkerInterpretersStatuspageNotification = (result as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Outage');

    const hasKey: TestsWorkerInterpretersStatuspageStoreHasResult = kv['store'].has('statuspage:page123');

    expect(hasKey).toBe(true);

    const storedRaw: TestsWorkerInterpretersStatuspageStoredRaw = kv['store'].get('statuspage:page123');
    const stored: TestsWorkerInterpretersStatuspageStoredParsed = JSON.parse(storedRaw as TestsWorkerInterpretersStatuspageStoredRawCast);

    expect(stored['updateId']).toBe('upd2');

    expect(stored['status']).toBe('resolved');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('falls back to original behavior without KV context', async () => {
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        name: 'Outage',
        status: 'investigating',
        impact: 'major',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd1', body: 'We are investigating.',
        }],
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: TestsWorkerInterpretersStatuspageNotification = (result as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Outage');

    expect(notification['body']).toContain('**Status:** Investigating');

    expect(notification['body']).toContain('**Impact:** Major');

    expect(notification['body']).toContain('> We are investigating.');

    expect(notification['priority']).toBe(4);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('maps impact to priority correctly', async () => {
    const minorInput: TestsWorkerInterpretersStatuspageMakeInputReturn = makeInput('minor');
    const minorResult: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(minorInput);
    const minorNotification: TestsWorkerInterpretersStatuspageNotification = (minorResult as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(minorNotification['priority']).toBe(3);

    const majorInput: TestsWorkerInterpretersStatuspageMakeInputReturn = makeInput('major');
    const majorResult: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(majorInput);
    const majorNotification: TestsWorkerInterpretersStatuspageNotification = (majorResult as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(majorNotification['priority']).toBe(4);

    const criticalInput: TestsWorkerInterpretersStatuspageMakeInputReturn = makeInput('critical');
    const criticalResult: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(criticalInput);
    const criticalNotification: TestsWorkerInterpretersStatuspageNotification = (criticalResult as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(criticalNotification['priority']).toBe(5);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('throws on unrecognized payload', async () => {
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' }, unknown_field: true,
    };
    const promise: TestsWorkerInterpretersStatuspagePromise = statuspageInterpreter(input);

    await expect(promise).rejects.toThrow('Unrecognized Statuspage.io payload');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('uses incident name in title and status/impact in body', async () => {
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        name: 'Outage',
        status: 'identified',
        impact: 'critical',
        incident_updates: [{
          id: 'upd1', body: 'Issue identified.',
        }],
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: TestsWorkerInterpretersStatuspageNotification = (result as TestsWorkerInterpretersStatuspageResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Outage');

    expect(notification['body']).toContain('**Status:** Identified');

    expect(notification['body']).toContain('**Impact:** Critical');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('returns null for component-only webhooks without KV', async () => {
    const input: TestsWorkerInterpretersStatuspageInput = {
      page: { id: 'page123' },
      component_update: {
        old_status: 'operational', new_status: 'partial_outage',
      },
      component: {
        id: 'comp1', name: 'Actions', status: 'partial_outage',
      },
    };

    const result: TestsWorkerInterpretersStatuspageResult = await statuspageInterpreter(input);

    expect(result).toBeNull();

    return;
  });

  return;
});
