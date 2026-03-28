import { siteInfo } from "@/data/siteData";

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
    <section className={`py-10 lg:py-16 bg-white ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-text-dark tracking-tight leading-[1.1]">
            Find Our <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Clinic.</span>
          </h2>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-8 items-stretch mx-auto max-w-[1000px]">
          
          {/* Map Embed */}
          <div className="w-full h-[300px] lg:h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 bg-slate-50 relative group transition-shadow duration-300">
            <iframe
              src={siteInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
              title="Dental Clinic Location Map"
            ></iframe>
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
