import React from "react";
import { siteConfig } from "@/config/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.socials.instagram, // fallback URL is the instagram page
    "logo": `${siteConfig.socials.instagram}/photos/profile_pic.jpg`,
    "telephone": siteConfig.contact.phones[0],
    "email": siteConfig.contact.emails[0],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.location.address,
      "addressLocality": siteConfig.location.city,
      "addressRegion": siteConfig.location.state,
      "postalCode": siteConfig.location.zipCode,
      "addressCountry": "IN"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Luxury Swimming Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wedding Banquet Halls",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Restaurant & Room Service",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Rooftop Helipad",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Gardens & Play Area",
        "value": true
      }
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
