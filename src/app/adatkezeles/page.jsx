import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiHome, FiChevronRight, FiShield, FiLock, FiServer, FiFileText, FiAlertCircle } from 'react-icons/fi';

export const metadata = {
  title: 'Adatkezelési Tájékoztató | Poolzip Prémium Medencefedés',
  description: 'A Poolzip.hu hivatalos EU GDPR és magyar Infotv. kompatibilis adatkezelési tájékoztatója. Adatkezelő, adatfeldolgozók (Vercel, Rackhost), érintetti jogok és jogorvoslat.',
};

export default function AdatkezelesPage() {
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
            <span className="text-[#F28C48]">Adatkezelési Tájékoztató</span>
          </nav>

          <h1
            style={{ fontFamily: 'Gotham, sans-serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          >
            Adatkezelési Tájékoztató
          </h1>
          <p className="text-secondary/80 text-sm sm:text-base max-w-2xl mx-auto">
            Tájékoztatás a személyes adatok kezeléséről a GDPR ((EU) 2016/679 rendelet) és az Infotv. (2011. évi CXII. tv.) alapján.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24 w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 sm:p-12 text-slate-700 leading-relaxed text-sm sm:text-base">

          {/* Quick Notice */}
          <div className="mb-10 p-5 rounded-2xl bg-secondary/15 border border-secondary/40 flex items-start gap-3.5">
            <FiShield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">Kiemelt adatvédelmi elkötelezettség</strong>
              A Poolzip elkötelezett a felhasználók és ügyfelek személyes adatainak védelme mellett. Nem végzünk profilalkotást, adatait nem értékesítjük, és kizárólag a medencefedési szolgáltatás teljesítéséhez, ajánlatadásához szükséges mértékben kezeljük azokat.
            </div>
          </div>

          {/* 1. Adatkezelő adatai */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                1
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Az Adatkezelő Adatai és Elérhetőségei
              </h2>
            </div>

            <p className="mb-4">
              A <strong>poolzip.hu</strong> weboldalon végzett adatkezelések tekintetében az Adatkezelő:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <div><strong className="text-slate-900">Cégnév:</strong> Poolzip Hungary Kft.</div>
              <div><strong className="text-slate-900">Székhely:</strong> [Irányítószám, Város, Utca, Házszám]</div>
              <div><strong className="text-slate-900">Cégjegyzékszám:</strong> [00-00-000000]</div>
              <div><strong className="text-slate-900">Adószám:</strong> [00000000-0-00]</div>
              <div><strong className="text-slate-900">Képviselő:</strong> [Ügyvezető neve]</div>
              <div><strong className="text-slate-900">E-mail:</strong> <a href="mailto:info@poolzip.hu" className="text-primary font-medium hover:underline">info@poolzip.hu</a></div>
              <div><strong className="text-slate-900">Telefon:</strong> +36 (30) 123 4567</div>
              <div><strong className="text-slate-900">Weboldal:</strong> https://poolzip.hu</div>
            </div>
            <p className="text-xs text-slate-500">
              Az Adatkezelő a GDPR 37. cikke alapján nem köteles adatvédelmi tisztviselő (DPO) kijelölésére.
            </p>
          </section>

          {/* 2. Adatkezelési alapelvek */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                2
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Alapelvek az Adatkezelés Során
              </h2>
            </div>
            <p className="mb-3">
              Az Adatkezelő a személyes adatokat a GDPR 5. cikkében foglalt elvek szerint kezeli:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li><strong>Jogszerűség, tisztességes eljárás és átláthatóság:</strong> Az adatokat jogszerűen, tisztességesen és az érintett számára átlátható módon kezeljük.</li>
              <li><strong>Célhoz kötöttség:</strong> Kizárólag meghatározott, egyértelmű és jogszerű célból történik adatgyűjtés.</li>
              <li><strong>Adattakarékosság:</strong> Csak a célok eléréséhez elengedhetetlenül szükséges adatokat kérjük be.</li>
              <li><strong>Pontosság:</strong> Minden észszerű intézkedést megteszünk a téves adatok késedelem nélküli helyesbítésére vagy törlésére.</li>
              <li><strong>Korlátozott tárolhatóság:</strong> Az adatokat csak a célok eléréséhez szükséges ideig tároljuk.</li>
              <li><strong>Integritás és bizalmas jelleg:</strong> Megfelelő technikai és szervezési intézkedésekkel (pl. SSL/TLS titkosítás) védjük az adatokat a jogosulatlan hozzáférés ellen.</li>
            </ul>
          </section>

          {/* 3. Részletes adatkezelési folyamatok */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                3
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Az Egyes Adatkezelések Részletezése
              </h2>
            </div>

            <div className="space-y-6 text-sm">
              {/* 3.1. 3D Árkalkulátor és ajánlatkérés */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3.1. Online 3D Árkalkuláció és Ajánlatkérés
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Cél:</strong> Testreszabott, pontos árajánlat kalkulálása és megküldése medencefedési rendszerekre.</p>
                  <p><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám, a medence méretei (hosszúság, szélesség, felület), választott kivitel/szín, felhasználói megjegyzés.</p>
                  <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bek. b) pont – <em>szerződés megkötését megelőző lépések megtétele az érintett kérésére</em>.</p>
                  <p><strong>Megőrzési idő:</strong> Amennyiben megrendelés nem történik, az ajánlatkéréstől számított 1 év (későbbi egyeztetés céljából), vagy az érintett törlési kérelméig.</p>
                </div>
              </div>

              {/* 3.2. Visszahívás kérése */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3.2. Visszahívás Kérése
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Cél:</strong> Szakmai egyeztetés, közvetlen telefonos tanácsadás a megadott időpontban.</p>
                  <p><strong>Kezelt adatok:</strong> Név, telefonszám, választott idősáv, kalkulált medenceméret.</p>
                  <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bek. b) pont (szerződéskötést megelőző lépés) és a) pont (önkéntes hozzájárulás).</p>
                  <p><strong>Megőrzési idő:</strong> A telefonos kapcsolatfelvételtől számított legfeljebb 6 hónap.</p>
                </div>
              </div>

              {/* 3.3. Szerződéskötés, kivitelezés, garancia */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3.3. Helyszíni Felmérés, Szerződéskötés, Telepítés és 10 Éves Garancia
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Cél:</strong> A vállalkozási szerződés megkötése, helyszíni méretvétel, a medencefedés legyártása, kiszállítása, beépítése, valamint a 10 éves gyártói garancia biztosítása.</p>
                  <p><strong>Kezelt adatok:</strong> Név, telepítési cím, számlázási cím, telefonszám, e-mail cím, szerződéses és műszaki specifikációk, aláírás.</p>
                  <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bek. b) pont – <em>szerződés teljesítése</em>, valamint c) pont (jogi kötelezettség, pl. jótállás).</p>
                  <p><strong>Megőrzési idő:</strong> A szerződés megszűnésétől, illetve a 10 éves garanciaidő lejártát követő általános polgári jogi elévülési idő (Ptk. alapján 5 év).</p>
                </div>
              </div>

              {/* 3.4. Számlázás */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3.4. Számlázás és Számviteli Kötelezettségek
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Cél:</strong> Törvényes számlakiállítás, számviteli bizonylatmegőrzés és adóhatósági adatszolgáltatás.</p>
                  <p><strong>Kezelt adatok:</strong> Név, számlázási cím, adószám (cégek esetén), fizetési adatok.</p>
                  <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bek. c) pont – <em>jogi kötelezettség teljesítése</em> (2000. évi C. törvény a számvitelről 169. § (2) bek.).</p>
                  <p><strong>Megőrzési idő:</strong> A számla kibocsátásától számított <strong>legalább 8 év</strong>.</p>
                </div>
              </div>

              {/* 3.5. Weboldal látogatás és szervernapló */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3.5. Szervernaplózás és Technikai Adatok
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Cél:</strong> A weboldal biztonságos, hibamentes működtetése, kiberbiztonsági incidensek megelőzése.</p>
                  <p><strong>Kezelt adatok:</strong> IP cím, a látogatás időpontja, böngésző típusa, megtekintett aloldal.</p>
                  <p><strong>Jogalap:</strong> GDPR 6. cikk (1) bek. f) pont – <em>jogos érdek</em> az IT-biztonság fenntartására.</p>
                  <p><strong>Megőrzési idő:</strong> A naplófájlok 30 napon belül automatikusan felülírásra/törlésre kerülnek.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Sütik (Cookies) */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                4
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Sütik (Cookie-k) Kezelése
              </h2>
            </div>
            <p className="mb-3 text-slate-600">
              Weboldalunk működéséhez és a felhasználói élmény biztosításához sütiket használunk:
            </p>
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong>Szükséges (munkamenet) sütik:</strong> A weboldal technikai működéséhez és a biztonsági funkciókhoz elengedhetetlenek (pl. űrlapok védelme, menüállapot). Nem kapcsolhatók ki. Jogalap: jogos érdek.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <strong>Statisztikai és elemző sütik:</strong> Segítségükkel megérthetjük a látogatók interakcióit az oldalon. Kizárólag az Érintett előzetes és kifejezett hozzájárulása esetén aktiválódnak.
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              A sütik bármikor törölhetők vagy letilthatók a böngésző beállításaiban.
            </p>
          </section>

          {/* 5. Adatfeldolgozók — Vercel & Rackhost kiemelten */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-[#F28C48]/10 text-accent flex items-center justify-center font-bold text-base">
                5
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Adatfeldolgozók és Külső Szolgáltatók
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Az Adatkezelő a szolgáltatások technikai biztosítása céljából megbízható partnereket (adatfeldolgozókat) vesz igénybe, akik kizárólag az Adatkezelő utasításai alapján járhatnak el:
            </p>

            <div className="space-y-4 text-sm">
              {/* Vercel Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <FiServer className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-slate-900">Vercel Inc. – Alkalmazás és Felhő Tárhelyszolgáltató</h3>
                </div>
                <p className="text-slate-600 mb-2">
                  <strong>Székhely:</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA | <strong>Weboldal:</strong> https://vercel.com | <strong>E-mail:</strong> privacy@vercel.com
                </p>
                <p className="text-slate-600 mb-2">
                  <strong>Feladat:</strong> A Next.js webalkalmazás globális kiszolgálása, szervernaplózás, CDN-hálózat és SSL titkosítás.
                </p>
                <p className="text-xs text-slate-500">
                  <strong>Adatvédelmi garanciák:</strong> A Vercel rendelkezik SOC 2 Type II tanúsítvánnyal, és az Európai Bizottság Általános Szerződési Feltételei (SCC), valamint az EU–US Data Privacy Framework alapján biztosítja az EU-s adatvédelmi szintet.
                </p>
              </div>

              {/* Rackhost Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <FiServer className="w-4 h-4 text-accent" />
                  <h3 className="font-bold text-slate-900">Rackhost Zrt. – Domain, DNS és E-mail Szolgáltató</h3>
                </div>
                <p className="text-slate-600 mb-2">
                  <strong>Székhely:</strong> 6722 Szeged, Tisza Lajos körút 41. | <strong>Cégjegyzékszám:</strong> 06-10-001004 | <strong>Adószám:</strong> 25333572-2-06 | <strong>Web:</strong> https://www.rackhost.hu | <strong>E-mail:</strong> info@rackhost.hu
                </p>
                <p className="text-slate-600">
                  <strong>Feladat:</strong> A poolzip.hu domain fenntartása, hazai DNS névszerver-infrastruktúra biztosítása és hivatalos vállalati e-mail fiókok működtetése Magyarországon található szerverközpontban.
                </p>
              </div>

              {/* Resend Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <FiFileText className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-slate-900">Resend Inc. – E-mail Kézbesítő Rendszer</h3>
                </div>
                <p className="text-slate-600 mb-2">
                  <strong>Székhely:</strong> 2261 Market Street #5039, San Francisco, CA 94114, USA | <strong>Web:</strong> https://resend.com
                </p>
                <p className="text-slate-600">
                  <strong>Feladat:</strong> Az online kalkulátoron keresztül beküldött árajánlatkérő és visszahívás-kérő űrlapok megbízható, titkosított eljuttatása az Adatkezelő részére.
                </p>
              </div>

              {/* Számlázás */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <FiLock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-slate-900">Számlázási és Pénzügyi Szolgáltató</h3>
                </div>
                <p className="text-slate-600">
                  Elektronikus számlázási rendszer és könyvelő iroda az adóügyi bizonylatok törvényes kiállítása és megőrzése céljából.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Érintetti jogok */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                6
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Az Érintettek Jogai (GDPR 15–22. cikk)
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Ön az alábbi jogokat gyakorolhatja az <a href="mailto:info@poolzip.hu" className="text-primary font-medium hover:underline">info@poolzip.hu</a> e-mail címre küldött nyilatkozatával:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>1. Hozzáférés joga:</strong> Tájékoztatást kérhet arról, hogy kezelünk-e Önre vonatkozó adatot, és hozzáférhet ezek másolatához.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>2. Helyesbítéshez való jog:</strong> Kérheti a pontatlan személyes adatok késedelem nélküli kijavítását.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>3. Törlés joga („elfeledtetés”):</strong> Kérheti adatainak törlését, ha a kezelés célja megszűnt (kivéve kötelező jogszabályi megőrzés, pl. számlák).
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>4. Korlátozás joga:</strong> Kérheti az adatok zárolását a pontosság vitatása vagy jogi eljárás idejére.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>5. Adathordozhatóság joga:</strong> Kérheti az adatok kiadását tagolt, széles körben használt, géppel olvasható formátumban.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>6. Tiltakozás joga:</strong> Bármikor tiltakozhat a jogos érdeken alapuló adatkezelés ellen.
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Az Adatkezelő a kérelem beérkezésétől számított <strong>legkésőbb 30 napon belül</strong> írásban és díjmentesen tájékoztatja az intézkedésekről.
            </p>
          </section>

          {/* 7. Jogorvoslat */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                7
              </div>
              <h2 style={{ fontFamily: 'Gotham, sans-serif' }} className="text-xl sm:text-2xl font-bold text-slate-900">
                Jogorvoslati Lehetőségek
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Amennyiben megítélése szerint a személyes adatok kezelése megsértette a hatályos jogszabályokat, kérjük, elsőként jelezze felénk az <a href="mailto:info@poolzip.hu" className="text-primary font-medium hover:underline">info@poolzip.hu</a> címen.
            </p>
            <div className="p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white mb-4 text-sm">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertCircle className="w-5 h-5 text-primary" />
                <strong className="text-slate-900 text-base">Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</strong>
              </div>
              <ul className="space-y-1 text-slate-600">
                <li><strong>Székhely:</strong> 1055 Budapest, Falk Miksa utca 9-11.</li>
                <li><strong>Levelezési cím:</strong> 1363 Budapest, Pf. 9.</li>
                <li><strong>Telefon:</strong> +36 (1) 391-1400</li>
                <li><strong>E-mail:</strong> <a href="mailto:ugyfelszolgalat@naih.hu" className="text-primary hover:underline">ugyfelszolgalat@naih.hu</a></li>
                <li><strong>Weboldal:</strong> <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://naih.hu</a></li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              Az érintett a jogainak megsértése esetén bírósághoz is fordulhat (a pert az érintett lakóhelye vagy tartózkodási helye szerinti Törvényszék előtt is megindíthatja).
            </p>
          </section>

          {/* Bottom Card */}
          <div className="mt-12 p-6 rounded-2xl bg-secondary/20 border border-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Adatvédelmi kérdése van?</h4>
              <p className="text-xs text-slate-600 mt-0.5">Forduljon hozzánk bizalommal, szívesen állunk rendelkezésére.</p>
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
