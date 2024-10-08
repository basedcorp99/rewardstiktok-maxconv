import userAnonMappings from '../../config/anon.json';
import { handleRequest } from '../../lib/handleRequest.js'

export async function onRequest(context) {
  return handleRequest(context, userAnonMappings);
}