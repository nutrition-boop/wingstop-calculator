'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '@/lib/store/calculator';
import { Flame, ChevronRight } from 'lucide-react';

export default function FloatingTracker() {
  const { totalCalories, totalProtein, selectedItems } = useCalculatorStore();
  const [isVisible, setIsVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  // Only show the button when user has scrolled away from the results section
  useEffect(() => {
    const handleScroll = () => {
      const results = document.getElementById('calculator-results');
      if (!results) return;

      const rect = results.getBoundingClientRect();
      // Show floating button only when results panel is NOT visible in viewport
      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      setIsVisible(isOutOfView && selectedItems.length > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedItems.length]);

  // Pulse the label on first appearance to guide user
  useEffect(() => {
    if (isVisible) {
      setShowLabel(true);
      const t = setTimeout(() => setShowLabel(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  const scrollToResults = () => {
    const el = document.getElementById('calculator-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 60 }}
          transition={{ type: 'spring', damping: 18, stiffness: 200 }}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[150]"
        >
          <div className="relative group flex items-center gap-3">

            {/* Label tooltip (auto-shows for 3s, then on hover) */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={scrollToResults}
                  className="flex items-center gap-2 bg-gray-900 text-white pl-4 pr-3 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-2xl cursor-pointer hover:bg-primary transition-colors"
                >
                  <span>{totalCalories} kcal · {totalProtein}g protein</span>
                  <ChevronRight size={13} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main floating button */}
            <button
              onClick={scrollToResults}
              className="relative focus:outline-none"
              aria-label="View nutrition results"
            >
              {/* Pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-primary"
              />

              {/* Circle */}
              <div className="relative w-[68px] h-[68px] sm:w-20 sm:h-20 bg-primary text-white rounded-full flex flex-col items-center justify-center shadow-2xl shadow-primary/40 border-4 border-white group-hover:bg-[#005a30] transition-colors overflow-hidden">
                <Flame size={14} className="text-secondary mb-0.5" />
                <motion.span
                  key={totalCalories}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-base sm:text-lg font-black italic tracking-tighter leading-none"
                >
                  {totalCalories}
                </motion.span>
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-60">KCAL</span>

                {/* Shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-full group-hover:translate-x-[-150%] transition-transform duration-700" />
              </div>

              {/* Item count badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-primary rounded-full flex items-center justify-center text-[9px] font-black shadow">
                {selectedItems.length}
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
