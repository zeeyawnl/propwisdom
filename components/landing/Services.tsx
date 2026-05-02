"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const SERVICES_DATA = [
  {
    id: "01",
    title: "Property Consulting",
    subtitle: "Make informed decisions with expert guidance",
    desc: "Real estate decisions involve more than just choosing a property — they require clarity on pricing, location potential, legal standing, and long-term value. Our consulting service is built to provide exactly that.",
    points: [
      "Personalized consultation based on your goals",
      "Market insights across Pune’s micro-markets",
      "Price benchmarking and negotiation guidance",
      "Risk assessment before finalizing any deal"
    ],
    closing: "We ensure you don’t just buy property — you buy the right property.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Residential & Commercial",
    subtitle: "From homes to business spaces — we handle it all",
    desc: "We assist in buying and selling across all major real estate categories, ensuring every listing is evaluated for authenticity, pricing, and location value.",
    points: [
      "Flats, apartments, villas, and independent houses",
      "Commercial offices, shops, and retail spaces",
      "New launches (primary sales) and resale properties"
    ],
    closing: "Ensuring you deal only with genuine opportunities.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Rental Services",
    subtitle: "Finding the right space, made simple",
    desc: "Whether you're looking to rent a home or lease a commercial space, we streamline the process to save you time and hassle.",
    points: [
      "Curated rental options based on your needs",
      "Verified landlords and properties",
      "Assistance with negotiations and agreements"
    ],
    closing: "Our goal is to ensure a smooth and hassle-free rental experience.",
    image: "/assets/images/rental.jpg"
  },
  {
    id: "04",
    title: "Plots & Land Investments",
    subtitle: "Invest in high-potential land opportunities",
    desc: "Land remains one of the most strategic real estate investments when chosen correctly. With proper due diligence, we guide you toward secure investments.",
    points: [
      "Residential plots",
      "Agricultural and NA land",
      "High-growth zones in and around Pune"
    ],
    closing: "Guiding you toward secure and high-value land investments.",
    image: "/assets/images/landinvestment.jpg"
  },
  {
    id: "05",
    title: "Investment Planning",
    subtitle: "Build wealth through real estate",
    desc: "We go beyond transactions to help you plan strategically, ensuring your investment decisions are data-backed and future-ready.",
    points: [
      "ROI-focused property recommendations",
      "Short-term vs long-term investment strategies",
      "Portfolio diversification across property types",
      "Insights into upcoming growth corridors"
    ],
    closing: "Strategic planning for future-ready wealth generation.",
    image: "/assets/images/investmentplanning.jpg"
  },
  {
    id: "06",
    title: "Legal Advisory Support",
    subtitle: "Secure transactions with complete transparency",
    desc: "Legal clarity is critical in real estate. We help minimize risks and ensure every transaction is safe, compliant, and transparent.",
    points: [
      "Document verification and due diligence",
      "Title checks and ownership validation",
      "Agreement drafting guidance",
      "Coordination with legal professionals"
    ],
    closing: "Secure, compliant, and fully transparent processing.",
    image: "/assets/images/legaladvisory.jpg"
  },
  {
    id: "07",
    title: "Mandate Property Services",
    subtitle: "End-to-end property development, tailored to your vision",
    desc: "We design and build homes or commercial spaces tailored to your needs, managing everything from planning to final handover with quality and transparency.",
    points: [
      "Custom-built homes and purpose-driven commercial properties",
      "End-to-end management from planning to handover",
      "Expert guidance at every stage of development"
    ],
    closing: "We bring your vision to life with expert guidance at every stage.",
    image: "/assets/images/seventhpoint.jpg"
  },
  {
    id: "08",
    title: "Home & Property Loans",
    subtitle: "Hassle-free financing for your property dreams",
    desc: "We've partnered with leading banks and NBFCs to provide competitive loan options with the best interest rates and fastest approvals — so financing never stands in the way of your dream property.",
    points: [
      "Home loans with competitive interest rates from top banks",
      "Loan against property (LAP) for business or personal needs",
      "Balance transfer facility for existing high-interest loans",
      "Complete documentation support until disbursement"
    ],
    closing: "We simplify the financing maze so you can focus on your new property.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop"
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="pt-8 pb-24 md:pt-12 md:pb-32 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <span className="text-teal-forest text-[12px] uppercase tracking-[0.4em] font-bold mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-tight">
            Comprehensive <br />
            <span className="font-serif italic text-teal-forest">Real Estate Solutions</span>
          </h2>
        </div>

        {/* Split Layout Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">

          {/* Left: Interactive Accordion List */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {SERVICES_DATA.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={service.id}
                  className="group border-b border-slate-200 cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Service Title Bar */}
                  <div className={`py-8 flex items-center justify-between transition-all duration-500 ${isActive ? 'pl-4 lg:pl-8' : 'hover:pl-4'}`}>
                    <div className="flex items-center gap-6">
                      <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-teal-forest' : 'text-slate-300'}`}>
                        {service.id}
                      </span>
                      <h3 className={`text-2xl md:text-4xl font-light tracking-tight transition-colors duration-300 ${isActive ? 'text-teal-forest' : 'text-slate-800'}`}>
                        {service.title}
                      </h3>
                    </div>
                    <ArrowRight
                      className={`transition-all duration-500 ${isActive ? 'text-teal-forest opacity-100 translate-x-0' : 'text-slate-300 opacity-0 -translate-x-4'}`}
                    />
                  </div>

                  {/* Expandable Content (Framer Motion) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`pb-10 ${isActive ? 'pl-4 lg:pl-8' : ''}`}>
                          <h4 className="text-lg font-medium text-slate-900 mb-4">
                            {service.subtitle}
                          </h4>
                          <p className="text-slate-500 font-light leading-relaxed mb-6">
                            {service.desc}
                          </p>

                          <ul className="space-y-3 mb-6">
                            {service.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-600 font-light text-sm md:text-base">
                                <CheckCircle2 size={18} className="text-teal-forest shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-teal-forest font-medium italic border-l-2 border-vanilla-latte pl-4 py-1">
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

          {/* Right: Sticky Image Viewport (Hidden on Mobile for cleaner UX) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative">
            <div className="sticky top-32 w-full h-[700px] rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl">
              <div className="absolute inset-0 bg-teal-forest/10 z-10 mix-blend-multiply" /> {/* Subtle color grade overlay */}

              {SERVICES_DATA.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? "opacity-100 z-0" : "opacity-0 -z-10"
                    }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${activeIndex === index ? "scale-105" : "scale-100"
                      }`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Closing Trust Section & CTA */}
        <div className="mt-8 lg:mt-32 pt-8 lg:pt-20 lg:border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-10">
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl leading-relaxed">
            At <span className="font-medium text-teal-forest"><span className="font-bold">PROP</span>Wisdom</span>, we don't just facilitate transactions we build long-term relationships by delivering clarity, trust, and results at every step of your real estate journey.
          </p>

          <div className="shrink-0 flex flex-col items-center gap-4">
            <Link
              href="/services"
              className="px-10 py-5 bg-teal-forest text-vanilla-latte rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:-translate-y-1 shadow-lg shadow-teal-forest/20 flex items-center gap-3"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
            <span className="text-[11px] uppercase tracking-widest text-slate-400 font-light">
              Explore Our Full Expertise
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}