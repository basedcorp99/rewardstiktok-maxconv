export async function handleImageLP(context, mappings) {

  if (context.params.catchall.length !== 4) {
    return new Response('Invalid URL', { status: 400 });
  }

  const [network, geo, offer, subid] = context.params.catchall;

  const mapping = mappings[network].mappings.find(m => 
    m.offer === offer && (m.geo === geo || !m.geo)
  );

  if (!mapping) {
    return new Response('Not found', { status: 404 });
  }

  const lander = mapping.lander;

  const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

  // Generate the HTML content
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            </style>
        </head>
        <body>
            <div class="image-container">
                <a rel="noreferrer" href="${targetUrl}">
                    <img src="/public/images/${lander}">
                </a>
            </div>
        </body>
        </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function handleImageLPwPixel(context, mappings, pixel_id) {

  if (context.params.catchall.length !== 4) {
    return new Response('Invalid URL', { status: 400 });
  }

  const [network, geo, offer, subid] = context.params.catchall;

  const mapping = mappings[network].mappings.find(m => 
    m.offer === offer && (m.geo === geo || !m.geo)
  );

  if (!mapping) {
    return new Response('Not found', { status: 404 });
  }

  const lander = mapping.lander;

  const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

  // Generate the HTML content
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
<!-- TikTok Pixel Code Start -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('${pixel_id}');
  ttq.page();
}(window, document, 'ttq');
</script>
<!-- TikTok Pixel Code End -->
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            </style>
        </head>
        <body>
            <div class="image-container">
                <a rel="noreferrer" onclick="ttq.track('AddToCart', {});" href="${targetUrl}">
                    <img src="/public/images/${lander}">
                </a>
            </div>
        </body>
        </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}