"use client";

import { useState, useEffect } from "react";
import { FiPhone, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Előnyök", href: "#elonyok" },
    { name: "Összehasonlítás", href: "#osszehasonlitas" },
    { name: "Videó", href: "#videobemutato" },
    { name: "Referenciák", href: "#referenciak" },
    { name: "Vélemények", href: "#velemenyek" },
    { name: "GYIK", href: "#gyik" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white shadow-md h-16"
          : "bg-transparent h-[100px]"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center flex-shrink-0">
          {/* White logo on top of hero, blue logo when scrolled or menu open */}
          <Image
            src="/logos/poolzip-logo.svg"
            alt="Poolzip logó"
            width={140}
            height={34}
            priority
            style={{
              filter:
                isScrolled || mobileMenuOpen
                  ? "brightness(0) saturate(100%) invert(20%) sepia(80%) saturate(800%) hue-rotate(200deg) brightness(70%)"
                  : "brightness(0) invert(1)",
              transition: "filter 0.3s ease",
            }}
          />
        </a>

        {/* Desktop Navigation — centered */}
        <nav className="hidden lg:flex items-center gap-8 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{ fontFamily: "Gotham, sans-serif" }}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 relative py-1
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F28C48]
                hover:after:w-full after:transition-all after:duration-300
                ${isScrolled ? "text-slate-700 hover:text-[#2C4295]" : "text-white/90 hover:text-white"}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side — phone + CTA */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0 justify-end">
          <a
            href="tel:+36301234567"
            style={{ fontFamily: "Gotham, sans-serif" }}
            className={`hidden xl:flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-200 ${
              isScrolled
                ? "text-[#2C4295] border-[#2C4295]/30 hover:bg-[#2C4295]/5"
                : "text-white border-white/40 hover:bg-white/10"
            }`}
          >
            <FiPhone className="w-3.5 h-3.5" />
            <span>+36 (30) 123 4567</span>
          </a>

          <a
            href="#kalkulator"
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#F28C48] hover:bg-[#E0772F] rounded-full shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>3D Árkalkuláció</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü nyitása"
          className={`lg:hidden p-2.5 rounded-xl transition-colors ${
            isScrolled || mobileMenuOpen
              ? "text-slate-800 hover:bg-slate-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {mobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown — solid pure white background with smooth slide-down animation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 px-5 py-6 animate-menu-slide-down">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: "Gotham, sans-serif" }}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:text-[#2C4295] hover:bg-[#D4EDFC]/40 active:bg-[#D4EDFC]/60 transition-all uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-2">
              <a
                href="tel:+36301234567"
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#2C4295] bg-[#D4EDFC]/70 hover:bg-[#D4EDFC] rounded-xl transition-colors"
                style={{ fontFamily: "Gotham, sans-serif" }}
              >
                <FiPhone className="w-4 h-4" />
                <span>+36 (30) 123 4567</span>
              </a>
              <a
                href="#kalkulator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[#F28C48] hover:bg-[#E0772F] active:scale-[0.99] rounded-xl text-center shadow-lg shadow-orange-500/25 transition-all"
                style={{ fontFamily: "Gotham, sans-serif" }}
              >
                <span>3D Árkalkuláció</span>
                <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
