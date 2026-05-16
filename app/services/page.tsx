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
  Handshake,
  KeyRound,
  BadgeIndianRupee,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Paintbrush,
  RefreshCcw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Services Data                                                     */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    id: "01",
    icon: Landmark,
    title: "Mandate Property Services",
    tagline: "Tailored to your vision",
    hero: "End-to-end property development",
    description: "Exclusive mandate listings and properties entrusted to us for direct, focused representation.",
    points: [
      "Custom-built homes and purpose-driven commercial properties",
      "End-to-end management from planning to handover",
      "Expert guidance at every stage of development"
    ],
    closing: "We bring your vision to life with expert guidance at every stage.",
    image: "/assets/images/seventhpoint.jpg",
    actionLink: "/properties?listingType=mandate",
    actionText: "View Mandate Properties"
  },
  {
    id: "02",
    icon: Home,
    title: "Residential Projects",
    tagline: "Your dream home awaits",
    hero: "Find the perfect residential space",
    description: "Discover a wide range of premium residential properties, carefully curated to match your lifestyle.",
    points: [
      "Flats, apartments, villas, and independent houses",
      "Verified properties with clear titles",
      "Prime locations across Pune"
    ],
    closing: "Finding the perfect home for you and your family.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    actionLink: "/properties?listingType=new_project",
    actionText: "View Residential Properties"
  },
  {
    id: "03",
    icon: Building2,
    title: "Commercial Projects",
    tagline: "Strategic spaces",
    hero: "Strategic spaces for business growth",
    description: "Find the ideal commercial space to elevate your business operations and visibility.",
    points: [
      "Premium office spaces and corporate hubs",
      "Retail shops in high-footfall areas",
      "Flexible layouts for diverse business needs"
    ],
    closing: "Empowering your business with the right real estate.",
    image: "/assets/images/commercial.avif",
    actionLink: "/properties?type=commercial",
    actionText: "View Commercial Properties"
  },
  {
    id: "04",
    icon: TrendingUp,
    title: "Upcoming Projects",
    tagline: "Tomorrow's landmarks",
    hero: "Be the first to invest",
    description: "Get exclusive early access to the most promising pre-launch and under-construction projects.",
    points: [
      "Early bird pricing and preferential allocations",
      "Vetted developers with proven track records",
      "High appreciation potential"
    ],
    closing: "Securing your future with visionary investments.",
    image: "/assets/images/investmentplanning.jpg",
    actionLink: "/properties?listingType=new_project",
    actionText: "View Upcoming Projects"
  },
  {
    id: "05",
    icon: Handshake,
    title: "Selling Properties",
    tagline: "Maximize your value",
    hero: "Maximize the value of your real estate assets",
    description: "Our expert team ensures a smooth and profitable selling experience for your property.",
    points: [
      "Accurate market valuation and pricing strategy",
      "Targeted marketing to qualified buyers",
      "End-to-end transaction management"
    ],
    closing: "Achieving the best possible return on your investment.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    actionLink: "/#contact",
    actionText: "Contact Us"
  },
  {
    id: "06",
    icon: KeyRound,
    title: "Rental & Pre-lease",
    tagline: "Made simple",
    hero: "Finding the right space",
    description: "Whether you're looking to rent a home or lease a commercial space, we streamline the process.",
    points: [
      "Curated rental options based on your needs",
      "Verified landlords and properties",
      "Assistance with negotiations and agreements"
    ],
    closing: "Ensuring a smooth and hassle-free rental experience.",
    image: "/assets/images/rental.jpg",
    actionLink: "/properties?listingType=rent",
    actionText: "View Rental Properties"
  },
  {
    id: "07",
    icon: MapPin,
    title: "Home & Property",
    tagline: "Comprehensive solutions",
    hero: "Holistic real estate services",
    description: "From finding the perfect home to managing your property portfolio, we offer holistic services.",
    points: [
      "Extensive portfolio of diverse properties",
      "Personalized consultation and guidance",
      "Seamless buying and selling processes"
    ],
    closing: "Your trusted partner in every real estate endeavor.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    actionLink: "/properties",
    actionText: "View All Properties"
  },
  {
    id: "08",
    icon: BadgeIndianRupee,
    title: "Loan & Plots",
    tagline: "Financing and investments",
    hero: "Financing and foundational investments",
    description: "Secure competitive financing and invest in high-potential land opportunities with our expert assistance.",
    points: [
      "Hassle-free loan processing with top banks",
      "Residential and NA plots in growth corridors",
      "Complete documentation and legal support"
    ],
    closing: "Building your dreams from the ground up.",
    image: "/assets/images/landinvestment.jpg",
    actionLink: "/#contact",
    actionText: "Contact Us"
  },
  {
    id: "09",
    icon: Paintbrush,
    title: "Interior Design",
    tagline: "Transforming spaces",
    hero: "Stunning environments",
    description: "Elevate your property's aesthetics and functionality with our bespoke interior design solutions.",
    points: [
      "Customized design concepts tailored to your style",
      "Space optimization and functional layouts",
      "High-quality materials and flawless execution"
    ],
    closing: "Crafting beautiful spaces that inspire and delight.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    actionLink: "/#contact",
    actionText: "Contact Us"
  },
  {
    id: "10",
    icon: RefreshCcw,
    title: "Resell",
    tagline: "Secondary market",
    hero: "Navigating the secondary market with ease",
    description: "Discover prime resale opportunities or successfully list your property on the secondary market.",
    points: [
      "Thoroughly vetted resale properties",
      "Fair market pricing assessments",
      "Transparent negotiation and closing"
    ],
    closing: "Connecting buyers and sellers with confidence.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    actionLink: "/properties?listingType=resale",
    actionText: "View Resale Properties"
  },
  {
    id: "11",
    icon: Building2,
    title: "Residential / Commercial",
    tagline: "We handle it all",
    hero: "From homes to business spaces",
    description: "We assist in buying and selling across all major real estate categories, ensuring authenticity and value.",
    points: [
      "Comprehensive portfolio of diverse properties",
      "Expert market analysis for every segment",
      "Tailored strategies for different property types"
    ],
    closing: "Delivering excellence across the entire real estate spectrum.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    actionLink: "/properties",
    actionText: "View All Properties"
  }
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

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-0 relative font-sans text-slate-900">
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

      {/* ── Detailed Services: Editorial Multi-Column Layout ── */}
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

          {/* DESKTOP LAYOUT (Dynamically Moving Row-by-Row Grid Accordion) */}
          <div className="hidden lg:flex flex-col border-b border-slate-100">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.id}
                  className="grid grid-cols-12 gap-12 py-6 border-t border-slate-100 items-start transition-all duration-500"
                >
                  {/* Column 1: Navigation Selector */}
                  <div className="col-span-4 flex items-center min-h-[60px]">
                    <button
                      onClick={() => setActiveService(index)}
                      className="group relative flex items-center justify-between w-full text-left py-2 pr-4 transition-all duration-500"
                    >
                      <div className="flex items-center gap-6">
                        <span
                          className={`font-serif italic text-sm transition-colors duration-500 ${isActive ? "text-teal-forest" : "text-slate-300 group-hover:text-slate-400"
                            }`}
                        >
                          {service.id}
                        </span>
                        <h3
                          className={`text-2xl font-light tracking-tight transition-colors duration-500 ${isActive ? "text-slate-900 font-normal" : "text-slate-400 group-hover:text-slate-600"
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
                    </button>
                  </div>

                  {/* Column 2: Image Showcase (Expands next to active menu option) */}
                  <div className="col-span-4">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.98 }}
                          animate={{ opacity: 1, height: "480px", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.98 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full overflow-hidden bg-slate-100 relative shadow-sm"
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Column 3: Active Details Block (Expands next to active menu option) */}
                  <div className="col-span-4">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 15 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden flex flex-col pt-2"
                        >
                          <div className="w-12 h-12 bg-[#FAFAFA] border border-slate-100 flex items-center justify-center mb-6 text-teal-forest">
                            {(() => {
                              const Icon = service.icon;
                              return <Icon size={20} strokeWidth={1.5} />;
                            })()}
                          </div>

                          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-teal-forest/70 mb-2">
                            {service.tagline}
                          </p>
                          <h3 className="text-2xl font-light text-slate-900 mb-4 leading-tight">
                            {service.hero}
                          </h3>
                          <p className="text-slate-500 font-light leading-relaxed mb-6 text-[15px]">
                            {service.description}
                          </p>

                          <ul className="space-y-3 mb-6">
                            {service.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} strokeWidth={1} className="text-teal-forest shrink-0 mt-1" />
                                <span className="text-slate-600 font-light text-[14px]">{point}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="p-4 bg-[#FAFAFA] border-l-2 border-teal-forest mb-6">
                            <p className="font-serif italic text-slate-700 text-base">
                              "{service.closing}"
                            </p>
                          </div>

                          <div>
                            <Link
                              href={service.actionLink}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-forest text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-sm"
                            >
                              {service.actionText}
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE/TABLET LAYOUT (Refined Accordion) */}
          <div className="lg:hidden flex flex-col border-t border-slate-200">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;

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
                            className="w-full h-48 object-cover mb-6"
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
                          <p className="font-serif italic text-slate-700 text-sm border-l-2 border-teal-forest pl-4 py-1 mb-6">
                            {service.closing}
                          </p>
                          <Link
                            href={service.actionLink}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-forest text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-sm"
                          >
                            {service.actionText}
                            <ArrowRight size={14} />
                          </Link>
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
        <div className="bg-teal-forest p-12 md:p-20 lg:p-24 relative overflow-hidden text-center shadow-2xl">
          {/* Decorative Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-vanilla-latte/10 blur-3xl pointer-events-none" />

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
                className="w-full sm:w-auto px-10 py-5 bg-vanilla-latte text-teal-forest text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/properties"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/30 text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
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