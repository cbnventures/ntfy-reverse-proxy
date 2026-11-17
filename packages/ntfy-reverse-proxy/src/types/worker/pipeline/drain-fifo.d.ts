/**
 * Worker - Pipeline - Drain Fifo.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_DrainFifo_ItemDeliveryId = string;

export type Worker_Pipeline_DrainFifo_Item = {
  deliveryId: Worker_Pipeline_DrainFifo_ItemDeliveryId;
};

export type Worker_Pipeline_DrainFifo_MaybePromise<Value> = Promise<Value> | Value;

export type Worker_Pipeline_DrainFifo_Action = 'discard' | 'retry';

export type Worker_Pipeline_DrainFifo_OptionsPeek<Item extends Worker_Pipeline_DrainFifo_Item> = () => Worker_Pipeline_DrainFifo_MaybePromise<Item | undefined>;

export type Worker_Pipeline_DrainFifo_OptionsAttempt<Item extends Worker_Pipeline_DrainFifo_Item, Result> = (item: Item) => Promise<Result>;

export type Worker_Pipeline_DrainFifo_OptionsSucceeded<Item extends Worker_Pipeline_DrainFifo_Item, Result> = (item: Item, result: Result) => boolean;

export type Worker_Pipeline_DrainFifo_OptionsRemove<Item extends Worker_Pipeline_DrainFifo_Item> = (item: Item) => Worker_Pipeline_DrainFifo_MaybePromise<void>;

export type Worker_Pipeline_DrainFifo_OptionsOnFailure<Item extends Worker_Pipeline_DrainFifo_Item, Result> = (item: Item, result: Result) => Worker_Pipeline_DrainFifo_MaybePromise<Worker_Pipeline_DrainFifo_Action>;

export type Worker_Pipeline_DrainFifo_OptionsOnError<Item extends Worker_Pipeline_DrainFifo_Item> = (item: Item, error: unknown) => Worker_Pipeline_DrainFifo_MaybePromise<Worker_Pipeline_DrainFifo_Action>;

export type Worker_Pipeline_DrainFifo_Options<Item extends Worker_Pipeline_DrainFifo_Item, Result> = {
  peek: Worker_Pipeline_DrainFifo_OptionsPeek<Item>;
  attempt: Worker_Pipeline_DrainFifo_OptionsAttempt<Item, Result>;
  succeeded: Worker_Pipeline_DrainFifo_OptionsSucceeded<Item, Result>;
  remove: Worker_Pipeline_DrainFifo_OptionsRemove<Item>;
  onFailure: Worker_Pipeline_DrainFifo_OptionsOnFailure<Item, Result>;
  onError: Worker_Pipeline_DrainFifo_OptionsOnError<Item>;
};

export type Worker_Pipeline_DrainFifo_DrainResultResults<Result> = Map<string, Result>;

export type Worker_Pipeline_DrainFifo_DrainResultDiscardedIds = Set<string>;

export type Worker_Pipeline_DrainFifo_DrainResult<Result> = {
  results: Worker_Pipeline_DrainFifo_DrainResultResults<Result>;
  discardedIds: Worker_Pipeline_DrainFifo_DrainResultDiscardedIds;
};

export type Worker_Pipeline_DrainFifo_Returns<Result> = Promise<Worker_Pipeline_DrainFifo_DrainResult<Result>>;

export type Worker_Pipeline_DrainFifo_Results<Result> = Map<string, Result>;

export type Worker_Pipeline_DrainFifo_DiscardedIds = Set<string>;

export type Worker_Pipeline_DrainFifo_DrainFifo_Item<Item extends Worker_Pipeline_DrainFifo_Item> = Item | undefined;

export type Worker_Pipeline_DrainFifo_DrainFifo_Result<Result> = Result | undefined;

/**
 * Worker - Pipeline - Drain Fifo.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_DrainFifo_DrainFifo_Succeeded = boolean;

export type Worker_Pipeline_DrainFifo_DrainFifo_AttemptError = unknown;

export type Worker_Pipeline_DrainFifo_DrainFifo_AttemptThrew = boolean;

export type Worker_Pipeline_DrainFifo_DrainFifo_ErrorAction = 'discard' | 'retry';

export type Worker_Pipeline_DrainFifo_DrainFifo_FailureAction = 'discard' | 'retry';
