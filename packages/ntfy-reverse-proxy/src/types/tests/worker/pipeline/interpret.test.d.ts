/**
 * Tests - Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineInterpretResult = {
  notification: TestsWorkerPipelineInterpretResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type TestsWorkerPipelineInterpretResultNotification = {
  title?: string | undefined;
  body: string;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type TestsWorkerPipelineInterpretInput = {
  page: TestsWorkerPipelineInterpretInputPage;
  incident: TestsWorkerPipelineInterpretInputIncident;
};

export type TestsWorkerPipelineInterpretInputPage = {
  name: string;
};

export type TestsWorkerPipelineInterpretInputIncident = {
  name: string;
  status: string;
  impact: string;
  incident_updates: TestsWorkerPipelineInterpretInputIncidentUpdates;
};

export type TestsWorkerPipelineInterpretInputIncidentUpdates = unknown[];

export type TestsWorkerPipelineInterpretPromiseResult = Promise<TestsWorkerPipelineInterpretResult>;

export type TestsWorkerPipelineInterpretRejectsExpectation = Promise<void>;
