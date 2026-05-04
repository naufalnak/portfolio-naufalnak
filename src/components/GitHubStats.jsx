import { useReveal } from "../{components,pages,data,hooks,utils}/useReveal";
import { personal } from "../data/portfolio";

export default function GitHubStats() {
  const h = useReveal();
  const username = personal.github;

  const base = `https://github-readme-stats.vercel.app/api`;
  const common = `theme=default&hide_border=true&bg_color=0d1b2a&title_color=ffffff&text_color=9fb8d1&icon_color=e8390e`;

  return (
    <section
      id="github"
      className="py-32 border-t"
      style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">05</span>
          <div className="rule flex-1" />
          <h2 className="font-display text-3xl font-semibold">GitHub</h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-0 border-t border-l">
          {/* Stats */}
          <div ref={useReveal()} className="reveal border-r border-b p-8">
            <p className="font-mono text-xs mb-6">Statistics</p>
            <img
              src={`${base}?username=${username}&show_icons=true&${common}&count_private=true`}
              className="w-full"
            />
          </div>

          {/* Languages */}
          <div ref={useReveal()} className="reveal border-r border-b p-8">
            <p className="font-mono text-xs mb-6">Top Languages</p>
            <img
              src={`${base}/top-langs/?username=${username}&layout=compact&langs_count=8&${common}`}
              className="w-full"
            />
          </div>
        </div>

        {/* Streak */}
        <div ref={useReveal()} className="reveal border p-8 mt-8">
          <p className="font-mono text-xs mb-6">Contribution Streak</p>
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}`}
            className="w-full max-w-2xl"
          />
        </div>

        {/* Activity */}
        <div ref={useReveal()} className="reveal border p-8 mt-8">
          <p className="font-mono text-xs mb-6">Activity Graph</p>
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}`}
            className="w-full"
          />
        </div>

        {/* Link */}
        <div ref={useReveal()} className="reveal mt-6">
          <p className="font-mono text-xs">
            {"// "}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              className="link-underline">
              github.com/{username}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
