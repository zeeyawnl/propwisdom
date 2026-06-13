"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TrendingUp, ShieldCheck, Headset, ArrowUpRight } from "lucide-react";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top Row: Header & Subtext (Matching USD Bloom Layout) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 lg:mb-24">

          {/* Left: Heading & CTA */}
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 tracking-tight">
              What is <span className="font-serif italic text-teal-forest">PropWisdom?</span>
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-forest text-vanilla-latte rounded-full text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-teal-forest/90 transition-all hover:scale-105 active:scale-95"
            >
              Know More
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Subtext */}
          <div className="flex-1 lg:pl-10">
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-4">
              PROPWisdom is a MahaRERA registered, Pune-based real estate company helping you buy, sell, rent, and invest in properties with clarity, confidence, and complete transparency.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-forest/10 rounded-full">
              <ShieldCheck size={16} className="text-teal-forest" />
              <span className="text-teal-forest text-[11px] uppercase tracking-widest font-bold">RERA: A031262503558</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Wide Card (Span 2) - The Hero Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-vanilla-latte rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[350px] group cursor-pointer border border-vanilla-latte/50 hover:shadow-xl transition-all duration-500"
          >
            {/* Dynamic Background Image */}
            <div className="absolute top-0 right-0 w-2/3 h-full transition-transform duration-700 ease-out group-hover:scale-105 origin-right">
              {/* A gradient mask so the image fades smoothly into the vanilla background */}
              <div className="absolute inset-0 bg-gradient-to-r from-vanilla-latte via-vanilla-latte/80 to-transparent z-10" />
              <img
                src="/assets/images/imran.png"
                alt="Imran Khan"
                className="w-full h-full object-cover object-top grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 flex justify-between items-start">
              <div className="w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center text-teal-forest shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                <TrendingUp size={24} strokeWidth={1.5} />
              </div>

            </div>

            <div className="relative z-20 mt-auto pt-12 max-w-sm">
              <h3 className="text-3xl font-medium text-teal-forest mb-4 group-hover:tracking-wide transition-all duration-300">
                Smart Property <br className="hidden md:block" /> Decisions
              </h3>
              <p className="text-teal-forest/90 text-base leading-relaxed font-light">
                Find the right opportunities with expert guidance across primary sales, resale properties, and land investments exactly for your goals.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Square Card - The Trust Card */}
          <motion.div
            variants={itemVariants}
            className="bg-teal-forest rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden group border border-teal-forest hover:border-teal-forest/80 transition-colors"
          >
            {/* Subtle glowing orb background effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-colors duration-700" />

            <div className="relative z-10">
              <ShieldCheck size={32} className="text-vanilla-latte mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 origin-left" strokeWidth={1.5} />
              <h3 className="text-2xl font-medium text-white leading-tight">
                Verified Listings, <br />
                <span className="font-serif italic text-vanilla-latte">Real Value.</span>
              </h3>
            </div>
            <p className="relative z-10 text-vanilla-latte/90 text-sm md:text-base font-light leading-relaxed mt-8 group-hover:text-vanilla-latte/90 transition-colors">
              Access homes, flats, commercial spaces, and plots in Pune. No guesswork, just genuine deals.
            </p>
          </motion.div>

          {/* Card 3: Square Card - The Service Card */}
          <motion.div
            variants={itemVariants}
            className="bg-teal-forest rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden group border border-teal-forest hover:border-teal-forest/80 transition-colors"
          >
            {/* Architectural line pattern background */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />

            <div className="relative z-10">
              <Headset size={32} className="text-vanilla-latte mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 origin-left" strokeWidth={1.5} />
              <h3 className="text-2xl font-medium text-white leading-tight">
                End-to-End <br />
                <span className="font-serif italic text-vanilla-latte">Support.</span>
              </h3>
            </div>
            <p className="relative z-10 text-vanilla-latte/90 text-sm md:text-base font-light leading-relaxed mt-8 group-hover:text-vanilla-latte/90 transition-colors">
              From property search to final deal, we handle everything so you can focus on making the right move.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}