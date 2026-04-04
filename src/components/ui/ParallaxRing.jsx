'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * ParallaxRing — A donut ring that moves slightly slower/faster
 * than the section it's in, creating a subtle depth effect.
 *
 * @param {string} className - Tailwind positioning & sizing classes
 * @param {string} ringStyle - 'donut-ring' | 'donut-ring-lg'
 * @param {number} speed     - Parallax intensity. 0 = no movement, 0.15 = subtle, 0.3 = noticeable
 */
export default function ParallaxRing({
  className = '',
  ringStyle = 'bg-donut-ring',
  speed = 0.15,
}) {
  const ringRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = el.parentElement?.getBoundingClientRect();
        if (rect) {
          // How far the section center is from the viewport center
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const diff = sectionCenter - viewportCenter;
          setOffset(diff * speed);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ringRef}
      className={`${ringStyle} pointer-events-none ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
    />
  );
}
