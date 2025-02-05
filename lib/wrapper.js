import { renderClown } from "./clown";
import { userMap } from '../config/userMap.js'

export function wrapReq(catchall, context, callback) {
    // For future use - Hide LP if header not set OR if not using parameter ?sh=1
    /* 
    const url = new URL(context.request.url);
    const sh = url.searchParams.get('sh');
    if (!context.request.headers.get('X-Show-Lander') && !sh) {
      return renderClown();
    }
    */
    const url = new URL(context.request.url);
    const mappings = userMap[catchall[0]];

    return callback(catchall, mappings, url.searchParams);
}