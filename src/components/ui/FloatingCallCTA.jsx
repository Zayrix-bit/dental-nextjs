'use client';

import { Phone } from 'lucide-react';
import { siteInfo } from '@/data/siteData';

export default function FloatingCallCTA() {
  const phoneNumber = siteInfo?.phone?.replace(/[^0-9+]/g, '') || '';

  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Call us now"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-[60] flex items-center justify-center gap-2.5 bg-gradient-to-r from-[var(--color-primary)] to-[#0A3A5C] text-white px-4 py-3 md:px-5 md:py-3.5 rounded-full shadow-[0_8px_30px_rgba(10,58,92,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(10,58,92,0.45)] hover:from-[var(--color-primary-dark)] hover:to-[#082a45] border border-white/10 transition-all duration-300 group"
    >
      <div className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full border border-white/20 shadow-sm shrink-0">
        <Phone className="w-[14px] h-[14px] md:w-[15px] md:h-[15px] fill-white/20 shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-25 pointer-events-none" style={{ animationDuration: '2s' }}></span>
      </div>
      <span className="font-bold text-[13px] md:text-[14px] tracking-wide pr-1">Call Now</span>
    </a>
  );
}
