import { experience } from "../data/portfolio";

const internships = experience.filter((e) => e.type !== "edu");

export default function ExperiencePage() {
  return (
    <div className="pf-page">
      <p className="pg-label">Where I've Been</p>
      <h2 className="pg-title">Experience</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {internships.map((e) => (
          <div
            key={e.id}
            style={{
              background: "#fff",
              border: "2.5px solid #0a0a0a",
              borderRadius: "12px",
              padding: "1rem 1.2rem",
              boxShadow: "4px 4px 0 #0a0a0a",
            }}>
            {/* Top row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "6px",
              }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  {e.role}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#4f6ef7",
                    marginTop: "2px",
                  }}>
                  {e.company}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    background: "#f0f4ff",
                    border: "2px solid #0a0a0a",
                    borderRadius: "5px",
                    padding: "2px 8px",
                    whiteSpace: "nowrap",
                    boxShadow: "2px 2px 0 #0a0a0a",
                    display: "inline-block",
                  }}>
                  {e.period}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#aaa",
                    marginTop: "3px",
                  }}>
                  Internship
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                lineHeight: 1.6,
                marginBottom: e.stack.length ? "8px" : 0,
              }}>
              {e.desc}
            </div>
            {e.stack.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {e.stack.map((s) => (
                  <span key={s} className="nb-tag" style={{ fontSize: "9px" }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
