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
    { name: "All Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
  ];

  const projectLinks = [
    { name: "New Residential", href: "/projects/new-residential" },
    { name: "New Commercial", href: "/projects/new-commercial" },
    { name: "Upcoming", href: "/projects/upcoming" },
    { name: "Resale", href: "/projects/resale-residential" },
    { name: "Rentals", href: "/projects/rental-residential" },
    { name: "Mandate", href: "/projects/mandate" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">

          {/* Logo - Replaced with dummy image and gradient text */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
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
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 hover:text-teal-forest transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Projects Dropdown */}
            <div className="relative group py-2">
              <span className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 cursor-pointer hover:text-teal-forest transition-colors relative">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
              </span>
              <div className="absolute top-full left-[-20px] mt-0 w-56 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 flex flex-col py-3 z-50">
                {projectLinks.map(link => (
                  <Link key={link.name} href={link.href} className="px-5 py-2.5 text-sm hover:bg-slate-50 text-slate-600 hover:text-teal-forest font-medium transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/properties" className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 hover:text-teal-forest transition-colors relative group">
              All Properties
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link href="/about" className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 hover:text-teal-forest transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/services" className="text-[13px] uppercase tracking-widest font-medium text-teal-forest/190 hover:text-teal-forest transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-forest transition-all duration-300 group-hover:w-full" />
            </Link>
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
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pb-10">
              <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 border-b pb-2">Main Menu</div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/" && pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setIsOpen(false);
                    }}
                    className="text-2xl font-bold text-teal-forest flex items-center justify-between group"
                  >
                    {link.name}
                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}

              <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mt-8 mb-4 border-b pb-2">Projects</div>
              {projectLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + navLinks.length) * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-teal-forest/80 flex items-center justify-between group py-1"
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