import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { heroStats } from '@/data/siteData';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[75svh] lg:min-h-[85svh] flex items-center overflow-hidden bg-gradient-to-br from-[#1a3a4a] via-[#0d2733] to-[#1a3a4a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Modern dental clinic interior"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(13,39,51,0.85)] via-[rgba(26,58,74,0.7)] to-[rgba(79,195,247,0.2)]" />

      {/* Content */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[700px] py-16 md:py-24 mt-8 md:mt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] px-4 py-1.5 rounded-full text-[0.75rem] font-medium text-[var(--color-accent)] mb-4 backdrop-blur-[10px] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Premium Dental Care
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-white mb-5 lg:mb-6 leading-[1.05] tracking-tighter">
            Premium Dental Care <br className="hidden sm:block" />
            in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#38BDF8]">New York.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-base md:text-lg lg:text-[1.1rem] mb-8 lg:mb-10 max-w-[560px] leading-relaxed font-light">
            Experience the perfect synthesis of advanced technology and compassionate care. We design smiles that inspire confidence and promote lifelong health.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#appointment"
              aria-label="Book your dental appointment"
              className="btn-primary px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              aria-label="Explore our dental services"
              className="btn-outline-hero px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-10 mt-10 pt-6 border-t border-white/10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                <span className="text-[0.7rem] md:text-[0.8rem] text-white/70 mt-0.5 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
