import React from 'react';

export default function PageHeader({ title, description }) {
  return (
    <section className="relative pt-[110px] pb-[36px] overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] border-b border-white/10">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-[var(--color-accent)]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Subtle decorative accent line */}
        <div className="w-10 h-1 bg-[var(--color-accent)] mb-4 rounded-full opacity-80" />
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h1>
        
        {description && (
          <p className="text-[1.05rem] text-white/60 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
