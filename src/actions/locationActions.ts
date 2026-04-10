'use server';

import { loadLocations } from '@/lib/locations';

function getDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function findClosestStore(lat: number, lng: number) {
  const locations = loadLocations();
  if (!locations || locations.length === 0) {
    return { error: 'No locations available' };
  }

  let closestLoc = null;
  let minDistance = Infinity;

  for (const loc of locations) {
    if (loc.lat && loc.lng) {
      const dist = getDistanceInMiles(lat, lng, loc.lat, loc.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestLoc = loc;
      }
    }
  }

  if (closestLoc) {
    const stateSlug = closestLoc.stateName.toLowerCase().replace(/\s+/g, '-');
    return { 
      success: true,
      closest: {
        ...closestLoc,
        distanceMiles: minDistance.toFixed(2),
        stateSlug
      }
    };
  }

  return { error: 'Could not find a nearby store.' };
}
