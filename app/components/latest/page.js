// export default function Latest() {
//   return (
//     <div className="latest">
//       <div className="image-container">
//         <img
//           src="https://clipground.com/images/png-images-for-banner-4.png"
//           alt="Sample Image"
//         ></img>
//         <div className="text-overlay">తాజా</div>
//       </div>
//       <div className="headlines"></div>
//     </div>
//   );
// }

export default function Latest() {
  return (
    <div className="flex items-center justify-between w-full mx-auto px-4 mt-6">
      <div className="relative">
        <div className="bg-red-600 text-white font-bold text-lg px-6 py-2 skew-x-[-20deg] w-32 flex justify-center shadow-md">
          <span className="inline-block skew-x-20">Latest</span>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 skew-x-[-20deg] -z-10 translate-x-1 translate-y-1 rounded-sm"></div>
      </div>

      <div className="relative flex-1 bg-red-100 h-10 ml-4 overflow-hidden rounded">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-red-700 font-medium text-base leading-10 px-4">
            🔴 Breaking: New Tech Regulations Announced • AI is reshaping
            content creation • Stock markets open higher today • More updates
            coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
