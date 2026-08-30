'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX, FiCheck, FiMaximize, FiVolume2 } from 'react-icons/fi';
import { MdWaves, MdPlayCircleFilled } from 'react-icons/md';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="videobemutato" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-secondary font-bold text-xs uppercase tracking-wider mb-4">
            Működés Közben
          </div>
          <h2 className="fluid-section-title font-extrabold text-white mb-4">
            Nézze meg, milyen könnyed a nyitás és zárás
          </h2>
          <p className="fluid-subtitle text-slate-300">
            60 másodperces bemutató a Poolzip precíziós zip technológiájáról, a lépésállóságról és az elegáns motoros működtetésről.
          </p>
        </div>

        {/* Video Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-800 shadow-2xl group">
            {/* Visual Screen Area */}
            <div className="aspect-[16/9] relative flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800">
              {/* Graphic background simulation */}
              <div 
                className="absolute inset-0 opacity-60 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(44, 66, 149, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)'
                }}
              />

              {/* Pool graphic in action */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg className="w-full h-full max-w-2xl opacity-40" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="50" width="500" height="250" rx="20" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 6" fill="#0369a1" fillOpacity="0.3" />
                  <line x1="50" y1="50" x2="350" y2="50" stroke="#F28C48" strokeWidth="8" />
                  <line x1="50" y1="300" x2="350" y2="300" stroke="#F28C48" strokeWidth="8" />
                  <rect x="50" y="50" width="300" height="250" rx="16" fill="#1e293b" fillOpacity="0.8" stroke="#475569" strokeWidth="2" />
                  <circle cx="300" cy="175" r="40" fill="#F28C48" fillOpacity="0.2" />
                </svg>
              </div>

              {/* Central Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Videó lejátszása"
                className="relative z-20 w-24 h-24 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-glow-accent transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer"
              >
                <span className="absolute -inset-3 rounded-full bg-accent/30 animate-ping pointer-events-none" />
                <FiPlay className="w-10 h-10 ml-1 fill-white" />
              </button>

              {/* Video Badges & Controls Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-300 bg-slate-950/70 backdrop-blur-md px-5 py-3 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">4K Bemutató Videó: Poolzip Működés & Teherbírás</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-slate-400">
                  <span>Hossz: 01:15</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-secondary">Magyar Felirattal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Highlight Points under Video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div className="text-xs text-slate-300">
                <strong className="block text-white font-semibold mb-0.5">Automata nyitás</strong>
                Csendes motoros csévélés másodpercek alatt.
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                02
              </div>
              <div className="text-xs text-slate-300">
                <strong className="block text-white font-semibold mb-0.5">Lépésállósági teszt</strong>
                150 kg terhelés sem okoz megereszkedést.
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                03
              </div>
              <div className="text-xs text-slate-300">
                <strong className="block text-white font-semibold mb-0.5">Kristálytiszta víz</strong>
                A felszíni szennyeződések kívül rekednek.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Modal Video Preview */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center">
                    <MdWaves className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Poolzip Termékbemutató & Működés</h3>
                    <p className="text-xs text-slate-400">Tekintse meg a zip technológia működését éles körülmények között</p>
                  </div>
                </div>

                {/* Simulated Animated Video Screen */}
                <div className="aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center border border-slate-800 p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center mb-4 text-accent animate-pulse">
                    <MdPlayCircleFilled className="w-12 h-12" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Interaktív videós demonstráció</h4>
                  <p className="text-sm text-slate-400 max-w-md mb-6">
                    A rendszer egyetlen gombnyomással, egyenletesen és feszesen feszíti ki a vízhatlan membránt. 
                    Munkatársaink helyszíni felmérés során személyesen is bemutatják a működési mintát.
                  </p>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      const el = document.getElementById('kalkulator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-xl transition-colors shadow-glow-accent"
                  >
                    Kalkuláció készítése a medencémhez →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
