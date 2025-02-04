export function exit(user, mapping, subid) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    return `/exit?u=${user}&dest=${encodeURIComponent(targetUrl)}`;
}