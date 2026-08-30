"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Brand wave path ──────────────────────────────────────────────────────────
const WAVE_PATH =
  "M119.85,14.47c-7.46,0-14.54-3.29-19.98-9.27-5.43,5.98-12.5,9.27-19.95,9.27s-14.55-3.29-19.98-9.27c-5.44,5.98-12.52,9.27-19.98,9.27s-14.55-3.29-19.98-9.27C14.55,11.18,7.47,14.47,0,14.47v-5c6.16,0,12.03-2.81,16.54-7.92.88-.99,2.13-1.55,3.44-1.55h0c1.31,0,2.57.57,3.44,1.55,4.51,5.11,10.38,7.92,16.54,7.92s12.02-2.81,16.54-7.92c.87-.98,2.12-1.55,3.44-1.55h0c1.31,0,2.57.56,3.44,1.55,4.51,5.11,10.39,7.92,16.54,7.92s12-2.81,16.51-7.92c.87-.99,2.13-1.55,3.44-1.55s2.57.57,3.44,1.55c4.51,5.11,10.39,7.92,16.54,7.92v5Z";
const HALF_WL = 119.85 / 2;

function WaveRow({ invertPhase = false, offsetX = 0 }) {
  const [frame, setFrame] = useState(invertPhase ? 1 : 0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 340);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="overflow-hidden"
      style={{ width: 96, height: 18, marginLeft: offsetX }}
    >
      <svg
        viewBox={`0 0 ${119.85 * 2} 14.47`}
        style={{
          width: "200%",
          height: "100%",
          display: "block",
          transform: `translateX(${frame === 0 ? 0 : -HALF_WL}px)`,
          transition: "none",
        }}
        shapeRendering="geometricPrecision"
      >
        <path d={WAVE_PATH} fill="#244491" />
        <path d={WAVE_PATH} transform="translate(119.85, 0)" fill="#244491" />
      </svg>
    </div>
  );
}

function WaveDeco() {
  return (
    <div className="flex flex-col gap-1.5">
      <WaveRow invertPhase={false} offsetX={-10} />
      <WaveRow invertPhase={true} offsetX={10} />
    </div>
  );
}

// ─── Photos ───────────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: "/references/LAKESIDE-22.webp", label: "Lakeside projekt", rot: -8 },
  { src: "/references/GRES-1.webp", label: "Gres projekt", rot: 0 },
  {
    src: "/references/LOMBARD-PAVILION-30.webp",
    label: "Lombard Pavilion projekt",
    rot: 8,
  },
];

// ─── Desktop layout constants (Uniformly scaled up to fill container) ─────────
const SIDE_W = 420;
const SIDE_H = 315;
const CTR_W = 550;
const CTR_H = 412;
const SPACING = 320; // px between card centres

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  // Desktop: hovered card index | Mobile: active (tapped) card index
  const [hovered, setHovered] = useState(null);
  const [mobileActive, setMobileActive] = useState(1); // default: center card
  const sectionRef = useRef(null);

  // Scroll entrance
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

  // Card dimensions per index
  const cw = (i) => (i === 1 ? CTR_W : SIDE_W);
  const ch = (i) => (i === 1 ? CTR_H : SIDE_H);

  const stackH = CTR_H + 100;

  // ── Mobile: horizontal carousel ─────────────────────────────────────────────
  // Each card is centered at 50% and offset by translateX.
  // diff = i - mobileActive:
  //   0  → center (active, fills container)
  //  -1  → left peek: partially off-screen left
  //  +1  → right peek: partially off-screen right
  // others → hidden further off-screen
  const mobileCardW =
    typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 340) : 320;
  const mobileCardH = Math.round(mobileCardW * 0.72);
  const PEEK_OFFSET = "87%"; // how much of card is off-screen when peeking

  const getMobileTransform = (i) => {
    const diff = i - mobileActive;
    if (diff === 0) return `translateX(-50%) rotate(0deg) scale(1)`;
    if (diff === -1)
      return `translateX(calc(-50% - ${PEEK_OFFSET})) rotate(-5deg)`;
    if (diff === 1)
      return `translateX(calc(-50% + ${PEEK_OFFSET})) rotate(5deg)`;
    // further cards: hidden off-screen
    return diff < 0
      ? `translateX(calc(-50% - 200%)) rotate(-10deg)`
      : `translateX(calc(-50% + 200%)) rotate(10deg)`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white lg:pb-32 pb-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-14">
        {/* ══ DESKTOP: Fan — uniformly scaled cards spanning full container ══════ */}
        <div
          className="relative hidden md:flex items-center justify-center w-full"
          style={{ height: stackH }}
        >
          {/* Left wave deco — hanging outside the container */}
          <div
            className="absolute hidden xl:block"
            style={{
              left: `calc(50% - ${SPACING + SIDE_W / 2 + 75}px)`,
              top: "72%",
              transform: "translateY(-50%)",
            }}
          >
            <WaveDeco />
          </div>
          {/* Right wave deco — hanging outside the container */}
          <div
            className="absolute hidden xl:block"
            style={{
              left: `calc(50% + ${SPACING + SIDE_W / 2 + 30}px)`,
              top: "28%",
              transform: "translateY(-50%)",
            }}
          >
            <WaveDeco />
          </div>

          {PHOTOS.map((photo, i) => {
            const isHov = hovered === i;
            const isOther = hovered !== null && !isHov;
            const w = cw(i);
            const h = ch(i);
            // Fixed `left` — never changes (prevents mouse-escape loop).
            // Scale up in place on hover (no translateX to centre).
            const baseScale = i === 1 ? 1.04 : 1.0;
            const hovScale = i === 1 ? 1.25 : 1.22;
            const baseLeft = `calc(50% - ${w / 2}px + ${(i - 1) * SPACING}px)`;

            return (
              <div
                key={photo.src}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: baseLeft,
                  // translateX stays 0 always — only scale + rotate change
                  transform: visible
                    ? `translateY(-50%) rotate(${isHov ? 0 : photo.rot}deg) scale(${isHov ? hovScale : baseScale})`
                    : `translateY(-50%) translateY(36px) rotate(${photo.rot}deg) scale(${baseScale})`,
                  opacity: visible ? (isOther ? 0.45 : 1) : 0,
                  zIndex: isHov ? 100 : i === 1 ? 20 : i === 0 ? 10 : 15,
                  transition: [
                    "transform 0.38s cubic-bezier(0.34,1.56,0.64,1)", // spring
                    "opacity 0.3s ease",
                    !visible && `opacity 0.65s ease ${i * 0.12}s`,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  cursor: "pointer",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="rounded-[24px] shadow-2xl"
                  style={{
                    padding: 8,
                    background: "#244491",
                    width: w,
                    height: h,
                  }}
                >
                  <div className="rounded-[18px] overflow-hidden w-full h-full">
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      width={w}
                      height={h}
                      quality={100}
                      unoptimized
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ MOBILE: Horizontal carousel — tap to slide to centre ════════ */}
        <div
          className="relative md:hidden w-full"
          style={{ height: mobileCardH + 20, overflow: "visible" }}
        >
          {PHOTOS.map((photo, i) => {
            const diff = i - mobileActive;
            const isActive = diff === 0;
            const opacity = visible
              ? Math.abs(diff) > 1
                ? 0
                : diff === 0
                  ? 1
                  : 0.7
              : 0;

            return (
              <div
                key={photo.src}
                onClick={() => setMobileActive(i)}
                style={{
                  position: "absolute",
                  top: 10,
                  left: "50%",
                  transform: visible
                    ? getMobileTransform(i)
                    : `translateX(-50%) translateY(20px) rotate(0deg) scale(0.95)`,
                  opacity,
                  zIndex: isActive ? 20 : Math.abs(diff) === 1 ? 10 : 1,
                  transition: [
                    "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                    "opacity 0.35s ease",
                    !visible && `opacity 0.6s ease ${i * 0.1}s`,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  cursor: isActive ? "default" : "pointer",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="rounded-2xl shadow-xl"
                  style={{
                    padding: 5,
                    background: "#244491",
                    width: mobileCardW,
                    height: mobileCardH,
                  }}
                >
                  <div className="rounded-xl overflow-hidden w-full h-full">
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      width={mobileCardW}
                      height={mobileCardH}
                      quality={100}
                      unoptimized
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Carousel dots */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2"
            style={{ bottom: -20 }}
          >
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: mobileActive === i ? 20 : 8,
                  height: 8,
                  background: mobileActive === i ? "#244491" : "#244491",
                  opacity: mobileActive === i ? 1 : 0.3,
                }}
                aria-label={`${i + 1}. kép`}
              />
            ))}
          </div>
        </div>

        {/* ══ Text block ═══════════════════════════════════════════════════ */}
        <div
          className="text-center max-w-2xl mt-6"
          style={{
            transition: "opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-[#244491] text-4xl md:text-5xl font-semibold mb-6"
          >
            A Poolzip-ről
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed"
          >
            A Poolzip a tökéletes aranyközépút: nem rontja el a kertet, mint egy
            robusztus polikarbonát fedés, és nem tekeri a koszos faleveleket a
            vízbe, mint a rolós megoldások. Ez egy letisztult, feszes
            ponyvarendszer, amit egyetlen mozdulattal, pillanatok alatt
            bezárhat. Nemcsak kristálytisztan és melegen tartja a vizet, de
            olyan erős is, hogy simán elbírja a rászaladó gyerekeket vagy a
            háziállatokat. Prémium megjelenés és 100%-os családi nyugalom – a
            luxuskategóriánál jóval barátibb áron.
          </p>
        </div>
      </div>
    </section>
  );
}
