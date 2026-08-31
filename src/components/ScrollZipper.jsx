"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Exact Slider paths from ZipperLoader / zipper.svg
 * ViewBox: 0 0 212.96 116.04
 * In original orientation: Mouth is at x=0..73, Tail is at x=79..212
 */
const PATH_SLIDER_MOUTH =
  "M73.13,98.27l-62.54,17.46c-5.32,1.48-10.59-2.51-10.59-8.04V8.35C0,2.83,5.27-1.17,10.59.31l62.54,17.46c3.61,1.01,6.1,4.29,6.1,8.04v64.43c0,3.74-2.49,7.03-6.1,8.04Z";

const PATH_SLIDER_BODY =
  "M79.23,28.76v58.53h128.21c3.05,0,5.53-2.48,5.53-5.53v-47.47c0-3.05-2.48-5.53-5.53-5.53H79.23ZM193.59,71.35h-41.97c-3.05,0-5.53-2.48-5.53-5.53v-15.61c0-3.05,2.48-5.53,5.53-5.53h41.97c3.05,0,5.53,2.48,5.53,5.53v15.61c0,3.05-2.48,5.53-5.53,5.53Z";

/**
 * Exact Tooth path from ZipperLoader / zipper-teeth.svg
 * ViewBox: 0 0 22.12 53
 */
const PATH_TOOTH =
  "M11.06,53c-6.11,0-11.06-4.95-11.06-11.06V11.06C0,4.95,4.95,0,11.06,0s11.06,4.95,11.06,11.06v30.89c0,6.11-4.95,11.06-11.06,11.06Z";

export default function ScrollZipper() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 (left, open) -> 1 (right, zipped shut)
  const [width, setWidth] = useState(1920);

  // Resize listener to track exact viewport width
  useEffect(() => {
    const updateWidth = () => {
      setWidth(
        window.innerWidth || document.documentElement.clientWidth || 1920,
      );
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scroll listener: drives progress smoothly as user scrolls between Gallery and Calculator
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight || 800;

      // Starts zipping closed when divider enters bottom half of screen
      // Fully zipped shut when divider reaches near top
      const start = windowH * 0.85;
      const end = windowH * 0.2;

      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dimensions
  const W = width;
  const H = 94; // Height allowing elegant parting opening
  const centerY = H / 2; // 47px horizon

  const sliderScale = 0.32;
  const sliderW = 212.96 * sliderScale; // ~68px
  const toothScale = 0.21;
  const toothPitch = 18;

  // Slider X position: smoothly glides from left to right, zipping the seam shut behind it
  const sliderX = -50 + progress * (W + 100);
  const headX = sliderX + 12; // Slider head position; pull-tab extends to the right (mouth & tab pointing right)

  // Opening curve:
  // CLOSED behind the slider head (x <= headX): op = 0
  // OPEN ahead of the slider head (x > headX): smoothly widens to maxOpening revealing light blue
  const maxOpening = 30; // Each curtain parts by 30px (total 60px visible opening)
  const expansionLength = 220; // Reaches full opening over 220px ahead of slider

  const getOpening = (x) => {
    if (x <= headX) return 0;
    const dist = x - headX;
    const t = Math.min(1, dist / expansionLength);
    const ease = t * t * (3 - 2 * t);
    return ease * maxOpening;
  };

  // Sample points along the width to generate smooth SVG path curtains
  const step = 15;
  const points = [];
  for (let x = 0; x <= W; x += step) {
    points.push({ x, op: getOpening(x) });
  }
  if (points[points.length - 1].x < W) {
    points.push({ x: W, op: getOpening(W) });
  }

  // 1. Top White Curtain Path:
  // Closed along centerY behind slider, pulls upward ahead of slider where it's still open
  let topD = `M 0 0 L ${W} 0 L ${W} ${centerY}`;
  for (let i = points.length - 1; i >= 0; i--) {
    const pt = points[i];
    const y = centerY - pt.op;
    topD += ` L ${pt.x} ${y}`;
  }
  topD += " Z";

  // 2. Bottom Navy Curtain Path:
  // Closed along centerY behind slider, pulls downward ahead of slider where it's still open
  let botD = `M 0 ${H} L ${W} ${H} L ${W} ${centerY}`;
  for (let i = points.length - 1; i >= 0; i--) {
    const pt = points[i];
    const y = centerY + pt.op;
    botD += ` L ${pt.x} ${y}`;
  }
  botD += " Z";

  // 3. Teeth generation along the seam and parting curves
  const teeth = [];
  for (let x = -20; x < W + 40; x += toothPitch) {
    const isClosed = x <= headX;
    const op = getOpening(x);

    let topAngle = 0;
    let botAngle = 180;
    let topY = centerY - 2.5;
    let botY = centerY + 2.5;

    if (!isClosed) {
      topY = centerY - op - 3.5;
      botY = centerY + op + 3.5;
      const tilt = Math.min(26, (op / maxOpening) * 24);
      topAngle = -tilt; // Tilts upward towards the right
      botAngle = 180 + tilt; // Tilts downward towards the right
    }

    // Top tooth (sits on White curtain edge) -> Brand Navy (#2C4295)
    teeth.push({
      key: `t-top-${x.toFixed(0)}`,
      x: x,
      y: topY,
      angle: topAngle,
      color: "#2C4295",
    });

    // Bottom tooth (sits on Navy curtain edge) -> Pure White (#FFFFFF)
    teeth.push({
      key: `t-bot-${x.toFixed(0)}`,
      x: x + toothPitch / 2,
      y: botY,
      angle: botAngle,
      color: "#FFFFFF",
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[76px] sm:h-[94px] overflow-hidden -my-0.5 z-20 pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Brand Light Blue Gradient revealed inside the open area ahead of the slider */}
          <linearGradient
            id="brand-lightblue-reveal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#BCE3FA" />
            <stop offset="50%" stopColor="#D4EDFC" />
            <stop offset="100%" stopColor="#E5F3FD" />
          </linearGradient>

          {/* Crisp Black Drop Shadow for the Slider */}
          <filter
            id="slider-black-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#000000"
              floodOpacity="0.45"
            />
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1.5"
              floodColor="#000000"
              floodOpacity="0.30"
            />
          </filter>
        </defs>

        {/* 1. Underlying revealed surface: Radiant Brand Light Blue (visible only where unzipped/open) */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          fill="url(#brand-lightblue-reveal)"
        />

        {/* 2. Top Curtain (Pure White): Perfectly meets Gallery section above, zips shut behind slider */}
        <path d={topD} fill="#FFFFFF" />

        {/* 3. Bottom Curtain (Brand Navy): Perfectly meets Calculator section below, zips shut behind slider */}
        <path d={botD} fill="#2C4295" />

        {/* 4. Neatly closed seam guideline behind the slider where it has already zipped shut */}
        {sliderX > 0 && (
          <line
            x1={0}
            y1={centerY}
            x2={Math.min(W, headX)}
            y2={centerY}
            stroke="#2C4295"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        )}

        {/* 5. Zipper Teeth following the closed seam and open parting curves:
            - Top teeth on white curtain: Brand Navy (#2C4295)
            - Bottom teeth on blue curtain: Pure White (#FFFFFF)
        */}
        <g>
          {teeth.map((tooth) => (
            <g
              key={tooth.key}
              transform={`translate(${tooth.x}, ${tooth.y}) rotate(${tooth.angle}) translate(${-11.06 * toothScale}, ${-26.5 * toothScale}) scale(${toothScale})`}
            >
              <path d={PATH_TOOTH} fill={tooth.color} />
            </g>
          ))}
        </g>

        {/* 6. Slider with crisp Black Shadow:
            Pull-tab is pointing RIGHT into the direction of movement, exactly as if being pulled
        */}
        {sliderX > -80 && sliderX < W + 80 && (
          <g
            transform={`translate(${sliderX}, ${centerY - 18.5}) scale(${sliderScale})`}
            filter="url(#slider-black-shadow)"
          >
            {/* Slider Mouth/Head (Black) */}
            <path d={PATH_SLIDER_MOUTH} fill="#000000" />

            {/* Slider Body / Pull-tab pointing forward to the right (Black) */}
            <path d={PATH_SLIDER_BODY} fill="#000000" fillRule="evenodd" />

            {/* Inner pull-tab highlight (Pure White #FFFFFF) */}
            <circle cx="170" cy="58" r="7" fill="#FFFFFF" opacity="0.95" />
          </g>
        )}
      </svg>
    </div>
  );
}
