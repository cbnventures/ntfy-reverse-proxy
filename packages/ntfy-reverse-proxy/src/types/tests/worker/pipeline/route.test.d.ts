/**
 * Tests - Worker - Pipeline - Route.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineRouteMockConfig = {
  settings: TestsWorkerPipelineRouteMockSettings;
  servers: TestsWorkerPipelineRouteMockServer[];
  contexts: TestsWorkerPipelineRouteMockContext[];
};

export type TestsWorkerPipelineRouteMockSettings = {
  worker_name: string;
  base_domain: string;
  show_response_output: boolean;
};

export type TestsWorkerPipelineRouteMockServer = {
  name: string;
  server: string;
  token: string;
};

export type TestsWorkerPipelineRouteMockContext = TestsWorkerPipelineRouteMockHttpContext | TestsWorkerPipelineRouteMockEmailContext;

export type TestsWorkerPipelineRouteMockHttpContext = {
  id: string;
  name: string;
  type: 'http';
  interpreter: 'plain-text';
  topic: string;
  error_topic?: string | undefined;
  mode: 'send-once';
  show_visitor_info: boolean;
  primary_server: string;
  servers: string[];
  token?: string | undefined;
};

export type TestsWorkerPipelineRouteMockEmailContext = {
  id: string;
  name: string;
  type: 'email';
  interpreter: 'pfsense';
  topic: string;
  error_topic?: string | undefined;
  mode: 'send-once';
  show_visitor_info: boolean;
  primary_server: string;
  servers: string[];
  allowed_from?: string | undefined;
};

export type TestsWorkerPipelineRouteResult = {
  context: TestsWorkerPipelineRouteContextResult | undefined;
  resolvedServers: TestsWorkerPipelineRouteServerResult[] | undefined;
  primaryServer: TestsWorkerPipelineRouteServerResult | undefined;
  error: string | undefined;
};

export type TestsWorkerPipelineRouteContextResult = {
  name: string;
  type: string;
  id: string;
  interpreter: string;
  topic: string;
  error_topic?: string | undefined;
  mode: string;
  show_visitor_info: boolean;
  primary_server: string;
  servers: string[];
  token?: string | undefined;
  allowed_from?: string | undefined;
};

export type TestsWorkerPipelineRouteServerResult = {
  name: string;
  server: string;
  token: string;
};
