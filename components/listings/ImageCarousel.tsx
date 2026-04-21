"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div 
        onClick={() => setIsFullscreen(true)}
        className="w-full lg:w-[80%] mx-auto h-[40vh] sm:h-[50vh] lg:h-[60vh] rounded-[2rem] overflow-hidden relative mb-12 group bg-slate-900 shadow-xl border border-slate-100 cursor-pointer"
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - View ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        
        {/* Subtle hover expand icon */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={18} />
        </div>
        
        {/* Subtle bottom gradient to make dots pop */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-teal-forest transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-teal-forest transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10" onClick={(e) => e.stopPropagation()}>
              {images.map((_, idx) => (
                <button 
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Overlay using standard Instagram 4:5 Aspect Ratio Container */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors z-50"
            >
              <X size={24} />
            </button>

            {/* Core expanded image viewer set to pure standard ratio */}
            <div className="relative w-full max-w-[500px] md:max-w-[600px] aspect-[4/5] bg-black/50 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`${title} - View ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            <p className="text-white/60 text-sm mt-6 font-medium uppercase tracking-[0.2em]">
              {currentIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
