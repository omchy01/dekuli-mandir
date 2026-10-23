// src/app/Darshan/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import SEO from "@/components/SEO";

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

// Neumorphism: every surface is #1A1A1A (same as the page). Only the two shadows
// (dark bottom-right, light top-left) make a shape look raised or pressed in.
const raised =
  'rounded-3xl bg-[#1A1A1A] shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]';
const pressed =
  'bg-[#1A1A1A] shadow-[inset_6px_6px_12px_#0D0D0D,inset_-6px_-6px_12px_#272727]';

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
      name: 'Darshan',
      item: 'https://dekulimandir.com/Darshan'
    }
  ]
};

const darshanSchema = {
  '@context': 'https://schema.org',
  '@type': 'DarshanPage',
  name: 'Darshan Swayambhu Shivling Temple',
  description: 'Darshan information for Swayambhu Shivling Temple Dekuli',
  url: 'https://dekulimandir.com/Darshan',
  mainEntity: {
    '@type': 'HinduTemple',
    name: 'Swayambhu Shivling Temple',
    telephone: '+91-94731-91319',
    email: 'contact@dekulimandir.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baba Vardhmaneshwar Nath Mahadev, Pandasarasi',
      addressLocality: 'Dekuli, Darbhanga',
      addressRegion: 'Bihar',
      postalCode: '846001',
      addressCountry: 'IN'
    }
  }
};

interface ImageType {
  __v: number;
  _id: string;
  imgUrl: string;
  alt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Darshan() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data: { images: ImageType[] } = await res.json();
        setImages(data.images);
        setError(null);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Close the popup with the Escape key
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImage]);

  const openImage = (image: ImageType) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SEO
        title='Darshan Gallery | Swayambhu Shivling Temple Dekuli'
        description='Explore the sacred darshan images of Swayambhu Shivling at Dekuli Temple. Experience the divine presence of Lord Shiva through our photo gallery of temple rituals, pujas, and sacred moments.'
        keywords={[
          'Dekuli temple darshan',
          'Shivling photos',
          'Temple gallery Dekuli',
          'Lord Shiva darshan',
          'Sacred images',
          'Temple photos Bihar',
          'Swayambhu Shivling pictures',
          'Divine darshan',
          'Temple rituals photos'
        ]}
        ogTitle="Contact | Shivling Temple Dekuli"
        ogDescription="Get in touch with Swayambhu Shivling Temple for darshan timings, puja bookings, and visit information.."
        ogUrl="https://dekulimandir.com/Darshan"
        canonicalUrl="https://dekulimandir.com/Darshan"
        structuredData={[breadcrumbSchema, darshanSchema]}
      />

      {/* pt-28 / sm:pt-32 keeps the header clear of the fixed navbar */}
      <section className="min-h-screen bg-[#1A1A1A] px-0 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Om symbol */}
          <div className="mb-12 flex flex-col items-center justify-center gap-6 sm:mb-16 sm:gap-8">
            <Image
              src="/1.png"
              alt="Om Namah Shivaya"
              width={150}
              height={150}
              className="h-auto w-24 sm:w-32 lg:w-36"
            />

            <div className="text-center">
              <h1
                className={`${serif.className} mb-4 text-4xl font-semibold tracking-wide text-[#EDEDED] sm:text-5xl lg:text-6xl`}
              >
                Darshan Gallery
              </h1>
              <p className="mx-auto max-w-2xl px-4 text-base text-[#EDEDED]/75 sm:text-lg lg:text-xl">
                Experience the divine presence through these sacred moments
              </p>
              {/* Pressed groove with a red line inside */}
              <div className={`${pressed} mx-auto mt-5 h-2 w-28 rounded-full p-[3px] sm:mt-6 sm:w-36`}>
                <div className="h-full w-full rounded-full bg-gradient-to-r from-[#E52200] to-[#C41000]"></div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-12 text-center" role="status">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#E52200]"></div>
              <p className="mt-4 text-[#EDEDED]/80">Loading gallery...</p>
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

          {/* Gallery Grid */}
          {!loading && !error && images.length > 0 && (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
              {images.map((image) => (
                <button
                  key={image._id}
                  type="button"
                  onClick={() => openImage(image)}
                  aria-label={`View image: ${image.alt || "Sacred Moment"}`}
                  className={`${raised} group block w-full p-3 text-left transition-shadow duration-300 hover:shadow-[12px_12px_26px_#0D0D0D,-12px_-12px_26px_#272727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A] sm:p-4`}
                >
                  <span className="relative block aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={image.imgUrl}
                      alt={image.alt || "Sacred Moment"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Inner shadow: makes the photo look set into the frame */}
                    <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_3px_3px_8px_rgba(0,0,0,0.6),inset_-2px_-2px_6px_rgba(255,255,255,0.08)]"></span>

                    {/* Caption overlay on hover */}
                    <span className="absolute inset-0 block bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="absolute bottom-0 left-0 right-0 block p-4 sm:p-5">
                        <span className="block text-sm font-semibold text-[#EDEDED] sm:text-base">
                          {image.alt || "Sacred Moment"}
                        </span>
                        <span className="mt-1 block text-xs text-[#FF6B4A] sm:text-sm">
                          Click to view
                        </span>
                      </span>
                    </span>

                    {/* Zoom badge */}
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A]/90 text-[#FF6B4A] shadow-[3px_3px_7px_rgba(0,0,0,0.6)]">
                      <FaSearchPlus className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* No Images State */}
          {!loading && !error && images.length === 0 && (
            <div className="py-12 text-center">
              <div className={`${pressed} mx-auto max-w-md rounded-3xl p-8`}>
                <p className="text-lg text-[#EDEDED]">No images available at the moment.</p>
                <p className="mt-2 text-sm text-[#EDEDED]/60">Please check back later.</p>
              </div>
            </div>
          )}

          {/* Sacred message */}
          <div className="mt-12 text-center sm:mt-16 lg:mt-20">
            <div className={`${pressed} inline-block rounded-full px-8 py-3 sm:px-10 sm:py-4`}>
              <p className={`${serif.className} text-xl font-semibold text-[#FF6B4A] sm:text-2xl`}>
                Har Har Mahadev
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt || "Sacred Moment"}
          className="fixed inset-0 z-50 flex animate-in fade-in items-center justify-center bg-black/95 p-4 duration-300 sm:p-6"
          onClick={closeImage}
        >
          {/* Close button: raised, red icon */}
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FF6B4A] shadow-[4px_4px_10px_rgba(0,0,0,0.7),-3px_-3px_8px_rgba(255,255,255,0.06)] transition-all hover:text-white active:shadow-[inset_3px_3px_8px_#0D0D0D,inset_-3px_-3px_8px_#272727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A] sm:right-6 sm:top-6"
            onClick={closeImage}
            aria-label="Close image"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          {/* Image container */}
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-3xl bg-[#1A1A1A] p-3 shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727] sm:p-4">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={selectedImage.imgUrl}
                  alt={selectedImage.alt || "Sacred Moment"}
                  width={1200}
                  height={800}
                  className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* Image caption: pressed */}
            {selectedImage.alt && (
              <div className={`${pressed} mt-5 rounded-2xl px-6 py-3 text-center sm:mt-6 sm:px-8 sm:py-4`}>
                <p className="text-base font-semibold text-[#EDEDED] sm:text-lg lg:text-xl">
                  {selectedImage.alt}
                </p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#EDEDED]/50 sm:bottom-6 sm:text-sm">
            Click anywhere or press Esc to close
          </div>
        </div>
      )}
    </>
  );
}