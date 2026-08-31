'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShield, FiCheck, FiX } from 'react-icons/fi';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    const consent = localStorage.getItem('poolzip_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('poolzip_cookie_consent', 'all');
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('poolzip_cookie_consent', { detail: 'all' }));
    }
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('poolzip_cookie_consent', 'necessary');
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('poolzip_cookie_consent', { detail: 'necessary' }));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Sütikezelési tájékoztató"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 transition-all duration-500 animate-fade-in"
    >
      <div className="bg-[#1C2E6C]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl shadow-2xl shadow-slate-950/40 border border-white/15 relative overflow-hidden">
        {/* Ambient lighting glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F28C48]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/10 text-[#F28C48] flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
            <FiShield className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h3
              style={{ fontFamily: 'Gotham, sans-serif' }}
              className="text-sm font-extrabold tracking-wide uppercase text-white mb-1.5"
            >
              Adatvédelmi és Süti Beállítások
            </h3>
            <p className="text-xs text-secondary/80 leading-relaxed mb-4">
              Weboldalunk az EU GDPR és az ePrivacy irányelv előírásainak megfelelően a zavartalan működés és a felhasználói élmény javítása céljából sütiket (cookie-kat) alkalmaz.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 bg-[#F28C48] hover:bg-[#e0772f] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer border-none"
              >
                <FiCheck className="w-3.5 h-3.5" />
                <span>Összes elfogadása</span>
              </button>

              <button
                onClick={handleAcceptNecessary}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-[#D4EDFC] text-xs font-semibold rounded-xl transition-colors border border-white/10 active:scale-[0.98] cursor-pointer"
              >
                Csak a szükségesek
              </button>
            </div>

            <div className="text-[11px] text-secondary/60 text-center sm:text-left">
              További információ:{' '}
              <Link
                href="/adatkezeles"
                className="text-[#D4EDFC] underline hover:text-white transition-colors"
              >
                Adatkezelési Tájékoztató
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
