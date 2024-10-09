import user37Mappings from '../../config/37.json';
import { handleCloakedLP } from '../../lib/handleCloakedLP.js'

export async function onRequest(context) {
  return handleCloakedLP(context, user37Mappings);
}