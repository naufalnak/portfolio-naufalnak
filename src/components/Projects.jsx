import { useState } from "react";
import { useReveal } from "../{components,pages,data,hooks,utils}/useReveal";
import { projects } from "../data/portfolio";
import { ArrowUpRight, Github } from "lucide-react";

const types = ["All", "Backend", "Full Stack", "Mobile", "Tooling"];

export default function Projects() {
  const h = useReveal();
  const [filter, setFilter] = useState("All");

  const filtered = projects.filter(
    (p) =>
      filter === "All" ||
      p.type.toLowerCase().trim() === filter.toLowerCase().trim(),
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-32 border-t"
      style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">03</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "var(--ink)" }}>
            Projects
          </h2>
        </div>

        {/* Filter */}
        <div ref={useReveal()} className="reveal flex gap-4 flex-wrap mb-14">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                color: filter === t ? "var(--accent)" : "var(--ink-400)",
                borderBottom:
                  filter === t
                    ? "1px solid var(--accent)"
                    : "1px solid transparent",
                paddingBottom: "2px",
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured */}
        <div className="space-y-0 mb-0">
          {featured.map((p, i) => {
            const ref = useReveal(); // ✅ FIX (ref per item)
            return (
              <div
                key={p.id}
                ref={ref}
                className="reveal border-t group"
                style={{
                  borderColor: "var(--ink-100)",
                  transitionDelay: `${i * 80}ms`,
                }}>
                <div className="py-10 grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-2">
                    <div
                      className="font-mono text-xs"
                      style={{ color: "var(--ink-300)" }}>
                      {p.year}
                    </div>
                    <div
                      className="font-mono text-xs uppercase tracking-widest mt-1"
                      style={{ color: "var(--accent)" }}>
                      {p.type}
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <h3
                      className="font-display text-2xl font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--ink)" }}>
                      {p.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "var(--ink-400)" }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-3 flex gap-4 justify-end items-start pt-1">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs uppercase tracking-widest flex items-center gap-1 link-underline"
                        style={{ color: "var(--ink-400)" }}>
                        <Github size={11} /> Repo
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs uppercase tracking-widest flex items-center gap-1 link-underline"
                        style={{ color: "var(--ink-400)" }}>
                        Live <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Divider */}
          {rest.length > 0 && (
            <div
              className="border-t py-8"
              style={{ borderColor: "var(--ink-100)" }}>
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--ink-300)" }}>
                Other projects
              </span>
            </div>
          )}

          {/* Rest */}
          <div
            className="grid md:grid-cols-3 gap-0 border-t border-l"
            style={{ borderColor: "var(--ink-100)" }}>
            {rest.map((p, i) => {
              const ref = useReveal(); // ✅ FIX
              return (
                <div
                  key={p.id}
                  ref={ref}
                  className="reveal border-r border-b p-6 group transition-colors"
                  style={{
                    borderColor: "var(--ink-100)",
                    transitionDelay: `${i * 60}ms`,
                  }}>
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--ink-300)" }}>
                      {p.year}
                    </span>
                    <div className="flex gap-3">
                      {p.repo && <Github size={13} />}
                      {p.link && <ArrowUpRight size={13} />}
                    </div>
                  </div>

                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--ink)" }}>
                    {p.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "var(--ink-400)" }}>
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
