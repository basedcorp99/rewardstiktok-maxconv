import { wrapReq } from '../../lib/wrapper.js'
import { mapGeoToCountry } from '../../lib/wrapper_helpers.js'
import { handlerMap } from '../../config/handlerMap.js'


export async function onRequest(context) {
    const url = new URL(context.request.url);
    const s = url.searchParams;

    const lp = context.params.lp;

    const shortKeys = {
        n: 'network',
        o: 'offer',
        s1: 'subid',
    };
    
    const params = {};
    
    // Required fields
    for (const [short, full] of Object.entries(shortKeys)) {
        const value = s.get(short);
        if (value === null) {
            throw new Error(`Missing required parameter: ${short}`);
        }
        params[full] = value;
    }
    // Optional geo with required throwing fallback
    params.geo = s.get('g') ?? mapGeoToCountry(context.request);
    params.use_tracking_link = s.get('use_direct_link') ? false : true;

    let cb = handlerMap[lp];

    return wrapReq(params, context, cb);
}