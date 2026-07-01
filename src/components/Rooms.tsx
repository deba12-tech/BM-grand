"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { contentConfig } from "@/config/content";
import { Info, HelpCircle } from "lucide-react";

export default function Rooms() {
  return (
    <section id="rooms" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Luxurious Lodging
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide mb-6">
            Accommodations & Suites
          </h2>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Relax in spaces designed for absolute rest. Every room is meticulously crafted to ensure premium comfort, spacious layouts, and modern aesthetics.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentConfig.rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-gold-500/40 transition-colors duration-500"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`/photos/${room.image}.jpg`}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-colors duration-500" />
              </div>

              {/* Text Section */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-xl text-neutral-100 tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                      {room.name}
                    </h3>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-sans font-medium text-neutral-200">
                        {room.price}
                        <span className="text-xs text-neutral-500 font-light">/night</span>
                      </span>
                      {room.isPriceGuessed && (
                        <span className="text-[10px] text-amber-500 font-sans flex items-center mt-1 select-none" title="This price is a placeholder guess. Customize in src/config/content.ts">
                          <HelpCircle size={10} className="mr-1" />
                          Guessed Price
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed mb-6">
                    {room.description}
                  </p>
                </div>

                <div>
                  {/* Features List */}
                  <div className="border-t border-neutral-800/80 pt-6 mb-6">
                    <ul className="space-y-2">
                      {room.features.slice(0, 4).map((feat, i) => (
                        <li key={i} className="text-xs text-neutral-400 font-sans tracking-wide flex items-center">
                          <span className="h-1 w-1 bg-gold-400 rounded-full mr-2"></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Link */}
                  <a
                    href="#enquire"
                    className="block text-center border border-neutral-800 hover:border-gold-500 text-neutral-300 hover:text-neutral-950 hover:bg-gold-500 text-xs font-semibold uppercase tracking-widest py-3 transition-all duration-300 rounded-none"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing disclaimer */}
        <div className="mt-8 text-center flex justify-center items-center text-xs text-neutral-500 font-sans select-none">
          <Info size={12} className="mr-2 text-amber-500" />
          <span>Note: All room prices marked with "Guessed Price" are placeholders. You can change these in the file <code className="text-neutral-400">src/config/content.ts</code>.</span>
        </div>
      </div>
    </section>
  );
}
