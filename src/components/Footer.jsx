'use client';

import Image from 'next/image';
import { FiPhone, FiMail, FiMapPin, FiShield, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kapcsolat" className="bg-[#1C2E6C] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex flex-col items-start mb-6">
              <a href="#" className="inline-block mb-3">
                <Image
                  src="/logos/poolzip-logo.svg"
                  alt="Poolzip logó"
                  width={160}
                  height={39}
                  className="h-9 w-auto"
                />
              </a>
              <span
                style={{ fontFamily: 'Gotham, sans-serif' }}
                className="text-[11px] font-semibold tracking-widest text-[#D4EDFC] uppercase"
              >
                Prémium Biztonsági Medencefedés
              </span>
            </div>

            <p className="text-sm text-secondary/80 leading-relaxed mb-6 max-w-sm">
              Innovatív, 150 kg/m² teherbírású, lépésálló és hermetikusan záródó prémium medencefedések tervezése, gyártása és országos telepítése.
              Kompromisszummentes kerti elegancia és maximális biztonság.
            </p>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#D4EDFC] bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
              <FiShield className="text-[#F28C48] w-4 h-4 flex-shrink-0" />
              <span>10 Év Gyártói Garancia & Országos Szerviz</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4
              style={{ fontFamily: 'Gotham, sans-serif' }}
              className="text-xs font-extrabold uppercase tracking-widest text-white mb-5"
            >
              Gyors Hivatkozások
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80">
              <li>
                <a href="#elonyok" className="hover:text-white transition-colors">
                  Fő Előnyök & Technológia
                </a>
              </li>
              <li>
                <a href="#osszehasonlitas" className="hover:text-white transition-colors">
                  Összehasonlítás
                </a>
              </li>
              <li>
                <a href="#videobemutato" className="hover:text-white transition-colors">
                  Videós Bemutató
                </a>
              </li>
              <li>
                <a href="#referenciak" className="hover:text-white transition-colors">
                  Referenciák
                </a>
              </li>
              <li>
                <a href="#velemenyek" className="hover:text-white transition-colors">
                  Vélemények
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="hover:text-white transition-colors font-bold text-[#F28C48]">
                  3D Árkalkuláció
                </a>
              </li>
              <li>
                <a href="#gyik" className="hover:text-white transition-colors">
                  Gyakori Kérdések
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4
              style={{ fontFamily: 'Gotham, sans-serif' }}
              className="text-xs font-extrabold uppercase tracking-widest text-white mb-5"
            >
              Központi Elérhetőség
            </h4>
            <ul className="space-y-4 text-sm text-secondary/80">
              <li className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-[#F28C48] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">+36 (30) 123 4567</div>
                  <div className="text-xs text-secondary/60">Hétfő – Péntek: 8:00 – 17:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-[#F28C48] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">info@poolzip.hu</div>
                  <div className="text-xs text-secondary/60">Árajánlatkérés & Ügyfélszolgálat</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-[#F28C48] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Magyarország teljes területén</div>
                  <div className="text-xs text-secondary/60">Országos helyszíni felmérés & beépítés</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Impressum & Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-secondary/60 gap-4">
          <div>
            © {new Date().getFullYear()} Poolzip Hungary Kft. Minden jog fenntartva.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Adatkezelési Tájékoztató
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Általános Szerződési Feltételek
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Impresszum
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Vissza a tetejére"
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <FiArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
