import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";
import RoomCard3D from "@/components/RoomCard3D";

export const metadata: Metadata = {
  title: `Our Rooms & Suites | ${siteConfig.name}`,
  description: "Explore our luxurious room categories including VIP Suites, Honeymoon Suites, and Executive Suites. Starting from ₹2,200.",
  openGraph: {
    title: `Our Rooms & Suites | ${siteConfig.name}`,
    description: "Explore our luxurious room categories including VIP Suites, Honeymoon Suites, and Executive Suites. Starting from ₹2,200.",
    images: ["/photos/website/rooms/16591640514-850x460_167.jpg"]
  }
};

export default function RoomsPage() {
  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Exclusive Stays
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 tracking-wide mb-6">
            Rooms & Suites
          </h1>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Relax in spaces designed for complete comfort. Browse our official suites and rooms, featuring elegant layouts and premium facilities in the heart of Malda.
          </p>
        </div>

        {/* 3D Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {contentConfig.rooms.map((room) => (
            <RoomCard3D key={room.id} room={room} />
          ))}
        </div>

        {/* Note on prices */}
        <div className="mt-16 text-center text-xs text-neutral-600 font-sans tracking-wide">
          <p>* Room prices represent standard starting rates and may vary based on seasons and holiday weekends.</p>
        </div>
      </div>
    </main>
  );
}
