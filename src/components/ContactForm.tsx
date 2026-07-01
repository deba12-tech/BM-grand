"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";
import { Phone, Mail, MessageSquare, Send, Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "super-deluxe",
    guests: "2",
    checkIn: "",
    checkOut: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message content
    const roomName = contentConfig.rooms.find(r => r.id === formData.roomType)?.name || formData.roomType;
    const textMessage = `Hello BM Grand Hotel & Resort! I would like to make a reservation enquiry:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email || "Not provided"}
- Room Type: ${roomName}
- Guests: ${formData.guests}
- Check-in Date: ${formData.checkIn || "Not specified"}
- Check-out Date: ${formData.checkOut || "Not specified"}
- Message: ${formData.message || "No additional requirements"}`;

    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(textMessage)}`;
    
    // Open WhatsApp
    window.open(waUrl, "_blank");
    setSubmitted(true);

    // Reset after some time
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="enquire" className="py-24 bg-neutral-900 border-t border-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Premium Contact details & Fallbacks */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
                Reservations & Events
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-wide mb-6">
                Start Your Journey
              </h2>
              <p className="text-neutral-400 text-sm font-sans tracking-wide leading-relaxed mb-10">
                Planning a relaxing staycation or a fairy-tale wedding? Get in touch with our team. Complete the form to message us on WhatsApp instantly, or use our direct contact channels.
              </p>
            </div>

            {/* Direct contact info blocks */}
            <div className="space-y-6">
              {/* Phones */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center text-gold-400">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Direct Dial</h4>
                  {siteConfig.contact.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="block text-sm text-neutral-200 hover:text-gold-400 transition-colors font-sans"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center text-gold-400">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Email Enquiries</h4>
                  {siteConfig.contact.emails.map((email, i) => (
                    <a
                      key={i}
                      href={`mailto:${email}`}
                      className="block text-sm text-neutral-200 hover:text-gold-400 transition-colors font-sans"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 border border-neutral-800 bg-neutral-950 flex items-center justify-center text-gold-400">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Our Location</h4>
                  <span className="block text-sm text-neutral-200 font-sans leading-relaxed">
                    {siteConfig.location.address},<br />
                    {siteConfig.location.city}, {siteConfig.location.state} - {siteConfig.location.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Booking/Enquiry Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 p-8 md:p-12 relative overflow-hidden">
            {submitted && (
              <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-8">
                <div className="h-16 w-16 bg-gold-500 text-neutral-950 flex items-center justify-center rounded-full mb-6">
                  <Check size={28} />
                </div>
                <h3 className="font-serif text-2xl text-neutral-100 tracking-wide mb-2">Enquiry Sent</h3>
                <p className="text-neutral-400 text-sm max-w-sm mb-6">
                  We have opened your WhatsApp messenger with the pre-filled booking details. Simply tap send to start chatting!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-neutral-800 hover:border-gold-500 text-neutral-300 hover:text-gold-400 text-xs font-semibold uppercase tracking-widest px-6 py-3 transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Arijit Sen"
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Room selection */}
                <div className="flex flex-col">
                  <label htmlFor="roomType" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Preferred Room
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors cursor-pointer"
                  >
                    {contentConfig.rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                    <option value="banquet-hall">Banquet Hall / Event space</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="flex flex-col">
                  <label htmlFor="guests" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                    <option value="wedding-party">Wedding Party (50+)</option>
                  </select>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check In */}
                <div className="flex flex-col">
                  <label htmlFor="checkIn" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors cursor-pointer"
                  />
                </div>

                {/* Check Out */}
                <div className="flex flex-col">
                  <label htmlFor="checkOut" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none transition-colors cursor-pointer"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Additional Details / Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about special requests, event decor theme, or wedding catering needs..."
                  className="bg-neutral-900 border border-neutral-800 focus:border-gold-500 text-neutral-100 text-sm px-4 py-3 rounded-none outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-neutral-950 font-semibold text-xs uppercase tracking-widest py-4 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Enquiry on WhatsApp</span>
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
