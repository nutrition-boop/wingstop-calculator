import Link from 'next/link';
import { Home, Search, Utensils, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FAF7] font-outfit flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[180px] font-black text-gray-100 leading-none select-none pointer-events-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#006938] to-[#004D28] flex items-center justify-center shadow-2xl shadow-[#006938]/30">
              <Search size={40} className="text-[#FDB913]" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed max-w-md mx-auto mb-10">
          Looks like this page flew the coop. The URL you visited doesn&apos;t exist or may have been moved.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/', icon: Home, label: 'Home', sub: 'Nutrition Calculator' },
            { href: '/menu', icon: Utensils, label: 'Menu', sub: 'All items & prices' },
            { href: '/locations', icon: MapPin, label: 'Locations', sub: 'Find a Wingstop' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#006938]/5 flex items-center justify-center group-hover:bg-[#006938] transition-colors">
                <item.icon size={22} className="text-[#006938] group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-black text-gray-900 uppercase tracking-wide">{item.label}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.sub}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#006938] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#006938]/25 hover:bg-[#004D28] hover:scale-105 active:scale-95 transition-all"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
