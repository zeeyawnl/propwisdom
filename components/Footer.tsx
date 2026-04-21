"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// Local SVG alternatives for brand icons since lucide-react removed them
const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Register ScrollTrigger inside useEffect to guarantee client-side only
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || !containerRef.current) return;

    // Set the initial hidden state immediately
    gsap.set(textRef.current, {
      y: 120,
      opacity: 0,
      rotationX: -80,
      transformPerspective: 1200,
      transformOrigin: "center bottom",
    });

    // Proforma-style scroll-scrubbed reveal
    const tween = gsap.to(textRef.current, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    // Cleanup on unmount
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer ref={containerRef} className="bg-teal-forest text-vanilla-latte relative pt-24 md:pt-32 flex flex-col justify-between min-h-[80vh]">

      {/* --- Standard Footer Layout --- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="group flex items-center gap-6 mb-8 w-fit">
              <div className="relative w-12 h-12 bg-vanilla-latte flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="/assets/images/logo2.png"
                  className="w-10 h-10 object-contain -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                  alt="PropWisdom Logo"
                />
              </div>
              <div className="flex items-baseline text-2xl md:text-[28px] font-sans tracking-tight text-vanilla-latte">
                <span className="uppercase font-bold">
                  PROP
                </span>
                <span className="font-normal font-light">
                  Wisdom
                </span>
              </div>
            </Link>
            <p className="text-vanilla-latte/70 font-light text-lg max-w-sm leading-relaxed mb-8">
              Elevating the art of living. Curating Pune&apos;s finest real estate opportunities with unmatched precision and care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-vanilla-latte/30 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-vanilla-latte/30 flex items-center justify-center hover:bg-vanilla-latte hover:text-teal-forest transition-all">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-vanilla-latte/80 hover:text-white font-light transition-colors flex items-center gap-2 group">Home <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/properties" className="text-vanilla-latte/80 hover:text-white font-light transition-colors flex items-center gap-2 group">Collection <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/#about" className="text-vanilla-latte/80 hover:text-white font-light transition-colors flex items-center gap-2 group">About Us <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/#services" className="text-vanilla-latte/80 hover:text-white font-light transition-colors flex items-center gap-2 group">Expertise <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-vanilla-latte/80 hover:text-white font-light transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-vanilla-latte/80 hover:text-white font-light transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-vanilla-latte/80 hover:text-white font-light transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-vanilla-latte/80 font-light">+91 98765 43210</li>
              <li className="text-vanilla-latte/80 font-light">propwisdom@gmail.com</li>
              <li className="text-vanilla-latte/80 font-light mt-4 pt-4 border-t border-white/10">
                Shop No.6, Ground floor, Chintamani Capital,<br />
                opposite to Paranjape Forestrail Bhugaon,<br />
                Pune Maharashtra 412115
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- GSAP Animated 3D Text --- */}
      <div className="relative w-full flex items-end justify-center mt-auto select-none pt-20 pb-12" style={{ perspective: "1200px" }}>
        <h1
          ref={textRef}
          className="text-[14vw] leading-[0.85] tracking-tight font-sans m-0 flex justify-center w-full text-vanilla-latte/90"
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
          <span className="uppercase font-bold">
            PROP
          </span>
          <span className="font-normal font-light">
            Wisdom
          </span>
        </h1>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative w-full px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 border-t border-white/10 z-20 bg-teal-forest">
        <p>&copy; {new Date().getFullYear()} PropWisdom.</p>
        <p>Designed for Excellence.</p>
      </div>

    </footer>
  );
}