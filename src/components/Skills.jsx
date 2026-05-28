import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { skills } from "../data/portfolio";

/* ─── shared ─── */
const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

const CAT_ACCENT = ["#f0ee42", "#5adb8a", "#ff6b6b", "#6eb5ff"];
const CAT_GLYPH = ["⬡", "◈", "⬟", "◇"];

/* JP label per category */
const CAT_JP = [
  { kanji: "後端", romaji: "KŌTAN" },
  { kanji: "移動体", romaji: "IDŌTAI" },
  { kanji: "前端", romaji: "ZENTAN" },
  { kanji: "道具", romaji: "DŌGU" },
];

const EXTRA = [
  "JWT",
  "OAuth2",
  "Swagger",
  "ImageKit",
  "Multer",
  "Joi",
  "Zod",
  "React Hook Form",
  "Framer Motion",
  "Supabase",
  "NextAuth",
  "nanoid",
  "Maze",
];

/* ══════════════════════════════════════════════
   Skill pill
══════════════════════════════════════════════ */
function SkillPill({ label, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        border: `2px solid ${hovered ? accent : "#2a2a2a"}`,
        background: hovered ? `${accent}12` : "transparent",
        cursor: "default",
        transition: "all .18s cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateX(4px)" : "none",
      }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: hovered ? accent : "#333",
          flexShrink: 0,
          transition: "background .18s",
        }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: hovered ? accent : "#777",
          letterSpacing: ".08em",
          transition: "color .18s",
          whiteSpace: "nowrap",
        }}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Category column
══════════════════════════════════════════════ */
function CatColumn({ cat, index, isLast }) {
  const ref = useReveal();
  const accent = CAT_ACCENT[index];
  const jpInfo = CAT_JP[index];

  return (
    <div
      ref={ref}
      className="nb-reveal skills-col"
      style={{
        borderRight: isLast ? "none" : "3px solid #1a1a1a",
        transitionDelay: `${index * 100}ms`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* ghost kanji watermark in column body */}
      <span
        style={{
          position: "absolute",
          bottom: 8,
          right: 6,
          fontFamily: JP,
          fontSize: 64,
          fontWeight: 700,
          color: "rgba(255,255,255,.03)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}>
        {jpInfo.kanji}
      </span>

      {/* header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "3px solid #1a1a1a",
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 16,
              color: "#0a0a0a",
              lineHeight: 1,
            }}>
            {CAT_GLYPH[index]}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                lineHeight: 1,
              }}>
              {cat.category}
            </span>
            {/* furigana-style JP label under category name */}
            <span
              style={{
                fontFamily: JP,
                fontSize: 8,
                color: "rgba(0,0,0,.3)",
                letterSpacing: ".08em",
                lineHeight: 1,
              }}>
              {jpInfo.kanji}
            </span>
          </div>
        </div>
        <span
          style={{
            fontFamily: COND,
            fontSize: 22,
            fontWeight: 800,
            color: "rgba(0,0,0,.25)",
            lineHeight: 1,
            letterSpacing: "-.02em",
          }}>
          {String(cat.items.length).padStart(2, "0")}
        </span>
      </div>

      {/* pills */}
      <div
        style={{
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
        }}>
        {cat.items.map((item) => (
          <SkillPill key={item} label={item} accent={accent} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function Skills() {
  const hRef = useReveal();
  const exRef = useReveal();
  const btRef = useReveal();

  const totalSkills = skills.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section id="skills" style={{ padding: "96px 0", background: "#0a0a0a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal.visible{opacity:1;transform:none;}

        .skills-wrap   { padding:0 48px; }
        .skills-header { display:flex; align-items:center; gap:0; margin-bottom:64px; }
        .skills-header-line  { flex:1; height:3px; background:#333; }
        .skills-header-title { font-size:38px; }
        .skills-grid   { display:grid; grid-template-columns:repeat(4,1fr); border:3px solid #1a1a1a; }
        .skills-col    { border-right:3px solid #1a1a1a; }
        .skills-col:last-child { border-right:none; }
        .skills-tagline { font-size:28px; }

        @media (max-width: 900px) {
          .skills-wrap { padding:0 24px; }
          .skills-grid { grid-template-columns:repeat(2,1fr); }
          .skills-col:nth-child(2) { border-right:none; }
          .skills-col:nth-child(3) { border-right:3px solid #1a1a1a; border-top:3px solid #1a1a1a; }
          .skills-col:nth-child(4) { border-top:3px solid #1a1a1a; }
          .skills-header-title { font-size:28px; }
          .skills-tagline { font-size:20px; }
        }
        @media (max-width: 540px) {
          .skills-wrap { padding:0 16px; }
          .skills-header { flex-direction:column; align-items:flex-start; margin-bottom:36px; }
          .skills-header-line { display:none; }
          .skills-header-title { border-top:none !important; font-size:24px; }
          .skills-grid { grid-template-columns:1fr; }
          .skills-col { border-right:none !important; border-top:3px solid #1a1a1a; }
          .skills-col:first-child { border-top:none; }
          .skills-tagline { font-size:18px; }
          .skills-bottom { flex-direction:column !important; align-items:flex-start !important; gap:8px !important; }
        }
      `}</style>

      <div className="skills-wrap" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ── Section header ── */}
        <div ref={hRef} className="nb-reveal skills-header">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".25em",
              textTransform: "uppercase",
              background: "#f0ee42",
              color: "#0a0a0a",
              border: "3px solid #f0ee42",
              padding: "8px 16px",
              whiteSpace: "nowrap",
            }}>
            02 — Skills
          </span>
          <div className="skills-header-line" />
          {/* JP annotation in the middle of header line */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 11,
              color: "#333",
              letterSpacing: ".08em",
              padding: "0 16px",
              whiteSpace: "nowrap",
            }}>
            技術一覧
          </span>
          <div className="skills-header-line" />
          <span
            className="skills-header-title"
            style={{
              fontFamily: COND,
              fontWeight: 800,
              color: "#f0ee42",
              letterSpacing: "-.01em",
              border: "3px solid #333",
              padding: "5px 20px",
              background: "#0a0a0a",
              whiteSpace: "nowrap",
            }}>
            What I Know
          </span>
        </div>

        {/* ── Skills grid ── */}
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <CatColumn
              key={cat.category}
              cat={cat}
              index={i}
              isLast={i === skills.length - 1}
            />
          ))}
        </div>

        {/* ── Also familiar with ── */}
        <div ref={exRef} className="nb-reveal" style={{ marginTop: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              marginBottom: 20,
            }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                background: "#444",
                padding: "6px 14px",
                whiteSpace: "nowrap",
              }}>
              // Also familiar with
            </span>
            <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
            {/* JP label end of line */}
            <span
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "#333",
                letterSpacing: ".05em",
                padding: "0 12px",
                whiteSpace: "nowrap",
              }}>
              その他
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {EXTRA.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#444",
                  border: "2px solid #1e1e1e",
                  padding: "7px 14px",
                  cursor: "default",
                  transition: "all .18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f0ee42";
                  e.currentTarget.style.borderColor = "#f0ee42";
                  e.currentTarget.style.background = "rgba(240,238,66,.07)";
                  e.currentTarget.style.transform = "translate(-2px,-2px)";
                  e.currentTarget.style.boxShadow = "3px 3px 0 #f0ee42";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#444";
                  e.currentTarget.style.borderColor = "#1e1e1e";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom tagline ── */}
        <div
          ref={btRef}
          className="nb-reveal"
          style={{
            marginTop: 56,
            borderTop: "3px solid #1a1a1a",
            paddingTop: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* JP translation above tagline */}
            <span
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "#2a2a2a",
                letterSpacing: ".1em",
              }}>
              常に学び、常に構築する。
            </span>
            <span
              className="skills-tagline"
              style={{
                fontFamily: COND,
                fontWeight: 800,
                color: "#222",
                letterSpacing: "-.01em",
              }}>
              Always learning. Always building.
            </span>
          </div>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "#444",
              letterSpacing: ".2em",
              textTransform: "uppercase",
            }}>
            {totalSkills + EXTRA.length}+ tools &amp; technologies
          </span>
        </div>
      </div>
    </section>
  );
}
