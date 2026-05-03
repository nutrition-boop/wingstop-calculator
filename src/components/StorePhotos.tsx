'use client';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface StorePhotosProps {
  photos: string[];
  city: string;
  state: string;
  address: string;
}

export default function StorePhotos({ photos, city, state, address }: StorePhotosProps) {
    // If no real store photos are found, use high-quality food fallbacks
    const displayPhotos = photos && photos.length > 0 ? photos : [
      '/images/menu/Wingstop wing combos menu.webp',
      '/images/menu/tenders-5pc-combo.webp',
      '/images/menu/side-buffalo-ranch-fries.webp'
    ];

    return (
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden lg:col-span-2 order-6">
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8 flex items-center justify-between" style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}>
                <span>{photos && photos.length > 0 ? 'Store Gallery' : 'Fresh at Wingstop'}</span>
            </h3>

            <div className={`grid gap-4 ${displayPhotos.length > 2 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                {displayPhotos.map((src, i) => {
                    // Make the first image span a larger area in masonry grid if there are enough images
                    const isFeatured = i === 0 && displayPhotos.length >= 3;
                    return (
                        <div key={i} className={`rounded-3xl overflow-hidden bg-gray-50 relative group cursor-pointer shadow-sm border border-gray-50 ${isFeatured ? 'col-span-2 row-span-2 h-[300px] md:h-[400px]' : 'col-span-1 h-[140px] md:h-[250px]'}`}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-300" />
                            <Image 
                                src={src} 
                                alt={`Wingstop food and storefront view at ${address.split(',')[0]} in ${city}, ${state}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={i === 0}
                                className="object-cover transition-transform duration-[1500ms] group-hover:scale-125"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
