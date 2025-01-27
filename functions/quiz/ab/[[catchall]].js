import userAnonMappings from '../../../config/anon.json';
import { handleQuizLP } from '../../../lib/handleQuizLP.js'

export async function onRequest(context) {
  return handleQuizLP(context, userAnonMappings);
}