'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
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
      initials: 'VZ',
    },
    {
      name: 'Horváth Andrea & Tamás',
      location: 'Siófok',
      pool: '8 × 4m medence',
      quote:
        'Két kisgyermekünk és egy labrador kutyánk van, így az elsődleges szempont a biztonság volt. A Poolzip-en a kutyus is simán átsétált, egy millimétert sem süllyedt meg. Nyugodt szívvel engedjük ki őket a kertbe.',
      rating: 5,
      highlight: '100% Családi biztonság',
      initials: 'HA',
    },
    {
      name: 'Kovács Bence',
      location: 'Budapest, XII. kerület',
      pool: '10 × 3.5m feszített víztükrű',
      quote:
        'A minimál építészeti stílushoz kerestünk kompromisszummentes fedést. A rejtett sínek és az antracit szín pontosan illeszkednek a kőburkolathoz. Az automata vezérlés pedig rendkívül csendes.',
      rating: 5,
      highlight: 'Minimál, letisztult dizájn',
      initials: 'KB',
    },
  ];

  return (
    <section id="velemenyek" className="py-24 md:py-32 bg-[#F8FCFE] relative overflow-hidden text-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFE8FC]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#F28C48]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div
            style={{ fontFamily: 'Gotham, sans-serif' }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF6FE] text-[#2C4295] font-semibold text-xs uppercase tracking-widest mb-3.5 border-none"
          >
            Ügyfeleink Tapasztalatai
          </div>
          <h2
            style={{ fontFamily: "'Louvette Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C4295] font-semibold leading-[1.15] mb-4"
          >
            Akik már a Poolzip <br className="hidden sm:inline" />
            nyugalmát választották
          </h2>
          <p
            style={{ fontFamily: 'Gotham, sans-serif' }}
            className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Valós visszajelzések medencetulajdonosoktól, akik nem kötöttek kompromisszumot az esztétika és a biztonság között.
          </p>
        </div>

        {/* 3 Review Cards: Borderless, open, airy white cards with soft luminous shadow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_40px_-8px_rgba(36,68,145,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(36,68,145,0.14)] border-none group"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-[#F28C48] text-[#F28C48]"
                      />
                    ))}
                  </div>
                  <span
                    style={{ fontFamily: 'Gotham, sans-serif' }}
                    className="text-[11px] font-semibold text-[#2C4295] bg-[#EBF6FE] px-2.5 py-0.5 rounded-full flex items-center gap-1 border-none"
                  >
                    <MdOutlineVerified className="w-3.5 h-3.5 text-[#F28C48]" />
                    Ellenőrzött vásárló
                  </span>
                </div>

                {/* Highlight Tag */}
                <div
                  style={{ fontFamily: "'Active', cursive, sans-serif" }}
                  className="text-2xl text-[#F28C48] font-normal mb-3"
                >
                  {item.highlight}
                </div>

                {/* Quote */}
                <p
                  style={{ fontFamily: 'Gotham, sans-serif' }}
                  className="text-sm sm:text-[15px] text-slate-600 leading-relaxed italic mb-8 font-light"
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EBF6FE] text-[#2C4295] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: 'Gotham, sans-serif' }}
                      className="font-semibold text-slate-900 text-sm"
                    >
                      {item.name}
                    </div>
                    <div
                      style={{ fontFamily: 'Gotham, sans-serif' }}
                      className="text-xs text-slate-400 font-light"
                    >
                      {item.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    style={{ fontFamily: 'Gotham, sans-serif' }}
                    className="text-[11px] font-medium text-[#2C4295] bg-[#EBF6FE] px-2.5 py-1 rounded-lg inline-block"
                  >
                    {item.pool}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
