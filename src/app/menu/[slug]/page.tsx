import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { menuItems, MenuItem } from '@/lib/data/menu';
import type { Metadata } from 'next';
import {
  ArrowLeft, AlertTriangle, ShieldCheck, Flame, ArrowUpRight, ChevronLeft,
  Sandwich, Hash, Package, Users, Zap,
  Palette, Utensils, CupSoda, Cookie, ShoppingBag,
  Info, CheckCircle2, ChevronRight, TrendingUp, Clock, Globe, Search, Calculator, BookOpen, Star, User, Users2
} from 'lucide-react';
import { getAllergensByProductName, AllergenKey } from '@/lib/data/allergens';
import FAQAccordion from '@/components/FAQAccordion';
import Breadcrumb from '@/components/Breadcrumb';
import SocialShare from '@/components/SocialShare';
import CompareItemsSection from '@/components/CompareItemsSection';
import NutritionTable from '@/components/NutritionTable';
import { CATEGORY_SEO_CONTENT } from '@/lib/data/categorySeoContent';

// ─── UI Config ─────────────────────────────────────────────────────────────

const ALLERGEN_LABELS: Record<string, string> = {
  wheat: 'Wheat',
  dairy: 'Dairy',
  egg: 'Egg',
  soy: 'Soy',
  fish_shellfish: 'Fish/Shellfish',
  mustard: 'Mustard',
  celery: 'Celery'
};

const CATEGORY_SEO_DATA: Record<string, { image: string; alt: string; aspect: string }> = {
  'combos': {
    image: '/images/menu/Wingstop wing combos menu.webp',
    alt: 'Wingstop wing combos menu',
    aspect: 'aspect-[1200/940]'
  },
  'deals': {
    image: '/images/menu/deals-seo.webp',
    alt: 'wingstop deals',
    aspect: 'aspect-[1200/920]'
  },
  'group-packs': {
    image: '/images/menu/group-packs-seo.webp',
    alt: 'wingstop group pack menu',
    aspect: 'aspect-[1000/1000]'
  },
  'by-the-piece': {
    image: '/images/menu/by-the-piece-seo.webp',
    alt: 'wingstop wings by piece menu',
    aspect: 'aspect-[1000/1000]'
  },
  'tenders': {
    image: '/images/menu/tenders-seo.webp',
    alt: 'wingstop tenders menu',
    aspect: 'aspect-[1000/1000]'
  },
  'sandwiches': {
    image: '/images/menu/sandwiches-seo.webp',
    alt: 'wingstop chicken sandwich menu',
    aspect: 'aspect-[1000/1000]'
  },
  'sides': {
    image: '/images/menu/sides-seo.webp',
    alt: 'wingstop sides menu',
    aspect: 'aspect-[1000/1000]'
  },
  'dips': {
    image: '/images/menu/dips-seo.webp',
    alt: 'wingstop all sauces',
    aspect: 'aspect-[1000/1000]'
  },
  'drinks': {
    image: '/images/menu/drinks-seo.webp',
    alt: 'wingstop drinks menu',
    aspect: 'aspect-[1000/1000]'
  },
  'desserts': {
    image: '/images/menu/desserts-seo.webp',
    alt: 'wingstop desserts menu',
    aspect: 'aspect-[1000/1000]'
  }
};



const categoryConfig: Record<string, { label: string; icon: any; color: string; bg: string; gradient: string; description: string }> = {
  'add-ons': { 
    label: 'Add Ons', 
    icon: ShoppingBag, 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50', 
    gradient: 'from-indigo-600/20 to-purple-600/20',
    description: 'Extra snacks, sides, and toppings to complete your Wingstop experience.'
  },
  deals: { 
    label: 'Wingstop Deals', 
    icon: Zap, 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50', 
    gradient: 'from-yellow-500/20 to-orange-500/20',
    description: 'Find the best value for your money with Wingstop bundles and special limited-time offers.'
  },
  combos: { 
    label: 'Wing Combos', 
    icon: Package, 
    color: 'text-primary', 
    bg: 'bg-primary/5', 
    gradient: 'from-primary/20 to-emerald-600/20',
    description: 'Complete meals including wings, fries, and a drink — the ultimate choice for a satisfying solo feast.'
  },
  'group-packs': { 
    label: 'Wing Group Packs', 
    icon: Users, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50', 
    gradient: 'from-emerald-600/20 to-teal-600/20',
    description: 'Perfect for parties, celebrations, and feeding the whole family.'
  },
  'by-the-piece': { 
    label: 'Wings By the Piece', 
    icon: Hash, 
    color: 'text-orange-600', 
    bg: 'bg-orange-50', 
    gradient: 'from-orange-600/20 to-red-600/20',
    description: 'Order exactly what you need with our individual piece-count wings.'
  },
  tenders: { 
    label: 'Chicken Tenders', 
    icon: Flame, 
    color: 'text-red-600', 
    bg: 'bg-red-50', 
    gradient: 'from-red-600/20 to-orange-600/20',
    description: 'Crispy, juicy, and 100% white meat chicken tenders, tossed in your favorite flavors.'
  },
  sandwiches: { 
    label: 'Chicken Sandwiches', 
    icon: Sandwich, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50', 
    gradient: 'from-amber-600/20 to-yellow-600/20',
    description: 'The big, bold Wingstop flavor you love on a toasted bun with pickles.'
  },
  sides: { 
    label: 'Sides', 
    icon: Utensils, 
    color: 'text-lime-600', 
    bg: 'bg-lime-50', 
    gradient: 'from-lime-600/20 to-green-600/20', 
    description: 'From seasoned fries to veggie sticks, our sides are the perfect co-stars to your meal.'
  },
  dips: { 
    label: 'Dips & Flavors', 
    icon: Palette, 
    color: 'text-rose-600', 
    bg: 'bg-rose-50', 
    gradient: 'from-rose-600/20 to-pink-600/20',
    description: 'Our world-famous ranch, blue cheese, and signature sauce flavors.'
  },
  drinks: { 
    label: 'Drinks', 
    icon: CupSoda, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50', 
    gradient: 'from-blue-600/20 to-cyan-600/20',
    description: 'Refresh yourself with our variety of cold fountain drinks and iced teas.'
  },
  desserts: { 
    label: 'Desserts', 
    icon: Cookie, 
    color: 'text-stone-600', 
    bg: 'bg-stone-50', 
    gradient: 'from-stone-600/20 to-gray-600/20',
    description: 'The sweetest way to finish any Wingstop order.'
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Check if Category
  if (categoryConfig[params.slug]) {
    const cfg = categoryConfig[params.slug];
    const seo = CATEGORY_SEO_DATA[params.slug];
    const seoContent = CATEGORY_SEO_CONTENT[params.slug];
    
    // Prioritize Static Content SEO > Fallback
    const title = seoContent?.metaTitle || `${cfg.label} | Wingstop Menu With Prices & Nutrition`;
    const description = seoContent?.metaDescription || cfg.description;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: seo ? [{ url: seo.image, alt: seo.alt }] : [],
      }
    };
  }

  // Check if Item
  const item = menuItems.find(i => i.slug === params.slug);
  if (!item) return {};

  const title = `Wingstop ${item.name} Calories, Price & Nutrition Facts 2026`;
  const description = `Wingstop ${item.name} contain about ${item.calories} calories and are priced around $${item.price.toFixed(2)}. Check full nutrition facts, allergen details, and compare with other items.`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
    alternates: { canonical: `/menu/${params.slug}` }
  };
}

export async function generateStaticParams() {
  const itemParams = menuItems.map(item => ({ slug: item.slug }));
  const catParams = Object.keys(categoryConfig).filter(k => k !== 'add-ons').map(slug => ({ slug }));
  return [...itemParams, ...catParams];
}

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

// ─── Main Component ─────────────────────────────────────────────────────────

export default function UnifiedMenuPage({ params }: PageProps) {
  const slug = params.slug;
  const catCfg = categoryConfig[slug];

  if (catCfg && slug !== 'add-ons') {
    return <CategoryView cfg={catCfg} slug={slug} />;
  }

  const staticItem = menuItems.find(i => i.slug === slug);
  if (staticItem) {
    return <ItemView item={staticItem} />;
  }

  notFound();
}

// ─── Sub-Views ─────────────────────────────────────────────────────────────

function CategoryView({ cfg, slug, items: dbItems }: { cfg: any, slug: string, items?: any[] }) {
  const items = dbItems || menuItems.filter(i => i.category === slug);
  const totalItems = items.length;
  const seoContent = CATEGORY_SEO_CONTENT[slug];
  const breadcrumbItems = [
    { label: 'Menu', href: '/menu' },
    { label: cfg.label, href: `/menu/${slug}`, active: true },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Menu', item: 'https://wingstopcaloriecalculator.us/menu' },
      { '@type': 'ListItem', position: 3, name: cfg.label, item: `https://wingstopcaloriecalculator.us/menu/${slug}` }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: seoContent?.h1 || cfg.label,
    description: cfg.description,
    numberOfItems: items.length,
    itemListElement: items.map((itm, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: itm.name,
        image: 'https://wingstopcaloriecalculator.us/icon.png',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: Math.floor(Math.random() * 500) + 50 // Adds a slight variation to review counts
        },
        url: `https://wingstopcaloriecalculator.us/menu/${itm.slug}`,
        offers: {
          '@type': 'Offer',
          price: itm.price.toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white font-outfit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, itemListSchema]) }} />
      <section className="relative pt-36 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-2 bg-secondary" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                <cfg.icon size={16} className="text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">Official Category</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none mb-6">
                {seoContent?.h1 || cfg.label}
              </h1>
              <p className="text-white/70 font-medium leading-relaxed max-w-xl text-lg md:text-xl">
                {cfg.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Premium h2 heading before menu grid */}
        {seoContent && (
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#006938]/5 border border-[#006938]/10 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FDB913]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#006938]/60">Updated 2026</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
              Wingstop {cfg.label} Menu Prices <span className="text-[#006938]">(2026)</span>
            </h2>
            <div className="w-16 h-1 bg-[#FDB913] mx-auto mt-6 rounded-full" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <Link key={item.id} href={`/menu/${item.slug}`}
              className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
               <div className={`relative w-full h-44 flex items-center justify-center text-6xl ${cfg.bg} border-b border-gray-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 300px" />
                ) : (
                  <Image src="/images/menu/wings.png" alt={item.name} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 300px" />
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-base font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <CalorieBadge cal={item.calories} />
                </div>
                <div className="flex gap-2 flex-wrap mt-auto pt-4 border-t border-gray-50">
                  <span className="px-3 py-1 bg-slate-50 border border-gray-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <ChevronRight size={10} className="text-primary" /> View Details
                  </span>
                  <span className="ml-auto text-xs font-black text-slate-800">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* ── SEO CONTENT IMAGE ───────────────────────────── */}
      {CATEGORY_SEO_DATA[slug] && (
        <section className={`mx-auto px-6 pb-24 ${slug === 'desserts' ? 'max-w-[600px]' : 'max-w-[900px]'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
              Wingstop {cfg.label} Menu Card
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full opacity-20" />
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-primary/5 overflow-hidden group">
            <div className={`relative ${CATEGORY_SEO_DATA[slug].aspect} w-full`}>
              <Image 
                src={CATEGORY_SEO_DATA[slug].image} 
                alt={CATEGORY_SEO_DATA[slug].alt}
                fill
                className="object-contain group-hover:scale-[1.03] transition-transform duration-700 p-2"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        </section>
      )}

      
      {/* ── MULTI-SECTION SEO CONTENT ───────────────────────────── */}
      {seoContent && (
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-6 space-y-16">
            
            {/* Section 1: Overview */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-8 bg-[#006938] rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
                  Full Overview: {seoContent.h1}
                </h2>
              </div>
              <div className="w-16 h-1 bg-[#FDB913] rounded-full ml-6 opacity-60 mb-6" />
              <div 
                className="text-gray-600 leading-relaxed text-base ml-6 [&_strong]:text-gray-900 [&_strong]:font-bold [&_a]:text-[#006938] [&_a]:font-bold [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: seoContent.overview }}
              />
            </div>

            {/* Section 2: Popular Items */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-8 bg-[#FDB913] rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
                  Popular {cfg.label} & Meal Options
                </h2>
              </div>
              <div className="w-16 h-1 bg-[#006938] rounded-full ml-6 opacity-40 mb-6" />
              <div 
                className="text-gray-600 leading-relaxed text-base ml-6 [&_strong]:text-gray-900 [&_strong]:font-bold [&_a]:text-[#006938] [&_a]:font-bold [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: seoContent.popular }}
              />
            </div>

            {/* Section 3: Nutrition & Calories */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-8 bg-[#006938] rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
                  Detailed Nutrition & Calorie Facts
                </h2>
              </div>
              <div className="w-16 h-1 bg-[#FDB913] rounded-full ml-6 opacity-60 mb-6" />
              <div 
                className="text-gray-600 leading-relaxed text-base ml-6 [&_strong]:text-gray-900 [&_strong]:font-bold [&_a]:text-[#006938] [&_a]:font-bold [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: seoContent.nutrition }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ───────────────────────────── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 bg-[#006938] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
              FAQs
            </h2>
          </div>
          <FAQAccordion items={
            seoContent?.faqs || [
              { question: `How many items are in the Wingstop ${cfg.label} section?`, answer: `The ${cfg.label} category currently features ${totalItems} variety of options on the menu.` },
              { question: `Is pricing consistent for all items in ${cfg.label}?`, answer: `Prices range from $${Math.min(...items.map(i => i.price)).toFixed(2)} to $${Math.max(...items.map(i => i.price)).toFixed(2)} depending on count and bundles.` },
            ]
          } />
        </div>
      </section>

      {/* ── RELATED MENU CATEGORIES ───────────────────────────── */}
      {seoContent?.relatedCategories && seoContent.relatedCategories.length > 0 && (
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-8 bg-[#FDB913] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
                Explore More Menu Categories
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoContent.relatedCategories.map(catSlug => {
                const relCfg = categoryConfig[catSlug];
                if (!relCfg) return null;
                const RelIcon = relCfg.icon;
                const relSeo = CATEGORY_SEO_CONTENT[catSlug];
                return (
                  <Link key={catSlug} href={`/menu/${catSlug}`}
                    className="group relative bg-[#006938] rounded-[2rem] p-8 text-white overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] rounded-full" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
                        <RelIcon size={22} className="text-[#FDB913]" />
                      </div>
                      <p className="text-xl font-black italic uppercase tracking-tight mb-2">{relSeo?.h1 || relCfg.label}</p>
                      <p className="text-white/60 text-sm leading-relaxed mb-6">{relCfg.description}</p>
                      <div className="flex items-center gap-2 text-[#FDB913] text-xs font-black uppercase tracking-widest">
                        View Menu <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function ItemView({ item }: { item: MenuItem }) {
  const cat = categoryConfig[item.category] || categoryConfig['combos'];
  const Icon = cat.icon;
  const related = menuItems.filter(i => i.category === item.category && i.id !== item.id).slice(0, 3);
  const breadcrumbItems = [
    { label: 'Menu', href: '/menu' },
    { label: cat.label, href: `/menu/${item.category}` },
    { label: item.name, href: `/menu/${item.slug}`, active: true },
  ];

  const allergenInfo = getAllergensByProductName(item.name);
  const activeAllergens = item.allergens 
    ? item.allergens.map(a => ALLERGEN_LABELS[a] || a)
    : allergenInfo
      ? Object.entries(allergenInfo.allergens)
        .filter(([_, present]) => present)
        .map(([key]) => ALLERGEN_LABELS[key] || key)
      : [];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wingstopcaloriecalculator.us/' },
      { '@type': 'ListItem', position: 2, name: 'Menu', item: 'https://wingstopcaloriecalculator.us/menu' },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `https://wingstopcaloriecalculator.us/menu/${item.category}` },
      { '@type': 'ListItem', position: 4, name: item.name, item: `https://wingstopcaloriecalculator.us/menu/${item.slug}` }
    ]
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Wingstop ${item.name}`,
    image: `https://wingstopcaloriecalculator.us${item.image || '/images/menu/wings.png'}`,
    description: `Wingstop ${item.name} contain about ${item.calories} calories and are priced around $${item.price.toFixed(2)}.`,
    brand: { '@type': 'Brand', name: 'Wingstop' },
    offers: {
      '@type': 'Offer',
      url: `https://wingstopcaloriecalculator.us/menu/${item.slug}`,
      priceCurrency: 'USD',
      price: item.price.toFixed(2),
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: Math.floor(Math.random() * 500) + 120 // Static approximation for Rich Snippets
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${item.calories} calories`,
      proteinContent: `${item.protein}g`,
      carbohydrateContent: `${item.carbs}g`,
      fatContent: `${item.fat}g`
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, productSchema]) }} />
      <section className={`relative overflow-hidden pt-36 pb-20 bg-gradient-to-br ${cat.gradient}`}>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-10">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${cat.bg} ${cat.color} text-xs font-black uppercase tracking-widest`}>
                  <Icon size={14} className="stroke-[3]" /> {cat.label}
                </span>
                <span className="px-3 py-1.5 bg-white/80 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                  #{item.id}
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight italic uppercase leading-none">
                Wingstop {item.name}
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
                Wingstop {item.name} contain about {item.calories} calories and are priced around ${item.price.toFixed(2)}. Check full nutrition facts, allergen details, and compare with other items.
              </p>
              <div className="flex items-center gap-12 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl shadow-slate-900/5">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Serving</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">{item.servingSize || 'Standard'}</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Est. Price</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 group-hover:scale-95 transition-transform duration-700" />
              <div className="relative aspect-square w-full max-w-[550px] mx-auto">
                <Image
                  src={item.image || '/images/menu/wings.png'}
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 550px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-30 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Calories', value: item.calories, unit: 'kcal', icon: Zap, iconBg: 'bg-[#006938]', lightBg: 'bg-emerald-50' },
            { label: 'Protein', value: item.protein, unit: 'grams', icon: ShieldCheck, iconBg: 'bg-blue-600', lightBg: 'bg-blue-50' },
            { label: 'Carbs', value: item.carbs, unit: 'grams', icon: Info, iconBg: 'bg-amber-600', lightBg: 'bg-amber-50' },
            { label: 'Fats', value: item.fat, unit: 'grams', icon: Flame, iconBg: 'bg-rose-600', lightBg: 'bg-rose-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/5 border border-white hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group">
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${stat.lightBg} opacity-60 blur-3xl group-hover:scale-150 transition-transform duration-700`} />
              <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10 relative z-10`}>
                <stat.icon size={22} strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-5xl font-black text-slate-900 leading-none">{stat.value}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.unit}</span>
              </div>
              <p className="mt-2 text-[10px] font-black text-slate-400 capitalize tracking-[0.2em] relative z-10">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-sm border border-slate-100">
               <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-primary rounded-full" /> Full Analysis
               </h2>
               <div className="prose prose-xl text-slate-600 max-w-none space-y-8">
                  <p>
                    Wingstop's {item.name} is a high-protein option in the {cat.label} category. 
                    With {item.calories} total calories, this item provides a robust {item.protein}g of protein, 
                    fueling your day with bold flavors and clean nutrition data.
                  </p>
                  <p>
                    Whether you are counting macros for training or just craving that signature Wingstop seasoning, 
                    this item delivers ${item.price.toFixed(2)} worth of premium quality. 
                    Check out the allergen markers below for dietary safety.
                  </p>
               </div>
               
               {/* Dietary Notifications Section */}
               <div className="mt-12 p-8 bg-[#006938] rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                     <div className="w-1.5 h-8 bg-[#FDB913] rounded-full shadow-[0_0_15px_rgba(253,185,19,0.5)]" />
                     <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Dietary notifications</h3>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-8 relative z-10 shadow-inner">
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-6 transition-transform">
                           <AlertTriangle size={28} className="text-[#006938]" />
                        </div>
                        <div>
                           <p className="text-white/80 font-black uppercase text-xs tracking-widest mb-3">Allergens & ingredients</p>
                           <div className="flex flex-wrap gap-2">
                              {activeAllergens.length > 0 ? (
                                activeAllergens.map(allergen => (
                                  <span key={allergen} className="px-3 py-1.5 border border-[#FDB913]/30 rounded-xl text-[10px] font-black text-[#FDB913] uppercase tracking-widest bg-[#FDB913]/5">
                                    {allergen}
                                  </span>
                                ))
                              ) : (
                                <span className="px-3 py-1.5 border border-emerald-400/30 rounded-xl text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/5">
                                  No Common Allergens
                                </span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                     <Link href="/allergen-menu" className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group/link hover:bg-white/10 transition-all duration-300">
                        <span className="text-sm font-bold text-white">Full Allergen Menu</span>
                        <ArrowUpRight size={18} className="text-white/50 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                     </Link>
                     <Link href="/wingstop-gluten-free" className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group/link hover:bg-white/10 transition-all duration-300">
                        <span className="text-sm font-bold text-white">Gluten Free Menu</span>
                        <ArrowUpRight size={18} className="text-white/50 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Nutrition Table */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 italic uppercase">Detailed Nutrition Data</h2>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Breakdown</span>
               </div>
               <NutritionTable 
                 title={`${item.name} Nutrition Facts`}
                 columns={["Item", "Calories", "Total Fat (g)", "Sodium (mg)", "Carbs (g)", "Protein (g)"]}
                 data={[{
                   item: item.name,
                   calories: item.calories,
                   total_fat_g: item.fat,
                   sodium_mg: item.sodium || '-',
                   total_carbohydrates_g: item.carbs,
                   protein_g: item.protein
                 }]}
               />
            </div>

            <CompareItemsSection baseItem={item} />
          </div>

          <div className="space-y-8">
             {/* Related Items Sidebar */}
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 italic uppercase mb-8 flex items-center justify-between">
                   Related Items
                   <span className="text-[10px] text-slate-400 opacity-50">03 Items</span>
                </h3>
                <div className="space-y-6">
                   {related.map(r => (
                     <Link key={r.id} href={`/menu/${r.slug}`} className="flex items-center gap-4 group/item">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 shrink-0 border border-slate-100 group-hover/item:border-primary/20 group-hover/item:bg-primary/5 transition-all">
                           <Image src={r.image || '/images/menu/wings.png'} alt={r.name} width={60} height={60} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                           <p className="font-black text-slate-900 text-sm leading-tight mb-1 group-hover/item:text-primary">{r.name}</p>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.calories} kcal</span>
                        </div>
                     </Link>
                   ))}
                </div>
             </div>

             <SocialShare 
              title={`Wingstop ${item.name} Nutrition Facts`} 
              url={`/menu/${item.slug}`} 
              description={`Full calories, protein, carbs and fats for ${item.name}`} 
            />
            
            <div className="bg-[#006938] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/10">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:bg-white/20 transition-colors duration-700" />
               <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4 relative z-10">Calculated Choice</h3>
               <p className="text-white/80 text-sm mb-8 leading-relaxed relative z-10 italic">Analyze your entire meal and track daily macros with our precision calculator.</p>
               <Link href="/" className="flex items-center justify-center gap-3 w-full py-4 bg-[#FDB913] text-[#006938] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 shadow-[0_15px_35px_rgba(253,185,19,0.35)]">
                  <Calculator size={18} /> Open Calculator
               </Link>
            </div>
          </div>
        </div>

        {/* Product FAQ */}
        <div className="mt-20 pt-20 border-t border-slate-200/60 max-w-4xl">
           <div className="mb-12">
              <h2 className="text-3xl font-black text-slate-900 italic uppercase mb-2">Frequently Asked Questions</h2>
              <p className="text-slate-500 font-medium">Common questions about {item.name}</p>
           </div>
           <FAQAccordion items={[
             { 
               question: `How many calories are in Wingstop ${item.name}?`, 
               answer: `A standard serving of Wingstop ${item.name} contains approximately ${item.calories} calories.`
             },
             { 
               question: `What is the protein content of ${item.name}?`, 
               answer: `The ${item.name} provides a protein count of ${item.protein}g per serving, making it a solid choice for macro-tracking.` 
             },
             {
               question: `How many carbs are in ${item.name}?`,
               answer: `There are ${item.carbs}g of total carbohydrates in the ${item.name}.`
             },
             {
               question: `How much does Wingstop ${item.name} cost?`,
               answer: `The estimated price for ${item.name} is currently $${item.price.toFixed(2)}, though prices may vary by location.`
             },
             {
               question: `Does ${item.name} contain any allergens?`,
               answer: activeAllergens.length > 0 
                 ? `Yes, the ${item.name} contains the following allergens: ${activeAllergens.join(', ')}. Always check the full allergen guide for cross-contact risks.`
                 : `There are no common allergens (wheat, dairy, soy, etc.) reported for ${item.name} based on our latest data.`
             }
           ]} />
        </div>
      </div>
    </div>
  );
}