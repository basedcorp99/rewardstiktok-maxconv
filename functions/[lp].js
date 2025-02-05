import { wrapReq } from '../lib/wrapper.js'
import { handlerMap } from '../config/handlerMap.js'


export async function onRequest(context) {
    const url = new URL(context.request.url);
    const s = url.searchParams;

    const lp = context.params.lp;

    const requiredParams = ['u', 'n', 'g', 'o', 's1'];

    // Extract parameters and validate
    const params = requiredParams.map(param => {
        const value = s.get(param);
        if (value === null) {
            throw new Error(`Missing required parameter: ${param}`);
        }
        return value;
    });

    let cb = handlerMap[lp];

    return wrapReq(params, context, cb);
}