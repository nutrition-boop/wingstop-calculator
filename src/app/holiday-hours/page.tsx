import type { Metadata } from 'next';
import { Calendar, ChevronDown, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wingstop Holiday Hours | Full Schedule for All Holidays (2026)',
  description: "Find out Wingstop's holiday hours, including Christmas Day, New Year's Eve, Thanksgiving, and more. Check out this guide for special hours and closures!",
  openGraph: {
    title: 'Wingstop Holiday Hours | Full Schedule for All Holidays (2026)',
    description: "Find out Wingstop's holiday hours, including Christmas Day, New Year's Eve, Thanksgiving, and more.",
  },
  alternates: { canonical: 'https://wingstopcaloriecalculator.us/holiday-hours' },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What are Wingstop's hours on Christmas Day?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wingstop is closed on Christmas Day. They take the day off to allow their employees to enjoy the holiday with their families.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Wingstop locations open on New Year\'s Eve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Wingstop is typically open on New Year's Eve from 11:00 AM to 8:00 PM, but check with your local Wingstop to confirm.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Wingstop open on Thanksgiving Day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Wingstop locations are closed or have reduced hours on Thanksgiving Day. Be sure to confirm with your local store for specific hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get wings on Christmas Eve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, Wingstop is usually open on Christmas Eve from 11:00 AM to 8:00 PM. However, check with your local Wingstop for possible variations in hours.",
      },
    },
    {
      '@type': 'Question',
      name: "What are Wingstop's hours for Independence Day?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On Independence Day (4th of July), Wingstop typically operates from 11:00 AM to 10:00 PM. Confirm with your local Wingstop for any adjustments to hours.',
      },
    },
  ],
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wingstop Holiday Hours | Full Schedule for All Holidays (2026)',
  description:
    "Find out Wingstop's holiday hours, including Christmas Day, New Year's Eve, Thanksgiving, and more.",
  author: { '@type': 'Organization', name: 'Wingstop Calculator' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': '/holiday-hours' },
};

type HolidayStatus = 'open' | 'reduced' | 'closed';

const holidaySchedule: {
  holiday: string;
  hours: string;
  status: HolidayStatus;
}[] = [
  { holiday: "New Year's Eve",    hours: '11:00 AM – 8:00 PM',          status: 'open'    },
  { holiday: "New Year's Day",    hours: '11:00 AM – 12:00 AM',         status: 'open'    },
  { holiday: 'Christmas Eve',     hours: '11:00 AM – 8:00 PM',          status: 'open'    },
  { holiday: 'Christmas Day',     hours: 'Closed',                      status: 'closed'  },
  { holiday: 'Thanksgiving Day',  hours: 'Closed or Reduced Hours',     status: 'reduced' },
  { holiday: 'Easter Sunday',     hours: 'Closed or Reduced Hours',     status: 'reduced' },
  { holiday: 'Independence Day',  hours: '11:00 AM – 10:00 PM',        status: 'open'    },
];

const statusBadge: Record<HolidayStatus, JSX.Element> = {
  open: (
    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
      <CheckCircle size={12} /> Open
    </span>
  ),
  reduced: (
    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
      <Clock size={12} /> Reduced
    </span>
  ),
  closed: (
    <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
      <XCircle size={12} /> Closed
    </span>
  ),
};

const holidaySections = [
  {
    id: 'new-years-eve',
    title: "New Year's Eve Hours",
    hours: '11:00 AM – 8:00 PM',
    status: 'open' as HolidayStatus,
    body: "On New Year's Eve, Wingstop locations generally close earlier to allow staff to celebrate the coming year. Most stores will be open from 11:00 AM to 8:00 PM. If you want to get your wings before ringing in the new year, make sure to visit early. As always, check with your local Wingstop to confirm their specific hours.",
  },
  {
    id: 'new-years-day',
    title: "New Year's Day Hours",
    hours: '11:00 AM – 12:00 AM',
    status: 'open' as HolidayStatus,
    body: "For New Year's Day, Wingstop typically opens later in the day, but you can still grab some delicious wings. Most locations are open from 11:00 AM to 12:00 AM (midnight). Whether you're recovering from the night before or kicking off the new year with some wings, Wingstop is ready to serve you. Remember, it's always a good idea to confirm with your nearest Wingstop in case of changes.",
  },
  {
    id: 'christmas-eve',
    title: 'Christmas Eve Hours',
    hours: '11:00 AM – 8:00 PM',
    status: 'open' as HolidayStatus,
    body: "On Christmas Eve, Wingstop has shorter hours to give employees time to prepare for the holiday. Generally, Wingstop will be open from 11:00 AM to 8:00 PM. If you want to grab wings before spending the night with family, make sure to get there before closing time.",
  },
  {
    id: 'christmas-day',
    title: 'Christmas Day Hours',
    hours: 'Closed',
    status: 'closed' as HolidayStatus,
    body: "Wingstop is usually closed on Christmas Day. Like many restaurants, they take this day off to allow their staff to enjoy the holiday with family. If you're craving wings on Christmas Day, you'll have to wait until the next day or plan a visit on Christmas Eve.",
  },
  {
    id: 'thanksgiving',
    title: 'Thanksgiving Day Hours',
    hours: 'Closed or Reduced Hours',
    status: 'reduced' as HolidayStatus,
    body: "On Thanksgiving Day, Wingstop locations are typically closed or have reduced hours. Most Wingstop restaurants take the day off to celebrate with their employees and families. However, it's best to check with your local Wingstop, as hours can vary depending on the location.",
  },
  {
    id: 'easter',
    title: 'Easter Sunday Hours',
    hours: 'Closed or Reduced Hours',
    status: 'reduced' as HolidayStatus,
    body: "For Easter Sunday, many Wingstop locations are closed or have reduced hours. Like Thanksgiving and Christmas, most restaurants close to let their staff enjoy the holiday. Be sure to check with your local Wingstop for any changes in hours if you're planning to visit.",
  },
  {
    id: 'independence-day',
    title: 'Independence Day (4th of July) Hours',
    hours: '11:00 AM – 10:00 PM',
    status: 'open' as HolidayStatus,
    body: "On Independence Day, Wingstop typically remains open, but with modified hours. Most locations operate from 11:00 AM to 10:00 PM on the 4th of July, so you can still get your wing fix during the holiday celebrations. Always verify with your local Wingstop to confirm their hours for this special day.",
  },
];

const faqs = [
  {
    question: "What are Wingstop's hours on Christmas Day?",
    answer: "Wingstop is closed on Christmas Day. They take the day off to allow their employees to enjoy the holiday with their families.",
  },
  {
    question: "Are Wingstop locations open on New Year's Eve?",
    answer: "Yes, Wingstop is typically open on New Year's Eve from 11:00 AM to 8:00 PM, but check with your local Wingstop to confirm.",
  },
  {
    question: 'Does Wingstop open on Thanksgiving Day?',
    answer: 'Most Wingstop locations are closed or have reduced hours on Thanksgiving Day. Be sure to confirm with your local store for specific hours.',
  },
  {
    question: 'Can I get wings on Christmas Eve?',
    answer: "Yes, Wingstop is usually open on Christmas Eve from 11:00 AM to 8:00 PM. However, check with your local Wingstop for possible variations in hours.",
  },
  {
    question: "What are Wingstop's hours for Independence Day?",
    answer: "On Independence Day (4th of July), Wingstop typically operates from 11:00 AM to 10:00 PM. Confirm with your local Wingstop for any adjustments to hours.",
  },
];

export default function HolidayHoursPage() {
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
              <Calendar size={14} className="text-[#FDB913]" />
              Holiday Guide · Updated 2026
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Wingstop{' '}
              <span className="text-[#FDB913]">Holiday Hours</span>
              <br />
              Complete Guide 2026
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
              Find out Wingstop&apos;s holiday hours, including Christmas Day, New Year&apos;s Eve,
              Thanksgiving, and more — so you never miss out on your wings.
            </p>

            {/* quick-jump pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {[
                { label: 'Schedule', href: '#schedule' },
                { label: "New Year's", href: '#new-years-eve' },
                { label: 'Christmas', href: '#christmas-eve' },
                { label: 'Thanksgiving', href: '#thanksgiving' },
                { label: 'FAQs', href: '#faqs' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-105"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alert banner ── */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-800 leading-relaxed">
              Hours may vary by location. Always confirm with your local Wingstop
              before visiting on a holiday, as individual stores may adjust their schedule.
            </p>
          </div>
        </div>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

          {/* Intro */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              When is Wingstop Open on Holidays?
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              During the holidays, Wingstop&apos;s hours may vary, so it&apos;s important to know
              when your favorite wing joint is open. Whether it&apos;s New Year&apos;s Eve,
              Christmas Day, or Thanksgiving, knowing Wingstop&apos;s holiday hours will help you
              plan your visits and avoid any surprises. Keep in mind, some stores might adjust their
              hours or close for certain holidays. Here&apos;s a comprehensive guide to Wingstop
              holiday hours and what you can expect for each major holiday.
            </p>
          </section>

          {/* Holiday Schedule Table */}
          <section id="schedule">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Holiday Schedule for 2026
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-8">
              Here&apos;s a quick reference table for Wingstop holiday hours to make sure you never
              miss out on your wings:
            </p>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#006938] text-white">
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Holiday
                    </th>
                    <th className="text-center px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Wingstop Hours
                    </th>
                    <th className="text-center px-6 py-4 font-semibold uppercase tracking-wide text-xs hidden sm:table-cell">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holidaySchedule.map(({ holiday, hours, status }, i) => (
                    <tr
                      key={holiday}
                      className={`border-t border-gray-100 transition-colors ${
                        status === 'closed'
                          ? 'bg-red-50/40'
                          : status === 'reduced'
                          ? 'bg-amber-50/40'
                          : i % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 font-bold text-[#1A1A1A]">{holiday}</td>
                      <td className="px-6 py-4 text-center font-medium text-[#444]">{hours}</td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        {statusBadge[status]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <CheckCircle size={12} className="text-green-500" /> Open (regular/modified hours)
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={12} className="text-amber-500" /> Reduced or may vary
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <XCircle size={12} className="text-red-500" /> Closed
                </span>
              </div>
            </div>
          </section>

          {/* Per-Holiday Sections */}
          {holidaySections.map(({ id, title, hours, status, body }) => (
            <section key={id} id={id}>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
                {title}
              </h2>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {statusBadge[status]}
                  <span className="text-lg font-black text-[#006938]">{hours}</span>
                </div>
                <p className="text-[#444] leading-8 text-[1.05rem]">{body}</p>
              </div>
            </section>
          ))}

          {/* Other Holidays */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Other Special Days
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <p className="text-[#555] leading-8 text-[1.05rem]">
                For other national holidays such as Memorial Day, Labor Day, or local observances, Wingstop&apos;s hours may also
                vary. It&apos;s a good idea to check with your local store or use their online store
                locator to get updated information on holiday hours.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 pb-3 border-b-2 border-[#006938]/10">
              Questions About Holiday Hours
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
              Summary of Holiday Operating Times
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              Knowing Wingstop holiday hours will help you plan your wing runs
              around the special days. Whether it&apos;s New Year&apos;s Eve, Christmas Day, or
              Independence Day, you can count on this guide to help you find out when Wingstop is
              open. Be sure to check with your local Wingstop for any changes to their hours,
              especially for holidays, to ensure you can get your wing fix whenever you need it!
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
              <h3 className="text-2xl sm:text-3xl font-black mb-3">Plan Your Holiday Visit</h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Find a location near you and check the menu before you head out.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/locations"
                  className="bg-white text-[#006938] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
                >
                  Find a Location
                </a>
                <a
                  href="/hours"
                  className="bg-[#FDB913] text-[#1A1A1A] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
                >
                  Regular Hours
                </a>
              </div>
            </div>
          </div>

        </article>
      </div>
    </>
  );
}
