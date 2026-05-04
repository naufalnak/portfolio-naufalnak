import { useReveal } from "../{components,pages,data,hooks,utils}/useReveal";
import { personal } from "../data/portfolio";
import { MapPin, Mail, Github, Linkedin, Download } from "lucide-react";

export default function About() {
  const h = useReveal();
  const l = useReveal();
  const r = useReveal();

  return (
    <section
      id="about"
      className="py-32 border-t"
      style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">01</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "var(--ink)" }}>
            About
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left */}
          <div ref={l} className="reveal-left md:col-span-2">
            {/* Avatar block */}
            <div className="relative mb-10 w-48" style={{ "--delay": "0ms" }}>
              <div
                className="w-48 h-48 flex items-center justify-center text-6xl select-none"
                style={{
                  background: "var(--ink-50)",
                  border: "1px solid var(--ink-100)",
                }}>
                👨‍💻
              </div>
              {/* Offset accent square */}
              <div
                className="absolute -bottom-3 -right-3 w-12 h-12"
                style={{ background: "var(--accent)", opacity: 0.15 }}
              />
              {/* Available dot */}
              <div
                className="absolute -top-2 -right-2 flex items-center gap-1.5 px-2 py-1"
                style={{
                  background: "var(--ink-50)",
                  border: "1px solid var(--ink-100)",
                }}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--ink-400)" }}>
                  Open
                </span>
              </div>
            </div>

            {/* Info list */}
            <div className="space-y-4 mb-8">
              {[
                { icon: MapPin, text: personal.location },
                { icon: Mail, text: personal.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={13} style={{ color: "var(--accent)" }} />
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--ink-400)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  href: `https://github.com/${personal.github}`,
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: `https://linkedin.com/in/${personal.linkedin}`,
                },
                { icon: Download, label: "Résumé", href: personal.resumeUrl },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase link-underline transition-colors"
                  style={{ color: "var(--ink-400)", width: "fit-content" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-400)";
                  }}>
                  <Icon size={12} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={r} className="reveal md:col-span-3 space-y-8">
            <p
              className="text-lg leading-relaxed font-light"
              style={{ color: "var(--ink-500)", fontSize: "1.15rem" }}>
              {personal.bio}
            </p>
            <p className="leading-relaxed" style={{ color: "var(--ink-400)" }}>
              {personal.bioExtended}
            </p>

            {/* Code block */}
            <div
              className="p-6 font-mono text-xs leading-loose"
              style={{
                background: "var(--ink-50)",
                borderLeft: "2px solid var(--accent)",
              }}>
              <div style={{ color: "var(--ink-300)" }}>
                {"// identity.config.ts"}
              </div>
              <div className="mt-2">
                <span style={{ color: "var(--ink-400)" }}>export const </span>
                <span style={{ color: "var(--ink)" }}>developer</span>
                <span style={{ color: "var(--ink-400)" }}> = {"{"}</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--accent)" }}>name</span>
                <span style={{ color: "var(--ink-400)" }}>: </span>
                <span style={{ color: "var(--ink-500)" }}>
                  "{personal.name}"
                </span>
                <span style={{ color: "var(--ink-300)" }}>,</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--accent)" }}>role</span>
                <span style={{ color: "var(--ink-400)" }}>: </span>
                <span style={{ color: "var(--ink-500)" }}>
                  "{personal.role}"
                </span>
                <span style={{ color: "var(--ink-300)" }}>,</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--accent)" }}>available</span>
                <span style={{ color: "var(--ink-400)" }}>: </span>
                <span style={{ color: "#22c55e" }}>true</span>
                <span style={{ color: "var(--ink-300)" }}>,</span>
              </div>
              <div style={{ color: "var(--ink-400)" }}>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
