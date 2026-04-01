'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Premium Scroll Reveal Component
 * @param {string} delay - Delay in ms (e.g. "100")
 * @param {string} className - Additional CSS classes
 * @param {boolean} scale - Enable subtle scale-in (0.98 -> 1)
 */
export default function ScrollReveal({ 
  children, 
  delay = 0, 
  className = '',
  scale = false,
  once = true 
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    transitionDelay: `${delay}ms`,
    ...(scale && !isVisible ? { transform: 'translateY(12px) scale(0.98)' } : {}),
    ...(scale && isVisible ? { transform: 'translateY(0) scale(1)' } : {})
  };

  return (
    <div 
      ref={ref} 
      style={style}
      className={`scroll-reveal ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
