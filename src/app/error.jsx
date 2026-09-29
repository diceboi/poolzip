'use client';

import { useEffect } from 'react';
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Next.js Client Exception caught by app/error.jsx:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-[#2C4295] flex flex-col items-center justify-center px-4 py-16 text-center text-white select-none">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#F28C48] mb-5 shadow-lg shadow-black/20">
        <FiAlertTriangle className="w-8 h-8" />
      </div>

      <h2
        style={{ fontFamily: "'Louvette Display', serif" }}
        className="text-2xl sm:text-3xl font-semibold mb-3 text-white"
      >
        Egy pillanat, a kapcsolat megszakadt
      </h2>

      <p
        style={{ fontFamily: "Gotham, sans-serif" }}
        className="text-white/80 text-xs sm:text-sm max-w-md mb-6 leading-relaxed font-light"
      >
        A telefon hosszabb háttérben futás vagy alvó állapot után felfüggesztette a grafikai motort. Kattintson az alábbi gombra a folytatáshoz!
      </p>

      <button
        type="button"
        onClick={() => reset ? reset() : window.location.reload()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F28C48] hover:bg-[#e07936] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer border-none"
      >
        <FiRefreshCw className="w-4 h-4" />
        <span>Oldal frissítése</span>
      </button>
    </div>
  );
}
