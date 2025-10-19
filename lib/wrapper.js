import { renderClown } from "./clown";
import anonConfig from '../config/anon.json'
import { triggerPixel } from "./pixel.js";
import { anon_secret, verifyKey } from "./verify-key.js";

async function handleAuthAndPixels(context, enableAuth = true) {
    const url = new URL(context.request.url);
    const searchParams = url.searchParams;

    const maxconv_key = searchParams.get('lp_key');

    if (enableAuth && !maxconv_key) {
        return renderClown();
    }

    if (enableAuth) {
        const secret = anonConfig.maxconv_secret;
        const passed_key = await verifyKey(context.request, maxconv_key, secret);
        if (!passed_key) {
            return renderClown();
        }
    }

    const ttclid = searchParams.get('ttclid');
    const tt_pixel_name = searchParams.get('track') || anonConfig.tt_pixels?.default_pixel;
    const ttpixel = anonConfig.tt_pixels?.[tt_pixel_name];

    if (ttpixel && ttclid) {
        triggerPixel(context, ttpixel, ttclid, ttpixel.PIXEL_VIEW_EVENT);
    }

    const fb_pixel_name = anonConfig.fb_pixels?.default_pixel;
    const fbpixel = anonConfig.fb_pixels?.[fb_pixel_name];

    return { tt: tt_pixel_name, fb: fbpixel };
}

export async function wrapReq(params, context, callback) {
    const authResult = await handleAuthAndPixels(context);
    if (authResult instanceof Response) {
        return authResult; // Return error response if auth failed
    }

    return callback(params, anonConfig, authResult);
}

export async function wrapSimpleReq(context, html) {
    const authResult = await handleAuthAndPixels(context);
    if (authResult instanceof Response) {
        return authResult; // Return error response if auth failed
    }

    // Always use the tracking link as target URL
    const targetUrl = anonConfig.tracking_link;
    const processedHtml = html.replace(/{{target_url}}/g, targetUrl);

    return new Response(processedHtml, {
        headers: { 'Content-Type': 'text/html' },
    });
}