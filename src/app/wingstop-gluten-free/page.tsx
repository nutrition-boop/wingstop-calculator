import type { Metadata } from 'next';
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wingstop Gluten-Free Menu: Safe Options & What to Avoid (Updated Guide)',
  description: 'Find out which Wingstop menu items are gluten-free, including wings, fries, and sauces. Get all the answers to your gluten-free dining questions at Wingstop!',
  keywords: [
    'wingstop gluten free',
    'wingstop gluten free menu',
    'are wingstop wings gluten free',
    'wingstop ranch gluten free',
    'are wingstop fries gluten free',
    'does wingstop have gluten free wings',
    'wingstop wings gluten free',
  ],
  openGraph: {
    title: 'Wingstop Gluten-Free Menu: Safe Options & What to Avoid (Updated Guide)',
    description: 'Find out which Wingstop menu items are gluten-free, including wings, fries, and sauces.',
  },
  alternates: {
    canonical: '/wingstop-gluten-free',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wingstop Gluten-Free Menu: Safe Options & What to Avoid (Updated Guide)',
  description: 'Find out which Wingstop menu items are gluten-free, including wings, fries, and sauces.',
  author: { '@type': 'Organization', name: 'Wingstop Calculator' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': '/wingstop-gluten-free' },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Wingstop have gluten-free wings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Wingstop offers plain bone-in wings and wings with dry rubs that do not contain gluten ingredients, but cross-contamination is a risk due to shared fryers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Wingstop wings gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some Wingstop wings can be considered gluten-free, but they may be cooked in shared fryers, which increases the risk of cross-contamination. Always ask for more information before ordering.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Wingstop ranch gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Wingstop ranch is not gluten-free. It contains gluten, so avoid it if you\'re on a strict gluten-free diet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Wingstop fries gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Wingstop fries are not gluten-free because they are fried in shared fryers. It\'s best to avoid fries if you are gluten-free.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is on the Wingstop gluten-free menu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wingstop offers plain wings (without breading) and dry rub options, but be aware of potential cross-contamination. You can also have carrot and celery sticks, and most drinks are gluten-free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Wingstop gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wingstop does have gluten-free options, but no, they are not a fully gluten-free restaurant. Cross-contact is a risk due to shared kitchen equipment.',
      },
    },
  ],
};

const safeItems = [
  'Classic Bone-in Wings (unbreaded)',
  'Cajun dry rub seasoning',
  'Lemon Pepper dry rub',
  'Garlic Parmesan dry rub',
  'Carrot and Celery sticks',
  'Sodas and unsweetened teas',
];

const avoidItems = [
  'Boneless wings (breaded)',
  'Fries (cooked in shared fryers)',
  'Ranch dressing (contains gluten)',
  'Some dipping sauces (check ingredients)',
];

const faqs = [
  {
    question: 'Does Wingstop have gluten-free wings?',
    answer: 'Yes, Wingstop offers plain bone-in wings and wings with dry rubs that do not contain gluten ingredients, but cross-contamination is a risk due to shared fryers.',
  },
  {
    question: 'Are Wingstop wings gluten-free?',
    answer: 'Some Wingstop wings can be considered gluten-free, but they may be cooked in shared fryers, which increases the risk of cross-contamination. Always ask for more information before ordering.',
  },
  {
    question: 'Is Wingstop ranch gluten-free?',
    answer: 'No, Wingstop ranch is not gluten-free. It contains gluten, so avoid it if you\'re on a strict gluten-free diet.',
  },
  {
    question: 'Are Wingstop fries gluten-free?',
    answer: 'No, Wingstop fries are not gluten-free because they are fried in shared fryers. It\'s best to avoid fries if you are gluten-free.',
  },
  {
    question: 'What is on the Wingstop gluten-free menu?',
    answer: 'Wingstop offers plain wings (without breading) and dry rub options, but be aware of potential cross-contamination. You can also have carrot and celery sticks, and most drinks are gluten-free.',
  },
  {
    question: 'Is Wingstop gluten-free?',
    answer: 'Wingstop does have gluten-free options, but no, they are not a fully gluten-free restaurant. Cross-contact is a risk due to shared kitchen equipment.',
  },
];

export default function WingstopGlutenFreePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-[#F9FAF7]">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] pt-32 pb-24">
          {/* decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FDB913]/10 blur-2xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            {/* badge */}
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Leaf size={14} className="text-[#FDB913]" />
              Dietary Guide · Updated 2026
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Wingstop Gluten-Free Menu:{' '}
              <span className="text-[#FDB913]">Safe Options</span> &amp; What to Avoid
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
              Find out which Wingstop menu items are gluten-free, including wings, fries, and
              sauces. Get all the answers to your gluten-free dining questions — in plain language.
            </p>

            {/* quick-jump pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {['Wings', 'Fries', 'Ranch', 'Safe Menu', 'FAQs'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(' ', '-')}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 backdrop-blur-sm hover:scale-105"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cross-contamination alert banner ── */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-800 leading-relaxed">
              Cross-contamination notice: Wingstop uses shared fryers. Even items
              without gluten ingredients can be exposed to gluten during preparation. Always inform
              staff of your dietary needs.
            </p>
          </div>
        </div>

        {/* ── Article body ── */}
        <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Is Wingstop Gluten-Free? Our Complete Guide
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              If you love Wingstop but follow a gluten-free diet, you probably have a lot of
              questions about what&apos;s safe to eat. Don&apos;t worry! This guide gives you all
              the answers in simple language, so you can enjoy your wings without the worry.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Does Wingstop Have Gluten-Free Options?
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-4">
              Yes, Wingstop does offer some gluten-free options. However, there are
              some things you need to know before you order.
            </p>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              Wingstop&apos;s gluten-free menu is not officially listed, and they don&apos;t
              guarantee that their food is free from gluten. That&apos;s because the kitchen uses
              shared fryers, and cross-contamination with gluten is possible. This
              means that even if an item does not contain gluten ingredients, it might still come
              into contact with gluten during preparation.
            </p>
          </section>

          {/* Section 3 – Wings */}
          <section id="wings">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Are Wingstop Wings Gluten-Free?
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-6">
              When it comes to Wingstop wings, there&apos;s good news and bad news.
            </p>

            <div className="space-y-4">
              {[
                {
                  q: 'Wingstop wings gluten free?',
                  a: 'Some wings are naturally gluten-free, especially if they are plain or seasoned with dry rubs. However, these wings are often cooked in shared fryers, which means they might get exposed to gluten from breaded foods.',
                },
                {
                  q: 'Are Wingstop wings gluten-free?',
                  a: "It's best to ask the staff to confirm that the wings are prepared in a way that minimizes cross-contamination.",
                },
                {
                  q: 'Does Wingstop have gluten-free wings?',
                  a: 'Yes, they do! Plain wings (without breading) and wings with some of the dry rubs are gluten-free. But again, the risk of cross-contamination exists due to shared equipment in the kitchen.',
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <p className="font-semibold text-[#006938] mb-2">{q}</p>
                  <p className="text-[#555] leading-7 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 – Safe menu */}
          <section id="safe-menu">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Wingstop Gluten-Free Menu Items
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-8">
              So, what can you safely eat from the Wingstop gluten-free menu? Here&apos;s a simple
              guide:
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Safe */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-green-600 shrink-0" size={22} />
                  <h3 className="font-bold text-green-800 uppercase tracking-wide text-sm">
                    Safe Gluten-Free Foods
                  </h3>
                </div>
                <ul className="space-y-3">
                  {safeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-green-900">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avoid */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="text-red-600 shrink-0" size={22} />
                  <h3 className="font-bold text-red-800 uppercase tracking-wide text-sm">
                    Foods to Avoid
                  </h3>
                </div>
                <ul className="space-y-3">
                  {avoidItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-red-900">
                      <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 – Ranch */}
          <section id="ranch">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Is Wingstop Ranch Gluten-Free?
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Not Gluten-Free
                </span>
              </div>
              <p className="text-[#444] leading-8 text-[1.05rem]">
                One of the most common questions is, &quot;Is Wingstop ranch gluten-free?&quot; The
                answer is no. Wingstop ranch dressing may contain gluten, so
                it&apos;s best to avoid it if you are strictly gluten-free. Always ask about other
                dipping sauces, as they may contain gluten as well.
              </p>
            </div>
          </section>

          {/* Section 6 – Fries */}
          <section id="fries">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Are Wingstop Fries Gluten-Free?
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Not Gluten-Free
                </span>
              </div>
              <p className="text-[#444] leading-8 text-[1.05rem]">
                Another common question is, &quot;Are Wingstop fries gluten-free?&quot;
                Unfortunately, no. Wingstop fries are cooked in shared fryers with
                breaded foods, so they are not gluten-free. If you&apos;re gluten-sensitive or have
                celiac disease, it&apos;s best to avoid fries altogether.
              </p>
            </div>
          </section>

          {/* Quick reference table */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 pb-3 border-b-2 border-[#006938]/10">
              Status for Every Menu Item
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#006938] text-white">
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Menu Item
                    </th>
                    <th className="text-center px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                      Gluten-Free?
                    </th>
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-wide text-xs hidden sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'Bone-in Wings (plain)', status: true, note: 'Shared fryer risk' },
                    { item: 'Boneless Wings', status: false, note: 'Breaded — contains gluten' },
                    { item: 'Dry Rub Wings (Cajun, Lemon Pepper)', status: true, note: 'Shared fryer risk' },
                    { item: 'Fries', status: false, note: 'Shared fryer with breaded items' },
                    { item: 'Ranch Dressing', status: false, note: 'Contains gluten' },
                    { item: 'Carrot & Celery Sticks', status: true, note: 'Naturally gluten-free' },
                    { item: 'Sodas & Unsweetened Teas', status: true, note: 'Gluten-free' },
                  ].map(({ item, status, note }, i) => (
                    <tr
                      key={item}
                      className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 font-medium text-[#1A1A1A]">{item}</td>
                      <td className="px-6 py-4 text-center">
                        {status ? (
                          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            <CheckCircle size={12} />
                            Yes*
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                            <XCircle size={12} />
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#666] hidden sm:table-cell">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">* Risk of cross-contamination from shared fryers. Ask staff about preparation methods.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 pb-3 border-b-2 border-[#006938]/10">
              Common Questions About Gluten-Free Options
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
              Final Thoughts
            </h2>
            <p className="text-[#444] leading-8 text-[1.05rem] mb-5">
              If you love Wingstop and follow a gluten-free diet, there are options — but you must
              be careful. While some wings and dry rubs are safe, the shared fryers and preparation
              areas increase the risk of cross-contamination with gluten.
            </p>
            <p className="text-[#444] leading-8 text-[1.05rem]">
              If you&apos;re unsure about any item, always ask the staff about the gluten content
              and preparation methods. Enjoy your wings safely, and always be cautious!
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#006938] to-[#004D28] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FDB913 1px, transparent 1px), radial-gradient(circle at 80% 50%, #FDB913 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-black mb-3">
                Need Full Nutrition Info?
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Use our free Wingstop Nutrition Calculator to check calories, macros, and
                allergens for every menu item.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
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
