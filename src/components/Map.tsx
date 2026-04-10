// @ts-nocheck
'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/lib/locations';

interface Props {
  locations: Location[];
}

export default function WingstopMap({ locations }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  // Dynamically import Leaflet components only when on the client
  const MapContainer = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false }), []);
  const TileLayer = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false }), []);
  const Marker = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false }), []);
  const Popup = useMemo(() => dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false }), []);

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((leaflet) => {
      // Fix default Leaflet icon paths
      const customIcon = leaflet.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      setL({ icon: customIcon });
    });
  }, []);

  // Filter out locations missing lat/lng
  const validLocs = useMemo(() => locations.filter(l => l.lat && l.lng), [locations]);
  
  if (!isClient || validLocs.length === 0 || !L) {
    return (
      <div className="w-full h-80 bg-gray-50 rounded-3xl animate-pulse flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100">
        <div className="w-12 h-12 rounded-full border-4 border-[#006938] border-t-transparent animate-spin mb-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Warming up the flavor map...</span>
      </div>
    );
  }

  // Center map on the first location
  const center: [number, number] = [validLocs[0].lat!, validLocs[0].lng!];

  return (
    <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-0 relative">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validLocs.map((loc) => (
          <Marker key={loc.slug} position={[loc.lat!, loc.lng!]} icon={L.icon}>
            <Popup>
              <div className="font-sans p-2 min-w-[150px]">
                <span className="font-black text-[#006938] block text-sm border-b border-gray-100 pb-1 mb-2 uppercase tracking-tight">{loc.name}</span>
                <p className="text-[11px] text-gray-600 mb-2 leading-tight">{loc.address}</p>
                <div className="flex items-center gap-2 text-[#006938] font-bold text-[10px]">
                  <span>{loc.phoneDisplay}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
