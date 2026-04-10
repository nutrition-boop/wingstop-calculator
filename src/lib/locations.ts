import fs from 'fs';
import path from 'path';

// ── Types ────────────────────────────────────────────────────────────────────

export interface DayHours {
  open: string;
  close: string;
}

export interface Location {
  slug: string;
  name: string;
  state: string;        // "TX"
  stateCode?: string;   // alias for state (2-letter code)
  stateName: string;    // "Texas"
  city: string;         // "Houston"
  citySlug: string;     // "houston"
  address: string;
  phone: string;
  phoneDisplay: string;
  zip: string;
  lat: number | null;
  lng: number | null;
  hours: Partial<Record<string, DayHours>>; // combined/default hours
  carryoutHours?: Partial<Record<string, DayHours>>;
  deliveryHours?: Partial<Record<string, DayHours>>;
  sourceUrl: string;
}

export interface StateGroup {
  stateName: string;
  stateCode: string;
  stateSlug: string;
  cityCount: number;
  locationCount: number;
}

export interface CityGroup {
  cityName: string;
  citySlug: string;
  locationCount: number;
}

// ── Load data ────────────────────────────────────────────────────────────────

const FILE = path.join(process.cwd(), 'locations.json');

export function loadLocations(): Location[] {
  if (!fs.existsSync(FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8')) as Location[];
  } catch {
    return [];
  }
}

// ── Grouping helpers ─────────────────────────────────────────────────────────

export function groupByState(locations: Location[]): StateGroup[] {
  const map = new Map<string, { locs: Location[] }>();
  for (const loc of locations) {
    const key = loc.stateCode || loc.state;
    if (!map.has(key)) map.set(key, { locs: [] });
    map.get(key)!.locs.push(loc);
  }
  return Array.from(map.entries())
    .map(([code, { locs }]) => ({
      stateName: locs[0].stateName,
      stateCode: code,
      stateSlug: locs[0].stateName.toLowerCase().replace(/\s+/g, '-'),
      cityCount: new Set(locs.map((l) => l.citySlug)).size,
      locationCount: locs.length,
    }))
    .sort((a, b) => a.stateName.localeCompare(b.stateName));
}

export function groupByCity(locations: Location[]): CityGroup[] {
  const map = new Map<string, Location[]>();
  for (const loc of locations) {
    if (!map.has(loc.citySlug)) map.set(loc.citySlug, []);
    map.get(loc.citySlug)!.push(loc);
  }
  return Array.from(map.entries())
    .map(([slug, locs]) => ({
      cityName: locs[0].city,
      citySlug: slug,
      locationCount: locs.length,
    }))
    .sort((a, b) => a.cityName.localeCompare(b.cityName));
}

// ── State lookup ─────────────────────────────────────────────────────────────

export function findLocationsByState(locations: Location[], stateParam: string): Location[] {
  const q = stateParam.toLowerCase().replace(/-/g, ' ');
  return locations.filter(
    (l) =>
      l.stateName.toLowerCase() === q ||
      l.state.toLowerCase() === q ||
      l.stateCode?.toLowerCase() === q
  );
}

export function findLocationsByCity(
  locations: Location[],
  stateParam: string,
  cityParam: string
): Location[] {
  const stateMatches = findLocationsByState(locations, stateParam);
  const q = cityParam.toLowerCase();
  return stateMatches.filter(
    (l) => l.citySlug === q || l.city.toLowerCase() === q
  );
}

export function findLocationBySlug(
  locations: Location[],
  stateParam: string,
  cityParam: string,
  slugParam: string
): Location | undefined {
  const cityMatches = findLocationsByCity(locations, stateParam, cityParam);
  return cityMatches.find((l) => l.slug === slugParam);
}

// ── Open-now helper ──────────────────────────────────────────────────────────

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function parseTime(t: string): number {
  // Returns minutes since midnight
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return -1;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const ampm = m[3].toUpperCase();
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

export function isOpenNow(hours: Location['hours']): boolean {
  if (!hours || Object.keys(hours).length === 0) return false;
  const now = new Date();
  const day = DAYS[now.getDay()];
  const dh = hours[day];
  if (!dh) return false;
  const open = parseTime(dh.open);
  let close = parseTime(dh.close);
  const current = now.getHours() * 60 + now.getMinutes();
  
  // Handle midnight or late-night close (e.g. 1:00 AM)
  if (close < open) {
    // If current time is before close time (e.g. 12:30 AM), it's still "today" for the restaurant
    if (current < close) return true;
    // Otherwise check if it's after open time
    return current >= open;
  }
  
  return current >= open && current < close;
}

export function todayHours(loc: Location, mode: 'carryout' | 'delivery' | 'combined' = 'combined'): DayHours | null {
  const day = todayDayName();
  if (mode === 'carryout' && loc.carryoutHours) return loc.carryoutHours[day] || null;
  if (mode === 'delivery' && loc.deliveryHours) return loc.deliveryHours[day] || null;
  return loc.hours[day] || null;
}

export function todayDayName(): string {
  const now = new Date();
  return DAYS[now.getDay()];
}

export function googleMapsUrl(loc: Location): string {
  const q = encodeURIComponent(`${loc.address} ${loc.city} ${loc.state} ${loc.zip}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const STATE_NAME_TO_SLUG: Record<string, string> = {
  Alabama: 'al', Alaska: 'ak', Arizona: 'az', Arkansas: 'ar', California: 'ca',
  Colorado: 'co', Connecticut: 'ct', Delaware: 'de', Florida: 'fl', Georgia: 'ga',
  Hawaii: 'hi', Idaho: 'id', Illinois: 'il', Indiana: 'in', Iowa: 'ia',
  Kansas: 'ks', Kentucky: 'ky', Louisiana: 'la', Maine: 'me', Maryland: 'md',
  Massachusetts: 'ma', Michigan: 'mi', Minnesota: 'mn', Mississippi: 'ms', Missouri: 'mo',
  Montana: 'mt', Nebraska: 'ne', Nevada: 'nv', 'New Hampshire': 'nh', 'New Jersey': 'nj',
  'New Mexico': 'nm', 'New York': 'ny', 'North Carolina': 'nc', 'North Dakota': 'nd',
  Ohio: 'oh', Oklahoma: 'ok', Oregon: 'or', Pennsylvania: 'pa', 'Rhode Island': 'ri',
  'South Carolina': 'sc', 'South Dakota': 'sd', Tennessee: 'tn', Texas: 'tx', Utah: 'ut',
  Vermont: 'vt', Virginia: 'va', Washington: 'wa', 'West Virginia': 'wv',
  Wisconsin: 'wi', Wyoming: 'wy', 'District Of Columbia': 'dc',
};
