export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={className}>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-text-dark)] mb-4 section-line">
        {title}
      </h2>
      {subtitle && (
        <p className="text-center max-w-xl mx-auto text-[var(--color-text-light)] text-lg mt-6 mb-14">
          {subtitle}
        </p>
      )}
    </div>
  );
}
