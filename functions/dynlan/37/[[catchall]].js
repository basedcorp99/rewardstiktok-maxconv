import user37Mappings from '../../../config/37.json';
import { handleDynLP } from '../../../lib/handleDynLP.js'

export async function onRequest(context) {
  return handleDynLP(context, user37Mappings);
}