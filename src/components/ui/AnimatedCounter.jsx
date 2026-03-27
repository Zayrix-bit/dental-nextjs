'use client';

import { useRef, useEffect } from 'react';

export default function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (suffix === 'K+') {
              el.textContent = (current >= 1000 ? Math.round(current / 1000) : current) + 'K+';
            } else {
              el.textContent = current + suffix;
            }

            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-bold text-[var(--color-accent)] block">
      0
    </span>
  );
}
