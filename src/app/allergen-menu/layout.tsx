import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Wingstop Allergen Menu 2026: Shared Fryer Risks & Gluten Guide',
  description: 'Review the complete Wingstop allergen menu. Find out if items contain wheat, dairy, soy, or eggs, and learn about the cross-contamination risks of shared fryers.',
  openGraph: {
    title: 'Wingstop Allergen Menu 2026',
    description: 'Review the complete Wingstop allergen menu and cross-contamination risks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://wingstopcaloriecalculator.us/allergen-menu',
  },
};

export default function AllergenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
