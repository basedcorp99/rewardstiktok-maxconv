import { userMap } from '../config/userMap.js'

import { triggerPixel } from '../lib/pixel.js'

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const s = url.searchParams;
    const dest = s.get('dest');
    const user = s.get('u');

    const pixel = userMap[user].pixel;

    if (pixel) {
        await triggerPixel(context, pixel);
    }
    const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="referrer" content="no-referrer" />
        <meta name="robots" content="noindex,nofollow" />
        <meta http-equiv="refresh" content="0;url=${dest}" />
    </head>
</html>
`
    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}