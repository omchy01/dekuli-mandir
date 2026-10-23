// src/app/Events/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { FaCalendarAlt, FaFileDownload } from "react-icons/fa";
import SEO from "@/components/SEO";

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

// Neumorphism: every surface is #1A1A1A (same as the page). Only the two shadows
// (dark bottom-right, light top-left) make a shape look raised or pressed in.
const raised =
  'rounded-3xl bg-[#1A1A1A] shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]';
const pressed =
  'bg-[#1A1A1A] shadow-[inset_6px_6px_12px_#0D0D0D,inset_-6px_-6px_12px_#272727]';
const pressedSm =
  'bg-[#1A1A1A] shadow-[inset_3px_3px_7px_#0D0D0D,inset_-3px_-3px_7px_#272727]';

const redButton =
  'bg-gradient-to-b from-[#E52200] to-[#C41000] text-white shadow-[5px_5px_12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:brightness-110 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A]';

interface Event {
  _id: string;
  eventName: string;
  eventDate: string;
  description: string;
  PDF: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Structured Data Schemas
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
      name: 'Events',
      item: 'https://dekulimandir.com/Events'
    }
  ]
};

const eventsSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'Swayambhu Shivling Temple Events',
  description: 'Sacred events and celebrations at Swayambhu Shivling Temple Dekuli',
  location: {
    '@type': 'HinduTemple',
    name: 'Swayambhu Shivling Temple',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baba Vardhmaneshwar Nath Mahadev, Pandasarasi',
      addressLocality: 'Dekuli, Darbhanga',
      addressRegion: 'Bihar',
      postalCode: '846001',
      addressCountry: 'IN'
    }
  },
  url: 'https://dekulimandir.com/Events',
  organizer: {
    '@type': 'Organization',
    name: 'Swayambhu Shivling Temple Dekuli',
    url: 'https://dekulimandir.com'
  }
};


export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/docs", { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data: { docs: Event[] } = await res.json();
        setEvents(data.docs);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDownload = (event: Event) => {
    if (event.PDF) {
      window.open(event.PDF, '_blank');
    } else {
      alert(`PDF not available for: ${event.eventName}`);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };


  return (
    <>
      <SEO
        title='Events | Swayambhu Shivling Temple Dekuli'
        description='Discover the sacred events and celebrations at Swayambhu Shivling Temple Dekuli. Join us for divine ceremonies and spiritual gatherings.'
        keywords={[
          'Dekuli temple events',
          'Shivling celebrations',
          'Temple festivals Dekuli',
          'Lord Shiva events',
          'Sacred ceremonies',
          'Temple rituals Bihar',
          'Swayambhu Shivling events',
          'Divine gatherings',
          'Temple community events'
        ]}
        ogTitle="Events | Shivling Temple Dekuli"
        ogDescription="Join us for the upcoming events at Swayambhu Shivling Temple Dekuli."
        ogUrl="https://dekulimandir.com/Events"
        canonicalUrl="https://dekulimandir.com/Events"
        structuredData={[breadcrumbSchema, eventsSchema]}
      />

      <div className="min-h-screen bg-[#1A1A1A]">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-20 lg:pb-20">
          {/* Header */}
          <div className="mb-10 text-center sm:mb-14 lg:mb-16">
            <h1
              className={`${serif.className} mb-4 px-2 text-4xl font-semibold tracking-wide text-[#EDEDED] sm:text-5xl lg:text-6xl`}
            >
              Temple Events
            </h1>
            {/* Pressed groove with a red line inside */}
            <div className={`${pressed} mx-auto mb-5 h-2 w-28 rounded-full p-[3px] sm:w-36`}>
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#E52200] to-[#C41000]"></div>
            </div>
            <p className="mx-auto max-w-3xl px-4 text-base text-[#EDEDED]/75 sm:text-lg lg:text-xl">
              Join us in celebrating sacred occasions and divine ceremonies at our holy temple
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-12 text-center" role="status">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#E52200]"></div>
              <p className="mt-4 text-[#EDEDED]/80">Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="py-12 text-center">
              <div className={`${pressed} mx-auto max-w-md rounded-3xl p-6`} role="alert">
                <p className="text-[#FF8A7A]">{error}</p>
              </div>
            </div>
          )}

          {/* Events Grid */}
          {!loading && !error && events.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-1 sm:gap-8 md:grid-cols-2 lg:gap-10">
              {events.map((event) => (
                <article
                  key={event._id}
                  className={`${raised} flex flex-col p-6 transition-shadow duration-300 hover:shadow-[12px_12px_26px_#0D0D0D,-12px_-12px_26px_#272727] sm:p-7 lg:p-8`}
                  itemScope
                  itemType="https://schema.org/Event"
                >
                  {/* Event Name */}
                  <h2
                    className="mb-3 text-lg font-bold text-[#FF6B4A] sm:text-xl lg:text-2xl"
                    itemProp="name"
                  >
                    {event.eventName}
                  </h2>

                  {/* Event Date: pressed pill */}
                  {event.eventDate && (
                    <div className="mb-4 flex items-center gap-2">
                      <time
                        className={`${pressedSm} inline-flex items-center gap-2 rounded-full px-4 py-1.5`}
                        dateTime={event.eventDate}
                        itemProp="startDate"
                      >
                        <FaCalendarAlt className="h-3.5 w-3.5 text-[#FF6B4A]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#EDEDED] sm:text-sm">
                          {formatDate(event.eventDate)}
                        </span>
                      </time>
                    </div>
                  )}

                  {/* Description */}
                  <p
                    className="mb-6 min-h-[60px] flex-1 text-xs leading-relaxed text-[#EDEDED]/80 sm:text-sm lg:text-base"
                    itemProp="description"
                  >
                    {event.description}
                  </p>

                  {/* Hidden location data for schema */}
                  <meta itemProp="location" content="Swayambhu Shivling Temple, Dekuli, Darbhanga, Bihar" />

                  {/* Download Button: raised red */}
                  <button
                    type="button"
                    onClick={() => handleDownload(event)}
                    className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold ${redButton}`}
                    aria-label={`Download details for ${event.eventName}`}
                  >
                    <FaFileDownload className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    <span className="text-xs sm:text-sm lg:text-base">Download Details</span>
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* No Events State */}
          {!loading && !error && events.length === 0 && (
            <div className="py-12 text-center">
              <div className={`${pressed} mx-auto max-w-md rounded-3xl p-8`}>
                <p className="text-lg text-[#EDEDED]">No events scheduled at the moment.</p>
                <p className="mt-2 text-sm text-[#EDEDED]/60">Please check back later for upcoming celebrations and festivals.</p>
              </div>
            </div>
          )}

          {/* Bottom Quote: pressed into the page */}
          <div className="mt-12 sm:mt-16 lg:mt-24">
            <div className={`${pressed} rounded-3xl px-4 py-8 text-center sm:py-10`}>
              <p
                className={`${serif.className} text-balance text-xl font-medium italic text-[#FF6B4A] sm:text-2xl lg:text-3xl`}
              >
                Every moment in devotion is a step closer to the divine
              </p>
              <p className="mt-3 text-base font-bold text-[#EDEDED] sm:mt-4 sm:text-lg lg:text-xl">
                Har Har Mahadev 🙏
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}