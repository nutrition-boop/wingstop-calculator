import { loadLocations, groupByState } from '@/lib/locations';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
    const locations = loadLocations();
    const lastmod = new Date('2026-05-04T00:00:00Z');

    // Only include state-level directory pages in the sitemap.
    // Individual city and store pages are noindexed to avoid 
    // thin content / doorway page penalties from Google.
    const states = groupByState(locations);
    const stateRoutes = states.map((s) => ({
        url: `${baseUrl}/locations/${s.stateSlug}`,
        lastModified: lastmod,
        changeFrequency: 'monthly',
        priority: 0.4,
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${stateRoutes.map(route => `
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
