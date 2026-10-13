import type { Worker_Pipeline_Send_Options, Worker_Pipeline_Send_Result } from './send.d.ts';

/**
 * Worker - Pipeline - Deliver.
 *
 * @since UNRELEASED
 */
export type Worker_Pipeline_Deliver_ContextId = string;

export type Worker_Pipeline_Deliver_Outbox = Worker_Pipeline_Deliver_Namespace;

export type Worker_Pipeline_Deliver_Options = Worker_Pipeline_Send_Options;

export type Worker_Pipeline_Deliver_Returns = Promise<Worker_Pipeline_Deliver_Result>;

export type Worker_Pipeline_Deliver_EnqueueOptionsMessages = Worker_Pipeline_Send_Options['messages'];

export type Worker_Pipeline_Deliver_EnqueueOptionsServerNames = string[];

export type Worker_Pipeline_Deliver_EnqueueOptionsPrimaryServerName = string;

export type Worker_Pipeline_Deliver_EnqueueOptionsTopic = Worker_Pipeline_Send_Options['topic'];

export type Worker_Pipeline_Deliver_EnqueueOptionsMode = Worker_Pipeline_Send_Options['mode'];

export type Worker_Pipeline_Deliver_EnqueueOptionsVisitorIp = Worker_Pipeline_Send_Options['visitorIp'];

export type Worker_Pipeline_Deliver_EnqueueOptionsAttachment = Worker_Pipeline_Send_Options['attachment'];

export type Worker_Pipeline_Deliver_EnqueueOptionsFilename = Worker_Pipeline_Send_Options['filename'];

export type Worker_Pipeline_Deliver_EnqueueOptionsAttachmentHeaders = Worker_Pipeline_Send_Options['attachmentHeaders'];

export type Worker_Pipeline_Deliver_EnqueueOptions = {
  messages: Worker_Pipeline_Deliver_EnqueueOptionsMessages;
  serverNames: Worker_Pipeline_Deliver_EnqueueOptionsServerNames;
  primaryServerName: Worker_Pipeline_Deliver_EnqueueOptionsPrimaryServerName;
  topic: Worker_Pipeline_Deliver_EnqueueOptionsTopic;
  mode: Worker_Pipeline_Deliver_EnqueueOptionsMode;
  visitorIp?: Worker_Pipeline_Deliver_EnqueueOptionsVisitorIp;
  attachment?: Worker_Pipeline_Deliver_EnqueueOptionsAttachment;
  filename?: Worker_Pipeline_Deliver_EnqueueOptionsFilename;
  attachmentHeaders?: Worker_Pipeline_Deliver_EnqueueOptionsAttachmentHeaders;
};

export type Worker_Pipeline_Deliver_ResultDeliveryId = string;

export type Worker_Pipeline_Deliver_ResultState = 'delivered' | 'queued';

export type Worker_Pipeline_Deliver_ResultPending = number;

export type Worker_Pipeline_Deliver_ResultSendResult = Worker_Pipeline_Send_Result | undefined;

export type Worker_Pipeline_Deliver_Result = {
  deliveryId: Worker_Pipeline_Deliver_ResultDeliveryId;
  state: Worker_Pipeline_Deliver_ResultState;
  pending: Worker_Pipeline_Deliver_ResultPending;
  sendResult?: Worker_Pipeline_Deliver_ResultSendResult;
};

export type Worker_Pipeline_Deliver_StubEnqueue = (options: Worker_Pipeline_Deliver_EnqueueOptions) => Promise<Worker_Pipeline_Deliver_Result>;

export type Worker_Pipeline_Deliver_Stub = {
  enqueue: Worker_Pipeline_Deliver_StubEnqueue;
};

export type Worker_Pipeline_Deliver_NamespaceGetByName = (name: string) => Worker_Pipeline_Deliver_Stub;

export type Worker_Pipeline_Deliver_Namespace = {
  getByName: Worker_Pipeline_Deliver_NamespaceGetByName;
};

export type Worker_Pipeline_Deliver_EnqueueInput = Worker_Pipeline_Deliver_EnqueueOptions;

/**
 * Worker - Pipeline - Deliver - Deliver.
 *
 * @since UNRELEASED
 */
export type Worker_Pipeline_Deliver_Deliver_ServerNames = string[];
