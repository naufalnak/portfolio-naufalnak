import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import { experience } from "../data/portfolio";

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";

const ROW_ACCENT = ["#f0ee42", "#5adb8a", "#6eb5ff", "#ff6b6b", "#f0ee42"];

/* JP labels per experience type */
const TYPE_JP = { internship: "実務経験", edu: "教育" };

/* JP label per stat */
const STAT_JP = ["回数", "学位", "成績", "卒業"];

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

/* ══ Experience Row ══ */
function ExpRow({ item, index }) {
  const ref = useReveal();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const isWork = item.type === "internship";
  const accent = ROW_ACCENT[index % ROW_ACCENT.length];
  const jpType = TYPE_JP[item.type] ?? "経験";

  return (
    <div
      ref={ref}
      className="nb-reveal"
      style={{
        borderBottom: "3px solid #0a0a0a",
        transitionDelay: `${index * 90}ms`,
      }}>
      {/* clickable header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 40px" : "220px 1fr 52px",
          cursor: "pointer",
          transition: "background .18s",
        }}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(240,238,66,.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }>
        {/* ── MOBILE layout ── */}
        {isMobile ? (
          <>
            <div style={{ padding: "20px 18px" }}>
              {/* type badge + JP */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}>
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: MONO,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    background: isWork ? "#0a0a0a" : "transparent",
                    color: isWork ? "#f0ee42" : "#0a0a0a",
                    border: isWork ? "none" : "1.5px solid #0a0a0a",
                    padding: "3px 9px",
                  }}>
                  {isWork ? "Internship" : "Education"}
                </span>
                <span
                  style={{
                    fontFamily: JP,
                    fontSize: 9,
                    color: "rgba(0,0,0,.3)",
                    letterSpacing: ".05em",
                  }}>
                  {jpType}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: COND,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0a0a0a",
                  letterSpacing: "-.01em",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}>
                {item.role}
              </h3>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: "#555",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}>
                {item.company}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: "#aaa",
                  letterSpacing: ".05em",
                }}>
                {item.period}
              </div>

              {item.stack.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    marginTop: 10,
                  }}>
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: MONO,
                        fontSize: 9,
                        color: "#666",
                        border: "1.5px solid #ddd",
                        padding: "2px 8px",
                        letterSpacing: ".05em",
                      }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* toggle */}
            <div
              style={{
                borderLeft: "3px solid #0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: open ? accent : "transparent",
                transition: "background .2s",
                minWidth: 40,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: open ? "#0a0a0a" : "#888",
                  display: "inline-block",
                  transform: open ? "rotate(45deg)" : "none",
                  transition: "transform .25s, color .2s",
                  lineHeight: 1,
                }}>
                +
              </span>
            </div>
          </>
        ) : (
          /* ── DESKTOP layout ── */
          <>
            {/* period + badge + JP col */}
            <div
              style={{
                borderRight: "3px solid #0a0a0a",
                padding: "28px 24px",
                background: open ? accent : "transparent",
                transition: "background .2s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: open ? "#0a0a0a" : "#444",
                  letterSpacing: ".05em",
                  lineHeight: 1.6,
                  fontWeight: open ? 500 : 400,
                }}>
                {item.period}
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 10,
                }}>
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: MONO,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    background: open
                      ? "#0a0a0a"
                      : isWork
                        ? "#0a0a0a"
                        : "transparent",
                    color: open ? accent : isWork ? "#f0ee42" : "#0a0a0a",
                    border: isWork ? "none" : "1.5px solid #0a0a0a",
                    padding: "4px 10px",
                    width: "fit-content",
                  }}>
                  {isWork ? "Internship" : "Education"}
                </span>
                {/* JP translation of badge */}
                <span
                  style={{
                    fontFamily: JP,
                    fontSize: 8,
                    color: open ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.22)",
                    letterSpacing: ".06em",
                    paddingLeft: 2,
                  }}>
                  {jpType}
                </span>
              </div>
            </div>

            {/* role + company + stack col */}
            <div style={{ padding: "28px 36px" }}>
              {/* small JP annotation above role */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 6,
                }}>
                <span
                  style={{
                    fontFamily: JP,
                    fontSize: 8,
                    color: "rgba(0,0,0,.2)",
                    letterSpacing: ".08em",
                  }}>
                  {isWork ? "役職" : "専攻"}
                </span>
                <div
                  style={{ width: 16, height: 1, background: "rgba(0,0,0,.1)" }}
                />
              </div>

              <h3
                style={{
                  fontFamily: COND,
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0a0a0a",
                  letterSpacing: "-.01em",
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}>
                {item.role}
              </h3>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "#555",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}>
                {item.company}
              </div>

              {item.stack.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginTop: 14,
                  }}>
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: "#333",
                        border: "1.5px solid #bbb",
                        padding: "3px 10px",
                        letterSpacing: ".05em",
                        transition: "all .15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = accent;
                        e.currentTarget.style.borderColor = accent;
                        e.currentTarget.style.color = "#0a0a0a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "#bbb";
                        e.currentTarget.style.color = "#333";
                      }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* toggle col */}
            <div
              style={{
                borderLeft: "3px solid #0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: open ? accent : "transparent",
                transition: "background .2s",
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: open ? "#0a0a0a" : "#444",
                  transition: "transform .25s, color .2s",
                  display: "inline-block",
                  transform: open ? "rotate(45deg)" : "none",
                  lineHeight: 1,
                }}>
                +
              </span>
            </div>
          </>
        )}
      </div>

      {/* expanded description */}
      <div
        style={{
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.16,1,.3,1)",
        }}>
        <div
          style={{
            padding: isMobile ? "20px 18px 24px" : "0 36px 28px",
            paddingLeft: !isMobile ? "calc(220px + 36px)" : undefined,
            borderTop: open ? "3px solid #d5d5d0" : "none",
            paddingTop: open ? 20 : 0,
            background: "#f7f7f4",
            position: "relative",
          }}>
          {/* JP label in expanded area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 10,
            }}>
            <span
              style={{
                fontFamily: JP,
                fontSize: 8,
                color: "rgba(0,0,0,.2)",
                letterSpacing: ".08em",
              }}>
              詳細
            </span>
            <div
              style={{ width: 20, height: 1, background: "rgba(0,0,0,.1)" }}
            />
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#333",
              lineHeight: 1.85,
              maxWidth: 560,
            }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function Experience() {
  const hRef = useReveal();
  const statRef = useReveal();
  const isMobile = useIsMobile();

  const internships = experience.filter((e) => e.type === "internship");
  const education = experience.filter((e) => e.type !== "internship");

  const statData = [
    { num: internships.length, label: "Internships" },
    { num: education.length, label: "Degrees" },
    { num: "3.85", label: "GPA" },
    { num: "2025", label: "Graduating" },
  ];

  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? "64px 0" : "96px 0",
        background: "#f0ee42",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal.visible{opacity:1;transform:none;}
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 48px",
        }}>
        {/* ── Section header ── */}
        <div
          ref={hRef}
          className="nb-reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: isMobile ? 36 : 64,
          }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: isMobile ? 10 : 11,
              fontWeight: 500,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              background: "#0a0a0a",
              color: "#f0ee42",
              border: "3px solid #0a0a0a",
              padding: isMobile ? "7px 12px" : "8px 16px",
              whiteSpace: "nowrap",
            }}>
            04 — Experience
          </span>
          <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
          {/* JP annotation */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 11,
              color: "rgba(0,0,0,.3)",
              letterSpacing: ".08em",
              padding: "0 16px",
              whiteSpace: "nowrap",
            }}>
            経歴一覧
          </span>
          <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
          {!isMobile && (
            <span
              style={{
                fontFamily: COND,
                fontSize: 38,
                fontWeight: 800,
                color: "#0a0a0a",
                letterSpacing: "-.01em",
                border: "3px solid #0a0a0a",
                padding: "5px 20px",
                background: "#f0ee42",
                whiteSpace: "nowrap",
              }}>
              Where I've Been
            </span>
          )}
        </div>

        {/* ── Work Experience ── */}
        <div style={{ marginBottom: isMobile ? 28 : 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                background: "#0a0a0a",
                color: "#f0ee42",
                padding: "7px 14px",
                whiteSpace: "nowrap",
              }}>
              // Work Experience
            </span>
            <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
            {/* JP label */}
            <span
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "rgba(0,0,0,.3)",
                padding: "7px 12px",
                whiteSpace: "nowrap",
                borderLeft: "3px solid #0a0a0a",
                background: "rgba(0,0,0,.04)",
              }}>
              職務経歴
            </span>
          </div>
          <div style={{ border: "3px solid #0a0a0a", borderTop: "none" }}>
            {internships.map((item, i) => (
              <ExpRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div style={{ marginBottom: isMobile ? 36 : 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                background: "#0a0a0a",
                color: "#f0ee42",
                padding: "7px 14px",
                whiteSpace: "nowrap",
              }}>
              // Education
            </span>
            <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
            {/* JP label */}
            <span
              style={{
                fontFamily: JP,
                fontSize: 9,
                color: "rgba(0,0,0,.3)",
                padding: "7px 12px",
                whiteSpace: "nowrap",
                borderLeft: "3px solid #0a0a0a",
                background: "rgba(0,0,0,.04)",
              }}>
              学歴
            </span>
          </div>
          <div style={{ border: "3px solid #0a0a0a", borderTop: "none" }}>
            {education.map((item, i) => (
              <ExpRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          ref={statRef}
          className="nb-reveal"
          style={{
            border: "3px solid #0a0a0a",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
          }}>
          {statData.map(({ num, label }, i) => (
            <div
              key={label}
              style={{
                padding: isMobile ? "16px 18px" : "22px 28px",
                borderRight: isMobile
                  ? i % 2 === 0
                    ? "3px solid #0a0a0a"
                    : "none"
                  : i < 3
                    ? "3px solid #0a0a0a"
                    : "none",
                borderBottom: isMobile && i < 2 ? "3px solid #0a0a0a" : "none",
                background: i % 2 === 0 ? "#0a0a0a" : "#f0ee42",
                position: "relative",
                overflow: "hidden",
              }}>
              {/* ghost kanji */}
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  fontFamily: JP,
                  fontSize: 22,
                  color:
                    i % 2 === 0 ? "rgba(240,238,66,.07)" : "rgba(0,0,0,.07)",
                  userSelect: "none",
                  lineHeight: 1,
                }}>
                {STAT_JP[i]}
              </span>

              <div
                style={{
                  fontFamily: COND,
                  fontSize: isMobile ? 34 : 44,
                  fontWeight: 800,
                  color: i % 2 === 0 ? "#f0ee42" : "#0a0a0a",
                  lineHeight: 1,
                  letterSpacing: "-.02em",
                }}>
                {num}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: i % 2 === 0 ? "rgba(240,238,66,.5)" : "rgba(0,0,0,.5)",
                  marginTop: 4,
                }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
