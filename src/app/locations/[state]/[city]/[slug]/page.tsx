import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadLocations, findLocationBySlug, findLocationsByCity, isOpenNow, todayHours, googleMapsUrl, type Location as WingstopLocation } from '@/lib/locations';
import { getGooglePlaceDetails } from '@/lib/googlePlaces';
import { MapPin, Phone, Clock, ChevronRight, Navigation, ExternalLink, CalendarDays, CheckCircle2, ShoppingBag, Star, User, Bike, CreditCard, Info } from 'lucide-react';
import StoreCountdown from '@/components/StoreCountdown';
import PopularTimes from '@/components/PopularTimes';
import NearestLocationBanner from '@/components/NearestLocationBanner';
import StorePhotos from '@/components/StorePhotos';
import FAQAccordion from '@/components/FAQAccordion';
import WriteReview from '@/components/WriteReview';
import ReviewsSection from '@/components/ReviewsSection';

interface Props { params: { state: string; city: string; slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allLocs = loadLocations();
  const loc = findLocationBySlug(allLocs, params.state, params.city, params.slug);
  if (!loc) return {};
  
  const streetAddress = loc.address ? loc.address.split(',')[0] : '';
  const cityName = loc.city;
  const stateCode = loc.state;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us';
  const canonicalPath = `/locations/${params.state}/${params.city}/${params.slug}`;

  return {
    title: `Wingstop on ${streetAddress} in ${cityName}, ${stateCode} | Store Info`,
    description: `Wingstop location at ${loc.address} in ${cityName}, ${stateCode}. View store hours, menu, phone number, and easily get directions to this ${cityName} restaurant.`,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
  };
}

// ISR: regenerate every 1 hour
export const revalidate = 3600;

// Allow pages not in generateStaticParams to render on-demand
export const dynamicParams = true;

// Pre-generate top 200 store pages at build time (rest generated on-demand via ISR)
export async function generateStaticParams() {
  const locations = loadLocations();
  return locations.slice(0, 200).map(loc => ({
    state: loc.stateName.toLowerCase().replace(/\s+/g, '-'),
    city: loc.citySlug,
    slug: loc.slug,
  }));
}

export default async function LocationDetailPage({ params }: Props) {
  const allLocs = loadLocations();
  const loc = findLocationBySlug(allLocs, params.state, params.city, params.slug);
  if (!loc) notFound();

  const otherLocations = findLocationsByCity(allLocs, params.state, params.city).filter(l => l.slug !== params.slug);

  const open = isOpenNow(loc.hours);
  const todayHr = todayHours(loc);
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Fetch real Google Places rating and reviews (Now powered by MongoDB for instant loading)
  const placeDetails = await getGooglePlaceDetails('Wingstop', loc.stateName, loc.city, loc.address, loc.slug);

  const streetName = loc.address ? loc.address.split(',')[0] : loc.city;

  const dynamicFAQs = [
    {
      q: `Does the Wingstop on ${streetName} in ${loc.city} have dine-in seating?`,
      a: `The Wingstop location at ${loc.address} generally offers carryout and delivery. Many locations have limited dine-in seating, but it's best to verify directly with the store at ${loc.phone}.`
    },
    {
      q: `What time does the ${streetName} Wingstop close tonight?`,
      a: `Today ${todayHr ? `Wingstop on ${streetName} closes at ${todayHr.close}.` : `this location is currently reported as closed.`} Check the full hours above for the week.`
    },
    {
      q: `Can you get Wingstop delivery from the ${streetName} location?`,
      a: `Yes, this Wingstop location typically partners with major delivery apps like DoorDash, UberEats, and GrubHub for delivery to the ${loc.city} area.`
    },
    {
      q: `What are the most popular wing flavors to order at Wingstop ${loc.city}?`,
      a: `While favorites vary, Wingstop is famous for its Lemon Pepper, Mango Habanero, and classic Mild or Hot choices. Use our nutrition calculator to see the stats for all sauces!`
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dynamicFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: loc.name,
    image: placeDetails?.photoUrls?.[0] || 'https://www.wingstop.com/assets/images/favicon.ico',
    '@id': loc.sourceUrl || `https://wingstopcaloriecalculator.us/locations/${params.state}/${params.city}/${loc.slug}`,
    url: loc.sourceUrl || `https://wingstopcaloriecalculator.us/locations/${params.state}/${params.city}/${loc.slug}`,
    telephone: loc.phone,
    priceRange: "$$",
    menu: "https://wingstopcaloriecalculator.us/menu",
    acceptsReservations: "False",
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lng
    },
    aggregateRating: placeDetails?.rating ? {
      '@type': 'AggregateRating',
      ratingValue: placeDetails.rating,
      reviewCount: placeDetails.user_ratings_total
    } : undefined
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://wingstopcaloriecalculator.us/locations' },
      { '@type': 'ListItem', position: 3, name: loc.stateName, item: `https://wingstopcaloriecalculator.us/locations/${params.state}` },
      { '@type': 'ListItem', position: 4, name: loc.city, item: `https://wingstopcaloriecalculator.us/locations/${params.state}/${params.city}` },
      { '@type': 'ListItem', position: 5, name: loc.name }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqSchema, breadcrumbSchema]) }} />
    <main className="font-sans bg-[#F9FAF7] min-h-screen text-gray-900 pt-[104px]">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#006938] transition-colors font-bold uppercase tracking-widest text-[10px]">Home</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link href="/locations" className="hover:text-[#006938] transition-colors font-bold uppercase tracking-widest text-[10px]">Locations</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link href={`/locations/${params.state}`} className="hover:text-[#006938] transition-colors font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">{loc.stateName}</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <Link href={`/locations/${params.state}/${params.city}`} className="hover:text-[#006938] transition-colors font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">{loc.city}</Link>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-[#006938] font-black uppercase tracking-widest text-[10px] line-clamp-1">{loc.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ── Store Details Hero ── */}
          <div className="lg:col-span-2 order-1">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#006938]/10 to-transparent rounded-bl-[120px] pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-[#006938]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10 relative z-10">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>{loc.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${open ? 'bg-[#006938] text-white' : 'bg-red-50 text-[#c8102e] border border-red-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-white animate-pulse' : 'bg-[#c8102e]'}`} />
                      {open ? 'Open Now' : 'Closed'}
                    </span>
                    {placeDetails && placeDetails.rating > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black bg-white border border-gray-100 shadow-sm text-gray-700">
                         <Star size={14} className="fill-[#FDB913] text-[#FDB913]" />
                         <span>{placeDetails.rating.toFixed(1)}</span>
                         <span className="text-gray-400 font-bold">({placeDetails.user_ratings_total.toLocaleString()})</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col gap-3 shrink-0">
                  <Link href="/menu" className="inline-flex items-center justify-center gap-2 bg-[#006938] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-900/20 hover:bg-[#00522B] hover:-translate-y-0.5 transition-all">
                    <ShoppingBag size={18} /> View Menu
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Address block */}
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#006938]/10 text-[#006938] flex items-center justify-center shrink-0 group-hover:bg-[#006938] group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">Location</h3>
                    <p className="text-gray-900 leading-relaxed font-black text-2xl mb-3">
                      {loc.address || 'Street address pending'}<br />
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{loc.city}, {loc.state} {loc.zip}</span>
                    </p>
                    <a href={googleMapsUrl(loc)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#006938] font-black uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-4">
                      Get Directions <Navigation size={12} />
                    </a>
                  </div>
                </div>

                {/* Contact block */}
                <div className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-[#006938] group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">Connect</h3>
                    {loc.phoneDisplay ? (
                      <a href={`tel:${loc.phone}`} className="text-gray-900 font-black text-2xl hover:text-[#006938] transition-colors block mb-3">
                        {loc.phoneDisplay}
                      </a>
                    ) : (
                      <span className="text-gray-500 italic block mb-3">No phone available</span>
                    )}
                    {loc.sourceUrl && (
                       <a href={loc.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-black uppercase tracking-widest text-[10px] transition-colors">
                         Store Website <ExternalLink size={12} />
                       </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 text-sm text-gray-600 font-medium leading-relaxed">
                <p>{generateAboutParagraph(loc)}</p>
              </div>

              {/* Mobile Buttons */}
              <div className="mt-10 flex flex-col gap-3 sm:hidden pt-10 border-t border-gray-50">
                <Link href="/menu" className="w-full inline-flex items-center justify-center gap-2 bg-[#006938] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-900/20">
                  <ShoppingBag size={18} /> View Menu
                </Link>
              </div>
            </div>
          </div>

          {/* Features & Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2 order-2">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#006938]" /> Store Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Online Ordering', 'In-Store Pickup', 'Curbside', 'Dine-In'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#006938]" /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                  <Bike size={14} className="text-[#006938]" /> Delivery Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Wingstop.com', 'DoorDash', 'UberEats', 'GrubHub'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FDB913]" /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm md:col-span-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                  <CreditCard size={14} className="text-[#006938]" /> Payment Accepted
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Visa', 'Mastercard', 'Amex', 'Discover', 'Apple Pay', 'Google Pay'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Popular Times */}
            <div className="lg:col-span-2 order-5">
              <PopularTimes />
            </div>

            {/* Store Photos */}
            <StorePhotos 
               photos={placeDetails?.photoUrls || []} 
               city={loc.city} 
               state={loc.stateName} 
               address={loc.address || ''} 
            />


            {/* Reviews + Write Review */}
            <ReviewsSection
              googleReviews={placeDetails?.reviews || []}
              userReviews={(placeDetails as any)?.userReviews || []}
              storeName={loc.name}
              storeSlug={loc.slug}
            />


            {/* FAQs */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm lg:col-span-2 order-8">
               <h2 className="text-3xl font-black text-dark mb-10 flex items-center space-x-4 uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                 <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                   <Info size={24} strokeWidth={2.5} />
                 </div>
                 <span>Common Questions About {loc.city} Wingstop</span>
               </h2>
               <FAQAccordion items={dynamicFAQs.map(f => ({ question: f.q, answer: f.a }))} />
            </div>

          {/* ── Right Column: Hours & Map ── */}
          <div className="space-y-6 lg:col-span-1 lg:row-span-4 order-3 lg:col-start-3 lg:row-start-1">
            <div className="bg-[#003D20] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden ring-4 ring-white border border-green-800">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px] pointer-events-none" />
               <div className="absolute -left-10 bottom-0 w-24 h-24 bg-[#FDB913]/10 rounded-full blur-2xl pointer-events-none" />
              
               <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-[#FDB913] text-[#003D20] flex items-center justify-center shrink-0">
                    <Clock size={20} />
                 </div>
                 <h2 className="text-xl font-black uppercase tracking-widest" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>Store Hours</h2>
               </div>
               
               <div className="space-y-6 relative z-10">
                  <div className="-mt-2 mb-6">
                    <StoreCountdown todayHours={todayHr} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FDB913] mb-4 flex items-center gap-2">
                       <ShoppingBag size={12} /> Carryout Hours
                    </h4>
                    <ul className="space-y-3">
                      {DAYS.map((day) => {
                        const hr = loc.carryoutHours?.[day] || loc.hours[day];
                        const isToday = todayDayName() === day;
                        return (
                          <li key={day} className={`flex justify-between items-center text-[11px] font-black uppercase tracking-widest ${isToday ? 'text-white' : 'text-white/40'}`}>
                            <span>{day.slice(0,3)}</span>
                            <span className={isToday ? 'text-[#FDB913]' : ''}>{hr ? `${hr.open} - ${hr.close}` : 'Closed'}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {loc.deliveryHours && Object.keys(loc.deliveryHours).length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FDB913] mb-4 flex items-center gap-2">
                         <Bike size={12} /> Delivery Hours
                      </h4>
                      <ul className="space-y-3">
                        {DAYS.map((day) => {
                          const hr = loc.deliveryHours?.[day];
                          const isToday = todayDayName() === day;
                          return (
                            <li key={day} className={`flex justify-between items-center text-[11px] font-black uppercase tracking-widest ${isToday ? 'text-white' : 'text-white/40'}`}>
                              <span>{day.slice(0,3)}</span>
                              <span className={isToday ? 'text-[#FDB913]' : ''}>{hr ? `${hr.open} - ${hr.close}` : 'Closed'}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
               </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden h-[400px] relative group ring-4 ring-white">
              <iframe
                src={`https://maps.google.com/maps?q=${loc.address ? encodeURIComponent(`${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`) : `${loc.lat},${loc.lng}`}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none border-8 border-transparent group-hover:border-[#006938]/5 transition-colors duration-500 rounded-[2rem]" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Other Locations in Same City ── */}
      {otherLocations.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-16 mt-6">
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden text-center lg:text-left">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#006938]/10 to-transparent rounded-bl-[120px] pointer-events-none" />
             <h2 className="text-3xl font-black text-dark mb-8 uppercase tracking-tight relative z-10" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                Other Wingstop Locations in {loc.city}
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 text-left">
               {otherLocations.map(otherLoc => {
                 const otherOpen = isOpenNow(otherLoc.hours);
                 return (
                   <Link key={otherLoc.slug} href={`/locations/${params.state}/${params.city}/${otherLoc.slug}`} className="group bg-[#F9FAF7] rounded-3xl p-6 border border-gray-100 hover:border-[#006938]/30 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                     <div className="flex flex-col h-full">
                       <div className="flex justify-between items-start mb-4">
                         <div className="w-10 h-10 rounded-xl bg-white text-[#006938] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#006938] group-hover:text-white transition-colors">
                           <MapPin size={20} />
                         </div>
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${otherOpen ? 'bg-green-100 text-[#006938]' : 'bg-gray-200 text-gray-500'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${otherOpen ? 'bg-[#006938] animate-pulse' : 'bg-gray-400'}`} />
                           {otherOpen ? 'Open' : 'Closed'}
                         </span>
                       </div>
                       <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-[#006938] transition-colors line-clamp-1">{otherLoc.name}</h3>
                       <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 flex-1 line-clamp-2">{otherLoc.address}</p>
                       <div className="uppercase tracking-widest text-[9px] font-black text-[#006938] flex items-center gap-2 mt-auto pt-4 border-t border-gray-200 group-hover:border-[#006938]/20 transition-colors">
                         View Details <ChevronRight size={12} />
                       </div>
                     </div>
                   </Link>
                 );
               })}
             </div>
          </div>
        </div>
      )}

      <NearestLocationBanner />
    </main>
    </>
  );
}

function todayDayName(): string {
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return DAYS[new Date().getDay()];
}

function generateAboutParagraph(loc: WingstopLocation): string {
  // Deterministic seed based on location slug
  let seed = 0;
  for (let i = 0; i < loc.slug.length; i++) {
    seed += loc.slug.charCodeAt(i);
  }
  
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  const pick = <T,>(arr: T[]): T => arr[Math.floor(random() * arr.length)];
  
  const streetOnly = loc.address ? loc.address.split(',')[0] : 'the area';
  
  const keywords1 = [
    `Wingstop in ${loc.city}`,
    `${loc.city} Wingstop location`,
    `Wingstop near ${loc.city}`
  ];
  
  const keywords2 = [
    `this location at ${loc.address}`,
    `this branch on ${streetOnly}`,
    `this restaurant at ${loc.address}`
  ];

  const lines1 = [
    `Planning to visit ${pick(keywords1)}? ${pick(keywords2)} is a convenient spot for both dine-in and quick takeout, offering popular services like online ordering, delivery, and sometimes curbside pickup.`,
    `If you're searching for ${pick(keywords1)}, ${pick(keywords2)} is a popular choice for locals looking for bold wing flavors and fast service. Customers can choose from dine-in, pickup, or delivery options, making it flexible for any plan.`,
    `The ${pick(keywords1)}, located at ${loc.address}, offers a full range of services including in-store dining, online ordering, and delivery through major apps like DoorDash and UberEats.`,
    `Looking to order from ${pick(keywords1)}? ${pick(keywords2)} is known for its convenient ordering options, including carryout, delivery, and dine-in services.`,
    `Located at ${loc.address}, the ${pick(keywords1)} serves as a popular destination for wing lovers in the area.`
  ];

  const lines2 = [
    `Before you order, you can use our fan-made nutrition calculator to check calories, macros, and allergen details for your favorite wings and sides.`,
    `With tools like our calorie calculator, you can also explore macro information before placing your order to stay on track.`,
    `To help you make better food choices, our platform provides a detailed nutrition calculator where you can check calories, protein, and other dietary information before ordering.`,
    `To enhance your experience, you can use our nutrition calculator to plan your meal in advance by checking calories and macros.`,
    `You can also use our nutrition calculator to explore menu details, helping you choose meals that match your dietary needs while enjoying the signature Wingstop flavors.`
  ];

  const lines3 = [
    `Whether you're grabbing a quick meal or ordering for a group, it makes it easy to enjoy your food while staying on track with your dietary goals.`,
    `Whether it’s a quick lunch, late-night craving, or game-day meal, this Wingstop branch offers a reliable and convenient experience.`,
    `This makes it easier for health-conscious users to enjoy Wingstop while managing their nutrition goals.`,
    `It’s a simple way to enjoy your favorite wings while making informed choices.`,
    `Many customers stop by for quick meals or group orders, especially during busy hours in the evening.`
  ];

  const optionalLines = [
    `Customers often visit during peak evening hours, especially when deals are active.`,
    `With multiple ordering options easily accessible, it fits perfectly into any schedule.`,
    ``, // empty string will be ignored
    ``
  ];

  const p1 = pick(lines1);
  const p2 = pick(lines2);
  const p3 = pick(lines3);
  const opt = pick(optionalLines);
  
  const sentences = [p1];
  if (opt) sentences.push(opt);
  sentences.push(p2);
  sentences.push(p3);
  
  return sentences.join(' ');
}

