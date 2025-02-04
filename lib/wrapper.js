import { renderClown } from "./clown";

export function wrapReq(context, mappings, callback) {
    // For future use - Hide LP if header not set OR if not using parameter ?sh=1
    /* 
    const url = new URL(context.request.url);
    const sh = url.searchParams.get('sh');
    if (!context.request.headers.get('X-Show-Lander') && !sh) {
      return renderClown();
    }
    */

    if (context.params.catchall.length !== 6) {
      return new Response('Invalid URL', { status: 400 });
    }
  
    return callback(context.params.catchall.slice(1), mappings);
}