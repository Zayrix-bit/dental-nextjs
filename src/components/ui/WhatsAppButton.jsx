'use client';
import { siteInfo } from '@/data/siteData';
import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4 items-end pointer-events-none">
      
      {/* Call Button */}
      <a
        href={`tel:${siteInfo.phoneRaw}`}
        className="group relative flex items-center justify-center w-[60px] h-[60px] bg-white text-[var(--color-primary)] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,39,51,0.2)] transition-all duration-300 hover:-translate-y-1 border border-gray-100 pointer-events-auto"
        aria-label="Call Now"
      >
        <span className="absolute right-[calc(100%+16px)] bg-white text-[var(--color-text-dark)] text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 origin-right whitespace-nowrap hidden md:block">
          Call Now
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45" />
        </span>
        <Phone className="w-[26px] h-[26px] fill-current" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={siteInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:-translate-y-1 pointer-events-auto"
      >
        {/* Pulse effect rings */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#25D366] opacity-0 group-hover:animate-ping" />
        
        <span className="absolute right-[calc(100%+16px)] bg-white text-[var(--color-text-dark)] text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 origin-right whitespace-nowrap hidden md:block">
          Chat on WhatsApp
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 rotate-45" />
        </span>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] fill-white relative z-10">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.052 9.38L1.054 31.29l6.164-1.97A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.616c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.974-7.828-6.81-8.066-7.126-.23-.316-1.926-2.566-1.926-4.892s1.218-3.472 1.652-3.948c.39-.428 1.03-.634 1.644-.634.198 0 .376.01.536.018.434.02.65.044.938.724.358.848 1.228 2.998 1.336 3.216.108.218.218.512.068.808-.14.306-.26.494-.478.752-.218.258-.428.456-.648.736-.198.238-.42.494-.176.928.244.424 1.088 1.794 2.336 2.908 1.606 1.434 2.882 1.904 3.372 2.1.368.148.804.108 1.06-.168.326-.354.728-.94 1.136-1.518.29-.412.658-.462 1.058-.312.406.142 2.558 1.206 2.994 1.426.436.218.726.328.834.512.106.184.106 1.082-.284 2.182z" />
        </svg>
      </a>
    </div>
  );
}
