/**
 * Tests - Worker - Pipeline - Send.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineSendServer = {
  name: string;
  server: string;
  token: string;
};

export type TestsWorkerPipelineSendServers = TestsWorkerPipelineSendServer[];

export type TestsWorkerPipelineSendMessage = {
  body: string;
  headers: Record<string, string>;
};

export type TestsWorkerPipelineSendMessages = TestsWorkerPipelineSendMessage[];

export type TestsWorkerPipelineSendResult = {
  results: TestsWorkerPipelineSendServerResult[];
  fallbackUsed: boolean;
  fallbackNote?: string | undefined;
};

export type TestsWorkerPipelineSendServerResult = {
  name: string;
  success: boolean;
  status: number;
  stages: string[];
  error?: string | undefined;
};

export type TestsWorkerPipelineSendEveryResult = boolean;

export type TestsWorkerPipelineSendAttachment = ArrayBuffer;
