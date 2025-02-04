import quiz from '../../assets/quiz-lp.html'
import dynamicLanders from '../../config/dynlanders.json'
import { exit } from '../exitHelper'
import { getPageData } from './common';

export async function handleQuizLP(catchall, mappings) {
  const { user, mapping, subid } = getPageData(catchall, mappings);

  const targetUrl = exit(user, mapping, subid);

  const quizTitle = dynamicLanders[mapping.dynlander].quiz_title;
  const brandColor = dynamicLanders[mapping.dynlander].color;
  const brandLogo = dynamicLanders[mapping.dynlander].logo;

  const html = quiz.replace(/{{target_url}}/g, targetUrl)
                    .replace(/{{quiz_title}}/g, quizTitle)
                    .replace(/{{brand_color}}/g, brandColor)
                    .replace(/{{brand_logo}}/g, brandLogo);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
