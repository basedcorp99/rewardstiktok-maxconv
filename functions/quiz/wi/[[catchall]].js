import userwillieMappings from '../../../config/willie.json';
import { handleQuizLP } from '../../../lib/handleQuizLP.js'

export async function onRequest(context) {
  return handleQuizLP(context, userwillieMappings);
}