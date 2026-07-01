/**
 * Content configuration for BM Grand Hotel & Resort.
 * Last updated: July 1, 2026 (based on official website scrape).
 */

export interface Room {
  id: string;
  name: string;
  price: string; // Stored as starting price
  isPriceGuessed: boolean;
  description: string;
  features: string[];
  image: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Destination {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export const contentConfig = {
  rooms: [
    {
      id: "vip-suite",
      name: "VIP Suite Room",
      price: "₹5,000",
      isPriceGuessed: false,
      description: "Our VIP Suite rooms represent the peak of resort comfort. Designed with premium architecture, these suites offer spacious settings to share wonderful memories with your loved ones while enjoying top-tier amenities. Excellent for both extended holidays and executive business trips.",
      features: ["Spacious Sitting Area", "Premium Balcony View", "Complimentary Buffet Breakfast", "Mini-Fridge & Coffee Station", "Advanced Air Conditioning"],
      image: "website/rooms/16591640514-850x460_167"
    },
    {
      id: "honeymoon-suite",
      name: "Honeymoon Suite Room",
      price: "₹4,200",
      isPriceGuessed: false,
      description: "Elegantly soothing, our Honeymoon Suites provide the perfect cozy atmosphere for couples. Features spacious layouts with great views all around, allowing you to get lost in the surrounding natural beauty while enjoying modern amenities and romantic ambiance.",
      features: ["Plush King Size Bed", "Scenic Nature View", "Elegant Custom Decor", "In-Room Dining Options", "Complimentary Welcome Drinks"],
      image: "website/rooms/16591637702-850x460_241"
    },
    {
      id: "executive-suite",
      name: "Executive Suite Room",
      price: "₹4,000",
      isPriceGuessed: false,
      description: "Blending traditional architecture with modern technology, our Executive Suites are larger than standard rooms and feature dedicated seating areas. Ideal for families and group travelers looking to experience Malda's premium hospitality.",
      features: ["Additional Seating Lounge", "Work Desk & Ergonomic Setup", "Flat Screen Smart TV", "High-speed Wi-Fi Access", "Modern Bath Amenities"],
      image: "website/rooms/16591642664-850x460_311"
    },
    {
      id: "super-deluxe",
      name: "Super Deluxe Room",
      price: "₹2,200",
      isPriceGuessed: false,
      description: "Spacious and fully furnished, our Super Deluxe Rooms are designed to provide complete comfort. Features double beds, contemporary styling, and all the essential amenities for a peaceful and relaxing stay.",
      features: ["Comfortable Double Bed", "Contemporary Furnishings", "Air Conditioning", "Free High-speed Wi-Fi", "Dedicated Room Service"],
      image: "website/rooms/16591634822-850x460_384"
    }
  ] as Room[],

  amenities: [
    {
      id: "swimming-pool",
      name: "Outdoor Swimming Pool",
      description: "Dive into our outdoor swimming pool, featuring advanced water purification systems and a safe play zone designed specifically for kids.",
      icon: "Waves"
    },
    {
      id: "high-speed-wifi",
      name: "High-speed Wi-Fi",
      description: "Enjoy uninterrupted, high-speed Wi-Fi connection throughout our rooms and resort gardens, perfect for business or leisure.",
      icon: "Wifi"
    },
    {
      id: "smart-security",
      name: "24/7 Smart Security",
      description: "Your safety is our priority. Covered by a high-definition CCTV camera network and 24-hour physical security patrol.",
      icon: "ShieldAlert"
    },
    {
      id: "banquet-halls",
      name: "Wedding & Banquet Halls",
      description: "Host grand destination weddings or corporate seminars with customizable decor, seating up to 1000 guests.",
      icon: "Sparkles"
    },
    {
      id: "bm-kitchen",
      name: "BM Kitchen (Multi-Cuisine)",
      description: "Savor a premium dining experience with skilled culinary chefs serving multi-cultural cuisines and local delicacies.",
      icon: "Utensils"
    },
    {
      id: "helipad",
      name: "Private Rooftop Helipad",
      description: "Experience absolute exclusivity with our private rooftop helipad for high-profile guest arrivals.",
      icon: "Navigation"
    }
  ] as Amenity[],

  testimonials: [
    {
      id: "1",
      name: "S. Sen",
      role: "Verified Guest",
      text: "The chefs at BM Grand have put together an outstanding menu. The multi-cuisine dishes at BM Kitchen are a level above standard hotel food.",
      rating: 5
    },
    {
      id: "2",
      name: "A. Mukhopadhyay",
      role: "Family Staycation",
      text: "Malda has never had such a majestic resort before. The beautiful rooms and sprawling swimming pool make it the perfect family getaway.",
      rating: 5
    },
    {
      id: "3",
      name: "R. Banerjee",
      role: "Business Traveler",
      text: "The hotel staff are extremely professional and caring. They knew their duties well and made my business tour comfortable.",
      rating: 5
    }
  ] as Testimonial[],

  faqs: [
    {
      id: "1",
      question: "How far is the resort from Malda Town Railway Station?",
      answer: "The resort is situated at Sahapur, Setumore, which is approximately a 12 to 15-minute drive from Malda Town Railway Station."
    },
    {
      id: "2",
      question: "Are banquets and weddings customizable?",
      answer: "Yes, we offer fully customizable packages including theme decorations, custom multi-cuisine catering by BM Kitchen, and seating arrangements."
    },
    {
      id: "3",
      question: "Is there private parking available?",
      answer: "Yes, we provide secure, free on-site private parking with 24/7 CCTV security surveillance for all our guests."
    },
    {
      id: "4",
      question: "What are the check-in and check-out timings?",
      answer: "Our standard check-in time is 12:00 PM and check-out is 12:00 PM. Early check-in or late check-out is subject to availability."
    }
  ] as FAQ[],

  destinations: [
    {
      id: "pandua",
      name: "Pandua Ruins",
      category: "Historical Marvels",
      description: "A historic city featuring majestic architectural ruins and ancient monuments from Bengal's early sultanate era.",
      image: "website/destinations/pandua-440x340_158"
    },
    {
      id: "adina",
      name: "Adina Mosque",
      category: "Natural & Serene Retreats",
      description: "A majestic medieval structure known for its colossal size and intricate stone carvings, reflecting Bengal's architectural heritage.",
      image: "website/destinations/adina-440x340_159"
    },
    {
      id: "kadam-rasul",
      name: "Kadam Rasul Mosque",
      category: "Museums & Archaeological Sites",
      description: "A sacred shrine housing the footprint replica of Prophet Muhammad, set within a beautiful medieval brick pavilion.",
      image: "website/destinations/kadam-rasul-mosque-440x340_160"
    }
  ] as Destination[]
};
