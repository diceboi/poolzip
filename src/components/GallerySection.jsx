"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";

// 3 columns of curated reference photos with varied aspect ratios and heights
const COL_1 = [
  { src: "/references/LAKESIDE-22.webp", aspect: "aspect-[4/3]" },
  { src: "/references/GRES-1.webp", aspect: "aspect-[16/10]" },
  { src: "/references/LOMBARD-PAVILION-20.webp", aspect: "aspect-square" },
  { src: "/references/VERDE-1.webp", aspect: "aspect-[4/3]" },
  { src: "/references/NIGHT-1.webp", aspect: "aspect-[16/10]" },
  { src: "/references/LAKESIDE-12.webp", aspect: "aspect-[3/2]" },
];

const COL_2 = [
  { src: "/references/LOMBARD-PAVILION-30.webp", aspect: "aspect-[16/10]" },
  { src: "/references/GRES-DRONE-1.webp", aspect: "aspect-[4/3]" },
  { src: "/references/LAKESIDE-15.webp", aspect: "aspect-square" },
  { src: "/references/VERDE-5.webp", aspect: "aspect-[16/10]" },
  { src: "/references/NIGHT-3.webp", aspect: "aspect-[4/3]" },
  { src: "/references/LOMBARD-PAVILION-14.webp", aspect: "aspect-[3/2]" },
];

const COL_3 = [
  { src: "/references/LAKESIDE-2.webp", aspect: "aspect-square" },
  { src: "/references/GRES-3.webp", aspect: "aspect-[4/3]" },
  { src: "/references/LOMBARD-PAVILION-7.webp", aspect: "aspect-[16/10]" },
  { src: "/references/LAKESIDE-DRONE-1.webp", aspect: "aspect-[16/10]" },
  { src: "/references/VERDE-7.webp", aspect: "aspect-[4/3]" },
  { src: "/references/LAKESIDE-28.webp", aspect: "aspect-square" },
];

// Flat array of all photos for Lightbox and Mobile Swiper
const ALL_PHOTOS = [...COL_1, ...COL_2, ...COL_3];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex(
          (prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length,
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
      }
    },
    [lightboxIndex],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const openLightboxBySrc = (src) => {
    const idx = ALL_PHOTOS.findIndex((p) => p.src === src);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section
      id="referenciak"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div id="galeria" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6FE] text-[#2C4295] font-semibold text-xs uppercase tracking-widest mb-3.5 border-none"
          >
            Referenciák • Valós Kertek
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C4295] font-semibold leading-[1.15] mb-4"
          >
            Referenciák
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Fedezze fel a legújabb medencefedési projektjeinket, és merítsen
            inspirációt a harmonikusan illeszkedő kerti megoldásokból.
          </p>
        </div>

        {/* ══ DESKTOP: 3-Column Staggered Masonry Gallery ══════════════════ */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1 (No offset) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {COL_1.map((photo) => (
              <div
                key={photo.src}
                onClick={() => openLightboxBySrc(photo.src)}
                className={`relative w-full ${photo.aspect} rounded-[22px] md:rounded-[26px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(242,140,72,0.45)] bg-slate-100 border-none shadow-none group`}
              >
                <Image
                  src={photo.src}
                  alt="Poolzip referencia fotó"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Column 2 (Offset by pt-14 for organic staggering) */}
          <div className="flex flex-col gap-6 lg:gap-8 pt-10 lg:pt-14">
            {COL_2.map((photo) => (
              <div
                key={photo.src}
                onClick={() => openLightboxBySrc(photo.src)}
                className={`relative w-full ${photo.aspect} rounded-[22px] md:rounded-[26px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(242,140,72,0.45)] bg-slate-100 border-none shadow-none group`}
              >
                <Image
                  src={photo.src}
                  alt="Poolzip referencia fotó"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Column 3 (Offset by pt-7 for varied staggered rhythm) */}
          <div className="flex flex-col gap-6 lg:gap-8 pt-5 lg:pt-7">
            {COL_3.map((photo) => (
              <div
                key={photo.src}
                onClick={() => openLightboxBySrc(photo.src)}
                className={`relative w-full ${photo.aspect} rounded-[22px] md:rounded-[26px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(242,140,72,0.45)] bg-slate-100 border-none shadow-none group`}
              >
                <Image
                  src={photo.src}
                  alt="Poolzip referencia fotó"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══ MOBILE: Horizontal Swiper (No long scrolling on small screens) ════ */}
        <div className="md:hidden w-full overflow-hidden">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={14}
            centeredSlides={true}
            initialSlide={1}
            className="w-full py-2"
          >
            {ALL_PHOTOS.map((photo, i) => (
              <SwiperSlide key={photo.src} className="w-full">
                <div
                  onClick={() => setLightboxIndex(i)}
                  className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden cursor-pointer bg-slate-100 shadow-md border-none"
                >
                  <Image
                    src={photo.src}
                    alt="Poolzip referencia fotó"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-center text-xs text-slate-400 mt-2 font-light"
          >
            Húzza oldalra a további képekhez • Érintse meg a nagyításhoz
          </p>
        </div>
      </div>

      {/* ══ FULLSCREEN LIGHTBOX MODAL ══════════════════════════════════════ */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] backdrop-blur-md bg-black/5 flex items-center justify-center p-4 sm:p-8 select-none"
        >
          {/* Close button - Brand Navy Blue */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg text-[#2C4295] hover:text-[#F28C48] flex items-center justify-center transition-all duration-200 focus:outline-none border border-slate-100 cursor-pointer"
            aria-label="Bezárás"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Prev Arrow - Brand Navy Blue */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length,
              );
            }}
            className="absolute left-4 sm:left-6 z-50 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg text-[#2C4295] hover:text-[#F28C48] flex items-center justify-center transition-all duration-200 focus:outline-none border border-slate-100 cursor-pointer"
            aria-label="Előző kép"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow - Brand Navy Blue */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
            }}
            className="absolute right-4 sm:right-6 z-50 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg text-[#2C4295] hover:text-[#F28C48] flex items-center justify-center transition-all duration-200 focus:outline-none border border-slate-100 cursor-pointer"
            aria-label="Következő kép"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Main Displayed Image - Shadow adheres strictly to the exact photo boundary */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-h-[85vh] max-w-[90vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ALL_PHOTOS[lightboxIndex].src}
              alt="Poolzip referencia nagyított nézet"
              className="max-h-[82vh] max-w-[90vw] w-auto h-auto object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] select-none"
            />
          </div>

          {/* Counter at bottom - Brand Navy Blue */}
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#2C4295] text-xs font-bold px-4 py-1.5 rounded-full shadow-md border border-slate-100"
          >
            {lightboxIndex + 1} / {ALL_PHOTOS.length}
          </div>
        </div>
      )}
    </section>
  );
}
