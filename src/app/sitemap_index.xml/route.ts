export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
    // Use a fixed date that only changes on redeploy (build time)
    const lastmod = new Date('2026-05-04T00:00:00Z').toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap_general.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap_locations.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
    });
}
