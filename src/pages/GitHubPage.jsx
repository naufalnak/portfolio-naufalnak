import { useEffect, useState } from "react";
import { personal } from "../data/portfolio";

const LANG_COLORS = {
  TypeScript: "#4f6ef7",
  JavaScript: "#f7df1e",
  Go: "#00add8",
  Kotlin: "#a97bff",
  PHP: "#4F5D95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

const GH = personal.github;

export default function GitHubPage() {
  const [ghStats, setGhStats] = useState(null);
  const [langs, setLangs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH}`),
          fetch(`https://api.github.com/users/${GH}/repos?per_page=100`),
        ]);
        const user = await userRes.json();
        const repos = await reposRes.json();

        const langMap = {};
        await Promise.all(
          repos.slice(0, 20).map(async (r) => {
            if (r.fork) return;
            try {
              const res = await fetch(r.languages_url);
              const data = await res.json();
              Object.entries(data).forEach(([lang, bytes]) => {
                langMap[lang] = (langMap[lang] || 0) + bytes;
              });
            } catch {}
          }),
        );

        const total = Object.values(langMap).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            pct: Math.round((bytes / total) * 100),
          }));

        setGhStats({
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          stars: repos.reduce((a, r) => a + r.stargazers_count, 0),
        });
        setLangs(sorted);
      } catch {
        setGhStats({ repos: 36, followers: 8, following: 8, stars: 6 });
        setLangs([
          { name: "TypeScript", pct: 38 },
          { name: "Go", pct: 25 },
          { name: "JavaScript", pct: 18 },
          { name: "Kotlin", pct: 12 },
          { name: "PHP", pct: 5 },
          { name: "Python", pct: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = ghStats
    ? [
        { val: ghStats.repos, lbl: "Repos" },
        { val: ghStats.stars, lbl: "Stars" },
        { val: ghStats.followers, lbl: "Followers" },
        { val: ghStats.following, lbl: "Following" },
      ]
    : [];

  return (
    <div className="pf-page">
      <style>{`
        .gh-stat-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 12px; }
        .gh-lang-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
        @media (max-width: 600px) {
          .gh-stat-grid { grid-template-columns: repeat(2,1fr); }
          .gh-lang-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <p className="pg-label">My Activity</p>
      <h2 className="pg-title">GitHub Stats</h2>

      {loading ? (
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            color: "#888",
          }}>
          Fetching GitHub data…
        </p>
      ) : (
        <>
          {/* ── Stat cards ── */}
          <div className="gh-stat-grid">
            {statItems.map((s) => (
              <div
                key={s.lbl}
                className="nb-card"
                style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "26px",
                    fontWeight: 700,
                    color: "#4f6ef7",
                    lineHeight: 1,
                  }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#999",
                    fontWeight: 600,
                    marginTop: "3px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>

          {/* ── Banner ── */}
          <div
            className="nb-card-blue"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "10px",
            }}>
            <div>
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#b8caff",
                  fontFamily: "'Space Mono', monospace",
                  marginBottom: "3px",
                }}>
                GitHub Profile
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>@{GH}</div>
            </div>
            <a
              className="nb-btn nb-btn-white"
              href={`https://github.com/${GH}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "11px" }}>
              View Profile ↗
            </a>
          </div>

          {/* ── Languages with progress bar ── */}
          {langs.length > 0 && (
            <div className="nb-card" style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4f6ef7",
                  marginBottom: "14px",
                }}>
                Top Languages
              </div>

              {/* Stacked bar */}
              <div
                style={{
                  display: "flex",
                  height: "10px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "2px solid #0a0a0a",
                  marginBottom: "14px",
                }}>
                {langs.map((l) => (
                  <div
                    key={l.name}
                    style={{
                      width: `${l.pct}%`,
                      background: LANG_COLORS[l.name] || "#ccc",
                      transition: "width 0.5s ease",
                    }}
                    title={`${l.name} ${l.pct}%`}
                  />
                ))}
              </div>

              {/* Individual bars */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                {langs.map((l) => (
                  <div
                    key={l.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: LANG_COLORS[l.name] || "#ccc",
                        border: "2px solid #0a0a0a",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        width: "100px",
                        flexShrink: 0,
                      }}>
                      {l.name}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "6px",
                        background: "#f0f0f0",
                        borderRadius: "4px",
                        overflow: "hidden",
                        border: "1.5px solid #e0e0e0",
                      }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${l.pct}%`,
                          background: LANG_COLORS[l.name] || "#ccc",
                          borderRadius: "4px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "#888",
                        width: "32px",
                        textAlign: "right",
                        flexShrink: 0,
                      }}>
                      {l.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Contribution heatmap ── */}
          <div
            className="nb-card"
            style={{ marginBottom: "12px", overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
                flexWrap: "wrap",
                gap: "8px",
              }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4f6ef7",
                }}>
                Contribution Graph
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: "#aaa",
                }}>
                @{GH}
              </span>
            </div>
            <div style={{ overflow: "auto", borderRadius: "8px" }}>
              <img
                src={`https://ghchart.rshah.org/4f6ef7/${GH}`}
                alt="GitHub contribution chart"
                style={{
                  width: "100%",
                  minWidth: "600px",
                  display: "block",
                  borderRadius: "6px",
                }}
                onError={(e) => {
                  e.currentTarget.parentElement.innerHTML =
                    '<p style="font-family:monospace;font-size:11px;color:#aaa;text-align:center;padding:1rem">Contribution graph unavailable</p>';
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "8px",
              }}>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: "#aaa",
                }}>
                Less
              </span>
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(
                (c) => (
                  <div
                    key={c}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "2px",
                      background: c,
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                ),
              )}
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: "#aaa",
                }}>
                More
              </span>
            </div>
          </div>

          {/* ── GitHub Readme Stats card ── */}
          <div className="nb-card" style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4f6ef7",
                marginBottom: "12px",
              }}>
              Stats Card
            </div>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GH}&show_icons=true&theme=default&hide_border=true&title_color=4f6ef7&icon_color=4f6ef7&bg_color=ffffff&text_color=0a0a0a`}
              alt="GitHub stats"
              style={{ width: "100%", display: "block", borderRadius: "8px" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
