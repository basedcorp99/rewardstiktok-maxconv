import quiz2Lander from '../../assets/quiz2-lp.html'
import quiz2Config from '../../config/quiz2.json'

import { getPageData, injectHelpers, target } from './common';

export async function handleQuiz2LP(params, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { mapping, subid } = getPageData(params, mappings);
  
  const targetUrl = target(mapping, subid, params.use_tracking_link, mappings.tracking_link);

  // Get brand configuration from quiz2Config
  const brandConfig = quiz2Config[mapping.quiz2lander || 'cash750'];
  
  // Add base path for assets
  const assetBasePath = '/public/assets';
  
  // Replace variables in the HTML template
  let html = injectHelpers(quiz2Lander, tt_pixel_name, fbpixel);
  
  // Replace offer image and target URL
  html = html
      .replace(/{{target_url}}/g, targetUrl)
      .replace(/{{offer_image}}/g, `${assetBasePath}/${brandConfig.offer_image}`);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}    