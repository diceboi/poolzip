"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiStar } from "react-icons/fi";

const COMPARISON_CARDS = [
  {
    title: "Polikarbonát búra",
    badge: "Hagyományos",
    image: "/policarbonate.jpg",
    alt: "Polikarbonát búra fedés",
    bgColor: "bg-[#CFE8FC]",
    titleColor: "text-[#244491]",
    textColor: "text-[#1E2E5C]/90",
    badgeBg: "bg-white/90 text-slate-600",
    dividerColor: "divide-[#244491]/20",
    dotColor: "bg-[#244491]",
    zIndex: "z-10",
    desktopScale: "lg:scale-[0.95]",
    points: [
      "Elcsúfítja a kert panorámáját: magas, zárt üvegház hatás a medence felett.",
      "Idővel bemattul és párásodik: a cellákban megül a por, az alga és a penész.",
      "Balesetveszélyes, magas sínek: megbotlásveszély a medence partján.",
      "Nehéz mozgatás: a görgők és sínek megszorulhatnak.",
    ],
  },
  {
    title: "Műanyag rolós fedés",
    badge: "Alternatíva",
    image: "/plastic.jpg",
    alt: "Műanyag rolós medencefedés",
    bgColor: "bg-[#CFE8FC]",
    titleColor: "text-[#244491]",
    textColor: "text-[#1E2E5C]/90",
    badgeBg: "bg-white/90 text-slate-600",
    dividerColor: "divide-[#244491]/20",
    dotColor: "bg-[#244491]",
    zIndex: "z-20",
    desktopScale: "lg:scale-[1.0]",
    points: [
      "A kosz a vízbe tekeredik: felcsévéléskor a lamellákon lévő falevél a medencébe pottyan.",
      "Nem hermetikus: a víz széleinél rések maradnak, így por és rovarok jutnak be.",
      "Korlátozott teherbírás: nem lépésálló, beszakadhat terhelés alatt.",
      "Gyors vízkövesedés: a lamellák illesztéseinél nehezen takarítható lerakódások keletkeznek.",
    ],
  },
  {
    title: "Poolzip fedés",
    badge: "Innováció",
    image: "/references/LOMBARD-PAVILION-20.webp",
    alt: "Poolzip prémium feszes medencefedés",
    bgColor: "bg-[#244491]",
    titleColor: "text-[#F28C48]",
    textColor: "text-white/95",
    badgeBg: "bg-[#244491]/90 text-white border border-white/20",
    dividerColor: "divide-white/20",
    dotColor: "bg-[#F28C48]",
    isWinner: true,
    zIndex: "z-30",
    desktopScale: "lg:scale-[1.06]",
    points: [
      "150 kg/m² teherbírás: valóban lépésálló, 100% biztonság gyermekeknek és kutyáknak.",
      "Hermetikus zip lezárás: 0% falevél, 0% por, 0% rovar a vízben.",
      "Diszkrét, lapos sínrendszer: nem töri meg a terasz és a kert harmóniáját.",
      "-80% energiamegtakarítás: megőrzi a víz hőmérsékletét és csökkenti a vegyszerhasználatot.",
    ],
  },
];

export default function Comparison() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="osszehasonlitas"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className="text-center mb-16 md:mb-24"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#244491] font-semibold tracking-tight"
          >
            Összehasonlítás
          </h2>
        </div>

        {/* 3 Cards: Clean vertical stack on mobile without overlap, cascading overlap on desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 lg:-space-x-8 max-w-6xl mx-auto">
          {COMPARISON_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className={`w-full max-w-[370px] lg:max-w-none lg:w-[380px] flex flex-col rounded-[32px] ${card.bgColor} ${card.zIndex} ${card.desktopScale} relative transition-all duration-300 hover:-translate-y-2.5 cursor-pointer ${
                card.isWinner
                  ? "shadow-[0_20px_50px_-10px_rgba(242,140,72,0.45)] hover:shadow-[0_25px_65px_-8px_rgba(242,140,72,0.65)] ring-1 ring-[#F28C48]/40"
                  : "shadow-none lg:shadow-xl hover:shadow-2xl"
              }`}
              style={{
                transition: `opacity 0.6s ease ${idx * 0.14}s, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease`,
                opacity: visible ? 1 : 0,
                transform: visible ? undefined : "translateY(36px)",
              }}
            >
              {/* Winner Top Crown Badge for Poolzip */}
              {card.isWinner && (
                <div
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F28C48] text-white font-bold text-[11px] px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap z-50"
                >
                  <FiStar className="fill-white w-3 h-3" />
                  <span>A Prémium Megoldás</span>
                </div>
              )}

              {/* Photo Preview - Full width at top, rounded to match card corners */}
              <div className="rounded-t-[32px] overflow-hidden relative aspect-[16/10] w-full shadow-xs bg-black/10 flex-shrink-0">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {/* Subtle category badge on photo */}
                <div
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className={`absolute top-3.5 left-3.5 ${card.badgeBg} backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm`}
                >
                  {card.badge}
                </div>
              </div>

              {/* Card Content with proper padding */}
              <div className="p-6 sm:p-7 pt-5 sm:pt-6 flex flex-col flex-1">
                {/* Card Title in Active font */}
                <h3
                  style={{ fontFamily: "'Active', cursive, sans-serif" }}
                  className={`text-2xl sm:text-[26px] ${card.titleColor} text-center mb-5 font-normal tracking-wide`}
                >
                  {card.title}
                </h3>

                {/* Text Points with solid dividing lines and leading dots */}
                <div
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className={`divide-y divide-solid ${card.dividerColor} flex-1 ${card.textColor} text-xs sm:text-[13px] leading-relaxed font-light`}
                >
                  {card.points.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className={`flex items-start gap-2.5 ${
                        pIdx === 0
                          ? "pb-3.5"
                          : pIdx === card.points.length - 1
                            ? "pt-3.5"
                            : "py-3.5"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${card.dotColor} flex-shrink-0 mt-1.5`}
                      />
                      <p className="flex-1">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
