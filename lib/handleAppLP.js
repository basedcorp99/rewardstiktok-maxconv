import appLander from '../assets/app-lp.html'
import appConfig from '../config/applp.json'

export async function handleAppLP(catchall, mappings) {
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
  
  const targetUrl = mapping.url + (mapping.appendSubId == false ? "" : subid);

  // Get brand configuration from appConfig
  const brandConfig = appConfig[mapping.applander || 'cash'];
  
  // Add base path for assets
  const assetBasePath = '/public/assets';
  
  // Replace variables in the HTML template
  let html = appLander;
  
  // Replace all cash.* variables first
  html = html.replace(/{{cash\.([^}]+)}}/g, (match, key) => {
      return brandConfig[key] || '';
  });
  
  // Replace remaining variables
  html = html
      .replace(/{{target_url}}/g, targetUrl)
      .replace(/{{brand_color}}/g, brandConfig.color || '')
      .replace(/{{brand_name}}/g, brandConfig.name || '')
      .replace(/{{preloader_logo}}/g, `${assetBasePath}/${brandConfig.preloader_logo}`)
      .replace(/{{header_image}}/g, `${assetBasePath}/${brandConfig.header_image}`)
      .replace(/{{alert_icon}}/g, brandConfig.alert_icon || '')
      .replace(/{{reward_amount}}/g, brandConfig.reward_amount || '')
      .replace(/{{gradient_start_color}}/g, brandConfig.gradient_start_color || '')
      .replace(/{{gradient_end_color}}/g, brandConfig.gradient_end_color || '');

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}