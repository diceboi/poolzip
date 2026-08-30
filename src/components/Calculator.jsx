'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiArrowRight,
  FiSliders,
  FiSend,
  FiShield,
  FiPhone,
  FiMail,
  FiUser,
  FiMapPin,
  FiClock,
  FiCheck,
  FiEye,
  FiMaximize2,
} from 'react-icons/fi';
import { MdOutlinePool, MdColorLens, MdLockOutline, MdLockOpen } from 'react-icons/md';

// Dynamic import of 3D Scene with SSR disabled for Next.js
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] rounded-3xl bg-slate-900 flex flex-col items-center justify-center text-slate-400 border border-slate-700">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-sm font-semibold text-slate-300">3D Medencemodell betöltése...</span>
    </div>
  ),
});

export default function Calculator() {
  // Dimension States (1m steps as requested)
  const [width, setWidth] = useState(4); // 2m - 6m (step 1)
  const [length, setLength] = useState(8); // 4m - 16m (step 1)
  const [color, setColor] = useState('grey'); // 'grey' | 'beige'
  const [coverState, setCoverState] = useState('half'); // 'closed' | 'half' | 'open'

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    note: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const poolArea = (width * length).toFixed(0);
  const foilWidth = (width + 1).toFixed(0);
  const foilLength = (length + 1).toFixed(0);
  const foilArea = (Number(foilWidth) * Number(foilLength)).toFixed(0);

  // Indicative Price Formula (Baseline: ~3.2M Ft for 8x4m)
  const baseSystemCost = 1800000;
  const pricePerM2 = 32000;
  const rawPrice = baseSystemCost + Math.round(Number(foilArea) * pricePerM2);
  const indicativePrice = Math.round(rawPrice / 10000) * 10000;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('hu-HU').format(price) + ' Ft';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate lead submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti Effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2C4295', '#F28C48', '#D4EDFC', '#38BDF8'],
        });
      } catch (err) {
        // Fallback silently if canvas-confetti is not loaded
      }
    }, 600);
  };

  return (
    <section id="kalkulator" className="py-20 bg-gradient-to-b from-white via-secondary/25 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 text-accent-dark font-bold text-xs uppercase tracking-wider mb-4 border border-accent/20">
            Interaktív 3D Konfigurátor & Árajánlat
          </div>
          <h2 className="fluid-section-title font-extrabold text-primary mb-4">
            Tervezze meg medencefedését <br className="hidden sm:inline" />
            <span className="text-slate-900">valós idejű 3D élménnyel</span>
          </h2>
          <p className="fluid-subtitle text-slate-600">
            Állítsa be a méreteket, tesztelje a nyitási és zárási mechanizmust 360 fokban körbeforgatható nézetben!
          </p>
        </div>

        {/* 1. Full-Width Immersive 3D Stage */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl mb-8">
          {/* Top Floating Info Bar inside 3D Viewport */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 pointer-events-auto flex items-center gap-2.5 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Poolzip 3D Modell
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-extrabold text-accent">
                {width}m × {length}m
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 shadow-xl">
                <span>Állapot:</span>
                <span className="text-secondary font-bold">
                  {coverState === 'closed'
                    ? 'Teljesen zárt (100%)'
                    : coverState === 'open'
                    ? 'Nyitott (0%)'
                    : 'Félig nyitott (50%)'}
                </span>
              </div>
            </div>
          </div>

          {/* 3D Canvas Stage */}
          <div className="w-full h-[480px] sm:h-[550px] lg:h-[620px]">
            <Scene3D
              poolWidth={width}
              poolLength={length}
              coverState={coverState}
              color={color}
            />
          </div>

          {/* Bottom Overlay Hint inside 3D Viewport */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span>🔄</span> Forgatás: bal egérgomb / érintés
            </span>
            <span className="hidden sm:inline">🔍 Zoom: görgetés</span>
            <span className="text-secondary font-semibold">
              Fedésméret: {foilWidth}m × {foilLength}m ({foilArea} m²)
            </span>
          </div>
        </div>

        {/* 2. Interactive Control Bar (Directly below 3D Stage) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card-soft border border-slate-200 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (Left part of Control Bar) */}
            <div className="lg:col-span-6 space-y-6 pr-0 lg:pr-6 lg:border-r border-slate-100">
              {/* Width Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <FiSliders className="text-accent" />
                    <span>Medence Szélesség</span>
                  </label>
                  <span className="text-sm font-extrabold text-primary bg-secondary/60 px-3 py-1 rounded-lg">
                    {width} méter
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="1"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>2 m</span>
                  <span>3 m</span>
                  <span>4 m</span>
                  <span>5 m</span>
                  <span>6 m</span>
                </div>
              </div>

              {/* Length Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <FiSliders className="text-accent" />
                    <span>Medence Hosszúság</span>
                  </label>
                  <span className="text-sm font-extrabold text-primary bg-secondary/60 px-3 py-1 rounded-lg">
                    {length} méter
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="1"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>4 m</span>
                  <span>7 m</span>
                  <span>10 m</span>
                  <span>13 m</span>
                  <span>16 m</span>
                </div>
              </div>
            </div>

            {/* Cover State & Color Selector (Right part of Control Bar) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Cover State Buttons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Fedés Állapotának Tesztelése
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCoverState('closed')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      coverState === 'closed'
                        ? 'border-primary bg-secondary/50 text-primary shadow-sm ring-2 ring-primary/20'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <MdLockOutline className="w-4 h-4 text-primary" />
                    <span>Zárt (100%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCoverState('half')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      coverState === 'half'
                        ? 'border-primary bg-secondary/50 text-primary shadow-sm ring-2 ring-primary/20'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <MdOutlinePool className="w-4 h-4 text-primary" />
                    <span>Félig nyitott</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCoverState('open')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      coverState === 'open'
                        ? 'border-primary bg-secondary/50 text-primary shadow-sm ring-2 ring-primary/20'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <MdLockOpen className="w-4 h-4 text-primary" />
                    <span>Nyitott (0%)</span>
                  </button>
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Membrán Színmintája
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setColor('grey')}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      color === 'grey'
                        ? 'border-primary bg-secondary/40 ring-2 ring-primary/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#525866] shadow-inner flex items-center justify-center text-white flex-shrink-0">
                      {color === 'grey' && <FiCheck className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Modern Szürke</div>
                      <div className="text-[10px] text-slate-500">Antracit szín</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setColor('beige')}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      color === 'beige'
                        ? 'border-primary bg-secondary/40 ring-2 ring-primary/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#C8B5A3] shadow-inner flex items-center justify-center text-slate-800 flex-shrink-0">
                      {color === 'beige' && <FiCheck className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Elegáns Bézs</div>
                      <div className="text-[10px] text-slate-500">Homok szín</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Calculations Summary & Lead Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Calculated Values & Indicative Price Box */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-primary-dark to-primary text-white rounded-3xl p-8 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Kalkulált Méretek
                  </span>
                  <h3 className="text-xl font-bold text-white">Részletes Összesítő</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent">
                  <MdOutlinePool className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                <div className="bg-white/10 rounded-2xl p-4">
                  <span className="text-slate-300 block mb-1">Medence Vízfelület</span>
                  <strong className="text-xl text-white font-extrabold">{poolArea} m²</strong>
                  <span className="text-[11px] text-slate-300 block mt-0.5">({width}m × {length}m)</span>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <span className="text-slate-300 block mb-1">Fedés Felülete (+1m)</span>
                  <strong className="text-xl text-secondary font-extrabold">{foilArea} m²</strong>
                  <span className="text-[11px] text-slate-300 block mt-0.5">({foilWidth}m × {foilLength}m)</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-secondary/90 mb-6">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-accent flex-shrink-0" />
                  <span>150 kg/m² lépésálló, teherbíró zip membrán</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-accent flex-shrink-0" />
                  <span>Beépített, csendes motoros csévélő egység</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-accent flex-shrink-0" />
                  <span>Síkba simuló, mezítláb járható alumínium vezetősínek</span>
                </li>
              </ul>
            </div>

            {/* Big Indicative Price Block */}
            <div className="pt-6 border-t border-white/20">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1">
                Becsült Indikatív Ár:
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {formatPrice(indicativePrice)}
              </div>
              <span className="text-[11px] text-slate-300">
                *Tartalmazza a komplett rendszert, motort, síneket és távirányítót.
              </span>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-card-soft border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FiMail className="text-accent" />
                <span>Kérjen Helyszíni Felmérést & Részletes Árajánlatot</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Töltse ki az alábbi űrlapot, és mérnök-kollégánk 24 órán belül felveszi Önnel a kapcsolatot!
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FiCheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">
                      Köszönjük érdeklődését, {formData.name || 'Kedves Érdeklődő'}!
                    </h4>
                    <p className="text-sm text-emerald-700 max-w-md mx-auto mb-4 leading-relaxed">
                      Sikeresen rögzítettük ajánlatkérését a <strong>{width} × {length} méteres</strong> ({foilArea} m²-es) medencére. 
                      Hamarosan küldjük a tételes specifikációt és ajánlatot a megadott e-mail címre.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                    >
                      Új konfiguráció indítása
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teljes Név *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3.5 top-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="pl. Kovács Péter"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          E-mail Cím *
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3.5 top-3.5 text-slate-400" />
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="pl. kovacs.peter@email.hu"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Telefonszám *
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3.5 top-3.5 text-slate-400" />
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="pl. +36 30 123 4567"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Település / Helyszín *
                        </label>
                        <div className="relative">
                          <FiMapPin className="absolute left-3.5 top-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="pl. Budapest, II. kerület"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Egyedi Megjegyzés / Kérdés (Opcionális)
                      </label>
                      <textarea
                        rows="2"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="pl. Épülőfélben lévő medence, rejtett süllyesztéssel..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-accent hover:bg-accent-hover active:bg-accent-dark text-white font-bold rounded-2xl shadow-glow-accent transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Ajánlatkérés küldése...</span>
                        </>
                      ) : (
                        <>
                          <span>Ingyenes Ajánlatkérés & Helyszíni Felmérés</span>
                          <FiSend className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <FiShield className="text-emerald-500" /> 100% Adatvédelem
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-primary" /> Válasz 24 órán belül
                      </span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
