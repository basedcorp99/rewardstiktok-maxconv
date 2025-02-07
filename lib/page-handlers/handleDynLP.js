import dynlander from '../../assets/dynamic-lp.html'
import dynamicLanders from '../../config/dynlanders.json'

import { getPageData, injectHelpers, exit } from './common';

export async function handleDynLP(catchall, mappings, pixel_name) {
  const { user, mapping, subid } = getPageData(catchall, mappings);

  const targetUrl = exit(user, mapping, subid, pixel_name);

  const brandColor = dynamicLanders[mapping.dynlander].color;
  const brandLogo = dynamicLanders[mapping.dynlander].logo;
  const quizTitle = dynamicLanders[mapping.dynlander].quiz_title;

  const html = injectHelpers(dynlander).replace(/{{target_url}}/g, targetUrl)
                                       .replace(/{{brand_color}}/g, brandColor)
                                       .replace(/{{quiz_title}}/g, quizTitle)
                                       .replace(/{{brand_logo}}/g, brandLogo);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}