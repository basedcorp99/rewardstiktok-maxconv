import userAnonMappings from '../../../config/anon.json';
import { handleDirectLink } from '../../../lib/handleDirectLink.js'

export async function onRequest(context) {
  return handleDirectLink(context, userAnonMappings);
}