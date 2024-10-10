import userAnonMappings from '../../config/anon.json';
import { handleImageLP } from '../../lib/handleImageLP.js'

export async function onRequest(context) {
  return handleImageLP(context, userAnonMappings);
}