import { useState } from "react";
import { projects } from "../data/portfolio";
import { blogPosts, blogCategories, blogCategoryEmoji } from "../data/blog";

const PROJECT_EMOJI = {
  AI: "🍜",
  Backend: "✈️",
  "Full Stack": "🔧",
  Mobile: "📱",
  Design: "🎨",
  Education: "📚",
};
const PROJECT_BG = {
  AI: "#e8f0fe",
  Backend: "#eef0ff",
  "Full Stack": "#4f6ef7",
  Mobile: "#f0f4ff",
  Design: "#e8ffe8",
  Education: "#fff0e0",
};

export default function ProjectsPage({ onNavigate, activeTab, onTabChange }) {
  const [localTab, setLocalTab] = useState("showcase");
  const tab = activeTab ?? localTab;
  const setTab = onTabChange ?? setLocalTab;
  const sorted = [...projects].sort((a, b) => Number(b.year) - Number(a.year));
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="pf-page">
      <style>{`
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 500px) { .proj-grid { grid-template-columns: 1fr; gap: 10px; } }
        .proj-tabs { display: inline-flex; border: 2.5px solid #0a0a0a; border-radius: 10px; overflow: hidden; box-shadow: 3px 3px 0 #0a0a0a; margin-bottom: 1.4rem; }
        .proj-tab-btn { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 9px 18px; border: none; cursor: pointer; background: #fff; color: #888; transition: background .15s, color .15s; }
        .proj-tab-btn:first-child { border-right: 2.5px solid #0a0a0a; }
        .proj-tab-btn.active { background: #4f6ef7; color: #fff; }
        .blog-grid { display: flex; flex-direction: column; gap: 12px; }
      `}</style>

      <p className="pg-label">
        {tab === "showcase" ? "What I Built" : "What I Write"}
      </p>
      <h2 className="pg-title">{tab === "showcase" ? "Projects" : "Blog"}</h2>

      <div className="proj-tabs">
        <button
          className={`proj-tab-btn${tab === "showcase" ? " active" : ""}`}
          onClick={() => setTab("showcase")}>
          🔧 Showcase
        </button>
        <button
          className={`proj-tab-btn${tab === "blog" ? " active" : ""}`}
          onClick={() => setTab("blog")}>
          ✍️ Blog
        </button>
      </div>

      {tab === "showcase" ? (
        <div className="proj-grid">
          {sorted.map((p) => (
            <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="blog-grid">
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ post, onNavigate }) {
  const dateLabel = new Date(post.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => onNavigate("blog-detail", post.slug)}
      style={{
        background: "#fff",
        border: "2.5px solid #0a0a0a",
        borderRadius: "12px",
        padding: "1rem 1.1rem",
        boxShadow: "5px 5px 0 #0a0a0a",
        cursor: "pointer",
        transition: "transform .15s,box-shadow .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px,-3px)";
        e.currentTarget.style.boxShadow = "8px 8px 0 #0a0a0a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "5px 5px 0 #0a0a0a";
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "#f0f4ff",
            border: "1.5px solid #0a0a0a",
            borderRadius: "4px",
            padding: "3px 8px",
          }}>
          {blogCategoryEmoji[post.category]} {blogCategories[post.category].id}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            color: "#aaa",
          }}>
          {dateLabel} · {post.readTime} min baca
        </span>
      </div>

      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          marginBottom: "6px",
          lineHeight: 1.3,
        }}>
        {post.title.id}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          lineHeight: 1.6,
          marginBottom: "10px",
        }}>
        {post.excerpt.id}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "10px",
        }}>
        {post.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "9px",
              fontWeight: 600,
              background: "#f0f4ff",
              border: "1.5px solid #0a0a0a",
              borderRadius: "4px",
              padding: "2px 6px",
            }}>
            {t}
          </span>
        ))}
      </div>
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "9px",
          fontWeight: 700,
          color: "#4f6ef7",
          letterSpacing: "0.08em",
        }}>
        Baca tulisan →
      </span>
    </div>
  );
}

function ProjectCard({ project: p, onNavigate }) {
  const isBlue = p.slug === "BengkelHub";
  const hasImage = p.image && p.image !== "";

  return (
    <div
      onClick={() => onNavigate("project-detail", p.slug)}
      style={{
        background: "#fff",
        border: "2.5px solid #0a0a0a",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "5px 5px 0 #0a0a0a",
        cursor: "pointer",
        transition: "transform .15s,box-shadow .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-3px,-3px)";
        e.currentTarget.style.boxShadow = "8px 8px 0 #0a0a0a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "5px 5px 0 #0a0a0a";
      }}>
      {/* Thumbnail */}
      <div
        style={{
          height: "160px",
          position: "relative",
          borderBottom: "2.5px solid #0a0a0a",
          background: PROJECT_BG[p.type] || "#f0f4ff",
          overflow: "hidden",
        }}>
        {hasImage ? (
          <img
            src={p.image}
            alt={p.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              background: isBlue ? "#4f6ef7" : PROJECT_BG[p.type] || "#f0f4ff",
              fontFamily: "'Space Mono',monospace",
              fontWeight: 700,
              color: isBlue ? "#fff" : "#0a0a0a",
            }}>
            {isBlue ? "SY" : PROJECT_EMOJI[p.type] || "💻"}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "rgba(255,255,255,0.9)",
            border: "1.5px solid #0a0a0a",
            borderRadius: "4px",
            padding: "3px 8px",
            boxShadow: "2px 2px 0 #0a0a0a",
          }}>
          {p.type}
        </div>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            fontWeight: 700,
            background: "#4f6ef7",
            color: "#fff",
            border: "1.5px solid #0a0a0a",
            borderRadius: "4px",
            padding: "3px 8px",
            boxShadow: "2px 2px 0 #0a0a0a",
          }}>
          {p.year}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: "6px",
            lineHeight: 1.3,
          }}>
          {p.title}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#666",
            lineHeight: 1.6,
            marginBottom: "10px",
          }}>
          {p.desc.length > 120 ? p.desc.slice(0, 120) + "…" : p.desc}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "10px",
          }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "9px",
                fontWeight: 600,
                background: "#f0f4ff",
                border: "1.5px solid #0a0a0a",
                borderRadius: "4px",
                padding: "2px 6px",
              }}>
              {t}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            fontWeight: 700,
            color: "#4f6ef7",
            letterSpacing: "0.08em",
          }}>
          Read case study →
        </span>
      </div>
    </div>
  );
}
