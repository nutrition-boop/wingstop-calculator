'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation, Loader2 } from 'lucide-react';
import { findClosestStore } from '@/actions/locationActions';

interface Props {
  className?: string;
  errorClassName?: string;
}

export default function ClientGeolocationButton({ className = '', errorClassName = 'mt-4' }: Props) {
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

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
            if (parseFloat(result.closest.distanceMiles || '0') > 100) {
              setLocationError("Could not detect a store nearby, please use the search bar.");
              setIsLocating(false);
              return;
            }
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
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="flex flex-col items-start w-full">
      <button 
        onClick={handleNearMeClick}
        disabled={isLocating}
        className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-md ${
          isLocating 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-100' 
            : 'bg-[#FDB913] hover:bg-[#E5A500] text-[#003D20] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FDB913]/20 border-2 border-[#FDB913]'
        } ${className}`}
      >
        {isLocating ? (
          <><Loader2 size={18} className="animate-spin" /> Locating...</>
        ) : (
          <><Navigation size={18} className="fill-[#003D20]" /> Find Near Me</>
        )}
      </button>

      {locationError && (
        <div className={`p-4 text-sm font-medium text-red-800 bg-red-50 border border-red-100 rounded-2xl w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 ${errorClassName}`}>
           <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5 sm:mt-0"></span> {locationError}
        </div>
      )}
    </div>
  );
}
