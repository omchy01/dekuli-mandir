// src/app/About/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { FaOm, FaSun, FaFire, FaPrayingHands } from 'react-icons/fa';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'About Swayambhu Shivling Temple | Sacred History & Divine Significance',
  description: 'Discover the sacred history of Swayambhu Shivling Temple Dekuli - a self-manifested form of Lord Shiva. Learn about the divine manifestation, spiritual significance, and timeless worship at this holy shrine in Bihar.',
  keywords: [
    'Swayambhu Shivling meaning',
    'Self-manifested Shivling',
    'Dekuli temple history',
    'Lord Shiva temple Bihar',
    'Sacred Shivling significance',
    'Hindu temple history',
    'Mahadev temple story',
    'Divine manifestation',
    'Spiritual pilgrimage site',
    'Ancient Shiva temple'
  ],
  openGraph: {
    title: 'About | Swayambhu Shivling Temple Dekuli | Sacred History',
    description: 'Discover the sacred history and divine significance of the self-manifested Swayambhu Shivling at Dekuli Temple, Bihar.',
    url: 'https://dekulimandir.com/About',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Swayambhu Shivling Temple Dekuli',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Swayambhu Shivling Temple Dekuli',
    description: 'Discover the sacred history of the self-manifested Swayambhu Shivling.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: 'https://dekulimandir.com/About',
  },
};

// Neumorphism: every surface is #1A1A1A (same as the page). Only the two shadows
// (dark bottom-right, light top-left) make a shape look raised or pressed in.
const raised =
  'rounded-3xl bg-[#1A1A1A] shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]';
const pressed =
  'bg-[#1A1A1A] shadow-[inset_6px_6px_12px_#0D0D0D,inset_-6px_-6px_12px_#272727]';

// Icon tile: pressed in, with a red icon
const iconTile = `${pressed} flex shrink-0 items-center justify-center rounded-2xl text-[#FF6B4A]`;

const features = [
  {
    Icon: FaSun,
    title: 'Divine Manifestation',
    text: 'A naturally formed Shivling, symbolizing the cosmic pillar of light and Lord Shiva’s infinite nature.',
  },
  {
    Icon: FaFire,
    title: 'Sacred Energy',
    text: 'Devotees experience profound peace and spiritual awakening in the presence of this ancient deity.',
  },
  {
    Icon: FaPrayingHands,
    title: 'Timeless Worship',
    text: 'Centuries of devotion and prayers have sanctified this holy ground, making it a beacon of faith.',
  },
];

export default function About() {
  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dekulimandir.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://dekulimandir.com/About'
      }
    ]
  };

  // Article Schema for About Content
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'About Swayambhu Shivling Temple Dekuli',
    description: 'Learn about the sacred Swayambhu Shivling - a self-manifested form of Lord Shiva at Dekuli Temple, Bihar',
    author: {
      '@type': 'Organization',
      name: 'Swayambhu Shivling Temple Dekuli'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Swayambhu Shivling Temple Dekuli',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dekulimandir.com/temple-og-image.jpg.png'
      }
    },
    datePublished: '2024-01-01',
    dateModified: '2026-10-23',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://dekulimandir.com/About'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#1A1A1A]">
        {/* pt-28 / sm:pt-32 keeps the content clear of the fixed navbar */}
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-20 lg:pb-24">
          {/* Header */}
          <div className="mb-10 text-center sm:mb-14 lg:mb-16">
            <div className="mb-5 flex justify-center sm:mb-6">
              <Image
                src="/1.png"
                alt="Om Symbol"
                width={150}
                height={150}
                className="h-auto w-24 sm:w-32 lg:w-36"
              />
            </div>
            <h1
              className={`${serif.className} mb-4 text-4xl font-semibold tracking-wide text-[#EDEDED] sm:text-5xl lg:text-6xl`}
            >
              About The Sacred Temple
            </h1>
            {/* Pressed groove with a red line inside */}
            <div className={`${pressed} mx-auto h-2 w-28 rounded-full p-[3px] sm:w-36`}>
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#E52200] to-[#C41000]"></div>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            {/* Left: story */}
            <div className="space-y-6 sm:space-y-8">
              <div className={`${raised} p-6 sm:p-8`}>
                <h2
                  className={`${serif.className} mb-4 flex items-center gap-3 text-2xl font-semibold text-[#FF6B4A] sm:text-3xl`}
                >
                  <span className={`${iconTile} h-11 w-11`}>
                    <FaOm className="h-5 w-5" />
                  </span>
                  Swayambhu Shivling
                </h2>
                <p className="text-base leading-relaxed text-[#EDEDED]/80 sm:text-lg">
                  The temple houses a sacred <span className="font-semibold text-[#FF6B4A]">Swayambhu Shivling</span>,
                  a self-manifested form of Lord Shiva. This divine Shivling emerged naturally from the earth,
                  untouched by human hands, representing the eternal presence of Mahadev.
                </p>
              </div>

              <div className={`${raised} p-6 sm:p-8`}>
                <p className="text-base leading-relaxed text-[#EDEDED]/80 sm:text-lg">
                  The term <span className="font-semibold italic text-[#FF6B4A]">Swayambhu</span> means
                  “self-existent” or “self-originated,” signifying that this holy lingam was not installed by
                  humans but manifested by divine will.
                </p>
              </div>
            </div>

            {/* Right: key points */}
            <div className="space-y-6 sm:space-y-8">
              {features.map(({ Icon, title, text }) => (
                <div
                  key={title}
                  className={`${raised} p-5 transition-shadow duration-300 hover:shadow-[12px_12px_26px_#0D0D0D,-12px_-12px_26px_#272727] sm:p-6`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`${iconTile} h-12 w-12`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="mb-1.5 text-lg font-semibold text-[#FF6B4A] sm:text-xl">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#EDEDED]/75 sm:text-base">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing quote: pressed into the page */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className={`${pressed} rounded-3xl px-4 py-8 text-center sm:py-10`}>
              <p
                className={`${serif.className} text-balance text-xl font-medium italic text-[#FF6B4A] sm:text-2xl lg:text-3xl`}
              >
                Where the divine manifests itself, there the eternal resides
              </p>
              <p className="mt-3 text-base text-[#EDEDED]/80 sm:mt-4 sm:text-lg">
                Har Har Mahadev 🙏
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}