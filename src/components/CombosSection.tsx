'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Users, Package, Settings, Utensils } from 'lucide-react';
import { menuItems } from '@/lib/data/menu';

export default function CombosSection() {
  const combos = menuItems.filter(item => item.id.startsWith('combo-'));

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Value Meals</p>
          <h2 className="text-4xl font-black italic uppercase tracking-tight text-gray-900 leading-none">
            Wing Combos & Group Packs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo, i) => (
            <div key={combo.id} className="group flex flex-col bg-gray-50 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Image Area */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                {combo.image ? (
                  <Image 
                    src={combo.image} 
                    alt={combo.name} 
                    fill 
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                ) : (
                  <Package size={40} className="text-gray-300" />
                )}
                {/* Badge based on size */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm border border-white">
                    {combo.id.includes('15') ? <Users size={12} /> : <Utensils size={12} />}
                    {combo.id.includes('15') ? 'Feeds 2' : 'Solo Meal'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1 bg-white">
                <p className="text-xl font-black italic uppercase tracking-tight text-gray-900 mb-2 leading-none">
                  {combo.name}
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                  {combo.servingSize}
                </p>

                {/* Price Options */}
                <div className="space-y-2 mt-auto pb-6">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span className="uppercase tracking-widest">Boneless</span>
                    <span className="text-primary">${combo.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span className="uppercase tracking-widest">Classic</span>
                    <span className="text-primary">${(combo.price + (combo.id.includes('15pc') ? 6.30 : 2.00)).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span className="uppercase tracking-widest">Mix & Match</span>
                    <span className="text-primary">${(combo.price + (combo.id.includes('15pc') ? 6.30 : 2.00)).toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/menu/${combo.slug}`} className="mt-auto block w-full py-3 bg-gray-50 text-center rounded-xl text-[11px] font-black uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100 group-hover:border-primary">
                  View Nutrition
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
