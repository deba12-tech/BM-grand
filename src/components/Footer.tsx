import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Instagram, Facebook } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand details */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-28">
                <Image
                  src="/logo/logo.png"
                  alt="BM Grand Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-neutral-500 text-xs sm:text-sm font-sans tracking-wide leading-relaxed max-w-sm">
              Malda’s biggest luxury hotel and resort. Providing state-of-the-art accommodations, wedding banquets, pool events, and delicious dining at BM Kitchen.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-neutral-500 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-neutral-500 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors duration-300">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-neutral-500 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors duration-300">
                  Galleries
                </Link>
              </li>
              <li>
                <Link href="/must-see-destinations" className="text-neutral-500 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-neutral-500 hover:text-gold-400 text-xs uppercase tracking-wider transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Local Details */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
              Our Location
            </h4>
            <span className="block text-neutral-500 text-xs sm:text-sm font-sans leading-relaxed">
              Sahapur, Setumore,<br />
              Nityanandapur, Old Malda,<br />
              West Bengal - 732142,<br />
              India
            </span>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 font-sans tracking-wide">
          <p>© {currentYear} {siteConfig.name}. All Rights Reserved.</p>
          <p className="mt-4 sm:mt-0">
            Crafted for premium hospitality.
          </p>
        </div>
      </div>
    </footer>
  );
}
