import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";
import { MapPin, Mail, Github, Linkedin, Download } from "lucide-react";
import foto from "../assets/me.png";

export default function About() {
  const h = useReveal();
  const l = useReveal();
  const r = useReveal();

  return (
    // ABOUT — Pure White, clean breathing room after dark hero
    <section id="about" className="py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">01</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "#0D1B2A" }}>
            About
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-16 items-start">
          <div ref={l} className="reveal-left md:col-span-2">
            {/* Avatar */}
            <div className="relative w-48 mb-10">
              <div
                className="w-48 h-48 flex items-center justify-center text-6xl select-none"
                style={{ background: "#F8FAFC", border: "1px solid #E4EDF5" }}>
                <img
                  src={foto}
                  alt="Your Name"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-12 h-12"
                style={{ background: "#2FA4D7", opacity: 0.2 }}
              />
              <div
                className="absolute -top-2 -right-2 flex items-center gap-1.5 px-2 py-1"
                style={{ background: "#FFFFFF", border: "1px solid #E4EDF5" }}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: "#8BA8C4" }}>
                  Open
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: MapPin, text: personal.location },
                { icon: Mail, text: personal.email },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={13} style={{ color: "#2FA4D7" }} />
                  <span
                    className="font-mono text-xs"
                    style={{ color: "#8BA8C4" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

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
                  style={{ color: "#6A8FAE", width: "fit-content" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2FA4D7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6A8FAE")
                  }>
                  <Icon size={12} /> {label}
                </a>
              ))}
            </div>
          </div>

          <div ref={r} className="reveal md:col-span-3 space-y-8">
            <p
              className="font-light leading-relaxed"
              style={{ color: "#0D1B2A", fontSize: "1.15rem" }}>
              {personal.bio}
            </p>
            <p className="leading-relaxed" style={{ color: "#4A6E8E" }}>
              {personal.bioExtended}
            </p>

            {/* Code block on navy */}
            <div
              className="p-6 font-mono text-xs leading-loose"
              style={{
                background: "#0D1B2A",
                borderLeft: "3px solid #2FA4D7",
              }}>
              <div style={{ color: "#8BA8C4" }}>{"// identity.config.ts"}</div>
              <div className="mt-2">
                <span style={{ color: "#8BA8C4" }}>export const </span>
                <span style={{ color: "#FFFFFF" }}>developer</span>
                <span style={{ color: "#8BA8C4" }}> = {"{"}</span>
              </div>
              {[
                ["name", `"${personal.name}"`],
                ["role", `"${personal.role}"`],
                ["available", "true"],
              ].map(([k, v]) => (
                <div key={k} className="pl-4">
                  <span style={{ color: "#2FA4D7" }}>{k}</span>
                  <span style={{ color: "#8BA8C4" }}>: </span>
                  <span
                    style={{
                      color:
                        k === "available" ? "#22c55e" : "rgba(248,250,252,0.7)",
                    }}>
                    {v}
                  </span>
                  <span style={{ color: "rgba(139,168,196,0.3)" }}>,</span>
                </div>
              ))}
              <div style={{ color: "#8BA8C4" }}>{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
