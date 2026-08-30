"use client";

import { useState, useRef, useEffect } from "react";
import { FiPlay, FiCheckCircle } from "react-icons/fi";

const VIDEO_PILLARS = [
  {
    number: "01",
    tag: "TELEPÍTÉS",
    title: "Gyors & Tiszta Beépítés",
    description:
      "Új vagy meglévő medencékhez is könnyen illeszthető. Minimális parti átalakítással, felesleges kerti rombolás nélkül telepíthető.",
  },
  {
    number: "02",
    tag: "SÍNRENDSZER",
    title: "Síkba Süllyesztett Profil",
    description:
      "A diszkrét alumínium sín a burkolat síkjába simul: mezítláb is teljesen járható, nincsenek botlásveszélyes kiálló elemek.",
  },
  {
    number: "03",
    tag: "NYITÁS & ZÁRÁS",
    title: "Egygombos Motoros Vezérlés",
    description:
      "Távirányítóval vagy fali kapcsolóval mindössze 30-40 másodperc alatt teljesen kitárja vagy feszesen zárja a medencét.",
  },
  {
    number: "04",
    tag: "BIZTONSÁG",
    title: "Hermetikus Zip Zárás",
    description:
      "A zip résmentesen zárja a víztükröt: a por és falevél a felületen reked, a zárt membrán pedig 150 kg/m²-ig lépésálló.",
  },
];

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);
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

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="videobemutato"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F8FCFE] relative overflow-hidden"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6FE] text-[#244491] font-semibold text-xs uppercase tracking-widest mb-3.5"
          >
            Telepítés & működés élesben
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#244491] font-semibold leading-[1.15] mb-4"
          >
            Gondtalan telepítés, <br className="hidden sm:inline" />
            <span className="text-slate-800">másodpercek alatti nyitás és zárás</span>
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Nézze meg videónkon, hogyan épül be a Poolzip rendszer precízen a medence partjába, és milyen könnyed a mindennapi használata egyetlen gombnyomással.
          </p>
        </div>

        {/* ══ VIDEO PLAYER CONTAINER ════════════════════════════════════════════ */}
        <div
          className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden shadow-2xl bg-slate-950 aspect-[16/9] w-full max-w-[1140px] mx-auto group border-none"
          style={{
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          {/* HTML5 Native Video Tag */}
          <video
            ref={videoRef}
            src="/videos/poolzip-fixing.mp4"
            playsInline
            controls={isPlaying}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Interactive Poster & Play Overlay (Visible when paused / not started) */}
          {!isPlaying && (
            <div
              onClick={handlePlayClick}
              className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 cursor-pointer bg-slate-950/30 hover:bg-slate-950/20 transition-colors"
            >
              {/* Top Bar: Floating Badges */}
              <div className="flex items-center justify-between">
                <div
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className="bg-white/90 backdrop-blur-md text-[#244491] text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F28C48] animate-pulse" />
                  <span>BEÉPÍTÉSI & MŰKÖDÉSI BEMUTATÓ</span>
                </div>

                <div
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className="hidden sm:flex items-center gap-2 text-white/90 text-xs font-medium bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full"
                >
                  <FiCheckCircle className="text-emerald-400 w-3.5 h-3.5" />
                  <span>Valós referencia</span>
                </div>
              </div>

              {/* Center: Glowing Orange Play Button */}
              <div className="flex flex-col items-center justify-center gap-3 my-auto">
                <button
                  type="button"
                  aria-label="Videó elindítása"
                  className="w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full bg-[#F28C48] hover:bg-[#e07936] text-white flex items-center justify-center shadow-[0_15px_40px_rgba(242,140,72,0.6)] group-hover:scale-110 active:scale-95 transition-all duration-300 relative focus:outline-none"
                >
                  <span className="absolute -inset-3 rounded-full bg-[#F28C48]/35 animate-ping pointer-events-none" />
                  <FiPlay className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
                </button>
                <span
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md bg-black/40 backdrop-blur-md px-4 py-1 rounded-full mt-2"
                >
                  Kattintson a videó indításához
                </span>
              </div>

              {/* Bottom Bar: Title details */}
              <div className="flex items-end justify-between">
                <div>
                  <h3
                    style={{ fontFamily: "'Active', cursive, sans-serif" }}
                    className="text-white text-xl sm:text-2xl md:text-3xl font-normal drop-shadow-md leading-tight"
                  >
                    Poolzip telepítés és működés
                  </h3>
                  <p
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="text-white/80 text-xs sm:text-sm font-light drop-shadow-sm mt-0.5"
                  >
                    Lépésről lépésre a partkő beépítéstől a motoros zárásig
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══ 4 KEY HIGHLIGHT CARDS (Telepítés és Nyitás-Zárás témára kihegyezve) ════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8 md:mt-10">
          {VIDEO_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.number}
              className="bg-[#CFE8FC] rounded-[24px] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#F28C48] group cursor-pointer border-none shadow-sm hover:shadow-xl"
              style={{
                transition: "opacity 0.6s ease, transform 0.3s ease, background-color 0.25s ease, box-shadow 0.3s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? undefined : "translateY(24px)",
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              <div>
                {/* Number & Tag Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="w-7 h-7 rounded-full bg-white/90 text-[#244491] group-hover:bg-white group-hover:text-[#F28C48] text-xs font-bold flex items-center justify-center shadow-xs transition-colors"
                  >
                    {pillar.number}
                  </span>
                  <span
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/90 text-[#244491] group-hover:bg-white group-hover:text-[#F28C48] transition-colors"
                  >
                    {pillar.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{ fontFamily: "'Active', cursive, sans-serif" }}
                  className="text-lg sm:text-xl text-[#244491] group-hover:text-white font-normal leading-tight mb-2 transition-colors"
                >
                  {pillar.title}
                </h3>
              </div>

              {/* Description */}
              <p
                style={{ fontFamily: "Gotham, sans-serif" }}
                className="text-xs text-[#1E2E5C]/85 group-hover:text-white/95 font-light leading-relaxed transition-colors mt-2"
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
