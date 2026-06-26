import { projects } from "../data/portfolio";

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

export default function ProjectsPage({ onNavigate }) {
  const sorted = [...projects].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div className="pf-page">
      <style>{`
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 500px) { .proj-grid { grid-template-columns: 1fr; gap: 10px; } }
      `}</style>

      <p className="pg-label">What I Built</p>
      <h2 className="pg-title">Projects</h2>

      <div className="proj-grid">
        {sorted.map((p) => (
          <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project: p, onNavigate }) {
  const isBlue = p.slug === "servisyuk";
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
