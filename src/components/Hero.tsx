"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-45 pointer-events-none"
        poster="/photos/3900352878032033290.jpg"
      >
        <source src="/videos/hero-reel.mp4" type="video/mp4" />
        <source src="/videos/3900352878032033290.mp4" type="video/mp4" />
      </video>

      {/* Fallback Static Image Preloader (Next.js Optimized Image) */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/photos/3900352878032033290.jpg"
          alt="BM Grand Resort Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-gold-400 font-semibold mb-4"
        >
          Welcome to absolute serenity
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-24 w-64 sm:h-32 sm:w-80 md:h-40 md:w-[400px] mb-6"
        >
          <Image
            src="/logo/logo.png"
            alt="BM Grand Logo"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="max-w-xl text-xs sm:text-sm md:text-base text-neutral-400 font-sans tracking-wide leading-relaxed mb-10"
        >
          Malda’s finest escape. Where luxury meets comfort, and every celebration becomes an unforgettable masterpiece.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <a
            href="#rooms"
            className="bg-gold-500 hover:bg-gold-600 text-neutral-950 text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Explore Rooms</span>
            <ArrowRight size={14} />
          </a>
          <a
            href="#enquire"
            className="border border-neutral-700 hover:border-gold-400 text-neutral-300 hover:text-gold-400 text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center bg-neutral-950/40 backdrop-blur-sm"
          >
            Plan Wedding / Event
          </a>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-neutral-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </div>
  );
}
