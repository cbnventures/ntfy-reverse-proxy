import { describe, expect, it } from 'vitest';

import { drainFifo } from '../../../worker/pipeline/drain-fifo.js';

import type {
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_ErrorCalls,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_Options,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_Queue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_RemoveCalls,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_AttemptCount,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Attempts,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_FailedResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Options,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Queue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_RetriedResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_ShouldFail,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedAttemptCount,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedOptions,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedQueue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingOptions,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingQueue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_AttemptCount,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Attempts,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_FirstResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Options,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Queue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_SecondResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_ThirdResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Attempts,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_ErrorAttemptCount,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Options,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Queue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_ThirdResults,
} from '../../../types/tests/worker/pipeline/drain-fifo.test.d.ts';

/**
 * Tests - Worker - Pipeline - Drain Fifo - Drain Fifo.
 *
 * @since 2.4.0
 */
describe('drainFifo', () => {
  it('does not route an onFailure error through onError', async () => {
    const queue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_Queue = [{
      deliveryId: 'poison',
      body: 'poison',
      attemptCount: 0,
    }];
    let errorCalls: Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_ErrorCalls = 0;
    let removeCalls: Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_RemoveCalls = 0;
    const options: Tests_Worker_Pipeline_DrainFifo_DrainFifo_DoesNotRouteAnOnFailureErrorThroughOnError_Options = {
      peek: () => queue[0],
      attempt: () => Promise.resolve({ success: false }),
      succeeded: (_item, result) => result['success'],
      remove: () => {
        removeCalls += 1;

        return;
      },
      onFailure: () => Promise.reject(new Error('Failure callback failed')),
      onError: () => {
        errorCalls += 1;

        return 'discard';
      },
    };

    await expect(drainFifo(options)).rejects.toThrow('Failure callback failed');

    expect(errorCalls).toBe(0);

    expect(removeCalls).toBe(0);

    return;
  });

  it('keeps a failed head and retries it before later items', async () => {
    const queue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Queue = [
      {
        deliveryId: 'first',
        body: 'first',
        attemptCount: 0,
      },
      {
        deliveryId: 'second',
        body: 'second',
        attemptCount: 0,
      },
    ];
    const attempts: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Attempts = [];
    let shouldFail: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_ShouldFail = true;
    const options: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Options = {
      peek: () => queue[0],
      attempt: (item) => {
        attempts.push(item['body']);

        return Promise.resolve({ success: shouldFail === false });
      },
      succeeded: (_item, result) => result['success'],
      remove: () => {
        queue.shift();

        return;
      },
      onFailure: (item) => {
        const attemptCount: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_AttemptCount = item['attemptCount'] + 1;

        Reflect.set(item, 'attemptCount', attemptCount);

        return 'retry';
      },
      onError: () => 'retry',
    };
    const failedResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_FailedResults = await drainFifo(options);

    expect(failedResults['results'].get('first')).toEqual({ success: false });

    expect(queue.map((item) => item['deliveryId'])).toEqual([
      'first',
      'second',
    ]);

    shouldFail = false;

    const retriedResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_RetriedResults = await drainFifo(options);

    expect(retriedResults['results'].get('first')).toEqual({ success: true });

    expect(retriedResults['results'].get('second')).toEqual({ success: true });

    expect(attempts).toEqual([
      'first',
      'first',
      'second',
    ]);

    expect(queue).toHaveLength(0);

    return;
  });

  it('lets an independent lane drain while another lane is blocked', async () => {
    const blockedQueue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedQueue = [{
      deliveryId: 'blocked',
      body: 'blocked',
      attemptCount: 0,
    }];
    const flowingQueue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingQueue = [{
      deliveryId: 'flowing',
      body: 'flowing',
      attemptCount: 0,
    }];
    const blockedOptions: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedOptions = {
      peek: () => blockedQueue[0],
      attempt: () => Promise.resolve({ success: false }),
      succeeded: (_item, result) => result['success'],
      remove: () => {
        blockedQueue.shift();

        return;
      },
      onFailure: (item) => {
        const blockedAttemptCount: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedAttemptCount = item['attemptCount'] + 1;

        Reflect.set(item, 'attemptCount', blockedAttemptCount);

        return 'retry';
      },
      onError: () => 'retry',
    };
    const flowingOptions: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingOptions = {
      peek: () => flowingQueue[0],
      attempt: () => Promise.resolve({ success: true }),
      succeeded: (_item, result) => result['success'],
      remove: () => {
        flowingQueue.shift();

        return;
      },
      onFailure: () => 'retry',
      onError: () => 'retry',
    };

    await drainFifo(blockedOptions);
    await drainFifo(flowingOptions);

    expect(blockedQueue).toHaveLength(1);

    expect(flowingQueue).toHaveLength(0);

    return;
  });

  it('purges a failed head after the retry limit and continues the lane', async () => {
    const queue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Queue = [
      {
        deliveryId: 'poison',
        body: 'poison',
        attemptCount: 0,
      },
      {
        deliveryId: 'later',
        body: 'later',
        attemptCount: 0,
      },
    ];
    const attempts: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Attempts = [];
    const options: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_Options = {
      peek: () => queue[0],
      attempt: (item) => {
        attempts.push(item['body']);

        return Promise.resolve({ success: item['body'] === 'later' });
      },
      succeeded: (_item, result) => result['success'],
      remove: () => {
        queue.shift();

        return;
      },
      onFailure: (item) => {
        const attemptCount: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_AttemptCount = item['attemptCount'] + 1;

        Reflect.set(item, 'attemptCount', attemptCount);

        return (attemptCount >= 3) ? 'discard' : 'retry';
      },
      onError: () => 'retry',
    };
    const firstResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_FirstResults = await drainFifo(options);

    expect(firstResults['results'].get('poison')).toEqual({ success: false });

    expect(queue[0]).toEqual({
      deliveryId: 'poison',
      body: 'poison',
      attemptCount: 1,
    });

    const secondResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_SecondResults = await drainFifo(options);

    expect(secondResults['results'].get('poison')).toEqual({ success: false });

    expect(queue[0]).toEqual({
      deliveryId: 'poison',
      body: 'poison',
      attemptCount: 2,
    });

    const thirdResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAFailedHeadAfterTheRetryLimitAndContinuesTheLane_ThirdResults = await drainFifo(options);

    expect(thirdResults['results'].get('poison')).toEqual({ success: false });

    expect(thirdResults['results'].get('later')).toEqual({ success: true });

    expect(thirdResults['discardedIds'].has('poison')).toBe(true);

    expect(attempts).toEqual([
      'poison',
      'poison',
      'poison',
      'later',
    ]);

    expect(queue).toHaveLength(0);

    return;
  });

  it('purges a throwing head after the retry limit and continues the lane', async () => {
    const queue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Queue = [
      {
        deliveryId: 'poison',
        body: 'poison',
        attemptCount: 0,
      },
      {
        deliveryId: 'later',
        body: 'later',
        attemptCount: 0,
      },
    ];
    const attempts: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Attempts = [];
    const options: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_Options = {
      peek: () => queue[0],
      attempt: async (item) => {
        attempts.push(item['body']);

        if (item['body'] === 'poison') {
          throw new Error('Configured server is unavailable');
        }

        return { success: true };
      },
      succeeded: (_item, result) => result['success'],
      remove: () => {
        queue.shift();

        return;
      },
      onFailure: () => 'retry',
      onError: (item) => {
        const errorAttemptCount: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_ErrorAttemptCount = item['attemptCount'] + 1;

        Reflect.set(item, 'attemptCount', errorAttemptCount);

        return (errorAttemptCount >= 3) ? 'discard' : 'retry';
      },
    };

    await drainFifo(options);
    await drainFifo(options);

    expect(queue[0]).toEqual({
      deliveryId: 'poison',
      body: 'poison',
      attemptCount: 2,
    });

    const thirdResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_PurgesAThrowingHeadAfterTheRetryLimitAndContinuesTheLane_ThirdResults = await drainFifo(options);

    expect(thirdResults['results'].has('poison')).toBe(false);

    expect(thirdResults['results'].get('later')).toEqual({ success: true });

    expect(thirdResults['discardedIds'].has('poison')).toBe(true);

    expect(attempts).toEqual([
      'poison',
      'poison',
      'poison',
      'later',
    ]);

    expect(queue).toHaveLength(0);

    return;
  });

  return;
});
