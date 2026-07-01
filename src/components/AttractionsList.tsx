"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { contentConfig } from "@/config/content";

function AttractionCard({ d, index }: { d: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the individual card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate parallax offset for image height (moves slightly slower/faster than text)
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 py-16 border-b border-neutral-900/60 last:border-b-0 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Parallax Image Containment */}
      <div className="relative w-full lg:w-1/2 h-80 sm:h-96 overflow-hidden border border-neutral-900 bg-neutral-900">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
          <Image
            src={`/photos/${d.image}.jpg`}
            alt={d.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/20" />
        </motion.div>
      </div>

      {/* Description Info */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-2">
            {d.category}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide">
            {d.name}
          </h2>
        </div>
        <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
          {d.description}
        </p>
        <div className="pt-2">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-sans">
            Approx. 20-30 Mins Drive from Resort
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AttractionsList() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {contentConfig.destinations.map((d, index) => (
        <AttractionCard key={d.id} d={d} index={index} />
      ))}
    </div>
  );
}
