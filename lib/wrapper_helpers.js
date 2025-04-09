export function mapGeoToCountry(request) {
    const cfCountry = request.cf?.country?.toLowerCase();
    const countryMap = {
      us: 'us',
      gb: 'uk', // UK is represented as 'GB' in ISO country codes
      au: 'au',
      ca: 'ca',
    };
  
    if (!countryMap[cfCountry]) {
      throw new Error(`No geo found "${cfCountry}"`)
    }
    return countryMap[cfCountry];
}