export function exit(user, mapping, subid, ttclid) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    if (ttclid) {
        return `/exit?u=${user}&dest=${encodeURIComponent(targetUrl)}&ttclid=${ttclid}`;
    } else {
        return targetUrl;
    }
}