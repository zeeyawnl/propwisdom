"use client";

import { Phone, ArrowRight } from "lucide-react";

export function PropertyCTASection() {
  const PHONE_NUMBER = "918975123786";

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-16 mb-24">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sell Property */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
          <div>
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">
              Property Owners
            </span>

            <h3 className="text-3xl font-light text-slate-900 mt-2">
              Sell Your <span className="font-serif italic text-teal-forest">Property</span>
            </h3>

            <p className="text-slate-500 font-light text-sm md:text-base mt-4 leading-relaxed max-w-md">
              Connect with genuine buyers and receive end-to-end professional assistance and valuation support throughout the selling process.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-forest text-vanilla-latte text-xs uppercase tracking-widest font-bold hover:bg-teal-forest/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              Sell My Property
              <ArrowRight size={14} />
            </a>

            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-bold hover:border-teal-forest hover:text-teal-forest hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>

        {/* Rent Property */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
          <div>
            <span className="text-teal-forest text-[11px] uppercase tracking-[0.3em] font-bold mb-4 block">
              Rental Services
            </span>

            <h3 className="text-3xl font-light text-slate-900 mt-2">
              Rent Your <span className="font-serif italic text-teal-forest">Property</span>
            </h3>

            <p className="text-slate-500 font-light text-sm md:text-base mt-4 leading-relaxed max-w-md">
              Find qualified tenants faster and maximize occupancy yields with our specialized rental marketing, agreements, and tenant onboarding support.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-forest text-vanilla-latte text-xs uppercase tracking-widest font-bold hover:bg-teal-forest/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              Rent My Property
              <ArrowRight size={14} />
            </a>

            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 text-slate-800 text-xs uppercase tracking-widest font-bold hover:border-teal-forest hover:text-teal-forest hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
