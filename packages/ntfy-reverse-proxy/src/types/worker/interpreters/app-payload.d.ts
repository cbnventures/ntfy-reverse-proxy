import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Priority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

export type Worker_Interpreters_AppPayload_SupportedApp = 'transmission-vpn' | 'pfsense-actions' | 'discord-stonker-bot' | 'outpost';

export type Worker_Interpreters_AppPayload_SupportedApps = ReadonlyArray<Worker_Interpreters_AppPayload_SupportedApp>;

/**
 * Worker - Interpreters - App Payload - Interpret App Payload.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_AppPayload_InterpretAppPayload_AppKey = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_AppName = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_App = {
  key: Worker_Interpreters_AppPayload_InterpretAppPayload_AppKey;
  name: Worker_Interpreters_AppPayload_InterpretAppPayload_AppName;
};

export type Worker_Interpreters_AppPayload_InterpretAppPayload_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_Parsed = unknown;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_Decoder = TextDecoder;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_DecodedBody = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadVersion = 1;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadApp = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadEvent = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadTitle = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadMessage = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadPriority = Worker_Pipeline_Interpret_Priority;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadTags = string[];

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadOccurredAt = string;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadDetails = Record<string, unknown>;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_Payload = {
  version: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadVersion;
  app: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadApp;
  event: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadEvent;
  title: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadTitle;
  message: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadMessage;
  priority: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadPriority;
  tags: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadTags;
  occurredAt: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadOccurredAt;
  details: Worker_Interpreters_AppPayload_InterpretAppPayload_PayloadDetails;
};

export type Worker_Interpreters_AppPayload_InterpretAppPayload_IsSupportedApp = boolean;

export type Worker_Interpreters_AppPayload_InterpretAppPayload_SupportedAppList = string;
