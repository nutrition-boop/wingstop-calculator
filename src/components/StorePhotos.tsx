'use client';
import { Camera } from 'lucide-react';

export default function StorePhotos({ photos }: { photos: string[] }) {
    if (!photos || photos.length === 0) return null;

    return (
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8 flex items-center justify-between" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                <span>Store Gallery</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest font-sans border border-gray-100">
                  <Camera size={12} /> Google Places
                </div>
            </h3>

            <div className={`grid gap-4 ${photos.length > 2 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                {photos.map((src, i) => {
                    // Make the first image span a larger area in masonry grid if there are enough images
                    const isFeatured = i === 0 && photos.length >= 3;
                    return (
                        <div key={i} className={`rounded-3xl overflow-hidden bg-gray-50 relative group cursor-pointer shadow-sm border border-gray-50 ${isFeatured ? 'col-span-2 row-span-2 h-[300px] md:h-[400px]' : 'col-span-1 h-[140px] md:h-[190px]'}`}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-300" />
                            <img 
                                src={src} 
                                alt={`Wingstop Store Interior and Exterior Restaurant Photo ${i+1}`} 
                                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-125"
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>
            
            <p className="text-[9px] font-bold text-gray-400 mt-6 text-center uppercase tracking-widest">
               Photos uploaded by customers & owners on Google Maps
            </p>
        </div>
    );
}
