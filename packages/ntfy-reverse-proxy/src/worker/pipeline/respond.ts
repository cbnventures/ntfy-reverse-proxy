import type {
  Worker_Pipeline_Respond_AllSuccess,
  Worker_Pipeline_Respond_AnySuccess,
  Worker_Pipeline_Respond_Body,
  Worker_Pipeline_Respond_BodySize,
  Worker_Pipeline_Respond_ContextName,
  Worker_Pipeline_Respond_DeliveryResult,
  Worker_Pipeline_Respond_HasAttachment,
  Worker_Pipeline_Respond_HttpStatus,
  Worker_Pipeline_Respond_InterpreterName,
  Worker_Pipeline_Respond_MessageTitle,
  Worker_Pipeline_Respond_Options,
  Worker_Pipeline_Respond_Parts,
  Worker_Pipeline_Respond_Respond_FallbackNote,
  Worker_Pipeline_Respond_Respond_Message,
  Worker_Pipeline_Respond_Respond_PartialStatus,
  Worker_Pipeline_Respond_Respond_QueuedBody,
  Worker_Pipeline_Respond_Respond_Results,
  Worker_Pipeline_Respond_Respond_SendResult,
  Worker_Pipeline_Respond_Respond_Servers,
  Worker_Pipeline_Respond_Returns,
  Worker_Pipeline_Respond_ShowResponseOutput,
  Worker_Pipeline_Respond_Status,
} from '../../types/worker/pipeline/respond.d.ts';

/**
 * Worker - Pipeline - Respond - Respond.
 *
 * Builds the final HTTP response by aggregating per-server send
 * results into a JSON body with appropriate status codes.
 *
 * @since 2.0.0
 */
function respond(deliveryResult: Worker_Pipeline_Respond_DeliveryResult, options: Worker_Pipeline_Respond_Options): Worker_Pipeline_Respond_Returns {
  if (deliveryResult['state'] === 'queued') {
    const queuedBody: Worker_Pipeline_Respond_Respond_QueuedBody = {
      status: 'queued',
    };

    if (options['showResponseOutput'] === true) {
      Reflect.set(queuedBody, 'context', options['contextName']);
      Reflect.set(queuedBody, 'interpreter', options['interpreterName']);
      Reflect.set(queuedBody, 'delivery_id', deliveryResult['deliveryId']);
      Reflect.set(queuedBody, 'pending', deliveryResult['pending']);
    }

    return new Response(JSON.stringify(queuedBody, null, 2), {
      status: 202,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const sendResult: Worker_Pipeline_Respond_Respond_SendResult = deliveryResult['sendResult'] ?? {
    results: [],
    fallbackUsed: false,
  };
  const results: Worker_Pipeline_Respond_Respond_Results = sendResult['results'];
  const fallbackNote: Worker_Pipeline_Respond_Respond_FallbackNote = sendResult['fallbackNote'];
  const showResponseOutput: Worker_Pipeline_Respond_ShowResponseOutput = options['showResponseOutput'];
  const contextName: Worker_Pipeline_Respond_ContextName = options['contextName'];
  const interpreterName: Worker_Pipeline_Respond_InterpreterName = options['interpreterName'];
  const messageTitle: Worker_Pipeline_Respond_MessageTitle = options['messageTitle'];
  const bodySize: Worker_Pipeline_Respond_BodySize = options['bodySize'];
  const parts: Worker_Pipeline_Respond_Parts = options['parts'];
  const hasAttachment: Worker_Pipeline_Respond_HasAttachment = options['hasAttachment'];

  const anySuccess: Worker_Pipeline_Respond_AnySuccess = results.some((result) => result['success'] === true);
  const allSuccess: Worker_Pipeline_Respond_AllSuccess = results.length > 0 && results.every((result) => result['success'] === true);

  const partialStatus: Worker_Pipeline_Respond_Respond_PartialStatus = (anySuccess === true) ? 'partial' : 'failed';
  const status: Worker_Pipeline_Respond_Status = (allSuccess === true) ? 'success' : partialStatus;

  const httpStatus: Worker_Pipeline_Respond_HttpStatus = (anySuccess === true) ? 200 : 502;

  const body: Worker_Pipeline_Respond_Body = {
    status,
  };

  if (fallbackNote !== undefined) {
    Reflect.set(body, 'fallback_note', fallbackNote);
  }

  if (showResponseOutput === true) {
    Reflect.set(body, 'context', contextName);
    Reflect.set(body, 'interpreter', interpreterName);

    const servers: Worker_Pipeline_Respond_Respond_Servers = results.map((result) => ({
      name: result['name'],
      status: result['status'],
      success: result['success'],
      stages: result['stages'],
    }));

    Reflect.set(body, 'servers', servers);

    const message: Worker_Pipeline_Respond_Respond_Message = {
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
