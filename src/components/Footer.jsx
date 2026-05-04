import { personal } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-400">
          <span className="text-cyan-500/60">&lt;</span>
          {personal.name}
          <span className="text-cyan-500/60">/&gt;</span> © {year}
        </p>
        <p className="font-mono text-xs text-slate-700">
          Built with React + Vite + Tailwind
          <span className="text-cyan-500/40 mx-2">//</span>
          <span className="text-cyan-500/60">Futuristic Edition</span>
        </p>
      </div>
    </footer>
  );
}
