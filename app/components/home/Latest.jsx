export default function Latest() {
  return (
    <div className="flex items-center justify-between w-full mx-auto px-4 mt-6 select-none">
      <div className="relative">
        <div className="bg-red-600 text-white font-bold text-lg px-6 py-2 skew-x-[-20deg] flex justify-center shadow-md">
          <span className="inline-block skew-x-20">Latest</span>
        </div>
        <div className="absolute top-1 left-1 w-full h-full bg-black opacity-20 skew-x-[-20deg] -z-10 rounded-sm"></div>
      </div>
      <div className="relative flex-1 bg-red-100 h-10 ml-4 overflow-hidden rounded">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-marquee whitespace-nowrap text-red-700 font-medium text-sm md:text-base leading-10 px-4">
            Breaking: New Tech Regulations Announced • AI is reshaping content
            creation • Stock markets open higher today • More updates coming
            soon...
          </div>
        </div>
      </div>
    </div>
  );
}
