"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";
import {
  FiSend,
  FiPhoneCall,
  FiMail,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiRotateCw,
  FiClock,
  FiMaximize2,
} from "react-icons/fi";



// Dynamic import of 3D Scene with SSR disabled for Next.js
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center text-white/70">
      <div className="w-12 h-12 border-4 border-[#F28C48] border-t-transparent rounded-full animate-spin mb-4" />
      <span
        style={{ fontFamily: "Gotham, sans-serif" }}
        className="text-sm font-semibold text-white/80"
      >
        3D Medencemodell betöltése...
      </span>
    </div>
  ),
});

export default function Calculator() {
  // Continuous Sliders
  const [width, setWidth] = useState(4.0); // 2.5m - 6.0m (step 0.1)
  const [length, setLength] = useState(8.0); // 4.5m - 14.0m (step 0.1)
  const [coverProgress, setCoverProgress] = useState(65); // 0% - 100% (step 1)
  const [color, setColor] = useState("grey"); // 'grey' | 'beige'

  // Action Form Tab: 'email' | 'callback'
  const [formMode, setFormMode] = useState("email");

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeSlot: "Délelőtt (9:00 - 12:00)",
    note: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#visszahivas" || hash === "#visszahivast-kerek") {
        setFormMode("callback");
        const el = document.getElementById("urlap");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash === "#urlap" || hash === "#ajanlatkeres") {
        const el = document.getElementById("urlap");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formMode,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          timeSlot: formData.timeSlot,
          note: formData.note,
          width: Number(width).toFixed(1),
          length: Number(length).toFixed(1),
          color: color === "beige" ? "Bézs" : "Antracitszürke",
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Hiba történt az üzenet küldésekor.");
      }

      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F28C48", "#FFFFFF", "#38BDF8", "#D4EDFC"],
        });
      } catch (err) {
        // Fallback if canvas-confetti is not loaded
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setErrorMessage(
        err.message || "Nem sikerült elküldeni a megkeresést. Kérjük próbálja meg később!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      timeSlot: "Délelőtt (9:00 - 12:00)",
      note: "",
    });
  };

  return (
    <section
      id="kalkulator"
      className="py-20 md:py-28 bg-[#2C4295] relative overflow-hidden text-white"
    >
      {/* Background Ambience / Subtle Brand Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F28C48]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 md:mb-6">
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white font-semibold text-xs uppercase tracking-widest mb-3.5"
          >
            Interaktív 3D Tervező
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-[1.15] mb-4"
          >
            Tervezze meg saját medencefedését
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Állítsa be a méreteket, tesztelje a nyitási és zárási folyamatot
            valós időben, és kérjen közvetlenül ajánlatot vagy visszahívást!
          </p>
        </div>
      </div>

      {/* ══ 100% FULL-WIDTH 3D VIEWPORT (EDGE-TO-EDGE ON BOTH MOBILE & DESKTOP) ════ */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[540px] lg:h-[640px] flex items-center justify-center my-1 select-none">
        {/* 🌟 Luminous circular halo peeking out from behind the pool model into the navy background 🌟 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] md:w-[720px] md:h-[720px] lg:w-[900px] lg:h-[900px] rounded-full bg-sky-300/20 blur-[95px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full bg-white/20 blur-[65px] pointer-events-none" />

        {/* Floating Dimension Pill over 3D model */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-2 rounded-full text-xs font-semibold text-white shadow-sm border-none pointer-events-none w-[80%] max-w-sm justify-center m-auto">
          <span className="w-2 h-2 rounded-full bg-[#F28C48] animate-pulse flex-shrink-0" />
          <span
            className="min-w-fit"
            style={{ fontFamily: "Gotham, sans-serif" }}
          >
            {Number(width).toFixed(1)} m × {Number(length).toFixed(1)} m
          </span>
          <span className="text-white/40">•</span>
          <span
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-[#F28C48] min-w-fit"
          >
            {coverProgress}% bezárva
          </span>
        </div>

        {/* 3D Canvas directly floating on seamless navy background */}
        <div className="w-full h-full relative z-10">
          <Scene3D
            poolWidth={Number(width)}
            poolLength={Number(length)}
            coverState={Number(coverProgress)}
            color={color}
          />
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ══ SLIDERS AROUND THE 3D VIEW: COMPACT 2X2 GRID ON MOBILE, AIRY ON DESKTOP ══════════ */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mt-2 mb-10">
          {/* 1. Width Slider */}
          <div className="bg-white/[0.08] backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border-none flex flex-col justify-center">
            <div
              style={{ fontFamily: "Gotham, sans-serif" }}
              className="flex justify-between items-center text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2 text-white/90"
            >
              <span>Szélesség</span>
              <span className="text-xs sm:text-sm font-bold text-white bg-white/15 px-1.5 sm:px-2.5 py-0.5 rounded-md">
                {Number(width).toFixed(1)} m
              </span>
            </div>
            <input
              type="range"
              min="2.5"
              max="6.0"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
              className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F28C48]"
            />
            <div className="flex justify-between text-[9px] sm:text-[10px] text-white/50 mt-1 font-light">
              <span>2.5 m</span>
              <span>6.0 m</span>
            </div>
          </div>

          {/* 2. Length Slider */}
          <div className="bg-white/[0.08] backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border-none flex flex-col justify-center">
            <div
              style={{ fontFamily: "Gotham, sans-serif" }}
              className="flex justify-between items-center text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2 text-white/90"
            >
              <span>Hosszúság</span>
              <span className="text-xs sm:text-sm font-bold text-white bg-white/15 px-1.5 sm:px-2.5 py-0.5 rounded-md">
                {Number(length).toFixed(1)} m
              </span>
            </div>
            <input
              type="range"
              min="4.5"
              max="14.0"
              step="0.1"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F28C48]"
            />
            <div className="flex justify-between text-[9px] sm:text-[10px] text-white/50 mt-1 font-light">
              <span>4.5 m</span>
              <span>14.0 m</span>
            </div>
          </div>

          {/* 3. Cover Closure Continuous Slider */}
          <div className="bg-white/[0.08] backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border-none flex flex-col justify-center">
            <div
              style={{ fontFamily: "Gotham, sans-serif" }}
              className="flex justify-between items-center text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2 text-white/90"
            >
              <span>Bezárás</span>
              <span className="text-xs sm:text-sm font-bold text-[#F28C48] bg-[#F28C48]/20 px-1.5 sm:px-2.5 py-0.5 rounded-md">
                {coverProgress}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={coverProgress}
              onChange={(e) => setCoverProgress(parseInt(e.target.value, 10))}
              className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F28C48]"
            />
            <div className="flex justify-between text-[9px] sm:text-[10px] text-white/50 mt-1 font-light">
              <span>Nyitott</span>
              <span>Zárt</span>
            </div>
          </div>

          {/* 4. Color Selection */}
          <div className="bg-white/[0.08] backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border-none flex flex-col justify-between">
            <span
              style={{ fontFamily: "Gotham, sans-serif" }}
              className="block text-[11px] sm:text-xs font-semibold text-white/90 mb-1.5 sm:mb-2"
            >
              Ponyva színe
            </span>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setColor("grey")}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[10.5px] sm:text-xs font-semibold transition-all cursor-pointer border-none ${
                  color === "grey"
                    ? "bg-white text-[#2C4295] shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#4B515D] flex-shrink-0" />
                <span>Antracit</span>
              </button>

              <button
                type="button"
                onClick={() => setColor("beige")}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[10.5px] sm:text-xs font-semibold transition-all cursor-pointer border-none ${
                  color === "beige"
                    ? "bg-white text-[#2C4295] shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6D7C3] border border-black/10 flex-shrink-0" />
                <span>Bézs</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══ LEAD ACTION FORM SECTION: AIRY & CLEAN ══════════════════════════ */}
        <div
          id="urlap"
          className="max-w-2xl mx-auto bg-white/[0.07] backdrop-blur-md rounded-3xl p-6 sm:p-10 border-none scroll-mt-28"
        >
          <div id="visszahivas" className="sr-only" />
          <div id="ajanlatkeres" className="sr-only" />
          {/* Tab Selector: Email vs Callback */}
          <div className="flex flex-col sm:flex-row rounded-2xl sm:rounded-full bg-black/20 p-1.5 sm:p-1 gap-1.5 sm:gap-0 mb-6 sm:mb-8 max-w-md mx-auto border-none">
            <button
              type="button"
              onClick={() => setFormMode("email")}
              className={`w-full sm:flex-1 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-none whitespace-nowrap ${
                formMode === "email"
                  ? "bg-white text-[#2C4295] shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <FiMail className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Ajánlatkérés e-mailben</span>
            </button>
            <button
              type="button"
              onClick={() => setFormMode("callback")}
              className={`w-full sm:flex-1 py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-none whitespace-nowrap ${
                formMode === "callback"
                  ? "bg-white text-[#2C4295] shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <FiPhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Visszahívás kérése</span>
            </button>
          </div>

          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#F28C48] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h4
                style={{ fontFamily: "'Active', cursive, sans-serif" }}
                className="text-2xl text-white font-normal mb-2"
              >
                Köszönjük megkeresését!
              </h4>
              <p
                style={{ fontFamily: "Gotham, sans-serif" }}
                className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto mb-6"
              >
                {formMode === "email"
                  ? `Rögzítettük a méreteket (${Number(width).toFixed(1)}m × ${Number(length).toFixed(1)}m). Szakértőnk hamarosan elküldi az ajánlatot a megadott e-mail címre.`
                  : `Visszahívási kérését rögzítettük (${formData.timeSlot}). Munkatársunk hamarosan keresni fogja a megadott telefonszámon.`}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors cursor-pointer border-none"
              >
                <FiRotateCw className="w-3.5 h-3.5" />
                <span>Új konfiguráció küldése</span>
              </button>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="calc-name"
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="block text-xs font-medium text-white/80 mb-1.5"
                  >
                    Teljes név *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                    <input
                      id="calc-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Kovács János"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F28C48] transition-all border-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="calc-phone"
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="block text-xs font-medium text-white/80 mb-1.5"
                  >
                    Telefonszám *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                    <input
                      id="calc-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+36 30 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F28C48] transition-all border-none"
                    />
                  </div>
                </div>
              </div>

              {/* Mode Specific Field */}
              {formMode === "email" ? (
                <div>
                  <label
                    htmlFor="calc-email"
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="block text-xs font-medium text-white/80 mb-1.5"
                  >
                    E-mail cím *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                    <input
                      id="calc-email"
                      type="email"
                      name="email"
                      required
                      placeholder="kovacs.janos@pelda.hu"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F28C48] transition-all border-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="calc-timeslot"
                    style={{ fontFamily: "Gotham, sans-serif" }}
                    className="block text-xs font-medium text-white/80 mb-1.5"
                  >
                    Mikor hívhatjuk? (Preferált idősáv)
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                    <select
                      id="calc-timeslot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F28C48] transition-all border-none cursor-pointer"
                    >
                      <option
                        value="Délelőtt (9:00 - 12:00)"
                        className="text-slate-900"
                      >
                        Délelőtt (9:00 - 12:00)
                      </option>
                      <option
                        value="Délután (12:00 - 17:00)"
                        className="text-slate-900"
                      >
                        Délután (12:00 - 17:00)
                      </option>
                      <option
                        value="Bármikor a mai napon"
                        className="text-slate-900"
                      >
                        Bármikor a mai napon
                      </option>
                    </select>
                  </div>
                </div>
              )}

              {/* Note */}
              <div>
                <label
                  htmlFor="calc-note"
                  style={{ fontFamily: "Gotham, sans-serif" }}
                  className="block text-xs font-medium text-white/80 mb-1.5"
                >
                  Megjegyzés vagy kérdés (opcionális)
                </label>
                <textarea
                  id="calc-note"
                  name="note"
                  rows="2"
                  placeholder="Pl. meglévő medencére szeretném, süllyesztett partkővel..."
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#F28C48] transition-all border-none resize-none"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-400/30 text-white text-xs font-medium text-center">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 py-3.5 px-6 rounded-xl bg-[#F28C48] hover:bg-[#e07936] text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : formMode === "email" ? (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Ajánlatkérés elküldése</span>
                  </>
                ) : (
                  <>
                    <FiPhoneCall className="w-4 h-4" />
                    <span>Visszahívás kérése</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-white/50 font-light mt-2">
                A beállított méreteket ({Number(width).toFixed(1)}m ×{" "}
                {Number(length).toFixed(1)}m) automatikusan csatoljuk.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
