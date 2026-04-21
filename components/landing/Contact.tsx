"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";

// Lucide removed brand icons, so we provide our own standard SVG components
const Instagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Side: Header & Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 w-full flex flex-col justify-center"
          >
            {/* Header */}
            <div className="mb-12 md:mb-16 max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight leading-tight">
                Start the <span className="font-serif italic text-teal-forest">Conversation.</span>
              </h2>
            </div>

            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Minimalist Input Field */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light focus:outline-none focus:border-teal-forest transition-colors peer placeholder-transparent"
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-5 text-[11px] uppercase tracking-widest text-slate-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:-top-5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-teal-forest"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light focus:outline-none focus:border-teal-forest transition-colors peer placeholder-transparent"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-5 text-[11px] uppercase tracking-widest text-slate-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:-top-5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-teal-forest"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light focus:outline-none focus:border-teal-forest transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-5 text-[11px] uppercase tracking-widest text-slate-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:-top-5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-teal-forest"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-slate-300 py-3 text-slate-900 font-light focus:outline-none focus:border-teal-forest transition-colors peer placeholder-transparent resize-none"
                  placeholder="Tell us about your requirements..."
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 -top-5 text-[11px] uppercase tracking-widest text-slate-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:-top-5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-teal-forest"
                >
                  Your Message
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="group flex items-center gap-4 px-8 py-4 bg-teal-forest text-vanilla-latte uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-teal-forest/90 transition-all rounded-full"
                >
                  Submit Inquiry
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Side: Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-teal-forest rounded-[2rem] p-10 md:p-14 h-full flex flex-col justify-between text-white relative overflow-hidden">
              {/* Decorative Abstract Shape */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-vanilla-latte/10 rounded-full blur-xl" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-vanilla-latte/5 rounded-full blur-2xl" />

              <div className="relative z-10 space-y-12">
                <div>
                  <h3 className="text-2xl font-serif italic text-vanilla-latte mb-8">PROPWisdom HQ</h3>

                  <ul className="space-y-8">
                    <li className="flex items-start gap-4">
                      <MapPin className="text-vanilla-latte shrink-0 mt-1" size={20} />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Visit Us</span>
                        <p className="font-light leading-relaxed opacity-90">
                          Shop No.6, Ground floor, Chintamani Capital,<br />
                          opposite to Paranjape Forestrail Bhugaon,<br />
                          Pune Maharashtra 412115
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <Phone className="text-vanilla-latte shrink-0 mt-1" size={20} />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Call Us</span>
                        <a href="tel:+918975123786" className="font-light opacity-90 hover:text-vanilla-latte transition-colors">
                          +91 89751 23786
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <Mail className="text-vanilla-latte shrink-0 mt-1" size={20} />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Email Us</span>
                        <a href="mailto:propwisdom@gmail.com" className="font-light opacity-90 hover:text-vanilla-latte transition-colors">
                          propwisdom@gmail.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* WhatsApp Direct Action */}
                <a
                  href="https://wa.me/918975123786?text=Hi%2C%20I%20saw%20your%20website%20and%20I%20am%20looking%20to%20connect."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-4 rounded-full transition-all backdrop-blur-md group w-fit"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="text-[12px] uppercase tracking-widest font-bold">Chat on WhatsApp</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Connect</span>
                <div className="flex gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
                  <a href="https://www.instagram.com/propwisdom" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-colors">
                    <Instagram size={16} />
                  </a>
                  <a href="https://www.facebook.com/share/1EeGxVqnft/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-colors">
                    <Facebook size={16} />
                  </a>
                  <a href="https://youtube.com/@propwisdom-pune?si=1krNtYLXKILOPwMq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-colors">
                    <Youtube size={16} />
                  </a>
                  <a href="https://www.linkedin.com/company/propwisdom/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-colors">
                    <Linkedin size={14} />
                  </a>

                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}