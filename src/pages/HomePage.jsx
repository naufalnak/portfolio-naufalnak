import { personal, stats, projects } from "../data/portfolio";
import DiscordStatus from "../components/DiscordStatus";
import RoleRotator from "../components/RoleRotator";

const FEATURED_SLUGS = ["bengkelhub", "food-tourism-assistant"];
const PROJECT_EMOJI = {
  AI: "🍜",
  Backend: "✈️",
  "Full Stack": "🔧",
  Mobile: "📱",
  Design: "🎨",
};
const PROJECT_BG = {
  AI: "#e8f0fe",
  Backend: "#eef0ff",
  "Full Stack": "#4f6ef7",
  Mobile: "#f0f4ff",
  Design: "#e8ffe8",
};

const ROW1 = [
  { name: "Go", icon: "devicon-go-original colored" },
  { name: "Go Fiber", icon: "devicon-go-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "Redis", icon: "devicon-redis-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain colored" },
  { name: "Kotlin", icon: "devicon-kotlin-plain colored" },
];
const ROW2 = [
  { name: "Laravel", icon: "devicon-laravel-plain colored" },
  { name: "Jetpack Compose", icon: "devicon-android-plain colored" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
  { name: "PHP", icon: "devicon-php-plain colored" },
  {
    name: "AWS Cloud",
    icon: "devicon-amazonwebservices-plain-wordmark colored",
  },
  { name: "Postman", icon: "devicon-postman-plain colored" },
  { name: "Figma", icon: "devicon-figma-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "Supabase", icon: "devicon-supabase-plain colored" },
];

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "3px 0",
        marginBottom: "8px",
      }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "40px",
          background: "linear-gradient(to right,#f0f4ff,transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "40px",
          background: "linear-gradient(to left,#f0f4ff,transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "8px",
          width: "max-content",
          animation: `${reverse ? "marqueeRev" : "marquee"} ${reverse ? "30s" : "24s"} linear infinite`,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fff",
              border: "2px solid #0a0a0a",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "2px 2px 0 #0a0a0a",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}>
            <i className={item.icon} style={{ fontSize: "16px" }} />
            {item.name}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee    { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes marqueeRev { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
      `}</style>
    </div>
  );
}

function Divider({ label, onAction, actionLabel }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "1.8rem 0 1rem",
      }}>
      <div
        style={{
          width: "24px",
          height: "2.5px",
          background: "#0a0a0a",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#888",
          whiteSpace: "nowrap",
        }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "2.5px", background: "#0a0a0a" }} />
      {onAction && (
        <button
          onClick={onAction}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4f6ef7",
            background: "none",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default function HomePage({ onNavigate }) {
  const featured = projects
    .filter((p) => FEATURED_SLUGS.includes(p.slug))
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 3);

  return (
    <div className="pf-page">
      <style>{`
        .home-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
        .home-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .home-proj-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 640px) {
          .home-hero { grid-template-columns: 1fr; }
          .home-stat-grid { grid-template-columns: repeat(2, 1fr); }
          .home-proj-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
        @media (max-width: 400px) {
          .home-proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="home-hero">
        <div>
          <h1
            style={{
              fontSize: "clamp(32px,8vw,42px)",
              fontWeight: 700,
              lineHeight: 1.08,
              marginBottom: "0.5rem",
            }}>
            <span style={{ color: "#4f6ef7" }}>{personal.firstName}</span>
            <br />
            {personal.lastName.split(" ")[0]}
            <br />
            {personal.lastName.split(" ")[1]}
          </h1>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "11px",
              color: "#888",
              marginBottom: "1rem",
              letterSpacing: "0.04em",
            }}>
            // <RoleRotator />
          </p>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.7,
              color: "#444",
              marginBottom: "1.2rem",
            }}>
            {personal.bio}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              className="nb-btn nb-btn-blue"
              onClick={() => onNavigate("projects")}>
              View Projects ↗
            </button>
            <a
              className="nb-btn nb-btn-white"
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer">
              Download CV
            </a>
          </div>
        </div>

        {/* Stat cards */}
        <div className="home-stat-grid">
          <div
            className="nb-card-blue"
            style={{
              gridColumn: "1/-1",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}>
                {stats[0].value}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#b8caff",
                  marginTop: "3px",
                }}>
                {stats[0].label}
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "32px",
                fontWeight: 700,
                opacity: 0.2,
              }}>
              {"{ }"}
            </div>
          </div>
          {stats.slice(1).map((s) => (
            <div
              key={s.label}
              className="nb-card"
              style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "26px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}>
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  marginTop: "3px",
                }}>
                {s.label}
              </div>
            </div>
          ))}
          <DiscordStatus />
        </div>
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <Divider
        label="Featured Projects"
        onAction={() => onNavigate("projects")}
        actionLabel="View all →"
      />
      <div className="home-proj-grid">
        {featured.map((p) => {
          const isBlue = p.slug === "BengkelHub";
          const hasImage = p.image && p.image !== "";
          return (
            <div
              key={p.id}
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
              {/* ── Thumbnail dengan foto ── */}
              <div
                style={{
                  height: "120px",
                  position: "relative",
                  borderBottom: "2.5px solid #0a0a0a",
                  background: isBlue
                    ? "#4f6ef7"
                    : PROJECT_BG[p.type] || "#f0f4ff",
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
                    }}
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
                      fontSize: isBlue ? "20px" : "28px",
                      fontWeight: 700,
                      fontFamily: "'Space Mono',monospace",
                      color: isBlue ? "#fff" : "#0a0a0a",
                    }}>
                    {isBlue ? "SY" : PROJECT_EMOJI[p.type] || "💻"}
                  </div>
                )}
              </div>

              <div style={{ padding: "0.8rem" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4f6ef7",
                    marginBottom: "3px",
                  }}>
                  {p.type} · {p.year}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    marginBottom: "6px",
                    lineHeight: 1.3,
                  }}>
                  {p.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "3px",
                    marginBottom: "8px",
                  }}>
                  {p.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        background: "#f0f4ff",
                        border: "1.5px solid #0a0a0a",
                        borderRadius: "4px",
                        padding: "2px 5px",
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
        })}
      </div>

      {/* ── TECH STACK MARQUEE ── */}
      <Divider label="Tech Stack" />
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse />
    </div>
  );
}
