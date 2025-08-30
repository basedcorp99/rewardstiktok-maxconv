import dynlander from '../../assets/cpi.html'

import { getPageData, injectHelpers, target } from './common';

export async function handleCPI(params, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { user, mapping, subid } = getPageData(params, mappings);

  const targetUrl = target(mapping, subid, params.use_tracking_link, mappings.tracking_link);

  const html = injectHelpers(dynlander, user, tt_pixel_name, fbpixel)
              .replace(/{{target_url}}/g, targetUrl);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}