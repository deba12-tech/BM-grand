import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bmgrand.com"),
  title: siteConfig.seo.title,
  description: siteConfig.seo.metaDescription,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.metaDescription,
    url: siteConfig.socials.instagram,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 320,
        height: 320,
        alt: siteConfig.name,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.metaDescription,
    images: [siteConfig.seo.ogImage],
  },
  icons: {
    icon: "/logo/logo-small.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans bg-neutral-950 text-neutral-100 antialiased overflow-x-hidden min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
