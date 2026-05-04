import { useState, useEffect } from "react";
import { personal, stats } from "../data/portfolio";
import { ArrowDownRight } from "lucide-react";

const roles = [
  "Backend Architect",
  "Full Stack Engineer",
  "Mobile Developer",
  "API Craftsman",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && char <= current.length) {
      t = setTimeout(() => setChar((c) => c + 1), 60);
    } else if (!deleting && char > current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && char > 0) {
      t = setTimeout(() => setChar((c) => c - 1), 30);
    } else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [char, deleting, roleIdx]);

  const yearExp = new Date().getFullYear() - personal.yearStarted;

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-between pt-16">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-8 py-24">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transitionDelay: "0ms",
          }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--ink-400)" }}>
            Available for opportunities — {personal.location}
          </span>
        </div>

        {/* Name — large editorial treatment */}
        <div
          className="mb-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transitionDelay: "100ms",
          }}>
          <h1
            className="font-display leading-none tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              color: "var(--ink)",
            }}>
            {personal.firstName}
            <br />
            <span style={{ color: "var(--ink-200)" }}>{personal.lastName}</span>
          </h1>
        </div>

        {/* Role typing */}
        <div
          className="mb-12 h-8 flex items-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transitionDelay: "200ms",
          }}>
          <span
            className="font-mono text-sm"
            style={{ color: "var(--ink-400)" }}>
            {roles[roleIdx].slice(0, char)}
            <span style={{ color: "var(--accent)" }}>|</span>
          </span>
        </div>

        {/* Bio + CTA side by side on desktop */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transitionDelay: "300ms",
            }}>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--ink-500)" }}>
              {personal.bio}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-all"
                style={{ background: "var(--accent)", color: "#0d1b2a" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ink)";
                }}>
                View Work <ArrowDownRight size={12} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 border transition-all link-underline"
                style={{
                  borderColor: "var(--ink-200)",
                  color: "var(--ink-500)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink-200)";
                  e.currentTarget.style.color = "var(--ink-500)";
                }}>
                Contact
              </a>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 gap-6 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transitionDelay: "400ms",
            }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="rule mb-3" />
                <div
                  className="counter mb-1"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "var(--ink)",
                  }}>
                  {s.value}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--ink-400)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scrolling marquee */}
      <div
        className="border-t overflow-hidden py-4"
        style={{ borderColor: "var(--ink-100)" }}>
        <div className="marquee-track flex gap-16 select-none">
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-16 shrink-0">
                {[
                  "Backend",
                  "Full Stack",
                  "Mobile",
                  "Go",
                  "Node.js",
                  "Flutter",
                  "PostgreSQL",
                  "Docker",
                  "Kubernetes",
                  "React",
                  "Laravel",
                  "REST API",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs tracking-widest uppercase whitespace-nowrap flex items-center gap-4"
                    style={{ color: "var(--ink-300)" }}>
                    {item}
                    <span className="dot-accent" />
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
