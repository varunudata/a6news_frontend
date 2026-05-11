"use client";
import { useEffect, useRef, useState } from "react";

const img0 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958811/slide0_kqjow7.jpg";
const img1 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958843/slide1_an557s.jpg";
const img2 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958860/slide2_l0mbwd.jpg";
const img3 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958872/slide3_lmgan7.jpg";
const img4 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958887/slide4_fwphj3.jpg";
const img5 =
  "https://res.cloudinary.com/dkdidynja/image/upload/v1760958900/slide5_xuzkzy.jpg";

export default function Hero() {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const images = [img0, img4, img5, img1, img2, img3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * index,
        behavior: "smooth",
      });
    }
  }, [index]);

  return (
    <div className="w-full bg-gray-50/50 pt-6 pb-2 sm:pt-8 sm:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-premium bg-gray-200">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((img, i) => (
              <div key={i} className="relative shrink-0 w-full h-full group">
                <img
                  src={img}
                  alt={`slide-${i}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                {/* Gradient overlay for better dot contrast & premium depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 transition-all duration-300 ${
                  index === i 
                    ? "w-8 bg-red-600 rounded-full shadow-[0_0_8px_rgba(229,0,0,0.6)]" 
                    : "w-2 bg-white/70 hover:bg-white rounded-full"
                }`}
                aria-label={`Slide ${i+1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
