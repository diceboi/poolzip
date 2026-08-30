'use client';

import { motion } from 'framer-motion';
import { FiStar, FiCheck, FiShield } from 'react-icons/fi';
import { MdOutlineVerified } from 'react-icons/md';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Dr. Varga Zoltán',
      location: 'Telki',
      pool: '9 × 4.5m süllyesztett medence',
      quote:
        'A korábbi polikarbonát fedésünk után a Poolzip egy teljesen más dimenzió. Végre látjuk a kertet a nappaliból, a víz pedig kristálytiszta marad anélkül, hogy a faleveleket kellene halászni minden nyitás után.',
      rating: 5,
      highlight: 'Megmaradt a kerti panoráma',
    },
    {
      name: 'Horváth Andrea & Tamás',
      location: 'Siófok',
      pool: '8 × 4m medence',
      quote:
        'Két kisgyermekünk és egy labrador kutyánk van, így az elsődleges szempont a biztonság volt. A Poolzip-en a kutyus is simán átsétált, egy millimétert sem süllyedt meg. Nyugodt szívvel engedjük ki őket a kertbe.',
      rating: 5,
      highlight: '100% Családi biztonság',
    },
    {
      name: 'Kovács Bence',
      location: 'Budapest, XII. kerület',
      pool: '10 × 3.5m feszített víztükrű',
      quote:
        'A minimál építészeti stílushoz kerestünk kompromisszummentes fedést. A rejtett sínek és az antracit szín pontosan illeszkednek a kőburkolathoz. Az automata vezérlés pedig rendkívül csendes.',
      rating: 5,
      highlight: 'Minimál, letisztult dizájn',
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider mb-4">
            Ügyfeleink Tapasztalatai
          </div>
          <h2 className="fluid-section-title font-extrabold text-primary mb-4">
            Akik már a Poolzip <br className="hidden sm:inline" />
            <span className="text-slate-900">nyugalmát választották</span>
          </h2>
          <p className="fluid-subtitle text-slate-600">
            Valós visszajelzések medencetulajdonosoktól, akik nem kötöttek kompromisszumot az esztétika és a biztonság között.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between shadow-card-soft hover:shadow-card-hover transition-all duration-300"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MdOutlineVerified className="w-3.5 h-3.5" /> Ellenőrzött vásárló
                  </span>
                </div>

                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {item.highlight}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-medium text-primary">{item.pool}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
