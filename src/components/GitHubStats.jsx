import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";

export default function GitHubStats() {
  const h = useReveal();
  const u = personal.github;

  // Stats images tuned for navy background
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=transparent&hide_border=true&title_color=2FA4D7&text_color=8BA8C4&icon_color=2FA4D7&count_private=true&bg_color=00000000`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&langs_count=8&theme=transparent&hide_border=true&title_color=2FA4D7&text_color=8BA8C4&bg_color=00000000`;
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=transparent&hide_border=true&ring=2FA4D7&fire=2FA4D7&currStreakLabel=FFFFFF&sideLabels=8BA8C4&dates=8BA8C4&currStreakNum=FFFFFF&sideNums=FFFFFF&background=00000000`;
  const graphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=00000000&color=8BA8C4&line=2FA4D7&point=FFFFFF&area=true&area_color=2FA4D7&hide_border=true`;

  const Card = ({ title, url, delay = 0, wide = false }) => {
    const ref = useReveal();
    return (
      <div
        ref={ref}
        className={`reveal p-6 transition-all ${wide ? "col-span-full" : ""}`}
        style={{
          border: "1px solid rgba(47,164,215,0.15)",
          transitionDelay: `${delay}ms`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(47,164,215,0.5)";
          e.currentTarget.style.background = "rgba(47,164,215,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(47,164,215,0.15)";
          e.currentTarget.style.background = "transparent";
        }}>
        <p
          className="font-mono text-xs uppercase tracking-widest mb-5"
          style={{ color: "rgba(139,168,196,0.5)" }}>
          {title}
        </p>
        <img src={url} alt={title} className="w-full" loading="lazy" />
      </div>
    );
  };

  return (
    // GITHUB STATS — Navy Deep (matches Hero, creates rhythm)
    <section id="github" className="py-32" style={{ background: "#0D1B2A" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "#2FA4D7" }}>
            05
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(139,168,196,0.15)",
            }}
          />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "#FFFFFF" }}>
            GitHub
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Card title="Statistics" url={statsUrl} delay={0} />
          <Card title="Top Languages" url={langsUrl} delay={80} />
        </div>
        <div className="grid gap-4">
          <Card title="Contribution Streak" url={streakUrl} wide />
          <Card title="Activity Graph" url={graphUrl} wide />
        </div>

        <div ref={useReveal()} className="reveal mt-8">
          <p
            className="font-mono text-xs"
            style={{ color: "rgba(139,168,196,0.35)" }}>
            {"// "}
            <a
              href={`https://github.com/${u}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline transition-colors"
              style={{ color: "rgba(139,168,196,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2FA4D7")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(139,168,196,0.35)")
              }>
              github.com/{u}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
