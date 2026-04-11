import type { Metadata } from 'next'
import React from 'react'
import Script from 'next/script'
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
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-61S8KJ7R61" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-61S8KJ7R61');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wa15sb8dr9");
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
