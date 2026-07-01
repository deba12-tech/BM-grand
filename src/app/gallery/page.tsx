import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/config/site";
import GalleryView from "@/components/GalleryView";
import { InstagramPostData } from "@/components/InstagramGrid";

export const metadata: Metadata = {
  title: `Resort & Event Galleries | ${siteConfig.name}`,
  description: "View our photo gallery showcasing wedding decoration setups, resort dining, swimming pools, and beautiful guest moments at BM Grand.",
  openGraph: {
    title: `Resort & Event Galleries | ${siteConfig.name}`,
    description: "View our photo gallery showcasing wedding decoration setups, resort dining, swimming pools, and beautiful guest moments at BM Grand.",
    images: ["/photos/website/general/1-1_117.jpg"]
  }
};

function getInstagramPosts(): InstagramPostData[] {
  try {
    const filePath = path.join(process.cwd(), "data", "raw", "posts.json");
    const photosDir = path.join(process.cwd(), "public", "photos");

    if (fs.existsSync(filePath) && fs.existsSync(photosDir)) {
      const content = fs.readFileSync(filePath, "utf8");
      const posts = JSON.parse(content);
      const existingPhotos = fs.readdirSync(photosDir);

      return posts
        .map((post: any) => {
          const id = post.id || post.shortCode;
          const filename = `${id}.jpg`;
          return {
            id,
            caption: post.caption || "",
            likesCount: post.likesCount || 0,
            commentsCount: post.commentsCount || 0,
            isVideo: !!post.videoUrl,
            filename,
          };
        })
        .filter((post: InstagramPostData) => existingPhotos.includes(post.filename));
    }
  } catch (e) {
    console.error("Error reading Instagram posts on server:", e);
  }
  return [];
}

export default async function GalleryPage() {
  const posts = getInstagramPosts();

  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Media Highlights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 tracking-wide mb-6">
            Galleries
          </h1>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Explore photo captures of our premium resort amenities, destination wedding banquets, and authentic moments shared by our guests on social media.
          </p>
        </div>

        {/* Gallery View Tabs Grid */}
        <GalleryView instagramPosts={posts} />
      </div>
    </main>
  );
}
