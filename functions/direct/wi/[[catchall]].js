import userwillieMappings from '../../../config/willie.json';
import { handleDirectLink } from '../../../lib/handleDirectLink.js'

export async function onRequest(context) {
  return handleDirectLink(context, userwillieMappings);
}