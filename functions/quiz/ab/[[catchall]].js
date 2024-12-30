import userAnonMappings from '../../../config/anon.json';
import { handleQuizLPwPixel } from '../../../lib/handleQuizLP.js'

export async function onRequest(context) {
  return handleQuizLPwPixel(context, userAnonMappings);
}