import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { menuItems } from '@/lib/data/menu';
import {
  Flame, Drumstick, Sandwich, Hash, Package, Users, Users2,
  Zap, Palette, Calculator, CheckCircle2, ArrowRight, BookOpen,
  User, ShoppingBag, Star, TrendingUp, Clock, Globe, Search, Utensils,
  CupSoda, Cookie
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

// ─── Category Config ─────────────────────────────────────────────────────────

const categoryConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  'add-ons': { label: 'Add Ons', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
  deals: { label: 'Wingstop Deals', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  combos: { label: 'Wing Combos', icon: Package, color: 'text-primary', bg: 'bg-primary/5 border-primary/20' },
  'group-packs': { label: 'Wing Group Packs', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  'by-the-piece': { label: 'Wings By the Piece', icon: Hash, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
  tenders: { label: 'Chicken Tenders', icon: Flame, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
  sandwiches: { label: 'Chicken Sandwiches', icon: Sandwich, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  sides: { label: 'Sides', icon: Utensils, color: 'text-lime-600', bg: 'bg-lime-50 border-lime-100' },
  dips: { label: 'Dips & Flavors', icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
  drinks: { label: 'Drinks', icon: CupSoda, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  desserts: { label: 'Desserts', icon: Cookie, color: 'text-stone-600', bg: 'bg-stone-50 border-stone-100' },
};

const CATEGORY_ORDER = [
  'add-ons',
  'deals',
  'combos',
  'group-packs',
  'by-the-piece',
  'tenders',
  'sandwiches',
  'sides',
  'dips',
  'drinks',
  'desserts'
];

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Wingstop Menu Calories, Price & Nutrition Facts 2026',
  description: 'View the complete Wingstop menu with updated prices and nutrition facts for 2026. Official guide to wings, deals, combos, and sides with calorie counts.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Wingstop Menu Calories, Price & Nutrition Facts 2026',
    description: 'View the complete Wingstop menu with updated prices and nutrition facts for 2026. Official guide to wings, deals, combos, and sides with calorie counts.',
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CalorieBadge({ cal }: { cal: number }) {
  const level = cal < 150 ? 'green' : cal < 350 ? 'amber' : 'red';
  const cls = level === 'green'
    ? 'bg-green-100 text-green-800 border-green-200'
    : level === 'amber'
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-red-100 text-red-800 border-red-200';
  return (
    <span className={`shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${cls}`}>
      {cal} cal
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MenuPage() {
  const structured: Record<string, typeof menuItems> = {};
  for (const cat of CATEGORY_ORDER) {
    const items = menuItems.filter(i => i.category === cat);
    if (items.length) structured[cat] = items;
  }

  const displayedItems = Object.values(structured).flat();
  const totalItems = displayedItems.length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Wingstop Menu Items",
    "description": "Complete Wingstop menu with nutrition facts — calories, protein, carbs, and fat for every item.",
    "numberOfItems": totalItems,
    "itemListElement": displayedItems.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "MenuItem",
        "name": item.name,
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": `${item.calories} calories`,
          "proteinContent": `${item.protein}g`,
          "carbohydrateContent": `${item.carbs}g`,
          "fatContent": `${item.fat}g`,
        },
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Wingstop Menu With Prices: Full Guide to Wings, Combos, and Sides",
    "description": "Explore the Wingstop menu with prices, popular wing flavors, combo meals, sides, and drinks so you can choose the best order fast.",
    "author": { "@type": "Organization", "name": "Wingstop Calculator" }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Menu', item: 'https://wingstopcaloriecalculator.us/menu' }
    ]
  };

  return (
    <main className="min-h-screen bg-white font-outfit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, articleSchema, breadcrumbSchema]) }} />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-2 bg-secondary" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">2026 Nutrition Data</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none mb-4">
                Wingstop <span className="text-secondary">Menu</span>
              </h1>
              <p className="text-white/60 font-medium leading-relaxed max-w-xl text-base md:text-lg">
                Every item. Full calories, protein, carbs, and fat. Click any item for the complete nutrition breakdown.
              </p>
            </div>
            <div className="flex gap-6 shrink-0">
              <div className="text-center">
                <p className="text-4xl font-black text-secondary leading-none">{totalItems}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Items</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-4xl font-black text-secondary leading-none">{Object.keys(structured).length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY QUICK NAV ───────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 py-5 sticky top-[72px] z-40 shadow-sm overflow-x-auto">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-2 min-w-max mx-auto justify-start md:justify-center">
            {Object.entries(structured).map(([cat]) => {
              const cfg = categoryConfig[cat] ?? { label: cat, icon: Utensils, color: 'text-gray-600', bg: 'bg-gray-100 border-gray-200' };
              return (
                <a key={cat} href={`#cat-${cat}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md transition-all whitespace-nowrap">
                  <span><cfg.icon size={14} className={cfg.color} /></span> {cfg.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MENU CATEGORIES ──────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 space-y-24">
        {Object.entries(structured).map(([cat, items]) => {
          const cfg = categoryConfig[cat] ?? { label: cat, icon: Utensils, color: 'text-gray-600', bg: 'bg-gray-100 border-gray-200' };
          return (
            <section key={cat} id={`cat-${cat}`} className="scroll-mt-40">
              {/* Category Header */}
              <div className="flex items-center gap-5 mb-10">
                <div className={`w-16 h-16 rounded-[1.25rem] border-2 flex items-center justify-center text-3xl shrink-0 ${cfg.bg}`}>
                  <cfg.icon size={28} className={cfg.color} />
                </div>
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">{cfg.label}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-1">{items.length} items</p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map(item => (
                  <Link key={item.id} href={`/menu/${item.slug}`}
                    className="group relative bg-white rounded-[1.75rem] border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

                    {/* Image / Emoji Placeholder */}
                    <div className={`relative w-full h-40 flex items-center justify-center text-6xl ${cfg.bg} border-b border-gray-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 300px" />
                      ) : (
                        <cfg.icon size={48} className={cfg.color} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                          {item.name}
                        </p>
                        <CalorieBadge cal={item.calories} />
                      </div>

                      {item.description && (
                        <p className="text-[11px] text-gray-400 font-medium leading-tight mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Macro pills */}
                      <div className="flex gap-2 flex-wrap mt-auto">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black border border-blue-100">
                          {item.protein}g P
                        </span>
                        <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-[10px] font-black border border-orange-100">
                          {item.carbs}g C
                        </span>
                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-[10px] font-black border border-yellow-100">
                          {item.fat}g F
                        </span>
                        {item.glutenFree && (
                          <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black border border-green-100">
                            GF
                          </span>
                        )}
                      </div>

                      {/* View CTA */}
                      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/50 group-hover:text-primary transition-colors">
                          Full Nutrition →
                        </span>
                        <span className="text-[11px] font-black text-gray-400">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── INTRO SECTION ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Full Guide 2026</p>
              <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none mb-8">
                Complete Wingstop Menu with Prices & Nutrition (2026 Guide)
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed mb-5">
                If you are searching for the Wingstop menu, Wingstop menu with prices, or Wingstop menu prices, you are likely trying to answer one simple question: what should you order, and how much will it cost? That is why people also search terms like wing wingstop menu when they want a quick look at wings, combos, sides, dips, and drinks before placing an order.
              </p>
              <p className="text-gray-600 font-medium leading-relaxed">
                Wingstop has become one of the most popular places for flavored wings because the menu is easy to understand on the surface but offers plenty of choices once you look closer. This guide breaks down the Wingstop menu with prices in a simple way so readers can understand the categories, know what usually affects the final cost, and pick the right order without wasting time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Drumstick, label: 'Classic Wings', note: 'Bone-in, full flavor', color: 'bg-orange-50 border-orange-100 text-orange-600' },
                { Icon: Hash, label: 'Boneless Wings', note: 'Easy to eat & share', color: 'bg-rose-50 border-rose-100 text-rose-600' },
                { Icon: Flame, label: 'Crispy Tenders', note: 'Filling & familiar', color: 'bg-yellow-50 border-yellow-100 text-yellow-600' },
                { Icon: Sandwich, label: 'Chicken Sandwich', note: 'Quick complete meal', color: 'bg-amber-50 border-amber-100 text-amber-600' },
                { Icon: Package, label: 'Wing Combos', note: 'Best value bundles', color: 'bg-purple-50 border-purple-100 text-purple-600' },
                { Icon: Users, label: 'Group Packs', note: 'Ideal for parties', color: 'bg-blue-50 border-blue-100 text-blue-600' },
              ].map(({ Icon, label, note, color }, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/10 transition-all group">
                  <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-900 mb-1">{label}</p>
                  <p className="text-10px] font-medium text-gray-400">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SO POPULAR ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Why People Love It</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none">Why is the Wingstop Menu so Popular?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { n: '01', title: 'Bold Flavor Variety', body: 'Wingstop gives customers a mix of comfort food and bold flavors that work for solo meals, group orders, game nights, and quick takeout.' },
              { n: '02', title: 'Flexible for Everyone', body: 'Some want a small order with fries and a drink. Others want a large wing pack for sharing. The menu works for both.' },
              { n: '03', title: 'Easy to Customize', body: 'You can focus on flavor, portion size, or overall value. Classic, boneless, tenders, sandwiches — the choices adapt to your need.' },
              { n: '04', title: 'Great for Groups', body: 'Group packs, party meals, and multiple flavor options make Wingstop a strong choice for family dinners and game-day orders.' },
              { n: '05', title: 'Affordable Combos', body: 'Combo meals combine the main item, fries, and a drink in one simple package that makes price comparison fast and easy.' },
              { n: '06', title: 'Quick & Familiar', body: 'Ordering is fast because the menu structure is straightforward. Pick a category, choose size and flavor, add sides.' },
            ].map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-[1.75rem] p-7 border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all group">
                <span className="text-5xl font-black italic text-primary/10 group-hover:text-primary/20 transition-colors leading-none block mb-4">{c.n}</span>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-3">{c.title}</h3>
                <p className="text-xs font-medium text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary rounded-[2rem] p-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Who This Guide Is For</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'First-time customers who want to know what to expect',
                'Returning customers comparing combo value',
                'Families ordering group meals',
                'Students looking for filling food at a reasonable price',
                'Anyone deciding between wings, tenders, and sandwiches',
                'People checking add-ons and extras before checkout',
              ].map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0" />
                  <p className="text-white/70 text-sm font-medium leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO READ THE MENU ─────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Step by Step</p>
              <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none mb-10">How to Read the Wingstop Menu & Prices</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Start with the main item', body: 'Choose your category: Classic Wings, Boneless Wings, Crispy Tenders, Chicken Sandwich, Wing Combos, Party Packs, Sides, Dips, Drinks, or Desserts.' },
                  { step: 2, title: 'Choose the portion size', body: 'Portion size is the biggest reason Wingstop menu prices change. A smaller meal costs less, while larger packs cost more.' },
                  { step: 3, title: 'Add flavor options', body: 'Wingstop is known for flavor variety. The menu is not only about chicken — it is also about seasoning and sauce choices.' },
                  { step: 4, title: 'Decide if you want a combo', body: 'Combo meals usually include fries and a drink. They can make ordering easier and may feel like better value for many customers.' },
                  { step: 5, title: 'Add sides and dips', body: 'Extra ranch, blue cheese, large fries, veggie sticks, cheese sauce, and desserts can all increase the total quickly.' },
                ].map(s => (
                  <div key={s.step} className="flex gap-6 group">
                    <div className="shrink-0 w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-secondary group-hover:text-primary transition-all">{s.step}</div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">{s.title}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="text-xl font-black italic uppercase tracking-tight text-gray-900">What Affects Wingstop Menu Prices?</h3>
              {[
                { label: 'Portion Size', body: 'The biggest factor. A small order and a large party pack are naturally priced very differently.' },
                { label: 'Item Category', body: 'Classic wings, boneless wings, tenders, and sandwiches may all have different pricing structures.' },
                { label: 'Combo vs. Individual', body: 'A combo may feel like better value than ordering every item separately.' },
                { label: 'Add-ons', body: 'Extra ranch, dips, large fries, and drinks can raise the total quickly and unexpectedly.' },
                { label: 'Location', body: 'Pricing may vary depending on store location, local costs, and delivery platform fees.' },
                { label: 'Delivery vs. Pickup', body: 'A meal may cost more when ordered through delivery due to service fees and higher listed prices.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-900 mb-1">{item.label}</p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST VALUE ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Smart Ordering</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none">Best Value & Savings on the Wingstop Menu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { Icon: User, label: 'Solo Orders', body: 'Combo meals are often the easiest value choice. They include the main item, fries, and a drink in one order.', color: 'bg-primary/5 border-primary/20 text-primary' },
              { Icon: Users2, label: 'Sharing', body: 'Larger wing packs or family meals usually offer better value per piece than small individual orders.', color: 'bg-blue-50 border-blue-100 text-blue-600' },
              { Icon: Zap, label: 'Convenience', body: 'Boneless wing combos and sandwich meals are chosen by customers who want something simple and quick.', color: 'bg-yellow-50 border-yellow-100 text-yellow-600' },
              { Icon: Palette, label: 'Flavor Variety', body: 'Group packs allow more flavor choices, making them a better fit for parties where everyone wants something different.', color: 'bg-orange-50 border-orange-100 text-orange-600' },
            ].map(({ Icon, label, body, color }, i) => (
              <div key={i} className="bg-white rounded-[1.75rem] p-8 border border-gray-100 shadow-md text-center hover:shadow-xl hover:border-primary/10 hover:-translate-y-1 transition-all group">
                <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center mx-auto mb-6 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-3">{label}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* How to choose section */}
          <div className="bg-primary/5 rounded-[2rem] p-10 border border-primary/10">
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-8">How to Choose the Right Order</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { q: 'Ordering for one or a group?', a: 'This determines whether you should start with a combo or a larger pack.' },
                { q: 'Bone-in or boneless?', a: 'This is usually the first real split in the ordering process.' },
                { q: 'Focused on value or variety?', a: 'Some people want the lowest total. Others want more flavors, dips, and sides.' },
                { q: 'Full meal or just wings?', a: 'A combo makes more sense if you want a full meal. Wings-only if you just want the protein.' },
                { q: 'Adding extras?', a: 'If yes, expect the price to rise more than expected. Small extras add up fast.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">{item.q}</p>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">FAQs</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none">Common Questions: Wingstop Menu FAQ</h2>
          </div>
          <FAQAccordion items={[
            { question: 'What is included on the Wingstop menu?', answer: 'The Wingstop menu usually includes classic wings, boneless wings, crispy tenders, sandwiches, fries, dips, drinks, desserts, and combo meals. It is designed to work for both solo meals and group orders. Most customers start by choosing a chicken type, then a flavor, then sides.' },
            { question: 'Why do people search for the Wingstop menu with prices?', answer: 'Most people want to know how much their order will cost before checkout. They are usually comparing combo meals, wing counts, and add-ons like fries or ranch. Price is often the final factor that decides the order.' },
            { question: 'Are Wingstop menu prices the same everywhere?', answer: 'No, prices can vary by location. The final cost may change depending on the store, delivery platform, and any extra fees. That is why menu totals are not always identical from one order to another.' },
            { question: 'What is the difference between classic and boneless wings?', answer: 'Classic wings are traditional bone-in wings, while boneless wings are easier to eat and often chosen for convenience. Some customers prefer the texture of classic wings, while others like boneless for quick meals.' },
            { question: 'Are combo meals a better value?', answer: 'For many customers, yes. Combo meals usually include fries and a drink, which makes the meal feel more complete. They are often the easiest option for solo diners who want a simple order.' },
            { question: 'What makes the total price go up at Wingstop?', answer: 'The biggest factors are portion size, combo upgrades, extra dips, large fries, drinks, and desserts. Delivery fees can also raise the final cost. Many customers underestimate how much add-ons affect the total.' },
            { question: 'Is Wingstop good for group orders?', answer: 'Yes, Wingstop is a strong choice for groups because larger packs make sharing easier. Group meals often allow multiple flavors and larger side portions, making them popular for parties and game-day food.' },
            { question: 'What does "wing wingstop menu" usually mean?', answer: 'This search usually means the person wants the wing section of the menu quickly. They are often looking for classic wings, boneless wings, flavor choices, and prices. It is a keyword variation that still reflects clear buying intent.' },
          ]} />
        </div>
      </section>

      {/* ── FINAL THOUGHTS ───────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-gray-50 rounded-[2rem] p-10 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <BookOpen size={22} className="text-primary" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Final Thoughts</p>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              The Wingstop menu works well because it gives customers plenty of ways to build an order without making the choices too complicated. Whether someone is searching Wingstop menu with prices, Wingstop menu prices, or even wing wingstop menu, the real goal is the same: find the best order for the best value.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              The easiest way to understand the menu is to start with the main category, choose the portion size, decide if you want a combo, and then be careful with extras. That simple process makes ordering much faster and helps customers avoid surprise costs at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-[1.25rem] bg-white/10 border border-white/10 flex items-center justify-center mx-auto mb-8">
            <Calculator size={30} className="text-secondary" />
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tight text-white leading-none mb-6">
            Build Your Meal Pack
          </h2>
          <p className="text-white/60 font-medium leading-relaxed max-w-xl mx-auto mb-10">
            Use the Wingstop nutrition calculator to add multiple items, set quantities, and see your total calories and macros in real time.
          </p>
          <Link href="/#calculator"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-primary rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20">
            <Calculator size={16} /> Open Nutrition Calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
