'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Search, Building2, MapPin, Navigation, Loader2 } from 'lucide-react';
import { findClosestStore } from '@/actions/locationActions';

interface StateData {
  stateCode: string;
  stateName: string;
  stateSlug: string;
  locationCount: number;
  cityCount: number;
}

interface Props {
  states: StateData[];
}

export default function ClientStateList({ states }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const filteredStates = states.filter((s) =>
    s.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.stateCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNearMeClick = async () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          const result = await findClosestStore(lat, lng);
          
          if (result.error) {
            setLocationError(result.error);
            setIsLocating(false);
            return;
          }
          
          if (result.success && result.closest) {
            // Check if the store is reasonably close (e.g., within 100 miles)
            if (parseFloat(result.closest.distanceMiles || '0') > 100) {
              setLocationError("Could not detect a store nearby, please use the search bar.");
              setIsLocating(false);
              return;
            }
            // Navigate directly to the closest store
            router.push(`/locations/${result.closest.stateSlug}/${result.closest.citySlug}/${result.closest.slug}`);
          }
        } catch (err) {
          setLocationError("Something went wrong finding your store.");
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Please allow location access to find a store near you.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable right now.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get your location timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      },
      { timeout: 10000, enableHighAccuracy: true } // Timeout after 10s
    );
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400 border-b border-gray-200 pb-3 flex items-center justify-between">
          <span>Browse Locations by State</span>
          <span className="text-[#006938] bg-[#006938]/10 px-3 py-1 rounded-full text-[10px]">{states.length} States</span>
        </h2>
        
        {/* Premium Search Bar & Near Me Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-3xl">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400 group-focus-within:text-[#006938] transition-colors duration-300" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#006938] focus:ring-4 focus:ring-[#006938]/10 shadow-sm transition-all duration-300 font-medium"
              placeholder="Search by state (e.g., Texas, CA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[#006938] text-[10px] sm:hidden justify-center my-2">
            <span className="w-8 h-px bg-gray-200"></span> OR <span className="w-8 h-px bg-gray-200"></span>
          </div>

          <button 
            onClick={handleNearMeClick}
            disabled={isLocating}
            className={`shrink-0 flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-md ${
              isLocating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-100' 
                : 'bg-[#FDB913] hover:bg-[#E5A500] text-[#003D20] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FDB913]/20 border-2 border-[#FDB913]'
            }`}
          >
            {isLocating ? (
              <><Loader2 size={18} className="animate-spin" /> Locating...</>
            ) : (
              <><Navigation size={18} className="fill-[#003D20]" /> Find Near Me</>
            )}
          </button>
        </div>

        {locationError && (
          <div className="mt-4 p-4 text-sm font-medium text-red-800 bg-red-50 border border-red-100 rounded-2xl max-w-3xl flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span> {locationError}
          </div>
        )}
      </div>

      {filteredStates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <Search size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No States Found</h3>
          <p className="text-gray-500">We couldn't find any locations matching "{searchTerm}".</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredStates.map((s) => (
            <Link
              key={s.stateCode}
              href={`/locations/${s.stateSlug}`}
              className="group flex flex-col p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#006938]/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#006938]/5 to-transparent rounded-bl-full -z-10 group-hover:scale-[2] transition-transform duration-700" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[#006938]/5 text-[#006938] border border-[#006938]/10 group-hover:bg-[#006938] group-hover:text-white transition-colors duration-300">
                  {s.stateCode}
                </span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#FDB913] transition-colors group-hover:translate-x-1 duration-300" />
              </div>
              
              <span className="font-bold text-gray-900 text-lg mb-1">{s.stateName}</span>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                <span>{s.cityCount} Cities</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[#006938]">{s.locationCount} Stores</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
