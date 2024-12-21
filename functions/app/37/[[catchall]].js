import user37Mappings from '../../../config/37.json';
import { handleAppLP } from '../../../lib/handleAppLP.js'

export async function onRequest(context) {
  return handleAppLP(context, user37Mappings);
}