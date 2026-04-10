const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const CONCURRENCY = 8; // simultaneous requests
const SAVE_EVERY = 50;  // save progress every N locations

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
};

function formatPhone(raw) {
    // raw like "(713) 266-9464" or "+17132669464"
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 11 && digits[0] === '1') {
        const p = digits.slice(1);
        return `(${p.slice(0,3)}) ${p.slice(3,6)}-${p.slice(6)}`;
    }
    if (digits.length === 10) {
        return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
    }
    return raw;
}

async function fetchPhone(url, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const resp = await axios.get(url, {
                headers: HEADERS,
                timeout: 10000,
            });
            const $ = cheerio.load(resp.data);
            
            // Method 1: tel: link
            let phone = '';
            $('a[href^="tel:"]').each((_, el) => {
                if (!phone) {
                    const href = $(el).attr('href') || '';
                    const text = $(el).text().trim();
                    phone = text || href.replace('tel:', '');
                }
            });
            
            // Method 2: JSON-LD schema
            if (!phone) {
                $('script[type="application/ld+json"]').each((_, el) => {
                    try {
                        const data = JSON.parse($(el).html() || '{}');
                        const p = data.telephone || data.phone;
                        if (p) phone = p;
                    } catch {}
                });
            }
            
            if (phone) return formatPhone(phone);
            return '';
        } catch (err) {
            if (attempt === retries) return '';
            await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
    }
    return '';
}

async function runBatch(items, onResult) {
    await Promise.all(items.map(async (item) => {
        const phone = await fetchPhone(item.sourceUrl);
        onResult(item, phone);
    }));
}

async function main() {
    const locations = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    
    // Find locations that need phone numbers
    const toEnrich = locations.filter(l => !l.phone || l.phone === '');
    const alreadyHave = locations.filter(l => l.phone && l.phone !== '').length;
    
    console.log(`Total locations: ${locations.length}`);
    console.log(`Already have phones: ${alreadyHave}`);
    console.log(`Need to fetch: ${toEnrich.length}`);
    console.log(`Using concurrency: ${CONCURRENCY}\n`);
    
    if (toEnrich.length === 0) {
        console.log('All phones already filled! Done.');
        return;
    }
    
    // Build a map for quick updates
    const locMap = new Map(locations.map((l, i) => [l.slug, i]));
    
    let done = 0;
    let found = 0;
    const start = Date.now();
    
    for (let i = 0; i < toEnrich.length; i += CONCURRENCY) {
        const batch = toEnrich.slice(i, i + CONCURRENCY);
        
        await runBatch(batch, (item, phone) => {
            const idx = locMap.get(item.slug);
            if (idx !== undefined) {
                locations[idx].phone = phone;
                locations[idx].phoneDisplay = phone;
            }
            done++;
            if (phone) found++;
            
            const pct = ((done / toEnrich.length) * 100).toFixed(1);
            const elapsed = ((Date.now() - start) / 1000).toFixed(0);
            const rate = done / ((Date.now() - start) / 1000);
            const remaining = Math.round((toEnrich.length - done) / rate);
            process.stdout.write(`\r[${pct}%] ${done}/${toEnrich.length} | Found: ${found} | ${elapsed}s elapsed | ~${remaining}s remaining   `);
        });
        
        // Save progress
        if (done % SAVE_EVERY === 0 || done === toEnrich.length) {
            fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
        }
    }
    
    console.log(`\n\nDone! Found phones for ${found}/${toEnrich.length} locations.`);
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
    console.log('Saved to locations.json');
}

main().catch(console.error);
