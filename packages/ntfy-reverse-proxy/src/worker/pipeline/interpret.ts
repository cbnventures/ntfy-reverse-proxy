import { stripHtml } from '../../lib/utility.js';

import { ntfyJsonInterpreter } from '../interpreters/ntfy-json.js';
import { pfsenseInterpreter } from '../interpreters/pfsense.js';
import { plainTextInterpreter } from '../interpreters/plain-text.js';
import { seerrInterpreter } from '../interpreters/seerr.js';
import { statuspageInterpreter } from '../interpreters/statuspage.js';
import { synologyInterpreter } from '../interpreters/synology.js';
import { unifiInterpreter } from '../interpreters/unifi.js';

import type {
  Worker_Pipeline_Interpret_Context,
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Interpret_InterpreterName,
  Worker_Pipeline_Interpret_InterpreterMap,
  Worker_Pipeline_Interpret_InterpreterResult,
  Worker_Pipeline_Interpret_Returns,
  Worker_Pipeline_Interpret_SelectedInterpreter,
} from '../../types/worker/pipeline/interpret.d.ts';

/**
 * Worker - Pipeline - Interpret - Interpreter Map.
 *
 * Maps interpreter names to their implementation functions so
 * the pipeline can dispatch by name at runtime.
 *
 * @since 2.0.0
 */
const interpreterMap: Worker_Pipeline_Interpret_InterpreterMap = {
  'plain-text': plainTextInterpreter,
  'ntfy-json': ntfyJsonInterpreter,
  'seerr': seerrInterpreter,
  'pfsense': pfsenseInterpreter,
  'synology': synologyInterpreter,
  'statuspage': statuspageInterpreter,
  'unifi': unifiInterpreter,
};

/**
 * Worker - Pipeline - Interpret.
 *
 * Looks up the named interpreter and invokes it against the
 * parsed input to produce a structured notification object.
 *
 * @since 2.0.0
 */
async function interpret(interpreterName: Worker_Pipeline_Interpret_Interpret_InterpreterName, input: Worker_Pipeline_Interpret_Input, context?: Worker_Pipeline_Interpret_Context): Worker_Pipeline_Interpret_Returns {
  const selectedInterpreter: Worker_Pipeline_Interpret_SelectedInterpreter = interpreterMap[interpreterName];

  if (selectedInterpreter === undefined) {
    throw new Error(`Unknown interpreter: ${interpreterName}`);
  }

  const interpreterResult: Worker_Pipeline_Interpret_InterpreterResult = await selectedInterpreter(input, context);

  if (interpreterResult !== null) {
    Reflect.set(interpreterResult['notification'], 'body', stripHtml(interpreterResult['notification']['body']));
  }

  return interpreterResult;
}

export {
  interpret,
  interpreterMap,
};
