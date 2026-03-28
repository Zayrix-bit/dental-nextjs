export default function SectionSkeleton({ height = '400px', className = '' }) {
  return (
    <div 
      className={`w-full animate-pulse bg-slate-100 rounded-2xl ${className}`}
      style={{ minHeight: height }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col items-center justify-center">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-1/2 mb-8"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-200 rounded-xl"></div>
          <div className="h-40 bg-slate-200 rounded-xl"></div>
          <div className="h-40 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
