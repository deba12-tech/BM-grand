"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowDown } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ZoomCarouselProps {
  images: GalleryImage[];
}

export default function ZoomCarousel({ images }: ZoomCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Monitor screen width for mobile check
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const totalSteps = 8; // Bounded number of transitions within our 400vh budget
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stepProgressVal = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If user prefers reduced motion or is on mobile, bypass heavy scroll calculations
    if (prefersReducedMotion || isMobile) return;

    const rawStep = latest * totalSteps;
    const currentStep = Math.min(Math.floor(rawStep), totalSteps - 1);
    const currentProgress = rawStep - currentStep;

    stepProgressVal.set(currentProgress);

    if (currentStep !== activeStep) {
      setActiveStep(currentStep);
    }
  });

  if (!images || images.length === 0) return null;

  // Fallback View: Swipeable Carousel for Mobile, or Grid for Reduced Motion
  if (isMobile) {
    return (
      <div className="py-12 bg-neutral-950 border-t border-neutral-900">
        <div className="px-6 mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-bold block mb-1">
            Swipe Gallery
          </span>
          <h3 className="font-serif text-2xl text-neutral-100 tracking-wide">
            Cinematic Highlights
          </h3>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-6 no-scrollbar">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 h-96 snap-center relative bg-neutral-900 border border-neutral-850"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 to-transparent p-6">
                <span className="text-xs text-neutral-300 font-sans tracking-wide">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="mb-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2 block">
            Resort Showcase
          </span>
          <h2 className="font-serif text-3xl text-neutral-100 tracking-wide">
            Highlights Grid
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="relative h-64 overflow-hidden border border-neutral-900 bg-neutral-900">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Indices mapping for loop wrap-around
  const currentIndex = activeStep % images.length;
  const nextIndex = (activeStep + 1) % images.length;

  // Scroll animations mapping
  const currentScale = useTransform(stepProgressVal, [0, 1], [1.0, 1.15]);
  const currentOpacity = useTransform(stepProgressVal, [0, 0.8, 1], [1, 1, 0]);

  const nextScale = useTransform(stepProgressVal, [0, 0.2, 1], [0.85, 0.9, 1.0]);
  const nextOpacity = useTransform(stepProgressVal, [0, 0.8, 1], [0, 0.1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-neutral-950 w-full">
      {/* Sticky Window viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-neutral-950 z-0" />

        {/* Current Image Layer */}
        <motion.div
          key={`curr-${currentIndex}`}
          style={{
            scale: currentScale,
            opacity: currentOpacity,
          }}
          className="absolute inset-0 w-full h-full z-10 origin-center"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle gold-hued gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/80" />
        </motion.div>

        {/* Next Image Layer (preloaded for crossfade) */}
        {images.length > 1 && (
          <motion.div
            key={`next-${nextIndex}`}
            style={{
              scale: nextScale,
              opacity: nextOpacity,
            }}
            className="absolute inset-0 w-full h-full z-20 origin-center pointer-events-none"
          >
            <Image
              src={images[nextIndex].src}
              alt={images[nextIndex].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/80" />
          </motion.div>
        )}

        {/* Floating Descriptive Tag Overlay */}
        <div className="absolute bottom-16 left-8 sm:left-16 z-30 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold block mb-3">
            Cinematic Experience — Scroll to Browse
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl text-neutral-100 tracking-wide leading-tight mb-2">
            {images[currentIndex].alt}
          </h3>
          <span className="text-xs text-neutral-400 font-sans tracking-wide uppercase">
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 sm:right-16 z-30 flex items-center space-x-2 text-neutral-400 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans">
            Scroll
          </span>
          <ArrowDown size={12} />
        </div>
      </div>
    </div>
  );
}
