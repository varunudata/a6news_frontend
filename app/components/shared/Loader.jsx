export default function Loader({ label = "Loading...", size = "md" }) {
  const dimensions =
    size === "sm"
      ? "w-4 h-4 border-2"
      : size === "lg"
      ? "w-9 h-9 border-[3px]"
      : "w-6 h-6 border-2";

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 gap-3">
      <div
        className={`${dimensions} border-[#E50000] border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {label && (
        <span className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col animate-pulse"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="h-5 w-28 bg-red-100 rounded" />
            <div className="h-3.5 w-16 bg-gray-100 rounded" />
          </div>
          <div className="aspect-[16/9] w-full bg-gray-100" />
          <div className="p-5 space-y-3 flex-1 flex flex-col">
            <div className="h-5 bg-gray-200 rounded w-11/12" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2 pt-1">
              <div className="h-3.5 bg-gray-100 rounded w-full" />
              <div className="h-3.5 bg-gray-100 rounded w-5/6" />
            </div>
            <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
              <div className="h-3.5 w-24 bg-red-100 rounded" />
              <div className="h-3.5 w-4 bg-red-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
        <div className="h-8 sm:h-10 bg-gray-200 rounded w-full mb-3" />
        <div className="h-8 sm:h-10 bg-gray-200 rounded w-3/4 mb-6" />
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-32 bg-red-100 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
        <div className="aspect-[16/9] w-full bg-gray-100 rounded-xl border border-gray-200 mb-8" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
