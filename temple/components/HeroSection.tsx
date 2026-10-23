// src/components/HeroSection.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
// import ImgScroll from './ImgScroll';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const HeroSection = () => {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-16 pt-32 sm:px-6">
        {/* Registration Number: solid raised badge, top center (below the navbar) */}
        <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 select-none">
          <p className="whitespace-nowrap rounded-full bg-[#1A1A1A] px-4 py-1.5 text-[11px] font-light tracking-wide text-white/80 shadow-[4px_4px_10px_rgba(0,0,0,0.6),-2px_-2px_8px_rgba(255,255,255,0.06)] sm:text-xs md:text-sm">
            Registration Number: 4542
          </p>
        </div>

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/temple-hero.png"
            alt="Temple"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Light shading; the bottom fades into the page color of the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#1A1A1A]"></div>
          {/* Soft dark patch behind the text only, so it stays readable on the white temple */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_55%,rgba(10,10,10,0.55),transparent_75%)]"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <h1 className="mb-4 flex justify-center">
            <Image
              src="/4.png"
              alt="Temple Logo"
              width={200}
              height={200}
              priority
              className="h-auto w-36 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:w-44 md:w-52"
            />
          </h1>

          {/* Decorative Divider */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#E52200] sm:w-16"></div>
            <Image
              src="/3.png"
              alt="Divider"
              width={100}
              height={100}
              className="h-auto w-16 brightness-[1.8] saturate-150 sm:w-20"
            />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#E52200] sm:w-16"></div>
          </div>

          {/* Subtitle */}
          <p
            className={`${serif.className} mx-auto mb-4 max-w-2xl text-balance text-2xl font-semibold leading-snug text-[#EDEDED] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-3xl md:text-4xl`}
          >
            Experience the sacred{' '}
            <span className="text-[#FF6B4A]">presence of Lord Shiva</span> in His{' '}
            <span className="text-[#FF6B4A]">self&#8209;manifested form</span>
          </p>

          <p className="mx-auto mb-9 max-w-xl text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-base">
            Nestled amidst peace and devotion, our temple is home to a Shambhu Shivlinga (Swayambhu Shivling) — a divine symbol that emerged naturally from the earth, not carved or placed by human hands.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            {/* Primary: raised red (presses in when clicked) */}
            <Link
              href="/Darshan"
              className="w-full min-w-[10.5rem] rounded-full bg-gradient-to-b from-[#E52200] to-[#C41000] px-8 py-3 text-center text-sm font-semibold text-white shadow-[6px_6px_14px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:brightness-110 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A] sm:w-auto"
            >
              Take Darshan
            </Link>

            {/* Secondary: raised dark */}
            <Link
              href="/About"
              className="w-full min-w-[10.5rem] rounded-full bg-[#1A1A1A] px-8 py-3 text-center text-sm font-medium text-[#EDEDED] shadow-[6px_6px_14px_rgba(0,0,0,0.7),-4px_-4px_12px_rgba(255,255,255,0.07)] transition-all duration-200 hover:text-[#FF6B4A] active:shadow-[inset_4px_4px_10px_#0D0D0D,inset_-4px_-4px_10px_#272727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A] sm:w-auto"
            >
              Explore Temple
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A]">
        <div>
          {/* <ImgScroll /> */}
        </div>
      </section>
    </>
  );
};
export default HeroSection;