import user37Mappings from '../../config/37.json';
import { handleRequest } from '../../lib/handleRequest.js'

export async function onRequest(context) {
  return handleRequest(context, user37Mappings);
}