import userwillieMappings from '../../../config/willie.json';
import { handleAppLP } from '../../../lib/handleAppLP.js'

export async function onRequest(context) {
  return handleAppLP(context, userwillieMappings);
}