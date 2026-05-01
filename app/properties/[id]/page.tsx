import { getPropertyById } from "@/lib/db/properties";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Bed, Bath, Maximize, Calendar, Heart, Share2, Phone, MessageCircle } from "lucide-react";
import ImageCarousel from "@/components/listings/ImageCarousel";
import ShareButton from "@/components/listings/ShareButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const allImages = property.images && property.images.length > 0
    ? property.images
    : ["/assets/images/legaladvisory.jpg"];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-32 pb-24">

      {/* 1. Minimalist Top Navigation */}
      <div className="bg-[#FAFAFA] pb-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-teal-forest transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>

          <div className="flex gap-4">
            <ShareButton title={property.title} />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* 2. Interactive Image Carousel */}
        <ImageCarousel images={allImages} title={property.title} />

        {/* 3. Property Header (Title & Price) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-teal-forest text-[11px] uppercase tracking-[0.4em] font-bold">
                {property.listingType.replace("_", " ")}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-slate-400 text-[11px] uppercase tracking-[0.4em] font-bold">
                {property.type}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight leading-tight mb-4">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-500 font-light text-lg">
              <MapPin size={18} className="text-teal-forest" />
              {property.location}
            </div>
          </div>

          <div className="lg:text-right shrink-0">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-2">Asking Price</p>
            <div className="text-5xl md:text-6xl font-serif italic text-teal-forest">
              {property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`}
            </div>
          </div>
        </div>

        {/* 4. Sleek Horizontal Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-slate-200 py-8 mb-16">
          <div className="flex flex-col gap-1 border-r border-slate-200 px-4 md:px-8 first:pl-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Bed size={14} /> Bedrooms</span>
            <span className="text-2xl font-light text-slate-900">{property.bedrooms || "—"}</span>
          </div>
          <div className="flex flex-col gap-1 md:border-r border-slate-200 px-4 md:px-8">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Bath size={14} /> Bathrooms</span>
            <span className="text-2xl font-light text-slate-900">{property.bathrooms || "—"}</span>
          </div>
          <div className="flex flex-col gap-1 border-r border-slate-200 px-4 md:px-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Maximize size={14} /> Area</span>
            <span className="text-2xl font-light text-slate-900">{property.area || "—"} <span className="text-sm text-slate-400">sqft</span></span>
          </div>
          <div className="flex flex-col gap-1 px-4 md:px-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Calendar size={14} /> Listed On</span>
            <span className="text-2xl font-light text-slate-900">
              {property.createdAt ? new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
            </span>
          </div>
        </div>

        {/* 5. Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Left Column: Details & Gallery */}
          <div className="flex-1 w-full space-y-20">

            {/* The Description */}
            <section>
              <h2 className="text-2xl font-medium text-slate-900 mb-8">The Residence</h2>
              <div className="prose prose-lg text-slate-500 font-light leading-relaxed prose-p:mb-6 max-w-none">
                {property.description?.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                )) || <p>A detailed description for this prestigious property is currently being curated by our specialists.</p>}
              </div>
            </section>


          </div>

          {/* Right Column: Sticky Concierge Card */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-32 bg-teal-forest rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 border border-vanilla-latte/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <span className="text-vanilla-latte text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
                  Private Viewing
                </span>
                <h3 className="text-3xl font-light mb-8">
                  Interested in <br />
                  <span className="font-serif italic text-vanilla-latte">this property?</span>
                </h3>

                <p className="text-white/70 font-light text-sm leading-relaxed mb-10">
                  Connect with our dedicated real estate concierge to schedule a private tour or request the comprehensive property dossier.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:+918975123786"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-vanilla-latte text-teal-forest uppercase tracking-[0.2em] text-[11px] font-bold rounded-full hover:bg-white transition-colors shadow-sm"
                  >
                    <Phone size={16} /> Call Expert
                  </a>
                  <a
                    href={`https://wa.me/918975123786?text=${encodeURIComponent(`Hi, I am interested in ${property.title} located at ${property.location}. I would like to schedule a viewing or discuss more.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white uppercase tracking-[0.2em] text-[11px] font-bold rounded-full hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-vanilla-latte/20 flex-shrink-0 bg-white/10">
                    <img src="/assets/images/imran.png" alt="Imran Khan" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Imran Khan</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Property Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}