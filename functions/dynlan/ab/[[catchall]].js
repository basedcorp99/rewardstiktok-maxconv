import userAnonMappings from '../../../config/anon.json';
import { handleDynLP } from '../../../lib/handleDynLP.js'

export async function onRequest(context) {
  return handleDynLP(context, userAnonMappings);
}