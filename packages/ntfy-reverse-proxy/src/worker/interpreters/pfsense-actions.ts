import { interpretAppPayload } from './app-payload.js';

import type {
  Worker_Interpreters_PfsenseActions_Input,
  Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter,
  Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_App,
  Worker_Interpreters_PfsenseActions_Returns,
} from '../../types/worker/interpreters/pfsense-actions.d.ts';

/**
 * Worker - Interpreters - Pfsense Actions - Pfsense Actions Interpreter.
 *
 * Reads the alerts pfSense Actions sends, such as pfSense going down or a failed action.
 * The app name goes before each title, and the alert keeps its priority and tags.
 *
 * @returns {Worker_Interpreters_PfsenseActions_Returns}
 *
 * @since 2.3.0
 */
const pfsenseActionsInterpreter: Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter = (input: Worker_Interpreters_PfsenseActions_Input): Worker_Interpreters_PfsenseActions_Returns => {
  const app: Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_App = {
    key: 'pfsense-actions',
    name: 'pfSense Actions',
  };

  return interpretAppPayload(app, input);
};

export {
  pfsenseActionsInterpreter,
};
