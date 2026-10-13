import { describe, expect, it } from 'vitest';

import { drainFifo } from '../../../worker/pipeline/drain-fifo.js';

import type {
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Attempts,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_FailedResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Options,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Queue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_RetriedResults,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_ShouldFail,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedOptions,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedQueue,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingOptions,
  Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingQueue,
} from '../../../types/tests/worker/pipeline/drain-fifo.test.d.ts';

/**
 * Tests - Worker - Pipeline - Drain Fifo - Drain Fifo.
 *
 * @since UNRELEASED
 */
describe('drainFifo', () => {
  it('keeps a failed head and retries it before later items', async () => {
    const queue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_Queue = [
      {
        deliveryId: 'first',
        body: 'first',
      },
      {
        deliveryId: 'second',
        body: 'second',
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
      onError: () => undefined,
    };
    const failedResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_FailedResults = await drainFifo(options);

    expect(failedResults.get('first')).toEqual({ success: false });

    expect(queue.map((item) => item['deliveryId'])).toEqual([
      'first',
      'second',
    ]);

    shouldFail = false;

    const retriedResults: Tests_Worker_Pipeline_DrainFifo_DrainFifo_KeepsAFailedHeadAndRetriesItBeforeLaterItems_RetriedResults = await drainFifo(options);

    expect(retriedResults.get('first')).toEqual({ success: true });

    expect(retriedResults.get('second')).toEqual({ success: true });

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
    }];
    const flowingQueue: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingQueue = [{
      deliveryId: 'flowing',
      body: 'flowing',
    }];
    const blockedOptions: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_BlockedOptions = {
      peek: () => blockedQueue[0],
      attempt: () => Promise.resolve({ success: false }),
      succeeded: (_item, result) => result['success'],
      remove: () => {
        blockedQueue.shift();

        return;
      },
      onError: () => undefined,
    };
    const flowingOptions: Tests_Worker_Pipeline_DrainFifo_DrainFifo_LetsAnIndependentLaneDrainWhileAnotherLaneIsBlocked_FlowingOptions = {
      peek: () => flowingQueue[0],
      attempt: () => Promise.resolve({ success: true }),
      succeeded: (_item, result) => result['success'],
      remove: () => {
        flowingQueue.shift();

        return;
      },
      onError: () => undefined,
    };

    await drainFifo(blockedOptions);
    await drainFifo(flowingOptions);

    expect(blockedQueue).toHaveLength(1);

    expect(flowingQueue).toHaveLength(0);

    return;
  });

  return;
});
