"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Room } from "@/config/content";

interface RoomCard3DProps {
  room: Room;
}

export default function RoomCard3D({ room }: RoomCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for cursor position relative to card dimensions
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Easing springs for smooth 3D tilt
  const springX = useSpring(x, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  // Transforms to convert coordinates to rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Translate transform for "pop-out" 3D depth effect
  const translateZ = useTransform(springY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize mouse position between -0.5 and 0.5
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group relative flex flex-col bg-neutral-900 border border-neutral-800/80 overflow-hidden hover:border-gold-500/30 transition-colors duration-500 rounded-none w-full"
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
          <Image
            src={`/photos/${room.image}.jpg`}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-colors duration-500" />
        </div>

        {/* Text Details Section */}
        <div className="p-8 flex flex-col flex-grow justify-between" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-xl text-neutral-100 tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                {room.name}
              </h3>
              <div className="flex flex-col items-end">
                <span className="text-sm font-sans font-medium text-neutral-300">
                  Starting
                </span>
                <span className="text-lg font-sans font-semibold text-neutral-100">
                  {room.price}
                  <span className="text-xs text-neutral-500 font-light">/night</span>
                </span>
              </div>
            </div>
            
            <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed mb-6 h-20 overflow-hidden line-clamp-4">
              {room.description}
            </p>
          </div>

          <div>
            {/* Features list */}
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

            {/* Check Availability Link */}
            <Link
              href="/contact-us"
              className="block text-center border border-neutral-800 hover:border-gold-400 text-neutral-300 hover:text-neutral-950 hover:bg-gold-400 text-xs font-semibold uppercase tracking-widest py-3 transition-all duration-300 rounded-none"
            >
              Book Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
