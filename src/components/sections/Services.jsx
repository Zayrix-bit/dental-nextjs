import { services } from '@/data/siteData';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import ParallaxRing from '@/components/ui/ParallaxRing';

export default function Services({ isHomePage = false }) {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Patterns */}
      <div className="absolute inset-0 bg-abstract-waves pointer-events-none" />
      <ParallaxRing className="absolute -top-20 -right-20 w-[350px] h-[350px]" ringStyle="bg-donut-ring" speed={0.12} />
      <ParallaxRing className="absolute bottom-10 -left-28 w-[300px] h-[300px]" ringStyle="bg-donut-ring-lg" speed={0.18} />
      <div className="absolute inset-0 bg-radial-soft pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
                Signature <span className="text-primary">Treatments.</span>
              </h2>
              <p className="text-slate-500 text-[0.92rem] md:text-[1rem] leading-relaxed font-medium max-w-xl">
                Bespoke dental care designed to elevate your aesthetic, restore optimal function, and prioritize your comfort.
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-6 lg:mt-10">
          {[...services]
            .sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0))
            .map((service, idx) => (
              <ScrollReveal
                key={service.id || service.slug || service.title}
                delay={(idx % 4) * 80}
                className={`h-full ${isHomePage && idx >= 6 ? 'hidden lg:block' : ''}`}
              >
                <Link href={`/services/${service.slug}`} className="block h-full outline-none">
                  <div className={`h-full bg-white rounded-xl sm:rounded-2xl transition-all duration-500 relative group flex flex-col hover:-translate-y-1.5 ${service.isHighlighted
                    ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.16)] border border-primary/30 hover:border-primary/60'
                    : 'shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.08)] border border-slate-100/80 hover:border-slate-200'
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
      </div>
    </section>
  );
}
