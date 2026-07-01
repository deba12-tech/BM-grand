"use client";

import React from "react";
import { motion } from "framer-motion";
import { contentConfig } from "@/config/content";
import * as Icons from "lucide-react";

export default function Amenities() {
  return (
    <section id="experience" className="py-24 bg-neutral-900 border-t border-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
              Resort Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide">
              World-Class Comfort & Amenities
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans tracking-wide leading-relaxed mt-6 md:mt-0">
            From our grand banquet halls perfect for destination weddings, to refreshing dips in the kids-friendly pool, we curate an environment of pure indulgence.
          </p>
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentConfig.amenities.map((amenity, idx) => {
            // Dynamic Icon Resolution
            const IconComponent = (Icons as any)[amenity.icon] || Icons.HelpCircle;

            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-8 bg-neutral-950 border border-neutral-800/80 hover:border-gold-500/30 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="h-12 w-12 bg-neutral-900 border border-neutral-800 text-gold-400 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-neutral-950 transition-all duration-300">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-neutral-100 tracking-wide mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {amenity.name}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                {/* Micro-interaction line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-400 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
