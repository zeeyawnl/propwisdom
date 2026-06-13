"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Landmark, Home, Building2, TrendingUp, Handshake, KeyRound, BadgeIndianRupee, Paintbrush, RefreshCcw, Map, ShieldCheck } from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Master Services Data Set                                          */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    id: "01",
    icon: ShieldCheck,
    title: "Mandate Projects",
    tagline: "Exclusive representation",
    hero: "Strategic landlord & developer representation",
    description: "Exclusive listings directly representing owners and developers, ensuring premium exposure and verified transaction handling.",
    points: [
      "Direct developer mandate properties",
      "Vetted documentation and structural checks",
      "Exclusive pricing and structural options"
    ],
    closing: "Focused representation that builds trust and delivers outcomes.",
    image: "/assets/images/seventhpoint.jpg",
    actionLink: "/properties?category=MANDATE_PROJECTS",
    actionText: "View Mandate Projects"
  },
  {
    id: "02",
    icon: Home,
    title: "New Residential Properties",
    tagline: "Modern living spaces",
    hero: "Pune's finest new home collections",
    description: "Explore newly launched flats, apartments, and villas built with state-of-the-art designs and modern amenities.",
    points: [
      "Newly constructed properties in key locations",
      "Vast options of floorplans and BHK formats",
      "Ready to move and under construction configurations"
    ],
    closing: "Elevating your everyday living experience in Pune.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    actionLink: "/properties?category=NEW_RESIDENTIAL_PROJECTS",
    actionText: "View New Residential Properties"
  },
  {
    id: "03",
    icon: Building2,
    title: "New Commercial Projects",
    tagline: "Next-gen business hubs",
    hero: "Foundations for commercial success",
    description: "Invest in premium newly launched office spaces, corporate hubs, and retail outlets designed for maximum visibility.",
    points: [
      "Grade-A corporate buildings and IT parks",
      "High-footfall commercial spaces and shops",
      "Flexible floor plates and infrastructure"
    ],
    closing: "Positioning your enterprise where business thrives.",
    image: "/assets/images/commercial.avif",
    actionLink: "/properties?category=NEW_COMMERCIAL_PROJECTS",
    actionText: "View New Commercial Projects"
  },
  {
    id: "04",
    icon: TrendingUp,
    title: "Upcoming Projects",
    tagline: "Visionary opportunities",
    hero: "Be the first to secure prime allocations",
    description: "Get exclusive early access to pre-launch opportunities and high-growth projects before they hit the open market.",
    points: [
      "Early bird pricing and flexible payment plans",
      "Vetted developments with high appreciation potential",
      "Prime locations across Pune's expansion corridors"
    ],
    closing: "Investing today in tomorrow's landmarks.",
    image: "/assets/images/investmentplanning.jpg",
    actionLink: "/properties?category=UPCOMING_PROJECTS",
    actionText: "View Upcoming Projects"
  },
  {
    id: "05",
    icon: KeyRound,
    title: "Resale Residential Properties",
    tagline: "Ready to move homes",
    hero: "Hand-picked secondary market options",
    description: "Find established residential properties available for resale, fully vetted for clear titles and immediate occupancy.",
    points: [
      "Ready-to-move-in apartments and family villas",
      "Established neighborhoods with complete infrastructure",
      "Fair market valuation and pricing assessments"
    ],
    closing: "Making resale acquisitions clear, transparent, and prompt.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    actionLink: "/properties?category=RESALE_RESIDENTIAL_PROJECTS",
    actionText: "View Resale Residential"
  },
  {
    id: "06",
    icon: BadgeIndianRupee,
    title: "Resale Commercial Properties",
    tagline: "Immediate operations",
    hero: "Established locations for immediate yields",
    description: "Vetted retail and office spaces available for resale, allowing immediate business operations or rental returns.",
    points: [
      "Fully fitted commercial office settings",
      "Premium street-facing retail units ready to use",
      "Verified commercial real estate listings"
    ],
    closing: "Accelerate business presence with established facilities.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    actionLink: "/properties?category=RESALE_COMMERCIAL_PROJECTS",
    actionText: "View Resale Commercial"
  },
  {
    id: "07",
    icon: Handshake,
    title: "Rental Residential Properties",
    tagline: "Hassle-free tenancy",
    hero: "Curated homes for rent",
    description: "Find your next home from a premium database of verified rental properties across top micro-markets.",
    points: [
      "Flats, penthouses, and gated community villas",
      "Thoroughly verified lease terms and documentation",
      "Smooth onboarding and property walkthroughs"
    ],
    closing: "Creating rental journeys built on convenience and care.",
    image: "/assets/images/rental.jpg",
    actionLink: "/properties?category=RENTAL_RESIDENTIAL_PROJECTS",
    actionText: "View Rental Residential"
  },
  {
    id: "08",
    icon: Landmark,
    title: "Rental Commercial Properties",
    tagline: "Strategic workspaces",
    hero: "Elevate your business operations",
    description: "Establish your business presence in premium commercial spaces, retail units, and offices available for lease.",
    points: [
      "Grade-A office locations in central business zones",
      "Showrooms and shops with high local footfall",
      "Flexible terms matching company scale requirements"
    ],
    closing: "Leasing options designed to accommodate corporate growth.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    actionLink: "/properties?category=RENTAL_COMMERCIAL_PROJECTS",
    actionText: "View Rental Commercial"
  },
  {
    id: "09",
    icon: RefreshCcw,
    title: "Pre-lease Properties",
    tagline: "Instant yields",
    hero: "Invest in steady cash flow assets",
    description: "Invest in commercial spaces already leased to verified corporate clients, offering steady monthly income and long-term capital appreciation.",
    points: [
      "Assured immediate rental income stream",
      "Vetted blue-chip tenants with long lease locks",
      "Premium assets in corporate parks"
    ],
    closing: "Securing your investment portfolio with instant yields.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    actionLink: "/properties?category=PRE_LEASE_PROPERTIES",
    actionText: "View Pre-lease Properties"
  },
  {
    id: "10",
    icon: Map,
    title: "Land & Plots",
    tagline: "Foundational assets",
    hero: "Invest in plots with growth potential",
    description: "Acquire NA plots, agricultural land, and residential zones in rapidly growing sectors around Pune for customized development.",
    points: [
      "Residential and commercial plots in key growth zones",
      "Clear title land checked by legal experts",
      "Excellent long-term capital appreciation assets"
    ],
    closing: "Building wealth from the ground up.",
    image: "/assets/images/landinvestment.jpg",
    actionLink: "/properties?category=LAND_PLOTS",
    actionText: "View Land & Plots"
  },
  {
    id: "11",
    icon: Landmark,
    title: "Home Loans",
    tagline: "Financing made easy",
    hero: "Unlocking your property dreams",
    description: "Get bespoke home loan guidance and match with top banking partners for low interest rates and hassle-free processing.",
    points: [
      "Assistance with leading banking institutions",
      "Guidance on documentation and eligibility criteria",
      "Lowest interest rates and quick approvals"
    ],
    closing: "Simplifying loans so you can focus on building home.",
    image: "/assets/images/investmentplanning.jpg",
    actionLink: "/#contact",
    actionText: "Contact Us"
  },
  {
    id: "12",
    icon: Paintbrush,
    title: "Interior Design",
    tagline: "Bespoke spaces",
    hero: "Transforming residential and office areas",
    description: "Elevate your property's value, functionality, and visual appeal with our end-to-end custom interior design partners.",
    points: [
      "Modern design themes and customized floorplans",
      "Flawless project management from start to finish",
      "Premium material selection and expert crafting"
    ],
    closing: "Crafting premium spaces that speak to your soul.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    actionLink: "/#contact",
    actionText: "Contact Us"
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentService = SERVICES[activeIndex === -1 ? 0 : activeIndex];

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
                  suppressHydrationWarning
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
                    suppressHydrationWarning
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