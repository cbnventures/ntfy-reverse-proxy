import type { Worker_Pipeline_Send_Result } from '../../../worker/pipeline/send.d.ts';

/**
 * Tests - Worker - Pipeline - Send.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Server_Name = string;

export type Tests_Worker_Pipeline_Send_Server_Server = string;

export type Tests_Worker_Pipeline_Send_Server_Token = string;

export type Tests_Worker_Pipeline_Send_Server = {
  name: Tests_Worker_Pipeline_Send_Server_Name;
  server: Tests_Worker_Pipeline_Send_Server_Server;
  token: Tests_Worker_Pipeline_Send_Server_Token;
};

export type Tests_Worker_Pipeline_Send_Servers = Tests_Worker_Pipeline_Send_Server[];

export type Tests_Worker_Pipeline_Send_Message_Body = string;

export type Tests_Worker_Pipeline_Send_Message_Headers = Record<string, string>;

export type Tests_Worker_Pipeline_Send_Message = {
  body: Tests_Worker_Pipeline_Send_Message_Body;
  headers: Tests_Worker_Pipeline_Send_Message_Headers;
};

export type Tests_Worker_Pipeline_Send_Messages = Tests_Worker_Pipeline_Send_Message[];

/**
 * Tests - Worker - Pipeline - Send - Send - Falls Back To Next Server When Primary Fails In Send Once.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Send_FallsBackToNextServerWhenPrimaryFailsInSendOnce_Result = Readonly<Worker_Pipeline_Send_Result>;

/**
 * Tests - Worker - Pipeline - Send - Send - Handles Stage 2 Binary Attachment.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Send_HandlesStage2BinaryAttachment_Attachment = ArrayBuffer;

export type Tests_Worker_Pipeline_Send_Send_HandlesStage2BinaryAttachment_Result = Readonly<Worker_Pipeline_Send_Result>;

/**
 * Tests - Worker - Pipeline - Send - Send - Sends To All Servers In Send All Mode.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Send_SendsToAllServersInSendAllMode_Result = Readonly<Worker_Pipeline_Send_Result>;

export type Tests_Worker_Pipeline_Send_Send_SendsToAllServersInSendAllMode_EveryResult = boolean;

/**
 * Tests - Worker - Pipeline - Send - Send - Sends To Primary Server In Send Once Mode.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Send_SendsToPrimaryServerInSendOnceMode_Result = Readonly<Worker_Pipeline_Send_Result>;

/**
 * Tests - Worker - Pipeline - Send - Send - Skips Stage 2 If Stage 1 Fails On A Server.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Send_Send_SkipsStage2IfStage1FailsOnAServer_Attachment = ArrayBuffer;

export type Tests_Worker_Pipeline_Send_Send_SkipsStage2IfStage1FailsOnAServer_Result = Readonly<Worker_Pipeline_Send_Result>;
