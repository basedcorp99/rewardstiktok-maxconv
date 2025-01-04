import userwillieMappings from '../../config/willie.json';
import { handleImageLPwPixel } from '../../lib/handleImageLP.js'

export async function onRequest(context) {
  return handleImageLPwPixel(context, userwillieMappings, 'CTSNS23C77U1GH2BKSHG');
}