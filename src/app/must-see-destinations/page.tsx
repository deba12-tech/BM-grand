import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import AttractionsList from "@/components/AttractionsList";

export const metadata: Metadata = {
  title: `Must-See Destinations | ${siteConfig.name}`,
  description: "Discover nearby historical wonders of Malda, Gour & Pandua. Stay at BM Grand Hotel & Resort and explore Adina Mosque, Pandua Ruins, and Kadam Rasul Mosque.",
  openGraph: {
    title: `Must-See Destinations | ${siteConfig.name}`,
    description: "Discover nearby historical wonders of Malda, Gour & Pandua. Stay at BM Grand Hotel & Resort and explore Adina Mosque, Pandua Ruins, and Kadam Rasul Mosque.",
    images: ["/photos/website/destinations/adina-440x340_159.jpg"]
  }
};

export default function DestinationsPage() {
  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Explore Malda
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 tracking-wide mb-6">
            Must-See Destinations
          </h1>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Bengal's ancient capitals house incredible medieval ruins, historic mosques, and peaceful retreats, all within convenient driving distances from BM Grand.
          </p>
        </div>

        {/* Attractions Parallax List */}
        <AttractionsList />
      </div>
    </main>
  );
}
