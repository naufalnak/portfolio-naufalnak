import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ─── inline styles ─── */
const S = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: "#0a0a0a",
    borderBottom: "3px solid #0a0a0a",
    fontFamily: "'DM Mono', 'Fira Mono', monospace",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    padding: "0 48px",
  },
  logo: {
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    fontSize: 20,
    fontWeight: 900,
    color: "#f0ee42",
    letterSpacing: "0.12em",
    textDecoration: "none",
  },
  navLinks: { display: "flex", alignItems: "center", gap: 0 },
  navLink: (active) => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    textDecoration: "none",
    height: 56,
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    borderLeft: "1px solid #1a1a1a",
    color: active ? "#f0ee42" : "#666",
    background: active ? "#111" : "transparent",
    transition: "color 0.18s, background 0.18s",
  }),
  badge: {
    background: "#f0ee42",
    color: "#0a0a0a",
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "7px 16px",
    borderLeft: "1px solid #1a1a1a",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 7,
    height: 56,
  },
  availDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#5adb8a",
    animation: "nbPulse 2s ease-in-out infinite",
  },

  /* mobile burger */
  burger: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
  },
  burgerLine: (open, i) => ({
    display: "block",
    width: 22,
    height: 2,
    background: "#f0ee42",
    transition: "transform 0.2s, opacity 0.2s",
    transform:
      i === 0 && open
        ? "rotate(45deg) translateY(7px)"
        : i === 2 && open
          ? "rotate(-45deg) translateY(-7px)"
          : "none",
    opacity: i === 1 && open ? 0 : 1,
  }),

  /* mobile drawer */
  drawer: (open) => ({
    overflow: "hidden",
    maxHeight: open ? 400 : 0,
    transition: "max-height 0.3s ease",
    background: "#0a0a0a",
    borderTop: open ? "2px solid #1a1a1a" : "none",
  }),
  drawerInner: {
    padding: "20px 28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  drawerLink: (active) => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: active ? "#f0ee42" : "#555",
    borderBottom: "1px solid #1a1a1a",
    padding: "14px 0",
    transition: "color 0.15s",
  }),
  drawerBadge: {
    marginTop: 16,
    background: "#f0ee42",
    color: "#0a0a0a",
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "fit-content",
  },
};

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(links[i].id);
          return;
        }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* inject pulse keyframe once */
  useEffect(() => {
    if (document.getElementById("nb-navbar-style")) return;
    const st = document.createElement("style");
    st.id = "nb-navbar-style";
    st.textContent = `
      @keyframes nbPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
      @media(max-width:768px){ .nb-desktop{display:none!important} }
      @media(min-width:769px){ .nb-mobile{display:none!important} }
    `;
    document.head.appendChild(st);
  }, []);

  return (
    <header style={S.header}>
      {/* ── Desktop bar ── */}
      <div style={S.inner}>
        {/* Logo */}
        <a href="#hero" style={S.logo}>
          NAK_
        </a>

        {/* Nav links — desktop */}
        <nav className="nb-desktop" style={S.navLinks}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={S.navLink(active === link.id)}
              onMouseEnter={(e) => {
                if (active !== link.id) e.currentTarget.style.color = "#f0ee42";
              }}
              onMouseLeave={(e) => {
                if (active !== link.id) e.currentTarget.style.color = "#666";
              }}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Open-to-work badge — desktop */}
        <div className="nb-desktop" style={S.badge}>
          <span style={S.availDot} />
          Open to work
        </div>

        {/* Burger — mobile */}
        <button
          className="nb-mobile"
          style={S.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu">
          {[0, 1, 2].map((i) => (
            <span key={i} style={S.burgerLine(menuOpen, i)} />
          ))}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div className="nb-mobile" style={S.drawer(menuOpen)}>
        <div style={S.drawerInner}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={S.drawerLink(active === link.id)}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div style={S.drawerBadge}>
            <span style={S.availDot} />
            Open to work
          </div>
        </div>
      </div>
    </header>
  );
}
