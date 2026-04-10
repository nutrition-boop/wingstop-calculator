'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '@/lib/store/calculator';
import { menuItems } from '@/lib/data/menu';
import {
  Plus, Minus, Search, Trash2, Zap, Flame,
  ShoppingCart, Target, Activity, Copy, Check,
  ChevronDown, Beef, Trophy, Sandwich, Leaf, Droplet, Package,
  UtensilsCrossed, Dumbbell, Bike, PersonStanding, Waves,
  MapPin, AlertTriangle, Menu, Shield, Hash
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Constants ────────────────────────────────────────────────────────────────

const DIET_MODES = [
  { id: 'standard', label: 'Standard', goal: 2000, protein: 50, carbs: 250, fat: 78 },
  { id: 'keto', label: 'Keto', goal: 1800, protein: 100, carbs: 25, fat: 140 },
  { id: 'bulk', label: 'Bulk', goal: 2800, protein: 175, carbs: 350, fat: 95 },
  { id: 'cut', label: 'Cut', goal: 1500, protein: 150, carbs: 100, fat: 55 },
];

const BURN_EQUIV = [
  { label: 'Running', calPerMin: 11, Icon: Dumbbell },
  { label: 'Cycling', calPerMin: 8, Icon: Bike },
  { label: 'Swimming', calPerMin: 9, Icon: Waves },
  { label: 'Walking', calPerMin: 5, Icon: PersonStanding },
];

const categories = [
  { id: 'all', name: 'All', Icon: Zap },
  { id: 'add-ons', name: 'Add Ons', Icon: ShoppingCart },
  { id: 'combos', name: 'Combos', Icon: Package },
  { id: 'by-the-piece', name: 'Wings', Icon: Beef },
  { id: 'tenders', name: 'Tenders', Icon: Trophy },
  { id: 'sandwiches', name: 'Sandwich', Icon: Sandwich },
  { id: 'sides', name: 'Sides', Icon: UtensilsCrossed },
  { id: 'drinks', name: 'Drinks', Icon: Droplet },
];

const ITEMS_PER_PAGE = 12;

// ─── Macro Bar ────────────────────────────────────────────────────────────────

function MacroBar({ label, value, goal, color }: { label: string; value: number; goal: number; color: string }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const over = value > goal;
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
        <span className={`text-[10px] font-black ${over ? 'text-red-500' : 'text-gray-400'}`}>
          {value}g / {goal}g
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${over ? 'bg-red-400' : color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ─── Category Tab Strip ───────────────────────────────────────────────────────

function CategoryTabs({ active, onChange, compact = false }: {
  active: string;
  onChange: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex gap-2 overflow-x-auto no-scrollbar ${compact ? 'py-2' : 'pb-1'}`}>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 font-black uppercase tracking-wider
            ${compact
              ? 'px-3 py-2 rounded-xl text-[9px]'
              : 'px-4 py-2.5 rounded-xl text-[10px]'}
            ${active === cat.id
              ? 'bg-primary text-white shadow-md shadow-primary/20'
              : 'bg-white/80 text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
        >
          <cat.Icon size={compact ? 10 : 12} />
          {cat.name}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Calculator() {
  const {
    selectedItems, totalCalories, totalProtein, totalCarbs, totalFat, totalSodium,
    addItem, removeItem, clearItems
  } = useCalculatorStore();

  const [activeCategory, setActiveCategory] = useState('by-the-piece');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiet, setActiveDiet] = useState(DIET_MODES[0]);
  const [copied, setCopied] = useState(false);
  const [showBurn, setShowBurn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showBottomTabs, setShowBottomTabs] = useState(false);

  const gridEndRef = useRef<HTMLDivElement>(null);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  // Intersection observer: show bottom tabs when grid end is visible
  useEffect(() => {
    const el = gridEndRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBottomTabs(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const getItemQuantity = (id: string) => selectedItems.find(si => si.item.id === id)?.quantity || 0;

  const calPct = Math.min(100, Math.round((totalCalories / activeDiet.goal) * 100));
  const calOver = totalCalories > activeDiet.goal;

  const handleCopy = useCallback(() => {
    if (!selectedItems.length) return;
    const lines = selectedItems.map(si => `${si.item.name} x${si.quantity} — ${si.item.calories * si.quantity} kcal`);
    const text = [
      '🍗 Wingstop Nutrition Summary',
      '─────────────────────────',
      ...lines,
      '─────────────────────────',
      `Total: ${totalCalories} kcal | Protein: ${totalProtein}g | Carbs: ${totalCarbs}g | Fat: ${totalFat}g`,
      'Calculated via WingstopCalculator.com'
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [selectedItems, totalCalories, totalProtein, totalCarbs, totalFat]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    // Scroll to calculator top on mobile when switching category
    const el = document.getElementById('calculator');
    if (el && window.innerWidth < 1024) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4" id="calculator">
      {/* ─── Diet Mode Selector ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10">
        {DIET_MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveDiet(mode)}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all
              ${activeDiet.id === mode.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                : 'bg-white text-gray-400 border border-gray-100 hover:border-primary/30'}`}
          >
            <span className="hidden sm:inline">{mode.label} Goal ({mode.goal} kcal)</span>
            <span className="sm:hidden">{mode.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ─── Left: Menu Grid ──────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">

          {/* Search + Filter header */}
          <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-gray-100/50 border border-gray-50">
            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="Search any Wingstop item..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); }}
                className="w-full bg-gray-50 rounded-2xl py-3.5 pl-12 pr-5 text-sm font-bold placeholder-gray-300 border-0 focus:ring-4 focus:ring-primary/10 transition-all"
              />
            </div>
            {/* Category tabs */}
            <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />
          </div>

          {/* Items Grid — green bg */}
          <div className="bg-primary/[0.06] rounded-[2rem] p-4 sm:p-6 border border-primary/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => {
                  const qty = getItemQuantity(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`group bg-white rounded-[1.5rem] p-5 shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                        ${qty > 0 ? 'border-primary/40 ring-2 ring-primary/10' : 'border-white'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-3">
                          <Link
                            href={`/menu/${item.slug}`}
                            className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 mb-1 block hover:text-primary transition-colors"
                          >
                            {item.category} ↗
                          </Link>
                          <p className="text-sm font-black tracking-tight text-gray-900 group-hover:text-primary transition-colors leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-gray-300 mt-1 font-semibold">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col items-center bg-gray-50 rounded-xl p-1 gap-1 border border-gray-100">
                          <button
                            onClick={() => addItem(item)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-white transition-all bg-white shadow-sm active:scale-90"
                          >
                            <Plus size={16} strokeWidth={3} />
                          </button>
                          {qty > 0 && (
                            <>
                              <span className="text-xs font-black text-gray-900 w-full text-center leading-none py-0.5">{qty}</span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1 pt-3 border-t border-gray-50">
                        {[
                          { label: 'CAL', val: item.calories, color: 'text-orange-500' },
                          { label: 'PRO', val: `${item.protein}g`, color: 'text-emerald-500' },
                          { label: 'CARB', val: `${item.carbs}g`, color: 'text-blue-500' },
                          { label: 'FAT', val: `${item.fat}g`, color: 'text-rose-500' },
                        ].map((s, i) => (
                          <div key={i} className="text-center">
                            <p className={`text-xs font-black ${s.color}`}>{s.val}</p>
                            <p className="text-[8px] font-black text-gray-300 uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {visibleItems.length === 0 && (
                  <div className="col-span-full py-16 text-center bg-white/60 rounded-[1.5rem]">
                    <Search size={32} className="mx-auto text-gray-200 mb-3" />
                    <p className="text-sm font-bold text-gray-300">No items found for "{searchQuery}"</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Grid end sentinel for intersection observer */}
            <div ref={gridEndRef} className="h-1" />

            {/* Load More OR end-of-list bottom tabs */}
            {filteredItems.length > 0 && (
              <div className="mt-6 space-y-4">
                {hasMore ? (
                  <button
                    onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/20 text-primary/60 font-black text-[11px] uppercase tracking-widest hover:border-primary/40 hover:text-primary hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronDown size={16} />
                    Load More ({filteredItems.length - visibleCount} remaining)
                  </button>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest mb-4">
                      All {filteredItems.length} items shown · Switch category below
                    </p>
                    {/* Bottom category tabs — always visible at end of list */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-primary/10">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Browse Another Category</p>
                      <CategoryTabs active={activeCategory} onChange={handleCategoryChange} compact />
                    </div>
                  </div>
                )}

                {/* Full menu link */}
                <Link
                  href="/menu"
                  className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  <Menu size={12} />
                  View Full Menu with Prices
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ─── Right: Nutrition Summary ──────────────────────────────────── */}
        <div id="calculator-results" className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">

          {/* Main Summary Card */}
          <div className="bg-white rounded-[2rem] p-7 shadow-2xl shadow-gray-200/30 border border-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03]">
              <ShoppingCart size={140} className="text-primary translate-x-8 -translate-y-4" />
            </div>

            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-sm font-black tracking-widest text-gray-900 uppercase flex items-center gap-2">
                <ShoppingCart size={14} className="text-primary" />
                Meal Summary
              </h2>
              <button
                onClick={clearItems}
                className="flex items-center gap-1.5 text-[10px] font-black text-gray-300 hover:text-red-400 transition-colors uppercase tracking-wider"
              >
                <Trash2 size={11} />Reset
              </button>
            </div>

            {/* Selected Items */}
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 mb-6 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {selectedItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-3">
                      <Beef size={24} className="text-primary/30" />
                    </div>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Add items to start</p>
                  </div>
                ) : (
                  selectedItems.map((si) => (
                    <motion.div
                      key={si.item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      {si.item.image && (
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 mr-3 border border-gray-100">
                          <Image src={si.item.image} alt={si.item.name} width={40} height={40} className="w-full h-full object-contain p-0.5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-gray-800 leading-tight truncate">{si.item.name}</p>
                        <p className="text-[9px] font-bold text-primary/60 mt-0.5">
                          {si.item.calories * si.quantity} kcal · ×{si.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(si.item.id)}
                        className="ml-2 w-8 h-8 flex items-center justify-center rounded-xl text-gray-300 hover:bg-red-50 hover:text-red-400 transition-all shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Calorie display */}
            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-[1.5rem] p-5 mb-5 border border-primary/5">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 mb-2 text-center">Total Calories</p>
              <div className="text-center mb-4">
                <motion.span
                  key={totalCalories}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-5xl font-black italic tracking-tighter leading-none ${calOver ? 'text-red-500' : 'text-primary'}`}
                >
                  {totalCalories}
                </motion.span>
                <span className="text-sm font-bold text-primary/30 ml-1.5 italic">kcal</span>
              </div>

              {/* Goal Progress */}
              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Daily Goal ({activeDiet.label})</span>
                  <span className={`text-[9px] font-black ${calOver ? 'text-red-500' : 'text-gray-400'}`}>{calPct}%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className={`h-full rounded-full ${calOver ? 'bg-red-400' : 'bg-gradient-to-r from-primary to-emerald-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calPct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Macro Bars */}
              <div className="space-y-2.5 pt-3 border-t border-white/50">
                <MacroBar label="Protein" value={totalProtein} goal={activeDiet.protein} color="bg-emerald-400" />
                <MacroBar label="Carbs" value={totalCarbs} goal={activeDiet.carbs} color="bg-blue-400" />
                <MacroBar label="Fat" value={totalFat} goal={activeDiet.fat} color="bg-rose-400" />
              </div>
            </div>

            {/* Macro Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { label: 'Protein', val: totalProtein, unit: 'g', color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: Dumbbell },
                { label: 'Carbs', val: totalCarbs, unit: 'g', color: 'text-blue-600', bg: 'bg-blue-50', Icon: Zap },
                { label: 'Fat', val: totalFat, unit: 'g', color: 'text-rose-600', bg: 'bg-rose-50', Icon: Flame },
                { label: 'Sodium', val: totalSodium, unit: 'mg', color: 'text-amber-600', bg: 'bg-amber-50', Icon: Hash },
              ].map((s, i) => (
                <div key={i} className={`${s.bg} rounded-2xl p-3.5 flex items-center gap-3`}>
                  <s.Icon size={16} className={s.color} />
                  <div>
                    <p className={`text-lg font-black leading-none ${s.color}`}>{s.val}<span className="text-[10px]">{s.unit}</span></p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy Summary */}
            <button
              onClick={handleCopy}
              disabled={!selectedItems.length}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
                ${selectedItems.length ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-95' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            >
              {copied ? <><Check size={14} />Copied to Clipboard!</> : <><Copy size={14} />Copy Nutrition Summary</>}
            </button>
          </div>

          {/* Calorie Burn Equivalents */}
          {totalCalories > 0 && (
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
              <button
                onClick={() => setShowBurn(!showBurn)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-orange-50 rounded-xl">
                    <Activity size={16} className="text-orange-500" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-700">Burn Equivalent</span>
                </div>
                <ChevronDown size={14} className={`text-gray-300 transition-transform ${showBurn ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showBurn && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-2 gap-3">
                      {BURN_EQUIV.map(b => {
                        const mins = Math.round(totalCalories / b.calPerMin);
                        const hrs = Math.floor(mins / 60);
                        const remaining = mins % 60;
                        return (
                          <div key={b.label} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-2">
                              <b.Icon size={18} className="text-primary" />
                            </div>
                            <p className="text-sm font-black text-gray-800">
                              {hrs > 0 ? `${hrs}h ${remaining}m` : `${mins} min`}
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-0.5">{b.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">Quick Links</p>
            <div className="space-y-1">
              {[
                { href: '/menu', Icon: Menu, label: 'Full Menu & Prices', color: 'text-primary' },
                { href: '/wingstop-gluten-free', Icon: Leaf, label: 'Gluten Free Options', color: 'text-emerald-500' },
                { href: '/allergen-menu', Icon: AlertTriangle, label: 'Allergen Info', color: 'text-amber-500' },
                { href: '/locations', Icon: MapPin, label: 'Find a Location', color: 'text-rose-500' },
              ].map(lnk => (
                <Link
                  key={lnk.href}
                  href={lnk.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <lnk.Icon size={14} className={lnk.color} />
                  <span className="text-[11px] font-black text-gray-600 group-hover:text-primary transition-colors uppercase tracking-wide">{lnk.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile Floating Bottom Category Bar ─────────────────────────── */}
      {/* Shows on mobile only, fixed at bottom, always visible while in calculator section */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <AnimatePresence>
          {showBottomTabs && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl shadow-black/10 px-4 pt-3 pb-safe"
            >
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2 text-center">Browse Category</p>
              <CategoryTabs active={activeCategory} onChange={handleCategoryChange} compact />
              <div className="h-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
