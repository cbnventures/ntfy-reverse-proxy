import { stripHtml } from '../../lib/utility.js';

import { ntfyJsonInterpreter } from '../interpreters/ntfy-json.js';
import { pfsenseInterpreter } from '../interpreters/pfsense.js';
import { plainTextInterpreter } from '../interpreters/plain-text.js';
import { seerrInterpreter } from '../interpreters/seerr.js';
import { statuspageInterpreter } from '../interpreters/statuspage.js';
import { synologyInterpreter } from '../interpreters/synology.js';
import { unifiInterpreter } from '../interpreters/unifi.js';

import type {
  WorkerPipelineInterpretContext,
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretInterpreterMap,
  WorkerPipelineInterpretInterpreterName,
  WorkerPipelineInterpretInterpreterResult,
  WorkerPipelineInterpretReturns,
  WorkerPipelineInterpretSelectedInterpreter,
} from '../../types/worker/pipeline/interpret.d.ts';

/**
 * Worker - Pipeline - Interpret - Interpreter Map.
 *
 * Maps interpreter names to their implementation functions so
 * the pipeline can dispatch by name at runtime.
 *
 * @since 2.0.0
 */
const interpreterMap: WorkerPipelineInterpretInterpreterMap = {
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
async function interpret(interpreterName: WorkerPipelineInterpretInterpreterName, input: WorkerPipelineInterpretInput, context?: WorkerPipelineInterpretContext): WorkerPipelineInterpretReturns {
  const interpreter: WorkerPipelineInterpretSelectedInterpreter = interpreterMap[interpreterName];

  if (interpreter === undefined) {
    throw new Error(`Unknown interpreter: ${interpreterName}`);
  }

  const result: WorkerPipelineInterpretInterpreterResult = await interpreter(input, context);

  if (result !== null) {
    Reflect.set(result['notification'], 'body', stripHtml(result['notification']['body']));
  }

  return result;
}

export {
  interpret,
};
