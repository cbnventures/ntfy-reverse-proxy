/**
 * Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
export type WorkerPipelineInterpretNotificationObjectTitle = string;

export type WorkerPipelineInterpretNotificationObjectBody = string;

export type WorkerPipelineInterpretNotificationObjectPriority = 1 | 2 | 3 | 4 | 5;

export type WorkerPipelineInterpretNotificationObjectTags = string[];

export type WorkerPipelineInterpretNotificationObjectIcon = string;

export type WorkerPipelineInterpretNotificationObjectActions = string;

export type WorkerPipelineInterpretNotificationObjectAttach = string;

export type WorkerPipelineInterpretNotificationObjectFilename = string;

export type WorkerPipelineInterpretNotificationObjectMarkdown = boolean;

export type WorkerPipelineInterpretNotificationObject = {
  title?: WorkerPipelineInterpretNotificationObjectTitle | undefined;
  body: WorkerPipelineInterpretNotificationObjectBody;
  priority?: WorkerPipelineInterpretNotificationObjectPriority | undefined;
  tags?: WorkerPipelineInterpretNotificationObjectTags | undefined;
  icon?: WorkerPipelineInterpretNotificationObjectIcon | undefined;
  actions?: WorkerPipelineInterpretNotificationObjectActions | undefined;
  attach?: WorkerPipelineInterpretNotificationObjectAttach | undefined;
  filename?: WorkerPipelineInterpretNotificationObjectFilename | undefined;
  markdown?: WorkerPipelineInterpretNotificationObjectMarkdown | undefined;
};

export type WorkerPipelineInterpretResultNotification = WorkerPipelineInterpretNotificationObject;

export type WorkerPipelineInterpretResultAttachment = ArrayBuffer;

export type WorkerPipelineInterpretResult = {
  notification: WorkerPipelineInterpretResultNotification;
  attachment?: WorkerPipelineInterpretResultAttachment;
};

export type WorkerPipelineInterpretInterpreter = (input: WorkerPipelineInterpretInput, context?: WorkerPipelineInterpretContext) => WorkerPipelineInterpretResult | null | Promise<WorkerPipelineInterpretResult | null>;

export type WorkerPipelineInterpretInterpreterMap = Record<string, WorkerPipelineInterpretInterpreter>;

export type WorkerPipelineInterpretInput = string | object | ArrayBuffer;

export type WorkerPipelineInterpretContextKv = KVNamespace;

export type WorkerPipelineInterpretContext = {
  kv?: WorkerPipelineInterpretContextKv;
};

export type WorkerPipelineInterpretInterpreterName = string;

export type WorkerPipelineInterpretReturns = Promise<WorkerPipelineInterpretResult | null>;

export type WorkerPipelineInterpretSelectedInterpreter = WorkerPipelineInterpretInterpreter | undefined;

export type WorkerPipelineInterpretInterpreterResult = WorkerPipelineInterpretResult | null;
