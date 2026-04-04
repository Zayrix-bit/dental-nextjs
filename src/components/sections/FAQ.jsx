"use client";

import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { siteInfo, faqData } from "@/data/siteData";
import config from "@/config";
import ParallaxRing from '@/components/ui/ParallaxRing';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 lg:py-16 bg-white relative overflow-hidden">
      {/* Subtle Background Patterns */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none opacity-40" />
      <ParallaxRing className="absolute -bottom-20 -right-20 w-[320px] h-[320px]" ringStyle="bg-donut-ring" speed={0.14} />
      <ParallaxRing className="absolute top-8 -left-16 w-[300px] h-[300px]" ringStyle="bg-donut-ring-lg" speed={0.2} />
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-10 lg:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
            {config.faq.heading} <span className="text-primary">{config.faq.headingAccent}</span>
          </h2>
          <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl mx-auto">
            {config.faq.subtitle}
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-2.5">
          {faqData.map((item, index) => (
            <FAQItem 
              key={index} 
              item={item} 
              isOpen={openIndex === index} 
              onClick={() => toggleFAQ(index)} 
            />
          ))}
        </div>

        {/* Trust Note & CTA Section */}
        <div className="mt-12 p-8 bg-slate-50/50 rounded-3xl border border-slate-100/80 text-center">
          <h3 className="text-xl font-bold text-text-dark mb-2 tracking-tight">
             Still have questions?
          </h3>
          <p className="text-sm text-text-light font-medium mb-8 max-w-[440px] mx-auto opacity-80">
            Our clinical concierge team is available to provide detailed guidance on any treatment or administrative query.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#appointment" 
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
            >
              Book Your Consultation
            </a>
            <a 
              href={siteInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div 
      className={`group border rounded-2xl transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'border-primary/20 bg-primary/3 shadow-md' 
          : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full text-left px-5 py-5 lg:px-7 lg:py-5.5 flex items-center justify-between gap-6"
        aria-expanded={isOpen}
      >
        <span className={`text-[15px] lg:text-[17px] font-bold tracking-tight transition-colors duration-300 ${
          isOpen ? 'text-primary' : 'text-text-dark'
        }`}>
          {item.question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 transform ${
          isOpen 
            ? 'bg-primary border-primary text-white rotate-45' 
            : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:border-slate-300 rotate-0'
        }`}>
          <Plus className="w-4 h-4 lg:w-[1.1rem] lg:h-[1.1rem]" strokeWidth={2.5} />
        </div>
      </button>
      
      {/* Smooth Content Expansion */}
      <div className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 lg:px-7 lg:pb-6 pt-0">
            <div className="w-full h-px bg-slate-200/50 mb-4" />
            <p className="text-[14px] lg:text-[15px] text-slate-500 leading-relaxed font-medium max-w-[95%]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
