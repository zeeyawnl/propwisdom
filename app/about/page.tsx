"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Gem,
  MapPin,
  ArrowRight,
  TrendingUp,
  Headset,
  BadgeCheck,
  ExternalLink,
  Building2,
  Users,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function AboutContent() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-0 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-24 md:mb-32">

        <motion.span
          variants={fadeUp}
          className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
        >
          Our Story
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          Your Trusted Partner in{" "}
          <br className="hidden md:block" />
          <span className="font-serif italic text-teal-forest">
            Pune Real Estate.
          </span>
        </motion.h1>
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
              <h3 className="text-3xl font-serif italic text-vanilla-latte mb-4">
                14+ Years
              </h3>
              <p className="text-white/80 font-light leading-relaxed">
                Of deep market expertise, building a foundation of trust and
                uncompromising quality across Maharashtra. Hundreds of families
                have found their dream homes through us.
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
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-8">
                We Don&apos;t Just Close Deals,{" "}
                <br className="hidden md:block" />
                <span className="font-serif italic text-teal-forest">
                  We Build Futures.
                </span>
              </h2>
              <div className="space-y-6 text-slate-500 font-light text-lg leading-relaxed">
                <p>
                  Real estate isn&apos;t just about four walls and a roof;
                  it&apos;s about securing your family&apos;s future, growing
                  your wealth, and finding a place where life happens. Based in
                  the heart of Pune, PropWisdom was founded to bring
                  transparency, trust, and genuine value to every property
                  transaction.
                </p>
                <p>
                  Whether you are investing in a high-yield commercial space,
                  acquiring strategic land parcels, renting a home, or searching
                  for your dream residential property, our approach remains the
                  same: rigorous due diligence, data-backed valuations, and an
                  unwavering commitment to your success.
                </p>
                <p className="text-teal-forest font-medium">
                  When you work with PropWisdom, you&apos;re not just getting a
                  real estate agent; you&apos;re getting a dedicated partner who
                  treats your goals as their own.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="flex-1 w-full bg-vanilla-latte/30 p-12 md:p-16 rounded-[2rem] border border-vanilla-latte/50">
              <h3 className="text-3xl md:text-4xl font-serif italic text-teal-forest leading-tight mb-8">
                &quot;We measure our success not by the volume of transactions,
                but by the generational wealth and peace of mind we build for
                our clients.&quot;
              </h3>
              <div className="flex items-center gap-4 pt-8 border-t border-teal-forest/10">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-forest/20">
                  <img
                    src="/assets/images/imran.png"
                    alt="Imran Khan, CEO"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-slate-900 font-medium">
                    Imran Khan, CEO.
                  </p>
                  <p className="text-teal-forest/60 text-[10px] uppercase tracking-widest font-bold">
                    Pune, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RERA Compliance & Trust Section */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16 md:mb-20">
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-4 block">
              Regulatory Compliance
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              MahaRERA{" "}
              <span className="font-serif italic text-teal-forest">
                Registered
              </span>
            </h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-br from-teal-forest to-[#0d3536] rounded-[2rem] p-10 md:p-16 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-vanilla-latte/10 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left: RERA Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-vanilla-latte/20 rounded-2xl flex items-center justify-center">
                    <BadgeCheck
                      size={28}
                      className="text-vanilla-latte"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-vanilla-latte/60 text-[10px] uppercase tracking-[0.3em] font-bold">
                      MahaRERA Registration
                    </p>
                    <p className="text-white text-xl font-medium">
                      Verified Agent
                    </p>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-6">
                  Your Investment is{" "}
                  <span className="font-serif italic text-vanilla-latte">
                    Protected
                  </span>
                </h3>

                <p className="text-white/70 font-light text-lg leading-relaxed mb-8">
                  PropWisdom is a registered real estate agent under the
                  Maharashtra Real Estate Regulatory Authority (MahaRERA). This
                  means every transaction we facilitate adheres to strict
                  regulatory standards, ensuring complete transparency,
                  accountability, and protection for our clients.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 w-full">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-1">
                        RERA Registration Number
                      </p>
                      <p className="text-vanilla-latte text-2xl md:text-3xl font-bold tracking-wide">
                        A031262503558
                      </p>
                    </div>
                    <a
                      href="https://maharera.mahaonline.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-vanilla-latte text-teal-forest rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors shrink-0"
                    >
                      Verify on MahaRERA
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href="https://maharera.mahaonline.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex md:hidden w-full items-center justify-center gap-2 px-6 py-3 bg-vanilla-latte text-teal-forest rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors shrink-0"
                    >
                      Verify
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    "All dealings are fully compliant with RERA regulations",
                    "Complete transparency in pricing and documentation",
                    "Clients can independently verify our registration online",
                    "Legal protection and dispute resolution under RERA framework",
                  ].map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/80 font-light text-sm"
                    >
                      <ShieldCheck
                        size={16}
                        className="text-vanilla-latte shrink-0 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Trust Stats */}
              <div className="flex-shrink-0 w-full lg:w-auto grid grid-cols-2 gap-4 lg:gap-5">
                {[
                  { icon: Users, num: "450+", label: "Happy Clients" },
                  { icon: Building2, num: "₹850Cr+", label: "Portfolio Value" },
                  { icon: Award, num: "10+", label: "Years Experience" },
                  { icon: ShieldCheck, num: "100%", label: "Verified Listings" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/15 transition-colors"
                  >
                    <stat.icon
                      size={24}
                      className="text-vanilla-latte mx-auto mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.num}
                    </p>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Core Values Grid */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
            Our Standards
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            The PropWisdom{" "}
            <span className="font-serif italic text-teal-forest">
              Advantage
            </span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group"
          >
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <ShieldCheck size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">
              Absolute Transparency
            </h3>
            <p className="text-slate-500 font-light leading-relaxed">
              No hidden clauses or surprise fees. We conduct exhaustive legal
              and physical verifications to ensure every property we list is
              100% genuine and secure. Your trust is our foundation.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group"
          >
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <Gem size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">
              Curated Excellence
            </h3>
            <p className="text-slate-500 font-light leading-relaxed">
              We sift through the noise. Our portfolio consists only of premium
              residential, commercial, and land assets that meet our strict
              criteria for authenticity, value, and growth potential.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500 group"
          >
            <div className="w-14 h-14 bg-vanilla-latte/50 rounded-full flex items-center justify-center text-teal-forest mb-8 group-hover:scale-110 group-hover:bg-teal-forest group-hover:text-vanilla-latte transition-all duration-500">
              <Target size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4">
              Data-Driven Strategy
            </h3>
            <p className="text-slate-500 font-light leading-relaxed">
              We leverage deep local market insights, ROI benchmarking, and
              growth corridor analysis to ensure your investment is
              strategically positioned for maximum returns.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 6. Floating CTA Banner */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="bg-teal-forest rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 lg:p-24 relative overflow-hidden text-center shadow-2xl">
          {/* Decorative Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-vanilla-latte/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              Let&apos;s Build Your <br className="hidden md:block" />
              <span className="font-serif italic text-vanilla-latte">
                Real Estate Success Story
              </span>
            </h2>
            <p className="text-white/70 font-light text-lg max-w-2xl mx-auto mb-12">
              Whether it&apos;s your first property or your tenth investment, our
              RERA-registered team is ready to guide you with clarity,
              confidence, and care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-10 py-5 bg-vanilla-latte text-teal-forest rounded-sm text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/properties"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/30 text-white rounded-sm text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                Browse Properties
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}