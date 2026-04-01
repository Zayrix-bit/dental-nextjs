import Image from 'next/image';
import { features } from '@/data/siteData';
import ScrollReveal from '@/components/ScrollReveal';

export default function WhyChooseUs() {
  return (
    <section id="about" className="flex items-center justify-center py-10 lg:py-16 bg-bg-section relative overflow-hidden">
      {/* Subtle Abstract Background */}
      <div className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-text-dark mb-6 tracking-tight leading-[1.1]">
                  Modern Dentistry, <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Elevated.</span>
                </h2>
                <p className="text-text-light text-sm lg:text-base max-w-lg leading-relaxed font-medium mb-8">
                  Experience a new standard of dental care where cutting-edge technology meets unparalleled comfort in a thoughtfully designed space.
                </p>
              </div>

              {/* Compact 2x2 Features Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group relative flex flex-col p-3 sm:p-4 bg-white rounded-xl border border-slate-100/80 hover:border-transparent hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-bg-section group-hover:bg-primary rounded-md sm:rounded-lg flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 mb-2 lg:mb-3 shadow-sm border border-slate-100 group-hover:border-transparent">
                        <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" strokeWidth={2} />
                      </div>
                      <h3 className="font-bold text-text-dark text-xs sm:text-sm lg:text-base mb-1 group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-text-light text-[0.6rem] sm:text-[0.7rem] lg:text-[0.8rem] leading-tight sm:leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Column - Very Tightly Controlled Height */}
            <div className="order-1 lg:order-2 relative w-full aspect-video lg:h-[min(480px,65vh)] rounded-2xl lg:rounded-4xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] group">
              <div className="absolute inset-0 bg-linear-to-tr from-black/50 via-transparent to-transparent z-10" />
              <Image
                src="/images/team.png"
                alt="Our expert dental team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
              />
              
              {/* Premium Floating Badge (Smaller) */}
              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20">
                <div className="bg-white/95 backdrop-blur-xl px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 lg:gap-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-linear-to-br from-primary to-blue-700 flex items-center justify-center text-white shadow-inner">
                    <span className="text-lg lg:text-2xl font-black tracking-tighter">15<span className="text-base lg:text-lg">+</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm lg:text-base font-extrabold text-text-dark leading-tight">Years of</span>
                    <span className="text-[0.6rem] lg:text-[0.7rem] font-bold text-text-light uppercase tracking-widest mt-0.5">Excellence</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
