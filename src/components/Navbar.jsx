import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActive(links[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b2a]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span
              className="w-2 h-2 rounded-full bg-[#e8390e] group-hover:scale-125 transition-transform"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="font-display font-semibold text-sm tracking-wide"
              style={{ color: "var(--ink)" }}>
              {personal.firstName.toLowerCase()}
              <span style={{ color: "var(--accent)" }}>.</span>
              {personal.lastName.toLowerCase()}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="font-mono text-xs tracking-widest uppercase transition-colors link-underline"
                style={{
                  color:
                    active === link.id ? "var(--accent)" : "var(--ink-400)",
                }}>
                {link.label}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              className="font-mono text-xs tracking-widest uppercase border px-4 py-2 transition-all"
              style={{
                borderColor: "var(--ink)",
                color: "var(--ink)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "#fafafa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink)";
              }}>
              Résumé
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Menu">
            <span
              className="block w-5 h-px bg-ink-700 transition-all"
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
                background: "var(--ink-300)",
              }}
            />
            <span
              className="block w-5 h-px transition-all"
              style={{
                background: "var(--ink-300)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-4px)"
                  : "none",
                background: "var(--ink-300)",
              }}
            />
          </button>
        </div>

        {/* Rule */}
        <div className="rule" />

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 bg-[#fafafa]"
          style={{ maxHeight: menuOpen ? "400px" : "0" }}>
          <div className="px-8 py-6 flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs tracking-widest uppercase"
                style={{
                  color:
                    active === link.id ? "var(--accent)" : "var(--ink-400)",
                }}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="rule" />
        </div>
      </header>
    </>
  );
}
