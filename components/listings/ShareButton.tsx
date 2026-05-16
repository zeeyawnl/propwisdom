"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareTitle = title || document.title;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold p-2 -mr-2 ${
        copied ? "text-teal-forest" : "text-slate-400 hover:text-teal-forest"
      }`}
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
