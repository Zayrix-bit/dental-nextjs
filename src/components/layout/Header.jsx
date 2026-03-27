'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Activity, ChevronDown } from 'lucide-react';
import { navLinks, ALL_SERVICES } from '@/data/siteData';
import Link from 'next/link';

/* ── Services Dropdown (desktop) ── */
function ServicesDropdown({ scrolled }) {
  const [open, setOpen]   = useState(false);
  const timeoutRef        = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    /* Small delay prevents flicker when cursor briefly leaves the trigger */
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  /* Keep dropdown alive while cursor is inside it */
  const stayOpen = () => clearTimeout(timeoutRef.current);
  
  /* Keyboard event handler */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Trigger */}
      <button
        type="button"
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-[0.85rem] lg:text-[0.9rem] font-medium relative py-1 bg-transparent border-none cursor-pointer transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-accent)] after:transition-all after:duration-300 ${
          scrolled
            ? 'text-[var(--color-text-light)] hover:text-[var(--color-accent)]'
            : 'text-white/85 hover:text-white'
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Services
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        onMouseEnter={stayOpen}
        onMouseLeave={hide}
        className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-[rgba(160,210,235,0.2)] overflow-hidden transition-all duration-200 origin-top z-50 ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-[0.97] -translate-y-1 pointer-events-none'
        }`}
      >
        {/* Header accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />

        <div className="p-2 grid grid-cols-2 gap-1">
          {ALL_SERVICES.filter(s => s.label !== 'Other').slice(0, 8).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3.5 py-2.5 rounded-lg text-[0.82rem] text-[var(--color-text-dark)] font-medium hover:bg-[var(--color-bg-section)] hover:text-[var(--color-accent)] focus:bg-[var(--color-bg-section)] focus:text-[var(--color-accent)] outline-none transition-all duration-150 text-left"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-2.5 bg-[var(--color-bg-section)] border-t border-[rgba(160,210,235,0.2)]">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 text-[0.8rem] font-semibold text-[var(--color-accent)] hover:text-[var(--color-primary-dark)] transition-colors duration-150"
          >
            View all services
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile accordion for Services ── */
function MobileServicesAccordion({ onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg text-white font-medium bg-transparent border-none cursor-pointer"
      >
        Services
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="mt-3 w-64 bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
          {ALL_SERVICES.filter(s => s.label !== 'Other').slice(0, 8).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="block px-4 py-2.5 text-[0.85rem] text-white/90 hover:text-white hover:bg-white/10 transition-all duration-150 border-b border-white/5 last:border-0 text-center"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/services"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 py-2.5 text-[0.8rem] font-semibold text-[var(--color-accent)] border-t border-white/10 hover:bg-white/10 transition-colors duration-150"
          >
            View all services →
          </Link>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   HEADER
   ════════════════════════════════════════════════ */
export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? 'header-glass shadow-[0_4px_15px_rgba(0,0,0,0.06)] py-2' : 'py-3 lg:py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobile}
          className={`relative z-[1001] flex items-center gap-2 text-xl font-bold transition-colors duration-300 ${
            (scrolled && !mobileOpen) ? 'text-[var(--color-text-dark)]' : 'text-white'
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="tracking-tight">DentalCare</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.filter(l => l.label !== 'Testimonials').map((link) => {
            if (link.label === 'Services') {
              return <ServicesDropdown key={link.href} scrolled={scrolled} />;
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`text-[0.85rem] lg:text-[0.9rem] font-medium relative py-1 transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-accent)] after:transition-all after:duration-300 ${
                  pathname === link.href ? 'text-[var(--color-accent)] after:w-full' : (scrolled ? 'text-[var(--color-text-light)] hover:text-[var(--color-accent)]' : 'text-white/85 hover:text-white')
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="btn-primary px-5 py-2 rounded-full text-[13px] font-semibold transition-transform hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobile}
          className={`flex md:hidden flex-col gap-[4px] cursor-pointer z-[1001] bg-transparent border-none p-1 ${
            mobileOpen ? 'hamburger-active' : ''
          }`}
          aria-label="Toggle navigation"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-[22px] h-[2.5px] rounded-[3px] transition-all duration-300 ${
                scrolled && !mobileOpen ? 'bg-[var(--color-text-dark)]' : 'bg-white'
              }`}
            />
          ))}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed inset-0 bg-[rgba(13,39,51,0.97)] backdrop-blur-[20px] flex flex-col justify-center items-center gap-6 z-[999] overflow-y-auto py-20">
            {navLinks.filter(l => l.label !== 'Testimonials').map((link) => {
              if (link.label === 'Services') {
                return (
                  <MobileServicesAccordion key={link.href} onClose={closeMobile} />
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`text-lg font-medium ${pathname === link.href ? 'text-[var(--color-accent)]' : 'text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
             href="/contact"
              onClick={closeMobile}
              className="btn-primary px-8 py-3 rounded-full text-[14px] font-semibold mt-4"
            >
              Book Appointment
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
