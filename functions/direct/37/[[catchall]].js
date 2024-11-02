import user37Mappings from '../../../config/37.json';
import { handleDirectLink } from '../../../lib/handleDirectLink.js'

export async function onRequest(context) {
  return handleDirectLink(context, user37Mappings);
}