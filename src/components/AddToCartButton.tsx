'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Plus, Check, ArrowRight } from 'lucide-react';
import { useCalculatorStore } from '@/lib/store/calculator';
import { MenuItem } from '@/lib/data/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  item: MenuItem;
}

export default function AddToCartButton({ item }: AddToCartButtonProps) {
  const addItem = useCalculatorStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    addItem(item);
    setIsAdded(true);
    
    // Short delay to show the "Added!" state before redirecting
    setTimeout(() => {
      router.push('/#calculator');
    }, 800);
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={handleAdd}
        className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-[#006938] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-900/20 hover:bg-[#00522B] hover:-translate-y-1 active:scale-95 transition-all duration-300 overflow-hidden"
      >
        {/* Animated Background Shine */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
        
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.div
              key="added"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={18} strokeWidth={3} className="text-emerald-400" />
              <span>Added!</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <Calculator size={18} className="group-hover:rotate-12 transition-transform" />
                <Plus size={10} className="absolute -top-1 -right-1 bg-[#006938] rounded-full ring-1 ring-white" />
              </div>
              <span>Add to Calculator</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isAdded && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <Link 
              href="/#calculator" 
              className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[11px] hover:underline whitespace-nowrap"
            >
              View Tracker <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Adds instantly to your meal tracker
      </p>

      <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}
