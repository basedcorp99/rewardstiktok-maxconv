import whitehat from '../assets/dynamic-lp.html'
import dynamicLanders from '../config/dynlanders.json'

export async function handleDynLP(context, mappings) {

    if (context.params.catchall.length !== 4) {
      return new Response('Invalid URL', { status: 400 });
    }
  
    const [network, geo, offer, subid] = context.params.catchall;
  
    const mapping = mappings[network].mappings.find(m => 
      m.offer === offer && (m.geo === geo || !m.geo)
    );
  
    if (!mapping) {
      return new Response('Not found', { status: 404 });
    }
  
    const lander = mapping.lander;
  
    const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

    const brandColor = dynamicLanders[mapping.dynlander].color;
    const brandLogo = dynamicLanders[mapping.dynlander].logo;

    const html = whitehat.replace(/{{target_url}}/g, targetUrl)
                        .replace(/{{brand_color}}/g, brandColor)
                        .replace(/{{brand_logo}}/g, brandLogo);
  
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }