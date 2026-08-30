export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-4">404 - Az oldal nem található</h2>
      <p className="text-slate-400 mb-6">A keresett oldal nem létezik vagy át lett helyezve.</p>
      <a
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-colors"
      >
        Vissza a főoldalra
      </a>
    </div>
  );
}
