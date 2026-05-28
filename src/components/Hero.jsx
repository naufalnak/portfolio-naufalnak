import { useState, useEffect, useRef } from "react";
import { personal, stats } from "../data/portfolio";

/* ─── Typing roles ─── */
const ROLES = [
  "Backend Developer",
  "Android Developer",
  "REST API Engineer",
  "Full Stack Developer",
];

/* ─── Ticker — mix romaji + kanji ─── */
const TICKER = [
  "Backend",
  "バックエンド",
  "Node.js",
  "Android",
  "モバイル",
  "PostgreSQL",
  "Express.js",
  "開発者",
  "Kotlin",
  "REST API",
  "設計",
  "Prisma ORM",
  "Next.js",
  "構築",
  "TypeScript",
  "技術",
];

/* ─── JP decorative annotations ─── */
const JP_SIDE = ["開", "発", "者", "設", "計"];

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

/* ══════════════════════════════════════════════
   Grid canvas
══════════════════════════════════════════════ */
function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let scanX = -canvas.width;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(240,238,66,0.045)";
      ctx.lineWidth = 1;
      const gap = 48;
      for (let x = 0; x < canvas.width + gap; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height + gap; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      [
        [0, 0],
        [canvas.width, 0],
        [0, canvas.height],
        [canvas.width, canvas.height],
      ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,238,66,0.18)";
        ctx.fill();
      });
      const grad = ctx.createLinearGradient(
        scanX,
        0,
        scanX + 180,
        canvas.height,
      );
      grad.addColorStop(0, "rgba(240,238,66,0)");
      grad.addColorStop(0.5, "rgba(240,238,66,0.04)");
      grad.addColorStop(1, "rgba(240,238,66,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX, 0, 180, canvas.height);
      scanX += 1.2;
      if (scanX > canvas.width + 180) scanX = -180;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   Vertical JP sidebar
══════════════════════════════════════════════ */
function VerticalSidebar({ side = "left" }) {
  return (
    <div
      style={{
        position: "absolute",
        [side]: 0,
        top: 0,
        bottom: 0,
        width: 32,
        background: "#0a0a0a",
        borderRight: side === "left" ? "3px solid #0a0a0a" : "none",
        borderLeft: side === "right" ? "3px solid #0a0a0a" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        zIndex: 3,
      }}>
      {/* vertical name */}
      <span
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 8,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "rgba(240,238,66,.4)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: side === "left" ? "rotate(180deg)" : "none",
          userSelect: "none",
        }}>
        {side === "left" ? "Naufal · Bekasi · Indonesia" : "Portfolio · 2025"}
      </span>

      {/* kanji stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
        {(side === "left" ? ["開", "発", "者"] : ["設", "計", "師"]).map(
          (c, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 12,
                color: "rgba(240,238,66,.2)",
                lineHeight: 1,
              }}>
              {c}
            </span>
          ),
        )}
      </div>

      <span
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 7,
          color: "#222",
          letterSpacing: ".12em",
          writingMode: "vertical-rl",
          userSelect: "none",
        }}>
        v2025.1
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Hero
══════════════════════════════════════════════ */
export default function Hero() {
  const isMobile = useIsMobile();
  const [roleIdx, setRoleIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && charCount <= cur.length)
      t = setTimeout(() => setCharCount((c) => c + 1), 65);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && charCount > 0)
      t = setTimeout(() => setCharCount((c) => c - 1), 32);
    else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [charCount, deleting, roleIdx]);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(22px)",
    transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  });

  /* ─── Mobile stats strip ─── */
  const MobileStats = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        borderTop: "3px solid #0a0a0a",
      }}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: "14px 8px",
            borderRight: i < stats.length - 1 ? "3px solid #0a0a0a" : "none",
            background: i === 0 ? "#0a0a0a" : "#f0ee42",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            position: "relative",
            overflow: "hidden",
          }}>
          {/* ghost kanji per stat cell */}
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 4,
              fontFamily: "'Noto Serif JP',serif",
              fontSize: 20,
              color: i === 0 ? "rgba(240,238,66,.06)" : "rgba(0,0,0,.06)",
              userSelect: "none",
              lineHeight: 1,
            }}>
            {["年", "技", "学", "月"][i]}
          </span>
          <div
            style={{
              fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: i === 0 ? "#f0ee42" : "#0a0a0a",
              lineHeight: 1,
              letterSpacing: "-.02em",
            }}>
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 7,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: i === 0 ? "rgba(240,238,66,.4)" : "rgba(0,0,0,.45)",
              textAlign: "center",
            }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: 56,
        background: "#f0ee42",
        position: "relative",
        overflow: "hidden",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        @keyframes nbTicker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes nbBlink   { 0%,100%{opacity:1} 50%{opacity:.15} }
        @keyframes nbPulse2  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes jpFloat   { 0%,100%{opacity:.055;transform:translateY(0)} 50%{opacity:.09;transform:translateY(-10px)} }
        @keyframes jpFloatR  { 0%,100%{opacity:.04;transform:translateY(0)} 50%{opacity:.07;transform:translateY(8px)} }
        .nb-ticker-track { display:flex; animation:nbTicker 28s linear infinite; }
        .nb-ticker-rev   { display:flex; animation:nbTicker 22s linear infinite reverse; }
      `}</style>

      <GridCanvas />

      {/* ── Vertical sidebars — desktop only ── */}
      {!isMobile && <VerticalSidebar side="left" />}
      {!isMobile && <VerticalSidebar side="right" />}

      {/* ── Top ticker ── */}
      <div
        style={{
          background: "#0a0a0a",
          borderBottom: "3px solid #0a0a0a",
          height: 40,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          marginLeft: isMobile ? 0 : 32,
          marginRight: isMobile ? 0 : 32,
        }}>
        <div className="nb-ticker-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily:
                  i % 2 === 1
                    ? "'Noto Serif JP',serif"
                    : "'DM Mono','Fira Mono',monospace",
                fontSize: i % 2 === 1 ? 13 : 10,
                letterSpacing: i % 2 === 1 ? ".05em" : ".18em",
                textTransform: "uppercase",
                color: i % 4 === 0 ? "#f0ee42" : "#444",
                padding: "0 20px",
                lineHeight: "40px",
                borderRight: "1px solid #1a1a1a",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ DESKTOP layout ══ */}
      {!isMobile && (
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            position: "relative",
            zIndex: 1,
            marginLeft: 32,
            marginRight: 32,
          }}>
          {/* ─── LEFT PANEL ─── */}
          <div
            style={{
              borderRight: "3px solid #0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "52px 52px 40px",
              position: "relative",
              overflow: "hidden",
            }}>
            {/* Ghost kanji bg — 開発者 vertical */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: 0,
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 180,
                fontWeight: 700,
                color: "rgba(0,0,0,.055)",
                userSelect: "none",
                pointerEvents: "none",
                lineHeight: 1,
                writingMode: "vertical-rl",
                animation: "jpFloat 9s ease-in-out infinite",
              }}>
              開発
            </div>

            {/* decorative vertical rule right edge */}
            <div
              style={{
                position: "absolute",
                right: 18,
                top: 40,
                bottom: 40,
                width: 1,
                background: "rgba(0,0,0,.08)",
                pointerEvents: "none",
              }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: -4,
                  width: 9,
                  height: 9,
                  border: "2px solid rgba(0,0,0,.15)",
                  background: "#f0ee42",
                }}
              />
            </div>

            <div>
              {/* ── eyebrow ── */}
              <div
                style={{
                  ...fade(0),
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 32,
                }}>
                <div style={{ width: 32, height: 3, background: "#0a0a0a" }} />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#0a0a0a",
                  }}>
                  {personal.name} · {personal.location}
                </span>
                {/* furigana annotation */}
                <span
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 11,
                    color: "rgba(0,0,0,.25)",
                    letterSpacing: ".05em",
                    marginLeft: "auto",
                  }}>
                  作品集
                </span>
              </div>

              {/* ── name ── */}
              <div style={{ ...fade(80), position: "relative", zIndex: 1 }}>
                {/* kana above name */}
                <div
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 11,
                    color: "rgba(0,0,0,.3)",
                    letterSpacing: ".2em",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                  <span>§</span>
                  <span>ノーファル・アンドレシャ</span>
                  <span
                    style={{
                      flex: 1,
                      height: 1,
                      background: "rgba(0,0,0,.12)",
                    }}
                  />
                </div>

                <h1
                  style={{
                    fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
                    fontSize: "clamp(68px,10vw,120px)",
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: "-.02em",
                    color: "#0a0a0a",
                    marginBottom: 4,
                  }}>
                  NAUFAL
                  <span
                    style={{
                      display: "block",
                      WebkitTextStroke: "3px #0a0a0a",
                      color: "transparent",
                      fontSize: "clamp(52px,8vw,96px)",
                    }}>
                    ANDRESYA KHOLISH
                  </span>
                </h1>
              </div>

              {/* ── role + typing ── */}
              <div
                style={{
                  ...fade(160),
                  marginTop: 24,
                  zIndex: 1,
                  position: "relative",
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 18,
                  }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#0a0a0a",
                      color: "#f0ee42",
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 13,
                      letterSpacing: ".08em",
                      padding: "10px 20px",
                      textTransform: "uppercase",
                    }}>
                    {personal.role}
                  </div>
                  {/* annotation */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}>
                    <span
                      style={{
                        fontFamily: "'Noto Serif JP',serif",
                        fontSize: 11,
                        color: "rgba(0,0,0,.25)",
                        lineHeight: 1,
                      }}>
                      仕事
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 7,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,.18)",
                        lineHeight: 1,
                      }}>
                      SHIGOTO
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 14,
                    color: "rgba(0,0,0,.6)",
                    letterSpacing: ".04em",
                    minHeight: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                  <span style={{ color: "rgba(0,0,0,.25)", marginRight: 4 }}>
                    ▶
                  </span>
                  {ROLES[roleIdx].slice(0, charCount)}
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 16,
                      background: "#0a0a0a",
                      animation: "nbBlink 1s step-start infinite",
                    }}
                  />
                </div>
              </div>

              {/* ── bio ── */}
              <div
                style={{
                  ...fade(240),
                  position: "relative",
                  zIndex: 1,
                  marginTop: 20,
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}>
                  <span
                    style={{
                      fontFamily: "'Noto Serif JP',serif",
                      fontSize: 9,
                      color: "rgba(0,0,0,.22)",
                      letterSpacing: ".1em",
                    }}>
                    自己紹介
                  </span>
                  <div
                    style={{
                      width: 24,
                      height: 1,
                      background: "rgba(0,0,0,.12)",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "rgba(0,0,0,.6)",
                    maxWidth: 440,
                  }}>
                  {personal.bio}
                </p>
              </div>
            </div>

            {/* ── CTA ── */}
            <div
              style={{
                ...fade(320),
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginTop: 40,
              }}>
              {/* JP annotation row */}
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                {[
                  ["作品", "SAKUHIN"],
                  ["技術", "GIJUTSU"],
                  ["経験", "KEIKEN"],
                  ["連絡", "RENRAKU"],
                ].map(([k, r]) => (
                  <div
                    key={r}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}>
                    <span
                      style={{
                        fontFamily: "'Noto Serif JP',serif",
                        fontSize: 10,
                        color: "rgba(0,0,0,.25)",
                        lineHeight: 1,
                      }}>
                      {k}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 7,
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,.18)",
                        lineHeight: 1,
                      }}>
                      {r}
                    </span>
                  </div>
                ))}
                <div
                  style={{ flex: 1, height: 1, background: "rgba(0,0,0,.1)" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}>
                <a
                  href="#projects"
                  style={{
                    background: "#0a0a0a",
                    color: "#f0ee42",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    padding: "13px 28px",
                    border: "3px solid #0a0a0a",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "5px 5px 0 rgba(0,0,0,.2)",
                    transition: "box-shadow .15s, transform .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "2px 2px 0 rgba(0,0,0,.2)";
                    e.currentTarget.style.transform = "translate(3px,3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "5px 5px 0 rgba(0,0,0,.2)";
                    e.currentTarget.style.transform = "none";
                  }}>
                  view work →
                </a>
                <a
                  href="#contact"
                  style={{
                    background: "transparent",
                    color: "#0a0a0a",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    padding: "13px 24px",
                    border: "3px solid #0a0a0a",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "5px 5px 0 rgba(0,0,0,.15)",
                    transition: "box-shadow .15s, transform .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "2px 2px 0 rgba(0,0,0,.15)";
                    e.currentTarget.style.transform = "translate(3px,3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "5px 5px 0 rgba(0,0,0,.15)";
                    e.currentTarget.style.transform = "none";
                  }}>
                  contact
                </a>
                <span
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 10,
                    color: "rgba(0,0,0,.22)",
                    letterSpacing: ".05em",
                  }}>
                  お問い合わせ歓迎
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>
            {/* Ghost kanji right side */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 16,
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 120,
                fontWeight: 700,
                color: "rgba(240,238,66,.07)",
                userSelect: "none",
                pointerEvents: "none",
                lineHeight: 1,
                writingMode: "vertical-rl",
                animation: "jpFloatR 11s ease-in-out infinite",
              }}>
              技術
            </div>

            {/* clock */}
            <div
              style={{
                background: "#0a0a0a",
                borderBottom: "3px solid #0a0a0a",
                padding: "26px 32px 22px",
              }}>
              {/* 現在時刻 label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}>
                <span
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 9,
                    color: "rgba(240,238,66,.25)",
                    letterSpacing: ".05em",
                  }}>
                  現在時刻
                </span>
                <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    color: "#333",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}>
                  WIB · UTC+7
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 38,
                  fontWeight: 500,
                  color: "#f0ee42",
                  letterSpacing: ".05em",
                  lineHeight: 1,
                }}>
                {hh}
                <span
                  style={{
                    color: "#555",
                    animation: "nbBlink 1s step-start infinite",
                  }}>
                  :
                </span>
                {mm}
                <span
                  style={{
                    color: "#555",
                    animation: "nbBlink 1s step-start infinite",
                  }}>
                  :
                </span>
                <span style={{ color: "rgba(240,238,66,.4)" }}>{ss}</span>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: "#555",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}>
                {dateStr}
              </div>
            </div>

            {/* stats 2×2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                flex: 1,
              }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "28px 24px",
                    borderRight: i % 2 === 0 ? "3px solid #0a0a0a" : "none",
                    borderBottom: i < 2 ? "3px solid #0a0a0a" : "none",
                    background: i === 0 ? "#0a0a0a" : "#f0ee42",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                  {/* ghost kanji per cell */}
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontFamily: "'Noto Serif JP',serif",
                      fontSize: 30,
                      lineHeight: 1,
                      color:
                        i === 0 ? "rgba(240,238,66,.07)" : "rgba(0,0,0,.07)",
                      userSelect: "none",
                    }}>
                    {["年", "件", "学", "月"][i]}
                  </span>
                  <div
                    style={{
                      fontFamily:
                        "'Barlow Condensed','Arial Narrow',sans-serif",
                      fontSize: 52,
                      fontWeight: 800,
                      color: i === 0 ? "#f0ee42" : "#0a0a0a",
                      lineHeight: 1,
                      letterSpacing: "-.02em",
                    }}>
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 10,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color:
                        i === 0 ? "rgba(240,238,66,.4)" : "rgba(0,0,0,.45)",
                      marginTop: 4,
                    }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* available strip */}
            <div
              style={{
                background: "#0a0a0a",
                borderTop: "3px solid #0a0a0a",
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#5adb8a",
                    display: "inline-block",
                    animation: "nbPulse2 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: "#5adb8a",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}>
                  Available for opportunities
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Noto Serif JP',serif",
                  fontSize: 9,
                  color: "rgba(90,219,138,.35)",
                  letterSpacing: ".05em",
                }}>
                求職中
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE layout ══ */}
      {isMobile && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}>
          <div
            style={{
              padding: "32px 20px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              flex: 1,
            }}>
            {/* ghost kanji mobile */}
            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: -8,
                fontFamily: "'Noto Serif JP',serif",
                fontSize: 110,
                fontWeight: 700,
                color: "rgba(0,0,0,.04)",
                userSelect: "none",
                pointerEvents: "none",
                lineHeight: 1,
                writingMode: "vertical-rl",
              }}>
              開発
            </div>

            {/* eyebrow */}
            <div
              style={{
                ...fade(0),
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}>
              <div style={{ width: 20, height: 3, background: "#0a0a0a" }} />
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "#0a0a0a",
                }}>
                {personal.location}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Serif JP',serif",
                  fontSize: 10,
                  color: "rgba(0,0,0,.25)",
                  marginLeft: "auto",
                }}>
                作品集
              </span>
            </div>

            {/* kana name */}
            <div style={{ ...fade(40), marginBottom: 4 }}>
              <div
                style={{
                  fontFamily: "'Noto Serif JP',serif",
                  fontSize: 10,
                  color: "rgba(0,0,0,.28)",
                  letterSpacing: ".15em",
                }}>
                § ノーファル・アンドレシャ
              </div>
            </div>

            {/* name */}
            <div
              style={{
                ...fade(80),
                position: "relative",
                zIndex: 1,
                marginBottom: 18,
              }}>
              <h1
                style={{
                  fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
                  fontSize: "clamp(58px,16vw,88px)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: "-.02em",
                  color: "#0a0a0a",
                }}>
                NAUFAL
                <span
                  style={{
                    display: "block",
                    WebkitTextStroke: "2.5px #0a0a0a",
                    color: "transparent",
                    fontSize: "clamp(44px,12vw,70px)",
                  }}>
                  ANDRESYA KHOLISH
                </span>
              </h1>
            </div>

            {/* role */}
            <div
              style={{
                ...fade(160),
                zIndex: 1,
                position: "relative",
                marginBottom: 14,
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#0a0a0a",
                    color: "#f0ee42",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    letterSpacing: ".08em",
                    padding: "8px 16px",
                    textTransform: "uppercase",
                  }}>
                  {personal.role}
                </div>
                <span
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 11,
                    color: "rgba(0,0,0,.25)",
                  }}>
                  仕事
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 13,
                  color: "rgba(0,0,0,.6)",
                  letterSpacing: ".04em",
                  minHeight: 22,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}>
                <span style={{ color: "rgba(0,0,0,.25)", marginRight: 2 }}>
                  ▶
                </span>
                {ROLES[roleIdx].slice(0, charCount)}
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: 14,
                    background: "#0a0a0a",
                    animation: "nbBlink 1s step-start infinite",
                  }}
                />
              </div>
            </div>

            {/* bio */}
            <div
              style={{
                ...fade(240),
                position: "relative",
                zIndex: 1,
                marginBottom: 28,
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 6,
                }}>
                <span
                  style={{
                    fontFamily: "'Noto Serif JP',serif",
                    fontSize: 9,
                    color: "rgba(0,0,0,.2)",
                  }}>
                  自己紹介
                </span>
                <div
                  style={{ width: 16, height: 1, background: "rgba(0,0,0,.1)" }}
                />
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "rgba(0,0,0,.6)",
                }}>
                {personal.bio}
              </p>
            </div>

            {/* CTAs */}
            <div
              style={{
                ...fade(320),
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 8,
              }}>
              <a
                href="#projects"
                style={{
                  background: "#0a0a0a",
                  color: "#f0ee42",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "12px 22px",
                  border: "3px solid #0a0a0a",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "4px 4px 0 rgba(0,0,0,.2)",
                }}>
                作品を見る →
              </a>
              <a
                href="#contact"
                style={{
                  background: "transparent",
                  color: "#0a0a0a",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "12px 18px",
                  border: "3px solid #0a0a0a",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "4px 4px 0 rgba(0,0,0,.15)",
                }}>
                連絡する
              </a>
            </div>

            {/* JP annotations row */}
            <div
              style={{
                ...fade(360),
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginTop: 4,
              }}>
              {[
                ["作品", "SAKUHIN"],
                ["技術", "GIJUTSU"],
                ["連絡", "RENRAKU"],
              ].map(([k, r]) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}>
                  <span
                    style={{
                      fontFamily: "'Noto Serif JP',serif",
                      fontSize: 9,
                      color: "rgba(0,0,0,.22)",
                      lineHeight: 1,
                    }}>
                    {k}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 6,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "rgba(0,0,0,.16)",
                      lineHeight: 1,
                    }}>
                    {r}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* clock strip — mobile */}
          <div
            style={{
              background: "#0a0a0a",
              borderTop: "3px solid #0a0a0a",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div>
              <div
                style={{
                  fontFamily: "'Noto Serif JP',serif",
                  fontSize: 8,
                  color: "rgba(240,238,66,.25)",
                  letterSpacing: ".05em",
                  marginBottom: 2,
                }}>
                現在時刻
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#f0ee42",
                  letterSpacing: ".05em",
                }}>
                {hh}
                <span
                  style={{
                    color: "#555",
                    animation: "nbBlink 1s step-start infinite",
                  }}>
                  :
                </span>
                {mm}
                <span
                  style={{
                    color: "#555",
                    animation: "nbBlink 1s step-start infinite",
                  }}>
                  :
                </span>
                <span style={{ color: "rgba(240,238,66,.4)" }}>{ss}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "flex-end",
                  marginBottom: 2,
                }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#5adb8a",
                    display: "inline-block",
                    animation: "nbPulse2 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 9,
                    color: "#5adb8a",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}>
                  Available
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Noto Serif JP',serif",
                  fontSize: 9,
                  color: "rgba(90,219,138,.35)",
                }}>
                求職中
              </div>
            </div>
          </div>

          <MobileStats />
        </div>
      )}

      {/* ── Bottom ticker (reverse) ── */}
      <div
        style={{
          background: "#0a0a0a",
          borderTop: "3px solid #0a0a0a",
          height: 44,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          marginLeft: isMobile ? 0 : 32,
          marginRight: isMobile ? 0 : 32,
        }}>
        <div className="nb-ticker-rev">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily:
                  i % 2 === 1 ? "'Noto Serif JP',serif" : "'DM Mono',monospace",
                fontSize: i % 2 === 1 ? 14 : 10,
                letterSpacing: i % 2 === 1 ? ".05em" : ".18em",
                textTransform: "uppercase",
                color: i % 3 === 0 ? "#f0ee42" : "#444",
                padding: "0 20px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRight: "1px solid #1a1a1a",
              }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
