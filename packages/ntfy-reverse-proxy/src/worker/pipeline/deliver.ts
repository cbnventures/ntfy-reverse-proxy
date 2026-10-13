import type {
  Worker_Pipeline_Deliver_ContextId,
  Worker_Pipeline_Deliver_Deliver_ServerNames,
  Worker_Pipeline_Deliver_EnqueueInput,
  Worker_Pipeline_Deliver_Options,
  Worker_Pipeline_Deliver_Outbox,
  Worker_Pipeline_Deliver_Returns,
  Worker_Pipeline_Deliver_Stub,
} from '../../types/worker/pipeline/deliver.d.ts';

/**
 * Worker - Pipeline - Deliver - Deliver.
 *
 * Saves a notification in the Durable Object assigned to its context
 * before allowing that object to drain the context's FIFO outbox.
 *
 * @param {Worker_Pipeline_Deliver_ContextId} contextId - Context id.
 * @param {Worker_Pipeline_Deliver_Outbox}    outbox    - Outbox.
 * @param {Worker_Pipeline_Deliver_Options}   options   - Options.
 *
 * @returns {Worker_Pipeline_Deliver_Returns}
 *
 * @since UNRELEASED
 */
async function deliver(contextId: Worker_Pipeline_Deliver_ContextId, outbox: Worker_Pipeline_Deliver_Outbox, options: Worker_Pipeline_Deliver_Options): Worker_Pipeline_Deliver_Returns {
  const stub: Worker_Pipeline_Deliver_Stub = outbox.getByName(contextId);
  const serverNames: Worker_Pipeline_Deliver_Deliver_ServerNames = options['servers'].map((server) => server['name']);
  const enqueueInput: Worker_Pipeline_Deliver_EnqueueInput = {
    messages: options['messages'],
    serverNames,
    primaryServerName: options['primaryServer']['name'],
    topic: options['topic'],
    mode: options['mode'],
    ...((options['visitorIp'] !== undefined) ? { visitorIp: options['visitorIp'] } : {}),
    ...((options['attachment'] !== undefined) ? { attachment: options['attachment'] } : {}),
    ...((options['filename'] !== undefined) ? { filename: options['filename'] } : {}),
    ...((options['attachmentHeaders'] !== undefined) ? { attachmentHeaders: options['attachmentHeaders'] } : {}),
  };

  return stub.enqueue(enqueueInput);
}

export {
  deliver,
};
