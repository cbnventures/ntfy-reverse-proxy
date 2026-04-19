/**
 * Tests - Worker - Pipeline - Format.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineFormatBaseNotification = {
  title: string;
  body: string;
  priority: 3;
  tags: string[];
  markdown: boolean;
};

export type TestsWorkerPipelineFormatResult = {
  body: string;
  headers: Record<string, string>;
};

export type TestsWorkerPipelineFormatCfProperties = {
  country: string;
  region: string;
  city: string;
  colo: string;
  latitude: string;
  longitude: string;
  asn: number;
  asOrganization: string;
};

export type TestsWorkerPipelineFormatNotificationWithOptionals = {
  title: string;
  body: string;
  priority: 3;
  tags: string[];
  markdown: boolean;
  icon: string;
  actions: string;
};
