"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Target, Gem, MapPin } from "lucide-react";

export default function AboutContent() {
  // Animation variants for smooth, staggered reveals
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 overflow-hidden">

      {/* 1. Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-24 md:mb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span variants={fadeUp} className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
            Our Story
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-[1.1] mb-8">
            Redefining Real Estate <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">in Pune.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
            We believe that finding a sanctuary shouldn&apos;t be a transaction, but a seamless transition. PropWisdom brings clarity, curation, and confidence to your property journey.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Editorial Image Gallery */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-24 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-7 h-[400px] md:h-full rounded-[2rem] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-teal-forest/10 z-10 mix-blend-multiply" />
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
              alt="Luxury Pune Real Estate"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[600px] md:h-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[2rem] overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Interiors"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-teal-forest rounded-[2rem] p-10 flex flex-col justify-center text-white relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-vanilla-latte/20 rounded-full blur-xl" />
              <h3 className="text-3xl font-serif italic text-vanilla-latte mb-4">10+ Years</h3>
              <p className="text-white/80 font-light leading-relaxed">
                Of deep market expertise, building a foundation of trust and uncompromising quality across Maharashtra.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Philosophy (Split Section) */}
      <section className="bg-white py-24 md:py-32 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="flex-1 w-full">
              <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
                The Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-8">
                Beyond the Square Footage.
              </h2>
              <div className="space-y-6 text-slate-500 font-light text-lg leading-relaxed">
                <p>
                  Real estate isn&apos;t just about finding a space; it&apos;s about securing your future. Based in the heart of Pune, PropWisdom was founded to bridge the gap between aspirational living and transparent transactions.
                </p>
                <p>
                  Whether you are investing in a high-yield commercial space, acquiring strategic land parcels, or searching for a residential sanctuary, our approach remains the same: rigorous due diligence, data-backed valuations, and an unwavering commitment to your goals.
                </p>
              </div>
            </div>

            {/* Minimalist Stats/Quote Block */}
            <div className="flex-1 w-full bg-vanilla-latte/30 p-12 md:p-16 rounded-[2rem] border border-vanilla-latte/50">
              <h3 className="text-3xl md:text-4xl font-serif italic text-teal-forest leading-tight mb-8">
                &quot;We measure our success not by the volume of transactions, but by the generational wealth and peace of mind we build for our clients.&quot;
              </h3>
              <div className="flex items-center gap-4 pt-8 border-t border-teal-forest/10">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-forest/20">
                  <img src="/assets/images/imran.png" alt="Imran Khan, CEO" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium">Imran Khan, CEO.</p>
                  <p className="text-teal-forest/60 text-[10px] uppercase tracking-widest font-bold">Pune, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
            Our Standards
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            The PropWisdom <span className="font-serif italic text-teal-forest">Advantage</span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Value 1 */}
          <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group">
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">Absolute Transparency</h3>
            <p className="text-slate-500 font-light leading-relaxed">
              No hidden clauses or surprise fees. We conduct exhaustive legal and physical verifications to ensure every property we list is 100% genuine and secure.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group">
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <Gem size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">Curated Excellence</h3>
            <p className="text-slate-500 font-light leading-relaxed">
              We sift through the noise. Our portfolio consists only of premium residential, commercial, and land assets that meet our strict criteria for aesthetics and value.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group">
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <Target size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">Data-Driven Strategy</h3>
            <p className="text-slate-500 font-light leading-relaxed">
              We leverage deep local market insights, ROI benchmarking, and growth corridor analysis to ensure your investment is strategically positioned for the future.
            </p>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}