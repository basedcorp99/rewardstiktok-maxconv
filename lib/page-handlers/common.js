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