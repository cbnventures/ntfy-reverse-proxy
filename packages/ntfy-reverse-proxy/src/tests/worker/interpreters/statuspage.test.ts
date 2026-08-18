import {
  describe, expect, it, vi,
} from 'vitest';

import { statuspageInterpreter } from '../../../worker/interpreters/statuspage.js';

import type {
  Tests_Worker_Interpreters_Statuspage_CreateMockKv_Initial,
  Tests_Worker_Interpreters_Statuspage_CreateMockKv_Resolved,
  Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns,
  Tests_Worker_Interpreters_Statuspage_CreateMockKv_Store,
  Tests_Worker_Interpreters_Statuspage_CreateMockKv_Value,
  Tests_Worker_Interpreters_Statuspage_KvCast,
  Tests_Worker_Interpreters_Statuspage_MakeInput_Impact,
  Tests_Worker_Interpreters_Statuspage_MakeInput_Returns,
  Tests_Worker_Interpreters_Statuspage_ResultNotNull,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_ExistingState,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_ExistingState,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_ExistingState,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_HasKey,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Stored,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_StoredRaw,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalInput,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalNotification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalResult,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorInput,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorNotification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorResult,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorInput,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorNotification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorResult,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Result,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Stored,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredComponents,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredRaw,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Promise,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Input,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Notification,
  Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Result,
  Tests_Worker_Interpreters_Statuspage_StoredRawCast,
} from '../../../types/tests/worker/interpreters/statuspage.test.d.ts';

/**
 * Tests - Worker - Interpreters - Statuspage - Create Mock Kv.
 *
 * @param {Tests_Worker_Interpreters_Statuspage_CreateMockKv_Initial} initial - Initial.
 *
 * @returns {Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns}
 *
 * @since 2.0.0
 */
function createMockKv(initial: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Initial = {}): Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns {
  const store: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Store = new Map(Object.entries(initial));

  return {
    get: vi.fn((key) => {
      const value: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Value = store.get(key);
      const resolved: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Resolved = value ?? null;

      return Promise.resolve(resolved);
    }),
    put: vi.fn((key, value) => {
      store.set(key, value);

      return Promise.resolve();
    }),
    delete: vi.fn((key) => {
      store.delete(key);

      return Promise.resolve();
    }),
    store,
  };
}

/**
 * Tests - Worker - Interpreters - Statuspage - Make Input.
 *
 * @param {Tests_Worker_Interpreters_Statuspage_MakeInput_Impact} impact - Impact.
 *
 * @returns {Tests_Worker_Interpreters_Statuspage_MakeInput_Returns}
 *
 * @since 2.0.0
 */
function makeInput(impact: Tests_Worker_Interpreters_Statuspage_MakeInput_Impact): Tests_Worker_Interpreters_Statuspage_MakeInput_Returns {
  return {
    page: { id: 'page123' },
    incident: {
      name: 'Test',
      status: 'investigating',
      impact,
      incident_updates: [{
        id: `upd-${impact}`,
        body: 'Testing.',
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
    const kv: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv = createMockKv();
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Input = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      component_update: {
        old_status: 'operational',
        new_status: 'partial_outage',
      },
      component: {
        id: 'comp1',
        name: 'Actions',
        status: 'partial_outage',
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Result = await statuspageInterpreter(input, { kv: kv as Tests_Worker_Interpreters_Statuspage_KvCast as KVNamespace });

    expect(result).toBeNull();

    expect(kv['put']).toHaveBeenCalledOnce();

    const storedRaw: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredRaw = kv['store'].get('statuspage:page123');
    const stored: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Stored = JSON.parse(storedRaw as Tests_Worker_Interpreters_Statuspage_StoredRawCast);

    const storedComponents: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredComponents = stored['components'] as Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredComponents;

    expect(storedComponents['comp1']).toEqual({
      name: 'Actions',
      status: 'partial_outage',
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
    const existingState: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_ExistingState = JSON.stringify({
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
          name: 'Actions',
          status: 'operational',
        },
        comp2: {
          name: 'Webhooks',
          status: 'operational',
        },
      },
    });

    const kv: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv = createMockKv({ 'statuspage:page123': existingState });
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Input = {
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
            code: 'comp1',
            name: 'Actions',
            old_status: 'operational',
            new_status: 'partial_outage',
          }],
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Result = await statuspageInterpreter(input, { kv: kv as Tests_Worker_Interpreters_Statuspage_KvCast as KVNamespace });

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

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
    const existingState: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_ExistingState = JSON.stringify({
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

    const kv: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv = createMockKv({ 'statuspage:page123': existingState });
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Input = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        id: 'inc1',
        name: 'Outage',
        status: 'investigating',
        impact: 'minor',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd1',
          body: 'Investigating.',
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Result = await statuspageInterpreter(input, { kv: kv as Tests_Worker_Interpreters_Statuspage_KvCast as KVNamespace });

    expect(result).toBeNull();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('keeps KV state on resolved incident for dedup', async () => {
    const existingState: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_ExistingState = JSON.stringify({
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

    const kv: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv = createMockKv({ 'statuspage:page123': existingState });
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Input = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        id: 'inc1',
        name: 'Outage',
        status: 'resolved',
        impact: 'minor',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd2',
          body: 'This incident has been resolved.',
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Result = await statuspageInterpreter(input, { kv: kv as Tests_Worker_Interpreters_Statuspage_KvCast as KVNamespace });

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Outage');

    const hasKey: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_HasKey = kv['store'].has('statuspage:page123');

    expect(hasKey).toBe(true);

    const storedRaw: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_StoredRaw = kv['store'].get('statuspage:page123');
    const stored: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Stored = JSON.parse(storedRaw as Tests_Worker_Interpreters_Statuspage_StoredRawCast);

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
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Input = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        name: 'Outage',
        status: 'investigating',
        impact: 'major',
        shortlink: 'https://stspg.io/abc',
        incident_updates: [{
          id: 'upd1',
          body: 'We are investigating.',
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Result = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

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
    const minorInput: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorInput = makeInput('minor');
    const minorResult: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorResult = await statuspageInterpreter(minorInput);
    const minorNotification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorNotification = (minorResult as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(minorNotification['priority']).toBe(3);

    const majorInput: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorInput = makeInput('major');
    const majorResult: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorResult = await statuspageInterpreter(majorInput);
    const majorNotification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorNotification = (majorResult as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(majorNotification['priority']).toBe(4);

    const criticalInput: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalInput = makeInput('critical');
    const criticalResult: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalResult = await statuspageInterpreter(criticalInput);
    const criticalNotification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalNotification = (criticalResult as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(criticalNotification['priority']).toBe(5);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('throws on unrecognized payload', async () => {
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Input = {
      page: { id: 'page123' },
      unknown_field: true,
    };
    const promise: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Promise = statuspageInterpreter(input);

    await expect(promise).rejects.toThrow('Unrecognized Statuspage.io payload');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('uses incident name in title and status/impact in body', async () => {
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Input = {
      page: { id: 'page123' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        name: 'Outage',
        status: 'identified',
        impact: 'critical',
        incident_updates: [{
          id: 'upd1',
          body: 'Issue identified.',
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Result = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

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
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Input = {
      page: { id: 'page123' },
      component_update: {
        old_status: 'operational',
        new_status: 'partial_outage',
      },
      component: {
        id: 'comp1',
        name: 'Actions',
        status: 'partial_outage',
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Result = await statuspageInterpreter(input);

    expect(result).toBeNull();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.0.0
   */
  it('does not crash when page is null', async () => {
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Input = {
      page: null,
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: {
        name: 'Outage',
        status: 'investigating',
        impact: 'minor',
        incident_updates: [{
          id: 'upd1',
          body: 'We are investigating.',
        }],
      },
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Result = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Outage');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.1.0
   */
  it('does not crash when incident is null', async () => {
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Input = {
      page: { id: 'abc' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      incident: null,
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Result = await statuspageInterpreter(input);

    expect(result).not.toBeNull();

    const notification: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Notification = (result as Tests_Worker_Interpreters_Statuspage_ResultNotNull)['notification'];

    expect(notification['title']).toBe('[githubstatus.com] Incident');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Statuspage.
   *
   * @since 2.1.0
   */
  it('does not crash when component fields are null', async () => {
    const input: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Input = {
      page: { id: 'abc' },
      meta: { unsubscribe: 'https://githubstatus.com/unsubscribe' },
      component_update: null,
      component: null,
    };

    const result: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Result = await statuspageInterpreter(input);

    expect(result).toBeNull();

    return;
  });

  return;
});
