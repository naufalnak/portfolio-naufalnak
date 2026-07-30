import { useState } from "react";
import {
  personal,
  skills,
  experience,
  certifications,
  trainings,
} from "../data/portfolio";
import foto from "../assets/me.png";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const CODE_LINES = [
  { key: "name", val: `"${personal.name}"`, color: "#dce6ff" },
  { key: "role", val: `"${personal.role}"`, color: "#dce6ff" },
  { key: "location", val: `"${personal.location}"`, color: "#dce6ff" },
  { key: "gpa", val: "3.85", color: "#a8ffb8" },
  { key: "available", val: "true", color: "#a8ffb8" },
];

const LINKS = [
  { label: "GitHub", href: `https://github.com/${personal.github}` },
  { label: "LinkedIn", href: `https://linkedin.com/in/${personal.linkedin}` },
  { label: "Résumé", href: personal.resumeUrl },
];

const DEVICON = {
  "Node.js": "devicon-nodejs-plain colored",
  "Express.js": "devicon-express-original",
  Go: "devicon-go-original colored",
  "Go Fiber": "devicon-go-original colored",
  Java: "devicon-java-plain colored",
  "Spring Boot": "devicon-spring-plain colored",
  "REST API": "devicon-fastapi-plain colored",
  PostgreSQL: "devicon-postgresql-plain colored",
  MySQL: "devicon-mysql-plain colored",
  "Prisma ORM": "devicon-prisma-original",
  GORM: "devicon-go-original colored",
  Redis: "devicon-redis-plain colored",
  PHP: "devicon-php-plain colored",
  CodeIgniter: "devicon-codeigniter-plain colored",
  Laravel: "devicon-laravel-plain colored",
  Kotlin: "devicon-kotlin-plain colored",
  "Android Studio": "devicon-androidstudio-plain colored",
  "Jetpack Compose": "devicon-android-plain colored",
  "React Native": "devicon-react-original colored",
  React: "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain",
  JavaScript: "devicon-javascript-plain colored",
  TypeScript: "devicon-typescript-plain colored",
  HTML: "devicon-html5-plain colored",
  CSS: "devicon-css3-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-plain colored",
  Vitest: "devicon-vitest-plain colored",
  Git: "devicon-git-plain colored",
  Postman: "devicon-postman-plain colored",
  Figma: "devicon-figma-plain colored",
  Bootstrap: "devicon-bootstrap-plain colored",
  Vercel: "devicon-vercel-original",
  "AWS Cloud": "devicon-amazonwebservices-plain-wordmark colored",
  GCP: "devicon-googlecloud-plain colored",
};

const education = experience.filter((e) => e.type === "edu");

export default function SkillsPage() {
  const [tab, setTab] = useState("education");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const openPreview = (title, url) => {
    setPreviewDoc({ title, url });
    setPageNumber(1);
    setNumPages(null);
  };

  const closePreview = () => {
    setPreviewDoc(null);
    setNumPages(null);
    setPageNumber(1);
  };

  return (
    <div className="pf-page">
      <style>{`
        .about-grid { display: grid; grid-template-columns: 200px 1fr; gap: 14px; margin-bottom: 14px; align-items: start; }
        .about-facts { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-facts { grid-template-columns: repeat(3,1fr); }
          .skills-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .about-facts { grid-template-columns: repeat(3,1fr); }
        }
      `}</style>

      <p className="pg-label">Who I Am</p>
      <h2 className="pg-title">About</h2>

      {/* ── TOP: Photo + Bio ── */}
      <div className="about-grid" style={{ alignItems: "stretch" }}>
        {/* Photo col */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "100%",
          }}>
          <div
            style={{
              background: "#e8f0fe",
              border: "2.5px solid #0a0a0a",
              borderRadius: "12px",
              boxShadow: "4px 4px 0 #0a0a0a",
              position: "relative",
              overflow: "hidden",
              flex: 1,
              minHeight: "200px",
            }}>
            <img
              src={foto}
              alt={personal.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#fff",
                border: "2px solid #0a0a0a",
                borderRadius: "999px",
                padding: "3px 10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "9px",
                fontWeight: 700,
                fontFamily: "'Space Mono', monospace",
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
              Open
            </div>
          </div>
          <div className="nb-card" style={{ padding: "0.8rem" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: "#888",
                marginBottom: "5px",
              }}>
              📍 {personal.location}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: "#888",
                wordBreak: "break-all",
              }}>
              ✉ {personal.email}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}>
              <a
                href={`https://github.com/${personal.github}`}
                target="_blank"
                rel="noreferrer"
                className="nb-btn nb-btn-white"
                style={{ fontSize: "11px", justifyContent: "center" }}>
                GitHub ↗
              </a>
              <a
                href={`https://linkedin.com/in/${personal.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="nb-btn nb-btn-white"
                style={{ fontSize: "11px", justifyContent: "center" }}>
                LinkedIn ↗
              </a>
            </div>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="nb-btn nb-btn-blue"
              style={{
                fontSize: "11px",
                justifyContent: "center",
                width: "100%",
              }}>
              Download Résumé ↗
            </a>
          </div>
        </div>

        {/* Bio col */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="nb-card">
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#0a0a0a",
                marginBottom: "10px",
              }}>
              {personal.bio}
            </p>
            <p style={{ fontSize: "12px", lineHeight: 1.8, color: "#555" }}>
              {personal.bioExtended}
            </p>
          </div>

          {/* Code block */}
          <div
            style={{
              background: "#0a0a0a",
              border: "2.5px solid #0a0a0a",
              borderRadius: "12px",
              padding: "0.9rem 1.1rem",
              boxShadow: "4px 4px 0 #4f6ef7",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              lineHeight: 1.9,
            }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span
                  key={c}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: c,
                    display: "inline-block",
                  }}
                />
              ))}
              <span
                style={{ fontSize: "9px", color: "#444", marginLeft: "6px" }}>
                identity.config.ts
              </span>
            </div>
            <div style={{ color: "#888" }}>
              export const <span style={{ color: "#fff" }}>developer</span>
              <span style={{ color: "#555" }}> = {"{"}</span>
            </div>
            {CODE_LINES.map(({ key, val, color }) => (
              <div key={key} style={{ paddingLeft: "16px" }}>
                <span style={{ color: "#4f6ef7" }}>{key}</span>
                <span style={{ color: "#555" }}>: </span>
                <span style={{ color }}>{val}</span>
                <span style={{ color: "#333" }}>,</span>
              </div>
            ))}
            <div style={{ color: "#555" }}>{"}"}</div>
          </div>

          {/* Quick facts */}
          <div className="about-facts">
            {[
              { num: personal.yearStarted, label: "Started" },
              { num: "3.85", label: "GPA", blue: true },
              { num: "4", label: "Internships" },
            ].map((f) => (
              <div
                key={f.label}
                className={f.blue ? "nb-card-blue" : "nb-card"}
                style={{ textAlign: "center", padding: "0.8rem" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(18px,4vw,22px)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}>
                  {f.num}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "3px",
                    opacity: f.blue ? 1 : 0.55,
                    color: f.blue ? "#b8caff" : "inherit",
                  }}>
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FULL WIDTH TAB ── */}
      <div className="nb-card" style={{ marginBottom: "1.2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}>
          {["education", "certification", "training"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 16px",
                border: "2px solid #0a0a0a",
                borderRadius: "6px",
                cursor: "pointer",
                background: tab === t ? "#4f6ef7" : "#fff",
                color: tab === t ? "#fff" : "#888",
                boxShadow:
                  tab === t ? "2px 2px 0 #0a0a0a" : "2px 2px 0 #d0d0d0",
                transition: "all 0.15s",
              }}>
              {t === "education"
                ? "🎓 Education"
                : t === "certification"
                  ? "🏅 Certification"
                  : "📚 Training"}
            </button>
          ))}
        </div>
        <div key={tab} style={{ animation: "pageFadeIn 0.2s ease" }}>
          {tab === "education" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {education.map((e) => (
                <div
                  key={e.id}
                  style={{
                    background: "#4f6ef7",
                    border: "2.5px solid #0a0a0a",
                    borderRadius: "10px",
                    padding: "1rem 1.2rem",
                    boxShadow: "3px 3px 0 #0a0a0a",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "5px",
                    alignItems: "start",
                  }}>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                      }}>
                      {e.role}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#b8caff",
                        marginTop: "2px",
                      }}>
                      {e.company}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        background: "#3a5ae8",
                        border: "2px solid #0a0a0a",
                        borderRadius: "5px",
                        padding: "2px 8px",
                        color: "#fff",
                        display: "inline-block",
                        boxShadow: "2px 2px 0 #0a0a0a",
                        whiteSpace: "nowrap",
                      }}>
                      {e.period}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "6px",
                        marginTop: "3px",
                      }}>
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "#b8caff",
                        }}>
                        Education
                      </div>
                      {e.proof && (
                        <button
                          onClick={() => openPreview(e.role, e.proof)}
                          title="Lihat bukti"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "22px",
                            height: "22px",
                            border: "2px solid #0a0a0a",
                            borderRadius: "5px",
                            background: "#fff",
                            color: "#0a0a0a",
                            cursor: "pointer",
                            boxShadow: "1.5px 1.5px 0 #0a0a0a",
                            flexShrink: 0,
                          }}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#dce6ff",
                      lineHeight: 1.6,
                      gridColumn: "1/-1",
                      marginTop: "4px",
                    }}>
                    {e.desc}
                  </div>
                </div>
              ))}
            </div>
          ) : tab === "certification" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    background: "#fff",
                    border: "2px solid #e8e8e8",
                    borderRadius: "10px",
                    padding: "1rem 1.2rem",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#4f6ef7",
                        marginBottom: "4px",
                      }}>
                      Certified · {cert.date}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0a0a0a",
                      }}>
                      {cert.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#4f6ef7",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}>
                      {cert.issuer}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        color: "#aaa",
                        marginTop: "4px",
                      }}>
                      {cert.valid}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginTop: "8px",
                      }}>
                      {cert.tags.map((t) => (
                        <span
                          key={t}
                          className="nb-tag"
                          style={{ fontSize: "9px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      flexShrink: 0,
                    }}>
                    <div style={{ fontSize: "36px" }}>🏅</div>
                    {cert.proof && (
                      <button
                        onClick={() => openPreview(cert.title, cert.proof)}
                        title="Lihat bukti"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "22px",
                          height: "22px",
                          border: "2px solid #0a0a0a",
                          borderRadius: "5px",
                          background: "#fff",
                          color: "#0a0a0a",
                          cursor: "pointer",
                          boxShadow: "1.5px 1.5px 0 #0a0a0a",
                        }}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {trainings.map((tr) => (
                <div
                  key={tr.id}
                  style={{
                    background: "#fff",
                    border: "2px solid #e8e8e8",
                    borderRadius: "10px",
                    padding: "1rem 1.2rem",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#4f6ef7",
                        marginBottom: "4px",
                      }}>
                      {tr.period}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0a0a0a",
                      }}>
                      {tr.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#4f6ef7",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}>
                      {tr.issuer}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginTop: "8px",
                      }}>
                      {tr.tags.map((t) => (
                        <span
                          key={t}
                          className="nb-tag"
                          style={{ fontSize: "9px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      flexShrink: 0,
                    }}>
                    <div style={{ fontSize: "36px" }}>📚</div>
                    {tr.proof && (
                      <button
                        onClick={() => openPreview(tr.title, tr.proof)}
                        title="Lihat bukti"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "22px",
                          height: "22px",
                          border: "2px solid #0a0a0a",
                          borderRadius: "5px",
                          background: "#fff",
                          color: "#0a0a0a",
                          cursor: "pointer",
                          boxShadow: "1.5px 1.5px 0 #0a0a0a",
                        }}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "0.5rem 0 1rem",
        }}>
        <div
          style={{ width: "24px", height: "2.5px", background: "#0a0a0a" }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888",
          }}>
          Tech Stack
        </span>
        <div style={{ flex: 1, height: "2.5px", background: "#0a0a0a" }} />
      </div>

      {/* ── SKILLS GRID ── */}
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.category} className="nb-card">
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#4f6ef7",
                marginBottom: "10px",
              }}>
              {group.category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: "#f0f4ff",
                    border: "2px solid #0a0a0a",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    boxShadow: "2px 2px 0 #0a0a0a",
                  }}>
                  {DEVICON[item] && (
                    <i className={DEVICON[item]} style={{ fontSize: "14px" }} />
                  )}
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {previewDoc && (
        <div
          onClick={closePreview}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}>
          <div
            onClick={(ev) => ev.stopPropagation()}
            style={{
              background: "#fff",
              border: "2.5px solid #0a0a0a",
              borderRadius: "12px",
              boxShadow: "6px 6px 0 #0a0a0a",
              width: "min(820px, 100%)",
              height: "min(88vh, 900px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: "2px solid #0a0a0a",
                background: "#f0f4ff",
              }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#0a0a0a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {previewDoc.title}
              </div>
              <button
                onClick={closePreview}
                title="Tutup"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  border: "2px solid #0a0a0a",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginLeft: "10px",
                }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="3">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflow: "auto",
                background: "#525659",
                display: "flex",
                justifyContent: "center",
                padding: "16px",
              }}>
              <Document
                file={previewDoc.url}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(err) => console.error("PDF load error:", err)}
                loading={
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "12px",
                    }}>
                    Loading...
                  </div>
                }
                error={
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "12px",
                    }}>
                    Gagal load dokumen.
                  </div>
                }>
                <Page pageNumber={pageNumber} width={720} />
              </Document>
            </div>

            {numPages > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "10px 16px",
                  borderTop: "2px solid #0a0a0a",
                  background: "#f0f4ff",
                }}>
                <button
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "5px 12px",
                    border: "2px solid #0a0a0a",
                    borderRadius: "6px",
                    background: pageNumber <= 1 ? "#eee" : "#fff",
                    cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
                  }}>
                  ← Prev
                </button>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}>
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() =>
                    setPageNumber((p) => Math.min(numPages, p + 1))
                  }
                  disabled={pageNumber >= numPages}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "5px 12px",
                    border: "2px solid #0a0a0a",
                    borderRadius: "6px",
                    background: pageNumber >= numPages ? "#eee" : "#fff",
                    cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
                  }}>
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
