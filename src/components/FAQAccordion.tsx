'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      className={`border border-[#006938]/20 rounded-[1.5rem] mb-4 overflow-hidden transition-all duration-300 relative ${
        isOpen 
          ? 'bg-[#006938] shadow-[0_12px_40px_rgba(0,105,56,0.3)]' 
          : 'bg-[#006938] hover:bg-[#005a30] hover:shadow-xl'
      }`}
    >
      {/* Subtle indicator line */}
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300 ${isOpen ? 'bg-[#FDB913]' : 'bg-[#FDB913]/30'}`} />
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 sm:p-8 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className={`text-base sm:text-lg font-black tracking-wide transition-colors duration-300 pl-2 text-white`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-[#FDB913] text-[#006938] rotate-180' 
            : 'bg-white/10 text-white group-hover:bg-white/20'
        }`}>
          {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 sm:px-8 pb-8 pl-8 sm:pl-10 text-white/80 font-medium leading-relaxed">
              <div className="h-px w-full bg-white/10 mb-6" />
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQAccordion({ items }: { items: FAQItemProps[] }) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <FAQItem key={index} {...item} />
      ))}
    </div>
  );
}
