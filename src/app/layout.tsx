import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://wingstopcaloriecalculator.us'),
  title: 'Wingstop Nutrition Calculator | Check Calories & Macros',
  description: 'Use the Wingstop nutrition calculator to check calories, macros, and full menu nutrition facts for your favorite wings and sides.',
  openGraph: {
    title: 'Wingstop Nutrition Calculator | Check Calories & Macros',
    description: 'Use the Wingstop nutrition calculator to check calories, macros, and full menu nutrition facts for your favorite wings and sides.',
    type: 'website',
    url: 'https://wingstopcaloriecalculator.us',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wingstop Nutrition Calculator | Check Calories & Macros',
    description: 'Use the Wingstop nutrition calculator to check calories, macros, and full menu nutrition facts for your favorite wings and sides.',
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
