import type { Metadata } from 'next';
import { AlertTriangle, ShieldAlert, FileWarning, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
export const metadata: Metadata = {
  title: 'Disclaimer | Wingstop Nutrition Calculator 2026',
  description: 'Important legal and medical disclaimers regarding the Wingstop Nutrition Calculator website.',
  openGraph: {
    title: 'Disclaimer | Wingstop Nutrition Calculator 2026',
    description: 'Important legal and medical disclaimers regarding the Wingstop Nutrition Calculator website.',
  },
  alternates: {
    canonical: 'https://wingstopcaloriecalculator.us/disclaimer',
  },
};

export default function DisclaimerPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Disclaimer', href: '/disclaimer', active: true },
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
              <AlertTriangle size={14} className="text-[#FDB913]" />
              Legal Information
            </span>

            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter mb-6 uppercase italic">
              Legal <span className="text-[#FDB913]">Disclaimer</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl font-medium">
              Effective Date: January 1, 2026. This website is an independent tool for informational purposes only.
            </p>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-gray-100 shadow-2xl shadow-gray-200/20 space-y-16">
          
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#006938]/10 text-[#006938] p-3 rounded-2xl shadow-sm"><FileWarning size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Not Officially Affiliated</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>This website is an independent tool created to help users calculate nutritional values based on publicly available data about Wingstop food items. We are <strong className="text-gray-900 font-black">NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with Wingstop Inc.</p>
              <p>The name "Wingstop" as well as related names, marks, emblems and images are registered trademarks of their respective owners.</p>
            </div>
          </section>

          <section>
             <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FDB913]/10 text-[#FDB913] p-3 rounded-2xl shadow-sm"><ShieldAlert size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Health & Nutrition Disclaimer</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>The nutritional information provided on this site is an estimate. It may not reflect exact calories, macros, or allergens of the food served at individual restaurants due to variations in preparation size or ingredient supplies.</p>
              <div className="p-8 bg-red-50 text-red-800 rounded-[2rem] border border-red-100 font-bold overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[50px] rounded-full -mr-16 -mt-16" />
                <div className="flex items-start gap-4">
                  <AlertTriangle size={24} className="shrink-0 mt-1" />
                  <p>
                    If you have a severe food allergy or strict medical dietary requirement, please consult official Wingstop resources or speak directly with restaurant staff. For medical advice, consult a qualified health professional.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-slate-50 text-slate-500 p-3 rounded-2xl shadow-sm"><HelpCircle size={24} /></div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight italic">Accuracy of Data</h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg ml-2">
              <p>While we strive for 100% accuracy, menu items, prices, and nutritional facts can change without notice. We provide this tool "as is" and make no warranties about the completeness or reliability of the information.</p>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
