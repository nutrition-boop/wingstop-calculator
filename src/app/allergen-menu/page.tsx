'use client';

import { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, XCircle, Shield, Info,
  Tag, Filter, ChevronDown, ChevronUp, ArrowRight,
  Wheat, Milk, Fish, Leaf, BookOpen, Star
} from 'lucide-react';

import { 
  ALLERGEN_KEYS, 
  AllergenKey, 
  ALLERGEN_CATALOGUE, 
  AllergenItem, 
  AllergenCategory as Category 
} from '@/lib/data/allergens';

// ─── Allergen Meta ───────────────────────────────────────────────────────────

const allergenMeta: Record<AllergenKey, { label: string; emoji: string; pill: string }> = {
  wheat:          { label: 'Wheat',          emoji: '🌾', pill: 'bg-amber-100 text-amber-800 border-amber-200' },
  dairy:          { label: 'Dairy',          emoji: '🥛', pill: 'bg-blue-100 text-blue-800 border-blue-200' },
  egg:            { label: 'Egg',            emoji: '🥚', pill: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  soy:            { label: 'Soy',            emoji: '🫘', pill: 'bg-green-100 text-green-800 border-green-200' },
  fish_shellfish: { label: 'Fish/Shellfish', emoji: '🐟', pill: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  mustard:        { label: 'Mustard',        emoji: '🟡', pill: 'bg-orange-100 text-orange-800 border-orange-200' },
  celery:         { label: 'Celery',         emoji: '🥬', pill: 'bg-lime-100 text-lime-800 border-lime-200' },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = ALLERGEN_CATALOGUE;

const notes = [
  'All fried foods are cooked in the same oil — filtered to minimise wheat cross-contamination, but not claimed gluten-free.',
  'All fried foods are cooked in oil containing soy. Per FDA, highly refined soy oil is not considered allergenic.',
  'Our foods do not contain tree nuts or peanuts, but supplier facilities may handle them.',
  'LTO = Limited Time Offer (availability may vary by location)',
];

const faqs = [
  { q: 'Does Wingstop have an allergen menu?', a: 'Yes, Wingstop provides allergen information to help customers review ingredients linked to common food allergies. This menu helps you compare wings, flavors, dips, sides, and other items before ordering. It is especially useful when you want to avoid guessing.' },
  { q: 'Why do people search for the Wingstop allergen menu?', a: 'Most people search for it because they want to know what is safer to eat before placing an order. They are often checking wheat, dairy, egg, soy, or other allergen concerns. It is a practical search made right before ordering.' },
  { q: 'Are classic wings easier to review than boneless wings?', a: 'In many cases, yes. Classic wings are often seen as a simpler starting point than boneless wings because breaded products usually carry more built-in allergen concerns. Even so, the flavor and preparation method still matter.' },
  { q: 'Do sauces and dry rubs change allergen risk?', a: 'Yes, absolutely. A plain wing and a flavored wing can have very different allergen profiles. That is why checking the exact flavor is just as important as checking the main item.' },
  { q: 'Are dips important on the Wingstop allergen menu?', a: 'Yes, dips are one of the most important parts of the menu to review. Ranch, blue cheese, honey mustard, and cheese sauce can add allergens that were not present in the main item. Many customers overlook this step.' },
  { q: 'Why does shared fryer risk matter?', a: 'Shared fryer risk matters because food cooked in the same oil can come into contact with allergens from other items. Even if an item looks simple by ingredients, preparation can still affect whether it works for you. This is one of the biggest concerns for sensitive diners.' },
  { q: 'Is the Wingstop allergen menu enough by itself?', a: 'It is a strong starting point, but it is not the only thing that matters. Cross-contact, store handling, and preparation methods still need to be considered. For severe allergies, menu info alone may not be enough.' },
  { q: 'What is the best way to order using the Wingstop allergen menu?', a: 'Start with the base item, then check the flavor, then review dips and sides. After that, think about fryer and prep concerns before finalizing the order. Keeping the meal simple usually makes the decision easier.' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryTable({ category, filteredAllergen }: { category: Category; filteredAllergen: AllergenKey | 'all' }) {
  const items = filteredAllergen === 'all' ? category.items : category.items.filter(i => i.allergens[filteredAllergen]);
  if (items.length === 0) return (
    <div id={category.id} className="scroll-mt-56 py-10 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">No items in this category contain {allergenMeta[filteredAllergen as AllergenKey]?.label}</p>
    </div>
  );

  return (
    <div id={category.id} className="scroll-mt-56">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-gray-900">{category.name}</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {filteredAllergen !== 'all' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">{allergenMeta[filteredAllergen].label} present</span>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/30 overflow-hidden">
        <div className="grid bg-primary text-white px-8 py-5" style={{ gridTemplateColumns: '1fr repeat(7, 76px)' }}>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Item</div>
          {ALLERGEN_KEYS.map(k => (
            <div key={k} className="text-center text-[10px] font-black uppercase tracking-widest opacity-60 leading-tight">
              {allergenMeta[k].emoji}<br />{allergenMeta[k].label}
            </div>
          ))}
        </div>
        {items.map((item, i) => {
          const clean = ALLERGEN_KEYS.every(k => !item.allergens[k]);
          return (
            <div key={i}
              className={`grid px-8 py-4 border-b border-gray-50 last:border-0 hover:bg-primary/[0.02] transition-colors items-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
              style={{ gridTemplateColumns: '1fr repeat(7, 76px)' }}>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                {item.lto && <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-[9px] font-black uppercase border border-secondary/20"><Tag size={8} /> LTO</span>}
                {clean && <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase border border-green-200">CLEAR</span>}
              </div>
              {ALLERGEN_KEYS.map(k => (
                <div key={k} className="flex justify-center">
                  {item.allergens[k]
                    ? <div className="w-7 h-7 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center"><XCircle size={14} className="text-red-500" /></div>
                    : <div className="w-7 h-7 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"><CheckCircle2 size={14} className="text-green-500" /></div>}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {items.map((item, i) => {
          const present = ALLERGEN_KEYS.filter(k => item.allergens[k]);
          const clear   = ALLERGEN_KEYS.filter(k => !item.allergens[k]);
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-sm text-gray-900 uppercase">{item.name}</span>
                <div className="flex gap-1.5">
                  {item.lto && <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full text-[9px] font-black uppercase border border-secondary/20">LTO</span>}
                  {present.length === 0 && <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase border border-green-200">CLEAR</span>}
                </div>
              </div>
              {present.length > 0 && (
                <div className="mb-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-2">Contains:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {present.map(k => <span key={k} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${allergenMeta[k].pill}`}>{allergenMeta[k].emoji} {allergenMeta[k].label}</span>)}
                  </div>
                </div>
              )}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-green-500 mb-2">Free from:</p>
                <div className="flex flex-wrap gap-1.5">
                  {clear.map(k => <span key={k} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">{allergenMeta[k].emoji} {allergenMeta[k].label}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-800 group-hover:text-primary transition-colors pr-6">{q}</span>
        {open ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-gray-300 shrink-0" />}
      </button>
      {open && <div className="pb-6 text-sm text-gray-500 font-medium leading-relaxed">{a}</div>}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AllergenMenuPage() {
  const [filteredAllergen, setFilteredAllergen] = useState<AllergenKey | 'all'>('all');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-white font-outfit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Wingstop Allergen Menu 2026",
          "description": "Check the Wingstop allergen menu, shared fryer risks, and safer menu choices before ordering wings, fries, dips, or tenders.",
          "author": { "@type": "Organization", "name": "Wingstop" }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }
      ])}} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-2 bg-secondary" />
        <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/10 mb-8">
            <Shield size={14} className="text-secondary" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Official Reference · 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none mb-6">
            Wingstop <span className="text-secondary">Allergen</span> Menu 2026
          </h1>
          <p className="text-white/60 font-medium leading-relaxed max-w-2xl mx-auto text-base md:text-lg mb-12">
            If you are searching for the Wingstop allergen menu, you are probably trying to figure out one thing fast: what is actually safer to order. This guide breaks down how the allergen menu works, which items need the most attention, and what shared fryer warnings actually mean.
          </p>
          {/* Quick nav pills in hero */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => scrollTo(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-widest text-white transition-all hover:scale-105">
                <ArrowRight size={12} className="text-secondary" /> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER ────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 py-5 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-[1100px] mx-auto px-4">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-gray-400 mb-3 text-center">Filter all tables by allergen</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ALLERGEN_KEYS.map(k => {
              const a = allergenMeta[k]; const active = filteredAllergen === k;
              return (
                <button key={k} onClick={() => setFilteredAllergen(active ? 'all' : k)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${active ? 'bg-primary text-white border-primary shadow-lg scale-105' : `${a.pill} hover:scale-105`}`}>
                  {a.emoji} {a.label} {active && <XCircle size={11} />}
                </button>
              );
            })}
            {filteredAllergen !== 'all' && (
              <button onClick={() => setFilteredAllergen('all')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 transition-all">
                <Filter size={11} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── QUICK NAV + TABLES ───────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Quick nav buttons */}
          <div className="mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-5 text-center">Jump to category</p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => scrollTo(cat.id)}
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-[11px] font-black uppercase tracking-widest text-gray-700 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all">
                  <ArrowRight size={13} /> {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* All categories stacked */}
          <div className="space-y-20">
            {categories.map(cat => (
              <CategoryTable key={cat.id} category={cat} filteredAllergen={filteredAllergen} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGEND ──────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center"><XCircle size={16} className="text-red-500" /></div>
            Allergen Present
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <div className="w-8 h-8 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"><CheckCircle2 size={16} className="text-green-500" /></div>
            Not Present / Free
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black border border-secondary/20">LTO</span>
            Limited Time Offer
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE NEED IT ───────────────────────────── */}
      <section className="py-16 bg-[#F9FAF7] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Why People Need the Wingstop Allergen Menu
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { n: '01', title: 'Flavors Change Everything', body: 'One wing flavor may be simple, while another contains multiple allergens. People often assume all flavors are similar, but they are not.' },
              { n: '02', title: 'Boneless ≠ Classic', body: 'Classic wings, boneless wings, tenders, and sandwiches can have very different allergen risks. They are not the same.' },
              { n: '03', title: 'Dips Are Easy to Overlook', body: 'Someone may carefully check the wings and then add ranch or cheese fries without realizing those items carry additional allergens.' },
              { n: '04', title: 'Cross-Contact Risk', body: 'Even if one item looks safe by ingredient list, shared fryers and shared prep spaces can still matter.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <span className="text-3xl font-black italic text-[#006938]/10 leading-none block mb-2">{c.n}</span>
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">{c.title}</h3>
                <p className="text-sm text-[#555] leading-6">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO READ ──────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              How to Read the Wingstop Allergen Menu
            </h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Start with the base item', body: 'Classic wings, boneless, tenders, sandwich, fries, veggie sticks, or desserts. This is your starting point.' },
                { step: 2, title: 'Check the exact flavor', body: 'After the base, review the flavor or seasoning. Some flavors add wheat, soy, dairy, or celery.' },
                { step: 3, title: 'Check dips and extras', body: 'Dips, sauces, loaded fries, and desserts can add allergens even when the main item looks manageable.' },
                { step: 4, title: 'Review preparation concerns', body: 'This includes fryer oil, shared equipment, and possible cross-contact during prep.' },
              ].map(s => (
                <div key={s.step} className="flex gap-5 bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#006938] text-white flex items-center justify-center font-black text-base">{s.step}</div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">{s.title}</h4>
                    <p className="text-sm text-[#555] leading-6">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Fryer Risk */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-amber-500 shrink-0" />
              <h3 className="font-bold text-amber-900">Shared Fryer Risk: The Biggest Thing People Miss</h3>
            </div>
            <p className="text-[#666] text-sm leading-7 mb-4">
              Shared fryer risk matters because foods cooked in the same oil can come into contact with allergen-containing items. For many customers with severe allergies, this is a bigger issue than the flavor itself.
            </p>
            <ul className="space-y-2">
              {['A plain item may still cook near breaded items', 'Fryer oil may be shared across multiple products', 'Cross-contact can happen even with simple ingredients', 'Staff may not always guarantee separation'].map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-amber-800">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── COMMON ALLERGEN CONCERNS ─────────────────────── */}
      <section className="py-16 bg-[#F9FAF7] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Common Allergen Concerns at Wingstop
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: '🌾', title: 'Wheat', body: 'Wheat is often a major concern with boneless wings, tenders, sandwiches, and some flavored items. Breaded products need the most attention.' },
              { emoji: '🥛', title: 'Dairy', body: 'Dairy concerns often show up in creamy flavors, cheese-based items, dips, loaded fries, and desserts.' },
              { emoji: '🥚', title: 'Egg', body: 'Egg may appear in dips, sauces, and sandwich builds. It is easy to miss if you only focus on the main protein.' },
              { emoji: '🫘', title: 'Soy', body: 'Soy can appear in sauces, marinades, breaded products, and fryer-related notes. One of the most common to check.' },
              { emoji: '🐟', title: 'Fish or Shellfish', body: 'These concerns often come up in certain dips or dressings rather than in the wings themselves.' },
              { emoji: '🥬', title: 'Celery', body: 'Celery is one of the allergens people forget to check, but it can appear in seasonings or flavor blends.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="text-3xl mb-3">{c.emoji}</div>
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">{c.title}</h3>
                <p className="text-sm text-[#555] leading-6">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST PRACTICES ───────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Best Practices for Ordering With Allergies
          </h2>
          <div className="space-y-3">
            {[
              'Keep your order basic — simple food is easier to evaluate.',
              'Avoid unnecessary extras like dips, loaded fries, and desserts that add risk.',
              'Double-check every flavor — do not assume your usual one is the same as another.',
              'Be careful with combo meals that include sides or drinks you did not check.',
              'Watch out for "safe-looking" foods — plain fries or veggie sides may still need review.',
              'If your allergy is serious, ask about preparation instead of relying only on the chart.',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <CheckCircle2 size={18} className="text-[#006938] shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-[#444] leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5 pt-2">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <Star size={16} className="text-green-600" /> Strengths
              </h3>
              <ul className="space-y-2">
                {['Easy comparison across menu categories', 'Better visibility into sauces and seasonings', 'Helpful for checking dips and sides', 'Useful for people who want to order quickly', 'A practical starting point before asking extra questions'].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" /> Limitations
              </h3>
              <ul className="space-y-2">
                {['May not fully reflect real-time cross-contact in prep', 'Shared fryers can still be a concern', 'Store-level handling may vary', 'Limited-time items may need extra checking', 'Cannot replace medical advice for severe allergies'].map((l, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />{l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT NOTES ──────────────────────────────── */}
      <section className="py-16 bg-[#F9FAF7] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Important Allergen Notes
          </h2>
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div key={i} className="flex gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-7">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 pb-3 border-b-2 border-[#006938]/10">
            FAQ About the Wingstop Allergen Menu
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-[#1A1A1A] text-[0.95rem] leading-snug">{i + 1}. {faq.q}</span>
                  <ChevronDown size={20} className="text-[#006938] shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-7 pb-6 pt-1">
                  <p className="text-[#555] leading-7 text-sm border-t border-gray-100 pt-4">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSION CTA ───────────────────────────────── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
          <Shield size={40} className="text-secondary mx-auto mb-6" />
          <h2 className="text-4xl font-black italic uppercase tracking-tight text-white leading-none mb-6">Final Thoughts</h2>
          <p className="text-white/60 font-medium leading-relaxed max-w-xl mx-auto mb-10">
            The Wingstop allergen menu is most useful when you use it as a smart filter before ordering. Start with the base item, check the flavor, review dips and sides, and do not ignore fryer or prep concerns. Simple orders are easier to review. If something feels unclear, skip it.
          </p>
          <button onClick={() => scrollTo('classic')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-primary rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20">
            <BookOpen size={16} /> View Full Allergen Chart
          </button>
        </div>
      </section>
    </main>
  );
}
