import quiz2Lander from '../../assets/quiz2-lp.html'
import quiz2Config from '../../config/quiz2.json'

import { getPageData, injectHelpers, exit } from './common';

export async function handleQuiz2LP(catchall, mappings, pixel_name) {
  const { user, mapping, subid } = getPageData(catchall, mappings);
  
  const targetUrl = exit(user, mapping, subid, pixel_name);

  // Get brand configuration from quiz2Config
  const brandConfig = quiz2Config[mapping.quiz2lander || 'cash750'];
  
  // Add base path for assets
  const assetBasePath = '/public/assets';
  
  // Replace variables in the HTML template
  let html = injectHelpers(quiz2Lander);
  
  // Replace offer image and target URL
  html = html
      .replace(/{{target_url}}/g, targetUrl)
      .replace(/{{offer_image}}/g, `${assetBasePath}/${brandConfig.offer_image}`);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}    