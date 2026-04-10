import type { Metadata } from 'next';
import { ShieldCheck, Eye, Lock, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
export const metadata: Metadata = {
  title: 'Privacy Policy | Wingstop Nutrition Calculator 2026',
  description: 'Learn how we collect, use, and protect your data at Wingstop Nutrition Calculator.',
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy', active: true },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAF7] font-outfit">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] pt-32 pb-24 border-b-8 border-[#FDB913]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FDB913]/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-[#FDB913]" />
              Privacy & Data Security
            </span>

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter mb-6 uppercase italic">
              Privacy <span className="text-[#FDB913]">Policy</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl font-medium">
              Effective Date: January 1, 2026. Your privacy is our priority. We are committed to transparency in how we handle your data.
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <article className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-gray-100 shadow-2xl shadow-gray-200/20 space-y-16">
          
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#006938]/10 text-[#006938] p-3 rounded-2xl shadow-sm"><Eye size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Information Collection</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>We collect minimal information to provide the best possible experience on our calculator. This may include:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-[#006938]/20 transition-colors">
                  <h3 className="font-black text-[#006938] text-sm uppercase mb-2">Usage Data</h3>
                  <p className="text-sm">IP addresses, browser types, and timestamp data to analyze traffic.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-[#006938]/20 transition-colors">
                  <h3 className="font-black text-[#006938] text-sm uppercase mb-2">Cookies</h3>
                  <p className="text-sm">Small files stored locally to help remember your meal tracker sessions.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
             <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FDB913]/10 text-[#FDB913] p-3 rounded-2xl shadow-sm"><ShieldCheck size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">How We Use Your Data</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>The information we collect is strictly used to:</p>
              <ul className="space-y-3">
                {[
                  'Personalize nutrition calculations',
                  'Maintain security and prevent bot traffic',
                  'Optimize site performance and loading speeds',
                  'Serve relevant advertisements via Google AdSense'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FDB913]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl shadow-sm"><Lock size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Third Party Disclosure</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>We do not sell or trade your personal information. However, third-party services (like Google Analytics and AdSense) may use cookies to serve ads based on your visit to this and other websites.</p>
              <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[2rem]">
                 <p className="text-sm italic">"Users may opt out of personalized advertising by visiting Google's Ads Settings or <Link href="https://www.aboutads.info" target="_blank" className="font-black text-blue-600 hover:underline inline-flex items-center gap-1 uppercase tracking-widest text-[10px]">YourAdChoices <ChevronRight size={10} /></Link>"</p>
              </div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
