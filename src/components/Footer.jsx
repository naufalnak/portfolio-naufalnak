import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

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

/* ticker — cukup panjang untuk seamless loop */
const TICKER_ITEMS = [
  "Node.js",
  "バックエンド",
  "Kotlin",
  "Android",
  "Express.js",
  "設計",
  "PostgreSQL",
  "後端",
  "Jetpack Compose",
  "構築",
  "React",
  "技術",
  "REST API",
  "開発者",
  "Next.js",
  "全スタック",
  "TypeScript",
  "移動体",
  "Prisma ORM",
  "経験",
  "Git",
  "作品",
];

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

function NavLink({ label, href, arrow = "▶", external = false, isMobile }) {
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
}

export default function Footer() {
  const isMobile = useIsMobile();
  const year = new Date().getFullYear();
  const [topHover, setTopHover] = useState(false);

  useEffect(() => {
    if (document.getElementById("nb-footer-kf")) return;
    const st = document.createElement("style");
    st.id = "nb-footer-kf";
    st.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
      @keyframes nbFooterTick { from{transform:translateX(0)} to{transform:translateX(-25%)} }
      @keyframes nbPulseF { 0%,100%{opacity:1} 50%{opacity:.25} }
    `;
    document.head.appendChild(st);
  }, []);

  /* ── available badge ── */
  const AvailBadge = () => (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 14px",
        border: "2px solid #1a1a1a",
        background: "#111",
        width: "fit-content",
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
          fontWeight: 500,
        }}>
        Open to work
      </span>
      {/* JP translation */}
      <span
        style={{
          fontFamily: JP,
          fontSize: 8,
          color: "rgba(90,219,138,.4)",
          letterSpacing: ".04em",
        }}>
        求職中
      </span>
    </div>
  );

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "3px solid #1a1a1a" }}>
      {/* ══ DESKTOP: 3 col ══ */}
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
            {/* kanji above name */}
            <div
              style={{
                fontFamily: JP,
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
                marginBottom: 8,
              }}>
              {personal.name.toUpperCase()}
            </div>
            {/* kana name */}
            <div
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "rgba(240,238,66,.2)",
                letterSpacing: ".12em",
                marginBottom: 12,
              }}>
              ノーファル・アンドレシャ
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
                marginBottom: 20,
              }}>
              // Building reliable systems,
              <br />
              // one commit at a time.
            </div>
            {/* JP version of tagline */}
            <div
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "#1e1e1e",
                letterSpacing: ".08em",
                lineHeight: 1.8,
              }}>
              信頼性の高いシステムを、
              <br />
              一つのコミットずつ。
            </div>
          </div>

          {/* col 2 — navigate */}
          <div
            style={{
              borderRight: "3px solid #1a1a1a",
              padding: "40px 40px",
              display: "flex",
              flexDirection: "column",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#333",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                }}>
                // Navigate
              </span>
              <span
                style={{
                  fontFamily: JP,
                  fontSize: 8,
                  color: "#222",
                  letterSpacing: ".05em",
                }}>
                ナビ
              </span>
            </div>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} {...l} arrow="▶" isMobile={false} />
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
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "#333",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                  }}>
                  // Connect
                </span>
                <span
                  style={{
                    fontFamily: JP,
                    fontSize: 8,
                    color: "#222",
                    letterSpacing: ".05em",
                  }}>
                  連絡先
                </span>
              </div>
              {SOCIAL_LINKS.map((l) => (
                <NavLink
                  key={l.label}
                  {...l}
                  arrow="→"
                  external
                  isMobile={false}
                />
              ))}
            </div>
            <AvailBadge />
          </div>
        </div>
      )}

      {/* ══ MOBILE: stacked ══ */}
      {isMobile && (
        <div style={{ borderBottom: "3px solid #1a1a1a" }}>
          {/* brand block */}
          <div
            style={{ padding: "28px 24px", borderBottom: "3px solid #1a1a1a" }}>
            <div
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "rgba(240,238,66,.2)",
                letterSpacing: ".1em",
                marginBottom: 6,
              }}>
              開発者
            </div>
            <div
              style={{
                fontFamily: COND,
                fontSize: 40,
                fontWeight: 900,
                color: "#f0ee42",
                letterSpacing: "-.02em",
                lineHeight: 1,
                marginBottom: 4,
              }}>
              NAK_
            </div>
            <div
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "rgba(240,238,66,.15)",
                letterSpacing: ".1em",
                marginBottom: 10,
              }}>
              ノーファル・アンドレシャ
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "#444",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
              {personal.role}
            </div>
            <AvailBadge />
          </div>

          {/* nav + connect 2-col */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "3px solid #1a1a1a",
            }}>
            <div
              style={{
                padding: "22px 20px",
                borderRight: "3px solid #1a1a1a",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12,
                }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "#333",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                  }}>
                  // Nav
                </span>
                <span style={{ fontFamily: JP, fontSize: 7, color: "#222" }}>
                  ナビ
                </span>
              </div>
              {NAV_LINKS.map((l) => (
                <NavLink key={l.label} {...l} arrow="▶" isMobile />
              ))}
            </div>
            <div style={{ padding: "22px 20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12,
                }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "#333",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                  }}>
                  // Connect
                </span>
                <span style={{ fontFamily: JP, fontSize: 7, color: "#222" }}>
                  連絡
                </span>
              </div>
              {SOCIAL_LINKS.map((l) => (
                <NavLink key={l.label} {...l} arrow="→" external isMobile />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ticker strip — mix romaji + kanji ── */}
      <div
        style={{
          borderBottom: "3px solid #1a1a1a",
          height: 40,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}>
        {/* render 2 identical tracks side by side — animate first track to -100% width of one track */}
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "nbFooterTick 32s linear infinite",
          }}>
          {[
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: i % 2 === 1 ? JP : MONO,
                fontSize: i % 2 === 1 ? 13 : 10,
                letterSpacing: i % 2 === 1 ? ".04em" : ".18em",
                textTransform: "uppercase",
                color: i % 6 === 0 ? "#f0ee42" : "#2a2a2a",
                padding: "0 20px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "#2a2a2a",
              letterSpacing: ".12em",
            }}>
            © {year} {isMobile ? "NAK" : personal.name}
          </span>
          {/* JP copyright note */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 8,
              color: "#1a1a1a",
              letterSpacing: ".06em",
            }}>
            無断複製禁止
          </span>
        </div>
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
          ↑ <span>Top</span>
          <span style={{ fontFamily: JP, fontSize: 8, opacity: 0.5 }}>
            上へ
          </span>
        </button>
      </div>
    </footer>
  );
}
