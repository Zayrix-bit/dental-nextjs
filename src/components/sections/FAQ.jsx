"use client";

import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { siteInfo } from "@/data/siteData";

const FAQ_DATA = [
  {
    question: "Is dental treatment at your clinic truly pain-free?",
    answer: "Patient comfort is our absolute priority. We utilize advanced localized anesthesia and minimally invasive techniques to ensure a virtually pain-free experience. For highly anxious patients, we also offer specialized sedation options to provide a completely stress-free visit from start to finish."
  },
  {
    question: "How much should I expect to invest in my dental care?",
    answer: "We believe in transparent, value-driven pricing. Since every smile is unique, we provide a detailed, itemized treatment plan during your initial consultation. We also offer flexible payment arrangements and work with major insurance providers to make elite dental care accessible to all our patients."
  },
  {
    question: "How long do procedures like porcelain veneers or implants take?",
    answer: "Timeline varies by treatment complexity. A professional whitening session takes about 90 minutes, while complex restorative work like dental implants involves a healing period of 3-6 months. We design each project schedule to ensure the highest biological success and aesthetic perfection without rushing the process."
  },
  {
    question: "Do you accept my specific dental insurance plan?",
    answer: "Yes, we are an insurance-friendly practice. Our dedicated administrative team will handle all the paperwork and coordinate directly with your provider to maximize your benefits. We recommend bringing your latest insurance details to your first appointment for a real-time benefits assessment."
  },
  {
    question: "What if I have a dental emergency outside of regular hours?",
    answer: "We provide 24/7 priority emergency support for our registered patients. If you experience acute pain or dental trauma during the weekend or late at night, our dedicated emergency line is always active to provide immediate clinical guidance and urgent scheduling."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 lg:py-16 bg-white px-4 relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />
      
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-10 lg:mb-14 max-w-3xl text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h2>
          <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl">
            Everything you need to know about our clinical procedures, elite membership options, and concierge patient care.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-2.5">
          {FAQ_DATA.map((item, index) => (
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
