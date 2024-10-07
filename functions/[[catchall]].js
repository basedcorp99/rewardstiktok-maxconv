import anonMappings from '../config/anon.json';
import user37Mappings from '../config/37.json';

export async function onRequest(context) {
  if (context.params.catchall !== 5) {
    return new Response('Invalid URL format', { status: 400 });
  }

  const [user, network, geo, offer, subid] = context.params.catchall;

  // Select the correct mapping based on the user
  const userMappings = user === 'anon' ? anonMappings : user === '37' ? user37Mappings : null;

  if (!userMappings) {
    return new Response('Invalid user', { status: 400 });
  }

  // Find the matching URL from the configuration
  const mapping = userMappings.mappings.find(m => 
    (m.geo === geo || !m.geo) && 
    m.offer === offer && 
    m.network === network
  );

  let targetUrl;
  let appendSubid;

  if (mapping) {
    targetUrl = new URL(mapping.url);
    appendSubid = mapping.appendSubid;
  } else {
    targetUrl = new URL(userMappings.defaultUrl);
    appendSubid = userMappings.appendSubidToDefault;
  }

  // Append the network to the target URL
  targetUrl.searchParams.append('network', network);

  // Append the subid to the target URL only if appendSubid is true
  if (appendSubid) {
    targetUrl.searchParams.append('subid', subid);
  }

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
                        <a rel="noreferrer" href="${targetUrl.toString()}">
                    <img src="/images/${offer}lander.png">
                </a>
            </div>
        </body>
        </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}