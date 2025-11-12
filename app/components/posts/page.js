export default function Posts() {
  return (
    <div className="grid grid-cols-3 gap-6 w-[90%] mx-auto mt-12 items-center justify-center h-[1300px]">
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white overflow-hidden flex flex-col">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          NH Projects
        </div>

        <div className="w-full h-[160px]">
          <img
            src="https://www.financialexpress.com/wp-content/uploads/2024/08/highway-nhai-2.jpg"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-between px-4 py-3 flex-1">
          <div className="h-[110px] overflow-y-auto text-sm text-gray-700 text-justify leading-relaxed scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition">
            Read More →
          </button>
        </div>
      </div>

      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          AP Projects
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Express Ways
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Economic Corridors
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Airports
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Railway Projects
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Ports
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          City Infra
        </div>
      </div>
      <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white">
        <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
          Industry Infra
        </div>
      </div>
    </div>
  );
}

// "use client";

// export default function Posts() {
//   const categories = [
//     {
//       name: "NH Projects",
//       desc: "Major National Highway projects improving connectivity across India, enhancing trade routes, and reducing travel time.",
//       img: "https://images.unsplash.com/photo-1509744645300-7b8da3ae90ad?q=80&w=2070",
//     },
//     {
//       name: "AP Projects",
//       desc: "Andhra Pradesh’s infrastructure initiatives including smart cities, ports, and transport upgrades.",
//       img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
//     },
//     {
//       name: "Express Ways",
//       desc: "Fast-track expressways connecting major cities, enabling seamless mobility and logistics efficiency.",
//       img: "https://images.unsplash.com/photo-1610465299996-7b8c96e66e3f?q=80&w=2070",
//     },
//     {
//       name: "Economic Corridors",
//       desc: "Strategic corridors boosting industrial growth and regional economic development across India.",
//       img: "https://images.unsplash.com/photo-1607082349566-187342175e2e?q=80&w=2070",
//     },
//     {
//       name: "Airports",
//       desc: "Modernization and expansion of airports to improve connectivity and support regional development.",
//       img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2070",
//     },
//     {
//       name: "Railway Projects",
//       desc: "Revamping India’s railway network with high-speed trains, corridors, and modern infrastructure.",
//       img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2070",
//     },
//     {
//       name: "Ports",
//       desc: "Upgrading India’s maritime infrastructure to strengthen trade and port logistics.",
//       img: "https://images.unsplash.com/photo-1584090700489-1e3d5a3b26a1?q=80&w=2070",
//     },
//     {
//       name: "City Infra",
//       desc: "Urban development projects including metros, smart city roads, and civic infrastructure.",
//       img: "https://images.unsplash.com/photo-1523983303600-83fb557e59a6?q=80&w=2070",
//     },
//     {
//       name: "Industry Infra",
//       desc: "Industrial parks and facilities powering India’s manufacturing and Make in India mission.",
//       img: "https://images.unsplash.com/photo-1602526216030-8c6f302d6f86?q=80&w=2070",
//     },
//   ];

//   return (
//     <div className="w-[90%] mx-auto mt-16">
//       <h2 className="text-3xl font-extrabold text-red-700 border-l-8 border-red-600 pl-4 mb-10">
//         Infrastructure Categories
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer"
//           >
//             <img
//               src={cat.img}
//               alt={cat.name}
//               className="h-56 w-full object-cover"
//             />
//             <div className="absolute top-0 left-0 bg-black/50 w-full h-56 flex items-center justify-center">
//               <h3 className="text-white text-2xl font-bold uppercase tracking-wide">
//                 {cat.name}
//               </h3>
//             </div>

//             <div className="p-5">
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {cat.desc}
//               </p>
// <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition">
//   Read More →
// </button>;
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";

// export default function NHProjectCard() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* 🟥 Main Card */}
//       <div className="h-[400px] w-[400px] shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-[10px] bg-white overflow-hidden flex flex-col">
//         <div className="h-[50px] w-full bg-red-600 rounded-t-[10px] flex items-center justify-center text-white font-bold text-xl">
//           NH Projects
//         </div>

//         <div className="w-full h-[160px]">
//           <img
//             src="https://www.financialexpress.com/wp-content/uploads/2024/08/highway-nhai-2.jpg"
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="flex flex-col items-center justify-between px-4 py-3 flex-1">
//           <p className="text-sm text-gray-700 text-justify leading-relaxed line-clamp-4">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </p>

//           <button
//             onClick={() => setIsOpen(true)}
//             className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
//           >
//             Read More →
//           </button>
//         </div>
//       </div>

//       {/* 🪟 Fullscreen Popup Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col">
//           {/* Header */}
//           <div className="flex justify-between items-center px-6 py-4 bg-red-600 text-white">
//             <h2 className="text-xl font-bold">NH Projects</h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-2xl font-bold hover:text-gray-200 transition"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Image */}
//           <div className="w-full h-[300px]">
//             <img
//               src="https://www.financialexpress.com/wp-content/uploads/2024/08/highway-nhai-2.jpg"
//               className="h-full w-full object-cover"
//             />
//           </div>

//           {/* Article Content */}
//           <div className="flex-1 px-8 py-6 text-gray-800 text-justify leading-relaxed">
//             <h3 className="text-2xl font-bold mb-4 text-red-600">
//               Full Article
//             </h3>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam, quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur.
//             </p>
//           </div>

//           {/* Footer (optional back button) */}
//           <div className="flex justify-center items-center py-4 bg-gray-100">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
//             >
//               Close Article
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
