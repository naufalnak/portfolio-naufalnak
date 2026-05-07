import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { projects } from "../data/portfolio";
import { ArrowUpRight, Github } from "lucide-react";

const types = ["All", "Backend", "Full Stack", "Mobile", "Tooling"];

export default function Projects() {
  const h = useReveal();
  const [filter, setFilter] = useState("All");
  const filtered = projects.filter(
    (p) => filter === "All" || p.type === filter,
  );
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    // PROJECTS — Pure White
    <section id="projects" className="py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">03</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "#0D1B2A" }}>
            Projects
          </h2>
        </div>

        {/* Filter */}
        <div ref={useReveal()} className="reveal flex gap-6 flex-wrap mb-14">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="font-mono text-xs tracking-widest uppercase transition-all pb-0.5"
              style={{
                color: filter === t ? "#2FA4D7" : "#8BA8C4",
                borderBottom:
                  filter === t ? "1px solid #2FA4D7" : "1px solid transparent",
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured rows */}
        {featured.map((p, i) => {
          const ref = useReveal();
          return (
            <div
              key={p.id}
              ref={ref}
              className="reveal border-t group"
              style={{
                borderColor: "#E4EDF5",
                transitionDelay: `${i * 80}ms`,
              }}>
              <div className="py-10 grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-2">
                  <div
                    className="font-mono text-xs"
                    style={{ color: "#8BA8C4" }}>
                    {p.year}
                  </div>
                  <div
                    className="font-mono text-xs uppercase tracking-widest mt-1"
                    style={{ color: "#2FA4D7" }}>
                    {p.type}
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3
                    className="font-display text-2xl font-semibold mb-3 transition-colors"
                    style={{ color: "#0D1B2A" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2FA4D7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#0D1B2A")
                    }>
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#4A6E8E" }}>
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
                <div className="md:col-span-3 flex gap-4 justify-end pt-1">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-widest flex items-center gap-1 link-underline"
                      style={{ color: "#8BA8C4" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#0D1B2A")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#8BA8C4")
                      }>
                      <Github size={11} /> Repo
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-widest flex items-center gap-1 link-underline"
                      style={{ color: "#8BA8C4" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#2FA4D7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#8BA8C4")
                      }>
                      Live <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {rest.length > 0 && (
          <>
            <div className="border-t py-8" style={{ borderColor: "#E4EDF5" }}>
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#8BA8C4" }}>
                Other projects
              </span>
            </div>
            {/* Other cards — Sky-tinted bg for variety within this section */}
            <div
              className="grid md:grid-cols-3 gap-0"
              style={{
                border: "1px solid #E4EDF5",
                borderRight: "none",
                borderBottom: "none",
              }}>
              {rest.map((p, i) => {
                const ref = useReveal();
                return (
                  <div
                    key={p.id}
                    ref={ref}
                    className="reveal p-6 transition-colors"
                    style={{
                      borderRight: "1px solid #E4EDF5",
                      borderBottom: "1px solid #E4EDF5",
                      transitionDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(47,164,215,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }>
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="font-mono text-xs"
                        style={{ color: "#8BA8C4" }}>
                        {p.year}
                      </span>
                      <div className="flex gap-3">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#C8D9E8" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#0D1B2A")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#C8D9E8")
                            }>
                            <Github size={13} />
                          </a>
                        )}
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#C8D9E8" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "#2FA4D7")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "#C8D9E8")
                            }>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3
                      className="font-semibold text-sm mb-2"
                      style={{ color: "#0D1B2A" }}>
                      {p.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed mb-4"
                      style={{ color: "#4A6E8E" }}>
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
          </>
        )}
      </div>
    </section>
  );
}
