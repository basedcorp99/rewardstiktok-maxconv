export async function onRequest(context) {
    const url = new URL(context.request.url);
    const s = url.searchParams;
    const dest = s.get('dest');

    triggerPixel(context);

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

async function triggerPixel(context) {
    const url = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

    const clientIp = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    const externalId = clientIp.replace(/\./g, '');
    const eventTime = Math.floor(Date.now() / 1000);

    const postData = {
    event_source: 'web',
    event_source_id: 'CUGBUTRC77U09FJDQ1NG',
    data: [
        {
        event: 'AddToCart',
        event_time: eventTime,
        user: {
            external_id: externalId,
        },
        properties: {
            currency: null,
            content_type: null,
        },
        page: {
            url: null,
            referrer: null,
        },
        },
    ],
    };

    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Access-Token': 'f181c6950d15a4e03eebb4413abd0561917deb79',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });

    const responseData = await response.json();

    return responseData;
    } catch (e) {
        return;
    }
}