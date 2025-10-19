import { wrapSimpleReq } from '../lib/wrapper.js'
import playfulHTML from '../public/playful-1/index.html'

export async function onRequest(context) {
    return wrapSimpleReq(context, playfulHTML);
}
