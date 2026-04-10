import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Wingstop Allergen Menu 2026: Shared Fryer Risks & Gluten Guide',
  description: 'Review the complete Wingstop allergen menu. Find out if items contain wheat, dairy, soy, or eggs, and learn about the cross-contamination risks of shared fryers.',
  keywords: [
    'wingstop allergen menu',
    'wingstop allergy menu',
    'does wingstop use peanut oil',
    'wingstop wheat allergy',
    'wingstop dairy free',
  ],
  openGraph: {
    title: 'Wingstop Allergen Menu 2026',
    description: 'Review the complete Wingstop allergen menu and cross-contamination risks.',
    type: 'article',
  },
  alternates: {
    canonical: '/allergen-menu',
  },
};

export default function AllergenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
