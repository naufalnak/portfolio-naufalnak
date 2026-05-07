import { personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0D1B2A",
        borderTop: "1px solid rgba(47,164,215,0.12)",
      }}>
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#2FA4D7" }}
          />
          <span className="font-mono text-xs" style={{ color: "#8BA8C4" }}>
            {personal.name} © {new Date().getFullYear()}
          </span>
        </div>
        <p
          className="font-mono text-xs"
          style={{ color: "rgba(139,168,196,0.3)" }}>
          React · Vite · Tailwind
          <span style={{ color: "#2FA4D7", margin: "0 0.5rem" }}>·</span>
          Minimal Tech
        </p>
      </div>
    </footer>
  );
}
