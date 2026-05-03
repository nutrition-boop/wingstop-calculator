import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ChevronRight, Sparkles, Rocket, MapPin, Camera, Star, 
  ShieldCheck, Zap, Layout, Search, Globe, ArrowRight, 
  Calendar, Tag, CheckCircle2
} from 'lucide-react';

// ── SEO Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What's New | Wingstop Nutrition Calculator Updates & Changelog",
  description: 'See the latest updates, improvements, and new features added to the Wingstop Nutrition Calculator. We continuously improve our calorie tracker and store locator for the best experience.',
  alternates: { canonical: 'https://wingstopcaloriecalculator.us/whats-new' },
  openGraph: {
    title: "What's New — Wingstop Nutrition Calculator Changelog",
    description: 'Track all the latest features, bug fixes, and improvements to the Wingstop calorie calculator and store finder.',
    type: 'website',
    url: 'https://wingstopcaloriecalculator.us/whats-new',
  },
};

// ── Changelog Data ─────────────────────────────────────────────────────────────

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'major' | 'minor' | 'patch';
  highlights: {
    icon: any;
    title: string;
    description: string;
  }[];
  tags: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: '2.0',
    date: 'May 4, 2026',
    title: 'Fresh New Look & Real Store Photos',
    description: 'We gave the entire site a major makeover! You can now see real photos of your local Wingstop, read actual customer reviews, and enjoy a much cleaner, faster browsing experience across all 1,500+ store pages.',
    type: 'major',
    highlights: [
      {
        icon: Layout,
        title: 'Brand New Design',
        description: 'The whole site has been redesigned from scratch with a cleaner, more modern look. Everything loads faster, looks better on your phone, and is easier to navigate — whether you\'re checking calories or finding a store.'
      },
      {
        icon: Camera,
        title: 'Real Store Photos',
        description: 'Every Wingstop location page now shows actual photos of the store — inside and outside views so you know exactly what to expect before you visit. No more guessing what your local Wingstop looks like!'
      },
      {
        icon: Star,
        title: 'Customer Reviews on Every Store',
        description: 'Wondering if a Wingstop location is any good? Each store page now shows real customer reviews so you can see what other wing fans are saying before you order.'
      },
      {
        icon: Search,
        title: 'Smarter Store Pages',
        description: 'Each store page now has its own unique FAQs answered — like "What time does the Wingstop on Main St close tonight?" or "Can I get delivery from this location?" — tailored to the exact address.'
      },
      {
        icon: ShieldCheck,
        title: 'Allergen & Gluten-Free Guides',
        description: 'We\'ve improved our allergen menu and gluten-free pages so you can quickly identify safe options. Perfect if you have dietary restrictions and want to order with confidence.'
      },
      {
        icon: Zap,
        title: 'Faster Page Loading',
        description: 'The entire site now loads significantly faster. Store pages, menu pages, and the nutrition calculator all open almost instantly — even on slower connections.'
      },
    ],
    tags: ['New Design', 'Store Photos', 'Reviews', 'Speed'],
  },
  {
    version: '1.0',
    date: 'April 5, 2026',
    title: 'We Launched! 🎉',
    description: 'The Wingstop Nutrition Calculator went live! We built a free tool to help you check the calories, protein, fat, carbs, and more for every single item on the Wingstop menu — plus a directory of every Wingstop location in the United States.',
    type: 'major',
    highlights: [
      {
        icon: Rocket,
        title: 'Complete Nutrition Info for Every Item',
        description: 'From Classic Wings to Chicken Sandwiches, Boneless Wings to Sides and Desserts — we added full calorie and nutrition breakdowns for the entire Wingstop menu. Just pick your item and see the facts instantly.'
      },
      {
        icon: MapPin,
        title: 'Find Any Wingstop Near You',
        description: 'Need to find the closest Wingstop? Browse over 1,500 locations across the US with addresses, phone numbers, store hours, delivery hours, and a map — all on one page.'
      },
      {
        icon: Globe,
        title: 'Dedicated Menu Category Pages',
        description: 'We created individual pages for every menu category — Wings, Tenders, Sandwiches, Sides, Dips, Drinks, and Desserts — so you can browse nutrition info the way you browse the menu.'
      },
      {
        icon: Sparkles,
        title: 'Build-Your-Meal Calculator',
        description: 'Our interactive calculator lets you add multiple items to build your full meal and see the combined calories, protein, fat, and carbs in real time. Perfect for meal planning or staying on track with your diet goals.'
      },
    ],
    tags: ['Launch', 'Nutrition', 'Store Finder', 'Calculator'],
  },
];

// ── Helper Components ──────────────────────────────────────────────────────────

function VersionBadge({ version, type }: { version: string; type: string }) {
  const colors = {
    major: 'bg-[#006938] text-white',
    minor: 'bg-[#FDB913] text-gray-900',
    patch: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${colors[type as keyof typeof colors]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      v{version}
    </span>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

export default function WhatsNewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "What's New — Wingstop Nutrition Calculator",
    description: 'Changelog and update history for the Wingstop Nutrition Calculator.',
    url: 'https://wingstopcaloriecalculator.us/whats-new',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CHANGELOG.map((entry, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `v${entry.version} — ${entry.title}`,
        description: entry.description,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: "What's New" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbSchema]) }} />
      <main className="font-sans bg-[#F9FAF7] min-h-screen text-gray-900">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938]">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(253,185,19,0.18) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #FDB913 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm">
              <Sparkles size={12} className="text-[#FDB913]" /> Changelog
            </span>

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tight mb-6" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
              What's <span className="text-[#FDB913]">New</span>
            </h1>
            <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
              Every improvement, feature, and fix we ship to make the Wingstop Nutrition Calculator better. We're constantly evolving to give you the most accurate and beautiful nutrition experience.
            </p>
          </div>
        </section>

        {/* ── Breadcrumb ────────────────────────────────────────── */}
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#006938] transition-colors font-bold uppercase tracking-widest text-[10px]">Home</Link>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-[#006938] font-bold uppercase tracking-widest text-[10px]">What's New</span>
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Total Updates', value: CHANGELOG.length.toString(), icon: Sparkles },
              { label: 'Latest Version', value: `v${CHANGELOG[0].version}`, icon: Tag },
              { label: 'Last Updated', value: CHANGELOG[0].date.split(',')[0].replace(/\s\d+/, '').trim() + ' ' + CHANGELOG[0].date.split(',')[1]?.trim(), icon: Calendar },
              { label: 'Features Shipped', value: CHANGELOG.reduce((acc, e) => acc + e.highlights.length, 0).toString(), icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center group hover:shadow-md hover:border-[#006938]/20 transition-all">
                <stat.icon size={18} className="mx-auto mb-2 text-gray-300 group-hover:text-[#006938] transition-colors" />
                <p className="text-2xl font-black text-gray-900 mb-0.5">{stat.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Timeline Entries */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#006938] via-[#006938]/30 to-transparent hidden sm:block" />

            <div className="space-y-16">
              {CHANGELOG.map((entry, index) => (
                <article key={entry.version} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 hidden sm:flex">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${index === 0 ? 'bg-[#006938] text-white ring-4 ring-[#006938]/20' : 'bg-white text-[#006938] border-2 border-[#006938]/30'}`}>
                      {index === 0 ? <Sparkles size={18} /> : <Rocket size={18} />}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="sm:ml-16">
                    <div className={`bg-white rounded-[2rem] border shadow-sm overflow-hidden ${index === 0 ? 'border-[#006938]/20 shadow-xl shadow-green-900/5 ring-1 ring-[#006938]/10' : 'border-gray-100'}`}>
                      
                      {/* Header */}
                      <div className={`px-8 sm:px-12 pt-10 pb-8 ${index === 0 ? 'bg-gradient-to-br from-[#006938]/[0.03] to-transparent' : ''}`}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <VersionBadge version={entry.version} type={entry.type} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                            <Calendar size={10} /> {entry.date}
                          </span>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#FDB913]/20 text-[#A67600] border border-[#FDB913]/30">
                              Latest
                            </span>
                          )}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                          {entry.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl font-medium">
                          {entry.description}
                        </p>
                      </div>

                      {/* Highlights Grid */}
                      <div className="px-8 sm:px-12 pb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {entry.highlights.map((highlight, hi) => (
                            <div key={hi} className="group p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:bg-white hover:border-[#006938]/20 hover:shadow-md transition-all duration-300">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white text-[#006938] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#006938] group-hover:text-white transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                                  <highlight.icon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-1.5 group-hover:text-[#006938] transition-colors">
                                    {highlight.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                    {highlight.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mr-2">Tags:</span>
                          {entry.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-gray-50 text-[9px] font-bold uppercase tracking-widest text-gray-500 border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#006938]/10 to-transparent rounded-bl-[120px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-[#FDB913]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                Built for <span className="text-[#006938]">Wing Lovers</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium max-w-lg mx-auto mb-8 leading-relaxed">
                We're always working to improve this tool. Have a suggestion or found a bug? Reach out and help us make it even better.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/" className="inline-flex items-center gap-2 bg-[#006938] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-900/20 hover:bg-[#00522B] hover:-translate-y-0.5 transition-all">
                  Try the Calculator <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-gray-200 hover:border-[#006938]/30 hover:text-[#006938] hover:-translate-y-0.5 transition-all">
                  Share Feedback <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
