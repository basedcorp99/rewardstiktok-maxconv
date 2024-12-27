import userwillieMappings from '../../config/willie.json';
import { handleImageLP } from '../../lib/handleImageLP.js'

export async function onRequest(context) {
  return handleImageLP(context, userwillieMappings);
}