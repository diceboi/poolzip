'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Valóban elbír 150 kg/m² súlyt a Poolzip fedés?',
      a: 'Igen! A speciális, nagy szakítószilárdságú kompozit szövet és az oldalsó zip vezetősínek rendszere olyan feszességet hoz létre, amely megakadályozza a benyomódást vagy megereszkedést. Felnőtt ember, több gyermek és háziállatok is biztonságosan ráléphetnek a felületre anélkül, hogy az a vízbe merülne.',
    },
    {
      q: 'Hogyan bírja a téli fagyokat és a hóterhelést?',
      a: 'A Poolzip fedés 4 évszakos megoldás. A membrán -30°C és +70°C között formatartó, UV-stabil és fagyálló. Téli időszakban megvédi a medencét a hó és a jég közvetlen bejutásától, valamint a szennyeződésektől, így a tavaszi medencenyitás jelentősen kevesebb munkával és költséggel jár.',
    },
    {
      q: 'Már meglévő, megépült medencére is utólag telepíthető?',
      a: 'Természetesen! A rendszer mind új építésű, mind meglévő medencékhez ideális. A sínpálya minimális magasságú (diszkrét lapos profil), így közvetlenül a meglévő kő-, fa- vagy wpc-burkolatra is rögzíthető.',
    },
    {
      q: 'Mennyi időt vesz igénybe a helyszíni telepítés?',
      a: 'A pontos gyártási folyamat (kb. 3-4 hét) után a helyszíni szerelés és a motoros beüzemelés általában mindössze 1-2 munkanapot vesz igénybe, anélkül hogy a kertben jelentős bontási munkálatokat kellene végezni.',
    },
    {
      q: 'Milyen karbantartást igényel a rendszer?',
      a: 'Rendkívül minimálisat. Mivel a felülete hermetikusan feszes, a ráhulló port vagy faleveleket egyszerű kerti slaggal vagy lombfúvóval könnyedén el lehet távolítani. Nincsenek nehezen hozzáférhető lamellarések vagy mattuló cellák.',
    },
  ];

  return (
    <section id="gyik" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider mb-4">
            Gyakran Ismételt Kérdések
          </div>
          <h2 className="fluid-section-title font-extrabold text-primary mb-4">
            Minden, amit a Poolzip <br className="hidden sm:inline" />
            <span className="text-slate-900">fedésről tudni érdemes</span>
          </h2>
          <p className="fluid-subtitle text-slate-600">
            Kérdése merült fel? Összegyűjtöttük a legfontosabb technikai és használati tudnivalókat.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <FiChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
