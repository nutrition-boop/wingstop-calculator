import type { Metadata } from 'next';
import { Clock, Search, Globe, Map, ChevronDown, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wingstop Hours | Find Wingstop Opening & Closing Times 2026',
  description: "Check out Wingstop hours for every day of the week! Find their opening and closing times, including weekend, for your nearest location.",
  openGraph: {
    title: 'Wingstop Hours | Find Wingstop Opening & Closing Times 2026',
    description: "Check out Wingstop hours for every day of the week! Find their opening and closing times, including weekend, for your nearest location.",
  },
  alternates: {
    canonical: '/hours',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What time does Wingstop open?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wingstop usually opens at 11:00 AM every day. This applies to most locations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What time does Wingstop close?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On weekdays and Sundays, Wingstop closes at 12:00 AM. On weekends (Friday and Saturday), they stay open until 1:00 AM.',
      },
    },
    {
      '@type': 'Question',
      name: "How can I find Wingstop hours near me?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "To find Wingstop hours near me, you can use Google Search, visit the Wingstop website, or check Google Maps for your local Wingstop hours.",
      },
    },
    {
      '@type': 'Question',
      name: "What are Wingstop's hours today?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Wingstop's hours today are typically 11:00 AM to 12:00 AM (midnight), but it's best to check the specific location near you.",
      },
    },
  ],
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wingstop Hours | Find Wingstop Opening & Closing Times 2026',
  description:
    "Check out Wingstop hours for every day of the week! Find their opening and closing times, including weekend, for your nearest location.",
  author: { '@type': 'Organization', name: 'Wingstop Calculator' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': '/hours' },
};

const hours = [
  { day: 'Monday', open: '11:00 AM', close: '12:00 AM (midnight)', isWeekend: false },
  { day: 'Tuesday', open: '11:00 AM', close: '12:00 AM (midnight)', isWeekend: false },
  { day: 'Wednesday', open: '11:00 AM', close: '12:00 AM (midnight)', isWeekend: false },
  { day: 'Thursday', open: '11:00 AM', close: '12:00 AM (midnight)', isWeekend: false },
  { day: 'Friday', open: '11:00 AM', close: '1:00 AM', isWeekend: true },
  { day: 'Saturday', open: '11:00 AM', close: '1:00 AM', isWeekend: true },
  { day: 'Sunday', open: '11:00 AM', close: '12:00 AM (midnight)', isWeekend: false },
];

const faqs = [
  {
    question: 'What time does Wingstop open?',
    answer: 'Wingstop usually opens at 11:00 AM every day. This applies to most locations.',
  },
  {
    question: 'What time does Wingstop close?',
    answer:
      'On weekdays and Sundays, Wingstop closes at 12:00 AM. On weekends (Friday and Saturday), they stay open until 1:00 AM.',
  },
  {
    question: 'How can I find Wingstop hours near me?',
    answer:
      "To find Wingstop hours near me, you can use Google Search, visit the Wingstop website, or check Google Maps for your local Wingstop hours.",
  },
  {
    question: "What are Wingstop's hours today?",
    answer:
      "Wingstop's hours today are typically 11:00 AM to 12:00 AM (midnight), but it's best to check the specific location near you.",
  },
];

const findMethods = [
  {
    icon: Search,
    title: 'Google Search',
    description:
      'Simply type "Wingstop hours near me" into Google, and it will show you the opening and closing times for your nearest location.',
  },
  {
    icon: Globe,
    title: 'Wingstop Website',
    description:
      "Visit the official Wingstop website and use their store locator tool to check hours for your specific location.",
  },
  {
    icon: Map,
    title: 'Google Maps',
    description:
      'Search for "Wingstop" on Google Maps, and it will show you the hours and exact location of the nearest Wingstop.',
  },
];

export default function HoursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-[#F9FAF7]">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] pt-32 pb-24">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FDB913]/10 blur-2xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Clock size={14} className="text-[#FDB913]" />
              Hours Guide · Updated 2026
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Wingstop Hours:{' '}
              <span className="text-[#FDB913]">Opening &amp; Closing</span> Times 2026
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
              Check out Wingstop hours for every day of the week! Find their opening and closing
              times, including weekends, for your nearest location.
            </p>

            {/* quick-jump pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {['Hours Table', 'Find Near Me', 'Opening', 'Closing', 'FAQs'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/ /g, '-')}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-105"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Notice banner ── */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-800 leading-relaxed">
              Hours may vary by location. Always check with your local Wingstop
              store or use our tips below before heading out.
            </p>
          </div>
        </div>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

          {/* Intro */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              When Does Wingstop Open and Close?
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              If you&apos;re craving some delicious wings from Wingstop, it&apos;s important to know
              their hours before heading out. Whether you&apos;re planning a lunch, dinner, or
              late-night snack, knowing Wingstop hours will make sure you don&apos;t miss out on
              your favorite wings. In this guide, we&apos;ll break down the Wingstop hours, including
              their opening hours and closing hours. Let&apos;s dive in!
            </p>
          </section>

          {/* Hours Table */}
          <section id="hours-table">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              General Operating Hours
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-8">
              Wingstop has regular hours of operation for all of their locations. These hours may
              vary a bit depending on your location, but here&apos;s a general idea of what you can
              expect at most Wingstop restaurants:
            </p>

            {/* Desktop / tablet table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#006938] text-white">
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Day
                    </th>
                    <th className="text-center px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Opening Hours
                    </th>
                    <th className="text-center px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Closing Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map(({ day, open, close, isWeekend }, i) => (
                    <tr
                      key={day}
                      className={`border-t border-gray-100 transition-colors ${
                        isWeekend ? 'bg-[#FDB913]/5' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-[#1A1A1A]">{day}</span>
                        {isWeekend && (
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[#FDB913] bg-[#FDB913]/10 px-2 py-0.5 rounded-full">
                            Late Night
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-[#006938]">{open}</td>
                      <td className="px-6 py-4 text-center font-medium text-[#444]">{close}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[#555] text-sm leading-7">
              These hours apply to most Wingstop locations, but it&apos;s always a good idea to
              double-check the Wingstop hours near me to confirm the exact times
              for your local store.
            </p>
          </section>

          {/* Find Near Me */}
          <section id="find-near-me">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              How to Find a Store Near You
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-8">
              To find the hours for Wingstop near you, you have a few simple options:
            </p>

            <div className="grid sm:grid-cols-3 gap-5">
              {findMethods.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#006938]/20 transition-all duration-200 group"
                >
                  <div className="bg-[#006938]/5 w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#006938] transition-colors duration-200">
                    <Icon size={20} className="text-[#006938] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2 text-sm">{title}</h3>
                  <p className="text-[#666] text-sm leading-6">{description}</p>
                </div>
              ))}
            </div>

            <p className="text-[#444] leading-8 text-[1.05rem] mt-6">
              By using these methods, you&apos;ll always know Wingstop&apos;s hours
              today and can plan your visit accordingly.
            </p>
          </section>

          {/* Opening Hours */}
          <section id="opening">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Store Opening Times
            </h2>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="bg-[#006938] rounded-2xl p-4 shrink-0">
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-black text-[#006938]">11:00 AM</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Every Day
                  </span>
                </div>
                <p className="text-[#555] leading-7">
                  Most Wingstop locations open at 11:00 AM every day. Whether
                  it&apos;s a weekday or weekend, you can expect Wingstop to open their doors at
                  this time to serve up their famous wings.
                </p>
              </div>
            </div>
          </section>

          {/* Closing Hours */}
          <section id="closing">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Store Closing Times
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-[#006938] mb-3">
                  Mon – Thu &amp; Sunday
                </p>
                <p className="text-3xl font-black text-[#1A1A1A] mb-2">12:00 AM</p>
                <p className="text-[#555] text-sm leading-6">
                  Midnight closing. Standard hours for most days of the week.
                </p>
              </div>
              <div className="bg-[#FDB913]/5 border border-[#FDB913]/30 rounded-2xl p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-[#c49200] mb-3">
                  Friday &amp; Saturday
                </p>
                <p className="text-3xl font-black text-[#1A1A1A] mb-2">1:00 AM</p>
                <p className="text-[#555] text-sm leading-6">
                  Extended late-night hours on weekends. Perfect for late-night wing cravings!
                </p>
              </div>
            </div>
          </section>

          {/* Hours Today */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Check Hours for Today
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-[#444] leading-8 text-[1.05rem]">
                Wondering about Wingstop hours today? Whether it&apos;s a regular
                weekday or weekend, Wingstop usually sticks to their regular hours of 
                11:00 AM to 12:00 AM (midnight). However, it&apos;s always a good
                idea to double-check with your local Wingstop, especially if you plan to visit
                during special events or holidays.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 pb-3 border-b-2 border-[#006938]/10">
              Common Questions About Hours
            </h2>
            <div className="space-y-4">
              {faqs.map(({ question, answer }, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-[#1A1A1A] text-[0.95rem] leading-snug">
                      {i + 1}. {question}
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-[#006938] shrink-0 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-7 pb-6 pt-1">
                    <p className="text-[#555] leading-7 text-sm border-t border-gray-100 pt-4">
                       {answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Summary of Operating Times
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              Now you know all about Wingstop hours, from their general opening and
              closing times to how you can find the hours for Wingstop near me.
              Whether you&apos;re craving wings for lunch, dinner, or a late-night snack,
              Wingstop&apos;s consistent hours make it easy to plan your visit. Always remember to
              check with your local store for any changes to their hours, especially around holidays
              or special events.
            </p>
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
                Plan Your Visit
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Check the menu and get a nutrition estimate before you head to Wingstop.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/locations"
                  className="bg-white text-[#006938] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
                >
                  Find a Location
                </a>
                <a
                  href="/#calculator"
                  className="bg-[#FDB913] text-[#1A1A1A] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
                >
                  Nutrition Calculator
                </a>
              </div>
            </div>
          </div>

        </article>
      </div>
    </>
  );
}
