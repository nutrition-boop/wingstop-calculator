import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadLocations, findLocationsByCity, todayHours, googleMapsUrl, isOpenNow, type Location as WingstopLocation } from '@/lib/locations';
import { MapPin, Clock, ChevronRight, Navigation, Phone, ShoppingBag, Search, ExternalLink } from 'lucide-react';
import ClientGeolocationButton from '@/components/ClientGeolocationButton';

interface Props { params: { state: string, city: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locs = loadLocations();
    const cityLocs = findLocationsByCity(locs, params.state, params.city);
    if (!cityLocs.length) return { title: 'Locations Not Found' };
    const cityName = cityLocs[0].city;
    const stateCode = cityLocs[0].state;
    const locationCount = cityLocs.length;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
    const canonicalPath = `/locations/${params.state.toLowerCase()}/${params.city.toLowerCase()}`;

    return {
        title: `Wingstop in ${cityName}, ${stateCode} | Locations List & Hours`,
        description: `Find the nearest Wingstop in ${cityName}, ${stateCode}. View store hours, phone numbers, and exact addresses for all ${locationCount} locations.`,
        alternates: {
            canonical: `${baseUrl}${canonicalPath}`,
        },
    };
}

// ISR: regenerate every 1 hour
export const revalidate = 3600;

// Pre-generate all state+city pages at build time
export async function generateStaticParams() {
  const locations = loadLocations();
  const params: { state: string; city: string }[] = [];
  const seen = new Set<string>();
  for (const loc of locations) {
    const stateSlug = loc.stateName.toLowerCase().replace(/\s+/g, '-');
    const key = `${stateSlug}/${loc.citySlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ state: stateSlug, city: loc.citySlug });
    }
  }
  return params;
}

export default async function CityLocationsPage({ params }: Props) {
    const allLocs = loadLocations();
    const cityLocs = findLocationsByCity(allLocs, params.state, params.city);
    if (!cityLocs.length) notFound();

    const stateName = cityLocs[0].stateName;
    const cityName = cityLocs[0].city;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Wingstop Locations in ${cityName}, ${stateName}`,
        description: `Experience the iconic flavors of Wingstop. Order carryout or delivery from any of our ${cityLocs.length} restaurants in ${cityName}, ${stateName}.`,
        url: `https://wingstopcaloriecalculator.us/locations/${params.state.toLowerCase()}/${params.city.toLowerCase()}`,
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://wingstopcaloriecalculator.us/locations' },
            { '@type': 'ListItem', position: 3, name: stateName, item: `https://wingstopcaloriecalculator.us/locations/${params.state.toLowerCase()}` },
            { '@type': 'ListItem', position: 4, name: cityName, item: `https://wingstopcaloriecalculator.us/locations/${params.state.toLowerCase()}/${params.city.toLowerCase()}` }
        ]
    };

    return (
        <main className="font-sans bg-[#F9FAF7] min-h-screen text-gray-900 pt-[104px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbSchema]) }} />
            {/* ── Breadcrumb ── */}
            <div className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium font-black uppercase tracking-widest text-[10px]">
                    <Link href="/" className="hover:text-[#006938] transition-colors">Home</Link>
                    <ChevronRight size={10} className="text-gray-300" />
                    <Link href="/locations" className="hover:text-[#006938] transition-colors">Locations</Link>
                    <ChevronRight size={10} className="text-gray-300" />
                    <Link href={`/locations/${params.state}`} className="hover:text-[#006938] transition-colors whitespace-nowrap">{stateName}</Link>
                    <ChevronRight size={10} className="text-gray-300" />
                    <span className="text-[#006938] font-black">{cityName}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                {/* ── Page Header ── */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#006938]/10 text-[#006938] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                         <MapPin size={12}/> {cityLocs.length} Locations Found
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                        Best Wings in <span className="text-[#006938]">{cityName}</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl font-medium leading-relaxed mb-8">
                        Experience the iconic flavors of Wingstop. Order carryout or delivery from any of our {cityLocs.length} restaurants in {cityName}, {stateName}.
                    </p>
                    <div className="max-w-xs">
                        <ClientGeolocationButton />
                    </div>
                </div>

                {/* ── Locations Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cityLocs.map((loc: WingstopLocation) => {
                        const open = isOpenNow(loc.hours);
                        const hrToday = todayHours(loc);
                        const hasStreet = loc.address && loc.address.length > 5;

                        return (
                            <div key={loc.slug} className="group flex flex-col bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-[#006938]/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#006938]/5 to-transparent rounded-bl-[80px] pointer-events-none" />
                                
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="space-y-3">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${open ? 'bg-green-50 text-[#006938]' : 'bg-red-50 text-[#c8102e]'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-[#006938] animate-pulse' : 'bg-[#c8102e]'}`} />
                                            {open ? 'Open Now' : 'Closed'}
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 line-clamp-2 leading-tight uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                                            {loc.name}
                                        </h2>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#006938] group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Navigation size={20} />
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10 flex-grow relative z-10">
                                    <div className="flex gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-[#006938]/5 group-hover:text-[#006938] transition-colors">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Location</div>
                                            <p className="text-gray-900 font-bold leading-snug">
                                                {hasStreet ? loc.address : 'Street address pending'}<br/>
                                                <span className="text-gray-400 font-medium">{loc.city}, {loc.state} {loc.zip}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-[#006938]/5 group-hover:text-[#006938] transition-colors">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hours Today</div>
                                            <p className="text-gray-900 font-bold">{hrToday ? `${hrToday.open} - ${hrToday.close}` : 'Closed'}</p>
                                        </div>
                                    </div>

                                    {loc.phoneDisplay && (
                                       <div className="flex gap-4 group/item">
                                          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-[#006938]/5 group-hover:text-[#006938] transition-colors">
                                              <Phone size={18} />
                                          </div>
                                          <div>
                                              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone</div>
                                              <p className="text-gray-900 font-bold">{loc.phoneDisplay}</p>
                                          </div>
                                       </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <Link 
                                        href={`/locations/${params.state}/${params.city}/${loc.slug}`}
                                        className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-[#006938] hover:text-[#006938] transition-all group/btn"
                                    >
                                        Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <a 
                                        href="/menu"
                                        className="inline-flex items-center justify-center gap-2 bg-[#006938] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00522B] transition-all shadow-lg shadow-green-900/10"
                                    >
                                        View Menu <ShoppingBag size={14} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
