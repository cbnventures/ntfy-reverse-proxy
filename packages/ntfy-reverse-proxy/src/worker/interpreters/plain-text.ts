import type {
  Worker_Interpreters_PlainText_Input,
  Worker_Interpreters_PlainText_PlainTextInterpreter,
  Worker_Interpreters_PlainText_PlainTextInterpreter_Body,
  Worker_Interpreters_PlainText_PlainTextInterpreter_Decoder,
  Worker_Interpreters_PlainText_Result,
} from '../../types/worker/interpreters/plain-text.d.ts';

/**
 * Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * Converts raw request input into a notification body by decoding
 * binary buffers and stringifying JSON objects as-is.
 *
 * @since 2.0.0
 */
const plainTextInterpreter: Worker_Interpreters_PlainText_PlainTextInterpreter = (input: Worker_Interpreters_PlainText_Input): Worker_Interpreters_PlainText_Result => {
  let body: Worker_Interpreters_PlainText_PlainTextInterpreter_Body = undefined;

  if (typeof input === 'string') {
    body = input;
  } else if (input instanceof ArrayBuffer) {
    const decoder: Worker_Interpreters_PlainText_PlainTextInterpreter_Decoder = new TextDecoder('utf-8');

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
