'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Brand wave SVG path from public/assets/wave.svg
 * ViewBox: 0 0 119.85 14.47
 * Single wavelength lambda = 39.96
 * Half wavelength lambda / 2 = 19.98
 */
const WAVE_PATH =
  "M119.85,14.47c-7.46,0-14.54-3.29-19.98-9.27-5.43,5.98-12.5,9.27-19.95,9.27s-14.55-3.29-19.98-9.27c-5.44,5.98-12.52,9.27-19.98,9.27s-14.55-3.29-19.98-9.27C14.55,11.18,7.47,14.47,0,14.47v-5c6.16,0,12.03-2.81,16.54-7.92.88-.99,2.13-1.55,3.44-1.55h0c1.31,0,2.57.57,3.44,1.55,4.51,5.11,10.38,7.92,16.54,7.92s12.02-2.81,16.54-7.92c.87-.98,2.12-1.55,3.44-1.55h0c1.31,0,2.57.56,3.44,1.55,4.51,5.11,10.39,7.92,16.54,7.92s12-2.81,16.51-7.92c.87-.99,2.13-1.55,3.44-1.55s2.57.57,3.44,1.55c4.51,5.11,10.39,7.92,16.54,7.92v5Z";

const HALF_WAVELENGTH = 19.98;

/**
 * Exact Slider paths from public/assets/zipper.svg
 * ViewBox: 0 0 212.96 116.04
 */
const PATH_SLIDER_MOUTH =
  "M73.13,98.27l-62.54,17.46c-5.32,1.48-10.59-2.51-10.59-8.04V8.35C0,2.83,5.27-1.17,10.59.31l62.54,17.46c3.61,1.01,6.1,4.29,6.1,8.04v64.43c0,3.74-2.49,7.03-6.1,8.04Z";

const PATH_SLIDER_BODY =
  "M79.23,28.76v58.53h128.21c3.05,0,5.53-2.48,5.53-5.53v-47.47c0-3.05-2.48-5.53-5.53-5.53H79.23ZM193.59,71.35h-41.97c-3.05,0-5.53-2.48-5.53-5.53v-15.61c0-3.05,2.48-5.53,5.53-5.53h41.97c3.05,0,5.53,2.48,5.53,5.53v15.61c0,3.05-2.48,5.53-5.53,5.53Z";

/**
 * Exact Tooth path from public/assets/zipper-teeth.svg
 * ViewBox: 0 0 22.12 53
 */
const PATH_TOOTH =
  "M11.06,53c-6.11,0-11.06-4.95-11.06-11.06V11.06C0,4.95,4.95,0,11.06,0s11.06,4.95,11.06,11.06v30.89c0,6.11-4.95,11.06-11.06,11.06Z";

export default function ZipperLoader() {
  // Phase: 'loading' -> 'unzipping' -> 'completed'
  const [phase, setPhase] = useState('loading');
  const [waveFading, setWaveFading] = useState(false);
  const [zipperFadingIn, setZipperFadingIn] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [progress, setProgress] = useState(0); // 0 -> 1 during unzipping
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  // 2-frame wave animation states
  const [waveEntered, setWaveEntered] = useState(false);
  const [waveFrame, setWaveFrame] = useState(0);

  // Resize handler
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth || document.documentElement.clientWidth || 1920,
        height: window.innerHeight || document.documentElement.clientHeight || 1080,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Wave 2-frame animation logic
  useEffect(() => {
    if (phase !== 'loading') return;

    // Smooth ease-in entrance for the wave
    const entranceTimer = setTimeout(() => {
      setWaveEntered(true);
    }, 120);

    // After normal wave entrance, alternate between Frame 0 and Frame 1 (half wavelength shift)
    let interval;
    const start2FrameTimer = setTimeout(() => {
      interval = setInterval(() => {
        setWaveFrame((prev) => (prev === 0 ? 1 : 0));
      }, 340); // Classic 2-frame cadence (~3 fps)
    }, 450);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(start2FrameTimer);
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // Page readiness and minimum display time (smooth deterministic transition)
  useEffect(() => {
    let hasStarted = false;

    const startUnzipSequence = () => {
      if (hasStarted) return;
      hasStarted = true;

      // 1. Wave smoothly fades out
      setWaveFading(true);
      // 2. Zipper line and slider smoothly fade in
      setZipperFadingIn(true);
      // 3. After the cross-fade finishes, start unzipping
      setTimeout(() => {
        setPhase('unzipping');
      }, 380);
    };

    // Wave displays for 1.6s, then seamless transition into zipper opening
    const timer = setTimeout(startUnzipSequence, 1600);

    // Also trigger if window finishes loading early, with minimum 1.2s
    const handleLoad = () => {
      setTimeout(startUnzipSequence, 1200);
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    // Absolute failsafe fallback: ensure loader never blocks screen if anything delays or fails
    const failsafeTimer = setTimeout(() => {
      setPhase('completed');
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafeTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Expose replay function for instant testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.replayZipper = () => {
        startTimeRef.current = null;
        setProgress(0);
        setWaveFading(false);
        setZipperFadingIn(false);
        setWaveEntered(false);
        setWaveFrame(0);
        setPhase('loading');
        setTimeout(() => {
          setWaveFading(true);
          setZipperFadingIn(true);
          setTimeout(() => {
            setPhase('unzipping');
          }, 380);
        }, 1600);
      };
    }
  }, []);

  // Quick skip on click during loading
  const handleSkip = () => {
    if (phase === 'loading' && !waveFading) {
      setWaveFading(true);
      setZipperFadingIn(true);
      setTimeout(() => {
        setPhase('unzipping');
      }, 150);
    }
  };

  // Run unzipping animation
  useEffect(() => {
    if (phase !== 'unzipping') return;

    document.body.style.overflow = 'hidden';

    // Duration of travel across and off the screen
    const duration = 1650;

    // Starts slowly and finishes with strong acceleration (ease-in power curve)
    const forwardCurve = (t) => Math.pow(t, 2.2);

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = forwardCurve(rawProgress);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        // Unzipping is 100% off screen, now unmount safely
        setPhase('completed');
        document.body.style.overflow = '';
      }
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'completed') {
    return null;
  }

  const { width: W, height: H } = dimensions;
  const centerY = H * 0.5;

  // Zipper scale parameters
  const sliderScale = 0.46;
  const sliderW = 212.96 * sliderScale; // ~98px
  const sliderH = 116.04 * sliderScale; // ~53px
  const mouthHalfHeight = 49.67 * sliderScale; // ~23px
  const sliderCenterOffsetY = 58.02 * sliderScale; // ~26.7px

  // Tooth scale parameters
  const toothScale = 0.42; // tooth height ~ 22.2px, width ~ 9.3px

  // Travel distance:
  // Travel distance:
  // Starts at x = -sliderW - 10 so it eases smoothly right into the viewport
  // Pulls all the way to W + max(1400, H * 1.15) so that the entire wedge naturally exits the screen
  const sliderStartX = -sliderW - 10;
  const sliderExtraTravel = Math.max(1400, H * 1.15);
  const sliderEndX = W + sliderExtraTravel;
  const sliderX = sliderStartX + (sliderEndX - sliderStartX) * progress;

  // Wedge opening slope:
  // Angle theta ~ 27.5 deg (slope ~ 0.52)
  const wedgeSlope = 0.52;

  // Function to calculate the top and bottom edge heights at any coordinate x <= sliderX
  // Behind the slider, distance is d = sliderX - x
  const getHalfGap = (x) => {
    if (phase === 'loading') return 0; // Curtains meet seamlessly at centerY
    const d = Math.max(0, sliderX - x);
    return mouthHalfHeight + d * wedgeSlope + 14 * Math.tanh(d / 90);
  };

  // Generate top and bottom curtain paths
  // Seam overlap: top curtain extends 2px past centerY to completely eliminate any subpixel 1px hairline gap
  const seamOverlap = 2;
  const rightBoundaryX = Math.max(W + 50, sliderX + sliderW + 50);
  const curvePointsCount = 28;

  let topCurvePathString = '';
  let botCurvePathString = '';

  if (phase === 'loading') {
    // When loading, top curtain overlaps bottom curtain by 2px all the way across
    topCurvePathString = `L ${rightBoundaryX} ${centerY + seamOverlap} L -50 ${centerY + seamOverlap}`;
    botCurvePathString = `L ${rightBoundaryX} ${centerY} L -50 ${centerY}`;
  } else {
    topCurvePathString = `L ${sliderX + sliderW} ${centerY + seamOverlap} L ${sliderX} ${centerY - mouthHalfHeight}`;
    botCurvePathString = `L ${sliderX + sliderW} ${centerY} L ${sliderX} ${centerY + mouthHalfHeight}`;

    for (let i = 0; i <= curvePointsCount; i++) {
      const t = i / curvePointsCount;
      const x = sliderX - t * (sliderX - (-50));
      const h = getHalfGap(x);
      const yTop = centerY - h;
      const yBot = centerY + h;

      topCurvePathString += ` L ${x.toFixed(1)} ${yTop.toFixed(1)}`;
      botCurvePathString += ` L ${x.toFixed(1)} ${yBot.toFixed(1)}`;
    }
  }

  const topCurtainPath = `
    M -50 -50
    L ${rightBoundaryX} -50
    L ${rightBoundaryX} ${centerY + seamOverlap}
    ${topCurvePathString}
    L -50 -50
    Z
  `;

  const botCurtainPath = `
    M -50 ${H + 50}
    L ${rightBoundaryX} ${H + 50}
    L ${rightBoundaryX} ${centerY}
    ${botCurvePathString}
    L -50 ${H + 50}
    Z
  `;

  // Closed zipper teeth (Ahead of slider, along horizontal seam)
  // Only rendered during unzipping as the zipper moves across
  const closedTeeth = [];
  const toothPitch = 24; // Generous visible gap between closed teeth
  const closedTeethStartX = sliderX + sliderW - 6;

  if ((zipperFadingIn || phase === 'unzipping') && closedTeethStartX < W + 30) {
    for (let x = Math.max(closedTeethStartX, -20); x < W + 30; x += toothPitch) {
      // Top tooth (hangs down across seam)
      closedTeeth.push({
        key: `ct-top-${x.toFixed(0)}`,
        x: x,
        y: centerY - 5,
        angle: 0,
      });
      // Bottom tooth (sticks up across seam, interleaved)
      closedTeeth.push({
        key: `ct-bot-${x.toFixed(0)}`,
        x: x + toothPitch / 2,
        y: centerY + 5,
        angle: 180,
      });
    }
  }

  // Open zipper teeth along the top and bottom wedge curves
  // STRICTLY PERPENDICULAR to the slanting edge and colored Brand Blue (#2C4295)
  const openTeethTop = [];
  const openTeethBot = [];

  if (phase === 'unzipping' && sliderX > -30) {
    const toothStepDist = 24;
    const maxDist = sliderX + 60;

    // Mathematical perpendicularity:
    // Top edge angle is +atan(wedgeSlope). Perpendicular pointing down-left into opening:
    // rotate(+atan(wedgeSlope) * 180 / PI) = +27.5 deg
    const topPerpAngle = Math.atan(wedgeSlope) * (180 / Math.PI);

    // Bottom edge angle is -atan(wedgeSlope). Perpendicular pointing up-left into opening:
    // rotate(180 - atan(wedgeSlope) * 180 / PI) = +152.5 deg
    const botPerpAngle = 180 - Math.atan(wedgeSlope) * (180 / Math.PI);

    // Protrusion offset so the teeth extend out from the blue edge into the opening
    const normLen = Math.sqrt(1 + wedgeSlope * wedgeSlope);
    const offsetX = (-wedgeSlope / normLen) * 7; // ~ -3.2px (towards left)
    const offsetY = (1 / normLen) * 7; // ~ +6.2px (towards center)

    for (let d = 8; d < maxDist; d += toothStepDist) {
      const x = sliderX - d;
      if (x < -40 || x > W + 40) continue;

      const halfGap = getHalfGap(x);
      const yTop = centerY - halfGap;
      const yBot = centerY + halfGap;

      if (yTop > -35 && yTop < H + 35) {
        openTeethTop.push({
          key: `ot-top-${d.toFixed(0)}`,
          x: x + offsetX,
          y: yTop + offsetY,
          angle: topPerpAngle,
        });
      }

      if (yBot > -35 && yBot < H + 35) {
        openTeethBot.push({
          key: `ot-bot-${d.toFixed(0)}`,
          x: x + offsetX,
          y: yBot - offsetY,
          angle: botPerpAngle,
        });
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    >
      {/* 
        UNIFIED CONTINUOUS BLUE CURTAIN:
        This SVG is ALWAYS rendered with 100% opacity #2C4295.
        It covers the screen during loading, and then parts seamlessly when unzipping.
        There is NEVER an opacity dip or page flash!
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="zipper-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
          <filter id="slider-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1" dy="2" stdDeviation="4" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Top Blue Curtain (Brand Blue #2C4295) */}
        <path
          d={topCurtainPath}
          fill="#2C4295"
          filter="url(#zipper-shadow)"
        />

        {/* Bottom Blue Curtain (Brand Blue #2C4295) */}
        <path
          d={botCurtainPath}
          fill="#2C4295"
          filter="url(#zipper-shadow)"
        />

        {/* Closed Zipper Teeth (White #FFFFFF, ahead of slider - Fades in gracefully) */}
        <g
          style={{
            opacity: zipperFadingIn || phase === 'unzipping' ? 1 : 0,
            transition: 'opacity 350ms ease-out',
          }}
        >
          {closedTeeth.map((tooth) => (
            <g
              key={tooth.key}
              transform={`translate(${tooth.x}, ${tooth.y}) rotate(${tooth.angle}) translate(${-11.06 * toothScale}, ${-26.5 * toothScale}) scale(${toothScale})`}
            >
              <path d={PATH_TOOTH} fill="#FFFFFF" />
            </g>
          ))}
        </g>

        {/* Open Zipper Teeth on Top Curve (Brand Blue #2C4295, strictly perpendicular) */}
        <g>
          {openTeethTop.map((tooth) => (
            <g
              key={tooth.key}
              transform={`translate(${tooth.x}, ${tooth.y}) rotate(${tooth.angle}) translate(${-11.06 * toothScale}, ${-26.5 * toothScale}) scale(${toothScale})`}
            >
              <path d={PATH_TOOTH} fill="#2C4295" />
            </g>
          ))}
        </g>

        {/* Open Zipper Teeth on Bottom Curve (Brand Blue #2C4295, strictly perpendicular) */}
        <g>
          {openTeethBot.map((tooth) => (
            <g
              key={tooth.key}
              transform={`translate(${tooth.x}, ${tooth.y}) rotate(${tooth.angle}) translate(${-11.06 * toothScale}, ${-26.5 * toothScale}) scale(${toothScale})`}
            >
              <path d={PATH_TOOTH} fill="#2C4295" />
            </g>
          ))}
        </g>

        {/* Zipper Slider (Exact paths from zipper.svg - Fades in gracefully) */}
        {(zipperFadingIn || phase === 'unzipping') && sliderX < W + 120 && (
          <g
            transform={`translate(${sliderX}, ${centerY - sliderCenterOffsetY}) scale(${sliderScale})`}
            filter="url(#slider-shadow)"
            style={{
              opacity: zipperFadingIn || phase === 'unzipping' ? 1 : 0,
              transition: 'opacity 350ms ease-out',
            }}
          >
            {/* Mouth wedge */}
            <path d={PATH_SLIDER_MOUTH} fill="#FFFFFF" />

            {/* Slider body with inner cutout */}
            <path d={PATH_SLIDER_BODY} fill="#FFFFFF" fillRule="evenodd" />
          </g>
        )}
      </svg>

      {/* 
        WAVE PRELOADER OVERLAY:
        Positioned directly on top of the continuous blue curtain.
        When ready to unzip, only this wave overlay fades to opacity-0,
        leaving the blue curtain fully intact to be opened by the zipper!
      */}
      {phase === 'loading' && (
        <div
          onClick={handleSkip}
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 ease-out ${
            waveFading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          title="Kattints az átugráshoz"
        >
          {/* Centered 2-frame brand wave */}
          <div
            className={`relative flex flex-col items-center justify-center p-8 transition-all duration-400 transform ${
              waveEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {/* Water glow backdrop */}
            <div className="absolute w-72 h-24 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* 2-Frame SVG Wave Container */}
            <div className="relative overflow-hidden w-48 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 119.85 14.47"
                className="w-full h-full text-white fill-current overflow-visible"
                shapeRendering="geometricPrecision"
              >
                {/* Frame 0: normal (0px). Frame 1: shifted by half a wavelength (-19.98px). */}
                <g
                  style={{
                    transform: `translateX(${waveFrame === 0 ? 0 : -HALF_WAVELENGTH}px)`,
                    transition: 'none',
                  }}
                >
                  <path d={WAVE_PATH} />
                  <path d={WAVE_PATH} transform="translate(119.85, 0)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
