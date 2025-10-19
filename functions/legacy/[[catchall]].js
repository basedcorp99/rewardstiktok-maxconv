import { wrapReq } from '../../lib/wrapper.js'
import { mapGeoToCountry } from '../../lib/wrapper_helpers.js'

import { handlerMap } from '../../config/handlerMap.js'


export async function onRequest(context) {
    const parts = context.params.catchall;

    if (parts.length != 5 && parts.length != 4) {
      return new Response('Invalid URL', { status: 400 });
    }
  
    const [lp, network, ...rest] = parts;
    const cb = handlerMap[lp];
  
    let geo, offer, subid;
  
    if (parts.length === 5) {
      [geo, offer, subid] = rest;
    } else {
      [offer, subid] = rest;
      geo = mapGeoToCountry(context.request);
    }

    const params = { network, offer, subid, geo };

    const url = new URL(context.request.url);
    const s = url.searchParams;
    params.use_tracking_link = s.get('use_direct_link') ? false : true;
  
    return wrapReq(params, context, cb);
  }