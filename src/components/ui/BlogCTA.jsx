import { siteInfo } from '@/data/siteData';

export default function BlogCTA({ 
  title = "Need help? Talk to our dentist", 
  text = "We're here to answer your questions and provide honest advice." 
}) {
  return (
    <div className="my-10 p-6 bg-gradient-to-br from-[var(--color-bg-light)] to-white border border-[rgba(160,210,235,0.2)] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-5 not-prose break-inside-avoid">
      <div className="text-center sm:text-left">
        <h4 className="text-[1.05rem] font-bold text-[var(--color-text-dark)] leading-snug mb-1">{title}</h4>
        <p className="text-[0.95rem] text-[var(--color-text-light)] m-0 leading-snug">{text}</p>
      </div>
      <a
        href={`tel:${siteInfo.phoneRaw}`}
        className="shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary-dark)] text-white font-semibold text-[0.95rem] py-3 px-6 rounded-xl shadow-[0_4px_16px_rgba(79,195,247,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-150 w-full sm:w-auto"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        Call Now
      </a>
    </div>
  );
}
