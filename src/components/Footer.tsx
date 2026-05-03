'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Premium Social Icons - Custom SVGs for maximum compatibility and quality
const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      <circle cx="9" cy="16" r="4" />
    </svg>
  )
};

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    {
      title: 'MENU',
      items: [
        { label: 'Full Menu', href: '/menu' },
        { label: 'Gluten Free', href: '/wingstop-gluten-free' },
        { label: 'Allergen Menu', href: '/allergen-menu' }
      ]
    },
    {
      title: 'INFORMATION',
      items: [
        { label: 'Store Hours', href: '/hours' },
        { label: 'Holiday Hours', href: '/holiday-hours' },
        { label: 'Locations', href: '/locations' },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Terms of Use', href: '/terms' }
      ]
    },
  ];

  return (
    <footer className="relative bg-primary text-white pt-32 pb-16 overflow-hidden font-outfit border-t-8 border-secondary">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grain" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col -space-y-1">
              <span className="text-4xl font-black italic tracking-tighter leading-none uppercase">
                WING<span className="text-secondary">STOP</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.5em] text-white/50 leading-none">
                NUTRITION CALCULATOR
              </span>
            </div>
            <p className="text-white/60 text-sm font-medium leading-relaxed max-w-sm">
              Your primary resource for tracking Wingstop calories and macros. Build your meal, check your facts, and fuel your flavor with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: SocialIcons.Facebook, href: 'https://www.facebook.com/Wingstop' },
                { Icon: SocialIcons.Instagram, href: 'https://www.instagram.com/wingstop/' },
                { Icon: SocialIcons.X, href: 'https://x.com/wingstop' },
                { Icon: SocialIcons.YouTube, href: 'https://www.youtube.com/wingstop' },
                { Icon: SocialIcons.TikTok, href: 'https://www.tiktok.com/@wingstop' }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="group relative bg-white/5 p-3 rounded-2xl hover:bg-secondary transition-all duration-300 border border-white/5 hover:border-secondary/20 overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-white group-hover:text-primary transition-colors relative z-10 w-5 h-5 flex items-center justify-center">
                    <item.Icon />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-secondary">{section.title}</h4>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-white/50 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO / Official Footer Line */}
        <div className="mb-12 py-8 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest italic">
              This is a <span className="text-secondary">Fan Made site</span> and all menu images are official Wingstop assets.
            </p>
          </div>
          <a href="https://www.wingstop.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white">
            Visit Official Site <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-white/5 rounded-[2rem] p-10 border border-white/10 mb-16">
          <p className="text-[10px] text-white/40 leading-relaxed text-center uppercase tracking-widest font-black italic">
            Disclaimer: Nutrition information is provided by Wingstop and is approximate. Values may vary based on portion sizes and preparation. We recommend consulting a healthcare professional for specific dietary needs. This site is an independently developed tool and is not officially affiliated with Wingstop Restaurants Inc.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12">
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">
            © {currentYear} WingstopCal <span className="mx-2 text-secondary/30">•</span> ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Flavor Certified 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
