export function exit(mapping, subid) {
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);
    return "/exit?dest=" + encodeURIComponent(targetUrl);
}