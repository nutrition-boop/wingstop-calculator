import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | Wingstop Nutrition Calculator',
  description: 'Have a question or feedback about our Wingstop Nutrition Calculator? We would love to hear from you. Get in touch with our team today.',
  alternates: { canonical: 'https://wingstopcaloriecalculator.us/contact' },
  openGraph: {
    title: 'Contact Us | Wingstop Nutrition Calculator',
    description: 'Have a question or feedback about our Wingstop Nutrition Calculator? We would love to hear from you. Get in touch with our team today.',
    type: 'website',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
