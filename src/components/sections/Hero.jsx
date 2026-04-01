import Image from 'next/image';
import { Sparkles, Star } from 'lucide-react';
import { heroStats } from '@/data/siteData';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const TRUST_AVATARS = [
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100&h=100',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100',
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[65svh] lg:min-h-[78svh] flex items-center overflow-hidden bg-linear-to-br from-[#1a3a4a] via-[#0d2733] to-[#1a3a4a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Modern dental clinic interior"
          fill
          className="object-cover opacity-35"
          priority={true}
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-linear-to-br from-[rgba(13,39,51,0.85)] via-[rgba(26,58,74,0.7)] to-[rgba(79,195,247,0.2)]" />

      {/* Content */}
      <div className="relative z-2 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[700px] py-16 md:py-24 mt-8 md:mt-0">

          {/* Trust Badge & Avatars */}
          <div className="flex flex-wrap items-center gap-4 mb-6 lg:mb-8 animate-[fadeInUp_0.6s_ease]">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-accent backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Premium Dental Care
            </div>

            {/* Google Rating */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full">
              <div className="flex -space-x-2">
                {TRUST_AVATARS.map((src, i) => (
                  <div key={i} className="relative w-6 h-6 rounded-full border-2 border-[#0d2733] overflow-hidden">
                    <Image src={src} alt="Patient Avatar" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-white tracking-wide">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Advanced Dental Excellence
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
              className="btn-primary px-8 py-4 rounded-full font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              aria-label="Explore our dental services"
              className="btn-outline-hero px-8 py-4 rounded-full font-bold text-sm inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 md:flex md:flex-wrap gap-2 sm:gap-4 md:gap-10 mt-12 pt-8 border-t border-white/10 w-full overflow-hidden">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                <span className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] text-white/70 mt-0.5 block leading-tight tracking-wider uppercase font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
