import userAnonMappings from '../../../config/anon.json';
import { handleAppLP } from '../../../lib/handleAppLP.js'

export async function onRequest(context) {
  return handleAppLP(context, userAnonMappings);
}