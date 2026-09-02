import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiHome, FiChevronRight, FiServer, FiShield, FiMail, FiPhone, FiMapPin, FiGlobe } from 'react-icons/fi';

export const metadata = {
  title: 'Impresszum | Poolzip Prémium Medencefedés',
  description: 'A Poolzip.hu hivatalos impresszuma az Eker tv. 4. §-a szerint. Szolgáltatói adatok, céginformációk és tárhelyszolgáltatók.',
};

export default function ImpresszumPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#101B42] via-[#1C2E6C] to-[#24377D] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3D57B8]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-[#D4EDFC]/80 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <FiHome className="w-3.5 h-3.5" />
              <span>Főoldal</span>
            </Link>
            <FiChevronRight className="w-3 h-3 text-[#D4EDFC]/50" />
            <span className="text-[#F28C48]">Impresszum</span>
          </nav>

          <h1
            style={{ fontFamily: 'Gotham, sans-serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          >
            Hivatalos Impresszum
          </h1>
          <p className="text-secondary/80 text-sm sm:text-base max-w-2xl mx-auto">
            A 2001. évi CVIII. törvény (Eker tv.) 4. §-a szerinti kötelező szolgáltatói és tárhelyszolgáltatói adatok.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24 w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 sm:p-12 text-slate-700">
          
          {/* 1. Szolgáltató adatai */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                A Szolgáltató (Üzemeltető) Adatai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Cégnév</span>
                <span className="font-bold text-slate-900 text-base">Poolzip Hungary Kft.</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Képviselő / Ügyvezető</span>
                <span className="font-semibold text-slate-900">[Képviseletre jogosult neve]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Székhely</span>
                <span className="font-medium text-slate-900">[Irányítószám, Település, Utca, Házszám]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Telephely / Iroda</span>
                <span className="font-medium text-slate-900">[Telephely címe vagy székhellyel megegyező]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Cégjegyzékszám</span>
                <span className="font-medium text-slate-900">[00-00-000000]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Nyilvántartó Cégbíróság</span>
                <span className="font-medium text-slate-900">[Illetékes Törvényszék Cégbírósága]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Adószám</span>
                <span className="font-medium text-slate-900">[00000000-0-00]</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Közösségi adószám (EU VAT)</span>
                <span className="font-medium text-slate-900">[HU00000000]</span>
              </div>
            </div>
          </section>

          {/* 2. Kapcsolattartás */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Közvetlen Kapcsolattartás és Ügyfélszolgálat
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/20 border border-secondary/30">
                <FiMail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">E-mail cím</div>
                  <a href="mailto:info@poolzip.hu" className="font-bold text-primary hover:underline">
                    info@poolzip.hu
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/20 border border-secondary/30">
                <FiPhone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Telefonszám</div>
                  <a href="tel:+36703730220" className="font-bold text-slate-900 hover:text-accent">
                    06 70 373 0220
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/20 border border-secondary/30">
                <FiGlobe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Hivatalos webcím</div>
                  <a href="https://poolzip.hu" className="font-bold text-slate-900">
                    https://poolzip.hu
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Ügyfélszolgálati elérhetőség: Hétfő – Péntek: 8:00 – 17:00
            </p>
          </section>

          {/* 3. Tárhelyszolgáltatók */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-[#F28C48]/10 text-accent flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Tárhelyszolgáltatók (Eker tv. 4. § h) pont)
              </h2>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Az információs társadalommal összefüggő szolgáltatások nyújtásához, a weboldal és a kapcsolódó rendszerek működtetéséhez a Szolgáltató az alábbi tárhely- és infrastruktúra-szolgáltatókat veszi igénybe:
            </p>

            <div className="space-y-6">
              {/* Vercel Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <FiServer className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-slate-900 text-lg">Vercel Inc.</h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    Globális Felhő & Webalkalmazás Hosting
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Székhely:</span> 440 N Barranca Ave #4133, Covina, CA 91723, USA
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Hivatalos weboldal:</span>{' '}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://vercel.com
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Adatvédelmi kapcsolat:</span> privacy@vercel.com
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Tevékenység:</span> A weboldal frontend és backend alkalmazáskiszolgálása, globális CDN gyorsítótár, SSL/TLS titkosítás.
                  </div>
                </div>
              </div>

              {/* Rackhost Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <FiServer className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-slate-900 text-lg">Rackhost Zrt.</h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-full">
                    Domain & DNS & E-mail Infrastruktúra
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Székhely:</span> 6722 Szeged, Tisza Lajos körút 41.
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Cégjegyzékszám:</span> 06-10-001004 (Szegedi Törvényszék Cégbírósága)
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Adószám:</span> 25333572-2-06
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Hivatalos weboldal:</span>{' '}
                    <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://www.rackhost.hu
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Központi e-mail:</span> info@rackhost.hu
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Telefonszám:</span> +36 1 445 1200
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-slate-800">Tevékenység:</span> A poolzip.hu domain regisztrációja, fenntartása, hazai DNS névszerver-infrastruktúra és hivatalos vállalati levelezés.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Kamara és felügyeleti szervek */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Kamarai Tagság és Hatósági Felügyelet
              </h2>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <FiShield className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span><strong>Illetékes gazdasági kamara:</strong> [Budapesti Kereskedelmi és Iparkamara (BKIK) / illetékes Vármegyei Kamara]</span>
              </li>
              <li className="flex items-start gap-2">
                <FiShield className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span><strong>Általános fogyasztóvédelmi felügyelet:</strong> Területileg illetékes Kormányhivatal Fogyasztóvédelmi Főosztálya.</span>
              </li>
              <li className="flex items-start gap-2">
                <FiShield className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span><strong>Adatvédelmi felügyeleti szerv:</strong> Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH, 1055 Budapest, Falk Miksa u. 9-11., www.naih.hu).</span>
              </li>
            </ul>
          </section>

          {/* 5. Szerzői jogi nyilatkozat */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                5
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Szerzői Jogi Védelem (Copyright)
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              A <strong>poolzip.hu</strong> weboldalon közzétett valamennyi tartalom – ideértve, de nem kizárólagosan a szöveges leírásokat, grafikai elemeket, fotókat, 3D modelleket, animációkat, a weboldal forráskódját és a „Poolzip” márkajelzést – a Poolzip Hungary Kft. szellemi tulajdonát képezi, és a szerzői jogról szóló 1999. évi LXXVI. törvény védelme alatt áll.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              A weboldal tartalmának engedély nélküli másolása, átdolgozása, kereskedelmi célú felhasználása vagy újraközlése szigorúan tilos és jogi eljárást von maga után.
            </p>
          </section>

          {/* Contact help box */}
          <div className="mt-12 p-6 rounded-2xl bg-secondary/20 border border-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Kérdése vagy hivatalos észrevétele van?</h4>
              <p className="text-xs text-slate-600 mt-0.5">Ügyfélszolgálatunk munkanapokon készséggel áll rendelkezésére.</p>
            </div>
            <a
              href="mailto:info@poolzip.hu"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex-shrink-0"
            >
              Írjon nekünk
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
