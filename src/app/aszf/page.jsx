import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiHome, FiChevronRight, FiAlertTriangle, FiShield, FiTool, FiCheckCircle } from 'react-icons/fi';

export const metadata = {
  title: 'Általános Szerződési Feltételek (ÁSZF) | Poolzip Prémium Medencefedés',
  description: 'A Poolzip.hu Általános Szerződési Feltételei (ÁSZF). Egyedi gyártású medencefedések megrendelése, helyszíni beépítés, fizetés, 10 év garancia és elállási szabályok.',
};

export default function AszfPage() {
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
            <span className="text-[#F28C48]">Általános Szerződési Feltételek</span>
          </nav>

          <h1
            style={{ fontFamily: 'Gotham, sans-serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          >
            Általános Szerződési Feltételek (ÁSZF)
          </h1>
          <p className="text-secondary/80 text-sm sm:text-base max-w-2xl mx-auto">
            Egyedi tervezésű és gyártású prémium biztonsági medencefedések értékesítésére, helyszíni telepítésére és garanciális szolgáltatásaira.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24 w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 sm:p-12 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* Quick Notice Badge */}
          <div className="mb-10 p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
            <FiAlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">Egyedi gyártású prémium termékek</strong>
              A Poolzip medencefedések minden esetben a Megrendelő medencéjének pontos egyedi méreteire és igényeire szabva készülnek. A weboldali 3D kalkulátor indikatív becslést ad; a szerződéskötés írásbeli felmérést és egyedi megrendelést követően jön létre.
            </div>
          </div>

          {/* 1. Szolgáltató adatai */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                1
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                A Vállalkozó (Szolgáltató) Adatai
              </h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <div><strong className="text-slate-900">Cégnév:</strong> Poolzip Hungary Kft.</div>
              <div><strong className="text-slate-900">Székhely:</strong> [Irányítószám, Város, Utca, Házszám]</div>
              <div><strong className="text-slate-900">Cégjegyzékszám:</strong> [00-00-000000]</div>
              <div><strong className="text-slate-900">Adószám:</strong> [00000000-0-00]</div>
              <div><strong className="text-slate-900">Bankszámlaszám:</strong> [00000000-00000000-00000000]</div>
              <div><strong className="text-slate-900">Képviselő:</strong> [Ügyvezető neve]</div>
              <div><strong className="text-slate-900">E-mail:</strong> <a href="mailto:info@poolzip.hu" className="text-primary font-medium hover:underline">info@poolzip.hu</a></div>
              <div><strong className="text-slate-900">Telefonszám:</strong> +36 (30) 123 4567</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
              <strong>Tárhelyszolgáltatók:</strong> Vercel Inc. (Alkalmazás-kiszolgálás, 440 N Barranca Ave #4133, Covina, CA 91723, USA) és Rackhost Zrt. (Domain és DNS, 6722 Szeged, Tisza Lajos krt. 41., Cg.: 06-10-001004).
            </div>
          </section>

          {/* 2. Szerződéskötés menete */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                2
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                A Megrendelés és a Szerződéskötés Menete
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                <strong>2.1. Online Kalkuláció:</strong> A weboldalon található 3D konfigurátor tájékoztató jellegű számítási modellt biztosít, amely a Polgári Törvénykönyv (Ptk.) értelmében nem minősül közvetlen vásárlási ajánlattételnek.
              </p>
              <p>
                <strong>2.2. Ajánlatkérés és Műszaki Egyeztetés:</strong> Az űrlap elküldését követően szakértő munkatársunk felveszi Önnel a kapcsolatot, szükség esetén helyszíni felmérést végez a pontos fogadófelület és geometriai méretek ellenőrzésére.
              </p>
              <p>
                <strong>2.3. Végleges Árajánlat és Szerződés:</strong> A Vállalkozó részletes írásos árajánlatot ad ki. A vállalkozási szerződés az írásos ajánlat elfogadásával (aláírással vagy e-mailes írásbeli visszaigazolással) és az előlegszámla szerinti gyártási előleg megfizetésével jön létre.
              </p>
            </div>
          </section>

          {/* 3. Árak és fizetési feltételek */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                3
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Árak és Fizetési Feltételek
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>3.1. Árak:</strong> Az írásos ajánlatban feltüntetett összegek magyar forintban (HUF) értendők, és egyértelműen tartalmazzák a nettó árat, az érvényes áfát (bruttó ár), valamint a szállítási és beépítési díjat.
              </p>
              <p>
                <strong>3.2. Fizetési ütemezés:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Gyártási előleg (40–50%):</strong> A szerződéskötést követően, a gyártási folyamat megindításának feltételeként díjbekérő / előlegszámla alapján banki átutalással fizetendő.</li>
                <li><strong>Fennmaradó összeg (végszámla):</strong> A helyszíni beépítést, sikeres próbát és az átadás-átvételi jegyzőkönyv aláírását követően azonnal esedékes.</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                A legyártott és beépített medencefedési szerkezet a vételár teljes és hiánytalan kiegyenlítéséig a Vállalkozó tulajdonát képezi (tulajdonjog-fenntartás).
              </p>
            </div>
          </section>

          {/* 4. Gyártás, beépítés, vis maior */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                4
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Gyártás, Helyszíni Telepítés és Kültéri Munkálatok
              </h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>4.1. Gyártási határidő:</strong> A gyártási idő az előleg beérkezésétől és a felmérési adatok rögzítésétől számított, egyedileg rögzített időtartam (általában 3–6 hét a szezontól függően).
              </p>
              <p>
                <strong>4.2. Munkaterület biztosítása:</strong> A Megrendelő köteles a telepítés napján a medence környezetét megközelíthető, akadálymentes állapotban átadni, valamint 230V-os elektromos áramvételt biztosítani.
              </p>
              <p>
                <strong>4.3. Időjárás és Vis Maior:</strong> A beépítés kültéri technológia. Viharos szél, fagy vagy heves esőzés esetén a Vállalkozó a beépítés minősége és a munkavédelem érdekében jogosult a szerelést előre egyeztetett pótnapra halasztani.
              </p>
            </div>
          </section>

          {/* 5. Elállási jog kivétele */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-base">
                5
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Fogyasztói Elállási Jog (Törvényi Kizárás Egyedi Gyártásnál)
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-sm mb-4">
              <p className="font-semibold text-slate-900 mb-2">
                Jogszabályi hivatkozás: A fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm. rendelet 29. § (1) bekezdés c) pontja:
              </p>
              <blockquote className="italic border-l-4 border-amber-500 pl-3 py-1 text-slate-700 mb-3 bg-white/60 rounded-r-lg">
                „A fogyasztó nem gyakorolhatja a 14 napos indokolás nélküli elállási jogát olyan nem előre gyártott termék esetében, amelyet a fogyasztó utasítása alapján vagy kifejezett kérésére állítottak elő, illetve amelyet egyértelműen a fogyasztó személyére szabtak.”
              </blockquote>
              <p className="text-slate-700">
                Mivel a Poolzip rendszerek <strong>egyedi méretre, milliméteres pontossággal a Megrendelő medencéjéhez készülnek</strong>, a gyártás megkezdését követően a Megrendelőt nem illeti meg az indokolás nélküli elállási jog.
              </p>
            </div>
          </section>

          {/* 6. Garancia és jótállás */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-[#F28C48]/10 text-accent flex items-center justify-center font-bold text-base">
                6
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                10 Éves Gyártói Garancia és Jótállás
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block mb-1">10 Év Prémium Gyártói Garancia:</strong>
                A Vállalkozó a szerkezeti elemekre (alumínium vázprofilok, járható lépésálló teherhordó elemek és hermetikus zárószerkezet) rendeltetésszerű használat mellett 10 év gyártói garanciát vállal.
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block mb-1">Rendeltetésszerű használat követelményei:</strong>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-1">
                  <li>A teherbírás garantáltan eléri a <strong>150 kg/m²</strong>-t felnőttek és gyermekek védelmében.</li>
                  <li>A fedésről a medencébe fejest ugrani, illetve azon járművel áthajtani tilos.</li>
                  <li>A zárómechanikát tisztán és kavicsmentesen kell tartani a mellékelt Karbantartási Útmutató szerint.</li>
                </ul>
              </div>

              <p className="text-xs text-slate-500">
                A Vállalkozó a fogyasztói szerződések tekintetében a 151/2003. (IX. 22.) Korm. rendelet szerinti kötelező jótállást, valamint a Ptk. szerinti kellékszavatosságot szavatolja.
              </p>
            </div>
          </section>

          {/* 7. Panaszkezelés és békéltetés */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                7
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Panaszkezelés és Jogvita Rendezése
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Panaszait írásban az <a href="mailto:info@poolzip.hu" className="text-primary font-medium hover:underline">info@poolzip.hu</a> címen terjesztheti elő. A bejelentést 30 napon belül kivizsgáljuk.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm space-y-1 text-slate-600">
              <strong className="text-slate-900 block mb-1">Illetékes Békéltető Testület (Fogyasztóknak):</strong>
              <p>Budapesti Békéltető Testület</p>
              <p>Cím: 1016 Budapest, Krisztina krt. 99.</p>
              <p>Telefon: +36 (1) 488-2033 | E-mail: bekelteto.testulet@bkik.hu | Honlap: https://bekeltet.bkik.hu</p>
            </div>
          </section>

          {/* 8. Melléklet: Elállási / Felmondási nyilatkozatminta */}
          <section className="mb-10 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base">
                8
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                1. Melléklet: Elállási / Felmondási Nyilatkozatminta
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              (Csak a szerződéstől való elállási / felmondási szándék esetén töltse ki és juttassa vissza a 45/2014. (II. 26.) Korm. rendelet előírásai szerint, amennyiben az elállási jog feltételei fennállnak a gyártás megkezdését megelőzően.)
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 font-mono text-xs leading-relaxed text-slate-700 space-y-2 select-all">
              <p><strong>Címzett:</strong> Poolzip Hungary Kft.</p>
              <p><strong>Székhely:</strong> [Irányítószám, Város, Utca, Házszám]</p>
              <p><strong>E-mail:</strong> info@poolzip.hu</p>
              <hr className="my-2 border-slate-200" />
              <p>Alulírott(ak) kijelentem/kijelentjük, hogy gyakorlom/gyakoroljuk elállási/felmondási jogomat/jogunkat az alábbi szolgáltatás vagy termék tekintetében:</p>
              <p>Szerződéskötés időpontja: [ .............................. ]</p>
              <p>Megrendelés száma / árajánlat azonosítója: [ .............................. ]</p>
              <p>A fogyasztó(k) neve: [ .................................................... ]</p>
              <p>A fogyasztó(k) címe: [ .................................................... ]</p>
              <p>A fogyasztó(k) aláírása: [ ................................................ ] (kizárólag papíron tett nyilatkozat esetén)</p>
              <p>Kelt: [ ................................................................ ]</p>
            </div>
          </section>

          {/* Bottom Card */}
          <div className="mt-12 p-6 rounded-2xl bg-secondary/20 border border-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Kérdése van a szerződéses feltételekről?</h4>
              <p className="text-xs text-slate-600 mt-0.5">Ügyfélszolgálatunk örömmel válaszol minden műszaki és jogi kérdésre.</p>
            </div>
            <a
              href="mailto:info@poolzip.hu"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex-shrink-0"
            >
              Kapcsolatfelvétel
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
