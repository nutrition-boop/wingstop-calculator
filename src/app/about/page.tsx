import type { Metadata } from 'next';
import { Users, Target, Shield, Heart, ChevronRight, Calculator, Utensils, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Wingstop Nutrition Calculator – Our Mission & Story',
  description: 'Learn about the Wingstop Nutrition Calculator team. We help you make informed choices by providing accurate calorie counts, macros, allergen data, and menu prices for every Wingstop item.',
  openGraph: {
    title: 'About Us | Wingstop Nutrition Calculator – Our Mission & Story',
    description: 'Learn about the Wingstop Nutrition Calculator team. We help you make informed choices by providing accurate calorie counts, macros, allergen data, and menu prices for every Wingstop item.',
  },
  alternates: {
    canonical: '/about',
  },
};

const values = [
  {
    icon: Target,
    title: 'Accuracy First',
    description:
      'Every calorie count, macro breakdown, and price on our site is sourced directly from official Wingstop nutrition data and verified for accuracy.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description:
      'We clearly disclose that this is a fan-made resource. We are not affiliated with Wingstop Restaurants Inc., and we always link back to the official source.',
  },
  {
    icon: Heart,
    title: 'User-Focused',
    description:
      'Our tools are built with you in mind. From the nutrition calculator to the allergen menu, every feature is designed to be fast, simple, and easy to use.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'We listen to our users. Many of our features — like the gluten-free menu guide and the holiday hours page — were built based on community requests.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAF7]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] pt-32 pb-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FDB913]/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Users size={14} className="text-[#FDB913]" />
            About Us
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            About <span className="text-[#FDB913]">Wingstop Nutrition</span> Calculator
          </h1>

          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            We are a passionate, independent team dedicated to helping Wingstop fans make smarter, healthier food choices — one wing at a time.
          </p>
        </div>
      </div>

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Who We Are */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Who We Are
            About Our Team
          </h2>
          <p className="text-[#444] leading-8 text-[1.05rem] mb-5">
            Wingstop Nutrition Calculator is an independently developed, fan-made website created to provide
            Wingstop customers with accurate and easy-to-use nutrition information. We are not officially
            affiliated with Wingstop Restaurants Inc. All menu images used on this site are the property
            of <a href="https://www.wingstop.com" target="_blank" rel="noopener noreferrer" className="text-[#006938] font-semibold hover:underline">Wingstop Restaurants Inc.</a> and
            are used here for informational and educational purposes only.
          </p>
          <p className="text-[#444] leading-8 text-[1.05rem]">
            Our website was born out of a simple need: we wanted to know how many calories were in our favorite
            Wingstop combos before ordering. When we couldn&apos;t find a fast, user-friendly tool to do this, we
            decided to build one ourselves. Today, our site serves thousands of Wingstop fans every month who
            want to make informed dietary decisions without sacrificing flavor.
          </p>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Our Mission
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">
            <p className="text-[#444] leading-8 text-[1.05rem]">
              Our mission is to empower Wingstop customers to make healthier and more informed food choices by
              providing a comprehensive, free-to-use platform that includes detailed nutrition data, allergen information,
              menu pricing, and a powerful meal calculator. We believe that knowing what&apos;s in your food should be
              simple, fast, and accessible to everyone.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Our Tools and Resources
          </h2>
          <p className="text-[#444] leading-8 text-[1.05rem] mb-8">
            Our site is packed with useful tools and resources for Wingstop fans. Here is what you can find:
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Calculator, title: 'Nutrition Calculator', description: 'Build your custom Wingstop meal and instantly see total calories, fat, protein, carbs, and sodium.', href: '/' },
              { icon: Utensils, title: 'Full Menu with Prices', description: 'Browse the complete Wingstop menu for 2026 with up-to-date prices and high-quality images.', href: '/menu' },
              { icon: MapPin, title: 'Store Locator & Hours', description: 'Find Wingstop locations near you, check daily operating hours, and view holiday schedules.', href: '/locations' },
            ].map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#006938]/20 transition-all duration-200 group"
              >
                <div className="bg-[#006938]/5 w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#006938] transition-colors duration-200">
                  <Icon size={20} className="text-[#006938] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2 text-sm">{title}</h3>
                <p className="text-[#666] text-sm leading-6">{description}</p>
              </Link>
            ))}
          </div>
          <p className="text-[#444] leading-8 text-[1.05rem] mt-6">
            In addition to the tools above, we also provide a detailed <Link href="/allergen-menu" className="text-[#006938] font-semibold hover:underline">Allergen Menu</Link>, a curated <Link href="/wingstop-gluten-free" className="text-[#006938] font-semibold hover:underline">Gluten-Free Menu Guide</Link>, and informational pages on <Link href="/hours" className="text-[#006938] font-semibold hover:underline">Wingstop Store Hours</Link> and <Link href="/holiday-hours" className="text-[#006938] font-semibold hover:underline">Holiday Hours</Link>.
          </p>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 pb-3 border-b-2 border-[#006938]/10">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="bg-[#006938]/5 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#006938]" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2 text-sm">{title}</h3>
                <p className="text-[#666] text-sm leading-6">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Data Accuracy and Sources
          </h2>
          <p className="text-[#444] leading-8 text-[1.05rem] mb-5">
            All nutrition information displayed on this website is sourced from publicly available data provided
            by <a href="https://www.wingstop.com" target="_blank" rel="noopener noreferrer" className="text-[#006938] font-semibold hover:underline">Wingstop Restaurants Inc.</a> We
            regularly review and update our database to reflect the latest menu changes and price adjustments. However,
            actual values may vary slightly depending on portion sizes, preparation methods, and regional differences.
          </p>
          <p className="text-[#444] leading-8 text-[1.05rem]">
            We always recommend that individuals with specific dietary needs or food allergies consult directly with
            their local Wingstop restaurant or a qualified healthcare professional before making dietary decisions based
            on the information provided here.
          </p>
        </section>

        {/* Get in Touch */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
            Contact Us
          </h2>
          <p className="text-[#444] leading-8 text-[1.05rem] mb-6">
            Have a question, suggestion, or feedback? We love hearing from our users. Whether you&apos;ve spotted an
            error in our data, have a feature request, or just want to say hello, don&apos;t hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#006938] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
          >
            Contact Us <ChevronRight size={16} />
          </Link>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#006938] to-[#004D28] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #FDB913 1px, transparent 1px), radial-gradient(circle at 80% 50%, #FDB913 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Ready to Track Your Meal?
            </h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Use our free Wingstop Nutrition Calculator to build your perfect meal and check all the nutrition facts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="bg-white text-[#006938] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
              >
                Nutrition Calculator
              </Link>
              <Link
                href="/menu"
                className="bg-[#FDB913] text-[#1A1A1A] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
              >
                Browse Full Menu
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
