'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop({ targetId }: { targetId: string }) {
  const scrollTo = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollTo}
      className="btn-primary px-12 py-5 text-lg rounded-full inline-flex items-center gap-2 group"
    >
      Back to Calculator <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
