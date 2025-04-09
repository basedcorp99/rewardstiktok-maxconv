import appLander from '../../assets/applpv2.html'
import appConfig from '../../config/applpv2.json'

import { getPageData, injectHelpers, target } from './common';

export async function handleAppLPv2(params, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { user, mapping, subid } = getPageData(params, mappings);
  
  const targetUrl = target(mapping, subid);

  // Get brand configuration from appConfig
  const brandConfig = appConfig[mapping.appv2];
  
  // Add base path for assets
  const assetBasePath = '/public/assets';
  
  // Replace variables in the HTML template
  let html = injectHelpers(appLander, user, tt_pixel_name, fbpixel);
  
  // Replace all cash.* variables first
  html = html.replace(/{{cash\.([^}]+)}}/g, (match, key) => {
      return brandConfig[key] || '';
  });
  
  // Replace remaining variables
  html = html
      .replace(/{{target_url}}/g, targetUrl)
      .replace(/{{brand_name}}/g, brandConfig.name || '')
      .replace(/{{header_balance}}/g, brandConfig.header_plain ? '' : ' Balance')
      .replace(/{{app_logo}}/g, `${assetBasePath}/${brandConfig.app_logo}`)
      .replace(/{{alert_icon}}/g, brandConfig.alert_icon || '')
      .replace(/{{reward_amount}}/g, brandConfig.reward_amount || '');

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
} 
