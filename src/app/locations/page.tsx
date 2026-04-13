import type { Metadata } from 'next';
import Link from 'next/link';
import { loadLocations, groupByState } from '@/lib/locations';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';
import ClientStateList from './ClientStateList';

export const metadata: Metadata = {
  title: 'Wingstop Near Me | Find All Wingstop Locations In USA (2026)',
  description: 'Find all Wingstop locations across the United States. Browse by state and city to find the nearest Wingstop near you, along with store hours, menu, and contact details.',
  alternates: {
    canonical: 'https://wingstopcaloriecalculator.us/locations',
  },
  openGraph: {
    title: 'Wingstop Near Me | Find All Wingstop Locations In USA (2026)',
    description: 'Find all Wingstop locations across the United States. Browse by state and city to find the nearest Wingstop near you, along with store hours, menu, and contact details.',
  }
};

export const dynamic = 'force-dynamic';

export default function LocationsIndexPage() {
  const locations = loadLocations();
  const states = groupByState(locations);
  const totalLocations = locations.length;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wingstop Locations Across the USA',
    description: 'A comprehensive directory of Wingstop locations across the United States. Find Wingstop hours, menus, and contact info near you.',
    url: 'https://wingstopcaloriecalculator.us/locations',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://wingstopcaloriecalculator.us/locations' }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F9FAF7] font-sans pt-[104px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbSchema]) }} />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-28 overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938]">
        {/* Yellow gradient accent */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(253,185,19,0.18) 0%, transparent 70%)' }} />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #FDB913 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm">
            <MapPin size={12} className="text-[#FDB913]" /> Official Location Directory
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-tight tracking-tight mb-8 uppercase" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
            Find A <span className="text-[#FDB913]">Wingstop Near You</span>
          </h1>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 mx-auto">
            <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
              Find all Wingstop locations across the United States. Browse by state and city to find the nearest Wingstop near you, along with store hours, menu, and contact details.
            </p>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white sticky top-[104px] z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-black">
          <Link href="/" className="hover:text-[#006938] transition-colors">Home</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-[#006938]">Locations</span>
        </div>
      </div>

      {/* ── States grid ──────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        {states.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <Building2 size={48} className="mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl font-black mb-3 text-gray-900 uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>No Location Data Yet</h2>
            <p className="mb-6 text-gray-500 font-medium">Run the scraper to populate data.</p>
          </div>
        ) : (
          <ClientStateList states={states} />
        )}
      </section>
    </main>
  );
}
