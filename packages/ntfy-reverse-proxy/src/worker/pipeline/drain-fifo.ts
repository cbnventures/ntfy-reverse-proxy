import type {
  Worker_Pipeline_DrainFifo_DiscardedIds,
  Worker_Pipeline_DrainFifo_DrainFifo_AttemptError,
  Worker_Pipeline_DrainFifo_DrainFifo_AttemptThrew,
  Worker_Pipeline_DrainFifo_DrainFifo_ErrorAction,
  Worker_Pipeline_DrainFifo_DrainFifo_FailureAction,
  Worker_Pipeline_DrainFifo_DrainFifo_Item,
  Worker_Pipeline_DrainFifo_DrainFifo_Result,
  Worker_Pipeline_DrainFifo_DrainFifo_Succeeded,
  Worker_Pipeline_DrainFifo_Item,
  Worker_Pipeline_DrainFifo_Options,
  Worker_Pipeline_DrainFifo_Results,
  Worker_Pipeline_DrainFifo_Returns,
} from '../../types/worker/pipeline/drain-fifo.d.ts';

/**
 * Worker - Pipeline - Drain Fifo - Drain Fifo.
 *
 * Attempts the current head until the lane is empty or its caller requests a retry.
 * Failure policy stays outside the attempt catch so callback errors propagate once.
 *
 * @param {Worker_Pipeline_DrainFifo_Options<Item, Result>} options - Options.
 *
 * @returns {Worker_Pipeline_DrainFifo_Returns<Result>}
 *
 * @since 2.4.0
 */
async function drainFifo<Item extends Worker_Pipeline_DrainFifo_Item, Result>(options: Worker_Pipeline_DrainFifo_Options<Item, Result>): Worker_Pipeline_DrainFifo_Returns<Result> {
  const results: Worker_Pipeline_DrainFifo_Results<Result> = new Map();
  const discardedIds: Worker_Pipeline_DrainFifo_DiscardedIds = new Set();

  while (true) {
    const item: Worker_Pipeline_DrainFifo_DrainFifo_Item<Item> = await options.peek();

    if (item === undefined) {
      break;
    }

    let result: Worker_Pipeline_DrainFifo_DrainFifo_Result<Result> = undefined;
    let succeeded: Worker_Pipeline_DrainFifo_DrainFifo_Succeeded = false;
    let attemptError: Worker_Pipeline_DrainFifo_DrainFifo_AttemptError = undefined;
    let attemptThrew: Worker_Pipeline_DrainFifo_DrainFifo_AttemptThrew = false;

    try {
      result = await options.attempt(item);
      succeeded = options.succeeded(item, result);
    } catch (err) {
      attemptError = err;
      attemptThrew = true;
    }

    if (attemptThrew === true) {
      const errorAction: Worker_Pipeline_DrainFifo_DrainFifo_ErrorAction = await options.onError(item, attemptError);

      if (errorAction === 'retry') {
        break;
      }

      discardedIds.add(item['deliveryId']);

      await options.remove(item);

      continue;
    }

    if (result === undefined) {
      break;
    }

    results.set(item['deliveryId'], result);

    if (succeeded === false) {
      const failureAction: Worker_Pipeline_DrainFifo_DrainFifo_FailureAction = await options.onFailure(item, result);

      if (failureAction === 'retry') {
        break;
      }

      discardedIds.add(item['deliveryId']);

      await options.remove(item);

      continue;
    }

    await options.remove(item);
  }

  return {
    results,
    discardedIds,
  };
}

export {
  drainFifo,
};
