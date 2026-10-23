// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root metadata - applies to all pages unless overridden
export const metadata: Metadata = {
  metadataBase: new URL('https://dekulimandir.com'),
  title: {
    default: 'Swayambhu Shivling Temple Dekuli | Sacred Darshan & Divine Blessings',
    template: '%s | Swayambhu Shivling Temple Dekuli',
  },
  description: 'Visit the sacred Swayambhu Shivling Temple in Dekuli, Bihar - a self-manifested form of Lord Shiva. Experience divine darshan, attend spiritual events, and receive blessings.',
  applicationName: 'Swayambhu Shivling Temple Dekuli',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Swayambhu Shivling',
    'Dekuli Mandir',
    'Dekuli Shiv Mandir',
    'Shiva Temple Dekuli',
    'Lord Shiva Darshan',
    'Bihar Shiva Temple',
    'Hindu Temple Dekuli',
    'Mahadev Temple',
    'Temple near me Dekuli',
    'Sacred Shivling',
    'Spiritual Pilgrimage Bihar',
    'Temple Darshan',
    'Divine Blessings'
  ],
  authors: [{ name: 'Swayambhu Shivling Temple', url: 'https://dekulimandir.com' }],
  creator: 'Swayambhu Shivling Temple',
  publisher: 'Swayambhu Shivling Temple',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/temple-og-image.jpg.png' },
      { url: '/temple-og-image.jpg.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/temple-og-image.jpg.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dekulimandir.com',
    siteName: 'Swayambhu Shivling Temple Dekuli',
    title: 'Swayambhu Shivling Temple Dekuli | Sacred Darshan & Divine Blessings',
    description: 'Experience divine darshan at the sacred Swayambhu Shivling Temple in Dekuli, Bihar. A self-manifested holy site where devotees find peace and spiritual awakening.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Swayambhu Shivling Temple Dekuli - Sacred Darshan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swayambhu Shivling Temple Dekuli | Sacred Darshan',
    description: 'Visit the sacred Swayambhu Shivling in Dekuli - a self-manifested form of Lord Shiva.',
    images: ['/og.jpg'],
    creator: '@dekulimandir',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dekulimandir.com',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Temple
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    name: 'Swayambhu Shivling Temple',
    alternateName: 'Dekuli Shiv Mandir',
    description: 'Sacred temple housing a self-manifested Swayambhu Shivling of Lord Shiva in Dekuli, Bihar',
    image: 'https://dekulimandir.com/temple-og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dekuli',
      addressRegion: 'Bihar',
      addressCountry: 'IN'
    },
    url: 'https://dekulimandir.com',
    sameAs: [

    ],
    priceRange: 'Free',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:00',
        closes: '21:00'
      }
    ]
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}
