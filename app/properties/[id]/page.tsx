import { getPropertyById } from "@/lib/db/properties";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Bed, Bath, Maximize, Calendar, Phone, MessageCircle } from "lucide-react";
import ImageCarousel from "@/components/listings/ImageCarousel";
import ShareButton from "@/components/listings/ShareButton";
import { getCategoryKeyFromProperty } from "@/lib/leads/mapping";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found | PropWisdom",
    };
  }

  const priceText = property.priceLabel || `₹${property.price.toLocaleString("en-IN")}`;
  const bhkText = property.bedrooms ? `${property.bedrooms} BHK ` : "";
  const title = `${property.title} - ${bhkText}in ${property.location} | Starting ${priceText} | PROPWisdom`;

  // Standardized description that matches user's request details using carpet area if available.
  const areaText = property.area ? ` Carpet Area ${property.area.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} sqft.` : "";
  const bedroomsText = property.bedrooms ? ` a ${property.bedrooms} BHK` : "";
  const segmentText = property.propertySegment ? ` ${property.propertySegment.toLowerCase()}` : " property";

  // Truncate fallback property description if there is one, to avoid extremely long OG descriptions.
  const rawDescription = property.description || "";
  const cleanDescription = rawDescription.replace(/\s+/g, " ").trim();
  const descriptionFallback = cleanDescription.length > 0 
    ? (cleanDescription.length > 150 ? `${cleanDescription.slice(0, 150)}...` : cleanDescription)
    : `${property.title} is${bedroomsText}${segmentText} in ${property.location}.${areaText} Available through PROPWisdom.`;

  const coverImage = property.images && property.images.length > 0
    ? property.images[0]
    : "/assets/images/legaladvisory.jpg";

  const keywords = [
    property.title,
    property.location,
    "Property in Pune",
    "PROPWisdom",
  ];
  if (property.bedrooms) {
    keywords.push(`${property.bedrooms} BHK`);
    keywords.push(`${property.bedrooms} BHK in ${property.location}`);
  }
  if (property.type) {
    keywords.push(`${property.type} in ${property.location}`);
  }

  return {
    title,
    description: descriptionFallback,
    keywords,
    alternates: {
      canonical: `https://propwisdom.in/properties/${property.id}`,
    },
    openGraph: {
      title: `${property.title} | PROPWisdom`,
      description: descriptionFallback,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | PROPWisdom`,
      description: descriptionFallback,
      images: [coverImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Derive CRM category key server-side — never exposed to the client as raw values
  const category = getCategoryKeyFromProperty({
    listingType:     property.listingType,
    propertySegment: property.propertySegment ?? null,
    projectStatus:   property.projectStatus   ?? null,
    type:            property.type            ?? null,
  }) ?? "NEW_RESIDENTIAL_PROJECTS"; // safe fallback

  const allImages = property.images && property.images.length > 0
    ? property.images
    : ["/assets/images/legaladvisory.jpg"];

  // JSON-LD Schema Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": property.propertySegment === "COMMERCIAL" ? "Place" : "Residence",
    "name": property.title,
    "description": property.description?.slice(0, 160) || `${property.title} in ${property.location}`,
    "image": allImages[0],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    ...(property.bedrooms ? { "numberOfBedrooms": property.bedrooms } : {}),
    ...(property.bathrooms ? { "numberOfBathrooms": property.bathrooms } : {}),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-32 pb-24">
      {/* Structured JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Minimalist Top Navigation */}
      <div className="bg-[#FAFAFA] pt-6 lg:pt-10 pb-8 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-teal-forest transition-colors group p-2 -ml-2"
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
            <span className="text-2xl font-light text-slate-900">
              {property.bedrooms ? `${property.bedrooms} BHK` : "N/A"}
              {property.variantBedrooms && ` / ${property.variantBedrooms} BHK`}
              {property.variantBedrooms2 && ` / ${property.variantBedrooms2} BHK`}
            </span>
          </div>
          <div className="flex flex-col gap-1 md:border-r border-slate-200 px-4 md:px-8">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Bath size={14} /> Bathrooms</span>
            <span className="text-2xl font-light text-slate-900">{property.bathrooms || "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 border-r border-slate-200 px-4 md:px-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Maximize size={14} /> Carpet Area</span>
            <span className="text-2xl font-light text-slate-900">
              {property.area ? `${property.area.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} sqft` : "N/A"}
              {property.variantArea && ` / ${property.variantArea.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} sqft`}
              {property.variantArea2 && ` / ${property.variantArea2.replace(/sq\.?ft|sq\s*ft/gi, "").trim()} sqft`}
            </span>
          </div>
          <div className="flex flex-col gap-1 px-4 md:px-8 mt-6 md:mt-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold"><Calendar size={14} /> Listed On</span>
            <span className="text-2xl font-light text-slate-900">
              {property.createdAt ? new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
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
                <h3 className="text-3xl font-light mb-6">
                  Interested in <br />
                  <span className="font-serif italic text-vanilla-latte">this property?</span>
                </h3>

                {/* ── Direct contact CTAs ── */}
                <div className="mt-8 space-y-3 border-t border-white/10 pt-8">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-4">Or contact directly</p>
                  <a
                    href="tel:+918975123786"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white uppercase tracking-[0.2em] text-[11px] font-bold rounded-full transition-colors backdrop-blur-md"
                  >
                    <Phone size={14} /> Call Expert
                  </a>
                  <a
                    href={`https://wa.me/918975123786?text=${encodeURIComponent(`Hi, I am interested in ${property.title} located at ${property.location}. I would like to schedule a viewing or discuss more.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] text-white uppercase tracking-[0.2em] text-[11px] font-bold rounded-full hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    <MessageCircle size={14} /> Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
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