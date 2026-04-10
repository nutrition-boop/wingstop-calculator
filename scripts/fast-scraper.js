const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://locations.wingstop.com';
const STATES = [
    'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 
    'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 
    'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 
    'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 
    'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'
];

async function getHtml(url) {
    try {
        console.log(`Fetching: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            timeout: 15000
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        return null;
    }
}

async function scrape() {
    console.log('Starting Wingstop Scraper...');
    let allLocations = [];
    
    // Load existing data if available
    if (fs.existsSync('locations.json')) {
        try {
            allLocations = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
            console.log(`Loaded ${allLocations.length} existing locations.`);
        } catch (e) {
            console.log('Starting with empty locations list.');
        }
    }

    const processedSlugs = new Set(allLocations.map(loc => loc.slug));

    for (const stateCode of STATES) {
        const stateUrl = `${BASE_URL}/us/${stateCode}`;
        console.log(`\n--- Processing State: ${stateCode.toUpperCase()} ---`);
        const stateHtml = await getHtml(stateUrl);
        if (!stateHtml) continue;

        const $state = cheerio.load(stateHtml);
        const cityLinks = [];

        // Find city links
        $state('a').each((_, el) => {
            const href = $state(el).attr('href');
            if (href && href.startsWith(`/us/${stateCode}/`)) {
                const parts = href.split('/').filter(p => p);
                if (parts.length === 3) { // us, state, city
                    cityLinks.push(BASE_URL + href);
                }
            }
        });

        console.log(`Found ${cityLinks.length} cities in ${stateCode.toUpperCase()}`);

        for (const cityUrl of cityLinks) {
            const cityHtml = await getHtml(cityUrl);
            if (!cityHtml) continue;

            const $city = cheerio.load(cityHtml);
            
            // On city pages, look for individual store locations
            // Structure: <a class="Link" href="/tx/houston/wingstop-..." ...>
            $city('a').each((_, el) => {
                const href = $city(el).attr('href');
                if (!href) return;

                // Store links: /[state]/[city]/[slug] (length 3 when split by / and filtered)
                // Examples: /al/birmingham/wingstop-1936-birmingham-al-35206
                const parts = href.split('/').filter(p => p);
                if (parts.length === 3 && parts[0] === stateCode) {
                    const slug = parts[2];
                    if (processedSlugs.has(slug)) return;

                    const storeUrl = BASE_URL + href;
                    
                    // Attempt to extract info from the city list card
                    const card = $city(el).closest('li');
                    const name = $city(el).text().trim() || 'Wingstop';
                    const phone = card.find('a[href^="tel:"]').text().trim();
                    
                    // Extract address lines
                    const addressParts = [];
                    card.find('.Address-line').each((_, addrEl) => {
                        addressParts.push($city(addrEl).text().trim());
                    });
                    
                    const address = addressParts.join(', ');
                    const zipMatch = address.match(/\d{5}/);
                    const zip = zipMatch ? zipMatch[0] : '';

                    const storeData = {
                        name: name.includes('Wingstop') ? name : `Wingstop ${parts[1]}`,
                        state: stateCode.toUpperCase(),
                        city: parts[1].replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                        address: address || '',
                        zip: zip,
                        phone: phone || '',
                        slug: slug,
                        hours: {
                            monday: { open: "11:00 AM", close: "11:00 PM" },
                            tuesday: { open: "11:00 AM", close: "11:00 PM" },
                            wednesday: { open: "11:00 AM", close: "11:00 PM" },
                            thursday: { open: "11:00 AM", close: "11:00 PM" },
                            friday: { open: "11:00 AM", close: "12:00 AM" },
                            saturday: { open: "11:00 AM", close: "12:00 AM" },
                            sunday: { open: "11:00 AM", close: "11:00 PM" }
                        }
                    };

                    allLocations.push(storeData);
                    processedSlugs.add(slug);
                    console.log(`Added: ${storeData.name} - ${storeData.city}, ${storeData.state}`);
                }
            });

            // Intermediate save
            if (allLocations.length % 50 === 0) {
                fs.writeFileSync('locations.json', JSON.stringify(allLocations, null, 2));
                console.log(`> Progress saved: ${allLocations.length} locations total.`);
            }
        }
    }

    fs.writeFileSync('locations.json', JSON.stringify(allLocations, null, 2));
    console.log(`\nDONE! Successfully scraped ${allLocations.length} locations.`);
}

scrape();
