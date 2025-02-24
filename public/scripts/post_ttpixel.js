function exit(u, p) {
    const urlParams = new URLSearchParams(window.location.search);
    const ttclid = urlParams.get('ttclid');
    if (ttclid) {
        fetch(`/exit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ u, p, ttclid })
        }).catch(e => console.error(`exit Error:`, e));
    }
}