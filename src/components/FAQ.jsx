"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Valóban elbír 150 kg/m² súlyt a Poolzip fedés?",
      a: "Igen! A speciális, nagy szakítószilárdságú kompozit szövet és az oldalsó zip vezetősínek rendszere olyan feszességet hoz létre, amely megakadályozza a benyomódást vagy megereszkedést. Felnőtt ember, több gyermek és háziállatok is biztonságosan ráléphetnek a felületre anélkül, hogy az a vízbe merülne.",
    },
    {
      q: "Hogyan bírja a téli fagyokat és a hóterhelést?",
      a: "A Poolzip fedés 4 évszakos megoldás. A membrán -30°C és +70°C között formatartó, UV-stabil és fagyálló. Téli időszakban megvédi a medencét a hó és a jég közvetlen bejutásától, valamint a szennyeződésektől, így a tavaszi medencenyitás jelentősen kevesebb munkával és költséggel jár.",
    },
    {
      q: "Már meglévő, megépült medencére is utólag telepíthető?",
      a: "Természetesen! A rendszer mind új építésű, mind meglévő medencékhez ideális. A sínpálya minimális magasságú (diszkrét lapos profil), így közvetlenül a meglévő kő-, fa- vagy wpc-burkolatra is rögzíthető.",
    },
    {
      q: "Mennyi időt vesz igénybe a helyszíni telepítés?",
      a: "A pontos gyártási folyamat (kb. 3-4 hét) után a helyszíni szerelés és a motoros beüzemelés általában mindössze 1-2 munkanapot vesz igénybe, anélkül hogy a kertben jelentős bontási munkálatokat kellene végezni.",
    },
    {
      q: "Milyen karbantartást igényel a rendszer?",
      a: "Rendkívül minimálisat. Mivel a felülete hermetikusan feszes, a ráhulló port vagy faleveleket egyszerű kerti slaggal vagy lombfúvóval könnyedén el lehet távolítani. Nincsenek nehezen hozzáférhető lamellarések vagy mattuló cellák.",
    },
  ];

  return (
    <section
      id="gyik"
      className="py-24 md:py-32 bg-white relative overflow-hidden text-slate-800"
    >
      {/* Background Ambience / Subtle Brand Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#CFE8FC]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F28C48]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-18">
          <div
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6FE] text-[#2C4295] font-semibold text-xs uppercase tracking-widest mb-3.5 border-none"
          >
            Gyakran Ismételt Kérdések
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C4295] font-semibold leading-[1.15] mb-4"
          >
            Minden, amit a Poolzip <br className="hidden sm:inline" />
            fedésről tudni érdemes
          </h2>
          <p
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Kérdése merült fel? Összegyűjtöttük a legfontosabb technikai és
            használati tudnivalókat.
          </p>
        </div>

        {/* Accordion List: Borderless, open, airy light items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border-none ${
                  isOpen
                    ? "bg-white shadow-[0_16px_40px_-8px_rgba(36,68,145,0.12)]"
                    : "bg-[#F8FCFE] hover:bg-[#F3FAFF] shadow-[0_4px_20px_rgba(36,68,145,0.03)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent"
                >
                  <span
                    style={{ fontFamily: "'Active', cursive, sans-serif" }}
                    className="text-2xl sm:text-3xl font-normal text-[#2C4295] pr-4 leading-snug tracking-wide"
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#F28C48] text-white rotate-180 shadow-md shadow-orange-500/30"
                        : "bg-[#EBF6FE] text-[#2C4295]"
                    }`}
                  >
                    <FiChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1">
                        <div className="pt-4 border-t border-slate-100">
                          <p
                            style={{ fontFamily: "Gotham, sans-serif" }}
                            className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-light"
                          >
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt box */}
        <div className="mt-12 text-center bg-[#EBF6FE] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-none shadow-sm">
          <div className="text-left">
            <h4
              style={{ fontFamily: "'Active', cursive, sans-serif" }}
              className="text-xl sm:text-2xl font-normal text-[#2C4295] mb-1"
            >
              Nem találta a választ kérdésére?
            </h4>
            <p
              style={{ fontFamily: "Gotham, sans-serif" }}
              className="text-xs sm:text-sm text-slate-600 font-light"
            >
              Szakértő kollégáink készséggel állnak rendelkezésére személyre
              szabott kérdésekben is.
            </p>
          </div>
          <a
            href="#visszahivas"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "#visszahivas";
              const el = document.getElementById("urlap");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{ fontFamily: "Gotham, sans-serif" }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F28C48] hover:bg-[#e07936] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all flex-shrink-0 cursor-pointer text-decoration-none"
          >
            <FiPhoneCall className="w-4 h-4" />
            <span>Visszahívás kérése</span>
          </a>
        </div>
      </div>
    </section>
  );
}
