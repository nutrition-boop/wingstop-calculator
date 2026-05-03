import type { Metadata } from 'next';
import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
export const metadata: Metadata = {
  title: 'Terms of Service | Wingstop Nutrition Calculator 2026',
  description: 'Read the terms of service governing the use of the Wingstop Nutrition Calculator.',
  openGraph: {
    title: 'Terms of Service | Wingstop Nutrition Calculator 2026',
    description: 'Read the terms of service governing the use of the Wingstop Nutrition Calculator.',
  },
  alternates: {
    canonical: 'https://wingstopcaloriecalculator.us/terms',
  },
};

export default function TermsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Use', href: '/terms', active: true },
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
              <Scale size={14} className="text-[#FDB913]" />
              Usage Agreement
            </span>

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter mb-6 uppercase italic">
              Terms of <span className="text-[#FDB913]">Service</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl font-medium">
              Effective Date: January 1, 2026. By using this website, you agree to the conditions outlined below.
            </p>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-gray-100 shadow-2xl shadow-gray-200/20 space-y-16">
          
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#006938]/10 text-[#006938] p-3 rounded-2xl shadow-sm"><FileText size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Acceptance of Terms</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>By accessing or using the Wingstop Nutrition Calculator website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must immediately stop using our site.</p>
            </div>
          </section>

          <section>
             <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FDB913]/10 text-[#FDB913] p-3 rounded-2xl shadow-sm"><Scale size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Use of calculations</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>The calculations provided on this site are estimates only. Users agree to:</p>
              <ul className="space-y-3">
                {[
                  'Verify nutritional data with official Wingstop sources',
                  'Not hold this site responsible for dietary errors',
                  'Use calculations for personal information purposes only',
                  'Respect third-party trademark rights (Wingstop names/logos)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#006938]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl shadow-sm"><AlertTriangle size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Limitation of Liability</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>In no event shall Wingstop Nutrition Calculator or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website or its data.</p>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
