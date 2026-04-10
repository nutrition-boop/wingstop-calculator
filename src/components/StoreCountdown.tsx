'use client';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import type { DayHours } from '@/lib/locations';

export default function StoreCountdown({ todayHours }: { todayHours: DayHours | null }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!todayHours) return;

    const parseTimeStr = (t: string) => {
        if (!t) return { h: 0, m: 0 };
        let [hStr, mStr] = t.replace(/(AM|PM)/i, '').trim().split(':');
        let hours = parseInt(hStr || '0');
        if (t.toLowerCase().includes('pm') && hours !== 12) hours += 12;
        if (t.toLowerCase().includes('am') && hours === 12) hours = 0;
        return { h: hours, m: parseInt(mStr || '0') };
    };

    const targetOpen = parseTimeStr(todayHours.open);
    const targetClose = parseTimeStr(todayHours.close);

    const updateTimer = () => {
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();
        const openMins = targetOpen.h * 60 + targetOpen.m;
        let closeMins = targetClose.h * 60 + targetClose.m;
        
        // Handle late close like 12:00 AM or 1:00 AM
        if (closeMins <= openMins) {
            closeMins += 24 * 60;
        }

        let isCurrentlyOpen = false;
        let targetMins = 0;

        // If current time is after midnight but before sleep time (e.g., 1 AM and it closes at 2 AM)
        if (now.getHours() < targetClose.h || (now.getHours() === targetClose.h && now.getMinutes() < targetClose.m)) {
             isCurrentlyOpen = true;
             targetMins = targetClose.h * 60 + targetClose.m;
        } else if (currentMins >= openMins && currentMins < closeMins) {
             isCurrentlyOpen = true;
             targetMins = closeMins;
        } else {
             isCurrentlyOpen = false;
             targetMins = currentMins < openMins ? openMins : openMins + 24 * 60;
        }

        setIsOpen(isCurrentlyOpen);

        let finalTargetDate = new Date();
        if (targetMins >= 24 * 60 && currentMins < 24 * 60) {
            finalTargetDate.setDate(finalTargetDate.getDate() + 1);
            finalTargetDate.setHours(Math.floor(targetMins / 60) - 24, targetMins % 60, 0, 0);
        } else if (targetMins < currentMins && targetMins < 24 * 60 && !isCurrentlyOpen) {
            finalTargetDate.setDate(finalTargetDate.getDate() + 1);
            finalTargetDate.setHours(Math.floor(targetMins / 60), targetMins % 60, 0, 0);
        } else {
            finalTargetDate.setHours(Math.floor(targetMins / 60), targetMins % 60, 0, 0);
        }

        const diff = finalTargetDate.getTime() - new Date().getTime();
        if (diff <= 0) {
            setTimeLeft('Updating...');
            return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        
        const pad = (num: number) => num.toString().padStart(2, '0');
        setTimeLeft(`${pad(h)}h ${pad(m)}m ${pad(s)}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [todayHours]);

  if (!isClient || !todayHours) return null;

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 relative overflow-hidden group hover:bg-white/10 transition-colors cursor-default">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDB913]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FDB913]/20 transition-colors" />
        <div className={`w-12 h-12 rounded-full ${isOpen ? 'bg-red-500/20 text-[#ff4d4d]' : 'bg-[#006938]/40 text-green-300'} flex items-center justify-center shrink-0`}>
            <Clock size={20} className={isOpen ? 'animate-pulse' : ''} />
        </div>
        <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#FDB913] mb-1">
                {isOpen ? 'Closes In' : 'Opens In'}
            </div>
            <div className="text-2xl font-black tabular-nums tracking-tight" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                {timeLeft || 'Calculating...'}
            </div>
        </div>
    </div>
  );
}
