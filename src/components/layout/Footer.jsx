import { Activity, MapPin, Phone, Mail, ArrowRight, Clock } from 'lucide-react';
import { siteInfo, footerQuickLinks, services } from '@/data/siteData';
import config from '@/config';
import Link from 'next/link';

/* ── Inline SVG Social Icons ── */
const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Footer Section Title ── */
const FooterTitle = ({ children }) => (
  <h4 className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-white/40 mb-4 lg:mb-5">
    {children}
  </h4>
);

/* ── Footer Link Item ── */
const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="text-[0.85rem] lg:text-[0.9rem] text-white/55 hover:text-white transition-colors duration-200 leading-none"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 5);

  return (
    <footer className="relative bg-[#060d12] text-white/80 overflow-hidden">

      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[140px] pointer-events-none" />

      {/* ═══════════════════════════════════════════
          TOP CTA BANNER
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-8 lg:py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 lg:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white mb-1.5 lg:mb-2">
              {config.footer.ctaHeading}
            </h3>
            <p className="text-white/45 text-[0.85rem] lg:text-[0.9rem] max-w-md leading-relaxed">
              {config.footer.ctaDescription}
            </p>
          </div>
          <Link
            href="#appointment"
            className="group shrink-0 inline-flex items-center gap-2 px-6 lg:px-7 py-3 bg-white text-[#060d12] font-bold rounded-full text-[0.8rem] lg:text-[0.85rem] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.06)]"
          >
            Book Appointment
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN FOOTER GRID
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 lg:gap-8">

          {/* ── Brand Column ── */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 lg:mb-5 group">
              <div className="w-8 h-8 bg-linear-to-br from-accent to-primary rounded-lg flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {siteInfo.name}<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-white/40 text-[0.8rem] lg:text-[0.85rem] leading-relaxed max-w-[300px] mb-5 lg:mb-6">
              {config.brandDescription}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {[
                { Icon: FacebookIcon, href: config.social.facebook },
                { Icon: InstagramIcon, href: config.social.instagram },
                { Icon: TwitterIcon, href: config.social.twitter },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label="Social media"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <FooterTitle>Explore</FooterTitle>
            <ul className="space-y-2.5 lg:space-y-3">
              {footerQuickLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div className="col-span-1 lg:col-span-2">
            <FooterTitle>Services</FooterTitle>
            <ul className="space-y-2.5 lg:space-y-3">
              {topServices.map((s) => (
                <FooterLink key={s.id} href="/services">
                  {s.title}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="col-span-2 lg:col-span-3">
            <FooterTitle>Contact</FooterTitle>
            <ul className="space-y-3 lg:space-y-3.5">
              <li>
                <a href={`tel:${siteInfo.phoneRaw}`} className="inline-flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[0.85rem] text-white/55 group-hover:text-white transition-colors font-medium">
                    {siteInfo.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[0.85rem] text-white/55 group-hover:text-white transition-colors font-medium">
                    {siteInfo.email}
                  </span>
                </a>
              </li>
              <li>
                <div className="inline-flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[0.85rem] text-white/45 leading-relaxed">
                    {siteInfo.address.street}<br />
                    {siteInfo.address.city}
                  </span>
                </div>
              </li>
              <li>
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-[0.85rem] text-accent font-medium">
                    {siteInfo.hours.emergency}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          BOTTOM BAR
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 lg:py-5 flex flex-col sm:flex-row justify-between items-center gap-2.5">
          <p className="text-white/30 text-[0.75rem] lg:text-[0.8rem]">
            © {year} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[0.75rem] lg:text-[0.8rem]">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
