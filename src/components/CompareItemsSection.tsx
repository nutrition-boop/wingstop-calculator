'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, MenuItem } from '@/lib/data/menu';
import Image from 'next/image';
import { 
  ArrowRightLeft, 
  Search, 
  Zap, 
  ShieldCheck, 
  Info, 
  Flame, 
  DollarSign,
  ChevronDown,
  CheckCircle2,
  X
} from 'lucide-react';

interface CompareItemsSectionProps {
  baseItem: MenuItem;
}

export default function CompareItemsSection({ baseItem }: CompareItemsSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const comparedItem = useMemo(() => 
    menuItems.find(item => item.id === selectedId) || null
  , [selectedId]);

  const filteredItems = useMemo(() => 
    menuItems
      .filter(item => item.id !== baseItem.id)
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  , [searchQuery, baseItem.id]);

  const getComparisonColor = (val1: number, val2: number, type: 'lower' | 'higher' = 'lower') => {
    if (val1 === val2) return 'text-slate-400';
    if (type === 'lower') {
      return val1 < val2 ? 'text-emerald-500' : 'text-rose-500';
    }
    return val1 > val2 ? 'text-emerald-500' : 'text-rose-500';
  };

  const getComparisonBg = (val1: number, val2: number, type: 'lower' | 'higher' = 'lower') => {
    if (val1 === val2) return 'bg-slate-50';
    if (type === 'lower') {
      return val1 < val2 ? 'bg-emerald-50' : 'bg-rose-50';
    }
    return val1 > val2 ? 'bg-emerald-50' : 'bg-rose-50';
  };

  const stats = [
    { label: 'Calories', key: 'calories', unit: 'kcal', icon: Zap, type: 'lower' as const },
    { label: 'Protein', key: 'protein', unit: 'g', icon: ShieldCheck, type: 'higher' as const },
    { label: 'Carbs', key: 'carbs', unit: 'g', icon: Info, type: 'lower' as const },
    { label: 'Fats', key: 'fat', unit: 'g', icon: Flame, type: 'lower' as const },
    { label: 'Price', key: 'price', unit: '$', icon: DollarSign, type: 'lower' as const },
  ];

  return (
    <div className="mt-16">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group hover:border-primary/30 transition-all text-left"
      >
        <div className="flex items-center space-x-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'}`}>
            <ArrowRightLeft size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-dark uppercase tracking-tight">Compare This Item</h2>
            <p className="text-slate-500 font-medium text-sm">Select another menu item to see a side-by-side nutrition breakdown.</p>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.section
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 translate-y-1/4 -translate-x-1/4" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
              <div className="hidden lg:block">
                <h3 className="text-xl font-black text-dark uppercase tracking-tight">Item Selector</h3>
                <p className="text-slate-500 text-sm font-medium">Find an item to see how it stacks up.</p>
              </div>

              {/* Searchable Dropdown */}
              <div className="relative w-full lg:w-96">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search item to compare..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary/40 outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedId(null);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                  {!searchQuery && (
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  )}
                </div>

                <AnimatePresence>
                  {isDropdownOpen && filteredItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="max-h-80 overflow-y-auto">
                        {filteredItems.map(item => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setSelectedId(item.id);
                              setSearchQuery(item.name);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0"
                          >
                            <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                              {item.image && (
                                <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 leading-tight">{item.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-0 items-stretch bg-slate-50/50 rounded-[2rem] border border-slate-100 p-6 lg:p-0">
              
              {/* Base Item Card */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 lg:p-12 text-center bg-white lg:bg-transparent rounded-[2rem] lg:rounded-none lg:border-r border-slate-100">
                <div className="relative w-40 h-40 lg:w-56 lg:h-56 mb-8 drop-shadow-2xl">
                  <Image src={baseItem.image || '/images/menu/wings.png'} alt={baseItem.name} fill className="object-contain" />
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3">Current Item</span>
                <h3 className="text-2xl font-black text-dark tracking-tight leading-tight">{baseItem.name}</h3>
              </div>

              {/* Comparison Stats - Desktop version */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center py-12 gap-8 z-10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mb-1">
                      <stat.icon size={18} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Compared Item Card */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 lg:p-12 text-center bg-white lg:bg-transparent rounded-[2rem] lg:rounded-none lg:border-l border-slate-100 relative">
                <AnimatePresence mode="wait">
                  {comparedItem ? (
                    <motion.div
                      key={comparedItem.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full flex flex-col items-center"
                    >
                      <div className="relative w-40 h-40 lg:w-56 lg:h-56 mb-8 drop-shadow-2xl">
                        <Image src={comparedItem.image || '/images/menu/wings.png'} alt={comparedItem.name} fill className="object-contain" />
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3">Comparison</span>
                      <h3 className="text-2xl font-black text-dark tracking-tight leading-tight">{comparedItem.name}</h3>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 py-12">
                      <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
                        <Search size={32} />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-widest">Select an item above</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="mt-8 space-y-4">
              {stats.map((stat, idx) => {
                const val1 = (baseItem as any)[stat.key] || 0;
                const val2 = comparedItem ? ((comparedItem as any)[stat.key] || 0) : null;
                
                return (
                  <div key={idx} className="grid grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-0 items-center">
                    {/* Value 1 */}
                    <div className={`lg:col-span-3 p-6 rounded-2xl lg:rounded-none flex items-center justify-center lg:justify-end gap-3 transition-all duration-500
                      ${comparedItem ? getComparisonBg(val1, val2!, stat.type) : 'bg-slate-50'}`}
                    >
                      <div className="text-right">
                        <p className={`text-2xl font-black italic tracking-tighter leading-none ${comparedItem ? getComparisonColor(val1, val2!, stat.type) : 'text-slate-900'}`}>
                          {stat.key === 'price' ? `$${val1.toFixed(2)}` : val1}
                          <span className="text-[10px] not-italic ml-1 uppercase">{stat.unit}</span>
                        </p>
                      </div>
                      {comparedItem && val1 === (stat.type === 'lower' ? Math.min(val1, val2!) : Math.max(val1, val2!)) && val1 !== val2 && (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      )}
                    </div>

                    {/* Label (Mobile only) */}
                    <div className="lg:hidden col-span-2 flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">
                        <stat.icon size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                      </div>
                    </div>

                    {/* Spacer / Legend */}
                    <div className="hidden lg:flex lg:col-span-1 border-y border-slate-100 h-full items-center justify-center bg-white text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      VS
                    </div>

                    {/* Value 2 */}
                    <div className={`lg:col-span-3 p-6 rounded-2xl lg:rounded-none flex items-center justify-center lg:justify-start gap-3 transition-all duration-500
                      ${comparedItem ? getComparisonBg(val2!, val1, stat.type) : 'bg-slate-50'}`}
                    >
                      {comparedItem && val2 === (stat.type === 'lower' ? Math.min(val1, val2!) : Math.max(val1, val2!)) && val1 !== val2 && (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      )}
                      <div className="text-left">
                        <p className={`text-2xl font-black italic tracking-tighter leading-none ${comparedItem ? getComparisonColor(val2!, val1, stat.type) : 'text-slate-300'}`}>
                          {comparedItem ? (stat.key === 'price' ? `$${val2!.toFixed(2)}` : val2) : '—'}
                          {comparedItem && <span className="text-[10px] not-italic ml-1 uppercase">{stat.unit}</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bonus Tip */}
            <AnimatePresence>
              {comparedItem && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 overflow-hidden"
                >
                  <div className="bg-primary/5 rounded-[1.5rem] p-6 flex items-start gap-4 border border-primary/10">
                    <div className="p-3 bg-white rounded-2xl text-primary shadow-sm">
                      <div className="relative w-6 h-6">
                        <Info size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-dark uppercase tracking-wide mb-1">Quick Insight</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {baseItem.calories < comparedItem.calories 
                          ? `Choosing ${baseItem.name} saves you ${comparedItem.calories - baseItem.calories} calories compared to ${comparedItem.name}.`
                          : `Switching to ${comparedItem.name} would save you ${baseItem.calories - comparedItem.calories} calories per serving.`}
                        {baseItem.protein > comparedItem.protein && ` Plus, it offers ${Math.round(baseItem.protein - comparedItem.protein)}g more protein!`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
