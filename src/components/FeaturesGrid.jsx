"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";

// 6 Technological pillars with their exact pin coordinates
const FEATURES = [
  {
    id: "zip",
    number: "01",
    title: "Hermetikus Zip Zárás",
    tag: "Kristálytiszta Víz",
    thumb: "hermetikus.webp",
    description:
      "A kétoldali zip sínrendszer résmentesen zár: a por, falevél és rovarok a felületen maradnak, nyitáskor sem jutnak a vízbe.",
    pin: { x: 34, y: 60 },
  },
  {
    id: "strength",
    number: "02",
    title: "150 kg/m² Valódi Lépésállóság",
    tag: "100% Családbiztonság",
    thumb: "lepesallosag.webp",
    description:
      "Szabadalmaztatott zip technológia: felnőttek, gyermekek és háziállatok is teljes biztonsággal ráléphetnek.",
    pin: { x: 19, y: 70 },
  },
  {
    id: "membrane",
    number: "03",
    title: "UV- és Klórálló Membrán",
    tag: "Hosszú Élettartam",
    thumb: "membran.webp",
    description:
      "Prémium PVC-kompozit textília, amely ellenáll a tűző napnak, a medencevegyszereknek és a kemény téli fagyoknak.",
    pin: { x: 38, y: 75 },
  },
  {
    id: "heat",
    number: "04",
    title: "-80% Hőveszteség & Párolgás",
    tag: "Energiatakarékos",
    thumb: "hoveszteseg.webp",
    description:
      "Drasztikusan csökkenti az éjszakai lehűlést és a víz párolgását, hetekkel meghosszabbítva a fürdési szezont.",
    pin: { x: 48, y: 58 },
  },
  {
    id: "motor",
    number: "05",
    title: "Motoros Automata Nyitás",
    tag: "Kényelem",
    thumb: "motoros.webp",
    description:
      "Csendes motoros rendszer, amely egyetlen gombnyomással vagy távirányítóval másodpercek alatt nyitja és zárja a medencét.",
    pin: { x: 61, y: 73 },
  },
  {
    id: "track",
    number: "06",
    title: "Síkba Süllyesztett Sínprofil",
    tag: "Minimál Dizájn",
    thumb: "sinprofil.webp",
    description:
      "Diszkrét, mezítláb is kényelmesen járható alumínium profil a medence partján, megbotlásveszély nélkül.",
    pin: { x: 88, y: 63 },
  },
];

export default function FeaturesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const swiperRef = useRef(null);

  // Smooth anchor scroll to align the top of the photo directly under the sticky header
  const scrollToPhoto = (idx) => {
    setActiveIdx(idx);
    swiperRef.current?.slideTo(idx);
    if (photoRef.current) {
      const headerOffset = 80;
      const elementPosition = photoRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="elonyok"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden bg-[#F3FCFF]"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Section Header (Compact vertical rhythm so photo & slider fit on screen) */}
        <div
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6FE] text-[#2C4295] font-semibold text-xs uppercase tracking-widest mb-3.5 border-none"
          >
            Mérnöki precizitás & csúcstechnológia
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C4295] font-semibold leading-[1.15] mb-4"
          >
            Innovatív részletek, <br className="hidden sm:inline" />
            <span className="text-slate-800">amelyek egyedülállóvá teszik</span>
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            A Poolzip minden eleme a maximális biztonságot, a letisztult kerti
            esztétikát és a gondtalan használatot szolgálja.
          </p>
        </div>

        {/* ══ CENTRAL POOL PHOTO (Anchored at bottom so all pins are 100% visible and top trees are cropped) ════ */}
        <div
          ref={photoRef}
          className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden shadow-xl bg-slate-100 scroll-mt-24 aspect-[1/1] sm:aspect-[1.82/1] lg:aspect-[2/1] mb-6 md:mb-8"
        >
          {/* Inner 1:1 canvas anchored strictly to bottom: 0 so all pins (55% to 86%) are completely visible */}
          <div className="absolute inset-x-0 bottom-0 lg:-bottom-24 w-full aspect-square">
            <Image
              src="/features.webp"
              alt="Poolzip medencefedés műszaki részletei"
              fill
              priority
              unoptimized
              className="object-cover"
            />

            {/* Number Pins on the Photo */}
            {FEATURES.map((feat, idx) => {
              const isHighlighted =
                hoveredIdx === idx ||
                (hoveredIdx === null && activeIdx === idx);

              return (
                <button
                  key={feat.id}
                  onClick={() => scrollToPhoto(idx)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    left: `${feat.pin.x}%`,
                    top: `${feat.pin.y}%`,
                  }}
                  aria-label={feat.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer focus:outline-none"
                >
                  <span className="relative flex items-center justify-center">
                    {/* Active pulse ring */}
                    {isHighlighted && (
                      <span className="animate-ping absolute inline-flex h-7 w-7 md:h-9 md:w-9 rounded-full bg-[#F28C48] opacity-75" />
                    )}

                    {/* Number pin badge */}
                    <span
                      className={`relative inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg transition-all duration-200 ${
                        isHighlighted
                          ? "bg-[#F28C48] text-white scale-115 shadow-orange-500/50"
                          : "bg-[#2C4295] text-white hover:bg-[#F28C48]"
                      }`}
                    >
                      <span className="text-[10px] md:text-xs font-bold leading-none">
                        {idx + 1}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ UNIFIED SWIPER CAROUSEL (Contained inside photo width) ═════════════════════ */}
        <div className="relative w-full overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIdx(swiper.activeIndex);
            }}
            initialSlide={0}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
            className="w-full py-1 overflow-hidden"
          >
            {FEATURES.map((feat, idx) => {
              const isSelected = activeIdx === idx;
              const isHovered = hoveredIdx === idx;
              const isHighlight = isSelected || isHovered;

              return (
                <SwiperSlide key={feat.id} className="h-auto">
                  <div
                    onClick={() => scrollToPhoto(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="w-full h-[155px] sm:h-[162px] md:h-[168px] rounded-[22px] md:rounded-[24px] overflow-hidden transition-all duration-200 cursor-pointer flex items-stretch border-none"
                  >
                    {/* Left: Thumbnail with Solid Non-collapsing Circular Number Badge */}
                    <div className="relative w-[36%] md:w-[37%] h-full flex-shrink-0 bg-slate-200 border-none">
                      <Image
                        src={`/${feat.thumb}`}
                        alt={feat.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {/* Round circle badge with explicit dimensions to prevent squishing */}
                      <div
                        className={`absolute top-2.5 left-2.5 w-7 h-7 md:w-8 md:h-8 aspect-square rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-sm border-none transition-colors duration-200 flex-shrink-0 ${
                          isHighlight
                            ? "bg-[#F28C48] text-white"
                            : "bg-[#D4EDFC] text-[#2C4295]"
                        }`}
                        style={{ minWidth: "28px", minHeight: "28px" }}
                      >
                        <span className="leading-none">{idx + 1}</span>
                      </div>
                    </div>

                    {/* Right: Content Area (Light Blue -> Orange on Hover/Active) */}
                    <div
                      className={`flex-1 p-3.5 md:p-4 flex flex-col justify-between border-none transition-colors duration-200 ${
                        isHighlight ? "bg-[#F28C48]" : "bg-[#D4EDFC]"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div
                          style={{ fontFamily: "Gotham, sans-serif" }}
                          className={`text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full w-fit mb-1 border-none transition-colors duration-200 ${
                            isHighlight
                              ? "bg-white text-[#F28C48]"
                              : "bg-white text-[#2C4295] shadow-xs"
                          }`}
                        >
                          {feat.tag}
                        </div>

                        <h3
                          style={{
                            fontFamily: "'Active', cursive, sans-serif",
                          }}
                          className={`text-lg sm:text-xl md:text-[24px] font-normal leading-tight mb-1 transition-colors duration-200 ${
                            isHighlight ? "text-white" : "text-[#2C4295]"
                          }`}
                        >
                          {feat.title}
                        </h3>
                      </div>

                      <p
                        style={{ fontFamily: "Gotham, sans-serif" }}
                        className={`text-[10.5px] sm:text-[11.5px] font-light leading-relaxed transition-colors duration-200 ${
                          isHighlight ? "text-white/95" : "text-[#1E2E5C]/90"
                        }`}
                      >
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls: Arrows + Dots aligned with container width */}
          <div className="flex justify-between items-center mt-5">
            {/* Prev Arrow */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 rounded-full bg-[#EBF6FE] hover:bg-[#2C4295] text-[#2C4295] hover:text-white flex items-center justify-center transition-colors shadow-sm focus:outline-none"
              aria-label="Előző funkció"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPhoto(i)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? "w-7 h-2 bg-[#F28C48]"
                      : "w-2 h-2 bg-[#2C4295]/30 hover:bg-[#2C4295]/60"
                  }`}
                  aria-label={`${i + 1}. funkció`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 rounded-full bg-[#EBF6FE] hover:bg-[#2C4295] text-[#2C4295] hover:text-white flex items-center justify-center transition-colors shadow-sm focus:outline-none"
              aria-label="Következő funkció"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
