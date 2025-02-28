import dcLander from '../../assets/dc-lp.html'
import dcConfig from '../../config/dclp.json'
import CryptoJS from 'crypto-js'
import { getPageData, injectHelpers, target } from './common';

const SECRET_KEY = "HEYHEY";

export async function handleDCLP(catchall, mappings, pixels) {
  const tt_pixel_name = pixels.tt;
  const fbpixel = pixels.fb;

  const { user, mapping, subid } = getPageData(catchall, mappings);
  
  const targetUrl = target(mapping, subid);

  // Get brand configuration from dcConfig
  const brandConfig = dcConfig[mapping.dclp || 'amazon750'];
  
  // Replace variables in the HTML template
  let html = injectHelpers(dcLander, user, tt_pixel_name, fbpixel);
  
  // Replace all variables
  html = html
      .replace(/{{target_url}}/g, CryptoJS.AES.encrypt(targetUrl, SECRET_KEY).toString())
      .replace(/{{flag}}/g, brandConfig.flag)
      .replace(/{{offer_name}}/g, brandConfig.offer_name)
      .replace(/{{offer_value}}/g, brandConfig.offer_value)
      .replace(/{{gift_card_image}}/g, brandConfig.gift_card_image);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
} 