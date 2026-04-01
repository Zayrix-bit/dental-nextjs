import { services } from '@/data/siteData';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Services({ isHomePage = false }) {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 w-full">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14 flex flex-col gap-6">
          <div className="max-w-3xl text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
              Signature <span className="text-primary">Treatments.</span>
            </h2>
            <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl">
              Bespoke dental care designed to elevate your aesthetic, restore optimal function, and prioritize your comfort.
            </p>
          </div>
        </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-6 lg:mt-10 max-w-[1100px] mx-auto">
          {[...services].sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0)).map((service, idx) => (
            <ScrollReveal 
              key={service.id || service.slug || service.title} 
              delay={(idx % 4) * 80}
              className={`h-full ${isHomePage && idx >= 6 ? 'hidden md:block' : ''}`}
            >
              <Link href={`/services/${service.slug}`} className="block h-full outline-none">
                <div className={`h-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300 relative group flex flex-col hover:-translate-y-1 ${service.isHighlighted
                    ? 'shadow-md hover:shadow-lg border-2 border-primary'
                    : 'shadow-sm hover:shadow-md border border-slate-100/80'
                  }`} style={{ overflow: 'hidden' }}>
                  
                  {/* Subtle Gradient Hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                  
                  {/* Priority Badge */}
                  {service.isHighlighted && (
                    <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-30 flex items-center gap-1.5 bg-white text-primary px-2.5 py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-black tracking-tighter uppercase shadow-md border border-slate-100">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-primary" />
                      FEATURED
                    </div>
                  )}

                  {/* Image Area */}
                  <div className="relative w-full aspect-4/3 sm:aspect-3/2 overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/10 to-transparent z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-70"></div>
                    
                    <Image 
                      src={service.image}
                      alt={service.altText || service.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      quality={75}
                      priority={idx < 2}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                    
                    {/* Floating Icon overlapping image and content */}
                    <div className="absolute -bottom-[6px] sm:-bottom-[12px] left-2 sm:left-3 z-20">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center shadow-md border border-slate-50 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 ${service.isHighlighted ? 'bg-primary text-white' : 'bg-white text-primary'
                        }`}>
                        <service.icon className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="p-2 pt-3 sm:p-3 sm:pt-4 md:p-3.5 md:pt-5 lg:p-4 lg:pt-6 flex flex-col grow relative z-10 bg-white">
                    <h3 className="text-[11px] sm:text-sm lg:text-base font-bold text-text-dark mb-1 sm:mb-1.5 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-[8px] sm:text-[0.75rem] lg:text-[0.8rem] text-slate-500 leading-snug mb-2 sm:mb-3 grow line-clamp-2">
                      {service.shortDescription || service.description}
                    </p>

                    {/* Trust Tags */}
                    {service.tags && (
                      <div className="hidden sm:flex flex-wrap gap-1 mb-2 sm:mb-3 relative">
                        {service.tags.slice(0, 2).map((tag, tagIdx) => (
                           <span key={tagIdx} className="bg-slate-50 border border-slate-100 text-slate-500 px-1 py-px sm:px-1.5 sm:py-0.5 rounded text-[7px] sm:text-[9px] font-semibold tracking-wider uppercase truncate max-w-full">
                             {tag}
                           </span>
                        ))}
                      </div>
                    )}

                    {/* Action Link */}
                    <div className="flex items-center text-primary font-bold text-[8px] sm:text-[9px] lg:text-[10px] mt-auto relative group-hover:gap-1.5 transition-all duration-300 gap-1 tracking-wider uppercase">
                      <span>Explore</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                    </div>
                  </div>

                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Explore More Button - Mobile Only */}
        {isHomePage && (
          <div className="mt-8 flex justify-center md:hidden">
            <Link 
              href="/services"
              className="group flex items-center gap-2 bg-white border border-primary/20 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              Explore All Services
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
