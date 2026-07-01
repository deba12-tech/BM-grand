"use client";

import React, { useState } from "react";
import Image from "next/image";
import { InstagramPostData } from "@/components/InstagramGrid";
import ZoomCarousel from "@/components/ZoomCarousel";
import { Heart, MessageCircle, Play, PlayCircle } from "lucide-react";

interface GalleryViewProps {
  instagramPosts: InstagramPostData[];
}

export default function GalleryView({ instagramPosts }: GalleryViewProps) {
  const [activeTab, setActiveTab] = useState<"resort" | "moments">("resort");

  const resortImages = [
    { src: "/photos/website/general/1-1_117.jpg", alt: "Resort Exterior View" },
    { src: "/photos/website/general/16335010354_455.jpg", alt: "Grand Entrance Hall" },
    { src: "/photos/website/general/16335010425_57.jpg", alt: "Luxury Suite Living Room" },
    { src: "/photos/website/general/16335010629_42.jpg", alt: "Swimming Pool Area" },
    { src: "/photos/website/general/3-1_116.jpg", alt: "Premium Room Seating" },
    { src: "/photos/website/general/16591640514_464.jpg", alt: "VIP Suite Bedroom" },
    { src: "/photos/website/general/16591642664_458.jpg", alt: "Executive Suite Bed" },
    { src: "/photos/website/general/16591642442_460.jpg", alt: "Modern Suite Decor" },
    { src: "/photos/website/gallery/16335010211-440x340_155.jpg", alt: "Banquet Hall Wedding Setup" },
    { src: "/photos/website/gallery/16591635014-440x340_154.jpg", alt: "Premium Dining Area" },
    { src: "/photos/website/gallery/16591637581-440x340_153.jpg", alt: "Scenic Garden Path" }
  ];

  const momentsImages = instagramPosts.map((post) => ({
    src: `/photos/${post.filename}`,
    alt: post.caption.slice(0, 50) || "Instagram Moment"
  }));

  const activeCarouselImages = activeTab === "resort" ? resortImages : momentsImages;

  return (
    <div className="space-y-16">
      {/* Tabs Filter Buttons */}
      <div className="flex justify-center space-x-6 border-b border-neutral-900 pb-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("resort")}
          className={`pb-3 text-xs uppercase tracking-widest transition-all duration-300 font-sans border-b-2 ${
            activeTab === "resort"
              ? "text-gold-400 border-gold-400 font-semibold"
              : "text-neutral-500 hover:text-neutral-300 border-transparent"
          }`}
        >
          Resort Galleries
        </button>
        <button
          onClick={() => setActiveTab("moments")}
          className={`pb-3 text-xs uppercase tracking-widest transition-all duration-300 font-sans border-b-2 ${
            activeTab === "moments"
              ? "text-gold-400 border-gold-400 font-semibold"
              : "text-neutral-500 hover:text-neutral-300 border-transparent"
          }`}
        >
          Instagram Moments
        </button>
      </div>

      {/* Grid view sections */}
      <div>
        <div className="mb-8 flex justify-between items-center border-b border-neutral-900 pb-3">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
            Overview Grid
          </span>
          <span className="text-[10px] text-neutral-500 font-sans tracking-wide">
            {activeTab === "resort" ? resortImages.length : instagramPosts.length} Items
          </span>
        </div>

        {/* Resort Images Grid */}
        {activeTab === "resort" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resortImages.map((img, i) => (
              <div
                key={i}
                className="group relative h-72 w-full overflow-hidden bg-neutral-900 border border-neutral-850"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-serif text-sm text-neutral-100 tracking-wide">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instagram Posts Grid */}
        {activeTab === "moments" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={`https://www.instagram.com/p/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-72 w-full overflow-hidden bg-neutral-900 border border-neutral-850 block"
              >
                <Image
                  src={`/photos/${post.filename}`}
                  alt={post.caption || "Instagram Post"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                {/* Video icon */}
                {post.isVideo && (
                  <div className="absolute top-4 right-4 bg-neutral-950/60 p-2 rounded-full text-neutral-100 backdrop-blur-sm">
                    <Play size={12} fill="currentColor" />
                  </div>
                )}
                {/* Overlay hover details */}
                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <p className="text-neutral-300 text-xs font-sans tracking-wide leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                  <div className="flex space-x-6 text-neutral-300 text-xs font-sans">
                    <span className="flex items-center space-x-2">
                      <Heart size={14} fill="currentColor" className="text-gold-400" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <MessageCircle size={14} />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic Zoom Carousel Section */}
      <div className="border-t border-neutral-900/60 pt-16">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Cinematic Sequence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide mb-4">
            Interactive Showcase
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">
            Scroll down slowly to cycle through high-fidelity images of our {activeTab === "resort" ? "resort estate" : "social highlights"} in a dynamic zoom sequence.
          </p>
        </div>

        {/* Bounded Scroll-linked zoom carousel */}
        <ZoomCarousel images={activeCarouselImages} />
      </div>
    </div>
  );
}
