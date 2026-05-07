import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      }}>
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo — kiri */}
        <a href="#home" className="flex items-center gap-2 group flex-shrink-0">
          <span
            className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
            style={{ background: "#2FA4D7" }}
          />
          <span
            className="font-display font-semibold text-sm tracking-wide"
            style={{ color: "#FFFFFF" }}>
            {personal.firstName.toLowerCase()}
            <span style={{ color: "#2FA4D7" }}>.</span>
            {personal.lastName.toLowerCase()}
          </span>
        </a>

        {/* Pill nav — tengah (desktop) */}
        <nav
          className="hidden md:flex items-center gap-1 absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(139,168,196,0.18)",
            borderRadius: "999px",
            padding: "6px 8px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                color: active === link.id ? "#0D1B2A" : "#8BA8C4",
                background: active === link.id ? "#2FA4D7" : "transparent",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (active !== link.id) e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                if (active !== link.id) e.currentTarget.style.color = "#8BA8C4";
              }}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button — kanan (desktop) */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all flex-shrink-0"
          style={{
            background: "#2FA4D7",
            color: "#0D1B2A",
            borderRadius: "999px",
            padding: "10px 20px",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2FA4D7";
          }}>
          Let's Talk
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H4M10 2V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Burger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((m) => !m)}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all"
              style={{
                background: "#FFFFFF",
                transform:
                  i === 0 && menuOpen
                    ? "rotate(45deg) translateY(4px)"
                    : i === 2 && menuOpen
                      ? "rotate(-45deg) translateY(-4px)"
                      : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(13,27,42,0.97)",
          backdropFilter: "blur(12px)",
        }}>
        <div className="px-8 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: active === link.id ? "#2FA4D7" : "#8BA8C4" }}>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mt-2"
            style={{
              background: "#2FA4D7",
              color: "#0D1B2A",
              borderRadius: "999px",
              padding: "10px 20px",
              width: "fit-content",
            }}>
            Let's Talk
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
