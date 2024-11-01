import user37Mappings from '../../../config/37.json';
import { handleQuizLP } from '../../../lib/handleQuizLP.js'

export async function onRequest(context) {
  return handleQuizLP(context, user37Mappings);
}