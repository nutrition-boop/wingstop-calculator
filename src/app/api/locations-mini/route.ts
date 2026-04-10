import { NextResponse } from 'next/server';
import { loadLocations } from '@/lib/locations';

export async function GET() {
    const locs = loadLocations();
    const mini = locs.map(l => ({
        name: l.name,
        slug: l.slug,
        citySlug: l.citySlug,
        stateSlug: l.stateName.toLowerCase().replace(/\s+/g, '-'),
        lat: l.lat,
        lng: l.lng
    }));
    return NextResponse.json(mini);
}
