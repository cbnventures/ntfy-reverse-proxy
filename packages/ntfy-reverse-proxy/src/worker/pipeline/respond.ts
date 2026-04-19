import type {
  WorkerPipelineRespondAllSuccess,
  WorkerPipelineRespondAnySuccess,
  WorkerPipelineRespondBody,
  WorkerPipelineRespondBodyMessage,
  WorkerPipelineRespondBodyServers,
  WorkerPipelineRespondBodySize,
  WorkerPipelineRespondContextName,
  WorkerPipelineRespondFallbackNote,
  WorkerPipelineRespondHasAttachment,
  WorkerPipelineRespondHttpStatus,
  WorkerPipelineRespondInterpreterName,
  WorkerPipelineRespondMessageTitle,
  WorkerPipelineRespondOptions,
  WorkerPipelineRespondParts,
  WorkerPipelineRespondResults,
  WorkerPipelineRespondReturn,
  WorkerPipelineRespondSendResult,
  WorkerPipelineRespondShowResponseOutput,
  WorkerPipelineRespondStatus,
} from '../../types/worker/pipeline/respond.d.ts';

/**
 * Worker - Pipeline - Respond.
 *
 * Builds the final HTTP response by aggregating per-server send
 * results into a JSON body with appropriate status codes.
 *
 * @since 2.0.0
 */
function respond(sendResult: WorkerPipelineRespondSendResult, options: WorkerPipelineRespondOptions): WorkerPipelineRespondReturn {
  const results: WorkerPipelineRespondResults = sendResult['results'];
  const fallbackNote: WorkerPipelineRespondFallbackNote = sendResult['fallbackNote'];
  const showResponseOutput: WorkerPipelineRespondShowResponseOutput = options['showResponseOutput'];
  const contextName: WorkerPipelineRespondContextName = options['contextName'];
  const interpreterName: WorkerPipelineRespondInterpreterName = options['interpreterName'];
  const messageTitle: WorkerPipelineRespondMessageTitle = options['messageTitle'];
  const bodySize: WorkerPipelineRespondBodySize = options['bodySize'];
  const parts: WorkerPipelineRespondParts = options['parts'];
  const hasAttachment: WorkerPipelineRespondHasAttachment = options['hasAttachment'];

  const anySuccess: WorkerPipelineRespondAnySuccess = results.some((result) => result['success'] === true);
  const allSuccess: WorkerPipelineRespondAllSuccess = results.every((result) => result['success'] === true);

  const partialStatus: WorkerPipelineRespondStatus = (anySuccess === true) ? 'partial' : 'failed';
  const status: WorkerPipelineRespondStatus = (allSuccess === true) ? 'success' : partialStatus;

  const httpStatus: WorkerPipelineRespondHttpStatus = (anySuccess === true) ? 200 : 502;

  const body: WorkerPipelineRespondBody = {
    status,
  };

  if (fallbackNote !== undefined) {
    Reflect.set(body, 'fallback_note', fallbackNote);
  }

  if (showResponseOutput === true) {
    Reflect.set(body, 'context', contextName);
    Reflect.set(body, 'interpreter', interpreterName);

    const servers: WorkerPipelineRespondBodyServers = results.map((result) => ({
      name: result['name'],
      status: result['status'],
      success: result['success'],
      stages: result['stages'],
    }));

    Reflect.set(body, 'servers', servers);

    const message: WorkerPipelineRespondBodyMessage = {
      title: messageTitle,
      body_size: bodySize,
      parts,
      has_attachment: hasAttachment,
    };

    Reflect.set(body, 'message', message);
  }

  return new Response(JSON.stringify(body, null, 2), {
    status: httpStatus,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {
  respond,
};
