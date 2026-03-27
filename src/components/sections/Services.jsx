import { services } from '@/data/siteData';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  return (
    <section id="services" className="py-10 lg:py-16 bg-zinc-50 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-[80px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-8 lg:mb-10 text-center">
             <SectionTitle
                title="Comprehensive Dental Solutions in NY"
                subtitle="Experience premium, painless dental care tailored to enhance your smile, restore perfect function, and boost your everyday confidence."
             />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-6 lg:mt-8">
          {[...services].sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0)).map((service) => (
            <ScrollReveal key={service.id || service.title}>
              <Link href={`/services#${service.id}`} className="block h-full outline-none">
                <div className={`h-full bg-white rounded-2xl lg:rounded-[20px] p-4 lg:p-6 transition-all duration-300 relative overflow-hidden group flex flex-col hover:-translate-y-1 ${
                  service.isHighlighted 
                    ? 'shadow-md hover:shadow-lg border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]' 
                    : 'shadow-sm hover:shadow border border-slate-100'
                }`}>
                  
                  {/* Subtle Gradient Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Priority Badge */}
                  {service.isHighlighted && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[0.65rem] lg:text-xs font-bold tracking-wide shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Icon Area */}
                  <div className={`relative w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mb-3 lg:mb-4 transition-transform duration-300 group-hover:scale-105 shadow-sm ${
                    service.isHighlighted ? 'bg-[var(--color-primary)] text-white' : 'bg-[#E3F2FD] text-[var(--color-accent-dark)]'
                  }`}>
                    <service.icon className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1.5} />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="relative text-sm lg:text-lg font-bold text-[var(--color-text-dark)] mb-1.5 lg:mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="relative text-[0.7rem] lg:text-[0.85rem] text-[var(--color-text-light)] leading-snug lg:leading-relaxed mb-3 lg:mb-4 flex-grow line-clamp-3 lg:line-clamp-none">
                    {service.description}
                  </p>

                  {/* Trust Tags */}
                  {service.tags && (
                    <div className="flex flex-wrap gap-1 lg:gap-1.5 mb-3 lg:mb-5 relative">
                      {service.tags.map((tag, idx) => (
                         <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-500 px-1.5 py-0.5 lg:px-2 rounded text-[0.55rem] lg:text-xs font-medium truncate max-w-full">
                           {tag}
                         </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="flex items-center text-[var(--color-primary)] font-semibold text-[0.7rem] lg:text-[0.85rem] mt-auto relative group-hover:gap-1.5 transition-all duration-300 gap-1">
                    Explore <span className="hidden sm:inline">Treatment</span> <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 stroke-[2.5]" />
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
