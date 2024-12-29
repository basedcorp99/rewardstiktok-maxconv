import userAnonMappings from '../../config/anon.json';
import { handleImageLPwPixel } from '../../lib/handleImageLP.js'

export async function onRequest(context) {
  return handleImageLPwPixel(context, userAnonMappings);
}