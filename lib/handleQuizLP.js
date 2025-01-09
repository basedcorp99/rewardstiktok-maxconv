import quiz from '../assets/quiz-lp.html'
import dynamicLanders from '../config/dynlanders.json'

export async function handleQuizLP(catchall, mappings, htmlsrc) {
  if (catchall.length !== 4) {
    return new Response('Invalid URL', { status: 400 });
  }

  const [network, geo, offer, subid] = catchall;

  const mapping = mappings[network].mappings.find(m => 
    m.offer === offer && (m.geo === geo || !m.geo)
  );

  if (!mapping) {
    return new Response('Not found', { status: 404 });
  }

  const lander = mapping.lander;

  const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

  const quizTitle = dynamicLanders[mapping.dynlander].quiz_title;
  const brandColor = dynamicLanders[mapping.dynlander].color;
  const brandLogo = dynamicLanders[mapping.dynlander].logo;

  let html_base;

  if (htmlsrc) {
    html_base = htmlsrc;
  } else {
    html_base = quiz;
  }
  const html = html_base.replace(/{{target_url}}/g, targetUrl)
                      .replace(/{{quiz_title}}/g, quizTitle)
                      .replace(/{{brand_color}}/g, brandColor)
                      .replace(/{{brand_logo}}/g, brandLogo);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
