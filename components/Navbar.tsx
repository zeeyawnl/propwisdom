"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar completely on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">

          {/* Logo - Replaced with dummy image and gradient text */}
          <Link href="/" className="group flex items-center gap-3">
            <img
              src="/assets/images/logo2.png"
              className="w-20 h-20 object-contain"
              alt="PropWisdom Logo"
            />

            <div className="flex items-baseline text-2xl md:text-[28px] font-sans tracking-tight">
              <span className="uppercase font-bold bg-gradient-to-b from-[#389b9d] to-[#152123] bg-clip-text text-transparent">
                PROP
              </span>
              <span className="font-normal font-light bg-gradient-to-b from-[#389b9d] to-[#152123] bg-clip-text text-transparent">
                Wisdom
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Minimalist */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 hover:text-teal-forest transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Premium CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#contact"
              className="px-8 py-3 bg-teal-forest text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-teal-forest/90 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-teal-forest p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white z-[-1] flex flex-col justify-center px-10"
          >
            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold text-teal-forest flex items-center justify-between group"
                  >
                    {link.name}
                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-10"
              >
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-5 bg-teal-forest text-white uppercase tracking-widest font-bold"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}