import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects.json";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

const FILTERS = [
  "All",
  "AI",
  "Full Stack",
  "Backend",
  "Mobile",
  "Design",
  "Education",
];

const TYPE_COLOR = {
  AI: "#f0ee42",
  "Full Stack": "#E8B86D",
  Backend: "#5adb8a",
  Mobile: "#6eb5ff",
  Design: "#ff6b6b",
  Education: "#ffb347",
};
const TYPE_JP = {
  AI: "人工知能",
  "Full Stack": "全層開発",
  Backend: "後端開発",
  Mobile: "移動開発",
  Design: "設計",
  Education: "教育",
};

/* ── Inject once ── */
function useGlobalStyle(id, css) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const st = document.createElement("style");
    st.id = id;
    st.textContent = css;
    document.head.appendChild(st);
  }, []);
}

/* ── Navbar ── */
function PageNav() {
  useGlobalStyle(
    "pnav-style",
    `
    .pnav { padding: 0 24px; }
    @media(min-width:640px){ .pnav { padding: 0 48px; } }
    .pnav-back-text { display:none; }
    @media(min-width:400px){ .pnav-back-text { display:inline; } }
  `,
  );
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#0a0a0a",
        borderBottom: "3px solid #0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
      }}
      className="pnav">
      <Link
        to="/"
        style={{
          fontFamily: COND,
          fontSize: 20,
          fontWeight: 900,
          color: "#f0ee42",
          letterSpacing: "0.12em",
          textDecoration: "none",
        }}>
        NAK_
      </Link>
      <Link
        to="/"
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: "#666",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color 0.18s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ee42")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="pnav-back-text">Back to Home</span>
      </Link>
    </header>
  );
}

/* ── Card ── */
function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const color = TYPE_COLOR[p.type] ?? "#f0ee42";
  const jpLabel = TYPE_JP[p.type] ?? "作品";
  return (
    <Link
      to={`/projects/${p.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        height: "100%",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <div
        style={{
          position: "relative",
          background: "#fafaf8",
          overflow: "hidden",
          transition: "transform 0.18s,box-shadow 0.18s",
          transform: hov ? "translate(-4px,-4px)" : "translate(0,0)",
          boxShadow: hov ? "6px 6px 0 #0a0a0a" : "3px 3px 0 #0a0a0a",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Thumbnail */}
        <div
          style={{
            height: 160,
            background: p.image ? "#111" : "#1a1a1a",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}>
          {p.image ? (
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: hov ? 1 : 0.75,
                transition: "opacity 0.3s,transform 0.3s",
                transform: hov ? "scale(1.04)" : "scale(1)",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontFamily: JP,
                fontSize: 28,
                color: "rgba(240,238,66,0.15)",
              }}>
              {jpLabel}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: color,
              color: "#0a0a0a",
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "4px 9px",
              border: "2px solid #0a0a0a",
            }}>
            {p.type}
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#0a0a0a",
              color: "#666",
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.12em",
              padding: "4px 9px",
              border: "2px solid #333",
            }}>
            {p.year}
          </div>
          {p.featured && (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "#f0ee42",
                color: "#0a0a0a",
                fontFamily: MONO,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 7px",
                border: "2px solid #0a0a0a",
              }}>
              ★ Featured
            </div>
          )}
        </div>
        {/* Body */}
        <div
          style={{
            padding: "16px 16px 14px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
          <div
            style={{
              fontFamily: JP,
              fontSize: 8,
              color: "#bbb",
              letterSpacing: "0.05em",
            }}>
            {jpLabel}
          </div>
          <h3
            style={{
              fontFamily: COND,
              fontSize: 20,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#0a0a0a",
              margin: 0,
            }}>
            {p.title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              lineHeight: 1.6,
              color: "#555",
              flex: 1,
              margin: 0,
            }}>
            {p.shortDesc}
          </p>
          {/* Tags */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#666",
                  border: "1.5px solid #ccc",
                  padding: "2px 7px",
                  background: "#f5f5f0",
                }}>
                {t}
              </span>
            ))}
            {p.tags.length > 3 && (
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#999",
                  border: "1.5px solid #ddd",
                  padding: "2px 7px",
                }}>
                +{p.tags.length - 3}
              </span>
            )}
          </div>
          {/* Read more */}
          <div
            style={{
              marginTop: 6,
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: hov ? "#0a0a0a" : "#999",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "color 0.18s",
            }}>
            Read more
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Main ── */
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGlobalStyle(
    "proj-page-style",
    `
    /* Grid */
    .pp-grid {
      display:grid;
      grid-template-columns:1fr;
      border-left:3px solid #0a0a0a;
      border-top:3px solid #0a0a0a;
      margin-top:24px;
      margin-bottom:56px;
    }
    .pp-grid>* { border-right:3px solid #0a0a0a; border-bottom:3px solid #0a0a0a; }
    @media(min-width:500px){
      .pp-grid { grid-template-columns:repeat(2,1fr); }
    }
    @media(min-width:900px){
      .pp-grid { grid-template-columns:repeat(3,1fr); }
    }

    /* Filter bar — two rows on mobile, one row on desktop */
    .pp-filterbar {
      border-bottom:3px solid #0a0a0a;
      padding:12px 16px;
      display:flex;
      flex-direction:column;
      gap:10px;
    }
    @media(min-width:640px){
      .pp-filterbar {
        padding:14px 48px;
        flex-direction:row;
        align-items:center;
        gap:0;
      }
    }

    /* Top row: label + count (mobile) / inline (desktop) */
    .pp-filter-meta {
      display:flex;
      align-items:center;
      justify-content:space-between;
    }
    @media(min-width:640px){
      .pp-filter-meta { display:contents; }
      .pp-filter-label { margin-right:14px; }
      .pp-filter-count { margin-left:auto; padding-left:16px; }
    }

    /* Scrollable buttons row */
    .pp-filter-scroll {
      display:flex;
      overflow-x:auto;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
      gap:0;
    }
    .pp-filter-scroll::-webkit-scrollbar { display:none; }

    /* Filter buttons */
    .pp-fbtn {
      font-family:'DM Mono',monospace;
      font-size:10px;
      letter-spacing:0.15em;
      text-transform:uppercase;
      border:2.5px solid #0a0a0a;
      background:#fafaf8;
      color:#666;
      padding:7px 13px;
      cursor:pointer;
      transition:background 0.15s,color 0.15s;
      margin-right:-2.5px;
      white-space:nowrap;
      flex-shrink:0;
    }
    .pp-fbtn:hover,.pp-fbtn.active{ background:#0a0a0a;color:#f0ee42; }

    /* Hero padding */
    .pp-hero { padding:40px 16px 0; }
    @media(min-width:640px){ .pp-hero{padding:56px 48px 0;} }
    @media(min-width:1024px){ .pp-hero{padding:64px 64px 0;} }

    /* Grid outer padding */
    .pp-gridwrap { padding:0 16px; }
    @media(min-width:640px){ .pp-gridwrap{padding:0 48px;} }
    @media(min-width:1024px){ .pp-gridwrap{padding:0 64px;} }

    /* Footer */
    .pp-footer { padding:16px 16px; }
    @media(min-width:640px){ .pp-footer{padding:20px 48px;} }

    /* Stats strip */
    .pp-stats { display:flex; border-top:2px solid #1a1a1a; }
    .pp-stat { padding:14px 20px; border-right:2px solid #1a1a1a; }
    .pp-stat:last-child { border-right:none; }
    @media(min-width:640px){
      .pp-stat { padding:20px 32px; }
    }
  `,
  );

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.type === activeFilter);
  const featuredCount = projects.filter((p) => p.featured).length;
  const typeCount = [...new Set(projects.map((p) => p.type))].length;

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <PageNav />
      <main style={{ paddingTop: 56 }}>
        {/* ── Hero ── */}
        <div
          style={{
            background: "#0a0a0a",
            borderBottom: "3px solid #0a0a0a",
            position: "relative",
            overflow: "hidden",
          }}
          className="pp-hero">
          {/* Ghost kanji */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: -10,
              fontFamily: JP,
              fontSize: "clamp(80px,20vw,180px)",
              fontWeight: 900,
              color: "rgba(240,238,66,0.04)",
              lineHeight: 1,
              userSelect: "none",
              letterSpacing: "-0.04em",
              pointerEvents: "none",
            }}>
            作品集
          </div>
          <div
            style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            {/* Label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#f0ee42",
                }}>
                //&nbsp;Portfolio
              </span>
              <div style={{ width: 24, height: 1, background: "#333" }} />
              <span style={{ fontFamily: JP, fontSize: 10, color: "#444" }}>
                作品集
              </span>
            </div>
            <h1
              style={{
                fontFamily: COND,
                fontSize: "clamp(48px,11vw,120px)",
                fontWeight: 900,
                color: "#fafaf8",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
              ALL
              <br />
              <span style={{ color: "#f0ee42" }}>PROJECTS</span>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(13px,2vw,15px)",
                color: "#666",
                maxWidth: 480,
                lineHeight: 1.7,
                marginBottom: 36,
              }}>
              A curated collection of work spanning backend systems, mobile
              apps, AI experiments, and design — built with care, shipped with
              purpose.
            </p>
            {/* Stats */}
            <div className="pp-stats">
              {[
                { num: projects.length, label: "Total", jp: "総数" },
                { num: featuredCount, label: "Featured", jp: "注目" },
                { num: typeCount, label: "Categories", jp: "分類" },
              ].map(({ num, label, jp }, i) => (
                <div key={label} className="pp-stat">
                  <div
                    style={{
                      fontFamily: COND,
                      fontSize: "clamp(28px,6vw,40px)",
                      fontWeight: 900,
                      color: i === 0 ? "#f0ee42" : "#fafaf8",
                      lineHeight: 1,
                    }}>
                    {num}
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#444",
                      marginTop: 2,
                    }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="pp-filterbar">
          {/* Row 1 on mobile: label + count */}
          <div className="pp-filter-meta">
            <span
              className="pp-filter-label"
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#aaa",
                whiteSpace: "nowrap",
              }}>
              Filter:
            </span>
            <span
              className="pp-filter-count"
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "#aaa",
                whiteSpace: "nowrap",
              }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          {/* Row 2 on mobile: scrollable buttons */}
          <div className="pp-filter-scroll">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`pp-fbtn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        <div
          className="pp-gridwrap"
          style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                fontFamily: MONO,
                fontSize: 11,
                color: "#aaa",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>
              No projects in this category
            </div>
          ) : (
            <div className="pp-grid">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer strip ── */}
        <div
          className="pp-footer"
          style={{
            borderTop: "3px solid #0a0a0a",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "#333",
              letterSpacing: "0.15em",
            }}>
            NAK_ / PROJECTS
          </span>
          <span style={{ fontFamily: JP, fontSize: 12, color: "#333" }}>
            作品集
          </span>
        </div>
      </main>
    </div>
  );
}
