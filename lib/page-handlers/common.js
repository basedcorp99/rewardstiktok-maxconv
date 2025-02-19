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
    // Replace target URL string as before.
    html = html.replace('\'{{target_url}}\'', 'appendTTCLID("{{target_url}}")');

    // Prepare our script injections.
    const pixelScript = '<script src="/public/scripts/inject_ttclid.js"></script>';
    let fbPixelInjection = '';

    if (fbpixel) {
        // Replace the {{pixel_id}} placeholder in the FBpixel script content.
        const modifiedFBpixel = fbPixelScript.replace('{{pixel_id}}', fbpixel.PIXEL_ID);
        // Wrap the modified script content inline.
        fbPixelInjection = `<script>${modifiedFBpixel}</script>`;
    }

    // Inject the scripts before the closing </head> tag.
    const combinedScripts = pixelScript + fbPixelInjection;
    html = html.replace('</head>', combinedScripts + '</head>');

    return html;
}

export function exit(user, mapping, subid, ttpixel) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    // TODO don't bake ttclid but get it dynamically, in case this gets cached
    return `/exit?u=${user}&p=${ttpixel}&dest=${encodeURIComponent(targetUrl)}`;
}