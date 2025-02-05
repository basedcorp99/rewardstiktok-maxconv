function appendTTCLID(url) {
    const ttclid = new URLSearchParams(window.location.search).get('ttclid');
    return !ttclid ?  url : url + ( url.includes('?') ? '&' :'?' ) + "ttclid=" + ttclid;
}
