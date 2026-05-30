"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const words = ["HOME.", "COMFORT.", "FREEDOM.", "PEACE."];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center bg-teal-forest">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="/assets/images/bg-hero.png"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="max-w-4xl">
            {/* Static Top Line */}
            <h1 className="pt-14 md:pt-28 text-5xl md:text-7xl lg:text-[100px] font-extralight text-white leading-none tracking-tighter">
              Step into a space <br />
              that feels like
            </h1>

            {/* Animated Word Line */}
            <div className="h-[70px] md:h-[90px] lg:h-[120px] overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 70, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -70, opacity: 0, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1], // Custom "Ostate" cubic-bezier
                  }}
                  className="text-5xl md:text-7xl lg:text-[100px] font-serif italic text-vanilla-latte block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Minimalist Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 text-white/80 font-light text-base md:text-lg max-w-md tracking-wide leading-relaxed"
            >
              Pune Homes You Can Trust.<br />
              From New Launches to Resale & Rentals
            </motion.p>
          </div>

          {/* Updated Glassmorphic Projects Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 md:pb-10 flex justify-center md:justify-end"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-4 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/20 transition-all duration-500 ease-out"
            >
              <span className="text-white text-sm sm:text-base uppercase tracking-[0.3em] font-medium group-hover:text-vanilla-latte transition-colors duration-500">
                Projects
              </span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-vanilla-latte group-hover:text-teal-forest group-hover:scale-110 transition-all duration-500 shrink-0">
                <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}