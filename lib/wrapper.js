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
    const mappings = userMap[catchall[0]];

    const url = new URL(context.request.url);
    const searchParams = url.searchParams;
    const ttclid = searchParams.get('ttclid');

    const tt_pixel_name = searchParams.get('track') || mappings.tt_pixels?.default_pixel;
    const ttpixel = mappings.tt_pixels?.[tt_pixel_name];

    if (ttpixel && ttclid) {
      triggerPixel(context, ttpixel, ttclid, ttpixel.PIXEL_VIEW_EVENT);
    }

    const fb_pixel_name = mappings.fb_pixels?.default_pixel;
    const fbpixel = mappings.fb_pixels?.[fb_pixel_name];

    return callback(catchall, mappings, { tt: tt_pixel_name, fb: fbpixel } );
}