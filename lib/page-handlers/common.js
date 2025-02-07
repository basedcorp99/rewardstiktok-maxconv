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

export function injectHelpers(html) {
    return html.replace('</head>', '<script src="/public/scripts/pixel.js"></script></head>')
               .replace('\'{{target_url}}\'', 'appendTTCLID("{{target_url}}")');
}

export function exit(user, mapping, subid, pixel) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    // TODO don't bake ttclid but get it dynamically, in case this gets cached
    return `/exit?u=${user}&p=${pixel}&dest=${encodeURIComponent(targetUrl)}`;
}