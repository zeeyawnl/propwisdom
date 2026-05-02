"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Home,
  Landmark,
  TrendingUp,
  Scale,
  Handshake,
  KeyRound,
  BadgeIndianRupee,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Services Data                                                     */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    id: "01",
    icon: Handshake,
    title: "Property Consulting",
    tagline: "Expert guidance for every decision",
    hero: "Make informed decisions with expert guidance",
    description:
      "Real estate decisions involve more than just choosing a property; they require clarity on pricing, location potential, legal standing, and long-term value. Our consulting service is built to provide exactly that.",
    points: [
      "Personalized consultation based on your goals",
      "Market insights across Pune's micro-markets",
      "Price benchmarking and negotiation guidance",
      "Risk assessment before finalizing any deal",
    ],
    closing: "We ensure you don't just buy property; you buy the right property.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  },
  {
    id: "02",
    icon: Home,
    title: "Residential Properties",
    tagline: "Buy, sell & rent your dream home",
    hero: "Your perfect home awaits",
    description:
      "Whether you are a first-time homebuyer, looking to upgrade, or planning to sell your existing property, our residential division covers the full spectrum. We specialize in primary sales from top developers, verified resale properties, and curated rental homes across Pune.",
    points: [
      "Primary sales: brand new flats & villas",
      "Resale properties: pre-owned homes",
      "Rental services: verified landlords",
      "End-to-end support from visits to registration",
    ],
    closing: "From a cozy 1BHK to a sprawling villa, we match you with the right home.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    icon: Building2,
    title: "Commercial Properties",
    tagline: "Offices, shops & retail spaces",
    hero: "Strategic spaces for growing businesses",
    description:
      "The right commercial space can accelerate your business growth. We help entrepreneurs, startups, and established businesses find, lease, or purchase commercial properties that align with their operational needs and budget.",
    points: [
      "Primary commercial sales: new office spaces",
      "Resale commercial properties at market-best rates",
      "Commercial rentals: flexible lease options",
      "Location analysis for maximum footfall",
    ],
    closing: "Position your business for success with the right commercial address.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "04",
    icon: BadgeIndianRupee,
    title: "Home & Property Loans",
    tagline: "Hassle-free financing solutions",
    hero: "Seamless loan assistance",
    description:
      "Financing is one of the most critical steps in any property transaction. We have partnered with leading banks and NBFCs to provide you with competitive loan options, ensuring you get the best interest rates and fastest approvals.",
    points: [
      "Home loans with competitive interest rates",
      "Loan against property (LAP) options",
      "Balance transfer facility for existing loans",
      "Complete documentation support",
    ],
    closing: "We simplify the financing maze so you can focus on your new property.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
  },
  {
    id: "05",
    icon: KeyRound,
    title: "Rental Services",
    tagline: "Finding the right space, made simple",
    hero: "Hassle-free rentals",
    description:
      "Whether you're looking to rent a home or lease a commercial space, we streamline the entire process. Our curated listings, verified landlords, and end-to-end support ensure you find the perfect space without stress.",
    points: [
      "Curated residential & commercial options",
      "Verified landlords and properties",
      "Assistance with rent negotiations",
      "Tenant screening support for owners",
    ],
    closing: "Ensuring a smooth and hassle-free rental experience for everyone.",
    image: "/assets/images/rental.jpg",
  },
  {
    id: "06",
    icon: MapPin,
    title: "Plots & Land",
    tagline: "High-potential land opportunities",
    hero: "Invest in high-growth land parcels",
    description:
      "Land remains one of the most strategic real estate investments when chosen correctly. With proper due diligence, we guide you toward secure investments in residential plots, agricultural land, and NA plots in high-growth corridors.",
    points: [
      "Residential and commercial plots",
      "Agricultural and NA land opportunities",
      "High-growth zones in and around Pune",
      "Complete title verification",
    ],
    closing: "Guiding you toward secure and high-value land investments.",
    image: "/assets/images/landinvestment.jpg",
  },
  {
    id: "07",
    icon: TrendingUp,
    title: "Investment Planning",
    tagline: "Build wealth through real estate",
    hero: "Data-driven strategies for wealth",
    description:
      "We go beyond transactions to help you plan strategically. Our investment advisory leverages deep local market insights, ROI benchmarking, and growth corridor analysis to ensure your portfolio is diversified and future-ready.",
    points: [
      "ROI-focused property recommendations",
      "Short-term vs long-term strategies",
      "Portfolio diversification",
      "Insights into upcoming growth corridors",
    ],
    closing: "Strategic planning for future-ready wealth generation.",
    image: "/assets/images/investmentplanning.jpg",
  },
  {
    id: "08",
    icon: Scale,
    title: "Legal Advisory",
    tagline: "Secure & transparent transactions",
    hero: "Complete legal clarity for every deal",
    description:
      "Legal clarity is critical in real estate. We help minimize risks and ensure every transaction is safe, compliant, and transparent, from title checks to agreement drafting.",
    points: [
      "Document verification and due diligence",
      "Title checks and ownership validation",
      "Agreement drafting guidance",
      "Coordination with legal professionals",
    ],
    closing: "Secure, compliant, and fully transparent processing.",
    image: "/assets/images/legaladvisory.jpg",
  },
  {
    id: "09",
    icon: Landmark,
    title: "Mandate Services",
    tagline: "End-to-end property development",
    hero: "Custom-built properties tailored to you",
    description:
      "We design and build homes or commercial spaces tailored to your needs, managing everything from planning to final handover with quality and transparency at every stage.",
    points: [
      "Custom-built homes & commercial properties",
      "End-to-end management",
      "Expert guidance at every stage",
      "Quality assurance and timelines",
    ],
    closing: "We bring your vision to life with expert guidance at every stage.",
    image: "/assets/images/seventhpoint.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                    */
/* ------------------------------------------------------------------ */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-0 overflow-hidden font-sans text-slate-900">
      {/* ── Hero Section ── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 md:mb-32 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-teal-forest/30" />
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold">
              What We Do
            </span>
            <div className="h-[1px] w-12 bg-teal-forest/30" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.05] mb-8"
          >
            Comprehensive <br className="hidden md:block" />
            <span className="font-serif italic text-teal-forest">
              Real Estate Solutions
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 font-light leading-relaxed text-lg md:text-xl max-w-2xl mx-auto"
          >
            From property consulting to home loans, rentals to land investments
            We deliver end-to-end expertise so you can make every real estate
            decision with absolute confidence.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Highlight Badges (Architectural Bar) ── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-24 md:mb-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 shadow-sm"
        >
          {[
            {
              icon: Home,
              label: "Residential Buy / Sell",
              sub: "Primary & Resale",
            },
            {
              icon: Building2,
              label: "Commercial Real Estate",
              sub: "Offices & Retail",
            },
            {
              icon: BadgeIndianRupee,
              label: "Property & Home Loans",
              sub: "Top Banks & NBFCs",
            },
            {
              icon: ShieldCheck,
              label: "MahaRERA Registered",
              sub: "A52100013636",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 lg:p-10 flex flex-col items-start hover:bg-[#FAFAFA] transition-colors duration-500 group"
            >
              <item.icon
                size={28}
                strokeWidth={1}
                className="text-teal-forest mb-6 group-hover:scale-110 transition-transform duration-500 origin-left"
              />
              <h3 className="font-medium text-[15px] leading-tight mb-2">
                {item.label}
              </h3>
              <p className="text-slate-400 text-sm font-light">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Detailed Services: Editorial 3-Column Layout ── */}
      <section className="py-24 md:py-32 border-t border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
            <div>
              <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                Everything You Need, <br />
                <span className="font-serif italic text-teal-forest">Under One Roof</span>
              </h2>
            </div>
            <p className="text-slate-500 font-light max-w-md">
              A curated suite of services designed to cover every facet of your real estate journey.
            </p>
          </div>

          {/* DESKTOP LAYOUT (3-Column) */}
          <div className="hidden lg:grid grid-cols-12 gap-12 min-h-[700px]">

            {/* Column 1: Navigation List */}
            <div className="col-span-4 flex flex-col border-r border-slate-200 pr-8">
              {SERVICES.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className="group relative flex items-center justify-between py-6 border-b border-slate-100 last:border-0 text-left transition-all duration-500"
                  >
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-serif italic text-sm transition-colors duration-500 ${isActive ? "text-teal-forest" : "text-slate-300 group-hover:text-slate-400"
                          }`}
                      >
                        {service.id}
                      </span>
                      <h3
                        className={`text-2xl font-light tracking-tight transition-colors duration-500 ${isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <ChevronRight
                      size={20}
                      strokeWidth={1}
                      className={`transition-all duration-500 ${isActive ? "text-teal-forest translate-x-0 opacity-100" : "text-slate-200 -translate-x-4 opacity-0"
                        }`}
                    />
                    {/* Active Line Indicator */}
                    <div
                      className={`absolute right-[-33px] top-1/2 -translate-y-1/2 w-[2px] h-full bg-teal-forest transition-transform duration-500 origin-center ${isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Column 2: Sticky Image Showcase */}
            <div className="col-span-4 relative">
              <div className="sticky top-32 w-full h-[650px] rounded-sm overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeService}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={SERVICES[activeService].image}
                    alt={SERVICES[activeService].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Column 3: Active Content */}
            <div className="col-span-4 relative">
              <div className="sticky top-32 pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <div className="w-12 h-12 bg-[#FAFAFA] border border-slate-100 rounded-full flex items-center justify-center mb-8 text-teal-forest">
                      {(() => {
                        const Icon = SERVICES[activeService].icon;
                        return <Icon size={20} strokeWidth={1.5} />;
                      })()}
                    </div>

                    <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-teal-forest/70 mb-3">
                      {SERVICES[activeService].tagline}
                    </p>
                    <h3 className="text-3xl font-light text-slate-900 mb-6 leading-tight">
                      {SERVICES[activeService].hero}
                    </h3>
                    <p className="text-slate-500 font-light leading-relaxed mb-8">
                      {SERVICES[activeService].description}
                    </p>

                    <ul className="space-y-4 mb-10">
                      {SERVICES[activeService].points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <CheckCircle2 size={18} strokeWidth={1} className="text-teal-forest shrink-0 mt-1" />
                          <span className="text-slate-600 font-light text-[15px]">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-6 bg-[#FAFAFA] border-l-2 border-teal-forest">
                      <p className="font-serif italic text-slate-700 text-lg">
                        "{SERVICES[activeService].closing}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* MOBILE/TABLET LAYOUT (Refined Accordion) */}
          <div className="lg:hidden flex flex-col border-t border-slate-200">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="group border-b border-slate-200"
                >
                  <button
                    onClick={() => setActiveService(isActive ? -1 : index)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-serif italic text-sm ${isActive ? 'text-teal-forest' : 'text-slate-400'}`}>
                        {service.id}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-light ${isActive ? 'text-teal-forest' : 'text-slate-900'}`}>
                        {service.title}
                      </h3>
                    </div>
                    <ChevronRight
                      size={20}
                      strokeWidth={1}
                      className={`transition-transform duration-500 ${isActive ? 'rotate-90 text-teal-forest' : 'text-slate-400'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-2">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-48 object-cover mb-6 rounded-sm"
                          />
                          <p className="text-xl font-light text-slate-900 mb-4 leading-tight">{service.hero}</p>
                          <p className="text-slate-500 font-light text-[15px] mb-6">{service.description}</p>
                          <ul className="space-y-3 mb-6">
                            {service.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} strokeWidth={1} className="text-teal-forest shrink-0 mt-0.5" />
                                <span className="text-slate-600 font-light text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="font-serif italic text-slate-700 text-sm border-l-2 border-teal-forest pl-4 py-1">
                            {service.closing}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Why Choose Us (Minimalist Typographic Grid) ── */}
      <section className="py-24 md:py-32 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
            The PropWisdom Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Why Clients <span className="font-serif italic text-teal-forest">Trust Us</span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {[
            { num: "500+", label: "Happy Clients", desc: "Families and businesses that trusted us with their biggest decisions." },
            { num: "₹200Cr+", label: "Portfolio Managed", desc: "In cumulative property value handled across residential, commercial, and land." },
            { num: "10+", label: "Years Expertise", desc: "A decade of deep market knowledge in Pune's ever-evolving real estate landscape." },
            { num: "100%", label: "Verified Listings", desc: "Every property is checked for legal clearance, title validity, and fair pricing." },
            { num: "50+", label: "Builder Partners", desc: "Direct relationships with top developers for the best primary sale deals." },
            { num: "RERA", label: "Registered Agent", desc: "MahaRERA Reg. No. A52100013636. Verify at maharera.mahaonline.gov.in" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="border-t border-slate-200 pt-6">
              <span className="text-5xl md:text-6xl font-serif text-slate-400 block mb-4 transition-colors hover:text-teal-forest cursor-default">
                {stat.num}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3">
                {stat.label}
              </h3>
              <p className="text-slate-500 font-light text-[15px] leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Floating CTA Banner ── */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="bg-teal-forest rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 lg:p-24 relative overflow-hidden text-center shadow-2xl">
          {/* Decorative Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-vanilla-latte/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6">
              Ready to Make Your <br className="hidden md:block" />
              <span className="font-serif italic text-vanilla-latte">
                Next Smart Move?
              </span>
            </h2>
            <p className="text-white/70 font-light text-lg max-w-2xl mx-auto mb-12">
              Whether you're buying your first home, investing in commercial
              property, or looking for the best loan rates, our team is here to
              guide you every step of the way.
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