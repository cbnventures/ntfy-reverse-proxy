import { interpretAppPayload } from './app-payload.js';

import type {
  Worker_Interpreters_Outpost_Input,
  Worker_Interpreters_Outpost_OutpostInterpreter,
  Worker_Interpreters_Outpost_OutpostInterpreter_App,
  Worker_Interpreters_Outpost_Returns,
} from '../../types/worker/interpreters/outpost.d.ts';

/**
 * Worker - Interpreters - Outpost - Interpreter.
 *
 * Reads the alerts Outpost sends, such as updated containers or a failed update.
 * The app name goes before each title, and the alert keeps its priority and tags.
 *
 * @returns {Worker_Interpreters_Outpost_Returns}
 *
 * @since 2.3.0
 */
const outpostInterpreter: Worker_Interpreters_Outpost_OutpostInterpreter = (input: Worker_Interpreters_Outpost_Input): Worker_Interpreters_Outpost_Returns => {
  const app: Worker_Interpreters_Outpost_OutpostInterpreter_App = {
    key: 'outpost',
    name: 'Outpost',
  };

  return interpretAppPayload(app, input);
};

export {
  outpostInterpreter,
};
