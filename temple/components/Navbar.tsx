
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import { FaOm } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Darshan", href: "/Darshan" },
  { name: "Events", href: "/Events" },
  { name: "Contact", href: "/Contact" },
];

const raisedSm =
  "shadow-[3px_3px_7px_#0D0D0D,-3px_-3px_7px_#272727]";

const pressedTray =
  "shadow-[inset_4px_4px_9px_#0D0D0D,inset_-4px_-4px_9px_#272727]";

const redButton =
  "bg-gradient-to-b from-[#E52200] to-[#C41000] text-white shadow-[5px_5px_12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:brightness-110 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B4A]";

function NavbarContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.toLowerCase().startsWith(href.toLowerCase());

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[#1A1A1A] shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#EC2000] to-[#DD1300] shadow-[3px_3px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]">
              <FaOm className="h-6 w-6 text-white" />
            </span>

            <span className="leading-tight">
              <span className="block text-sm font-semibold text-[#EDEDED]">
                Baba Bardhbaneshwar Nath
              </span>
              <span className="block text-xs text-[#A8A8A8]">
                Divine Grace Temple
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden items-center gap-1 rounded-full bg-[#1A1A1A] p-1.5 lg:flex ${pressedTray}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? `bg-[#1A1A1A] text-[#FF6B4A] ${raisedSm}`
                    : "text-[#EDEDED]/80 hover:text-[#FF6B4A]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Location Button */}
          <div className="hidden lg:block">
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${redButton}`}
            >
              <IoLocationSharp className="h-5 w-5" />
              Location
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className={`rounded-xl bg-[#1A1A1A] p-2.5 transition-shadow lg:hidden ${
              isMobileMenuOpen ? pressedTray : raisedSm
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#FF6B4A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#FF6B4A]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/5 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-xl bg-[#1A1A1A] px-4 py-3 text-base transition-colors ${
                  isActive(link.href)
                    ? `text-[#FF6B4A] ${pressedTray}`
                    : `text-[#EDEDED]/85 hover:text-[#FF6B4A] ${raisedSm}`
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              type="button"
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${redButton}`}
            >
              <IoLocationSharp className="h-5 w-5" />
              Location
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={<div className="h-20 bg-[#1A1A1A]" aria-hidden="true" />}
    >
      <NavbarContent />
    </Suspense>
  );
}
