export async function onRequest(context) {
    const url = new URL(context.request.url);
    const s = url.searchParams;
    const dest = s.get('dest');

    await triggerPixel(context);

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
    const clientIp = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    const externalId = clientIp.replace(/\./g, '');
    const eventTime = Math.floor(Date.now() / 1000);
    const currentUrl = context.request.url;

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
                page: {
                    url: currentUrl,
                }
            },
        ],
    };

    try {
        const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
            method: 'POST',
            headers: {
            'Access-Token': '7e2fb7bb248d98da0ed2f7d8ca424f7b47e7fcf8',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.log(error)
        return;
    }
}
