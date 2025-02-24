import html from '../../assets/img-lp.html'

import { getPageData, injectHelpers, target } from './common';

export async function handleImageLP(catchall, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { user, mapping, subid } = getPageData(catchall, mappings);

  const targetUrl = target(mapping, subid);

  const lander = mapping.lander;

  // Generate the HTML content
  const htmlContent = injectHelpers(html, user, tt_pixel_name, fbpixel)
                      .replace(/{{target_url}}/g, targetUrl)
                      .replace(/{{lander}}/g, lander);

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
