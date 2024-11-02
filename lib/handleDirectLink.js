export async function handleDirectLink(context, mappings) {

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

  const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

  // Generate the HTML content
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta http-equiv="refresh" content="0; url=${targetUrl}"> 
        </head>
        </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}