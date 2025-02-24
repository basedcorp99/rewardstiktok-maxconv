export function getPageData(catchall, mappings) {
    if (catchall.length !== 5) {
        throw new Error('Invalid URL');
    }

    const [user, network, geo, offer, subid] = catchall;

    const mapping = mappings[network].mappings.find(m => 
        m.offer === offer && (m.geo === geo || !m.geo)
    );

    if (!mapping) {
        throw new Error('Not found');
    }

    return { user, mapping, subid };
}

import fbPixelScript from '../../assets/scripts/FBpixel.js';

export function injectHelpers(html, user, ttpixel, fbpixel) {
    // Helper for ttclid since we use it on backend Events API
    html = html.replace(/{{trigger_ttpixel}}/g, exit(user, ttpixel))
    const pixelScript = '<script src="/public/scripts/post_ttpixel.js"></script>';

    let fbPixelInjection = '';
    if (fbpixel) {
        fbPixelInjection = fbPixelScript.replace(/{{pixel_id}}/mg, fbpixel.PIXEL_ID);
    }

    const combinedScripts = pixelScript + fbPixelInjection;
    html = html.replace('</head>', combinedScripts + '</head>');

    return html;
}

export function exit(user, ttpixel) {
    return `exit('${user}', '${ttpixel}')`;
}

export function target(mapping, subid) {
    return mapping.url + (mapping.appendSubId == false ? "" : subid);
}