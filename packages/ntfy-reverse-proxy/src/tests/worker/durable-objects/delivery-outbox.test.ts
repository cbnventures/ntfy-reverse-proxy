import { DatabaseSync } from 'node:sqlite';

import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import { Runner as DeliveryOutbox, setConfiguredServers } from '../../../worker/durable-objects/delivery-outbox.js';

import type {
  Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_DurableObject,
  Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject,
  Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_CreateDeliveryOutbox_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Body,
  Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_ErrorTopic,
  Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Diagnostic,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticBytes,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticCall,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticInit,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiscardedResult,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodFirst,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodSecond,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Poison,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Result,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_AttemptRows,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_FirstOutbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_SecondOutbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_ExpectedBodies,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Attachment,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_FirstAlarm,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_SecondAlarm,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Columns,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_MockFetch,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Outbox,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Payload,
  Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Row,
  Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Alarm,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_AlarmTimes,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Close_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DatabasePath,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_ConsumeAlarm_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Bindings,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_BindingsCast,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Cast,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Execute,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Query,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_SqlExec,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Database,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DeleteAlarm_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Bindings,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Columns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_CursorCast,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_NormalizedBindings,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Query,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Row,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Rows,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_RowsCast,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Statement,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_GetAlarm_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Bindings,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Query,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_ScheduledTime,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Closure,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Result,
  Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Returns,
  Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner,
} from '../../../types/tests/worker/durable-objects/delivery-outbox.test.d.ts';

/**
 * Tests - Worker - Durable Objects - Delivery Outbox.
 *
 * Stores the Durable Object state on the test instance the same way the
 * Workers base class does so production methods can use their normal fields.
 *
 * @since 2.4.0
 */
vi.mock('cloudflare:workers', () => {
  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Initialize Durable Object.
   *
   * Assigns the runtime fields that the production base class normally owns.
   * Keeping it named lets the mock remain constructable without a second class.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Returns}
   *
   * @since 2.4.0
   */
  const initializeDurableObject: Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject = function (
    ctx,
    env,
  ): Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Returns {
    Reflect.set(this, 'ctx', ctx);
    Reflect.set(this, 'env', env);

    return;
  };
  const durableObject: Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_DurableObject = vi.fn(initializeDurableObject);

  return {
    DurableObject: durableObject,
  };
});

/**
 * Tests - Worker - Durable Objects - Delivery Outbox.
 *
 * Provides stateful SQLite and alarm storage that can be shared by separate
 * production Durable Object instances to simulate an isolate restart.
 *
 * @since 2.4.0
 */
class Runner {
  /**
   * Scheduled alarm times recorded by the fake storage.
   *
   * Tests use this history to ensure retries re-arm one alarm at a time.
   *
   * @since 2.4.0
   */
  public readonly alarmTimes: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_AlarmTimes;

  /**
   * Current alarm time, or null after the runtime consumes it.
   *
   * The field models the single-alarm guarantee of Durable Object storage.
   *
   * @private
   *
   * @since 2.4.0
   */
  #alarm: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Alarm;

  /**
   * In-memory database shared for the lifetime of this storage runner.
   *
   * Recreating the production object leaves this database untouched.
   *
   * @private
   *
   * @since 2.4.0
   */
  readonly #database: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Database;

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Constructor.
   *
   * Starts with an empty in-memory SQLite database and no scheduled alarm.
   * Each test owns one runner and closes it after the scenario finishes.
   *
   * @since 2.4.0
   */
  public constructor() {
    const databasePath: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DatabasePath = ':memory:';

    this.#alarm = null;
    this.#database = new DatabaseSync(databasePath);
    this.alarmTimes = [];

    return;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Close.
   *
   * Releases the native SQLite handle once a test finishes using the runner.
   * The explicit lifecycle keeps file descriptors out of later test cases.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Close_Returns}
   *
   * @since 2.4.0
   */
  public close(): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Close_Returns {
    this.#database.close();

    return;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Consume Alarm.
   *
   * Simulates the Workers runtime consuming the current alarm before invoking
   * the Durable Object alarm handler, allowing that handler to re-arm it.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_ConsumeAlarm_Returns}
   *
   * @since 2.4.0
   */
  public consumeAlarm(): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_ConsumeAlarm_Returns {
    this.#alarm = null;

    return;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Create State.
   *
   * Adapts the stateful fake to the subset of Durable Object storage used by
   * the outbox while retaining the platform's public state type at its edge.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Returns}
   *
   * @since 2.4.0
   */
  public createState(): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Returns {
    const execute: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Execute = this.#execute.bind(this);
    const sqlExec: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_SqlExec = new Proxy(execute, {
      apply: (_target, _thisArg, argumentList) => execute(
        argumentList[0] as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Query,
        argumentList.slice(1) as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_BindingsCast as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Bindings,
      ),
    });

    return {
      storage: {
        sql: {
          exec: sqlExec,
        },
        transactionSync: this['transactionSync'].bind(this),
        getAlarm: this['getAlarm'].bind(this),
        setAlarm: this['setAlarm'].bind(this),
        deleteAlarm: this['deleteAlarm'].bind(this),
      },
    } as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Cast as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Returns;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Delete Alarm.
   *
   * Clears the one alarm after a lane drains completely.
   * The fake mirrors the asynchronous storage API used in production.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DeleteAlarm_Returns}
   *
   * @since 2.4.0
   */
  public async deleteAlarm(): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DeleteAlarm_Returns {
    this.#alarm = null;

    return;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Get Alarm.
   *
   * Reads the current scheduled alarm without changing it.
   * Production retry policy uses this to avoid piling up alarms.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_GetAlarm_Returns}
   *
   * @since 2.4.0
   */
  public getAlarm(): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_GetAlarm_Returns {
    return Promise.resolve(this.#alarm);
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Query.
   *
   * Exposes read-only assertions through the same SQLite execution adapter.
   * Tests can inspect persistent state without reaching into private fields.
   *
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Query}    query      - Query.
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Bindings} [bindings] - Bindings.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Returns}
   *
   * @since 2.4.0
   */
  public query(query: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Query, bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Bindings = []): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Returns {
    return this.#execute(query, bindings).toArray();
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Set Alarm.
   *
   * Replaces the single runtime alarm and records when it was armed.
   * The history makes backoff and no-pile-up assertions deterministic.
   *
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_ScheduledTime} scheduledTime - Scheduled time.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_Returns}
   *
   * @since 2.4.0
   */
  public async setAlarm(scheduledTime: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_ScheduledTime): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_Returns {
    this.#alarm = scheduledTime;
    this['alarmTimes'].push(scheduledTime);

    return;
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Transaction Sync.
   *
   * Executes storage mutations atomically with explicit SQLite transaction
   * boundaries, matching the Durable Object storage callback contract.
   *
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Closure} closure - Closure.
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Returns}
   *
   * @since 2.4.0
   */
  public transactionSync<Return>(closure: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Closure<Return>): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Returns<Return> {
    this.#database.exec('BEGIN IMMEDIATE');

    try {
      const result: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Result<Return> = closure();

      this.#database.exec('COMMIT');

      return result;
    } catch (err) {
      this.#database.exec('ROLLBACK');

      throw err;
    }
  }

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox - Execute.
   *
   * Converts SQLite rows and bindings to the Cloudflare SQL cursor surface
   * consumed by the production outbox without replacing its SQL statements.
   *
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Query}    query    - Query.
   * @param {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Bindings} bindings - Bindings.
   *
   * @private
   *
   * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Returns}
   *
   * @since 2.4.0
   */
  #execute<Row extends Record<string, SqlStorageValue>>(query: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Query, bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Bindings = []): Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Returns<Row> {
    const statement: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Statement = this.#database.prepare(query);
    const normalizedBindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_NormalizedBindings = bindings.map((binding) => (binding instanceof ArrayBuffer) ? new Uint8Array(binding) : binding);
    const columns: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Columns = statement.columns();
    let rows: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Rows<Row> = [];

    if (columns.length === 0) {
      statement.run(...normalizedBindings);
    } else {
      rows = statement.all(...normalizedBindings) as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_RowsCast as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Rows<Row>;
    }

    return {
      toArray: () => rows,
      one: () => {
        if (rows.length !== 1) {
          throw new Error(`Expected one SQL row, received ${String(rows.length)}`);
        }

        return rows[0] as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Row<Row>;
      },
    } as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_CursorCast as Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Returns<Row>;
  }
}

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Delivery Outbox.
 *
 * Builds a production outbox against the supplied persistent fake storage.
 * Calling it again with the same runner simulates a new object isolate.
 *
 * @param {Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner} storageRunner - Storage runner.
 *
 * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_CreateDeliveryOutbox_Returns}
 *
 * @since 2.4.0
 */
function createDeliveryOutbox(storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner): Tests_Worker_DurableObjects_DeliveryOutbox_CreateDeliveryOutbox_Returns {
  return new DeliveryOutbox(storageRunner.createState(), {});
}

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Options.
 *
 * Builds the smallest valid notification payload used across outbox tests.
 * Optional error-topic metadata exercises one-shot discard diagnostics.
 *
 * @param {Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Body}       body         - Body.
 * @param {Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_ErrorTopic} [errorTopic] - Error topic.
 *
 * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Returns}
 *
 * @since 2.4.0
 */
function createOptions(body: Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Body, errorTopic?: Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_ErrorTopic): Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Returns {
  return {
    messages: [{
      body,
    }],
    serverNames: ['alpha'],
    primaryServerName: 'alpha',
    topic: 'alerts',
    mode: 'send-once',
    contextName: 'Test Context',
    interpreterName: 'plain-text',
    ...((errorTopic !== undefined) ? { errorTopic } : {}),
  };
}

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Storage Runner.
 *
 * Creates one stateful SQLite and alarm owner for a test scenario.
 * The returned surface is shared by production object restarts.
 *
 * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_Returns}
 *
 * @since 2.4.0
 */
function createStorageRunner(): Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_Returns {
  return new Runner();
}

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Get First Row.
 *
 * Returns one required query row so assertions do not hide missing state.
 * A missing row fails the test at the point where it was expected.
 *
 * @param {Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Rows} rows - Rows.
 *
 * @returns {Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Returns}
 *
 * @since 2.4.0
 */
function getFirstRow(rows: Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Rows): Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Returns {
  const row: Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Row = rows[0];

  if (row === undefined) {
    throw new Error('Expected at least one SQL row');
  }

  return row;
}

beforeEach(() => {
  setConfiguredServers([{
    name: 'alpha',
    server: 'https://ntfy.example.com',
    token: 'tk_test',
  }]);

  return;
});

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox.
 *
 * @since 2.4.0
 */
describe('DeliveryOutbox', () => {
  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('discards a permanent 400 head and delivers later rows in FIFO order', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_MockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('bad request', { status: 400 }))
      .mockResolvedValueOnce(new Response('diagnostic sent', { status: 200 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const poison: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Poison = outbox.enqueue(createOptions('poison', 'delivery-errors'));
    const goodFirst: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodFirst = outbox.enqueue(createOptions('good-1'));
    const goodSecond: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodSecond = outbox.enqueue(createOptions('good-2'));
    const results: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results = await Promise.all([
      poison,
      goodFirst,
      goodSecond,
    ]);
    const discardedResult: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiscardedResult = results[0];

    if (discardedResult === undefined) {
      throw new Error('Expected the discarded delivery result');
    }

    expect(results.map((result) => result['state'])).toEqual([
      'discarded',
      'delivered',
      'delivered',
    ]);

    expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://ntfy.example.com/alerts', expect.objectContaining({
      method: 'POST',
      body: 'poison',
    }));

    expect(mockFetch).toHaveBeenNthCalledWith(3, 'https://ntfy.example.com/alerts', expect.objectContaining({
      method: 'POST',
      body: 'good-1',
    }));

    expect(mockFetch).toHaveBeenNthCalledWith(4, 'https://ntfy.example.com/alerts', expect.objectContaining({
      method: 'POST',
      body: 'good-2',
    }));

    const diagnosticCall: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticCall = mockFetch.mock.calls[1];

    if (diagnosticCall === undefined) {
      throw new Error('Expected the discard diagnostic request');
    }

    const diagnosticInit: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticInit = diagnosticCall[1] as Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticInit;
    const diagnosticBytes: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticBytes = new Uint8Array(diagnosticInit['body'] as ArrayBuffer);
    const diagnostic: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Diagnostic = JSON.parse(new TextDecoder().decode(diagnosticBytes)) as Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Diagnostic;

    expect(diagnostic).toEqual(expect.objectContaining({
      context: {
        name: 'Test Context',
        interpreter: 'plain-text',
        stage: 'delivery',
      },
      delivery_id: discardedResult['deliveryId'],
      reason: 'HTTP 400',
      http_status: 400,
      attempt_count: 1,
    }));

    expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://ntfy.example.com/delivery-errors', expect.objectContaining({ method: 'PUT' }));

    expect(getFirstRow(storageRunner.query('SELECT COUNT(*) AS count FROM notifications'))['count']).toBe(0);

    storageRunner.close();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('retries transient 503 failures through alarms until delivery succeeds', async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date('2026-11-16T12:00:00Z'));

    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_MockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    await outbox.enqueue(createOptions('retry-me'));

    const firstAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_FirstAlarm = storageRunner['alarmTimes'][0];

    expect(firstAlarm).toBe(Date.now() + 60_000);

    storageRunner.consumeAlarm();

    await outbox.alarm();

    const secondAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_SecondAlarm = storageRunner['alarmTimes'][1];

    expect(secondAlarm).toBe(Date.now() + 120_000);

    storageRunner.consumeAlarm();

    await outbox.alarm();

    expect(mockFetch).toHaveBeenCalledTimes(3);

    expect(getFirstRow(storageRunner.query('SELECT COUNT(*) AS count FROM notifications'))['count']).toBe(0);

    expect(await storageRunner.getAlarm()).toBeNull();

    storageRunner.close();

    vi.useRealTimers();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('preserves every notification through an outage across several posts', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_MockFetch = vi.fn();

    for (let index = 0; index < 6; index += 1) {
      mockFetch.mockResolvedValueOnce(new Response('unavailable', { status: 503 }));
    }

    mockFetch.mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    await outbox.enqueue(createOptions('n1'));
    await outbox.enqueue(createOptions('n2'));
    await outbox.enqueue(createOptions('n3'));
    await outbox.enqueue(createOptions('n4'));
    await outbox.enqueue(createOptions('n5'));
    await outbox.enqueue(createOptions('n6'));

    expect(storageRunner['alarmTimes']).toHaveLength(1);

    await outbox.enqueue(createOptions('n7'));

    const expectedBodies: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_ExpectedBodies = [
      'n1',
      'n2',
      'n3',
      'n4',
      'n5',
      'n6',
      'n7',
    ];

    expectedBodies.forEach((body, index) => {
      expect(mockFetch).toHaveBeenNthCalledWith(index + 7, 'https://ntfy.example.com/alerts', expect.objectContaining({
        method: 'POST',
        body,
      }));

      return;
    });

    const rows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Rows = storageRunner.query('SELECT delivery_id FROM notifications');

    expect(rows).toHaveLength(0);

    storageRunner.close();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('purges an aged transient row and its persisted data after the minimum attempts', async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date('2026-11-16T12:00:00Z'));

    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_MockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }));
    const attachment: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Attachment = new TextEncoder().encode('attachment').buffer as ArrayBuffer;

    vi.stubGlobal('fetch', mockFetch);

    await outbox.enqueue({
      ...createOptions('part-1'),
      messages: [
        {
          body: 'part-1',
        },
        {
          body: 'part-2',
        },
      ],
      attachment,
      filename: 'evidence.txt',
    });

    expect(getFirstRow(storageRunner.query('SELECT COUNT(*) AS count FROM notifications'))['count']).toBe(1);

    expect(getFirstRow(storageRunner.query('SELECT COUNT(*) AS count FROM attachment_chunks'))['count']).toBe(1);

    expect(getFirstRow(storageRunner.query('SELECT COUNT(*) AS count FROM delivery_progress'))['count']).toBe(1);

    vi.setSystemTime(new Date('2026-11-17T12:00:00.001Z'));

    storageRunner.consumeAlarm();

    await outbox.alarm();

    storageRunner.consumeAlarm();

    await outbox.alarm();

    const rows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Rows = storageRunner.query([
      'SELECT',
      '(SELECT COUNT(*) FROM notifications) AS notifications,',
      '(SELECT COUNT(*) FROM attachment_chunks) AS attachments,',
      '(SELECT COUNT(*) FROM delivery_progress) AS progress',
    ].join('\n'));

    expect(getFirstRow(rows)).toEqual({
      notifications: 0,
      attachments: 0,
      progress: 0,
    });

    storageRunner.close();

    vi.useRealTimers();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('discards a row whose configured server is missing', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_MockFetch = vi.fn();

    vi.stubGlobal('fetch', mockFetch);

    const result: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Result = await outbox.enqueue({
      ...createOptions('missing-server'),
      serverNames: ['renamed'],
      primaryServerName: 'renamed',
    });

    const rows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Rows = storageRunner.query('SELECT delivery_id FROM notifications');

    expect(result['state']).toBe('discarded');

    expect(rows).toHaveLength(0);

    expect(mockFetch).not.toHaveBeenCalled();

    storageRunner.close();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('upgrades and handles rows from the legacy notifications schema', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const payload: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Payload = JSON.stringify({
      messages: [{
        body: 'legacy',
        headers: {},
      }],
      serverNames: ['alpha'],
      primaryServerName: 'alpha',
      topic: 'alerts',
      mode: 'send-once',
      hasAttachment: false,
    });

    storageRunner.query([
      'CREATE TABLE notifications (',
      'position INTEGER PRIMARY KEY AUTOINCREMENT,',
      'delivery_id TEXT UNIQUE NOT NULL,',
      'payload TEXT NOT NULL,',
      'created_at INTEGER NOT NULL',
      ')',
    ].join('\n'));
    storageRunner.query('INSERT INTO notifications (delivery_id, payload, created_at) VALUES (?, ?, ?)', [
      'legacy-id',
      payload,
      Date.now(),
    ]);

    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Outbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const columns: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Columns = storageRunner.query('PRAGMA table_info(notifications)');

    expect(columns.map((column) => column['name'])).toEqual(expect.arrayContaining([
      'attempt_count',
      'diagnostic_config',
    ]));

    await outbox.alarm();

    const rows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Rows = storageRunner.query('SELECT delivery_id FROM notifications');

    expect(rows).toHaveLength(0);

    expect(mockFetch).toHaveBeenCalledWith('https://ntfy.example.com/alerts', expect.objectContaining({ body: 'legacy' }));

    storageRunner.close();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('preserves attempt state across a new Durable Object instance', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();
    const firstOutbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_FirstOutbox = createDeliveryOutbox(storageRunner);
    const mockFetch: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_MockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    await firstOutbox.enqueue(createOptions('restart-me'));

    const secondOutbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_SecondOutbox = createDeliveryOutbox(storageRunner);

    storageRunner.consumeAlarm();

    await secondOutbox.alarm();

    const attemptRows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_AttemptRows = storageRunner.query('SELECT attempt_count FROM notifications');

    expect(getFirstRow(attemptRows)['attempt_count']).toBe(2);

    storageRunner.consumeAlarm();

    await secondOutbox.alarm();

    expect(storageRunner.query('SELECT delivery_id FROM notifications')).toHaveLength(0);

    storageRunner.close();

    return;
  });

  /**
   * Tests - Worker - Durable Objects - Delivery Outbox.
   *
   * @since 2.4.0
   */
  it('discards an invalid queued payload', async () => {
    const storageRunner: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = createStorageRunner();

    storageRunner.query([
      'CREATE TABLE notifications (',
      'position INTEGER PRIMARY KEY AUTOINCREMENT,',
      'delivery_id TEXT UNIQUE NOT NULL,',
      'payload TEXT NOT NULL,',
      'attempt_count INTEGER NOT NULL DEFAULT 0,',
      'diagnostic_config TEXT,',
      'created_at INTEGER NOT NULL',
      ')',
    ].join('\n'));
    storageRunner.query('INSERT INTO notifications (delivery_id, payload, created_at) VALUES (?, ?, ?)', [
      'invalid-id',
      '{',
      Date.now(),
    ]);

    const outbox: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Outbox = createDeliveryOutbox(storageRunner);

    await outbox.alarm();

    const rows: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Rows = storageRunner.query('SELECT delivery_id FROM notifications');

    expect(rows).toHaveLength(0);

    storageRunner.close();

    return;
  });

  return;
});
