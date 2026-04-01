'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { siteInfo } from '@/data/siteData';

export default function FloatingCallCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const phoneNumber = siteInfo?.phoneRaw || siteInfo?.phone?.replace(/[^0-9+]/g, '') || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide when appointment section is in view to prevent overlap with the form
        setIsVisible(!entry.isIntersecting);
      },
      { 
        threshold: 0, 
        rootMargin: '0px 0px -10% 0px' // Hide slightly before it hits the section
      }
    );

    const contactSection = document.getElementById('appointment');
    if (contactSection) observer.observe(contactSection);

    return () => {
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Call us now"
      className={`fixed bottom-5 left-5 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-60 flex items-center justify-center gap-2.5 bg-linear-to-r from-primary to-primary-dark text-white px-4 py-3 md:px-5 md:py-3.5 rounded-full shadow-[0_8px_30px_rgba(10,58,92,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_40_rgba(10,58,92,0.45)] hover:from-primary-dark hover:to-[#082a45] border border-white/10 transition-all duration-300 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full border border-white/20 shadow-sm shrink-0">
        <Phone className="w-[14px] h-[14px] md:w-[15px] md:h-[15px] fill-white/20 shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-25 pointer-events-none" style={{ animationDuration: '2s' }}></span>
      </div>
      <span className="font-bold text-[13px] md:text-[14px] tracking-wide pr-1">Call Now</span>
    </a>
  );
}
