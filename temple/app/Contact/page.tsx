// src/app/Contact/page.tsx
import React from "react";
import { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title:"Contact Swayambhu Shivling Temple Dekuli | Get in Touch",
  description:"Contact Swayambhu Shivling Temple Dekuli for darshan timings, puja bookings, and temple visit information. Located in Darbhanga, Bihar. Call +91 94731 91319 or email contact@dekulimandir.com",

  keywords: [
    'Contact Dekuli temple',
    'Shiva temple contact',
    'Temple visit booking',
    'Puja booking Dekuli',
    'Darbhanga temple contact',
    'Bihar temple phone number',
    'Temple address Dekuli',
    'Temple timings Dekuli',
    'How to reach Dekuli temple'
  ],
  openGraph: {
    title: 'Contact | Shivling Temple Dekuli',
    description: 'Get in touch with Swayambhu Shivling Temple for darshan timings, puja bookings, and visit information.',
    url: 'https://dekulimandir.com/Contact',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Swayambhu Shivling Temple Dekuli',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Shivling Temple Dekuli',
    description: 'Get in touch with Swayambhu Shivling Temple for darshan and visit information.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: 'https://dekulimandir.com/Contact',
  },
};

// Neumorphism: every surface is #1A1A1A (same as the page). Only the two shadows
// (dark bottom-right, light top-left) make a shape look raised or pressed in.
const raised =
  'rounded-3xl bg-[#1A1A1A] shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]';
const pressed =
  'bg-[#1A1A1A] shadow-[inset_6px_6px_12px_#0D0D0D,inset_-6px_-6px_12px_#272727]';
const pressedSm =
  'bg-[#1A1A1A] shadow-[inset_3px_3px_7px_#0D0D0D,inset_-3px_-3px_7px_#272727]';

// Round icon tile: pressed in, red icon
const iconTile = `${pressed} flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[#FF6B4A]`;

// Small pressed pill used for each phone number / email link (also a comfortable tap target)
const pill = `${pressedSm} inline-block rounded-full px-5 py-2 text-sm text-[#EDEDED] transition-colors hover:text-[#FF6B4A] sm:text-base`;

const redButton =
  'bg-gradient-to-b from-[#E52200] to-[#C41000] text-white shadow-[5px_5px_12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:brightness-110 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A]';

// Each card gets a slightly bigger shadow on hover (no scaling, so nothing jumps)
const card = `${raised} p-6 transition-shadow duration-300 hover:shadow-[12px_12px_26px_#0D0D0D,-12px_-12px_26px_#272727] sm:p-7`;

export default function Contact() {
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
        name: 'Contact',
        item: 'https://dekulimandir.com/Contact'
      }
    ]
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Swayambhu Shivling Temple Dekuli',
    description: 'Contact Swayambhu Shivling Temple in Dekuli, Darbhanga, Bihar for darshan timings, puja bookings, and temple visit information.',
    url: 'https://dekulimandir.com/Contact',
    mainEntity: {
      '@type': 'HinduTemple',
      name: 'Swayambhu Shivling Temple Dekuli',
      telephone: '+91-94731-91319',
      email: 'contact@dekulimandir.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Baba Vardhmaneshwar Nath Mahadev, Pandasarasi',
        addressLocality: 'Dekuli, Darbhanga',
        addressRegion: 'Bihar',
        postalCode: '846001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '26.1542',
        longitude: '85.8918'
      },
      openingHours: 'Mo-Su 05:00-20:00',
      image: 'https://dekulimandir.com/og.jpg'
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dekulimandir.com',
    name: 'Swayambhu Shivling Temple Dekuli',
    alternateName: 'Baba Vardhmaneshwar Nath Mahadev Temple',
    description: 'Ancient Shiva temple in Dekuli, Darbhanga known for its sacred Swayambhu Shivling. Visit for darshan, puja bookings, and spiritual blessings.',
    url: 'https://dekulimandir.com',
    telephone: ['+91-94731-91319', '+91-91353-45122', '+91-99399-81457'],
    email: 'contact@dekulimandir.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baba Vardhmaneshwar Nath Mahadev, Pandasarasi',
      addressLocality: 'Dekuli',
      addressRegion: 'Bihar',
      postalCode: '846001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.1542',
      longitude: '85.8918'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:00',
        closes: '20:00'
      }
    ],
    priceRange: 'Free Entry',
    image: 'https://dekulimandir.com/og.jpg'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the darshan timings at Swayambhu Shivling Temple Dekuli?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The temple is open daily from 5:00 AM to 8:00 PM for darshan and puja.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I book puja at Dekuli temple?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book puja by calling +91 94731 91319 or emailing contact@dekulimandir.com'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is Swayambhu Shivling Temple located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The temple is located at Baba Vardhmaneshwar Nath Mahadev, Pandasarasi, Dekuli, Darbhanga, Bihar - 846001, India.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-[#1A1A1A]">
        {/* pt-28 / sm:pt-32 keeps the content clear of the fixed navbar */}
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
          {/* Header */}
          <header className="mb-10 text-center sm:mb-12 lg:mb-14">
            <h1
              className={`${serif.className} mb-4 px-2 text-4xl font-semibold tracking-wide text-[#EDEDED] sm:text-5xl lg:text-6xl`}
            >
              Contact Us
            </h1>
            {/* Pressed groove with a red line inside */}
            <div className={`${pressed} mx-auto mb-5 h-2 w-28 rounded-full p-[3px] sm:w-36`}>
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#E52200] to-[#C41000]"></div>
            </div>
            <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-[#EDEDED]/75 sm:text-lg lg:text-xl">
              Visit Baba Vardhmaneshwar Nath Mahadev Temple in Darbhanga, Bihar for darshan, puja bookings, and divine blessings
            </p>
          </header>

          {/* Welcome / SEO content */}
          <section className="mx-auto mb-10 max-w-4xl lg:mb-12">
            <div className={`${raised} p-6 sm:p-8`}>
              <h2
                className={`${serif.className} mb-4 text-center text-2xl font-semibold text-[#FF6B4A] sm:text-3xl`}
              >
                Welcome to Our Sacred Temple
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-[#EDEDED]/80 sm:text-base">
                <p>
                  The Swayambhu Shivling Temple at Dekuli, Darbhanga is one of Bihar&apos;s most revered Shiva temples,
                  known for its ancient sacred Shivling that manifested naturally. Devotees from across India visit
                  this holy shrine for blessings, peace, and spiritual fulfillment.
                </p>

                <p>
                  Whether you wish to book a puja, plan your temple visit, or inquire about darshan timings,
                  our temple staff is here to assist you. Experience the divine energy and centuries-old traditions
                  at Baba Vardhmaneshwar Nath Mahadev temple.
                </p>
              </div>
            </div>
          </section>

          {/* Contact cards */}
          <div className="mb-10 grid gap-7 sm:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-8">
            {/* Address Card */}
            <article className={card}>
              <div className="flex flex-col items-center text-center">
                <span className={`${iconTile} mb-4`}>
                  <FaMapMarkerAlt className="h-6 w-6" />
                </span>
                <h2 className="mb-3 text-lg font-bold text-[#FF6B4A] sm:text-xl">Temple Address</h2>
                <address className="text-sm not-italic leading-relaxed text-[#EDEDED]/80 sm:text-base">
                  Baba Vardhmaneshwar Nath Mahadev<br />
                  Pandasarasi, Dekuli<br />
                  Darbhanga, Bihar<br />
                  India - 846001
                </address>
                <div className="mt-5">
                  <a
                    href="https://maps.google.com/?q=Swayambhu+Shivling+Temple+Dekuli+Darbhanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold ${redButton}`}
                  >
                    <FaMapMarkerAlt className="h-4 w-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Phone Card */}
            <article className={card}>
              <div className="flex flex-col items-center text-center">
                <span className={`${iconTile} mb-4`}>
                  <FaPhoneAlt className="h-5 w-5" />
                </span>
                <h2 className="mb-3 text-lg font-bold text-[#FF6B4A] sm:text-xl">Contact Numbers</h2>
                <div className="flex flex-col items-center gap-3">
                  <a href="tel:+919473191319" className={pill}>
                    +91 94731 91319
                  </a>
                  <a href="tel:+919135345122" className={pill}>
                    +91 91353 45122
                  </a>
                  <a href="tel:+919939981457" className={pill}>
                    +91 99399 81457
                  </a>
                </div>
                <p className="mt-4 text-xs text-[#EDEDED]/60 sm:text-sm">
                  Call for puja bookings & inquiries
                </p>
              </div>
            </article>

            {/* Email Card */}
            <article className={`${card} sm:col-span-2 lg:col-span-1`}>
              <div className="flex flex-col items-center text-center">
                <span className={`${iconTile} mb-4`}>
                  <FaEnvelope className="h-5 w-5" />
                </span>
                <h2 className="mb-3 text-lg font-bold text-[#FF6B4A] sm:text-xl">Email Us</h2>
                <div className="flex w-full flex-col items-center gap-3">
                  <a href="mailto:contact@dekulimandir.com" className={`${pill} max-w-full break-all`}>
                    contact@dekulimandir.com
                  </a>
                  <a href="mailto:jham53162@gmail.com" className={`${pill} max-w-full break-all`}>
                    jham53162@gmail.com
                  </a>
                </div>
                <p className="mt-4 text-xs text-[#EDEDED]/60 sm:text-sm">
                  We&apos;ll respond within 24 hours
                </p>
              </div>
            </article>
          </div>

          {/* Closing quote: pressed into the page */}
          <div className={`${pressed} rounded-3xl px-4 py-8 text-center sm:py-10`}>
            <p
              className={`${serif.className} mb-3 text-balance text-xl font-medium italic text-[#FF6B4A] sm:text-2xl lg:text-3xl`}
            >
              Where devotion meets divinity, blessings flow eternal
            </p>
            <p className="text-lg font-bold text-[#EDEDED] sm:text-xl">
              Har Har Mahadev 🙏
            </p>
            <p className="mt-3 text-sm text-[#EDEDED]/70 sm:text-base">
              We look forward to welcoming you to our sacred temple
            </p>
          </div>
        </div>
      </div>
    </>
  );
}