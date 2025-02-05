import { renderClown } from "./clown";
import { userMap } from '../config/userMap.js'
import { triggerPixel } from "./pixel.js";

export async function wrapReq(catchall, context, callback) {
    // For future use - Hide LP if header not set OR if not using parameter ?sh=1
    /* 
    const url = new URL(context.request.url);
    const sh = url.searchParams.get('sh');
    if (!context.request.headers.get('X-Show-Lander') && !sh) {
      return renderClown();
    }
    */
    const url = new URL(context.request.url);
    const searchParams = url.searchParams;
    const ttclid = searchParams.get('ttclid');

    const mappings = userMap[catchall[0]];
    const pixel = mappings.pixel;

    if (pixel && ttclid) {
      triggerPixel(context, pixel, ttclid, pixel.PIXEL_VIEW_EVENT);
    }
    return callback(catchall, mappings, searchParams);
}