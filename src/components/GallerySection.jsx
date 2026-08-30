'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiEye } from 'react-icons/fi';
import { MdOutlinePool } from 'react-icons/md';

export default function GallerySection() {
  const slides = [
    {
      title: 'Modern Antracit Kivitel – Minimalista Villa',
      location: 'Budapest, II. kerület',
      tag: 'Antracit Szürke',
      aspect: '8 × 4 méteres medence',
      description: 'Diszkrét sötétszürke fedés, amely tökéletesen harmonizál a modern antracit nyílászárókkal és kőburkolattal.',
      bgGradient: 'from-slate-800 via-slate-700 to-slate-900',
      accentColor: '#F28C48',
    },
    {
      title: 'Elegáns Homok / Bézs – Mediterrán Kert',
      location: 'Balatonfüred',
      tag: 'Homok Bézs',
      aspect: '10 × 4 méteres medence',
      description: 'Lágy, meleg árnyalat, amely a természetes mészkő és fa teraszburkolatokhoz nyújt prémium illeszkedést.',
      bgGradient: 'from-amber-900/60 via-amber-800/40 to-slate-900',
      accentColor: '#D7C4B7',
    },
    {
      title: 'Lépésállósági & Biztonsági Megbízhatóság',
      location: 'Szentendre',
      tag: '150 kg/m² Teherbírás',
      aspect: 'Családi biztonság',
      description: 'A feszes zip membrán akár felnőttek és gyermekek egyidejű súlyát is biztonságosan megtartja.',
      bgGradient: 'from-blue-950 via-indigo-900/50 to-slate-900',
      accentColor: '#38bdf8',
    },
    {
      title: 'Rejtett Sínpálya & Süllyesztett Csévélő',
      location: 'Győr',
      tag: 'Minimál Részletek',
      aspect: 'Síkba simuló profil',
      description: 'A terasz szintjébe integrált alumínium vezetősín mezítláb is teljesen kényelmes és akadálymentes.',
      bgGradient: 'from-slate-900 via-sky-950 to-slate-900',
      accentColor: '#F28C48',
    },
  ];

  return (
    <section id="galeria" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider mb-4">
              Referenciák & Részletek
            </div>
            <h2 className="fluid-section-title font-extrabold text-primary">
              Valós beépítések és <br className="hidden sm:inline" />
              <span className="text-slate-900">stílusos színváltozatok</span>
            </h2>
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              id="swiper-prev-btn"
              aria-label="Előző kép"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-secondary/40 text-primary flex items-center justify-center transition-colors shadow-sm"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="swiper-next-btn"
              aria-label="Következő kép"
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-secondary/40 text-primary flex items-center justify-center transition-colors shadow-sm"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              1024: { slidesPerView: 2 },
            }}
            navigation={{
              prevEl: '#swiper-prev-btn',
              nextEl: '#swiper-next-btn',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-14"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="h-full rounded-3xl overflow-hidden border border-slate-100 bg-slate-900 shadow-card-soft flex flex-col group">
                  {/* Visual Image Screen */}
                  <div className={`relative aspect-[16/10] bg-gradient-to-tr ${slide.bgGradient} p-6 flex flex-col justify-between overflow-hidden`}>
                    {/* Visual pattern representation */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Top Tag Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-bold bg-white/90 text-slate-900 px-3 py-1.5 rounded-full shadow-sm">
                        {slide.tag}
                      </span>
                      <span className="text-xs font-semibold text-white/90 bg-slate-950/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {slide.aspect}
                      </span>
                    </div>

                    {/* Architectural Vector Visual of Pool */}
                    <div className="relative z-10 my-auto flex items-center justify-center py-4">
                      <div className="w-full max-w-xs h-28 rounded-xl border-2 border-white/20 relative overflow-hidden flex items-center justify-center shadow-lg bg-slate-950/40 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-cyan-600/30 flex items-center justify-center">
                          <span className="text-xs text-cyan-200 font-semibold tracking-wider uppercase">Tükörsima Vízfelület</span>
                        </div>
                        <div 
                          className="absolute inset-y-0 left-0 w-3/4 transition-all duration-700 group-hover:w-full flex items-center justify-center border-r-2 border-accent"
                          style={{
                            backgroundColor: slide.accentColor === '#D7C4B7' ? '#a8988b' : slide.accentColor === '#38bdf8' ? '#1e3a8a' : '#475569'
                          }}
                        >
                          <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded bg-black/40">
                            Poolzip Zárt Membrán
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Location Indicator */}
                    <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                      <span className="font-medium flex items-center gap-1.5">
                        <MdOutlinePool className="text-accent w-4 h-4" />
                        {slide.location}
                      </span>
                      <span className="text-[11px] text-slate-300">10 Év Garancia</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {slide.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Anyag: Prémium PVC-kompozit</span>
                      <span className="font-bold text-primary">Síkba süllyesztett sín</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
