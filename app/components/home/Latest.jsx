export default function Latest() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 select-none">
      <div className="flex items-center w-full bg-[#FFEBEB] rounded-md overflow-hidden relative border border-red-100">
        
        {/* Latest Badge */}
        <div className="relative flex items-center bg-[#E50000] px-5 sm:px-6 py-2.5 z-10 shrink-0">
          <span className="text-white font-bold tracking-wider uppercase text-xs sm:text-sm">Latest</span>
          {/* Slanted edge effect */}
          <div className="absolute -right-3 top-0 bottom-0 w-6 bg-[#E50000] -skew-x-12 translate-x-1/2 z-10"></div>
        </div>

        {/* Ticker Content */}
        <div className="relative flex-1 h-full overflow-hidden flex items-center pl-6">
          <div className="animate-marquee whitespace-nowrap text-[#E50000] font-medium text-xs sm:text-sm py-2.5">
            Breaking: New Tech Regulations Announced • AI is reshaping content creation • Stock markets open higher today • More updates coming soon...
          </div>
        </div>
        
      </div>
    </div>
  );
}
