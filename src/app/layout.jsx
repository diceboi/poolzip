import { Plus_Jakarta_Sans } from 'next/font/google';
import ZipperLoader from '@/components/ZipperLoader';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Poolzip | Prémium Medencefedés Kompromisszumok Nélkül',
  description: 'A letisztult elegancia, a kristálytiszta víz és a maximális családi biztonság találkozása. Prémium járható medencefedés akár 150 kg/m² teherbírással.',
  keywords: 'medencefedés, prémium medencefedés, járható medencefedés, biztonsági medencefedés, medence kalkulátor, poolzip',
  openGraph: {
    title: 'Poolzip | Prémium Medencefedés Kompromisszumok Nélkül',
    description: 'A letisztult elegancia, a kristálytiszta víz és a maximális családi biztonság találkozása.',
    type: 'website',
    locale: 'hu_HU',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-slate-800 selection:bg-accent selection:text-white">
        <ZipperLoader />
        {children}
      </body>
    </html>
  );
}
