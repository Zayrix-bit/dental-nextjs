import Image from 'next/image';
import { testimonials } from '@/data/siteData';
import ScrollReveal from '@/components/ScrollReveal';

export default function Testimonials() {
  const userPhotos = {
    'Sarah M.': 'women/68.jpg',
    'James Rodriguez': 'men/32.jpg',
    'Emily Parker': 'women/44.jpg',
    'David W.': 'men/46.jpg',
    'L. Kim': 'women/65.jpg',
    'Mike H.': 'men/22.jpg',
    'Robert G.': 'men/78.jpg',
    'Aisha T.': 'women/89.jpg',
    'Paul C.': 'men/12.jpg',
    'J. Evans': 'men/60.jpg',
    'Natalie R.': 'women/33.jpg',
    'Marcus B.': 'men/44.jpg'
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-bg-light overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-16 md:mb-20 text-left">
            <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-text-dark mb-6 tracking-tight leading-[1.1]">
              Patient <span className="text-primary">Stories.</span>
            </h2>
            <p className="text-text-light text-sm lg:text-base max-w-2xl leading-relaxed font-medium mb-8">
              Don&apos;t just take our word for it. Hear from those who have experienced our clinical excellence firsthand.
            </p>
          </div>
        </ScrollReveal>

        {/* Infinite Scroll Carousel */}
        <ScrollReveal delay={150}>
          <div className="relative pt-8 pb-12 overflow-hidden -mx-6 px-6 md:mx-0 md:px-0 mt-4 group mask-edges">
            <div className="flex gap-6 w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shrink-0 w-[85vw] sm:w-[420px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Header: Avatar, Name, Role, Google Logo */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  {userPhotos[t.name] ? (
                    <div className="relative w-10 h-10 shrink-0">
                      <Image 
                        src={`https://randomuser.me/api/portraits/${userPhotos[t.name]}`} 
                        alt={t.name} 
                        fill
                        className="rounded-full object-cover border border-slate-100" 
                        sizes="40px"
                        quality={75}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1A73E8] flex items-center justify-center text-white font-medium text-lg shrink-0">
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-[0.95rem] text-[#202124] leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[0.75rem] text-[#70757A] mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
                {/* Minimal G logo */}
                <svg className="w-5 h-5 opacity-80 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>

              {/* Stars and Date */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-[14px] h-[14px] ${i < t.rating ? 'fill-[#FBBC04]' : 'fill-[#E8EAED]'}`} viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[0.8rem] text-[#70757A]">{t.timeAgo}</span>
              </div>

              {/* Text */}
              <p className="text-[0.9rem] text-[#3C4043] leading-[1.6]">
                {t.text}
              </p>
            </div>
          ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
}
