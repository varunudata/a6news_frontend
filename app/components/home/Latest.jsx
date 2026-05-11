export default function Latest() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 select-none">
      <div className="flex items-center w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
        
        {/* Latest Badge */}
        <div className="relative flex items-center bg-red-600 px-5 sm:px-6 py-3 z-10 shrink-0">
          <div className="relative flex items-center justify-center mr-3">
            <div className="w-2 h-2 bg-white rounded-full animate-ping absolute opacity-75"></div>
            <div className="w-2 h-2 bg-white rounded-full relative"></div>
          </div>
          <span className="text-white font-bold tracking-wider uppercase text-xs sm:text-sm">Latest</span>
          {/* Slanted edge effect */}
          <div className="absolute -right-3 top-0 bottom-0 w-6 bg-red-600 -skew-x-12 translate-x-1/2 z-[-1] border-r-2 border-white/20"></div>
        </div>

        {/* Ticker Content */}
        <div className="relative flex-1 bg-red-50/40 h-full overflow-hidden flex items-center ml-2 sm:ml-4">
          <div className="animate-marquee whitespace-nowrap text-gray-700 font-medium text-xs sm:text-sm flex items-center py-3 px-4">
            <span className="text-red-600 font-semibold mr-2">Update:</span> New Tech Regulations Announced <span className="mx-4 text-red-300">•</span>
            <span className="text-red-600 font-semibold mr-2">Breaking:</span> AI is reshaping content creation <span className="mx-4 text-red-300">•</span>
            <span className="text-red-600 font-semibold mr-2">Markets:</span> Stock markets open higher today <span className="mx-4 text-red-300">•</span>
            More updates coming soon...
          </div>
        </div>
        
      </div>
    </div>
  );
}
