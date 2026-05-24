"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Landmark, Home, Building2, TrendingUp, Handshake, KeyRound, MapPin, BadgeIndianRupee, Paintbrush, RefreshCcw } from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Master Services Data Set                                          */
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
    icon: MapPin,
    title: "Rent your property",
    tagline: "Find the right tenant",
    hero: "Hassle-free renting for your property",
    description: "We help you find reliable tenants and manage the leasing process from start to finish.",
    points: [
      "Extensive tenant background checks",
      "Drafting and registration of lease agreements",
      "Ongoing property management support"
    ],
    closing: "Ensuring a steady and secure rental income.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    actionLink: "/#contact",
    actionText: "Contact Us"
  },
  {
    id: "06",
    icon: Handshake,
    title: "Sell your property",
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
    id: "07",
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
    title: "View Resale Property",
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

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentService = SERVICES[activeIndex];

  return (
    <section id="services" className="py-24 md:py-32 bg-white relative font-sans text-slate-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── Section Header ── */}
        <div className="mb-20 md:mb-24 max-w-3xl">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight leading-[1.15]">
            Comprehensive <br />
            <span className="font-serif italic text-teal-forest">Real Estate Solutions</span>
          </h2>
        </div>

        {/* ── Master Split Layout Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Stable Menu Track (Handles 11 items smoothly without layout distortion) */}
          <div className="hidden lg:flex w-full lg:col-span-5 flex-col border-t border-slate-100">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              const MenuIcon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className="w-full py-5 px-4 lg:px-6 border-b border-slate-100 text-left flex items-center justify-between group transition-all duration-300 relative outline-none"
                >
                  <div className="flex items-center gap-5">
                    <span className={`text-[11px] font-mono tracking-wider w-6 transition-colors duration-300 ${isActive ? "text-teal-forest font-bold" : "text-slate-300 group-hover:text-slate-500"
                      }`}>
                      {service.id}
                    </span>
                    <div className="flex items-center gap-4">
                      <MenuIcon
                        size={18}
                        strokeWidth={1.5}
                        className={`transition-colors duration-300 ${isActive ? "text-teal-forest" : "text-slate-300 group-hover:text-slate-500"}`}
                      />
                      <h3 className={`text-lg md:text-xl font-light tracking-tight transition-all duration-300 ${isActive ? "text-teal-forest font-normal translate-x-2" : "text-slate-600 group-hover:text-slate-900"
                        }`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className={`transition-all duration-300 ${isActive ? "text-teal-forest opacity-100 translate-x-0" : "text-slate-300 opacity-0 -translate-x-3 group-hover:opacity-50"
                      }`}
                  />

                  {/* High-End Layout Indicator Ribbon */}
                  {isActive && (
                    <motion.div
                      layoutId="activeRibbon"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-teal-forest"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Interactive Exhibition Stage */}
          <div className="hidden lg:block lg:col-span-7 relative min-h-[800px]">
            <div className="sticky top-28 w-full flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full flex flex-col"
                >
                  {/* Reduced Height Presentation Aspect Frame Container */}
                  <div className="w-full h-[260px] lg:h-[300px] rounded-2xl overflow-hidden relative shadow-sm mb-6 bg-slate-50 border border-slate-100">
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Sync Meta-Information Layer */}
                  <div className="px-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-teal-forest/80 mb-2 block">
                      {currentService.tagline}
                    </span>
                    <h4 className="text-2xl font-light text-slate-900 mb-4 tracking-tight leading-tight">
                      {currentService.hero}
                    </h4>

                    <p className="text-slate-500 font-light leading-relaxed mb-6 text-[15px]">
                      {currentService.description}
                    </p>

                    {/* Detailed Point Grid */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 mb-8">
                      {currentService.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 font-light text-[14px] leading-snug">
                          <CheckCircle2 size={15} strokeWidth={2} className="text-teal-forest shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Editorial Accent Blockquote */}
                    <div className="p-4 bg-slate-50 border-l-2 border-teal-forest mb-8 rounded-r-lg">
                      <p className="text-teal-forest font-serif italic text-base">
                        "{currentService.closing}"
                      </p>
                    </div>

                    {/* Explicit Dynamic Call to Action */}
                    <div>
                      <Link
                        href={currentService.actionLink}
                        className="inline-flex items-center gap-2 px-7 py-4 bg-teal-forest text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:-translate-y-0.5 shadow-sm"
                      >
                        {currentService.actionText}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Fallback Track: Fully Isolated Tap Accordion System */}
          <div className="lg:hidden w-full flex flex-col border-t border-slate-100">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              const MobileIcon = service.icon;

              return (
                <div key={service.id} className="border-b border-slate-100">
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className="w-full py-5 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono ${isActive ? "text-teal-forest font-bold" : "text-slate-400"}`}>
                        {service.id}
                      </span>
                      <div className="flex items-center gap-3">
                        <MobileIcon size={18} className={isActive ? "text-teal-forest" : "text-slate-400"} />
                        <h3 className={`text-base font-light ${isActive ? "text-teal-forest font-normal" : "text-slate-800"}`}>
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 ${isActive ? "rotate-90 text-teal-forest" : "text-slate-400"}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-1 flex flex-col gap-5">
                          <div className="w-full h-48 rounded-xl overflow-hidden relative">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-teal-forest/80 -mb-2 hidden md:block">
                            {service.tagline}
                          </span>
                          <h4 className="text-lg font-medium text-slate-900">{service.hero}</h4>
                          <p className="text-slate-500 font-light text-sm leading-relaxed hidden md:block">{service.description}</p>
                          <ul className="space-y-2.5">
                            {service.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600 font-light text-sm">
                                <CheckCircle2 size={16} className="text-teal-forest shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-teal-forest font-serif italic text-sm border-l-2 border-teal-forest pl-3 py-0.5 hidden md:block">
                            {service.closing}
                          </p>
                          <Link
                            href={service.actionLink}
                            className="w-full text-center px-6 py-4 bg-teal-forest text-white text-[11px] uppercase tracking-[0.2em] font-bold shadow-sm block"
                          >
                            {service.actionText}
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

        {/* ── Bottom Branding & Global Footer CTA ── */}
        <div className="mt-24 lg:mt-32 pt-12 border-t border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <p className="text-lg md:text-xl text-slate-500 font-light max-w-3xl leading-relaxed">
            At <span className="font-normal text-slate-900"><span className="font-semibold text-teal-forest">PROP</span>Wisdom</span>, we don't just facilitate transactions — we build long-term partnerships by delivering clarity, transparency, and results at every step of your journey.
          </p>

          <div className="shrink-0 flex flex-col gap-3 w-full lg:w-auto">
            <Link
              href="/properties"
              className="px-9 py-4.5 bg-teal-forest text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center gap-3"
            >
              Browse All Listings
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-light text-center lg:text-left">
              Explore Our Full Portfolio
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}