import anonConfig from '../config/anon.json';
import { triggerPixel } from '../lib/pixel.js';

export async function onRequest(context) {
    const body = await context.request.json();
    const { p: pixel_name, ttclid } = body;

    if (!pixel_name || !ttclid) {
        return errorResponse("Missing required fields: p, ttclid");
    }

    const pixel = anonConfig.tt_pixels?.[pixel_name];

    if (!pixel) {
        return errorResponse("Pixel not found");
    }

    triggerPixel(context, pixel, ttclid, pixel.PIXEL_CLICK_EVENT);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: jsonHeaders(),
    });
}

function jsonHeaders() {
    return { "Content-Type": "application/json" };
}

function errorResponse(message, status = 400) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: jsonHeaders(),
    });
}