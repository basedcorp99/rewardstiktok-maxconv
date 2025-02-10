
export async function triggerPixel(context, pixel, ttclid, pixel_event) {
    const clientIp = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';
    const user_agent = context.request.headers.get('user_agent') || 'unknown';
    const externalId = clientIp.replace(/\./g, '');
    const eventTime = Math.floor(Date.now() / 1000);

    const postData = {
        event_source: 'web',
        event_source_id: pixel.PIXEL_ID,
        data: [
            {
                event: pixel_event,
                event_time: eventTime,
                user: {
                    external_id: externalId, // stringified IP
                    ttclid: ttclid,
                    ip: clientIp,
                    user_agent: user_agent
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
