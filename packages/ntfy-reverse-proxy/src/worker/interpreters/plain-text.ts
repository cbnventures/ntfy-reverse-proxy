import type {
  Worker_Interpreters_PlainText_Input,
  Worker_Interpreters_PlainText_PlainTextInterpreter,
  Worker_Interpreters_PlainText_PlainTextInterpreter_Body,
  Worker_Interpreters_PlainText_Returns,
} from '../../types/worker/interpreters/plain-text.d.ts';

/**
 * Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * Converts text and JSON input into a notification body, while preserving
 * binary input as an attachment instead of decoding it as UTF-8.
 *
 * @returns {Worker_Interpreters_PlainText_Returns}
 *
 * @since 2.0.0
 */
const plainTextInterpreter: Worker_Interpreters_PlainText_PlainTextInterpreter = (input: Worker_Interpreters_PlainText_Input): Worker_Interpreters_PlainText_Returns => {
  if (input instanceof ArrayBuffer) {
    return {
      notification: { body: '' },
      attachment: input,
    };
  }

  let body: Worker_Interpreters_PlainText_PlainTextInterpreter_Body = undefined;

  if (typeof input === 'string') {
    body = input;
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
