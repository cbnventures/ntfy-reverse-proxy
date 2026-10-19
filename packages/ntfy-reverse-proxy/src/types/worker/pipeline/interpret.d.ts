/**
 * Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Interpret_NotificationObjectTitle = string | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectBody = string;

export type Worker_Pipeline_Interpret_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Pipeline_Interpret_NotificationObjectPriority = Worker_Pipeline_Interpret_Priority | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectTags = string[] | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectIcon = string | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectActions = string | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectAttach = string | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectFilename = string | undefined;

export type Worker_Pipeline_Interpret_NotificationObjectMarkdown = boolean | undefined;

export type Worker_Pipeline_Interpret_NotificationObject = {
  title?: Worker_Pipeline_Interpret_NotificationObjectTitle;
  body: Worker_Pipeline_Interpret_NotificationObjectBody;
  priority?: Worker_Pipeline_Interpret_NotificationObjectPriority;
  tags?: Worker_Pipeline_Interpret_NotificationObjectTags;
  icon?: Worker_Pipeline_Interpret_NotificationObjectIcon;
  actions?: Worker_Pipeline_Interpret_NotificationObjectActions;
  attach?: Worker_Pipeline_Interpret_NotificationObjectAttach;
  filename?: Worker_Pipeline_Interpret_NotificationObjectFilename;
  markdown?: Worker_Pipeline_Interpret_NotificationObjectMarkdown;
};

export type Worker_Pipeline_Interpret_ResultNotification = Worker_Pipeline_Interpret_NotificationObject;

export type Worker_Pipeline_Interpret_ResultAttachment = ArrayBuffer;

export type Worker_Pipeline_Interpret_Result = {
  notification: Worker_Pipeline_Interpret_ResultNotification;
  attachment?: Worker_Pipeline_Interpret_ResultAttachment;
};

export type Worker_Pipeline_Interpret_Interpreter = (input: Worker_Pipeline_Interpret_Input, context?: Worker_Pipeline_Interpret_Context) => Worker_Pipeline_Interpret_Result | null | Promise<Worker_Pipeline_Interpret_Result | null>;

export type Worker_Pipeline_Interpret_InterpreterMap = Record<string, Worker_Pipeline_Interpret_Interpreter>;

export type Worker_Pipeline_Interpret_Input = string | object | ArrayBuffer;

export type Worker_Pipeline_Interpret_ContextKv = KVNamespace;

export type Worker_Pipeline_Interpret_Context = {
  kv?: Worker_Pipeline_Interpret_ContextKv;
};

export type Worker_Pipeline_Interpret_Interpret_InterpreterName = string;

export type Worker_Pipeline_Interpret_Returns = Promise<Worker_Pipeline_Interpret_Result | null>;

export type Worker_Pipeline_Interpret_SelectedInterpreter = Worker_Pipeline_Interpret_Interpreter | undefined;

export type Worker_Pipeline_Interpret_InterpreterResult = Worker_Pipeline_Interpret_Result | null;
