import { 
  Activity, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import { siteInfo, footerQuickLinks, services } from '@/data/siteData';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#051117] text-white/80 overflow-hidden border-t border-white/5 pt-24">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16 relative z-10">
        
        {/* Top CTA Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-16 mb-16 gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Ready for a Brighter Smile?
            </h3>
            <p className="text-white/60 max-w-md text-[1.05rem] leading-relaxed">
              Join thousands of satisfied patients. Book your comprehensive consultation today and experience premium dental care.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-[#051117] font-semibold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <ScrollReveal className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-white mb-8 group inline-flex">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-full flex items-center justify-center relative overflow-hidden shrink-0">
                <Activity className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="tracking-tight">{siteInfo.name}<span className="text-[var(--color-accent)]">.</span></span>
            </Link>
            <p className="text-white/50 text-[0.95rem] leading-relaxed mb-8 max-w-sm">
              Redefining modern dentistry with advanced technology, compassionate staff, and a commitment to your lifelong oral health.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
                <FacebookIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
                <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 group">
                <TwitterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={100} className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase mt-2">Explore</h4>
            <ul className="space-y-4">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-[0.95rem] transition-colors"
                  >
                    <span className="w-0 h-[1px] bg-[var(--color-accent)] group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={200} className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase mt-2">Services</h4>
            <ul className="space-y-4">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-[0.95rem] transition-colors"
                  >
                    <span className="w-0 h-[1px] bg-[var(--color-accent)] group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {s.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={300} className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase mt-2">Connect</h4>
            <ul className="space-y-5">
              <li>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <span className="text-white/60 text-[0.95rem] leading-relaxed pt-2">
                    {siteInfo.address.street}
                    <br />
                    {siteInfo.address.city}
                  </span>
                </div>
              </li>
              <li>
                <a href={`tel:${siteInfo.phoneRaw}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                    <Phone className="w-4 h-4 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white/60 group-hover:text-white text-[0.95rem] transition-colors">
                    {siteInfo.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                    <Mail className="w-4 h-4 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white/60 group-hover:text-white text-[0.95rem] transition-colors">
                    {siteInfo.email}
                  </span>
                </a>
              </li>
            </ul>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-[0.85rem] mb-1">Emergency Care</p>
              <p className="text-[var(--color-accent)] font-medium text-[0.95rem]">
                {siteInfo.hours.emergency}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[0.85rem]">
            © {year} {siteInfo.name} Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[0.85rem]">
            <Link href="/privacy" className="text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
