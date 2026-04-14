import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { menuItems } from '@/lib/data/menu';
import {
  Flame, Drumstick, Sandwich, Hash, Package, Users, Users2,
  Zap, Palette, Calculator, CheckCircle2, ArrowRight, BookOpen,
  User, ShoppingBag, Star, TrendingUp, Clock, Globe, Search, Utensils,
  CupSoda, Cookie
} from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';

// ─── Category Config ─────────────────────────────────────────────────────────

const categoryConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  'add-ons': { label: 'Add Ons', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
  deals: { label: 'Wingstop Deals', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  combos: { label: 'Wing Combos', icon: Package, color: 'text-primary', bg: 'bg-primary/5 border-primary/20' },
  'group-packs': { label: 'Wing Group Packs', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  'by-the-piece': { label: 'Wings By the Piece', icon: Hash, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
  tenders: { label: 'Chicken Tenders', icon: Flame, color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
  sandwiches: { label: 'Chicken Sandwiches', icon: Sandwich, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  sides: { label: 'Sides', icon: Utensils, color: 'text-lime-600', bg: 'bg-lime-50 border-lime-100' },
  dips: { label: 'Dips & Flavors', icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
  drinks: { label: 'Drinks', icon: CupSoda, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  desserts: { label: 'Desserts', icon: Cookie, color: 'text-stone-600', bg: 'bg-stone-50 border-stone-100' },
};

const CATEGORY_ORDER = [
  'add-ons',
  'deals',
  'combos',
  'group-packs',
  'by-the-piece',
  'tenders',
  'sandwiches',
  'sides',
  'dips',
  'drinks',
  'desserts'
];

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Wingstop Menu With Prices & Pictures | Updated Menu 2026',
  description: 'View the complete Wingstop menu with updated prices and nutrition facts for 2026. Official guide to wings, deals, combos, and sides with calorie counts.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Wingstop Menu With Prices & Pictures | Updated Menu 2026',
    description: 'View the complete Wingstop menu with updated prices and nutrition facts for 2026. Official guide to wings, deals, combos, and sides with calorie counts.',
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CalorieBadge({ cal }: { cal: number }) {
  const level = cal < 150 ? 'green' : cal < 350 ? 'amber' : 'red';
  const cls = level === 'gr)