"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    text: "PropWisdom made our home buying process incredibly smooth. Their transparency and guidance were unmatched.",
    name: "Rahul Sharma",
    role: "Homebuyer",
    initial: "R"
  },
  {
    id: 2,
    text: "I was looking for a solid land investment and their team provided the best options backed by thorough research.",
    name: "Sneha Desai",
    role: "Investor",
    initial: "S"
  },
  {
    id: 3,
    text: "Professional, punctual, and highly reliable. They handled my commercial leasing with zero hassle.",
    name: "Amit Patel",
    role: "Business Owner",
    initial: "A"
  },
  {
    id: 4,
    text: "The legal advisory support saved us from making a costly mistake. Truly grateful for their meticulous attention to detail.",
    name: "Vikram Singh",
    role: "Property Seller",
    initial: "V"
  },
  {
    id: 5,
    text: "Finding a premium rental in Pune was a breeze with their curated listings. Highly recommended for busy professionals.",
    name: "Pooja Mehta",
    role: "Tenant",
    initial: "P"
  }
];

// Duplicate the array to create a seamless infinite loop
const SCROLL_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header - Lean and Classy */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-teal-forest text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight">
            Client <span className="font-serif italic text-teal-forest">Testimonials</span>
          </h2>
        </div>
      </div>

      {/* Infinite Marquee Wrapper */}
      {/* The mask-image creates the smooth fade-out effect on the left and right edges */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pb-10">

        <motion.div
          className="flex gap-6 md:gap-8 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40, // Adjust this for scroll speed
            repeat: Infinity
          }}
          // Pauses the marquee when the user hovers to read
          whileHover={{ animationPlayState: "paused" }}
        >
          {SCROLL_TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              // Explicit widths ensure perfect sizing on Mobile (85vw) and Desktop (450px)
              className="w-[85vw] md:w-[400px] lg:w-[450px] shrink-0 bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(23,78,79,0.08)] cursor-grab active:cursor-grabbing"
            >
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-8 right-8 text-vanilla-latte/50 w-16 h-16 -z-0 group-hover:text-vanilla-latte transition-colors duration-500 rotate-180" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Star Rating (Optional premium detail) */}
                <div className="flex gap-1 mb-6 text-teal-forest">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 font-light leading-relaxed text-lg md:text-xl mb-10 flex-grow">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-teal-forest text-vanilla-latte flex items-center justify-center text-xl font-serif">
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-medium tracking-wide">{testimonial.name}</h4>
                    <p className="text-teal-forest/60 text-[11px] uppercase font-bold tracking-widest mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}