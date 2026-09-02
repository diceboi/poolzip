"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated organic wave divider.
 *
 * Uses requestAnimationFrame + SVG path manipulation to draw waves
 * generated from the sum of multiple sine waves at different frequencies
 * and phases. This avoids any tiling artifacts — the shape is always
 * unique, organic, and natural.
 *
 * Two solid layers:
 *   Layer A (back)  — brand blue  #2C4295
 *   Layer B (front) — light-blue-to-white gradient, sits slightly higher
 */
function AnimatedWaves({ visible }) {
  const rafRef = useRef(null);
  const pathBlueRef = useRef(null);
  const pathWhiteRef = useRef(null);
  const widthRef = useRef(
    typeof window !== "undefined" ? window.innerWidth : 1000,
  );

  // Fixed logical coordinate space — SVG stretches to fill container via preserveAspectRatio=none
  const LOGICAL_W = 1000;
  const LOGICAL_H = 220;

  // Build the SVG path for a solid wave block:
  //   bottom-left → wave top edge (left→right) → bottom-right → close
  function buildPath(t, W, H, params, baseY) {
    const steps = 100; // smooth enough curve
    let d = `M 0,${H}`;
    const y0 = Math.max(5, baseY + calcY(0, t, W, params));
    d += ` L 0,${y0}`;
    for (let i = 1; i <= steps; i++) {
      const x = (i / steps) * W;
      // Clamp so wave never clips above the container top
      const y = Math.max(5, baseY + calcY(x, t, W, params));
      d += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
    }
    d += ` L ${W},${H} Z`;
    return d;
  }

  function calcY(x, t, W, params) {
    return params.reduce((acc, p) => {
      return (
        acc +
        p.amp *
          Math.sin(((p.freq * x) / W) * Math.PI * 2 + t * p.speed + p.phase)
      );
    }, 0);
  }

  useEffect(() => {
    if (!visible) return;

    const onResize = () => {
      widthRef.current = window.innerWidth;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const animate = (ts) => {
      const t = ts / 1000; // seconds
      const W = LOGICAL_W;
      const H = LOGICAL_H;

      // Scale amplitudes down on narrow screens so waves don't look too steep.
      // At 1000px+ → full amplitude. At 400px → ~0.44× amplitude.
      const ampScale = Math.min(1, Math.max(0.4, widthRef.current / 900));

      // Blue wave: sits HIGHER than white
      const blueBaseY = H * 0.265;
      const blueParams = [
        { amp: 26 * ampScale, freq: 1.2, speed: 1.2, phase: 0 },
        { amp: 10 * ampScale, freq: 2.6, speed: -1, phase: 1.2 },
        { amp: 5 * ampScale, freq: 4.2, speed: 0.8, phase: 2.8 },
      ];

      // White wave: sits LOWER than blue
      const whiteBaseY = H * 0.34;
      const whiteParams = [
        { amp: 22 * ampScale, freq: 1.5, speed: 1.3, phase: 0.9 },
        { amp: 9 * ampScale, freq: 3.0, speed: -1, phase: 2.1 },
        { amp: 4 * ampScale, freq: 5.0, speed: 0.6, phase: 0.4 },
      ];

      if (pathBlueRef.current) {
        pathBlueRef.current.setAttribute(
          "d",
          buildPath(t, W, H, blueParams, blueBaseY),
        );
      }
      if (pathWhiteRef.current) {
        pathWhiteRef.current.setAttribute(
          "d",
          buildPath(t, W, H, whiteParams, whiteBaseY),
        );
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [visible]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden"
      style={{ height: 220 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 220"
        preserveAspectRatio="none"
        style={{ display: "block", position: "absolute", bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="whiteWaveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4EDFC" />
            <stop offset="45%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Layer A — Blue solid block (back) */}
        <path ref={pathBlueRef} fill="#2C4295" />

        {/* Layer B — White gradient block (front) */}
        <path ref={pathWhiteRef} fill="url(#whiteWaveGrad)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [wavesVisible, setWavesVisible] = useState(false);

  // Waves rise in after the zipper preloader finishes (~2.5 s)
  useEffect(() => {
    const t = setTimeout(() => setWavesVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col">
      {/* ── Background Video ─────────────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/Poolzip-hero-2.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Gradient dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Hero Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 pb-40">
        <h1
          style={{ fontFamily: "'Louvette Display', serif" }}
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.1] font-semibold mb-5 max-w-3xl drop-shadow-xl"
        >
          Egy <span className="text-[#F28C48] italic">elegáns zipzár</span>
          <br />a medencére
        </h1>

        <p
          style={{ fontFamily: "Gotham, sans-serif" }}
          className="text-white/85 text-base md:text-lg font-light max-w-md mb-10 leading-relaxed drop-shadow"
        >
          Elegancia, a tisztább víz és a maximális
          <br className="hidden sm:block" />
          biztonság egy diszkrét köntösben
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#kalkulator"
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-[#F28C48] hover:bg-[#E0772F] rounded-full shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 tracking-wide"
          >
            3D Árkalkuláció
          </a>
          <a
            href="#about"
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-4 transition-colors duration-200"
          >
            Mi az a Poolzip?
          </a>
        </div>
      </div>

      {/* ── Organic Animated Wave Divider ────────────────────────────────── */}
      <div
        style={{
          transition: "opacity 1s ease, transform 1s ease",
          opacity: wavesVisible ? 1 : 0,
          transform: wavesVisible ? "translateY(0)" : "translateY(60px)",
        }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <AnimatedWaves visible={wavesVisible} />
      </div>
    </section>
  );
}
