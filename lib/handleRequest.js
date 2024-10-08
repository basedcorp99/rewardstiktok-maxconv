export async function handleRequest(context, mappings) {

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