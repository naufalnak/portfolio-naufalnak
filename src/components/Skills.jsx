import { useReveal } from "../hooks/useReveal";
import { skills } from "../data/portfolio";

const extra = [
  "Nginx",
  "RabbitMQ",
  "Elasticsearch",
  "gRPC",
  "Terraform",
  "Jest",
  "Pytest",
  "Swagger",
  "OAuth2",
  "JWT",
  "Prisma",
  "Jaeger",
  "Grafana",
  "Git",
];

export default function Skills() {
  const h = useReveal();

  return (
    // SKILLS — Navy Deep, inverted from About
    <section id="skills" className="py-32" style={{ background: "#0D1B2A" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "#2FA4D7" }}>
            02
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
            Skills
          </h2>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{
            border: "1px solid rgba(139,168,196,0.12)",
            borderRight: "none",
            borderBottom: "none",
          }}>
          {skills.map((cat, i) => {
            const ref = useReveal();
            return (
              <div
                key={cat.category}
                ref={ref}
                className="reveal p-8 transition-all"
                style={{
                  borderRight: "1px solid rgba(139,168,196,0.12)",
                  borderBottom: "1px solid rgba(139,168,196,0.12)",
                  transitionDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(47,164,215,0.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }>
                <h3
                  className="font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "#2FA4D7" }}>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: "#2FA4D7" }}
                  />
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs"
                      style={{ color: "rgba(139,168,196,0.7)" }}>
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Also familiar with */}
        <div ref={useReveal()} className="reveal mt-14">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "rgba(139,168,196,0.4)" }}>
            Also familiar with
          </p>
          <div className="flex flex-wrap gap-2">
            {extra.map((t) => (
              <span
                key={t}
                className="font-mono text-xs tracking-wide px-3 py-1 transition-all cursor-default"
                style={{
                  border: "1px solid rgba(139,168,196,0.2)",
                  color: "rgba(139,168,196,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2FA4D7";
                  e.currentTarget.style.color = "#2FA4D7";
                  e.currentTarget.style.background = "rgba(47,164,215,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,168,196,0.2)";
                  e.currentTarget.style.color = "rgba(139,168,196,0.6)";
                  e.currentTarget.style.background = "transparent";
                }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
