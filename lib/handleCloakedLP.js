import whitehat from '../assets/whitehat.html'

export async function handleCloakedLP(context) {

  if (context.params.catchall.length !== 5) {
    return new Response('Invalid destination', { status: 400 });
  }

  const jsUrl =  '/script/' + context.params.catchall.join('/');

  const html = whitehat.replace(/{{slug}}/g, context.params.catchall[context.params.catchall.length -1]).replace(/{{js_url}}/g, jsUrl);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}