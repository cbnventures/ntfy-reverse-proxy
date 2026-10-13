import type {
  Worker_Pipeline_Deliver_EnqueueOptions,
  Worker_Pipeline_Deliver_Namespace,
  Worker_Pipeline_Deliver_Result,
} from '../../../worker/pipeline/deliver.d.ts';
import type { Worker_Pipeline_Send_Options } from '../../../worker/pipeline/send.d.ts';

/**
 * Tests - Worker - Pipeline - Deliver - Deliver - Uses The Explicit Context ID As The Isolated Lane Name.
 *
 * @since UNRELEASED
 */
export type Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_RequestedName = string | undefined;

export type Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_EnqueueInput = Worker_Pipeline_Deliver_EnqueueOptions | undefined;

export type Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Outbox = Worker_Pipeline_Deliver_Namespace & {};

export type Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Options = Worker_Pipeline_Send_Options & {};

export type Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Result = Worker_Pipeline_Deliver_Result & {};
