import { useReveal } from "../{components,pages,data,hooks,utils}/useReveal";
import { experience } from "../data/portfolio";

export default function Experience() {
  const h = useReveal();

  return (
    <section
      id="experience"
      className="py-32 border-t"
      style={{ borderColor: "var(--ink-100)" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">04</span>
          <div className="rule flex-1" />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "var(--ink)" }}>
            Experience
          </h2>
        </div>

        <div className="max-w-3xl">
          {experience.map((item, i) => {
            const ref = useReveal(); // ✅ WAJIB (ref per item)
            const isWork = item.type === "work";

            return (
              <div
                key={item.id}
                ref={ref}
                className="reveal border-t group"
                style={{
                  borderColor: "var(--ink-100)",
                  transitionDelay: `${i * 100}ms`,
                }}>
                <div className="py-10 grid md:grid-cols-4 gap-8">
                  {/* Period */}
                  <div className="md:col-span-1">
                    <div
                      className="font-mono text-xs leading-relaxed"
                      style={{ color: "var(--ink-300)" }}>
                      {item.period}
                    </div>
                    <div
                      className="font-mono text-xs uppercase tracking-widest mt-2"
                      style={{
                        color: isWork ? "var(--accent)" : "var(--ink-300)",
                      }}>
                      {isWork ? "Work" : "Education"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3">
                    <h3
                      className="font-display font-semibold text-xl mb-1 group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: "var(--ink)" }}>
                      {item.role}
                    </h3>

                    <div
                      className="font-mono text-xs uppercase tracking-wider mb-4"
                      style={{ color: "var(--ink-400)" }}>
                      {item.company}
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "var(--ink-400)" }}>
                      {item.desc}
                    </p>

                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span key={s} className="tag">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t" style={{ borderColor: "var(--ink-100)" }} />
        </div>
      </div>
    </section>
  );
}
