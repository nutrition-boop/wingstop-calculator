'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, Utensils, Tag, MapPin, Leaf, Home, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    {
      name: 'Menu',
      href: '/menu',
      icon: Utensils,
      subItems: [
        { name: 'Wing Combos', href: '/menu/combos' },
        { name: 'Wing Deals', href: '/menu/deals' },
        { name: 'Group Packs', href: '/menu/group-packs' },
        { name: 'By The Piece', href: '/menu/by-the-piece' },
        { name: 'Chicken Tenders', href: '/menu/tenders' },
        { name: 'Chicken Sandwiches', href: '/menu/sandwiches' },
        { name: 'Sides', href: '/menu/sides' },
        { name: 'Dips & Flavors', href: '/menu/dips' },
        { name: 'Drinks', href: '/menu/drinks' },
        { name: 'Desserts', href: '/menu/desserts' },
      ]
    },
    { name: 'Calculator', href: '/#calculator', icon: Calculator },
    { name: 'Locations', href: '/locations', icon: MapPin },
    { name: 'Allergens', href: '/allergen-menu', icon: Utensils },
    { name: 'Gluten Free', href: '/wingstop-gluten-free', icon: Leaf },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 font-outfit bg-white ${scrolled ? 'py-3 shadow-xl border-b border-transparent' : 'py-4 shadow-sm border-b border-gray-100'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all duration-300">
              <Calculator size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black italic tracking-tighter text-primary leading-none uppercase">
                WING<span className="text-secondary">STOP</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60 leading-none">
                CALCULATOR
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group/nav">
                <Link
                  href={item.href}
                  className="nav-link px-5 py-2 text-gray-900 flex items-center gap-2 group-hover/nav:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  {item.name}
                  {item.subItems && (
                    <X size={12} className="rotate-45 transition-transform group-hover/nav:rotate-180" />
                  )}
                </Link>

                {item.subItems && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 min-w-[240px] grid grid-cols-1 gap-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-4 py-2.5 rounded-xl hover:bg-gray-50 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-primary transition-all flex items-center justify-between group/sub"
                        >
                          {sub.name}
                          <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-3 bg-gray-50 rounded-2xl text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl transition-all duration-500 overflow-y-auto ${isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <nav className="p-6 space-y-3">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-3">
                <Link
                  href={item.href}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gray-50 text-[11px] font-black uppercase tracking-widest text-gray-900 border border-transparent hover:border-primary/20 hover:bg-white transition-all"
                  onClick={() => !item.subItems && setIsOpen(false)}
                >
                  <item.icon size={18} className="text-primary" />
                  {item.name}
                </Link>

                {item.subItems && (
                  <div className="grid grid-cols-2 gap-2 pl-4">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="px-4 py-3 rounded-xl bg-white border border-gray-100 text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
