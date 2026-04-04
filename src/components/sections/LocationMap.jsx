import { siteInfo } from "@/data/siteData";
import ParallaxRing from '@/components/ui/ParallaxRing';

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] stroke-accent">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] stroke-accent">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] stroke-accent">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const NavigationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 lg:w-5 lg:h-5">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export default function LocationMap({ className = "" }) {
  const query = encodeURIComponent(`${siteInfo.address.street}, ${siteInfo.address.city}`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className={`py-10 lg:py-16 bg-white relative overflow-hidden ${className}`}>
      {/* Lavender Donut Ring Accents */}
      <ParallaxRing className="absolute top-1/3 -left-20 w-[320px] h-[320px]" ringStyle="bg-donut-ring" speed={0.18} />
      <ParallaxRing className="absolute -top-20 -right-16 w-[280px] h-[280px]" ringStyle="bg-donut-ring-lg" speed={0.1} />

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-3xl text-left">
          <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-text-dark tracking-tight leading-[1.1] mb-6">
            Find Our <span className="text-primary">Clinic.</span>
          </h2>
          <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl">
            Visit our state-of-the-art facility located in the heart of the city. We provide a sanctuary of clinical excellence and patient comfort.
          </p>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-8 items-stretch">
          
          {/* Map Preview (Privacy-Friendly, No Cookies) */}
          <div className="w-full h-[300px] lg:h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 bg-slate-900 relative group transition-shadow duration-300">
            {/* Background Image / Placeholder */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              style={{ backgroundImage: `url('/images/hero-bg.png')`, opacity: 0.4 }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            {/* Content Over Map */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <MapPinIcon />
              </div>
              <h4 className="text-white text-lg lg:text-xl font-bold mb-2">Google Maps Tracking Blocked</h4>
              <p className="text-white/70 text-xs lg:text-sm max-w-[280px] mb-6 leading-relaxed">
                To protect your privacy, we don't load third-party maps directly. Click below to view our location safely.
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-full text-xs lg:text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-xl"
              >
                View on Google Maps
                <NavigationIcon />
              </a>
            </div>

            {/* Address Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <MapPinIcon />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent">Location</p>
                  <p className="text-white text-xs font-medium">{siteInfo.address.street}, NY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Card */}
          <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col h-full group hover:-translate-y-1">
            <h3 className="text-lg lg:text-xl font-bold text-text-dark mb-5 tracking-tight">
              Clinic Details
            </h3>

            <div className="flex flex-col gap-5 lg:gap-6 mb-8 flex-1">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <strong className="block text-xs lg:text-[13px] font-extrabold text-text-dark tracking-wider uppercase mb-0.5">
                    Address
                  </strong>
                  <span className="text-[13px] lg:text-[14px] text-text-light leading-relaxed">
                    {siteInfo.address.street}<br />
                    {siteInfo.address.city}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <strong className="block text-xs lg:text-[13px] font-extrabold text-text-dark tracking-wider uppercase mb-0.5">
                    Phone
                  </strong>
                  <span className="text-[13px] lg:text-[14px] text-text-light">
                    {siteInfo.phone}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <strong className="block text-xs lg:text-[13px] font-extrabold text-text-dark tracking-wider uppercase mb-0.5">
                    Hours
                  </strong>
                  <span className="text-[13px] lg:text-[14px] text-text-light leading-relaxed">
                    {siteInfo.hours.weekdays}<br />
                    {siteInfo.hours.saturday}
                  </span>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-[13px] lg:text-[14px] font-semibold py-3 px-5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:-translate-y-0.5"
            >
              Get Directions
              <NavigationIcon />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
