'use client';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function PopularTimes() {
  const [activeDay, setActiveDay] = useState(0);
  const [currentHour, setCurrentHour] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    // JS getDay is 0 (Sun) to 6 (Sat) -> we want 0 (Mon) to 6 (Sun)
    const currentDayOffset = now.getDay() === 0 ? 6 : now.getDay() - 1; 
    setActiveDay(currentDayOffset);
    setCurrentHour(now.getHours());
  }, []);

  // Simulated traffic peaks at lunch (12-2) and dinner (6-9)
  const simulatedTraffic = [
    2, 2, 2, 2, 2, 2, 5, 8, 12, 18, 30, // 0-10
    50, 85, 75, 45, 35, 30, // 11-16
    55, 80, 95, 70, 45, 20, 10 // 17-23
  ];

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-gray-900 border-b border-gray-50 pb-4">
        <h3 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>Popular Times</h3>
      </div>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {DAYS.map((day, idx) => (
          <button 
            key={day} 
            onClick={() => setActiveDay(idx)}
            className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-colors whitespace-nowrap ${activeDay === idx ? 'text-[#006938] border-b-2 border-[#006938]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="h-40 flex items-end justify-between gap-1 sm:gap-2 mb-4 relative">
        <div className="absolute inset-x-0 bottom-[33%] border-b border-dashed border-gray-100 z-0"></div>
        <div className="absolute inset-x-0 bottom-[66%] border-b border-dashed border-gray-100 z-0"></div>

        {simulatedTraffic.map((level, i) => {
          const variation = activeDay === 4 || activeDay === 5 ? 1.2 : (activeDay === 6 ? 1.1 : 1);
          let adjustedLevel = Math.min(100, level * variation);

          const isCurrentHour = i === currentHour && activeDay === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);

          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                {isCurrentHour && (
                    <div className="absolute -top-8 bg-[#c8102e] text-white text-[9px] px-2 py-1 rounded font-black uppercase tracking-widest whitespace-nowrap transform opacity-100 transition-opacity z-20 shadow-md">
                        Live
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c8102e] rotate-45"></div>
                    </div>
                )}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${adjustedLevel}%` }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
                className={`w-full rounded-t-sm transition-all duration-300 ${isCurrentHour ? 'bg-[#c8102e] shadow-[0_0_15px_rgba(200,16,46,0.3)]' : 'bg-[#006938]/20 group-hover:bg-[#006938]/40'}`}
              ></motion.div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span>6a</span>
        <span>12p</span>
        <span>6p</span>
        <span>12a</span>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-4 py-3 rounded-xl w-full">
         <Clock size={14} className="text-[#006938]" /> People typically spend 15 min to 45 min here
      </div>
    </div>
  );
}
