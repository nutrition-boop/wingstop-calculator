import { menuItems } from '@/lib/data/menu';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
    // Use a fixed date that only changes on redeploy
    const lastmod = new Date('2026-05-04T00:00:00Z');

    // 1. Core pages
    const coreRoutes = [
        '',
        '/menu',
        '/allergen-menu',
        '/wingstop-gluten-free',
        '/hours',
        '/holiday-hours',
        '/locations',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms',
        '/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: lastmod,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Menu Item Pages
    const menuRoutes = menuItems.map((item) => ({
        url: `${baseUrl}/menu/${item.slug}`,
        lastModified: lastmod,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 3. Category Pages
    const categories = [
        'deals', 'combos', 'group-packs', 'by-the-piece', 
        'tenders', 'sandwiches', 'sides', 'dips', 'drinks', 'desserts'
    ];
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/menu/${cat}`,
        lastModified: lastmod,
        changeFrequency: 'weekly',
        priority: 0.85,
    }));

    const allRoutes = [...coreRoutes, ...menuRoutes, ...categoryRoutes];

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
