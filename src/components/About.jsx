import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";
import foto from "../assets/me.png";

/* ─── shared ─── */
const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

/* ─── icons ─── */
const IconMap = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconMail = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconGH = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const IconLI = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconDL = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CODE_LINES = [
  { key: "name", val: `"${personal.name}"`, color: "#ddd" },
  { key: "role", val: `"${personal.role}"`, color: "#ddd" },
  { key: "location", val: `"${personal.location}"`, color: "#ddd" },
  { key: "gpa", val: "3.85", color: "#f0ee42" },
  { key: "available", val: "true", color: "#5adb8a" },
];

const LINKS = [
  {
    Icon: IconGH,
    label: "GitHub",
    href: `https://github.com/${personal.github}`,
  },
  {
    Icon: IconLI,
    label: "LinkedIn",
    href: `https://linkedin.com/in/${personal.linkedin}`,
  },
  { Icon: IconDL, label: "Résumé", href: personal.resumeUrl },
];

const FACTS = [
  { num: personal.yearStarted, label: "Started coding", jp: "開始" },
  { num: "3.85", label: "GPA Gunadarma", jp: "成績" },
  { num: "4", label: "Internships", jp: "経験" },
];

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function About() {
  const hRef = useReveal();
  const lRef = useReveal();
  const rRef = useReveal();

  return (
    <section id="about" style={{ padding: "64px 0", background: "#fafaf8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal.visible{opacity:1;transform:none;}
        .nb-reveal-l{opacity:0;transform:translateX(-24px);transition:opacity .65s cubic-bezier(.16,1,.3,1) .1s,transform .65s cubic-bezier(.16,1,.3,1) .1s;}
        .nb-reveal-l.visible{opacity:1;transform:none;}
        .nb-reveal-r{opacity:0;transform:translateX(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1) .2s,transform .65s cubic-bezier(.16,1,.3,1) .2s;}
        .nb-reveal-r.visible{opacity:1;transform:none;}
        @keyframes nbPulseA{0%,100%{opacity:1}50%{opacity:.3}}

        .about-grid  { display:grid; grid-template-columns:300px 1fr; border:3px solid #0a0a0a; }
        .about-left  { border-right:3px solid #0a0a0a; border-bottom:none; }
        .about-facts { display:grid; grid-template-columns:repeat(3,1fr); }
        .about-links { display:flex; flex-direction:column; gap:8px; }
        .code-block  { display:block; }

        @media (max-width: 768px) {
          .about-wrap         { padding:0 20px !important; }
          .about-header       { flex-direction:column !important; align-items:flex-start !important; gap:0 !important; }
          .about-header-line  { display:none !important; }
          .about-header-title { border-top:none !important; font-size:28px !important; }
          .about-grid         { grid-template-columns:1fr !important; }
          .about-left         { border-right:none !important; border-bottom:3px solid #0a0a0a !important; }
          .about-avatar       { aspect-ratio: 3/4 !important; }
          .about-links        { flex-direction:row !important; flex-wrap:wrap !important; }
          .about-link-btn     { flex:1 !important; min-width:120px !important; justify-content:center !important; }
          .about-facts        { grid-template-columns:repeat(3,1fr) !important; }
          .about-fact-num     { font-size:26px !important; }
          .code-block         { display:none !important; }
          .bio-main           { font-size:16px !important; }
          .bio-extended       { font-size:13px !important; }
          .bio-pad            { padding:28px 24px !important; }
          .facts-pad          { padding:16px 12px !important; }
        }
        @media (max-width: 480px) {
          .about-links      { flex-direction:column !important; }
          .about-link-btn   { flex:unset !important; width:100% !important; }
          .about-facts      { grid-template-columns:1fr !important; }
          .about-fact-item  { border-right:none !important; border-bottom:3px solid #0a0a0a !important; }
          .about-fact-item:last-child { border-bottom:none !important; }
        }
      `}</style>

      <div
        className="about-wrap"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* ── Section header ── */}
        <div
          ref={hRef}
          className="nb-reveal about-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: 48,
          }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".25em",
              textTransform: "uppercase",
              background: "#f0ee42",
              color: "#0a0a0a",
              border: "3px solid #0a0a0a",
              padding: "8px 16px",
              whiteSpace: "nowrap",
            }}>
            01 — About
          </span>
          <div
            className="about-header-line"
            style={{ flex: 1, height: 3, background: "#0a0a0a" }}
          />
          {/* JP annotation between line and title */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 11,
              color: "rgba(0,0,0,.25)",
              letterSpacing: ".08em",
              padding: "0 16px",
              whiteSpace: "nowrap",
            }}>
            自己紹介
          </span>
          <div
            className="about-header-line"
            style={{ flex: 1, height: 3, background: "#0a0a0a" }}
          />
          <span
            className="about-header-title"
            style={{
              fontFamily: COND,
              fontSize: 38,
              fontWeight: 800,
              color: "#0a0a0a",
              letterSpacing: "-.01em",
              border: "3px solid #0a0a0a",
              padding: "5px 20px",
              background: "#fafaf8",
              whiteSpace: "nowrap",
            }}>
            Who I Am
          </span>
        </div>

        {/* ── Body grid ── */}
        <div className="about-grid">
          {/* ═══ LEFT ═══ */}
          <div
            ref={lRef}
            className="nb-reveal-l about-left"
            style={{
              background: "#f0ee42",
              display: "flex",
              flexDirection: "column",
            }}>
            {/* avatar */}
            <div
              className="about-avatar"
              style={{
                borderBottom: "3px solid #0a0a0a",
                position: "relative",
                overflow: "hidden",
                aspectRatio: "3/4",
              }}>
              <img
                src={foto}
                alt={personal.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center", // ← tambah ini
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.style.background = "#0a0a0a";
                  e.currentTarget.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:${COND};font-size:80px;font-weight:900;color:rgba(240,238,66,.15);">NAK</div>`;
                }}
              />

              {/* open badge */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "#0a0a0a",
                  color: "#f0ee42",
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  padding: "5px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#5adb8a",
                    display: "inline-block",
                    animation: "nbPulseA 2s ease-in-out infinite",
                  }}
                />
                Open
              </div>

              {/* JP badge bottom-left — 開発者 */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  fontFamily: JP,
                  fontSize: 11,
                  color: "rgba(255,255,255,.5)",
                  letterSpacing: ".1em",
                  background: "rgba(10,10,10,.5)",
                  padding: "3px 8px",
                  backdropFilter: "blur(4px)",
                }}>
                開発者
              </div>
            </div>

            {/* kana name under avatar */}
            <div
              style={{
                padding: "14px 24px 0",
                borderBottom: "1.5px solid rgba(0,0,0,.1)",
                paddingBottom: 12,
              }}>
              <div
                style={{
                  fontFamily: JP,
                  fontSize: 10,
                  color: "rgba(0,0,0,.35)",
                  letterSpacing: ".15em",
                }}>
                ノーファル・アンドレシャ・ホリシュ
              </div>
            </div>

            {/* info rows */}
            <div style={{ padding: "16px 24px 0" }}>
              {[
                { Icon: IconMap, val: personal.location },
                { Icon: IconMail, val: personal.email },
              ].map(({ Icon, val }) => (
                <div
                  key={val}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}>
                  <span style={{ color: "#0a0a0a", flexShrink: 0 }}>
                    <Icon />
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "rgba(0,0,0,.6)",
                      letterSpacing: ".03em",
                      wordBreak: "break-all",
                    }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* link buttons */}
            <div
              className="about-links"
              style={{ padding: "16px 24px 24px", marginTop: "auto" }}>
              {LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="about-link-btn"
                  style={{
                    background: "#0a0a0a",
                    color: "#f0ee42",
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    padding: "10px 16px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "3px 3px 0 rgba(0,0,0,.2)",
                    transition: "transform .15s, box-shadow .15s",
                    border: "2px solid #0a0a0a",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(2px,2px)";
                    e.currentTarget.style.boxShadow =
                      "1px 1px 0 rgba(0,0,0,.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 rgba(0,0,0,.2)";
                  }}>
                  <Icon /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT ═══ */}
          <div
            ref={rRef}
            className="nb-reveal-r"
            style={{ display: "flex", flexDirection: "column" }}>
            {/* bio */}
            <div
              className="bio-pad"
              style={{
                padding: "40px 48px",
                borderBottom: "3px solid #0a0a0a",
                flex: 1,
              }}>
              {/* JP label above bio */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}>
                <span
                  style={{
                    fontFamily: JP,
                    fontSize: 9,
                    color: "rgba(0,0,0,.25)",
                    letterSpacing: ".1em",
                  }}>
                  プロフィール
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
                className="bio-main"
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#0a0a0a",
                  lineHeight: 1.65,
                  letterSpacing: "-.01em",
                  marginBottom: 20,
                }}>
                {personal.bio}
              </p>
              <p
                className="bio-extended"
                style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
                {personal.bioExtended}
              </p>
            </div>

            {/* code block — hidden on mobile */}
            <div
              className="code-block"
              style={{
                background: "#0a0a0a",
                padding: "32px 40px",
                fontFamily: MONO,
                fontSize: 12,
                lineHeight: 1.9,
                borderBottom: "3px solid #0a0a0a",
                position: "relative",
                overflow: "hidden",
              }}>
              {/* ghost kanji in code block bg */}
              <span
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: -8,
                  fontFamily: JP,
                  fontSize: 80,
                  fontWeight: 700,
                  color: "rgba(240,238,66,.04)",
                  userSelect: "none",
                  lineHeight: 1,
                }}>
                設定
              </span>

              {/* mac dots */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 18,
                }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span
                    key={c}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c,
                      display: "inline-block",
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: "#444",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    marginLeft: 10,
                  }}>
                  identity.config.ts
                </span>
              </div>
              {/* code lines */}
              <div style={{ color: "#555" }}>
                <span style={{ color: "#666" }}>export const </span>
                <span style={{ color: "#fff" }}>developer</span>
                <span style={{ color: "#555" }}> = {"{"}</span>
              </div>
              {CODE_LINES.map(({ key, val, color }) => (
                <div key={key} style={{ paddingLeft: 20 }}>
                  <span style={{ color: "#f0ee42" }}>{key}</span>
                  <span style={{ color: "#555" }}>: </span>
                  <span style={{ color }}>{val}</span>
                  <span style={{ color: "#333" }}>,</span>
                </div>
              ))}
              <div style={{ color: "#555" }}>{"}"}</div>
            </div>

            {/* quick facts */}
            <div
              className="about-facts"
              style={{ borderTop: "3px solid #0a0a0a" }}>
              {FACTS.map(({ num, label, jp }, i) => (
                <div
                  key={label}
                  className="about-fact-item facts-pad"
                  style={{
                    padding: "20px 24px",
                    borderRight: i < 2 ? "3px solid #0a0a0a" : "none",
                    background: i === 1 ? "#f0ee42" : "#fafaf8",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                  {/* ghost JP char per fact */}
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 8,
                      fontFamily: JP,
                      fontSize: 26,
                      color: "rgba(0,0,0,.06)",
                      userSelect: "none",
                      lineHeight: 1,
                    }}>
                    {jp}
                  </span>

                  <div
                    className="about-fact-num"
                    style={{
                      fontFamily: COND,
                      fontSize: 36,
                      fontWeight: 800,
                      color: "#0a0a0a",
                      lineHeight: 1,
                      letterSpacing: "-.02em",
                    }}>
                    {num}
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: "rgba(0,0,0,.45)",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
