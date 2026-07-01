import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";
import { Star, Shield, Users, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: "Learn more about BM Grand Hotel & Resort in Malda. Discover our story, our family-friendly values, our pools, and our manicured gardens.",
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: "Learn more about BM Grand Hotel & Resort in Malda. Discover our story, our family-friendly values, our pools, and our manicured gardens.",
    images: ["/photos/profile_pic.jpg"]
  }
};

export default function AboutPage() {
  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner Section */}
        <div className="relative h-96 w-full mb-16 overflow-hidden border border-neutral-900">
          <Image
            src="/photos/3900352878032033290.jpg"
            alt="About BM Grand"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
              Our Identity
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 tracking-wide">
              About Us
            </h1>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-200 tracking-wide leading-tight">
              A Serene Escape Designed for Families & Celebrations
            </h2>
            <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
              Established in Malda, West Bengal, BM Grand Hotel & Resort represents a luxurious oasis crafted specifically for families, business travelers, and wedding parties. Our commitment is to deliver an exceptional hospitality experience, balancing uncompromised comfort with world-class amenities.
            </p>
            <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
              Our sprawling property features lush, manicured path gardens providing a serene backdrop for evening strolls and photography. Families can indulge in an array of activities, including a large, clean outdoor swimming pool with a safe zone for kids, a children's play area, and banquet spaces tailored for memorable events.
            </p>
            <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
              At BM Grand, our professional staff is dedicated to personalized service, ensuring that every detail is looked after and every guest feels like royalty. Whether you are seeking a quiet staycation or hosting a destination wedding, we look forward to welcoming you.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="p-8 bg-neutral-900 border border-neutral-850">
              <div className="h-10 w-10 text-gold-400 mb-4">
                <Users size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-neutral-100 mb-2 tracking-wide">Family First</h3>
              <p className="text-neutral-400 text-xs font-sans tracking-wide leading-relaxed">
                Dedicated recreation zones, safe kids' swimming areas, and a family-friendly atmosphere throughout the resort.
              </p>
            </div>

            <div className="p-8 bg-neutral-900 border border-neutral-850">
              <div className="h-10 w-10 text-gold-400 mb-4">
                <Compass size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-neutral-100 mb-2 tracking-wide">Prime Location</h3>
              <p className="text-neutral-400 text-xs font-sans tracking-wide leading-relaxed">
                Conveniently located at Setumore, Sahapur, providing quick access to Malda Railway Station and historic landmarks.
              </p>
            </div>

            <div className="p-8 bg-neutral-900 border border-neutral-850">
              <div className="h-10 w-10 text-gold-400 mb-4">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-neutral-100 mb-2 tracking-wide">Advanced Comfort</h3>
              <p className="text-neutral-400 text-xs font-sans tracking-wide leading-relaxed">
                Equipped with smart security networks, robust backup utilities, and 24/7 client care.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="border-t border-neutral-900 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
              Guest Testimonials
            </span>
            <h2 className="font-serif text-3xl text-neutral-100 tracking-wide">
              Reviews & Guestbook Entries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contentConfig.testimonials.map((t) => (
              <div key={t.id} className="p-8 bg-neutral-900 border border-neutral-850 flex flex-col justify-between">
                <div>
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
      </div>
    </main>
  );
}
