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

        {/* Premium Agency CTA Section */}
        {isHomePage && (
          <ScrollReveal delay={100}>
            <div className="mt-16 sm:mt-24 relative w-full lg:px-6">
              <div className="bg-text-dark rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgb(0,0,0,0.15)] group">
                {/* Structural Graphic Elements for Depth */}
                <div className="absolute inset-0 bg-radial-soft from-transparent via-text-dark to-slate-950 opacity-90 z-0"></div>
                <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[150%] bg-linear-to-bl from-primary/20 via-transparent to-transparent -rotate-12 blur-3xl z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-105"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent z-10"></div>
                
                {/* Content Core */}
                <div className="relative z-10 p-8 sm:p-14 lg:p-20 flex flex-col lg:w-[65%] text-left items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-[10px] font-bold text-primary tracking-widest uppercase mb-6 sm:mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Elevate Your Smile
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1] max-w-2xl">
                    Stop settling for average dental care.
                  </h3>
                  
                  <p className="text-slate-400 text-[1rem] sm:text-[1.1rem] leading-relaxed mb-10 max-w-lg font-medium">
                    Experience a masterful blend of cutting-edge technology and tailored artistry. We design smiles that inspire confidence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full sm:w-auto">
                    <Link 
                      href="/services"
                      className="group/cta relative inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-8 py-4 sm:px-10 sm:py-4 rounded-xl text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase outline-none shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgb(var(--primary-rgb),0.3)] w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/cta:opacity-100 transition-colors duration-500 rounded-xl"></div>
                      <span className="relative z-10 pt-px group-hover/cta:text-white transition-colors duration-300">View All Services</span>
                      <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 ease-out group-hover/cta:translate-x-1 group-hover/cta:text-white" strokeWidth={2.5} />
                    </Link>
                    
                    <div className="flex items-center gap-3 pl-2 sm:pl-0">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                      </div>
                      <div className="h-4 w-px bg-slate-700"></div>
                      <div className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">
                        <strong className="text-white">4.9/5</strong> from 500+ patients
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Depth Aesthetic */}
                <div className="hidden lg:flex lg:w-[35%] relative items-center justify-center overflow-hidden">
                   <div className="w-[120%] aspect-square rounded-full border border-primary/20 absolute top-1/2 -translate-y-1/2 right-[-20%] flex items-center justify-center opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out">
                     <div className="w-[75%] aspect-square rounded-full border border-primary/30 flex items-center justify-center backdrop-blur-sm bg-primary/5">
                        <div className="w-[45%] aspect-square rounded-full border border-primary/40 bg-primary/10"></div>
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
