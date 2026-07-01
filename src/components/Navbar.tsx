"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Rooms", href: "/rooms" },
    { name: "Galleries", href: "/gallery" },
    { name: "Destinations", href: "/must-see-destinations" },
    { name: "Contact Us", href: "/contact-us" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-10 w-24 md:h-12 md:w-32 transition-transform duration-300 group-hover:scale-102">
            <Image
              src="/logo/logo.png"
              alt="BM Grand"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest transition-all duration-300 font-sans ${
                  isActive
                    ? "text-gold-400 font-semibold border-b border-gold-400/50 pb-1"
                    : "text-neutral-300 hover:text-gold-400 pb-1"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Booking CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={`tel:${siteConfig.contact.phones[0].replace(/\s+/g, "")}`}
            className="text-neutral-400 hover:text-gold-400 transition-colors duration-300 p-2"
            title="Call Us Directly"
          >
            <Phone size={16} />
          </a>
          <Link
            href="/contact-us"
            className="bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-none transition-all duration-300 shadow-md hover:shadow-gold-500/20"
          >
            Book Stay
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-neutral-300 hover:text-gold-400 transition-colors duration-300 p-1"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-neutral-950 border-l border-neutral-900 shadow-2xl z-40 transform transition-transform duration-500 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-8 pt-24">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest transition-colors font-sans block ${
                    isActive ? "text-gold-400 font-semibold" : "text-neutral-300 hover:text-gold-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-4">
            <a
              href={`tel:${siteConfig.contact.phones[0].replace(/\s+/g, "")}`}
              className="flex items-center justify-center space-x-2 border border-neutral-800 text-neutral-300 text-xs uppercase tracking-widest py-3 hover:bg-neutral-900 transition-colors"
            >
              <Phone size={14} />
              <span>Call Resort</span>
            </a>
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gold-400 hover:bg-gold-500 text-neutral-950 text-center text-xs font-semibold uppercase tracking-widest py-4 transition-colors"
            >
              Book Stay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
