/**
 * Worker - Pipeline - Shared.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSharedComponentDiff = WorkerPipelineSharedComponentDiffEntry[];

/**
 * Worker - Pipeline - Shared.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSharedComponentDiffEntryName = string;

export type WorkerPipelineSharedComponentDiffEntryNewStatus = string;

export type WorkerPipelineSharedComponentDiffEntryOldStatus = string | undefined;

export type WorkerPipelineSharedComponentDiffEntryChanged = boolean;

export type WorkerPipelineSharedComponentDiffEntry = {
  name: WorkerPipelineSharedComponentDiffEntryName;
  oldStatus: WorkerPipelineSharedComponentDiffEntryOldStatus;
  newStatus: WorkerPipelineSharedComponentDiffEntryNewStatus;
  changed: WorkerPipelineSharedComponentDiffEntryChanged;
};

/**
 * Worker - Pipeline - Shared.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSharedComponentsMap = Record<string, WorkerPipelineSharedComponentState>;

/**
 * Worker - Pipeline - Shared.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSharedComponentStateName = string;

export type WorkerPipelineSharedComponentStateStatus = string;

export type WorkerPipelineSharedComponentState = {
  name: WorkerPipelineSharedComponentStateName;
  status: WorkerPipelineSharedComponentStateStatus;
};

/**
 * Worker - Pipeline - Shared.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSharedStoredStateIncidentId = string | undefined;

export type WorkerPipelineSharedStoredStateIncidentName = string | undefined;

export type WorkerPipelineSharedStoredStateStatus = string | undefined;

export type WorkerPipelineSharedStoredStateImpact = string | undefined;

export type WorkerPipelineSharedStoredStateBody = string | undefined;

export type WorkerPipelineSharedStoredStateShortlink = string | undefined;

export type WorkerPipelineSharedStoredStateServiceName = string;

export type WorkerPipelineSharedStoredStateUnsubscribeUrl = string | undefined;

export type WorkerPipelineSharedStoredStateUpdateId = string | undefined;

export type WorkerPipelineSharedStoredStateComponents = WorkerPipelineSharedComponentsMap;

export type WorkerPipelineSharedStoredState = {
  incidentId: WorkerPipelineSharedStoredStateIncidentId;
  incidentName: WorkerPipelineSharedStoredStateIncidentName;
  status: WorkerPipelineSharedStoredStateStatus;
  impact: WorkerPipelineSharedStoredStateImpact;
  body: WorkerPipelineSharedStoredStateBody;
  shortlink: WorkerPipelineSharedStoredStateShortlink;
  serviceName: WorkerPipelineSharedStoredStateServiceName;
  unsubscribeUrl: WorkerPipelineSharedStoredStateUnsubscribeUrl;
  updateId: WorkerPipelineSharedStoredStateUpdateId;
  components: WorkerPipelineSharedStoredStateComponents;
};
