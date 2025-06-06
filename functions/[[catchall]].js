import { wrapReq } from '../lib/wrapper.js'
import { mapGeoToCountry } from '../lib/wrapper_helpers.js'

import { handlerMap } from '../config/handlerMap.js'


export async function onRequest(context) {
    const parts = context.params.catchall;

    if (parts.length != 6 && parts.length != 5) {
      return new Response('Invalid URL', { status: 400 });
    }
  
    const [lp, user, network, ...rest] = parts;
    const cb = handlerMap[lp];
  
    let geo, offer, subid;
  
    if (parts.length === 6) {
      [geo, offer, subid] = rest;
    } else {
      [offer, subid] = rest;
      geo = mapGeoToCountry(context.request);
    }

    const params = { user, network, offer, subid, geo };

    const url = new URL(context.request.url);
    const s = url.searchParams;
    params.use_tracking_link = s.get('use_tracking_link') ? true : false;
  
    return wrapReq(params, context, cb);
  }