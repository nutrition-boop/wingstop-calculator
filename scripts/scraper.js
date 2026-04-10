/**
 * Wingstop Location Scraper — Full Version
 * Scrapes ALL states, cities, and location details from locations.wingstop.com
 * Run: node scraper.js
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://locations.wingstop.com';
const OUTPUT_FILE = path.join(__dirname, 'locations.json');
const DELAY_MS = 1200;

// ── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STATE_CODES = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA',
  kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO',
  montana: 'MT', nebraska: 'NE', nevada: 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND',
  ohio: 'OH', oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI',
  'south carolina': 'SC', 'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT',
  vermont: 'VT', virginia: 'VA', washington: 'WA', 'west virginia': 'WV',
  wisconsin: 'WI', wyoming: 'WY', 'district of columbia': 'DC',
};

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadExisting() {
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

function save(locations) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(locations, null, 2));
}

async function get(url) {
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    timeout: 15000,
  });
  return cheerio.load(res.data);
}

// ── Scrape helpers ────────────────────────────────────────────────────────────

async function scrapeStates() {
  console.log('  Scraping states list…');
  const $ = await get(`${BASE_URL}/us`);
  const states = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    // Handle both relative /us/tx and absolute https://.../us/tx
    const m = href.match(/us\/([a-z]{2,})$/);
    if (m) states.push({ slug: m[1], url: href.startsWith('http') ? href : `${BASE_URL}${href}` });
  });
  const uniqueStates = [...new Map(states.map((s) => [s.slug, s])).values()];
  console.log(`  ✓ Found ${uniqueStates.length} unique states.`);
  return uniqueStates;
}

async function scrapeCities(stateSlug) {
  console.log(`    Scraping cities in ${stateSlug}…`);
  const $ = await get(`${BASE_URL}/us/${stateSlug}`);
  const cities = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    // Match .../us/state/city-slug
    const m = href.match(/us\/[a-z]{2,}\/([\w-]+)$/);
    if (m) cities.push({ slug: m[1], url: href.startsWith('http') ? href : `${BASE_URL}${href}` });
  });
  const uniqueCities = [...new Map(cities.map((c) => [c.slug, c])).values()];
  console.log(`    ✓ Found ${uniqueCities.length} unique cities.`);
  return uniqueCities;
}

async function scrapeLocationLinks(stateSlug, citySlug) {
  console.log(`      Scraping location links in ${citySlug}…`);
  const $ = await get(`${BASE_URL}/us/${stateSlug}/${citySlug}`);
  const links = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    // Detail pages look like /tx/houston/wingstop-128-houston-tx-77065
    const m = href.match(/\/([a-z]{2})\/[\w-]+\/(wingstop[\w-]+)$/);
    if (m) links.push({ slug: m[2], stateCode: m[1].toUpperCase(), url: href.startsWith('http') ? href : `${BASE_URL}${href}` });
  });
  const uniqueLinks = [...new Map(links.map((l) => [l.slug, l])).values()];
  console.log(`      ✓ Found ${uniqueLinks.length} unique locations.`);
  return uniqueLinks;
}

function parseHours($) {
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const hours = {};

  // Try structured schema.org markup first
  $('[itemprop="openingHours"]').each((_, el) => {
    const text = $(el).attr('content') || $(el).text();
    // e.g. "Mo-Su 10:30-01:00" or "Monday 10:30 AM - 1:00 AM"
    DAYS.forEach((day) => {
      const short = day.slice(0, 2);
      const re = new RegExp(`${short}[a-z]* ([\\d:APM ]+)[-–]([\\d:APM ]+)`, 'i');
      const m = text.match(re);
      if (m && !hours[day]) {
        hours[day] = { open: m[1].trim(), close: m[2].trim() };
      }
    });
  });

  // Fallback: scan text nodes for patterns like "Sunday10:30 AM - 1:00 AM"
  if (Object.keys(hours).length < 7) {
    const bodyText = $('body').text();
    DAYS.forEach((day) => {
      if (hours[day]) return;
      const re = new RegExp(day + '\\s*([\\d]+:[\\d]{2}\\s*[APM]+)\\s*[-–]\\s*([\\d]+:[\\d]{2}\\s*[APM]+)', 'i');
      const m = bodyText.match(re);
      if (m) hours[day] = { open: m[1].trim(), close: m[2].trim() };
    });
  }

  return hours;
}

function parseLatLng($) {
  let lat = null, lng = null;
  // Try mapbox URL pattern: static/pin-l+(LNG,LAT)
  $('img[src], script').each((_, el) => {
    const src = $(el).attr('src') || $(el).html() || '';
    const m = src.match(/pin-[ls]-[^+]*\+\(([+-]?\d+\.\d+),([+-]?\d+\.\d+)\)/);
    if (m) { lng = parseFloat(m[1]); lat = parseFloat(m[2]); }
  });
  // Try JSON-LD geo
  if (!lat) {
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse($(el).html());
        const geo = data.geo || (data['@graph'] || []).find((g) => g.geo)?.geo;
        if (geo) { lat = parseFloat(geo.latitude); lng = parseFloat(geo.longitude); }
      } catch {}
    });
  }
  return { lat, lng };
}

async function scrapeLocationDetail(link, stateSlug, citySlug, stateName) {
  const $ = await get(link.url);

  const name =
    $('h1').first().text().trim() ||
    $('h2').first().text().trim() ||
    `Wingstop ${toTitleCase(citySlug)}`;

  const address =
    $('[itemprop="streetAddress"]').text().trim() ||
    $('.c-address-street-1').text().trim() ||
    '';

  const zip =
    $('[itemprop="postalCode"]').text().trim() ||
    (link.slug.match(/(\d{5})$/) || [])[1] ||
    '';

  const phoneHref = $('a[href^="tel:"]').first().attr('href') || '';
  const phone = phoneHref.replace('tel:', '');
  const phoneDisplay = phone
    ? phone.replace(/(\+1)?(\d{3})(\d{3})(\d{4})/, '($2) $3-$4')
    : '';

  const hours = parseHours($);
  const { lat, lng } = parseLatLng($);

  const cityName = toTitleCase(citySlug.replace(/-/g, ' '));
  const stateCode = link.stateCode || STATE_CODES[stateName.toLowerCase()] || stateSlug.toUpperCase();

  return {
    slug: link.slug,
    name,
    state: stateCode,
    stateName,
    city: cityName,
    citySlug,
    address,
    phone,
    phoneDisplay,
    zip,
    lat,
    lng,
    hours,
    sourceUrl: link.url,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const existing = loadExisting();
  const scrapedSlugs = new Set(existing.map((l) => l.slug));
  const locations = [...existing];

  console.log(`✅ Loaded ${locations.length} existing locations. Resuming…\n`);

  const states = await scrapeStates();
  console.log(`📍 Found ${states.length} states\n`);

  for (const state of states) {
    const stateName = toTitleCase(state.slug.replace(/-/g, ' '));
    console.log(`\n🗺  ${stateName} (${state.slug})`);
    await sleep(DELAY_MS);

    let cities;
    try { cities = await scrapeCities(state.slug); }
    catch (e) { console.log(`  ⚠  Failed to get cities: ${e.message}`); continue; }

    console.log(`   ${cities.length} cities`);

    for (const city of cities) {
      const cityName = toTitleCase(city.slug.replace(/-/g, ' '));
      console.log(`   🏙  ${cityName}`);
      await sleep(DELAY_MS);

      let links;
      try { links = await scrapeLocationLinks(state.slug, city.slug); }
      catch (e) { console.log(`     ⚠  Failed: ${e.message}`); continue; }

      for (const link of links) {
        if (scrapedSlugs.has(link.slug)) {
          console.log(`     ⏩ Skip ${link.slug}`);
          continue;
        }
        await sleep(DELAY_MS);
        try {
          const loc = await scrapeLocationDetail(link, state.slug, city.slug, stateName);
          locations.push(loc);
          scrapedSlugs.add(link.slug);
          save(locations);
          console.log(`     ✓ ${loc.name} — ${loc.address}`);
        } catch (e) {
          console.log(`     ✗ ${link.slug}: ${e.message}`);
        }
      }
    }
  }

  console.log(`\n🎉 Done! Total locations: ${locations.length}`);
}

main().catch(console.error);
