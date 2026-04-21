"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
              PROPWisdom is a Pune based real estate company helping you buy, sell, and rent properties with clarity and confidence across residential, commercial, and land investments.
            </p>
          </div>
        </div>

        {/* Bottom Row: Bento Box Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          {/* Card 1: Wide Card (Span 2) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-vanilla-latte/60 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[350px] group"
          >
            {/* Minimalist Graphic/Image (Replaces the flower/coin) */}
            <div className="absolute -bottom-10 -right-10 w-2/3 h-full opacity-40 mix-blend-multiply transition-transform duration-700 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                alt="Luxury Interior Abstract"
                className="w-full h-full object-cover rounded-tl-[4rem]"
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-medium text-teal-forest mb-4">
                Smart Property Decisions
              </h3>
            </div>

            <div className="relative z-10 mt-auto pt-12 max-w-sm">
              <p className="text-teal-forest/90 text-lg leading-relaxed font-light">
                Find the right opportunities with expert guidance across primary sales, resale properties, and land investments exactly for your goals.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Square Card */}
          <motion.div
            variants={itemVariants}
            className="bg-teal-forest rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
          >
            <h3 className="text-2xl font-medium text-white leading-tight">
              Verified Listings, <br />
              Real Value.
            </h3>
            <p className="text-vanilla-latte/90 text-base md:text-lg font-light leading-relaxed lg:mt-10 text-lg leading-relaxed font-light ">
              Access homes, flats, commercial spaces, and plots in Pune. No guesswork, just genuine Deals.
            </p>
          </motion.div>

          {/* Card 3: Square Card */}
          <motion.div
            variants={itemVariants}
            className="bg-teal-forest rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
          >
            <h3 className="text-2xl font-medium text-white leading-tight">
              End-to-End <br />Support
            </h3>
            <p className="text-vanilla-latte/90 text-base md:text-lg font-light leading-relaxed lg:mt-10 text-lg leading-relaxed font-light ">
              From property search to final deal, we handle everything so you can focus on making the right move.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}