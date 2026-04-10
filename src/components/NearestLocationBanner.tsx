'use client';
import { useState, useEffect } from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import Link from 'next/link';

const R = 3958.8; // Radius of the Earth in miles
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function NearestLocationBanner() {
  const [nearest, setNearest] = useState<{loc: any, distance: number} | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
        fetch('/api/locations-mini').then(res => res.json()).then(locs => {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                let closest = null;
                let minDist = Infinity;
                
                locs.forEach((l: any) => {
                    if (l.lat && l.lng) {
                        const dist = haversine(userLat, userLng, l.lat, l.lng);
                        if (dist < minDist) {
                            minDist = dist;
                            closest = l;
                        }
                    }
                });
                
                if (closest && minDist < 100) { 
                    setNearest({ loc: closest, distance: minDist });
                }
            }, () => {
                // Ignore silent failure for geolocation denial
            });
        });
    }
  }, []);

  if (!nearest || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-500">
       <div className="bg-[#003D20] text-white p-4 rounded-[1.5rem] shadow-2xl flex items-center justify-between border-2 border-[#006938]">
         <div className="flex gap-3 items-center w-full relative">
            <div className="w-10 h-10 rounded-full bg-[#006938] flex items-center justify-center shrink-0">
               <MapPin size={18} fill="#FDB913" className="text-[#FDB913]" />
            </div>
            <div className="flex-1 pr-4">
                <div className="text-[9px] font-black uppercase tracking-widest text-[#FDB913] mb-0.5">Nearest Location</div>
                <div className="font-bold text-sm leading-tight line-clamp-1">{nearest.loc.name}</div>
                <div className="text-[10px] text-green-200 mt-1">{nearest.distance.toFixed(1)} miles away</div>
            </div>
            <Link href={`/locations/${nearest.loc.stateSlug}/${nearest.loc.citySlug}/${nearest.loc.slug}`} className="bg-white text-[#003D20] w-10 h-10 rounded-xl flex items-center justify-center shrink-0 hover:bg-[#FDB913] transition-colors shadow-sm">
                <Navigation size={16} />
            </Link>
            <button onClick={() => setDismissed(true)} className="absolute -top-6 -right-5 bg-white text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shadow hover:text-gray-900 border border-gray-100 transition-colors">
                <X size={12} />
            </button>
         </div>
       </div>
    </div>
  );
}
