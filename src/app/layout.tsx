import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us'),
  title: 'Wingstop Nutrition Calculator – Track Calories & Macros Instantly',
  description: 'Use this Wingstop nutrition calculator to check Wingstop calories, macros, fries, ranch, and wings before you order. Fast, simple, and easy to use.',
  openGraph: {
    title: 'Wingstop Nutrition Calculator',
    description: 'Track complete macros, calories, allergens, and diet goals for every Wingstop menu item.',
    type: 'website',
    url: 'https://wingstopcaloriecalculator.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wingstop Nutrition Calculator',
    description: 'Track complete macros, calories, allergens, and diet goals for every Wingstop menu item.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable}`}>
      <body className={outfit.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
