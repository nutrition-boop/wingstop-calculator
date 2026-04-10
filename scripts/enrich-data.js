const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

const CONCURRENCY = 15;
const SAVE_EVERY = 50;

function parsePhone(raw) {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
    if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
    return raw;
}

function format12(t) {
    if (!t || !t.includes(':')) return t;
    let [h, m] = t.split(':');
    h = parseInt(h);
    const ampm = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12 || 12;
    return `${h12}:${m} ${ampm}`;
}

function parseJSONLDHours(openingHours) {
    if (!openingHours || !Array.isArray(openingHours)) return {};
    const hours = {};
    const map = { 'Mo': 'monday', 'Tu': 'tuesday', 'We': 'wednesday', 'Th': 'thursday', 'Fr': 'friday', 'Sa': 'saturday', 'Su': 'sunday' };
    openingHours.forEach(oh => {
        // e.g. "Mo 10:30-01:00"
        const dayCode = oh.slice(0, 2);
        const timeRange = oh.slice(3);
        const timeParts = timeRange.split(/[-–—]/);
        if (timeParts.length === 2 && map[dayCode]) {
            hours[map[dayCode]] = { open: format12(timeParts[0]), close: format12(timeParts[1]) };
        }
    });
    return hours;
}

function parseDOMHours($, blockTitle) {
    const hours = {};
    const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    // Find heading that contains title
    let $title = null;
    $(':contains("' + blockTitle + '")').each((_, el) => {
        if ($(el).text().trim().toLowerCase().includes(blockTitle.toLowerCase())) $title = $(el);
    });

    if ($title) {
        const $table = $title.closest('[class*="HoursTable"]') || $title.parent();
        $table.find('[class*="HoursTable-row"]').each((_, row) => {
            const day = $(row).find('[class*="HoursTable-day"]').text().trim().toLowerCase();
            const time = $(row).find('[class*="HoursTable-intervals"], [class*="HoursTable-interval"]').text().trim();
            if (DAYS.includes(day)) {
                const match = time.match(/(\d+:\d+\s*[APM]+)\s*[-–—]\s*(\d+:\d+\s*[APM]+)/i);
                if (match) {
                    hours[day] = { 
                        open: match[1].toUpperCase().replace(/AMM$/, 'AM').replace(/PMM$/, 'PM').trim(),
                        close: match[2].toUpperCase().replace(/AMM$/, 'AM').replace(/PMM$/, 'PM').trim()
                    };
                }
            }
        });
    }
    return hours;
}

async function fetchFullData(url) {
    try {
        const r = await axios.get(url, { headers: HEADERS, timeout: 10000 });
        const html = r.data;
        const $ = cheerio.load(html);
        
        let streetAddress = '';
        let telephone = '';
        let jsonldHoursRaw = null;

        // Use regex for speed and reliability on these specific fields
        const addrMatch = html.match(/\"streetAddress\":\s*\"([^\"]+)\"/);
        if (addrMatch) streetAddress = addrMatch[1];
        const phoneMatch = html.match(/\"telephone\":\s*\"([^\"]+)\"/);
        if (phoneMatch) telephone = phoneMatch[1];
        const hoursMatch = html.match(/\"openingHours\":\s*(\[[^\]]+\])/);
        if (hoursMatch) {
            try { jsonldHoursRaw = JSON.parse(hoursMatch[1]); } catch(e) {}
        }

        const carryoutHours = parseDOMHours($, 'CARRYOUT HOURS');
        const deliveryHours = parseDOMHours($, 'DELIVERY HOURS');
        const fallbackHours = parseJSONLDHours(jsonldHoursRaw);

        return {
            address: streetAddress || '',
            phone: telephone.replace(/\D/g, ''),
            phoneDisplay: parsePhone(telephone),
            carryoutHours: Object.keys(carryoutHours).length > 0 ? carryoutHours : fallbackHours,
            deliveryHours: Object.keys(deliveryHours).length > 0 ? deliveryHours : fallbackHours
        };
    } catch (e) { return null; }
}

async function main() {
    const locations = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    // Always enrich if hours are missing
    const toEnrich = locations.filter(l => !l.carryoutHours || Object.keys(l.carryoutHours).length === 0);
    
    console.log(`Total: ${locations.length} | To Enrich: ${toEnrich.length}`);
    let done = 0;
    const start = Date.now();

    for (let i = 0; i < toEnrich.length; i += CONCURRENCY) {
        const batch = toEnrich.slice(i, i + CONCURRENCY);
        const results = await Promise.all(batch.map(item => fetchFullData(item.sourceUrl)));
        
        results.forEach((result, batchIdx) => {
            if (result) {
                const item = batch[batchIdx];
                const idx = locations.findIndex(l => l.slug === item.slug);
                if (idx !== -1) {
                    locations[idx].address = result.address || locations[idx].address;
                    locations[idx].phone = result.phone || locations[idx].phone;
                    locations[idx].phoneDisplay = result.phoneDisplay || locations[idx].phoneDisplay;
                    locations[idx].carryoutHours = result.carryoutHours;
                    locations[idx].deliveryHours = result.deliveryHours;
                    locations[idx].hours = result.carryoutHours || result.deliveryHours || {};
                }
            }
            done++;
        });

        const elapsed = Math.floor((Date.now() - start) / 1000);
        process.stdout.write(`\rProgress: ${done}/${toEnrich.length} | Elapsed: ${elapsed}s`);
        
        if (i % (SAVE_EVERY * CONCURRENCY) === 0 || done === toEnrich.length) {
            fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
        }
    }
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
    console.log('\nEnrichment complete.');
}

main().catch(console.error);
