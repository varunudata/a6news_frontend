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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollTo({
  //       left: sliderRef.current.clientWidth * index,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [index]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden w-full"
        style={{ scrollBehavior: "smooth" }}
      >
        {images.map((img, i) => (
          <img
            src={img}
            alt={`slide-${i}`}
            key={i}
            className="w-full shrink-0 object-cover h-[40vh] md:h-[70vh]"
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-red-600 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
