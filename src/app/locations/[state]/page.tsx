import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadLocations, findLocationsByState, groupByCity, googleMapsUrl } from '@/lib/locations';
import { MapPin, ChevronRight, Building2, ArrowRight } from 'lucide-react';
import ClientGeolocationButton from '@/components/ClientGeolocationButton';

interface Props { params: { state: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allLocs = loadLocations();
  const locs = findLocationsByState(allLocs, params.state);
  const stateName = locs[0]?.stateName ?? params.state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const stateCode = locs[0]?.state ?? '';
  const locationCount = locs.length;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
  const canonicalPath = `/locations/${params.state.toLowerCase()}`;

  return {
    title: `Wingstop Locations in ${stateName} | Find a Store Near You`,
    description: `Looking for the nearest Wingstop in ${stateName}? Browse our complete directory of ${locationCount} Wingstop restaurants in ${stateCode} to find the closest location.`,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
  };
}

export const dynamic = 'force-dynamic';

export default function StatePage({ params }: Props) {
  const allLocs = loadLocations();
  const locs = findLocationsByState(allLocs, params.state);
  
  if (allLocs.length > 0 && locs.length === 0) notFound();

  const stateName = locs[0]?.stateName ?? params.state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const stateCode = locs[0]?.state ?? '';
  const cities = groupByCity(locs);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Wingstop Locations in ${stateName}`,
    description: `Find addresses, hours, directions, and phone numbers for ${locs.length} Wingstop locations across ${cities.length} cities in ${stateName}.`,
    url: `https://wingstopcaloriecalculator.us/locations/${params.state.toLowerCase()}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://wingstopcaloriecalculator.us/locations' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://wingstopcaloriecalculator.us/locations/${params.state.toLowerCase()}` }
    ]
  };

  return (
    <main className="font-sans bg-[#F9FAF7] min-h-screen text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbSchema]) }} />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(253,185,19,0.18) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #FDB913 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm">
            <MapPin size={12} className="text-[#FDB913]" /> {stateCode || 'Locations'}
          </span>

          <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tight mb-6" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
            Wingstop in <span className="text-[#FDB913]">{stateName}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Find addresses, hours, directions, and phone numbers for {locs.length} Wingstop {locs.length === 1 ? 'location' : 'locations'} across {cities.length} {cities.length === 1 ? 'city' : 'cities'} in {stateName}.
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#006938] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/locations" className="hover:text-[#006938] transition-colors">Locations</Link>
          <ChevronRight size={12} />
          <span className="text-[#006938]">{stateName}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* ── Cities List ─────────────────────────────────────── */}
        <div className="flex-1">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400 border-b border-gray-200 pb-3">Cities in {stateName}</h2>
          {cities.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Building2 size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">No cities found for {stateName}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cities.map(city => (
                <Link
                  key={city.citySlug}
                  href={`/locations/${params.state}/${city.citySlug}`}
                  className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#006938]/30 transition-all duration-200"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#006938] transition-colors mb-0.5">{city.cityName}</h3>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                      {city.locationCount} {city.locationCount === 1 ? 'Location' : 'Locations'}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#006938] transition-colors group-hover:translate-x-1 duration-300" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Spotlight / Sidebar ─────────────────────────────── */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#006938] mb-4">Wingstop Highlights</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Skip the line! Order your favorite classic wings, boneless wings, or chicken sandwiches online for pickup or delivery.
            </p>
            <div className="space-y-3">
              <ClientGeolocationButton className="py-3 !rounded-xl" errorClassName="mt-2 text-xs" />
              <a href="/menu" className="w-full inline-flex items-center justify-center gap-2 bg-[#006938] hover:bg-[#00522B] text-white py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg">
                View Full Menu
              </a>
              <a href="/#calculator" className="w-full inline-flex items-center justify-center gap-2 bg-[#FDB913] hover:bg-[#E5A500] text-gray-900 py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg">
                Nutrition Guide
              </a>
            </div>
            
            {locs.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Featured locations</p>
                <div className="space-y-4">
                  {locs.slice(0, 3).map(loc => (
                    <Link key={loc.slug} href={`/locations/${params.state}/${loc.citySlug}/${loc.slug}`} className="group block">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-[#006938] mb-1 line-clamp-1">{loc.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{loc.address}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

      </div>
    </main>
  );
}
