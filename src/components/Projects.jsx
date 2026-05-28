import { useState, useRef, useEffect } from "react";
import { projects } from "../data/portfolio";

/* ─── shared ─── */
const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

const FILTERS = [
  "All",
  "AI / Full Stack",
  "Backend",
  "Mobile",
  "Design",
  "Education",
];

const TYPE_COLOR = {
  "AI / Full Stack": "#f0ee42",
  Backend: "#5adb8a",
  Mobile: "#6eb5ff",
  Design: "#ff6b6b",
  Education: "#ffb347",
};

/* JP label per type */
const TYPE_JP = {
  "AI / Full Stack": "全スタック",
  Backend: "後端",
  Mobile: "移動体",
  Design: "設計",
  Education: "教育",
};

/* ─── reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── icons ─── */
const IconGH = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const IconExt = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ══════════════
   FEATURED CARD
══════════════ */
function FeaturedCard({ p, index }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const color = TYPE_COLOR[p.type] ?? "#f0ee42";
  const jpLabel = TYPE_JP[p.type] ?? "作品";

  return (
    <div
      ref={ref}
      className="nb-reveal feat-card"
      style={{
        position: "relative",
        overflow: "hidden",
        border: "3px solid #0a0a0a",
        transitionDelay: `${index * 100}ms`,
        cursor: "default",
        height: 420,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* bg image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${p.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform .6s cubic-bezier(.16,1,.3,1)",
          filter: hovered ? "brightness(.35)" : "brightness(.22)",
        }}
      />

      {/* noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }}
      />

      {/* index watermark */}
      <span
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          fontFamily: COND,
          fontSize: 96,
          fontWeight: 900,
          color: "rgba(255,255,255,.06)",
          lineHeight: 1,
          letterSpacing: "-.04em",
          userSelect: "none",
        }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* type badge + JP sub-label */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            background: color,
            color: "#0a0a0a",
            padding: "4px 10px",
          }}>
          {p.type}
        </span>
        <span
          style={{
            fontFamily: JP,
            fontSize: 9,
            color: "rgba(255,255,255,.35)",
            letterSpacing: ".05em",
            paddingLeft: 2,
          }}>
          {jpLabel}
        </span>
      </div>

      {/* year */}
      <span
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: MONO,
          fontSize: 11,
          color: "rgba(255,255,255,.4)",
          letterSpacing: ".1em",
        }}>
        {p.year}
      </span>

      {/* bottom content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "32px 28px 28px",
          background:
            "linear-gradient(to top, rgba(10,10,10,.97) 60%, transparent)",
        }}>
        <h3
          style={{
            fontFamily: COND,
            fontSize: 34,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-.01em",
            marginBottom: 10,
          }}>
          {p.title}
        </h3>

        <div
          style={{
            maxHeight: hovered ? 80 : 0,
            overflow: "hidden",
            transition: "max-height .4s cubic-bezier(.16,1,.3,1)",
            marginBottom: hovered ? 14 : 0,
          }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.7)",
              lineHeight: 1.65,
            }}>
            {p.desc}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {p.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "rgba(255,255,255,.55)",
                  border: "1.5px solid rgba(255,255,255,.2)",
                  padding: "3px 8px",
                  letterSpacing: ".06em",
                  background: hovered ? "rgba(255,255,255,.08)" : "transparent",
                  transition: "background .25s",
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {p.repo && p.repo !== "#" && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  textDecoration: "none",
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,.5)")
                }>
                <IconGH /> Repo
              </a>
            )}
            {p.link && p.link !== "#" && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  textDecoration: "none",
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,.5)")
                }>
                <IconExt /> Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        }}
      />
    </div>
  );
}

/* ══════════════
   GALLERY CARD
══════════════ */
function GalleryCard({ p, index, noBorderRight }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const color = TYPE_COLOR[p.type] ?? "#f0ee42";
  const jpLabel = TYPE_JP[p.type] ?? "作品";

  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        border: "3px solid #0a0a0a",
        borderTop: "none",
        borderRight: noBorderRight ? "none" : "3px solid #0a0a0a",
        transitionDelay: `${index * 60}ms`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* image */}
      <div
        style={{
          position: "relative",
          height: 180,
          overflow: "hidden",
          borderBottom: "3px solid #0a0a0a",
          flexShrink: 0,
        }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${p.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.16,1,.3,1)",
            filter: "brightness(.85)",
          }}
        />

        {/* type + JP badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              background: color,
              color: "#0a0a0a",
              padding: "3px 8px",
            }}>
            {p.type}
          </span>
          <span
            style={{
              fontFamily: JP,
              fontSize: 8,
              color: "rgba(255,255,255,.45)",
              letterSpacing: ".04em",
              paddingLeft: 2,
            }}>
            {jpLabel}
          </span>
        </div>

        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontFamily: MONO,
            fontSize: 11,
            color: "rgba(255,255,255,.7)",
          }}>
          {p.year}
        </span>
      </div>

      {/* card body */}
      <div
        style={{
          padding: "20px 22px 22px",
          flex: 1,
          background: hovered ? "rgba(240,238,66,.04)" : "#fafaf8",
          transition: "background .2s",
          display: "flex",
          flexDirection: "column",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 8,
          }}>
          <h3
            style={{
              fontFamily: COND,
              fontSize: 20,
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-.01em",
              lineHeight: 1.15,
              flex: 1,
            }}>
            {p.title}
          </h3>
          <div
            style={{ display: "flex", gap: 8, marginLeft: 10, flexShrink: 0 }}>
            {p.repo && p.repo !== "#" && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#bbb",
                  textDecoration: "none",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}>
                <IconGH />
              </a>
            )}
            {p.link && p.link !== "#" && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#bbb",
                  textDecoration: "none",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}>
                <IconExt />
              </a>
            )}
          </div>
        </div>
        <p
          style={{
            fontSize: 12,
            color: "#666",
            lineHeight: 1.65,
            marginBottom: 14,
            flex: 1,
          }}>
          {p.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "#888",
                border: "1.5px solid #e0e0e0",
                padding: "3px 8px",
                letterSpacing: ".05em",
                background: hovered ? `${color}18` : "transparent",
                borderColor: hovered ? color : "#e0e0e0",
                transition: "all .2s",
              }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════
   LIST ROW
══════════════ */
function ListRow({ p, index }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const color = TYPE_COLOR[p.type] ?? "#f0ee42";
  const jpLabel = TYPE_JP[p.type] ?? "作品";

  return (
    <div
      ref={ref}
      className="nb-reveal list-row"
      style={{
        borderBottom: "3px solid #0a0a0a",
        transitionDelay: `${index * 60}ms`,
        background: hovered ? "rgba(240,238,66,.04)" : "transparent",
        transition: "background .2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        className="list-row-inner"
        style={{ display: "grid", gridTemplateColumns: "80px 80px 1fr 100px" }}>
        {/* thumb */}
        <div
          style={{
            borderRight: "3px solid #0a0a0a",
            overflow: "hidden",
            height: 80,
          }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${p.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              transition: "transform .4s cubic-bezier(.16,1,.3,1)",
              filter: "brightness(.9)",
            }}
          />
        </div>

        {/* meta */}
        <div
          style={{
            borderRight: "3px solid #0a0a0a",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
          }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "#888" }}>
            {p.year}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              background: color,
              color: "#0a0a0a",
              padding: "2px 6px",
              display: "inline-block",
            }}>
            {p.type}
          </span>
          {/* JP label */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 8,
              color: "#bbb",
              letterSpacing: ".04em",
            }}>
            {jpLabel}
          </span>
        </div>

        {/* body */}
        <div style={{ padding: "18px 28px" }}>
          <h3
            style={{
              fontFamily: COND,
              fontSize: 22,
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-.01em",
              lineHeight: 1.1,
              marginBottom: 6,
            }}>
            {p.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#666",
              lineHeight: 1.6,
              marginBottom: 10,
              maxWidth: 520,
            }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {p.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#777",
                  border: "1.5px solid #ddd",
                  padding: "2px 8px",
                  letterSpacing: ".04em",
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* links */}
        <div
          style={{
            borderLeft: "3px solid #0a0a0a",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
          }}>
          {p.repo && p.repo !== "#" && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "#aaa",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "color .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}>
              <IconGH /> Repo
            </a>
          )}
          {p.link && p.link !== "#" && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "#aaa",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "color .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}>
              <IconExt /> Live
            </a>
          )}
          {(!p.link || p.link === "#") && (!p.repo || p.repo === "#") && (
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "#ccc",
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}>
              Private
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function Projects() {
  const hRef = useReveal();
  const fRef = useReveal();
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState("gallery");

  const filtered = projects.filter(
    (p) => filter === "All" || p.type === filter,
  );
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const featCols =
    featured.length === 1
      ? "1fr"
      : featured.length === 2
        ? "1fr 1fr"
        : "1fr 1fr 1fr";

  return (
    <section id="projects" style={{ padding: "96px 0", background: "#fafaf8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal.visible{opacity:1;transform:none;}
        *{box-sizing:border-box;margin:0;padding:0;}

        .proj-wrap    { padding:0 48px; }
        .proj-header  { display:flex; align-items:center; gap:0; margin-bottom:48px; }
        .proj-header-line  { flex:1; height:3px; background:#0a0a0a; }
        .proj-header-title { font-size:38px; }
        .proj-controls { display:flex; align-items:center; justify-content:space-between; margin-bottom:48px; gap:16px; flex-wrap:wrap; }
        .proj-filters { display:flex; gap:0; border:3px solid #0a0a0a; width:fit-content; overflow-x:auto; }
        .proj-filter-btn { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; padding:10px 18px; border:none; border-right:3px solid #0a0a0a; cursor:pointer; transition:background .15s,color .15s; white-space:nowrap; }
        .proj-view-toggle { display:flex; border:3px solid #0a0a0a; overflow:hidden; flex-shrink:0; }
        .proj-featured-grid { display:grid; gap:0; border:3px solid #0a0a0a; border-bottom:none; }
        .proj-other-grid { display:grid; grid-template-columns:repeat(3,1fr); border:3px solid #0a0a0a; border-top:none; margin-bottom:40px; }
        .proj-stats { margin-top:48px; border:3px solid #0a0a0a; display:grid; grid-template-columns:repeat(3,1fr); }
        .feat-card { height:420px !important; }
        .list-row-inner { display:grid; grid-template-columns:80px 80px 1fr 100px; }

        @media (max-width: 900px) {
          .proj-wrap { padding:0 24px; }
          .proj-featured-grid { grid-template-columns:1fr 1fr !important; }
          .proj-other-grid { grid-template-columns:repeat(2,1fr) !important; }
          .proj-header-title { font-size:28px; }
          .feat-card { height:340px !important; }
        }
        @media (max-width: 600px) {
          .proj-wrap { padding:0 16px; }
          .proj-header { flex-direction:column; align-items:flex-start; margin-bottom:32px; }
          .proj-header-line { display:none; }
          .proj-header-title { border-top:none !important; font-size:24px; }
          .proj-controls { flex-direction:column; align-items:flex-start; margin-bottom:32px; }
          .proj-filters { overflow-x:auto; max-width:100%; -webkit-overflow-scrolling:touch; }
          .proj-filter-btn { font-size:9px; padding:8px 12px; }
          .proj-featured-grid { grid-template-columns:1fr !important; }
          .proj-other-grid { grid-template-columns:1fr !important; }
          .feat-card { height:300px !important; }
          .list-row-inner { grid-template-columns:60px 1fr !important; grid-template-rows:auto auto; }
          .list-row-inner > *:nth-child(2) { display:none; }
          .list-row-inner > *:nth-child(3) { padding:14px 16px !important; }
          .list-row-inner > *:nth-child(4) { border-left:none !important; border-top:3px solid #0a0a0a; grid-column:1/-1; flex-direction:row !important; padding:10px 16px !important; gap:16px !important; }
          .proj-stats { grid-template-columns:1fr !important; }
          .proj-stats > * { border-right:none !important; border-bottom:3px solid #0a0a0a; }
          .proj-stats > *:last-child { border-bottom:none; }
        }
      `}</style>

      <div className="proj-wrap" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ── Section header ── */}
        <div ref={hRef} className="nb-reveal proj-header">
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
            03 — Projects
          </span>
          <div className="proj-header-line" />
          {/* JP annotation in header */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 11,
              color: "rgba(0,0,0,.25)",
              letterSpacing: ".08em",
              padding: "0 16px",
              whiteSpace: "nowrap",
            }}>
            作品一覧
          </span>
          <div className="proj-header-line" />
          <span
            className="proj-header-title"
            style={{
              fontFamily: COND,
              fontWeight: 800,
              color: "#0a0a0a",
              letterSpacing: "-.01em",
              border: "3px solid #0a0a0a",
              padding: "5px 20px",
              background: "#fafaf8",
              whiteSpace: "nowrap",
            }}>
            What I Built
          </span>
        </div>

        {/* ── Controls ── */}
        <div ref={fRef} className="nb-reveal proj-controls">
          <div className="proj-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="proj-filter-btn"
                style={{
                  background: filter === f ? "#0a0a0a" : "transparent",
                  color: filter === f ? "#f0ee42" : "#888",
                }}
                onMouseEnter={(e) => {
                  if (filter !== f) {
                    e.currentTarget.style.background = "#f5f5f0";
                    e.currentTarget.style.color = "#0a0a0a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== f) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#888";
                  }
                }}>
                {f}
              </button>
            ))}
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: ".1em",
                padding: "10px 18px",
                background: "#f0ee42",
                color: "#0a0a0a",
                fontWeight: 700,
                flexShrink: 0,
              }}>
              {filtered.length}
            </div>
          </div>

          <div className="proj-view-toggle">
            {[
              { id: "gallery", label: "⊞ Gallery" },
              { id: "list", label: "☰ List" },
            ].map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  padding: "10px 16px",
                  background: viewMode === id ? "#0a0a0a" : "transparent",
                  color: viewMode === id ? "#f0ee42" : "#888",
                  border: "none",
                  borderRight: i === 0 ? "3px solid #0a0a0a" : "none",
                  cursor: "pointer",
                  transition: "background .15s, color .15s",
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ GALLERY VIEW ══ */}
        {viewMode === "gallery" && (
          <>
            {featured.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#aaa",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}>
                  <span
                    style={{
                      background: "#0a0a0a",
                      color: "#f0ee42",
                      padding: "5px 12px",
                      fontSize: 9,
                    }}>
                    ✦ Featured
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#ddd" }} />
                  {/* JP label */}
                  <span
                    style={{
                      fontFamily: JP,
                      fontSize: 9,
                      color: "#ccc",
                      letterSpacing: ".05em",
                    }}>
                    注目作品
                  </span>
                </div>

                <div
                  className="proj-featured-grid"
                  style={{ gridTemplateColumns: featCols }}>
                  {featured.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        borderRight:
                          i < featured.length - 1
                            ? "3px solid #0a0a0a"
                            : "none",
                      }}>
                      <FeaturedCard p={p} index={i} />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    borderBottom: "3px solid #0a0a0a",
                    marginBottom: 40,
                  }}
                />
              </>
            )}

            {rest.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0,
                    marginBottom: 0,
                  }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: ".25em",
                      textTransform: "uppercase",
                      color: "#888",
                      background: "#f0f0ea",
                      border: "3px solid #0a0a0a",
                      padding: "7px 16px",
                      whiteSpace: "nowrap",
                    }}>
                    // Other Projects
                  </span>
                  <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
                  <span
                    style={{
                      fontFamily: JP,
                      fontSize: 9,
                      color: "rgba(0,0,0,.25)",
                      border: "3px solid #0a0a0a",
                      borderLeft: "none",
                      padding: "7px 14px",
                      background: "#f0f0ea",
                      whiteSpace: "nowrap",
                    }}>
                    その他の作品
                  </span>
                </div>

                <div className="proj-other-grid">
                  {rest.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        borderRight: i % 3 < 2 ? "3px solid #0a0a0a" : "none",
                      }}>
                      <GalleryCard p={p} index={i} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {filtered.length === 0 && (
              <div
                style={{
                  border: "3px solid #0a0a0a",
                  padding: "64px",
                  textAlign: "center",
                  fontFamily: MONO,
                  fontSize: 12,
                  color: "#aaa",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}>
                No projects in this category
              </div>
            )}
          </>
        )}

        {/* ══ LIST VIEW ══ */}
        {viewMode === "list" && (
          <div style={{ border: "3px solid #0a0a0a", borderBottom: "none" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  borderBottom: "3px solid #0a0a0a",
                  padding: "48px",
                  textAlign: "center",
                  fontFamily: MONO,
                  fontSize: 12,
                  color: "#aaa",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}>
                No projects in this category
              </div>
            ) : (
              filtered.map((p, i) => <ListRow key={p.id} p={p} index={i} />)
            )}
          </div>
        )}

        {/* ── Stats strip ── */}
        <div className="proj-stats">
          {[
            { num: projects.length, label: "Total projects", jp: "総数" },
            {
              num: projects.filter((p) => p.featured).length,
              label: "Featured",
              jp: "注目",
            },
            {
              num: [...new Set(projects.map((p) => p.type))].length,
              label: "Categories",
              jp: "分類",
            },
          ].map(({ num, label, jp }, i) => (
            <div
              key={label}
              style={{
                padding: "20px 28px",
                borderRight: i < 2 ? "3px solid #0a0a0a" : "none",
                background:
                  i === 0 ? "#0a0a0a" : i === 1 ? "#f0ee42" : "#fafaf8",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                position: "relative",
                overflow: "hidden",
              }}>
              {/* ghost kanji */}
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 8,
                  fontFamily: JP,
                  fontSize: 28,
                  color: i === 0 ? "rgba(240,238,66,.07)" : "rgba(0,0,0,.07)",
                  userSelect: "none",
                  lineHeight: 1,
                }}>
                {jp}
              </span>
              <span
                style={{
                  fontFamily: COND,
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-.02em",
                  color: i === 0 ? "#f0ee42" : "#0a0a0a",
                }}>
                {num}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: i === 0 ? "rgba(240,238,66,.4)" : "rgba(0,0,0,.45)",
                }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
