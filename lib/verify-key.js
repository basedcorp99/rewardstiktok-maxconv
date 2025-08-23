export const anon_secret = "aixi34sgafa67eqrjd11dqldh46wi4kk";

export async function verifyKey(request, lpkey, secret) {
    console.log('verify key', lpkey, secret)
    const expires = 2; // in seconds
    
    
    if (!lpkey || lpkey.length < 25) {
        // Invalid or missing lp_key
        return false;
    }
    
    // Reconstruct hash
    const hash = lpkey.substring(0, 5) + lpkey.substring(10, 15) + lpkey.substring(20);
    
    // Reconstruct timestamp
    const timeStr = lpkey.substring(5, 10) + lpkey.substring(15, 20);
    const time = parseInt(timeStr, 10);
    
    // Get user agent from request headers
    const userAgent = request.headers.get('user-agent') || '';
    
    // Calculate expected hash using Cloudflare's crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(secret + time + userAgent);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calc = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Validate
    if (calc !== hash || (Math.floor(Date.now() / 1000) - time) > expires) {
        // Invalid hash or expired
        return false;
    }
    
    return true;
}