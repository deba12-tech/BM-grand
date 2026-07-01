import fs from "fs";
import path from "path";
import Image from "next/image";
import Hero from "@/components/Hero";
import Rooms from "@/components/Rooms";
import Amenities from "@/components/Amenities";
import InstagramGrid, { InstagramPostData } from "@/components/InstagramGrid";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.metaDescription,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.metaDescription,
    images: ["/photos/profile_pic.jpg"],
  },
};

// Server side data loading for Instagram posts
function getInstagramPosts(): InstagramPostData[] {
  try {
    const filePath = path.join(process.cwd(), "data", "raw", "posts.json");
    const photosDir = path.join(process.cwd(), "public", "photos");
    const videosDir = path.join(process.cwd(), "public", "videos");

    if (fs.existsSync(filePath) && fs.existsSync(photosDir)) {
      const content = fs.readFileSync(filePath, "utf8");
      const posts = JSON.parse(content);
      
      const existingPhotos = fs.readdirSync(photosDir);
      const existingVideos = fs.existsSync(videosDir) ? fs.readdirSync(videosDir) : [];

      return posts
        .map((post: any) => {
          const id = post.id || post.shortCode;
          const filename = `${id}.jpg`;
          const hasVideo = !!post.videoUrl;
          const videoFilename = hasVideo ? `${id}.mp4` : null;

          return {
            id,
            caption: post.caption || "",
            likesCount: post.likesCount || 0,
            commentsCount: post.commentsCount || 0,
            isVideo: hasVideo && existingVideos.includes(videoFilename || ""),
            filename,
            videoFilename: hasVideo && existingVideos.includes(videoFilename || "") ? videoFilename : null,
          };
        })
        .filter((post: InstagramPostData) => existingPhotos.includes(post.filename));
    }
  } catch (e) {
    console.error("Error reading Instagram posts on server:", e);
  }
  return [];
}

export default async function Home() {
  const posts = getInstagramPosts();

  return (
    <>
      {/* Hero Header */}
      <Hero />

      {/* Main content sections */}
      <main>
        
        {/* About Us & Welcome Section (Rewritten for SEO / uniqueness) */}
        <section className="py-24 bg-neutral-950 border-t border-neutral-900">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold block">
              A Luxurious Oasis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-neutral-100 tracking-wide leading-tight">
              Crafting Unmatched Family Getaways & Celebrations
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base font-sans tracking-wide leading-relaxed">
              Designed as a premium escape in the heart of Malda, BM Grand Hotel & Resort brings together sophisticated hospitality and extensive leisure. Stroll along our manicured path gardens, take a refreshing dip in our sprawling outdoor swimming pool, or watch your kids play in our dedicated children's activity area. Here, every stay is tailored to feel like royalty.
            </p>
          </div>
        </section>

        {/* Accommodations Grid */}
        <Rooms />

        {/* Resort Experience / Amenities */}
        <Amenities />

        {/* Wedding / Event Showcase Banner */}
        <section className="relative py-32 overflow-hidden bg-neutral-900 border-t border-b border-neutral-950">
          {/* Background image optimized */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/photos/3901781847390421824.jpg"
              alt="Destination Wedding"
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 px-3 py-1 text-gold-400 text-[10px] uppercase tracking-widest font-semibold">
                <Sparkles size={12} />
                <span>Destination Weddings</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide leading-tight">
                Your Dream Celebrations,<br />
                Brought to Life.
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed max-w-xl">
                Say "I Do" at Malda's biggest wedding destination. Offering majestic settings, custom thematic decorations, premium buffet catering, and executive suite bookings.
              </p>
              <a
                href="#enquire"
                className="inline-flex items-center space-x-3 bg-gold-500 hover:bg-gold-600 text-neutral-950 text-xs font-semibold uppercase tracking-widest px-8 py-4 transition-all duration-300 rounded-none"
              >
                <span>Plan Event</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
                Guest Reviews
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide">
                What Guests Say About Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contentConfig.testimonials.map((t) => (
                <div key={t.id} className="p-8 bg-neutral-900 border border-neutral-800/80 flex flex-col justify-between">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-6 text-gold-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-sm font-sans tracking-wide leading-relaxed italic mb-8">
                      "{t.text}"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                      {t.name}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-sans tracking-wider uppercase">
                      {t.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="py-24 bg-neutral-900 border-t border-neutral-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
                Local Wonders
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide mb-6">
                Explore Malda & Around
              </h2>
              <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
                BM Grand Hotel & Resort serves as the perfect base to discover the rich cultural heritage and historical landmarks of Bengal's ancient capitals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contentConfig.destinations.map((d) => (
                <div key={d.id} className="group bg-neutral-950 border border-neutral-850 overflow-hidden flex flex-col justify-between">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={`/photos/${d.image}.jpg`}
                      alt={d.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-neutral-950/25" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-400 font-sans block mb-2">
                        {d.category}
                      </span>
                      <h3 className="font-serif text-xl text-neutral-100 mb-4 tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                        {d.name}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Chronicles Gallery */}
        <InstagramGrid posts={posts} />

        {/* FAQ Accordion Section */}
        <section className="py-24 bg-neutral-950 border-t border-neutral-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
                Frequently Asked
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide">
                Common Questions
              </h2>
            </div>

            <div className="space-y-6">
              {contentConfig.faqs.map((faq) => (
                <div key={faq.id} className="border-b border-neutral-850 pb-6">
                  <h3 className="font-serif text-lg text-neutral-100 mb-3 tracking-wide">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elegant Form & CTA */}
        <ContactForm />

      </main>
    </>
  );
}
