import { personal } from "../data/portfolio";

export default function Footer() {
  const links = [
    { label: "Email", href: `mailto:${personal.email}`, icon: "✉" },
    {
      label: "LinkedIn",
      href: `https://linkedin.com/in/${personal.linkedin}`,
      icon: "in",
    },
    {
      label: "GitHub",
      href: `https://github.com/${personal.github}`,
      icon: "⌥",
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 500px) {
          .footer-inner { flex-direction: column !important; align-items: center !important; gap: 8px !important; text-align: center; }
        }
      `}</style>
      <footer
        style={{
          background: "#fff",
          borderTop: "2.5px solid #0a0a0a",
          width: "100%",
        }}>
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            padding: "0.8rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          className="footer-inner">
          {/* Left — branding */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: "14px",
                color: "#0a0a0a",
              }}>
              NAK_
            </span>
            <span
              style={{ width: "1px", height: "16px", background: "#d0d0d0" }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: "#aaa",
                letterSpacing: "0.06em",
              }}>
              © {new Date().getFullYear()} {personal.name}
            </span>
          </div>

          {/* Center — reach me out */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#888",
              }}>
              Reach me out
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noreferrer"
                  title={l.label}
                  style={{
                    width: "30px",
                    height: "30px",
                    background: "#fff",
                    border: "2px solid #0a0a0a",
                    borderRadius: "7px",
                    boxShadow: "2px 2px 0 #0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily:
                      l.label === "LinkedIn"
                        ? "'Space Grotesk', sans-serif"
                        : "inherit",
                    fontSize: l.label === "LinkedIn" ? "10px" : "13px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    textDecoration: "none",
                    transition:
                      "transform 0.1s, box-shadow 0.1s, background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-2px,-2px)";
                    e.currentTarget.style.boxShadow = "4px 4px 0 #0a0a0a";
                    e.currentTarget.style.background = "#4f6ef7";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#4f6ef7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0,0)";
                    e.currentTarget.style.boxShadow = "2px 2px 0 #0a0a0a";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#0a0a0a";
                    e.currentTarget.style.borderColor = "#0a0a0a";
                  }}>
                  {l.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — available badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#f0f4ff",
              border: "2px solid #0a0a0a",
              borderRadius: "999px",
              padding: "4px 12px",
              boxShadow: "2px 2px 0 #0a0a0a",
            }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "#22c55e",
                borderRadius: "50%",
                border: "1.5px solid #0a0a0a",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                fontWeight: 700,
                color: "#0a0a0a",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
              Open to work
            </span>
          </div>
        </div>
      </footer>

      {/* Spacer for bottom nav */}
      <div style={{ height: "80px", background: "#fff" }} />
    </>
  );
}
