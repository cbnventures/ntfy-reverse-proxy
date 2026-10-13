import type {
  Worker_Pipeline_DrainFifo_AttemptResult,
  Worker_Pipeline_DrainFifo_CurrentItem,
  Worker_Pipeline_DrainFifo_DrainFifo_Succeeded,
  Worker_Pipeline_DrainFifo_Item,
  Worker_Pipeline_DrainFifo_Options,
  Worker_Pipeline_DrainFifo_Results,
  Worker_Pipeline_DrainFifo_Returns,
} from '../../types/worker/pipeline/drain-fifo.d.ts';

/**
 * Worker - Pipeline - Drain Fifo - Drain Fifo.
 *
 * Attempts the current head until the lane is empty or one item fails.
 * A failed item is never removed, so later invocations resume at that head.
 *
 * @since UNRELEASED
 */
async function drainFifo<Item extends Worker_Pipeline_DrainFifo_Item, Result>(options: Worker_Pipeline_DrainFifo_Options<Item, Result>): Worker_Pipeline_DrainFifo_Returns<Result> {
  const results: Worker_Pipeline_DrainFifo_Results<Result> = new Map();

  while (true) {
    const item: Worker_Pipeline_DrainFifo_CurrentItem<Item> = await options.peek();

    if (item === undefined) {
      break;
    }

    try {
      const result: Worker_Pipeline_DrainFifo_AttemptResult<Result> = await options.attempt(item);
      const succeeded: Worker_Pipeline_DrainFifo_DrainFifo_Succeeded = options.succeeded(item, result);

      results.set(item['deliveryId'], result);

      if (succeeded === false) {
        break;
      }

      await options.remove(item);
    } catch (err) {
      await options.onError(item, err);

      break;
    }
  }

  return results;
}

export {
  drainFifo,
};
