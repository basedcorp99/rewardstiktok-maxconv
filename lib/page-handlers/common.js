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

export function injectHelpers(html, fbpixel) {
    html = html.replace('\'{{target_url}}\'', 'appendTTCLID("{{target_url}}")');

    // Helper for ttclid since we use it on backend Events API
    const pixelScript = '<script src="/public/scripts/inject_ttclid.js"></script>';

    let fbPixelInjection = '';
    if (fbpixel) {
        fbPixelInjection = fbPixelScript.replace(/{{pixel_id}}/mg, fbpixel.PIXEL_ID);
    }

    const combinedScripts = pixelScript + fbPixelInjection;
    html = html.replace('</head>', combinedScripts + '</head>');

    return html;
}

export function exit(user, mapping, subid, ttpixel) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    return `/exit?u=${user}&p=${ttpixel}&dest=${encodeURIComponent(targetUrl)}`;
}