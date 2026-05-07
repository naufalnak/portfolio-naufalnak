import { useReveal } from "../hooks/useReveal";
import { experience } from "../data/portfolio";

export default function Experience() {
  const h = useReveal();

  return (
    // EXPERIENCE — Sky Blue tinted (#EEF6FB), fresh contrast after white
    <section
      id="experience"
      className="py-32"
      style={{ background: "#EEF6FB" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div ref={h} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">04</span>
          <div style={{ flex: 1, height: "1px", background: "#C8D9E8" }} />
          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "#0D1B2A" }}>
            Experience
          </h2>
        </div>

        <div className="max-w-3xl">
          {experience.map((item, i) => {
            const ref = useReveal();
            const isWork = item.type === "internship";
            return (
              <div
                key={item.id}
                ref={ref}
                className="reveal border-t group"
                style={{
                  borderColor: "#C8D9E8",
                  transitionDelay: `${i * 100}ms`,
                }}>
                <div className="py-10 grid md:grid-cols-4 gap-8">
                  <div className="md:col-span-1">
                    <div
                      className="font-mono text-xs leading-relaxed"
                      style={{ color: "#8BA8C4" }}>
                      {item.period}
                    </div>
                    <div
                      className="font-mono text-xs uppercase tracking-widest mt-2"
                      style={{ color: isWork ? "#2FA4D7" : "#8BA8C4" }}>
                      {isWork ? "Intership" : "Education"}
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <h3
                      className="font-display font-semibold text-xl mb-1 transition-colors"
                      style={{ color: "#0D1B2A" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#2FA4D7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#0D1B2A")
                      }>
                      {item.role}
                    </h3>
                    <div
                      className="font-mono text-xs uppercase tracking-wider mb-4"
                      style={{ color: "#8BA8C4" }}>
                      {item.company}
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "#4A6E8E" }}>
                      {item.desc}
                    </p>
                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-xs px-2 py-0.5 transition-all"
                            style={{
                              border: "1px solid #C8D9E8",
                              color: "#6A8FAE",
                              background: "rgba(255,255,255,0.6)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#2FA4D7";
                              e.currentTarget.style.color = "#2FA4D7";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#C8D9E8";
                              e.currentTarget.style.color = "#6A8FAE";
                            }}>
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
          <div className="border-t" style={{ borderColor: "#C8D9E8" }} />
        </div>
      </div>
    </section>
  );
}
