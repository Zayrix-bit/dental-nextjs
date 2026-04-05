import { services } from '@/data/siteData';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import ParallaxRing from '@/components/ui/ParallaxRing';

const truncateText = (text, maxLength = 24) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export default function Services({ isHomePage = false }) {
  return (
    <section id="services" className="pt-8 pb-16 lg:pt-6 lg:pb-24 bg-white relative overflow-hidden">

      <ParallaxRing className="absolute -top-20 -right-20 w-[350px] h-[350px] opacity-60" ringStyle="bg-donut-ring" speed={0.12} animation="animate-spin-extra-slow" />
      <ParallaxRing className="absolute bottom-10 -left-28 w-[300px] h-[300px] opacity-50" ringStyle="bg-donut-ring-lg" speed={0.18} animation="animate-float-slow" />
      <ParallaxRing className="absolute top-1/2 right-[5%] w-[150px] h-[150px] opacity-30" ringStyle="bg-donut-ring" speed={0.1} animation="animate-float-slow" />
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
                Treatments Designed for <span className="text-primary">Real Results.</span>
              </h2>
              <p className="text-slate-500 text-[0.92rem] md:text-[1rem] leading-relaxed font-medium max-w-xl">
                Personalized dental solutions focused on improving your smile, health, and confidence.
              </p>
            </div>

            {isHomePage && (
              <div className="flex shrink-0 pb-1">
                <Link
                  href="/services"
                  className="group flex items-center gap-2.5 text-primary font-bold text-[0.85rem] uppercase tracking-widest transition-all hover:text-primary-dark"
                >
                  <span className="relative">
                    View All Services
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-10 mt-12 pb-10`}>
          {[...services]
            .filter(s => !isHomePage || (s.id !== 'pediatric' && s.id !== 'root-canal'))
            .sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0))
            .slice(0, isHomePage ? 6 : undefined)
            .map((service, idx) => (
              <ScrollReveal
                key={service.id || service.slug || service.title}
                delay={(idx % 3) * 100}
                className="h-full"
              >
                <Link href={`/services/${service.slug}`} className="group block h-full outline-none">
                  <div className="h-full bg-white rounded-[20px] md:rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 flex flex-col overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                    
                    {/* Image Area (Dominant Hero) */}
                    <div className="relative w-full aspect-video overflow-hidden bg-slate-50 z-0">
                      <Image
                        src={service.image}
                        alt={service.altText || service.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 2}
                      />
                      {/* Premium Subtle Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/5 to-transparent opacity-40" />
                      
                      {/* Refined Curved Transition SVG (Premium Balanced Curve) */}
                      <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-0 z-10 pointer-events-none">
                        <svg 
                          viewBox="0 0 100 20" 
                          preserveAspectRatio="none" 
                          className="w-full h-4 lg:h-6"
                        >
                          <path 
                            d="M0 20 C 25 10 75 10 100 20 V 20 H 0 Z" 
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Content Area (Refined Spacing) */}
                    <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-10 relative z-20 flex flex-col grow bg-white">
                      
                      {/* Category Label (Small + Subtle) */}
                      <span className="text-[8px] sm:text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-2 sm:mb-3">
                        Specialist Care
                      </span>

                      {/* Title (Primary Focus) */}
                      <h3 className="text-sm sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-6 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Benefit Stack (Outcome-Driven) */}
                      <ul className="space-y-1.5 sm:space-y-3 mb-4 sm:mb-8">
                        {(service.benefits || []).slice(0, 3).map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm text-slate-600 leading-snug">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        {/* Micro Trust Line */}
                        <p className="text-[11px] text-slate-500 mb-5 font-medium">
                          Performed by board-certified specialists
                        </p>

                        {/* CTA (Minimal Apple-Style) */}
                        <div className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                          View Treatment
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
                          <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
}
