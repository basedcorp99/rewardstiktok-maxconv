import quiz from '../../assets/quiz-lp.html'
import dynamicLanders from '../../config/dynlanders.json'

import { getPageData, injectHelpers, target } from './common';

export async function handleQuizLP(params, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { user, mapping, subid } = getPageData(params, mappings);

  const targetUrl = target(mapping, subid, params.use_tracking_link, mappings.tracking_link);

  const quizTitle = dynamicLanders[mapping.dynlander].quiz_title;
  const brandColor = dynamicLanders[mapping.dynlander].color;
  const brandLogo = dynamicLanders[mapping.dynlander].logo;

  const html = injectHelpers(quiz, user, tt_pixel_name, fbpixel)
              .replace(/{{target_url}}/g, targetUrl)
              .replace(/{{quiz_title}}/g, quizTitle)
              .replace(/{{brand_color}}/g, brandColor)
              .replace(/{{brand_logo}}/g, brandLogo);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
