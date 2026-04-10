'use client';

import React, { useEffect, useRef, useState } from 'react';
import Calculator from '@/components/Calculator';
import FAQAccordion from '@/components/FAQAccordion';
import CombosSection from '@/components/CombosSection';
import FloatingTracker from '@/components/FloatingTracker';
import ScrollToTop from '@/components/ScrollToTop';
import { Zap } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem { question: string; answer: string; }

interface Props {
  faqs: FaqItem[];
  stats: { label: string; target: number; suffix: string }[];
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedStat({ target, suffix = '', className = '' }: { target: number; suffix?: string; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className={className}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionBadge({ badge }: { badge: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
      <Zap size={12} className="text-primary" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">{badge}</span>
    </div>
  );
}

// ─── Client Component ─────────────────────────────────────────────────────────

export default function HomeClient({ faqs, stats }: Props) {
  return (
    <>
      {/* Animated Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-3xl font-black text-primary italic tracking-tighter">
              <AnimatedStat target={s.target} suffix={s.suffix} />
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <Calculator />

      {/* Popular Combos */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50">
            <CombosSection />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionBadge badge="Common Questions" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 italic uppercase leading-none mb-4">
              Common Wingstop Nutrition Questions
            </h2>
            <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Answers to the most-searched calorie and macro questions about Wingstop.
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Floating UI */}
      <FloatingTracker />
      <ScrollToTop targetId="calculator-top" />
    </>
  );
}
