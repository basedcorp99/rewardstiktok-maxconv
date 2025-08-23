import { renderClown } from "./clown";
import { userMap } from '../config/userMap.js'
import { triggerPixel } from "./pixel.js";
import { anon_secret, verifyKey } from "./verify-key.js";

export async function wrapReq(params, context, callback) {
    const mappings = userMap[params.user];

    const url = new URL(context.request.url);
    const searchParams = url.searchParams;

    const maxconv_key = searchParams.get('lp_key');
    // const anonbroski_key = searchParams.get('ab_key');

    if (!maxconv_key) {
      return renderClown();
    }
    /* const key = anonbroski_key || maxconv_key; */
    const key = maxconv_key;
    const secret = mappings.maxconv_secret;
    const passed_key = await verifyKey(context.request, key, secret);
    if (!passed_key) {
      return renderClown();
    }

    const ttclid = searchParams.get('ttclid');

    const tt_pixel_name = searchParams.get('track') || mappings.tt_pixels?.default_pixel;
    const ttpixel = mappings.tt_pixels?.[tt_pixel_name];

    if (ttpixel && ttclid) {
      triggerPixel(context, ttpixel, ttclid, ttpixel.PIXEL_VIEW_EVENT);
    }

    const fb_pixel_name = mappings.fb_pixels?.default_pixel;
    const fbpixel = mappings.fb_pixels?.[fb_pixel_name];

    return callback(params, mappings, { tt: tt_pixel_name, fb: fbpixel } );
}