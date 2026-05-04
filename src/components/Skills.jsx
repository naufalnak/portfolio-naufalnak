import { useReveal } from "../{components,pages,data,hooks,utils}/useReveal";
import { skills } from "../data/portfolio";

const extraTech = [
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
    <section
      id="skills"
      className="py-32 border-t"
      style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">02</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "var(--ink)" }}>
            Skills
          </h2>
        </div>

        {/* Skills grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t"
          style={{ borderColor: "var(--ink-100)" }}>
          {skills.map((cat, i) => {
            const ref = useReveal(); // ✅ tiap item punya ref sendiri

            return (
              <div
                key={cat.category}
                ref={ref}
                className="reveal border-r border-b p-8"
                style={{
                  borderColor: "var(--ink-100)",
                  transitionDelay: `${i * 80}ms`,
                }}>
                <h3
                  className="font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2"
                  style={{ color: "var(--ink)" }}>
                  <span className="dot-accent" />
                  {cat.category}
                </h3>

                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs"
                      style={{ color: "var(--ink-400)" }}>
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Also familiar with */}
        <div ref={h} className="reveal mt-14">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--ink-300)" }}>
            Also familiar with
          </p>
          <div className="flex flex-wrap gap-2">
            {extraTech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
