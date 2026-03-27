'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const galleryData = [
  {
    id: 1,
    category: 'Veneers & Whitening',
    highlight: 'Noticeably whiter teeth with a perfectly natural, translucent finish.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
  },
  {
    id: 2,
    category: 'Full Arch Restoration',
    highlight: 'Complete bite correction and aesthetic restoration using dental implants.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
  },
  {
    id: 3,
    category: 'Invisalign & Alignment',
    highlight: 'Perfectly straight teeth with discreet, modern alignment solutions.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
  }
];

function GalleryCard({ item }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setPosition(pct);
  };

  const handleMove = (clientX) => {
    if (!dragging.current) return;
    requestAnimationFrame(() => updatePosition(clientX));
  };

  // Global listener to stop drag if mouse leaves the iframe/window
  useEffect(() => {
    const handleMouseUp = () => { dragging.current = false; };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-500 overflow-hidden group hover:-translate-y-1 border border-slate-100">

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative cursor-col-resize select-none touch-none overflow-hidden"
        style={{ aspectRatio: '4/3' }}
        onMouseDown={(e) => {
          dragging.current = true;
          updatePosition(e.clientX);
        }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchStart={(e) => {
          dragging.current = true;
          updatePosition(e.touches[0].clientX);
        }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After Image (Background) - Enhanced Saturation/Contrast */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={item.afterSrc}
            alt="After treatment"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] saturate-[1.15] contrast-[1.05]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Before Image (Clipped) - Slightly muted to emphasize the 'after' */}
        <div className="absolute inset-0 z-[1] overflow-hidden border-r-2 border-white/50" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={item.beforeSrc}
            alt="Before treatment"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] brightness-[0.95] contrast-[0.95] sepia-[0.05]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Slider Handle Node */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-[3] shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-col-resize transition-transform duration-75 ease-out"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {/* Custom SVG icon for arrows instead of empty handle */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-5 lg:h-5">
              <path d="M15 18L21 12L15 6" stroke="#0A3A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 18L3 12L9 6" stroke="#0A3A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Floating Labels */}
        <div className="absolute top-3 left-3 z-[4] px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm transition-opacity duration-300 group-hover:opacity-0 hidden sm:block">
          Before
        </div>
        <div className="absolute top-3 right-3 z-[4] px-2.5 py-1 bg-[var(--color-primary)]/80 backdrop-blur-md rounded-lg border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm transition-opacity duration-300 group-hover:opacity-0 hidden sm:block">
          After
        </div>
      </div>

      {/* Card Content (Micro-copy & Rating) */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[0.65rem] font-bold text-emerald-600 tracking-widest uppercase flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Real Result
            </span>
            <div className="flex gap-[1px] text-[#FBBC04]">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              ))}
            </div>
          </div>
          <h3 className="text-base lg:text-lg font-bold text-[var(--color-text-dark)] mb-1.5">{item.category}</h3>
          <p className="text-[var(--color-text-light)] text-[0.8rem] lg:text-[0.85rem] leading-snug italic border-l-2 border-[var(--color-accent)]/40 pl-2.5">
            "{item.highlight}"
          </p>
        </div>
      </div>

    </div>
  );
}

export default function BeforeAfter() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-10 lg:py-16 bg-[var(--color-bg-section)] overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-8 lg:mb-12">
            <span className="text-[var(--color-accent)] font-semibold tracking-wider uppercase text-xs lg:text-sm mb-2 block">Transformations</span>
            <h2 className="text-3xl lg:text-[2.75rem] font-bold text-[var(--color-text-dark)] mb-3 lg:mb-4 leading-tight tracking-tight">
              Life-Changing <span className="text-[var(--color-primary)] italic">Smiles.</span>
            </h2>
            <p className="text-[var(--color-text-light)] text-sm lg:text-base">
              Explore our gallery of real patient results. Drag the sliders to compare before and after treatments.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto flex-wrap">
          {galleryData.map((item) => (
            <ScrollReveal key={item.id} delay={item.id * 100}>
              <GalleryCard item={item} />
            </ScrollReveal>
          ))}
        </div>


      </div>
    </section>
  );
}
