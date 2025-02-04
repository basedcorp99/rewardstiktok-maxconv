
export async function triggerPixel(context, pixel) {
    const clientIp = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    const externalId = clientIp.replace(/\./g, '');
    const eventTime = Math.floor(Date.now() / 1000);
    const currentUrl = context.request.url;

    const postData = {
        event_source: 'web',
        event_source_id: pixel.PIXEL_ID,
        data: [
            {
                event: pixel.PIXEL_EVENT,
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
            'Access-Token': pixel.EVENTSAPI_ACCESSTOKEN,
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
