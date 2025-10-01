export function getPageData(params, mappings) {
    const { user, network, geo, offer, subid } = params;

    const mapping = mappings[network].mappings.find(m => 
        m.offer === offer && (m.geo === geo || !m.geo)
    );

    if (!mapping) {
        throw new Error('Not found');
    }

    return { user, mapping, subid };
}


// disabled
export function injectHelpers(html, user, ttpixel, fbpixel) {
    // Helper for ttclid since we use it on backend Events API
    html = html.replace(/{{trigger_ttpixel}}/g, ''); //exit(user, ttpixel))
    const pixelScript = ''; //<script src="/public/scripts/post_ttpixel.js"></script>';

    const combinedScripts = pixelScript;
    html = html.replace('</head>', combinedScripts + '</head>');

    return html;
}

export function exit(user, ttpixel) {
    return `exit('${user}', '${ttpixel}')`;
}

export function target(mapping, subid, use_tracking_link, tracking_link) {
    if (use_tracking_link && tracking_link) {
        return tracking_link;
    }
    return mapping.url + (mapping.appendSubId == false ? "" : subid);
}