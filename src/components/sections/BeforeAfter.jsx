'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const galleryData = [
  {
    id: 1,
    category: 'Veneers & Whitening',
    highlight: 'Noticeably whiter teeth with a perfectly natural, translucent finish. Complete smile transformation in just two visits.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
    href: '/services/cosmetic-dentistry'
  },
  {
    id: 2,
    category: 'Full Arch Restoration',
    highlight: 'Complete bite correction and aesthetic restoration using dental implants. Restored full function and aesthetic confidence.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
    href: '/services/dental-implants'
  },
  {
    id: 3,
    category: 'Invisalign & Alignment',
    highlight: 'Perfectly straight teeth with discreet, modern alignment solutions. Corrected moderate crowding over 12 months.',
    beforeSrc: '/images/before.png',
    afterSrc: '/images/after.png',
    href: '/services/orthodontics-invisalign'
  }
];

function GalleryCard({ item, onInteractionStart, onInteractionEnd }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const isInteracting = useRef(false);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setPosition(pct);
  };

  const handleMove = (e, clientX) => {
    if (!dragging.current) return;
    
    // Professional interaction management
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    
    requestAnimationFrame(() => updatePosition(clientX));
  };

  const stopDragging = () => {
    if (dragging.current) {
       dragging.current = false;
       isInteracting.current = false;
       onInteractionEnd?.();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden group hover:-translate-y-1.5 border border-slate-100/80 w-[75vw] sm:w-[280px] md:w-full snap-center shrink-0 h-full mx-auto md:mx-0 relative">

      {/* Slider Container - touch-none is critical for interaction stability */}
      <div
        ref={containerRef}
        className="relative cursor-col-resize select-none touch-none overflow-hidden aspect-video w-full"
        onMouseDown={(e) => {
          e.stopPropagation();
          dragging.current = true;
          isInteracting.current = true;
          onInteractionStart?.();
          updatePosition(e.clientX);
        }}
        onMouseMove={(e) => handleMove(e, e.clientX)}
        onTouchStart={(e) => {
          e.stopPropagation();
          dragging.current = true;
          isInteracting.current = true;
          onInteractionStart?.();
          updatePosition(e.touches[0].clientX);
        }}
        onTouchMove={(e) => handleMove(e, e.touches[0].clientX)}
      >
        {/* ... existing slider content ... */}
        {/* After Image (Background) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={item.afterSrc}
            alt="After treatment"
            fill
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 350px"
            quality={75}
          />
        </div>

        {/* Before Image (Clipped) */}
        <div className="absolute inset-0 z-1 overflow-hidden border-r-2 border-white/80" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={item.beforeSrc}
            alt="Before treatment"
            fill
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 350px"
            quality={75}
          />
        </div>

        {/* Slider Handle Pill */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-3 cursor-col-resize transition-transform duration-75 ease-out"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-9 md:w-7 md:h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 flex flex-col items-center justify-center gap-[2px] transition-transform duration-300 group-hover:scale-110">
             <div className="w-[2px] h-[2px] bg-slate-400 rounded-full"></div>
             <div className="w-[2px] h-[2px] bg-slate-400 rounded-full"></div>
             <div className="w-[2px] h-[2px] bg-slate-400 rounded-full"></div>
          </div>
        </div>

        {/* Floating Minimal Labels */}
        <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 z-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase shadow-sm transition-opacity duration-300 group-hover:opacity-0 block">
          Before
        </div>
        <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 z-4 px-2 py-1 bg-primary/80 backdrop-blur-md rounded-full border border-white/10 text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase shadow-sm transition-opacity duration-300 group-hover:opacity-0 block">
          After
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 md:p-5 lg:p-6 flex flex-col justify-between grow bg-white relative z-5">
        
        {/* Floating Star Badge over the image split */}
        <div className="absolute top-0 right-4 md:right-5 -translate-y-1/2 bg-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm border border-slate-50 flex items-center gap-0.5 z-20 transition-transform duration-300 group-hover:-translate-y-1">
            <span className="flex gap-px">
               {[1, 2, 3, 4, 5].map(i => (
                 <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#FBBC04] text-[#FBBC04]" />
               ))}
            </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-widest uppercase">Verified</span>
          </div>
          
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-text-dark mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
             {item.category}
          </h3>
          
          <p className="text-slate-500 text-[0.8rem] md:text-[0.85rem] leading-snug mb-4 line-clamp-3">
            {item.highlight}
          </p>
        </div>
        
        <Link href={item.href || '/services'} className="inline-flex items-center gap-1.5 text-primary text-[10px] md:text-[11px] font-bold tracking-wider uppercase group-hover:gap-2 transition-all mt-auto w-fit">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}

export default function BeforeAfter() {
  const tripleData = [...galleryData, ...galleryData, ...galleryData];
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const singleSetWidth = scrollContainer.scrollWidth / 3;

    // Start in the middle set for seamless initial look
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = singleSetWidth;
    }

    const scrollStep = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 0.8; // Smooth agency-grade speed

        // Silent reset logic for infinite manual/auto loop
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft = singleSetWidth;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = singleSetWidth;
        }
      }
      animationRef.current = requestAnimationFrame(scrollStep);
    };

    animationRef.current = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  return (
    <section id="gallery" className="py-10 md:py-16 bg-clinical overflow-hidden relative">
      {/* Background Decor Removed for Minimalist Consistency */}

      <div className="max-w-[1240px] mx-auto relative z-10 w-full overflow-hidden">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14 flex flex-col gap-6 px-4">
            <div className="max-w-3xl text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
                Life-Changing <span className="text-primary">Smiles.</span>
              </h2>
              <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl">
                Explore our gallery of actual patient results. Transparency and excellence, showcased side-by-side.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Hybrid Interactive Loop Container */}
        <div className="w-full relative px-4">
          <div 
            ref={scrollRef}
            className="flex flex-nowrap gap-4 md:gap-8 pb-10 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseDown={(e) => {
              setIsPaused(true);
              const startX = e.pageX - scrollRef.current.offsetLeft;
              const scrollLeft = scrollRef.current.scrollLeft;
              
              const handleMouseMove = (moveE) => {
                const x = moveE.pageX - scrollRef.current.offsetLeft;
                const walk = (x - startX) * 2;
                scrollRef.current.scrollLeft = scrollLeft - walk;
              };
              
              const handleMouseUp = () => {
                setIsPaused(false);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
              };
              
              window.addEventListener('mousemove', handleMouseMove);
              window.addEventListener('mouseup', handleMouseUp);
            }}
          >
            {tripleData.map((item, index) => (
              <div key={`${item.id}-${index}`} className="w-[85vw] sm:w-[40vw] lg:w-[380px] shrink-0">
                <GalleryCard 
                  item={item} 
                  onInteractionStart={() => setIsPaused(true)}
                  onInteractionEnd={() => setIsPaused(false)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
