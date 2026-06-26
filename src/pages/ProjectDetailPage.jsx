import { useState, useEffect } from "react";
import projects from "../data/projects.json";

/* Markdown loader via Vite glob */
const mdEN = import.meta.glob("../content/projects/en/*.md", {
  query: "?raw",
  import: "default",
});
const mdID = import.meta.glob("../content/projects/id/*.md", {
  query: "?raw",
  import: "default",
});

async function loadMarkdown(slug, lang) {
  const map = lang === "en" ? mdEN : mdID;
  const key = `../content/projects/${lang}/${slug}.md`;
  return map[key] ? await map[key]() : null;
}

function LangToggle({ lang, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        border: "2px solid #0a0a0a",
        borderRadius: "6px",
        overflow: "hidden",
      }}>
      {["id", "en"].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "6px 14px",
            cursor: "pointer",
            background: lang === l ? "#4f6ef7" : "#fff",
            color: lang === l ? "#fff" : "#888",
            border: "none",
            borderRight: l === "id" ? "2px solid #0a0a0a" : "none",
            transition: "background 0.15s, color 0.15s",
          }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function ProjectDetailPage({ slug, onBack, onNavigate }) {
  const [lang, setLang] = useState("id");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = project
      ? `${project.title} | Naufal Andresya`
      : "Project Not Found | Naufal Andresya";
  }, [project]);

  useEffect(() => {
    setLoading(true);
    setContent(null);
    loadMarkdown(slug, lang).then((md) => {
      setContent(md);
      setLoading(false);
    });
  }, [slug, lang]);

  if (!project) {
    return (
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#e0e0e0",
            fontFamily: "'Space Mono', monospace",
          }}>
          404
        </div>
        <p style={{ color: "#888", marginTop: "8px" }}>Project not found.</p>
        <button
          className="nb-btn nb-btn-blue"
          onClick={onBack}
          style={{ marginTop: "1.2rem" }}>
          ← Back to Projects
        </button>
      </div>
    );
  }

  const related = projects
    .filter((p) => p.slug !== slug && p.type === project.type)
    .slice(0, 3);

  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "1.5rem 1rem 2rem",
      }}>
      <style>{`
        .detail-hero-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .detail-related { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        @media (max-width: 500px) {
          .detail-related { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#888",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1.2rem",
          padding: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#4f6ef7")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}>
        ← Back to Projects
      </button>

      {/* Hero card */}
      <div
        className="nb-card-blue"
        style={{
          marginBottom: "1rem",
          position: "relative",
          overflow: "hidden",
        }}>
        {/* Deco bg text */}
        <div
          style={{
            position: "absolute",
            right: -10,
            top: -10,
            fontFamily: "'Space Mono', monospace",
            fontSize: "80px",
            fontWeight: 700,
            opacity: 0.08,
            color: "#fff",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}>
          {project.type.replace(" ", "")}
        </div>

        <div style={{ position: "relative" }}>
          {/* Badge row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "4px",
                padding: "3px 9px",
                color: "#fff",
              }}>
              {project.type}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: "#b8caff",
              }}>
              {project.year}
            </span>
            {project.featured && (
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "rgba(255,255,255,0.1)",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                }}>
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(20px, 5vw, 34px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "10px",
            }}>
            {project.title}
          </h1>

          {/* Desc */}
          <p
            style={{
              fontSize: "13px",
              color: "#b8caff",
              lineHeight: 1.7,
              marginBottom: "14px",
              maxWidth: "580px",
            }}>
            {project.desc}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginBottom: "16px",
            }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  color: "#fff",
                }}>
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {project.link && project.link !== "#" && (
              <a
                className="nb-btn nb-btn-white"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "11px" }}>
                Live Demo ↗
              </a>
            )}
            {project.repo && project.repo !== "#" && (
              <a
                className="nb-btn"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "11px",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.3)",
                  boxShadow: "none",
                }}>
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project image */}
      {project.image && project.image !== "" && (
        <div
          style={{
            marginBottom: "1rem",
            border: "2.5px solid #0a0a0a",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "5px 5px 0 #0a0a0a",
            position: "relative",
            background: "#e8f0fe",
          }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              display: "block",
              maxHeight: "420px",
              objectFit: "cover",
              objectPosition: "top center",
            }}
            onError={(e) => {
              e.currentTarget.parentElement.style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              background: "rgba(255,255,255,0.92)",
              border: "2px solid #0a0a0a",
              borderRadius: "6px",
              padding: "4px 10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              boxShadow: "2px 2px 0 #0a0a0a",
            }}>
            📸 Preview
          </div>
        </div>
      )}

      {/* Case study / markdown */}
      <div className="nb-card" style={{ marginBottom: "1rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.2rem",
            paddingBottom: "0.9rem",
            borderBottom: "2px solid #e8e8e8",
            gap: "10px",
            flexWrap: "wrap",
          }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#888",
            }}>
            // Case Study
          </span>
          <LangToggle lang={lang} onChange={setLang} />
        </div>

        {/* Content */}
        {loading ? (
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "#aaa",
              letterSpacing: "0.12em",
            }}>
            Loading...
          </p>
        ) : content ? (
          <div
            className="proj-md"
            key={lang}
            style={{ animation: "pageFadeIn 0.2s ease" }}>
            {/* Inline markdown styles */}
            <style>{`
              .proj-md h1 { font-size: 22px; font-weight: 700; margin: 1.4rem 0 0.7rem; border-bottom: 2px solid #e8e8e8; padding-bottom: 8px; }
              .proj-md h1:first-child { margin-top: 0; }
              .proj-md h2 { font-size: 16px; font-weight: 700; margin: 1.2rem 0 0.5rem; color: #4f6ef7; font-family: 'Space Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase; font-size: 11px; }
              .proj-md h3 { font-size: 13px; font-weight: 700; margin: 1rem 0 0.4rem; color: #555; font-family: 'Space Mono', monospace; }
              .proj-md p { font-size: 14px; line-height: 1.75; color: #333; margin-bottom: 0.9rem; }
              .proj-md ul, .proj-md ol { margin: 0 0 0.9rem 1.2rem; }
              .proj-md li { font-size: 14px; line-height: 1.7; color: #333; margin-bottom: 4px; }
              .proj-md strong { font-weight: 700; color: #0a0a0a; }
              .proj-md em { font-style: italic; color: #555; }
              .proj-md code { font-family: 'Space Mono', monospace; font-size: 11px; background: #f0f4ff; border: 1.5px solid #d0d8ff; border-radius: 4px; padding: 2px 6px; color: #4f6ef7; }
              .proj-md pre { background: #0a0a0a; border: 2.5px solid #0a0a0a; border-radius: 8px; padding: 14px 16px; overflow-x: auto; margin: 1rem 0; box-shadow: 4px 4px 0 #4f6ef7; }
              .proj-md pre code { background: none; border: none; color: #a8c4ff; padding: 0; }
              .proj-md blockquote { border-left: 4px solid #4f6ef7; margin: 1rem 0; padding: 8px 14px; background: #f0f4ff; border-radius: 0 8px 8px 0; }
              .proj-md blockquote p { margin: 0; color: #4f6ef7; }
              .proj-md hr { border: none; border-top: 2px solid #e8e8e8; margin: 1.4rem 0; }
              .proj-md a { color: #4f6ef7; text-decoration: underline; text-underline-offset: 3px; }
            `}</style>
            <ReactMarkdownWrapper content={content} />
          </div>
        ) : (
          <div
            style={{
              border: "2px dashed #d0d8ff",
              borderRadius: "8px",
              padding: "2rem",
              textAlign: "center",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "#aaa",
              letterSpacing: "0.1em",
            }}>
            {lang === "id"
              ? "Belum ada writeup untuk project ini."
              : "No writeup available yet."}
          </div>
        )}
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: "12px",
            }}>
            // Related Projects
          </div>
          <div className="detail-related">
            {related.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate("project-detail", p.slug)}
                style={{
                  background: "#fff",
                  border: "2.5px solid #0a0a0a",
                  borderRadius: "10px",
                  padding: "0.9rem",
                  boxShadow: "3px 3px 0 #0a0a0a",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-2px,-2px)";
                  e.currentTarget.style.boxShadow = "5px 5px 0 #0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0,0)";
                  e.currentTarget.style.boxShadow = "3px 3px 0 #0a0a0a";
                }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    color: "#4f6ef7",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>
                  {p.type}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: "#0a0a0a",
                  }}>
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    color: "#aaa",
                    marginTop: "6px",
                  }}>
                  {p.year} →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* Lazy-load ReactMarkdown to keep bundle clean */
import { lazy, Suspense } from "react";
const ReactMarkdown = lazy(() => import("react-markdown"));
function ReactMarkdownWrapper({ content }) {
  return (
    <Suspense
      fallback={
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "#aaa",
          }}>
          Rendering…
        </p>
      }>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Suspense>
  );
}
