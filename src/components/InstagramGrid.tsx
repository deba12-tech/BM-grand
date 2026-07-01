"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Play } from "lucide-react";
import { Instagram } from "@/components/Icons";
import { siteConfig } from "@/config/site";

export interface InstagramPostData {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  isVideo: boolean;
  filename: string;
  videoFilename: string | null;
}

interface InstagramGridProps {
  posts: InstagramPostData[];
}

export default function InstagramGrid({ posts }: InstagramGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Take the first 12 posts to display in the main grid
  const displayPosts = posts.slice(0, 12);

  if (displayPosts.length === 0) {
    return (
      <section id="gallery" className="py-24 bg-neutral-950 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Social Feed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide mb-6">
            Follow Us On Instagram
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-8 font-sans">
            Connect with us on social media to see our latest offers, guests' staycation stories, and special events.
          </p>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 border border-neutral-800 hover:border-gold-500 hover:text-gold-400 text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 font-sans"
          >
            <Instagram size={14} />
            <span>@bmgrand_hotel_and_resort</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Guest Chronicles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide mb-6">
            Moments From Instagram
          </h2>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Take a look at the real-life resort experiences, luxury events, and unforgettable destination weddings hosted with us.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden bg-neutral-900 cursor-pointer"
            >
              {/* Post Image */}
              <Image
                src={`/photos/${post.filename}`}
                alt={post.caption ? post.caption.slice(0, 100) : "Instagram post"}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Video Indicator */}
              {post.isVideo && (
                <div className="absolute top-3 right-3 z-20 h-7 w-7 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center rounded-full text-gold-400">
                  <Play size={12} fill="currentColor" className="translate-x-[0.5px]" />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-6">
                {/* Meta details */}
                <div className="flex justify-end space-x-4 text-xs font-sans text-neutral-300">
                  <span className="flex items-center space-x-1">
                    <Heart size={14} className="text-rose-500 fill-rose-500" />
                    <span>{post.likesCount}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle size={14} className="text-sky-400 fill-sky-400" />
                    <span>{post.commentsCount}</span>
                  </span>
                </div>

                {/* Caption Snippet */}
                <div>
                  <p className="text-neutral-300 text-xs font-sans tracking-wide leading-relaxed line-clamp-3 mb-4">
                    {post.caption || "View post at BM Grand Hotel & Resort"}
                  </p>
                  <div className="flex space-x-2">
                    {post.isVideo && post.videoFilename && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo(post.videoFilename);
                        }}
                        className="bg-neutral-100 hover:bg-gold-500 text-neutral-950 hover:text-neutral-950 text-[10px] font-semibold uppercase tracking-widest px-3 py-2 rounded-none transition-colors"
                      >
                        Watch Video
                      </button>
                    )}
                    <a
                      href={`${siteConfig.socials.instagram}/p/${post.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-neutral-700 hover:border-gold-400 text-neutral-300 hover:text-gold-400 text-[10px] font-semibold uppercase tracking-widest px-3 py-2 rounded-none transition-colors flex items-center space-x-1"
                    >
                      <Instagram size={10} />
                      <span>View on IG</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-gold-400 transition-colors font-sans"
          >
            <span>Follow our journey on Instagram</span>
            <Instagram size={14} />
          </a>
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-neutral-950/90 z-[100] flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm aspect-[9/16] bg-black border border-neutral-800 shadow-2xl overflow-hidden"
            >
              <video
                src={`/videos/${selectedVideo}`}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs px-3 py-2 uppercase tracking-widest transition-colors font-sans"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
