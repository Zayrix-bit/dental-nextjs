'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Activity, ChevronDown, Phone } from 'lucide-react';
import { navLinks, ALL_SERVICES, siteInfo } from '@/data/siteData';
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
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const stayOpen = () => clearTimeout(timeoutRef.current);
  
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
      <button
        type="button"
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1 text-[0.85rem] lg:text-[0.9rem] font-medium relative py-1 bg-transparent border-none cursor-pointer transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${
          scrolled ? 'text-text-light hover:text-accent' : 'text-white/85 hover:text-white'
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Toggle Services Menu"
      >
        Services
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      <div
        onMouseEnter={stayOpen}
        onMouseLeave={hide}
        className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-[rgba(160,210,235,0.2)] overflow-hidden transition-all duration-200 origin-top z-50 ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-[0.97] -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-primary to-accent" />
        <div className="p-2 grid grid-cols-2 gap-1">
          {ALL_SERVICES.filter(s => s.label !== 'Other').slice(0, 8).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3.5 py-2.5 rounded-lg text-[0.82rem] text-text-dark font-medium hover:bg-bg-section hover:text-accent focus:bg-bg-section focus:text-accent outline-none transition-all duration-150 text-left"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="px-4 py-2.5 bg-bg-section border-t border-[rgba(160,210,235,0.2)]">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 text-[0.8rem] font-semibold text-accent hover:text-primary-dark transition-colors duration-150"
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
        aria-expanded={open}
        aria-label="Toggle Mobile Services"
      >
        Services
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="mt-3 w-64 bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm animate-[fadeInUp_0.2s_ease]">
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
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled]   = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  // Force "scrolled" state on sub-pages so header is visible on light backgrounds
  const effectiveScrolled = scrolled || !isHomePage;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b ${
        (mounted ? effectiveScrolled : true) 
          ? 'header-glass shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-1.5 border-white/10' 
          : 'py-2.5 lg:py-4 border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobile}
          className={`relative z-[1001] flex items-center gap-2.5 text-xl lg:text-2xl font-black transition-all duration-300 ${
            (effectiveScrolled && !mobileOpen) ? 'text-text-dark scale-95' : 'text-white'
          }`}
          aria-label={`${siteInfo.name} Home`}
        >
          <div className="w-7.5 h-7.5 lg:w-8.5 lg:h-8.5 bg-linear-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
            <Activity className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-white" strokeWidth={3} />
          </div>
          <span className="tracking-tighter">DentalCare</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.filter(l => !['Testimonials', 'Contact'].includes(l.label)).map((link) => {
            if (link.label === 'Services') {
              return <ServicesDropdown key={link.href} scrolled={effectiveScrolled} />;
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`text-[0.85rem] lg:text-[0.92rem] font-semibold relative py-1 transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${
                  pathname === link.href ? 'text-accent after:w-full' : (effectiveScrolled ? 'text-text-light hover:text-accent' : 'text-white/85 hover:text-white')
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Phone Number - Robust Link */}
          <a 
            href={`tel:${siteInfo.phoneRaw}`} 
            className={`hidden lg:flex items-center gap-2.5 text-[0.88rem] font-bold transition-all duration-300 ${
              effectiveScrolled ? 'text-rose-600 hover:text-rose-700' : 'text-white hover:text-rose-400'
            }`}
            aria-label={`Call us at ${siteInfo.phone}`}
          >
            <div className={`p-1.5 rounded-full transition-colors duration-300 border ${
              effectiveScrolled ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white/10 border-white/10 text-white'
            }`}>
              <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            {siteInfo.phone}
          </a>

          <Link
            href="#appointment"
            onClick={closeMobile}
            className="btn-primary px-7 py-2.5 rounded-full text-[13px] font-extrabold shadow-lg shadow-black/10"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobile}
          className={`flex md:hidden flex-col gap-[5px] cursor-pointer z-[1001] bg-transparent border-none p-2 rounded-lg transition-colors duration-300 ${
            effectiveScrolled && !mobileOpen ? 'hover:bg-slate-100' : 'hover:bg-white/5'
          } ${mobileOpen ? 'hamburger-active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-[24px] h-[2.5px] rounded-[3px] transition-all duration-300 ${
                (effectiveScrolled && !mobileOpen) ? 'bg-text-dark' : 'bg-white'
              }`}
            />
          ))}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed inset-0 bg-linear-to-br from-[#0d2733] to-[#1a3a4a] flex flex-col justify-center items-center gap-8 z-[999] overflow-y-auto pt-24 pb-12 animate-[fadeIn_0.3s_ease]">
            {/* Topbar Info (In-Menu mobile only) */}
            <div className="flex flex-col items-center gap-2 mb-4">
               <span className="text-white/60 text-[10px] tracking-widest uppercase font-bold">Quick Contact</span>
               <a href={`tel:${siteInfo.phoneRaw}`} className="text-rose-500 text-xl font-bold">{siteInfo.phone}</a>
            </div>

            {navLinks.filter(l => !['Testimonials', 'Contact'].includes(l.label)).map((link) => {
              if (link.label === 'Services') {
                return (
                  <MobileServicesAccordion key={link.href} onClose={closeMobile} />
                );
              }
              return (
                <Link
                  key={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  href={link.href}
                  onClick={closeMobile}
                  className={`text-xl font-bold tracking-tight ${pathname === link.href ? 'text-accent scale-110' : 'text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="#appointment"
              onClick={closeMobile}
              className="btn-primary w-64 text-center py-4 rounded-full text-[14px] font-bold mt-6 shadow-xl shadow-accent/20"
            >
              Book Appointment
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
