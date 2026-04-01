'use client';
import { useState, useEffect } from 'react';
import { siteInfo } from '@/data/siteData';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide when appointment section is in view to prevent overlap
        setIsVisible(!entry.isIntersecting);
      },
      { 
        threshold: 0, 
        rootMargin: '0px 0px -10% 0px' 
      }
    );

    const contactSection = document.getElementById('appointment');
    if (contactSection) observer.observe(contactSection);

    return () => {
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-999 flex flex-col gap-4 items-end pointer-events-none transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      
      {/* Call Button (Secondary, Hidden on Desktop as Header handles it) */}
      <a
        href={`tel:${siteInfo.phoneRaw}`}
        className="group relative flex md:hidden items-center justify-center w-[54px] h-[54px] bg-white text-primary rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100 pointer-events-auto"
        aria-label="Call Now"
      >
        <span className="absolute right-[calc(100%+16px)] bg-white text-text-dark text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 origin-right whitespace-nowrap hidden md:block">
          Call Now
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45" />
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px] stroke-current">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href={siteInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-[54px] h-[54px] bg-[#25D366] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 pointer-events-auto"
      >
        {/* Pulse effect rings */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#25D366] opacity-0 group-hover:animate-ping" />
        
        <span className="absolute right-[calc(100%+16px)] bg-white text-text-dark text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 origin-right whitespace-nowrap hidden md:block">
          Chat on WhatsApp
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45" />
        </span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] fill-white relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605A11.803 11.803 0 0012.05 24c6.604 0 12.003-5.402 12.006-12.007a11.93 11.93 0 00-3.614-8.471" />
        </svg>
      </a>
    </div>
  );
}
