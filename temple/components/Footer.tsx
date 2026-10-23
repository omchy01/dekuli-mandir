"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaOm, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Darshan", href: "/Darshan" },
  { name: "Events", href: "/Events" },
  { name: "Contact", href: "/Contact" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "Twitter", href: "#", Icon: FaTwitter },
];

// Neumorphic shadows: every surface is #1A1A1A, only the shadows create the 3D shape
const raised = "shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]";
const raisedSm = "shadow-[4px_4px_9px_#0D0D0D,-4px_-4px_9px_#272727]";
const pressed = "shadow-[inset_3px_3px_7px_#0D0D0D,inset_-3px_-3px_7px_#272727]";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Raised panel */}
        <div className={`rounded-3xl bg-[#1A1A1A] p-6 sm:p-10 ${raised}`}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {/* Temple Info */}
            <div className="text-center sm:text-left">
              <div className="mb-3 flex items-center justify-center gap-3 sm:justify-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#EC2000] to-[#DD1300] shadow-[3px_3px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <FaOm className="h-5 w-5 text-white" />
                </span>
                <h3 className="text-lg font-semibold text-[#FF6B4A] sm:text-xl">
                  Baba Bardhbaneshwar Nath
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#EDEDED]/70 sm:text-base">
                Home to the sacred Swayambhu Shivling, a self-manifested divine presence of Lord Shiva. Experience peace and devotion.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="mb-4 text-lg font-semibold text-[#FF6B4A] sm:text-xl">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#EDEDED]/70 transition-colors hover:text-[#FF6B4A] sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="text-center sm:col-span-2 sm:text-left lg:col-span-1">
              <h4 className="mb-4 text-lg font-semibold text-[#FF6B4A] sm:text-xl">
                Connect With Us
              </h4>
              <div className="mb-4 flex justify-center gap-4 sm:justify-start">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FF6B4A] transition-all duration-200 hover:bg-gradient-to-b hover:from-[#E52200] hover:to-[#C41000] hover:text-white active:shadow-[inset_3px_3px_7px_#0D0D0D,inset_-3px_-3px_7px_#272727] ${raisedSm}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-[#EDEDED]/70">
                Follow us for updates and blessings
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: pressed groove, then the copyright */}
        <div className={`mx-auto mt-10 h-1.5 w-full max-w-md rounded-full bg-[#1A1A1A] ${pressed}`} />
        <p className="mt-6 text-center text-sm text-[#EDEDED]/60">
          © {year ?? ""} Baba Bardhbaneshwar Nath. All rights reserved. 🙏
        </p>
      </div>
    </footer>
  );
}