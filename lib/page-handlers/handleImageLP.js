import html from '../../assets/img-lp.html'

import { getPageData, injectHelpers, exit } from './common';

export async function handleImageLP(catchall, mappings, pixel_name) {
  const { user, mapping, subid } = getPageData(catchall, mappings);

  const targetUrl = exit(user, mapping, subid, pixel_name);

  const lander = mapping.lander;

  // Generate the HTML content
  const htmlContent = injectHelpers(html).replace(/{{target_url}}/g, targetUrl)
                                         .replace(/{{lander}}/g, lander);

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
