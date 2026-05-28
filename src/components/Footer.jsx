import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: `https://github.com/${personal.github}` },
  { label: "LinkedIn", href: `https://linkedin.com/in/${personal.linkedin}` },
  { label: "Email", href: `mailto:${personal.email}` },
];

const TICKER_ITEMS = [
  "Node.js",
  "Kotlin",
  "Express.js",
  "PostgreSQL",
  "Jetpack Compose",
  "React",
  "Go",
  "REST API",
  "Prisma ORM",
  "Android",
];

/* ── breakpoint hook ── */
function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

export default function Footer() {
  const isMobile = useIsMobile();
  const year = new Date().getFullYear();
  const [topHover, setTopHover] = useState(false);

  /* inject ticker keyframe once */
  useEffect(() => {
    if (document.getElementById("nb-footer-kf")) return;
    const st = document.createElement("style");
    st.id = "nb-footer-kf";
    st.textContent = `
      @keyframes nbFooterTick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes nbPulseF { 0%,100%{opacity:1} 50%{opacity:.25} }
    `;
    document.head.appendChild(st);
  }, []);

  /* ── reusable link row ── */
  const NavLink = ({ label, href, arrow = "▶", external = false }) => {
    const [hov, setHov] = useState(false);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: MONO,
          fontSize: isMobile ? 12 : 11,
          color: hov ? "#f0ee42" : "#555",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: hov ? 14 : 8,
          padding: "5px 0",
          transition: "color .15s, gap .15s",
          borderBottom: isMobile ? "1px solid #1a1a1a" : "none",
        }}>
        <span style={{ color: "#2a2a2a", fontSize: 9, flexShrink: 0 }}>
          {arrow}
        </span>
        {label}
      </a>
    );
  };

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "3px solid #1a1a1a" }}>
      {/* ══ DESKTOP: 3 kolom ══ */}
      {!isMobile && (
        <div
          style={{
            borderBottom: "3px solid #1a1a1a",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            maxWidth: 1200,
            margin: "0 auto",
          }}>
          {/* col 1 — brand */}
          <div
            style={{ borderRight: "3px solid #1a1a1a", padding: "40px 40px" }}>
            <div
              style={{
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 10,
                color: "rgba(240,238,66,.25)",
                letterSpacing: ".15em",
                marginBottom: 8,
              }}>
              開発者
            </div>
            <div
              style={{
                fontFamily: COND,
                fontSize: 36,
                fontWeight: 900,
                color: "#f0ee42",
                letterSpacing: "-.02em",
                lineHeight: 1,
                marginBottom: 12,
              }}>
              {personal.name.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "#444",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}>
              {personal.role}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "#2a2a2a",
                letterSpacing: ".12em",
                lineHeight: 1.8,
              }}>
              // Building reliable systems,
              <br />
              // one commit at a time.
            </div>
          </div>

          {/* col 2 — nav */}
          <div
            style={{
              borderRight: "3px solid #1a1a1a",
              padding: "40px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "#333",
                letterSpacing: ".25em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              // Navigate
            </span>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} {...l} arrow="▶" />
            ))}
          </div>

          {/* col 3 — connect */}
          <div
            style={{
              padding: "40px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#333",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}>
                // Connect
              </span>
              {SOCIAL_LINKS.map((l) => (
                <NavLink key={l.label} {...l} arrow="→" external />
              ))}
            </div>
            {/* available badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                border: "2px solid #1a1a1a",
                width: "fit-content",
                marginTop: 24,
              }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#5adb8a",
                  flexShrink: 0,
                  animation: "nbPulseF 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#5adb8a",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}>
                Open to work
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE: stacked ══ */}
      {isMobile && (
        <div style={{ borderBottom: "3px solid #1a1a1a" }}>
          {/* brand block */}
          <div
            style={{ padding: "32px 24px", borderBottom: "3px solid #1a1a1a" }}>
            <div
              style={{
                fontFamily: COND,
                fontSize: 40,
                fontWeight: 900,
                color: "#f0ee42",
                letterSpacing: "-.02em",
                lineHeight: 1,
                marginBottom: 8,
              }}>
              NAK_
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "#444",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              {personal.role}
            </div>
            {/* available badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 12px",
                border: "2px solid #1a1a1a",
                background: "#111",
              }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#5adb8a",
                  flexShrink: 0,
                  animation: "nbPulseF 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#5adb8a",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}>
                Open to work
              </span>
            </div>
          </div>

          {/* nav + connect side by side on mobile */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "3px solid #1a1a1a",
            }}>
            {/* nav col */}
            <div
              style={{
                padding: "24px 20px",
                borderRight: "3px solid #1a1a1a",
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#333",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 14,
                }}>
                // Navigate
              </span>
              {NAV_LINKS.map((l) => (
                <NavLink key={l.label} {...l} arrow="▶" />
              ))}
            </div>

            {/* connect col */}
            <div style={{ padding: "24px 20px" }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#333",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 14,
                }}>
                // Connect
              </span>
              {SOCIAL_LINKS.map((l) => (
                <NavLink key={l.label} {...l} arrow="→" external />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ticker strip ── */}
      <div
        style={{
          borderBottom: "3px solid #1a1a1a",
          height: 40,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}>
        <div
          style={{
            display: "flex",
            animation: "nbFooterTick 20s linear infinite",
          }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: i % 4 === 0 ? "#f0ee42" : "#2a2a2a",
                padding: "0 22px",
                borderRight: "1px solid #1a1a1a",
                whiteSpace: "nowrap",
                lineHeight: "40px",
                flexShrink: 0,
              }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "14px 20px" : "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            color: "#2a2a2a",
            letterSpacing: ".12em",
          }}>
          © {year} {isMobile ? "NAK" : personal.name}
        </span>
        {!isMobile && (
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "#2a2a2a",
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}>
            React · Vite · Neobrutalist
          </span>
        )}
        {/* back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setTopHover(true)}
          onMouseLeave={() => setTopHover(false)}
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: topHover ? "#0a0a0a" : "#555",
            background: topHover ? "#f0ee42" : "transparent",
            border: `1.5px solid ${topHover ? "#f0ee42" : "#2a2a2a"}`,
            padding: "7px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all .18s",
            boxShadow: topHover ? "3px 3px 0 rgba(240,238,66,.2)" : "none",
          }}>
          ↑ Top
        </button>
      </div>
    </footer>
  );
}
