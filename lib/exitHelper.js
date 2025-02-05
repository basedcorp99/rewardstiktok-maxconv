export function exit(user, mapping, subid, ttclid) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    // TODO don't bake ttclid but get it dynamically, in case this gets cached
    return `/exit?u=${user}&dest=${encodeURIComponent(targetUrl)}&ttclid=${ttclid}`;
}