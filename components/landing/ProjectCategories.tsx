"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Home,
  Building2,
  TrendingUp,
  KeyRound,
  BadgeIndianRupee,
  Handshake,
  Landmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface ProjectCategoriesProps {
  counts: {
    NEW_RESIDENTIAL: number;
    NEW_COMMERCIAL: number;
    UPCOMING: number;
    RESALE_RESIDENTIAL: number;
    RESALE_COMMERCIAL: number;
    RENTAL_RESIDENTIAL: number;
    RENTAL_COMMERCIAL: number;
    MANDATE: number;
  };
  showHeader?: boolean;
}

const CATEGORIES = [
  {
    key: "MANDATE" as const,
    title: "Mandate Projects",
    description: "Exclusive properties directly representing developers & owners.",
    href: "/projects/mandate",
    icon: ShieldCheck,
  },

  {
    key: "NEW_RESIDENTIAL" as const,
    title: "New Residential Projects",
    description: "Explore newly launched residential developments.",
    href: "/projects/new-residential",
    icon: Home,
  },
  {
    key: "NEW_COMMERCIAL" as const,
    title: "New Commercial Projects",
    description: "Premium offices, retail spaces and commercial launches.",
    href: "/projects/new-commercial",
    icon: Building2,
  },
  {
    key: "UPCOMING" as const,
    title: "Upcoming Projects",
    description: "Be the first to invest in pre-launch and under-construction ventures.",
    href: "/projects/upcoming",
    icon: TrendingUp,
  },
  {
    key: "RESALE_RESIDENTIAL" as const,
    title: "Resale Residential Properties",
    description: "Vetted secondary market residential listings across top micro-markets.",
    href: "/projects/resale-residential",
    icon: KeyRound,
  },
  {
    key: "RESALE_COMMERCIAL" as const,
    title: "Resale Commercial Properties",
    description: "Established commercial units and offices ready for occupation.",
    href: "/projects/resale-commercial",
    icon: BadgeIndianRupee,
  },
  {
    key: "RENTAL_RESIDENTIAL" as const,
    title: "Rental Residential Properties",
    description: "Premium homes, flats and apartments available for rent.",
    href: "/projects/rental-residential",
    icon: Handshake,
  },
  {
    key: "RENTAL_COMMERCIAL" as const,
    title: "Rental Commercial Properties",
    description: "Offices, retail spaces, and commercial rentals.",
    href: "/projects/rental-commercial",
    icon: Landmark,
  },

];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};


export default function ProjectCategories({ counts, showHeader = true }: ProjectCategoriesProps) {
  return (
    <section id="project-categories" className="py-24 md:py-32 bg-[#FAFAFA] relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        {showHeader && (
          <div className="mb-20 max-w-3xl">
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
              Direct Exploration
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              Browse Property <span className="font-serif italic text-teal-forest">Categories</span>
            </h2>

          </div>
        )}

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const countValue = counts[cat.key] || 0;

            return (
              <motion.div key={cat.key} variants={itemVariants}>
                <Link
                  href={cat.href}
                  className="group flex flex-col justify-between h-[340px] p-8 rounded-[2rem] bg-white border border-slate-100 hover:bg-teal-forest hover:border-transparent transition-all duration-500 hover:shadow-2xl cursor-pointer"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-teal-forest/5 text-teal-forest flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-vanilla-latte transition-all duration-500">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-medium text-slate-950 group-hover:text-white transition-colors duration-500 leading-tight mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500 line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Stats & Action */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100/80 group-hover:border-white/10 transition-colors duration-500">
                    <span className="text-slate-600 font-medium text-xs tracking-wider group-hover:text-vanilla-latte transition-colors duration-500">
                      {countValue} Propert{countValue === 1 ? "y" : "ies"}
                    </span>
                    <span className="flex items-center gap-1.5 text-teal-forest text-xs font-bold uppercase tracking-widest group-hover:text-vanilla-latte transition-colors duration-500">
                      View Projects
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
