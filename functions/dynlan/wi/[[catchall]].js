import userwillieMappings from '../../../config/willie.json';
import { handleDynLP } from '../../../lib/handleDynLP.js'

export async function onRequest(context) {
  return handleDynLP(context, userwillieMappings);
}