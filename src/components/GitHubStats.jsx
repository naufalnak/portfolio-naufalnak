import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";
const u = personal.github;

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

const LANG_COLORS = {
  JavaScript: "#f0ee42",
  TypeScript: "#6eb5ff",
  Kotlin: "#6eb5ff",
  Python: "#5adb8a",
  Go: "#5adb8a",
  PHP: "#888",
  Java: "#ff6b6b",
  CSS: "#ff6b6b",
  HTML: "#f0a042",
  Shell: "#888",
  Dart: "#5adb8a",
  Swift: "#ff6b6b",
  "C++": "#888",
  C: "#888",
  Ruby: "#ff6b6b",
};
const langColor = (n) => LANG_COLORS[n] ?? "#666";

/* JP stat labels */
const STAT_JP = ["リポジトリ", "フォロワー", "最長記録", "連続記録"];
const STREAK_JP = ["総計", "現在", "最長"];

async function fetchUser() {
  const r = await fetch(`https://api.github.com/users/${u}`);
  return r.json();
}
async function fetchRepos() {
  const r = await fetch(
    `https://api.github.com/users/${u}/repos?per_page=100&sort=updated`,
  );
  return r.json();
}
async function fetchEvents() {
  const r = await fetch(
    `https://api.github.com/users/${u}/events/public?per_page=100`,
  );
  return r.json();
}

function computeLangs(repos) {
  const map = {};
  repos.forEach((r) => {
    if (r.language) map[r.language] = (map[r.language] ?? 0) + (r.size || 1);
  });
  const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, size]) => ({ name, pct: Math.round((size / total) * 100) }));
}

function computeHeatmap(events) {
  const counts = {};
  events.forEach((e) => {
    const d = e.created_at?.slice(0, 10);
    if (d) counts[d] = (counts[d] ?? 0) + 1;
  });
  const cells = [];
  const today = new Date();
  for (let i = 139; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    cells.push(counts[d.toISOString().slice(0, 10)] ?? 0);
  }
  return cells;
}

function computeStreak(events) {
  const days = new Set(
    events.map((e) => e.created_at?.slice(0, 10)).filter(Boolean),
  );
  let current = 0,
    longest = 0,
    streak = 0;
  let d = new Date();
  for (let i = 0; i < 365; i++) {
    if (days.has(d.toISOString().slice(0, 10))) current++;
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }
  const sorted = [...days].sort();
  streak = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      streak = 1;
      continue;
    }
    const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000;
    streak = diff === 1 ? streak + 1 : 1;
    if (streak > longest) longest = streak;
  }
  return { current, longest };
}

function hmColor(c) {
  if (c === 0) return "#111";
  if (c === 1) return "#1a3a1a";
  if (c <= 3) return "#1d5c1d";
  if (c <= 6) return "#25852a";
  return "#f0ee42";
}

/* ══ Section header ══ */
function SectionHeader({ isMobile }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        marginBottom: isMobile ? 28 : 48,
      }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: isMobile ? 10 : 11,
          fontWeight: 500,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          background: "#f0ee42",
          color: "#0a0a0a",
          border: "3px solid #f0ee42",
          padding: isMobile ? "7px 12px" : "8px 16px",
          whiteSpace: "nowrap",
        }}>
        05 — GitHub
      </span>
      <div style={{ flex: 1, height: 3, background: "#333" }} />
      {/* JP annotation */}
      <span
        style={{
          fontFamily: JP,
          fontSize: 11,
          color: "#2a2a2a",
          letterSpacing: ".08em",
          padding: "0 16px",
          whiteSpace: "nowrap",
        }}>
        活動記録
      </span>
      <div style={{ flex: 1, height: 3, background: "#333" }} />
      {!isMobile && (
        <span
          style={{
            fontFamily: COND,
            fontSize: 38,
            fontWeight: 800,
            color: "#f0ee42",
            letterSpacing: "-.01em",
            border: "3px solid #333",
            padding: "5px 20px",
            background: "#0a0a0a",
            whiteSpace: "nowrap",
          }}>
          My Activity
        </span>
      )}
    </div>
  );
}

/* ══ Top stats ══ */
function TopStats({ user, streak, isMobile }) {
  const ref = useReveal();
  const items = [
    { num: user?.public_repos ?? "—", label: "Repositories", jp: STAT_JP[0] },
    { num: user?.followers ?? "—", label: "Followers", jp: STAT_JP[1] },
    { num: streak.longest || "—", label: "Longest Streak", jp: STAT_JP[2] },
    { num: streak.current || 0, label: "Current Streak", jp: STAT_JP[3] },
  ];
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${isMobile ? 2 : 4},1fr)`,
        border: "3px solid #1a1a1a",
      }}>
      {items.map(({ num, label, jp }, i) => {
        const isAccent = i === 3;
        return (
          <div
            key={label}
            style={{
              padding: isMobile ? "18px 16px" : "22px 24px",
              borderRight: isMobile
                ? i % 2 === 0
                  ? "3px solid #1a1a1a"
                  : "none"
                : i < 3
                  ? "3px solid #1a1a1a"
                  : "none",
              borderBottom: isMobile && i < 2 ? "3px solid #1a1a1a" : "none",
              background: isAccent ? "#f0ee42" : "transparent",
              position: "relative",
              overflow: "hidden",
            }}>
            {/* ghost JP */}
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                fontFamily: JP,
                fontSize: 14,
                color: isAccent ? "rgba(0,0,0,.06)" : "rgba(240,238,66,.07)",
                userSelect: "none",
                lineHeight: 1,
                letterSpacing: ".02em",
              }}>
              {jp}
            </span>
            <div
              style={{
                fontFamily: COND,
                fontSize: isMobile ? 36 : 44,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-.02em",
                color: isAccent ? "#0a0a0a" : "#f0ee42",
              }}>
              {num}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                marginTop: 4,
                color: isAccent ? "rgba(0,0,0,.45)" : "#444",
              }}>
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══ Language bars ══ */
function LangBars({ langs, isMobile }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        padding: isMobile ? "20px 18px" : "24px 24px",
        borderRight: isMobile ? "none" : "3px solid #1a1a1a",
        borderBottom: isMobile ? "3px solid #1a1a1a" : "none",
      }}>
      {/* label + JP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            fontWeight: 700,
            color: "#f0ee42",
            letterSpacing: ".25em",
            textTransform: "uppercase",
          }}>
          // Top Languages
        </span>
        <span
          style={{
            fontFamily: JP,
            fontSize: 8,
            color: "#333",
            letterSpacing: ".05em",
          }}>
          言語
        </span>
      </div>

      {langs.length === 0 ? (
        <div style={{ fontFamily: MONO, fontSize: 11, color: "#333" }}>
          Loading...
        </div>
      ) : (
        langs.map(({ name, pct }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 11,
            }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "#888",
                letterSpacing: ".04em",
                width: 88,
                flexShrink: 0,
              }}>
              {name}
            </span>
            <div style={{ flex: 1, height: 3, background: "#1a1a1a" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: langColor(name),
                  transition: "width .8s cubic-bezier(.16,1,.3,1)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "#444",
                width: 28,
                textAlign: "right",
                flexShrink: 0,
              }}>
              {pct}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

/* ══ Heatmap ══ */
function Heatmap({ cells, isMobile }) {
  const ref = useReveal();
  const show = isMobile ? cells.slice(-70) : cells;
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{ padding: isMobile ? "20px 18px" : "24px 24px" }}>
      {/* label + JP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            fontWeight: 700,
            color: "#f0ee42",
            letterSpacing: ".25em",
            textTransform: "uppercase",
          }}>
          // Contribution Graph
        </span>
        <span
          style={{
            fontFamily: JP,
            fontSize: 8,
            color: "#333",
            letterSpacing: ".05em",
          }}>
          貢献グラフ
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {show.map((count, i) => (
          <div
            key={i}
            style={{
              width: isMobile ? 9 : 10,
              height: isMobile ? 9 : 10,
              background: hmColor(count),
              transition: "background .3s",
              flexShrink: 0,
            }}
            title={`${count} contributions`}
          />
        ))}
      </div>

      {/* legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 14,
        }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            color: "#444",
            letterSpacing: ".1em",
          }}>
          Less
        </span>
        {["#111", "#1a3a1a", "#1d5c1d", "#25852a", "#f0ee42"].map((c) => (
          <div key={c} style={{ width: 9, height: 9, background: c }} />
        ))}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            color: "#444",
            letterSpacing: ".1em",
          }}>
          More
        </span>
      </div>
    </div>
  );
}

/* ══ Streak bar ══ */
function StreakBar({ contributions, streak, isMobile }) {
  const ref = useReveal();
  const items = [
    {
      num: contributions,
      label: "Total Contributions",
      jp: STREAK_JP[0],
      accent: false,
    },
    {
      num: streak.current ?? 0,
      label: "Current Streak",
      jp: STREAK_JP[1],
      accent: true,
    },
    {
      num: streak.longest ?? 0,
      label: "Longest Streak",
      jp: STREAK_JP[2],
      accent: false,
    },
  ];
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        border: "3px solid #1a1a1a",
        borderTop: "none",
      }}>
      {items.map(({ num, label, jp, accent }, i) => (
        <div
          key={label}
          style={{
            padding: isMobile ? "16px 14px" : "20px 24px",
            borderRight: i < 2 ? "3px solid #1a1a1a" : "none",
            background: accent ? "#f0ee42" : "transparent",
            position: "relative",
            overflow: "hidden",
          }}>
          {/* ghost JP */}
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 6,
              fontFamily: JP,
              fontSize: 13,
              color: accent ? "rgba(0,0,0,.07)" : "rgba(240,238,66,.07)",
              userSelect: "none",
              lineHeight: 1,
            }}>
            {jp}
          </span>
          <div
            style={{
              fontFamily: COND,
              fontSize: isMobile ? 32 : 40,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-.02em",
              color: accent ? "#0a0a0a" : "#f0ee42",
            }}>
            {num}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              marginTop: 4,
              color: accent ? "rgba(0,0,0,.45)" : "#444",
            }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══ Profile strip ══ */
function ProfileStrip({ user }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
        border: "3px solid #1a1a1a",
        borderTop: "none",
        padding: "13px 22px",
        background: "#111",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            color: "#555",
            letterSpacing: ".15em",
          }}>
          // github.com/{u} {user?.name ? `· ${user.name}` : ""}
        </span>
        {/* JP label */}
        <span
          style={{
            fontFamily: JP,
            fontSize: 9,
            color: "#2a2a2a",
            letterSpacing: ".05em",
          }}>
          プロフィール
        </span>
      </div>
      <a
        href={`https://github.com/${u}`}
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "#666",
          textDecoration: "none",
          letterSpacing: ".08em",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ee42")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}>
        View Profile
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function GitHubStats() {
  const isMobile = useIsMobile();
  const [user, setUser] = useState(null);
  const [langs, setLangs] = useState([]);
  const [heatmap, setHeatmap] = useState(Array(140).fill(0));
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [contribs, setContribs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [userData, reposData, eventsData] = await Promise.all([
          fetchUser(),
          fetchRepos(),
          fetchEvents(),
        ]);
        setUser(userData);
        setLangs(computeLangs(reposData));
        setHeatmap(computeHeatmap(eventsData));
        setStreak(computeStreak(eventsData));
        setContribs(
          eventsData
            .filter((e) => e.type === "PushEvent")
            .reduce((acc, e) => acc + (e.payload?.commits?.length ?? 1), 0),
        );
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section
      id="github"
      style={{
        padding: isMobile ? "64px 0" : "96px 0",
        background: "#0a0a0a",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal.visible{opacity:1;transform:none;}
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 48px",
        }}>
        <SectionHeader isMobile={isMobile} />

        {loading && (
          <div
            style={{
              border: "3px solid #1a1a1a",
              padding: "48px",
              textAlign: "center",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#555",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}>
                // Fetching GitHub data...
              </span>
              <span style={{ fontFamily: JP, fontSize: 10, color: "#2a2a2a" }}>
                読み込み中
              </span>
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              border: "3px solid #1a1a1a",
              padding: "48px",
              textAlign: "center",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#ff6b6b",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}>
                // Failed to fetch — check network or GitHub API rate limit
              </span>
              <span
                style={{
                  fontFamily: JP,
                  fontSize: 10,
                  color: "#ff6b6b",
                  opacity: 0.5,
                }}>
                エラー
              </span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <TopStats user={user} streak={streak} isMobile={isMobile} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                border: "3px solid #1a1a1a",
                borderTop: "none",
              }}>
              <LangBars langs={langs} isMobile={isMobile} />
              <Heatmap cells={heatmap} isMobile={isMobile} />
            </div>
            <StreakBar
              contributions={contribs}
              streak={streak}
              isMobile={isMobile}
            />
            <ProfileStrip user={user} />
          </>
        )}
      </div>
    </section>
  );
}
