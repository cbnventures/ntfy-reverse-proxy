import type {
  WorkerInterpretersPlainTextInput,
  WorkerInterpretersPlainTextInterpreter,
  WorkerInterpretersPlainTextPlainTextInterpreterBody,
  WorkerInterpretersPlainTextPlainTextInterpreterDecoder,
  WorkerInterpretersPlainTextResult,
} from '../../types/worker/interpreters/plain-text.d.ts';

/**
 * Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * Converts raw request input into a notification body by decoding
 * binary buffers and stringifying JSON objects as-is.
 *
 * @since 2.0.0
 */
const plainTextInterpreter: WorkerInterpretersPlainTextInterpreter = (input: WorkerInterpretersPlainTextInput): WorkerInterpretersPlainTextResult => {
  let body: WorkerInterpretersPlainTextPlainTextInterpreterBody = undefined;

  if (typeof input === 'string') {
    body = input;
  } else if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersPlainTextPlainTextInterpreterDecoder = new TextDecoder('utf-8');

    body = decoder.decode(input);
  } else {
    body = JSON.stringify(input, null, 2);
  }

  return {
    notification: { body },
  };
};

export {
  plainTextInterpreter,
};
