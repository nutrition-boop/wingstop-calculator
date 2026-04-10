const axios = require('axios');
const fs = require('fs');

const STATE_NAMES = {
    'ak': 'Alaska', 'al': 'Alabama', 'ar': 'Arkansas', 'az': 'Arizona',
    'ca': 'California', 'co': 'Colorado', 'ct': 'Connecticut', 'dc': 'Washington DC',
    'de': 'Delaware', 'fl': 'Florida', 'ga': 'Georgia', 'hi': 'Hawaii',
    'ia': 'Iowa', 'id': 'Idaho', 'il': 'Illinois', 'in': 'Indiana',
    'ks': 'Kansas', 'ky': 'Kentucky', 'la': 'Louisiana', 'ma': 'Massachusetts',
    'md': 'Maryland', 'me': 'Maine', 'mi': 'Michigan', 'mn': 'Minnesota',
    'mo': 'Missouri', 'ms': 'Mississippi', 'mt': 'Montana', 'nc': 'North Carolina',
    'nd': 'North Dakota', 'ne': 'Nebraska', 'nh': 'New Hampshire', 'nj': 'New Jersey',
    'nm': 'New Mexico', 'nv': 'Nevada', 'ny': 'New York', 'oh': 'Ohio',
    'ok': 'Oklahoma', 'or': 'Oregon', 'pa': 'Pennsylvania', 'ri': 'Rhode Island',
    'sc': 'South Carolina', 'sd': 'South Dakota', 'tn': 'Tennessee', 'tx': 'Texas',
    'ut': 'Utah', 'va': 'Virginia', 'vt': 'Vermont', 'wa': 'Washington',
    'wi': 'Wisconsin', 'wv': 'West Virginia', 'wy': 'Wyoming'
};

function titleCase(str) {
    return str.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function parseLocationsFromSitemap(xml) {
    const locations = new Map();
    // Match location detail page URLs: /state/city/slug
    // Pattern: https://locations.wingstop.com/[2-letter-state]/[city]/[slug]
    const locRegex = /https:\/\/locations\.wingstop\.com\/([a-z]{2})\/([a-z0-9-]+)\/(wingstop-[\d]+-[a-z0-9-]+-[a-z]{2}-\d{5})/g;
    
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
        const [, stateCode, citySlug, slug] = match;
        
        // Only US states
        if (!STATE_NAMES[stateCode]) continue;
        
        // Skip if already found
        if (locations.has(slug)) continue;
        
        // Parse info from slug: wingstop-XXXX-city-state-zip
        const slugParts = slug.split('-');
        // slugParts: ['wingstop', 'XXXX', ...city parts..., 'state', 'zip']
        const zip = slugParts[slugParts.length - 1];
        const stateFromSlug = slugParts[slugParts.length - 2];
        
        const city = titleCase(citySlug);
        const state = stateCode.toUpperCase();
        const stateName = STATE_NAMES[stateCode] || state;
        
        locations.set(slug, {
            name: `Wingstop ${city}`,
            slug: slug,
            state: state,
            stateCode: state,
            stateName: stateName,
            city: city,
            citySlug: citySlug,
            address: '',
            zip: zip || '',
            phone: '',
            phoneDisplay: '',
            lat: null,
            lng: null,
            sourceUrl: `https://locations.wingstop.com/${stateCode}/${citySlug}/${slug}`,
            hours: {
                monday: { open: '11:00 AM', close: '11:00 PM' },
                tuesday: { open: '11:00 AM', close: '11:00 PM' },
                wednesday: { open: '11:00 AM', close: '11:00 PM' },
                thursday: { open: '11:00 AM', close: '11:00 PM' },
                friday: { open: '11:00 AM', close: '12:00 AM' },
                saturday: { open: '11:00 AM', close: '12:00 AM' },
                sunday: { open: '11:00 AM', close: '11:00 PM' }
            }
        });
    }
    
    return locations;
}

async function fetchSitemap(url) {
    console.log(`Fetching ${url}...`);
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Accept': 'text/html,application/xml,application/xhtml+xml,*/*',
        },
        timeout: 30000,
        responseType: 'text'
    });
    return response.data;
}

async function main() {
    console.log('Parsing Wingstop sitemaps to build locations database...\n');
    
    const allLocations = new Map();
    
    for (let i = 1; i <= 4; i++) {
        try {
            const xml = await fetchSitemap(`https://locations.wingstop.com/sitemap${i}.xml`);
            const locations = parseLocationsFromSitemap(xml);
            console.log(`  sitemap${i}.xml: Found ${locations.size} unique locations`);
            for (const [slug, loc] of locations) {
                if (!allLocations.has(slug)) {
                    allLocations.set(slug, loc);
                }
            }
        } catch (err) {
            console.error(`  Error fetching sitemap${i}.xml: ${err.message}`);
        }
    }
    
    const locationsArray = Array.from(allLocations.values());
    
    // Sort by state, then city
    locationsArray.sort((a, b) => {
        if (a.state !== b.state) return a.state.localeCompare(b.state);
        return a.city.localeCompare(b.city);
    });
    
    console.log(`\nTotal unique locations found: ${locationsArray.length}`);
    
    // Show breakdown by state
    const byState = {};
    for (const loc of locationsArray) {
        byState[loc.state] = (byState[loc.state] || 0) + 1;
    }
    console.log('\nBreakdown by state:');
    for (const [state, count] of Object.entries(byState).sort()) {
        console.log(`  ${state}: ${count}`);
    }
    
    fs.writeFileSync('locations.json', JSON.stringify(locationsArray, null, 2));
    console.log(`\nSaved ${locationsArray.length} locations to locations.json`);
}

main().catch(console.error);
