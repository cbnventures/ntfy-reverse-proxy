/**
 * Tests - Worker - Interpreters - Outpost - Interpreter - Reads An Updates Applied Alert.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Priority = 1 | 2 | 3 | 4 | 5 | undefined;

export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Tags = string[] | undefined;

export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification = {
  title?: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Title;
  body: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Body;
  priority?: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Priority;
  tags?: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification_Tags;
};

export type Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result = {
  notification: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result_Notification;
};
