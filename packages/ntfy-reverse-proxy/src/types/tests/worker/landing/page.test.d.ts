/**
 * Tests - Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type TestsWorkerLandingPageMockConfig = {
  settings: TestsWorkerLandingPageMockSettings;
  servers: TestsWorkerLandingPageMockServer[];
  contexts: TestsWorkerLandingPageMockContext[];
};

export type TestsWorkerLandingPageMockSettings = {
  worker_name: string;
  base_domain: string;
  show_response_output: boolean;
};

export type TestsWorkerLandingPageMockServer = {
  name: string;
  server: string;
  token: string;
};

export type TestsWorkerLandingPageMockContext = {
  id: string;
  name: string;
  type: 'http';
  interpreter: 'plain-text';
  topic: string;
  mode: 'send-once';
  show_visitor_info: boolean;
  primary_server: string;
  servers: string[];
  token?: string | undefined;
};

export type TestsWorkerLandingPageResponse = Response;

export type TestsWorkerLandingPageHtml = string;

export type TestsWorkerLandingPageContentType = string | null;

export type TestsWorkerLandingPageDebugConfig = {
  settings: TestsWorkerLandingPageMockSettings;
  servers: TestsWorkerLandingPageMockServer[];
  contexts: TestsWorkerLandingPageMockContext[];
};

export type TestsWorkerLandingPageContextsStart = number;

export type TestsWorkerLandingPageIdIndex = number;

export type TestsWorkerLandingPageNameIndex = number;

export type TestsWorkerLandingPageTypeIndex = number;
