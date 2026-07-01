import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Us & Bookings | ${siteConfig.name}`,
  description: "Get in touch with BM Grand Hotel & Resort in Malda. Call us directly, send an email, or message us on WhatsApp to book your stay or plan weddings.",
  openGraph: {
    title: `Contact Us & Bookings | ${siteConfig.name}`,
    description: "Get in touch with BM Grand Hotel & Resort in Malda. Call us directly, send an email, or message us on WhatsApp to book your stay or plan weddings.",
    images: ["/photos/profile_pic.jpg"]
  }
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.contact.whatsapp.prefilledMessage
  )}`;

  return (
    <main className="bg-neutral-950 min-h-screen text-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
            Plan Your Stay
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-100 tracking-wide mb-6">
            Contact Us
          </h1>
          <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed">
            Have questions about room bookings, wedding banquet rates, or dining reservations? Reach out directly to our guest relations desk.
          </p>
        </div>

        {/* Contact Grid details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {/* Card 1: Direct Actions */}
          <div className="space-y-6">
            <div className="p-8 bg-neutral-900 border border-neutral-850">
              <h2 className="font-serif text-2xl text-neutral-100 mb-6 tracking-wide">
                Direct Channels
              </h2>
              
              <div className="space-y-6">
                {/* Phones */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-950 text-gold-400 border border-neutral-800">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      Call Us
                    </h3>
                    {siteConfig.contact.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="block text-sm text-neutral-200 hover:text-gold-400 font-sans tracking-wide transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-950 text-gold-400 border border-neutral-800">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      Email Us
                    </h3>
                    {siteConfig.contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block text-sm text-neutral-200 hover:text-gold-400 font-sans tracking-wide transition-colors"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-950 text-gold-400 border border-neutral-800">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                      WhatsApp Chat
                    </h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-neutral-200 hover:text-gold-400 font-sans tracking-wide transition-colors"
                    >
                      Message +91 90460 04891
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Resort Location & Hours */}
          <div className="space-y-6">
            <div className="p-8 bg-neutral-900 border border-neutral-850 h-full flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl text-neutral-100 mb-6 tracking-wide">
                  Location & Timings
                </h2>

                <div className="space-y-6">
                  {/* Location Address */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-neutral-950 text-gold-400 border border-neutral-800">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                        Resort Address
                      </h3>
                      <p className="text-sm text-neutral-200 font-sans tracking-wide leading-relaxed">
                        BM Grand Hotel & Resorts,<br />
                        Sahapur, Setumore, Nityanandapur,<br />
                        Old Malda, West Bengal - 732142
                      </p>
                    </div>
                  </div>

                  {/* Operational Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-neutral-950 text-gold-400 border border-neutral-800">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                        Front Desk Hours
                      </h3>
                      <p className="text-sm text-neutral-200 font-sans tracking-wide">
                        Open 24 Hours / 7 Days a week
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-6 border-t border-neutral-800/80 mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-semibold uppercase tracking-widest py-4 transition-colors duration-300 rounded-none font-sans"
                >
                  Start Booking Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded map section */}
        <div className="max-w-5xl mx-auto">
          <div className="h-96 w-full bg-neutral-900 border border-neutral-850 flex items-center justify-center p-6 text-center">
            <div className="space-y-4">
              <MapPin size={32} className="text-gold-400 mx-auto" />
              <h3 className="font-serif text-lg text-neutral-100">Find Us On Google Maps</h3>
              <p className="text-neutral-500 text-xs sm:text-sm font-sans max-w-sm mx-auto">
                Setumore is located right off the National Highway, making it extremely easy to reach by car or taxi.
              </p>
              <a
                href={siteConfig.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-neutral-800 hover:border-gold-400 text-neutral-300 hover:text-neutral-950 hover:bg-gold-400 text-xs font-semibold uppercase tracking-widest px-6 py-3 transition-colors rounded-none font-sans"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
