import { loadLocations, groupByState, groupByCity } from '@/lib/locations';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
    const locations = loadLocations();
    // Use a fixed date that only changes on redeploy
    const lastmod = new Date('2026-05-04T00:00:00Z');

    // 1. State Pages
    const states = groupByState(locations);
    const stateRoutes = states.map((s) => ({
        url: `${baseUrl}/locations/${s.stateSlug}`,
        lastModified: lastmod,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // 2. City Pages
    const allCityRoutes: any[] = [];
    states.forEach(state => {
        const stateLocs = locations.filter(l => (l.stateCode || l.state) === state.stateCode);
        const cities = groupByCity(stateLocs);
        cities.forEach(city => {
            allCityRoutes.push({
                url: `${baseUrl}/locations/${state.stateSlug}/${city.citySlug}`,
                lastModified: lastmod,
                changeFrequency: 'monthly',
                priority: 0.5,
            });
        });
    });

    // 3. Store Pages
    const storeRoutes = locations.map((loc) => {
        const stateSlug = loc.stateName.toLowerCase().replace(/\s+/g, '-');
        return {
            url: `${baseUrl}/locations/${stateSlug}/${loc.citySlug}/${loc.slug}`,
            lastModified: lastmod,
            changeFrequency: 'monthly',
            priority: 0.4,
        };
    });

    const allRoutes = [...stateRoutes, ...allCityRoutes, ...storeRoutes];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
    });
}
