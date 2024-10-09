import user37Mappings from '../../config/37.json';
import { handleImageLP } from '../../lib/handleImageLP.js'

export async function onRequest(context) {
  return handleImageLP(context, user37Mappings);
}