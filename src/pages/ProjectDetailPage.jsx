import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import projects from "../data/projects.json";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

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

/* ── Markdown loader via Vite glob ── */
const mdModules = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  import: "default",
});
async function loadMarkdown(slug) {
  const key = `../content/projects/${slug}.md`;
  return mdModules[key] ? await mdModules[key]() : null;
}

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

/* ── Icons ── */
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

/* ── Navbar ── */
function PageNav() {
  useGlobalStyle(
    "pdnav-style",
    `
    .pdnav { padding:0 16px; }
    @media(min-width:640px){ .pdnav{padding:0 48px;} }
    .pdnav-home { display:none; }
    @media(min-width:480px){ .pdnav-home{display:flex;} }
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
      className="pdnav">
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
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <Link
          to="/"
          className="pdnav-home"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "#444",
            padding: "0 14px",
            height: 56,
            alignItems: "center",
            borderRight: "1px solid #1a1a1a",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ee42")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}>
          Home
        </Link>
        <Link
          to="/projects"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "#f0ee42",
            padding: "0 14px",
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#f0ee42")}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Projects
        </Link>
      </div>
    </header>
  );
}

/* ── Related Card ── */
function RelatedCard({ p }) {
  const [hov, setHov] = useState(false);
  const color = TYPE_COLOR[p.type] ?? "#f0ee42";
  return (
    <Link
      to={`/projects/${p.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      <div
        style={{
          border: "2.5px solid #0a0a0a",
          padding: "14px 16px",
          transition: "transform 0.15s,box-shadow 0.15s",
          background: "#fafaf8",
          transform: hov ? "translate(-3px,-3px)" : "translate(0,0)",
          boxShadow: hov ? "5px 5px 0 #0a0a0a" : "2px 2px 0 #ddd",
        }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 9,
            color,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 5,
          }}>
          {p.type}
        </div>
        <div
          style={{
            fontFamily: COND,
            fontSize: 15,
            fontWeight: 800,
            color: "#0a0a0a",
            lineHeight: 1.2,
          }}>
          {p.title}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 9,
            color: "#999",
            marginTop: 7,
            letterSpacing: "0.1em",
          }}>
          {p.year} →
        </div>
      </div>
    </Link>
  );
}

/* ── Main ── */
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setContent(null);
    loadMarkdown(slug).then((md) => {
      setContent(md);
      setLoading(false);
    });
  }, [slug]);

  useGlobalStyle(
    "pdpage-style",
    `
    /* Layout */
    .pd-hero-inner { padding:36px 16px 32px; max-width:900px; margin:0 auto; }
    @media(min-width:640px){ .pd-hero-inner{padding:48px 48px 40px;} }
    @media(min-width:1024px){ .pd-hero-inner{padding:56px 64px 48px;} }

    .pd-content-wrap { max-width:900px; margin:0 auto; padding:0 16px; }
    @media(min-width:640px){ .pd-content-wrap{padding:0 48px;} }
    @media(min-width:1024px){ .pd-content-wrap{padding:0 64px;} }

    .pd-related { max-width:900px; margin:0 auto; padding:36px 16px; border-top:3px solid #0a0a0a; }
    @media(min-width:640px){ .pd-related{padding:40px 48px;} }
    @media(min-width:1024px){ .pd-related{padding:48px 64px;} }

    .pd-related-grid { display:grid; grid-template-columns:1fr; gap:12px; }
    @media(min-width:480px){ .pd-related-grid{grid-template-columns:repeat(2,1fr);} }
    @media(min-width:768px){ .pd-related-grid{grid-template-columns:repeat(3,1fr);} }

    .pd-bottom { border-top:3px solid #0a0a0a; padding:18px 16px;
      display:flex;justify-content:space-between;align-items:center;background:#fafaf8; }
    @media(min-width:640px){ .pd-bottom{padding:22px 48px;} }

    /* CTA buttons — stack on narrow mobile */
    .pd-cta { display:flex; flex-wrap:wrap; gap:0; }

    /* Markdown */
    .proj-md h1 {
      font-family:'Barlow Condensed','Arial Narrow',sans-serif;
      font-size:clamp(24px,5vw,36px); font-weight:900; letter-spacing:-0.01em;
      color:#0a0a0a; margin:36px 0 14px; line-height:1.1;
      border-bottom:3px solid #0a0a0a; padding-bottom:10px;
    }
    .proj-md h1:first-child { margin-top:0; }
    .proj-md h2 {
      font-family:'Barlow Condensed','Arial Narrow',sans-serif;
      font-size:clamp(16px,3vw,22px); font-weight:800; letter-spacing:0.05em;
      text-transform:uppercase; color:#0a0a0a; margin:30px 0 10px;
    }
    .proj-md h3 {
      font-family:'DM Mono','Fira Mono',monospace; font-size:12px; font-weight:600;
      letter-spacing:0.1em; text-transform:uppercase; color:#555; margin:20px 0 7px;
    }
    .proj-md p {
      font-family:'DM Sans',sans-serif; font-size:clamp(13px,2vw,15px);
      line-height:1.8; color:#333; margin:0 0 14px;
    }
    .proj-md ul,.proj-md ol { margin:0 0 14px 0; padding-left:20px; }
    .proj-md li {
      font-family:'DM Sans',sans-serif; font-size:clamp(13px,2vw,15px);
      line-height:1.7; color:#333; margin-bottom:5px;
    }
    .proj-md li::marker { color:#f0ee42; }
    .proj-md strong { font-weight:700; color:#0a0a0a; }
    .proj-md em { font-style:italic; color:#555; }
    .proj-md code {
      font-family:'DM Mono','Fira Mono',monospace; font-size:12px;
      background:#f0f0ea; border:1.5px solid #ddd; padding:2px 6px; color:#0a0a0a;
    }
    .proj-md pre {
      background:#0a0a0a; border:3px solid #0a0a0a;
      padding:16px 18px; overflow-x:auto; margin:18px 0;
    }
    .proj-md pre code { background:none;border:none;color:#f0ee42;font-size:12px;padding:0; }
    .proj-md blockquote {
      border-left:4px solid #f0ee42; margin:16px 0;
      padding:10px 16px; background:#f5f5f0;
    }
    .proj-md blockquote p { margin:0; font-style:italic; }
    .proj-md hr { border:none; border-top:2px solid #e8e8e0; margin:28px 0; }
    .proj-md a { color:#0a0a0a; text-decoration:underline;
      text-decoration-color:#f0ee42; text-underline-offset:3px; }
    .proj-md a:hover { color:#555; }
  `,
  );

  if (!project) {
    return (
      <div
        style={{ minHeight: "100vh", background: "#fafaf8", paddingTop: 56 }}>
        <PageNav />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: 14,
            padding: "0 24px",
            textAlign: "center",
          }}>
          <div
            style={{
              fontFamily: COND,
              fontSize: "clamp(60px,15vw,80px)",
              fontWeight: 900,
              color: "#e8e8e0",
            }}>
            404
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "#aaa",
              letterSpacing: "0.2em",
            }}>
            PROJECT NOT FOUND
          </div>
          <Link
            to="/projects"
            style={{
              marginTop: 12,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#0a0a0a",
              border: "2.5px solid #0a0a0a",
              padding: "10px 24px",
            }}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const color = TYPE_COLOR[project.type] ?? "#f0ee42";
  const jpLabel = TYPE_JP[project.type] ?? "作品";
  const related = projects
    .filter((p) => p.slug !== slug && p.type === project.type)
    .slice(0, 3);

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
          }}>
          {/* Ghost */}
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -20,
              fontFamily: JP,
              fontSize: "clamp(100px,25vw,220px)",
              fontWeight: 900,
              color: "rgba(240,238,66,0.03)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}>
            {jpLabel}
          </div>
          {/* BG image */}
          {project.image && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.07,
              }}
            />
          )}
          <div className="pd-hero-inner">
            {/* Badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16,
              }}>
              <span
                style={{
                  background: color,
                  color: "#0a0a0a",
                  fontFamily: MONO,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "2px solid " + color,
                }}>
                {project.type}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: "0.12em",
                }}>
                {project.year}
              </span>
              {project.featured && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 8,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#f0ee42",
                    border: "1.5px solid #333",
                    padding: "3px 7px",
                  }}>
                  ★ Featured
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: COND,
                fontSize: "clamp(30px,7vw,72px)",
                fontWeight: 900,
                color: "#fafaf8",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}>
              {project.title}
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(13px,2vw,15px)",
                color: "#666",
                lineHeight: 1.7,
                maxWidth: 600,
                marginBottom: 24,
              }}>
              {project.desc}
            </p>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 24,
              }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#888",
                    border: "1.5px solid #222",
                    padding: "4px 10px",
                    background: "#111",
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pd-cta">
              {project.link && project.link != "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#0a0a0a",
                    background: "#f0ee42",
                    border: "2.5px solid #f0ee42",
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    transition: "background 0.15s,color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0a0a0a";
                    e.currentTarget.style.color = "#f0ee42";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f0ee42";
                    e.currentTarget.style.color = "#0a0a0a";
                  }}>
                  <IconExt /> Live Demo
                </a>
              )}
              {project.repo && project.repo != "#" && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#888",
                    border: "2.5px solid #222",
                    borderLeft:
                      project.link && project.link != "#"
                        ? "none"
                        : "2.5px solid #222",
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f0ee42")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}>
                  <IconGH /> Repo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Markdown content ── */}
        <div className="pd-content-wrap">
          <div style={{ padding: "40px 0", borderRight: "3px solid #e8e8e0" }}>
            {loading ? (
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#aaa",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "32px 0",
                }}>
                Loading...
              </div>
            ) : content ? (
              <div className="proj-md">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <div
                style={{
                  border: "2.5px dashed #ddd",
                  padding: "32px",
                  textAlign: "center",
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#bbb",
                  letterSpacing: "0.12em",
                }}>
                No detailed writeup yet for this project.
              </div>
            )}
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="pd-related">
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
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#888",
                  background: "#f0f0ea",
                  border: "2.5px solid #0a0a0a",
                  padding: "6px 14px",
                }}>
                // Related Projects
              </span>
              <div style={{ flex: 1, height: 2.5, background: "#0a0a0a" }} />
            </div>
            <div className="pd-related-grid">
              {related.map((p) => (
                <RelatedCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom bar ── */}
        <div className="pd-bottom">
          <Link
            to="/projects"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#555",
              display: "flex",
              alignItems: "center",
              gap: 7,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All Projects
          </Link>
          <span style={{ fontFamily: JP, fontSize: 11, color: "#ccc" }}>
            {jpLabel}
          </span>
        </div>
      </main>
    </div>
  );
}
