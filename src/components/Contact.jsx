import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const MONO = "'DM Mono','Fira Mono',monospace";
const COND = "'Barlow Condensed','Arial Narrow',sans-serif";
const JP = "'Noto Serif JP',serif";
const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return isMobile;
}

/* ── icons ── */
const IconMail = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconMap = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconGH = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const IconLI = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Input ── */
function NbInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  dark = true,
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "#f0ee42" : dark ? "#333" : "rgba(0,0,0,.25)";
  const labelColor = focused
    ? dark
      ? "#f0ee42"
      : "#0a0a0a"
    : dark
      ? "#555"
      : "rgba(0,0,0,.5)";
  return (
    <div>
      <label
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: labelColor,
          display: "block",
          marginBottom: 8,
          transition: "color .15s",
        }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${borderColor}`,
          color: dark ? "#ddd" : "#0a0a0a",
          fontFamily: MONO,
          fontSize: 13,
          padding: "10px 0",
          outline: "none",
          transition: "border-color .15s",
        }}
      />
    </div>
  );
}

function NbTextarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  dark = true,
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "#f0ee42" : dark ? "#333" : "rgba(0,0,0,.25)";
  const labelColor = focused
    ? dark
      ? "#f0ee42"
      : "#0a0a0a"
    : dark
      ? "#555"
      : "rgba(0,0,0,.5)";
  return (
    <div>
      <label
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: labelColor,
          display: "block",
          marginBottom: 8,
          transition: "color .15s",
        }}>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${borderColor}`,
          color: dark ? "#ddd" : "#0a0a0a",
          fontFamily: "'Barlow',sans-serif",
          fontSize: 14,
          padding: "10px 0",
          outline: "none",
          resize: "vertical",
          lineHeight: 1.7,
          transition: "border-color .15s",
        }}
      />
    </div>
  );
}

/* ── Submit button ── */
function SubmitBtn({ sending, sent }) {
  return (
    <button
      type="submit"
      disabled={sending || sent}
      style={{
        width: "100%",
        background: sent ? "#5adb8a" : "#f0ee42",
        color: "#0a0a0a",
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        padding: "14px 0",
        border: `3px solid ${sent ? "#5adb8a" : "#f0ee42"}`,
        cursor: sending || sent ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        boxShadow: sending || sent ? "none" : "5px 5px 0 #333",
        transition: "transform .15s, box-shadow .15s, background .2s",
        opacity: sending ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!sending && !sent) {
          e.currentTarget.style.transform = "translate(3px,3px)";
          e.currentTarget.style.boxShadow = "2px 2px 0 #333";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow =
          sending || sent ? "none" : "5px 5px 0 #333";
      }}>
      {sending ? (
        <>
          <span
            style={{
              width: 12,
              height: 12,
              border: "2px solid rgba(0,0,0,.2)",
              borderTopColor: "#0a0a0a",
              borderRadius: "50%",
              display: "inline-block",
              animation: "nbSpin .7s linear infinite",
            }}
          />{" "}
          Sending...
        </>
      ) : sent ? (
        "✓ Message Sent!"
      ) : (
        <>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>{" "}
          送信する
        </>
      )}
    </button>
  );
}

/* ── CTA big text ── */
function CtaText({ size = 64 }) {
  return (
    <div>
      {/* JP annotation above */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}>
        <span
          style={{
            fontFamily: JP,
            fontSize: 9,
            color: "rgba(0,0,0,.25)",
            letterSpacing: ".1em",
          }}>
          お問い合わせ
        </span>
        <div style={{ width: 20, height: 1, background: "rgba(0,0,0,.1)" }} />
      </div>
      <div
        style={{
          fontFamily: COND,
          fontSize: size,
          fontWeight: 800,
          color: "#0a0a0a",
          lineHeight: 0.92,
          letterSpacing: "-.02em",
          marginBottom: 12,
        }}>
        LET'S
        <br />
        BUILD
        <br />
        SOMETHING.
      </div>
      {/* JP translation */}
      <div
        style={{
          fontFamily: JP,
          fontSize: 11,
          color: "rgba(0,0,0,.2)",
          letterSpacing: ".1em",
          marginBottom: 16,
        }}>
        一緒に何かを作りましょう。
      </div>
      <p style={{ fontSize: 14, color: "rgba(0,0,0,.6)", lineHeight: 1.75 }}>
        Open to full-time roles, freelance projects, and interesting
        collaborations. I'll get back to you within 24 hours.
      </p>
    </div>
  );
}

/* ── Contact info rows ── */
function ContactInfoRows() {
  return (
    <div>
      {[
        {
          Icon: IconMail,
          label: "Email",
          jpLabel: "メール",
          val: personal.email,
          href: `mailto:${personal.email}`,
        },
        {
          Icon: IconMap,
          label: "Location",
          jpLabel: "所在地",
          val: personal.location,
          href: null,
        },
      ].map(({ Icon, label, jpLabel, val, href }) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1.5px solid rgba(0,0,0,.1)",
            transition: "background .18s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }>
          <div
            style={{
              width: 52,
              height: 52,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1.5px solid rgba(0,0,0,.1)",
              color: "rgba(0,0,0,.4)",
            }}>
            <Icon />
          </div>
          <div style={{ padding: "0 20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 2,
              }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,.4)",
                }}>
                {label}
              </span>
              <span
                style={{
                  fontFamily: JP,
                  fontSize: 8,
                  color: "rgba(0,0,0,.2)",
                  letterSpacing: ".05em",
                }}>
                {jpLabel}
              </span>
            </div>
            {href ? (
              <a
                href={href}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "rgba(0,0,0,.6)",
                  textDecoration: "none",
                  transition: "color .15s",
                  wordBreak: "break-all",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(0,0,0,.6)")
                }>
                {val}
              </a>
            ) : (
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "rgba(0,0,0,.6)",
                }}>
                {val}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Social links ── */
function SocialLinks({
  cols = "repeat(3,1fr)",
  btnBorderTop = "3px solid rgba(0,0,0,.12)",
}) {
  const links = [
    {
      Icon: IconGH,
      label: "GitHub",
      jpLabel: "ギットハブ",
      href: `https://github.com/${personal.github}`,
    },
    {
      Icon: IconLI,
      label: "LinkedIn",
      jpLabel: "リンクトイン",
      href: `https://linkedin.com/in/${personal.linkedin}`,
    },
    {
      Icon: null,
      label: "Résumé",
      jpLabel: "履歴書",
      href: personal.resumeUrl,
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols }}>
      {links.map(({ Icon, label, jpLabel, href }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            borderRight: i < 2 ? "3px solid rgba(0,0,0,.12)" : "none",
            borderTop: btnBorderTop,
            padding: "14px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            textDecoration: "none",
            color: "rgba(0,0,0,.5)",
            transition: "background .18s, color .18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0a0a0a";
            e.currentTarget.style.color = "#f0ee42";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(0,0,0,.5)";
          }}>
          {Icon && <Icon />}
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: ".15em",
              textTransform: "uppercase",
            }}>
            {label}
          </span>
          <span
            style={{
              fontFamily: JP,
              fontSize: 7,
              color: "inherit",
              opacity: 0.5,
              letterSpacing: ".04em",
            }}>
            {jpLabel}
          </span>
        </a>
      ))}
    </div>
  );
}

/* ── Available strip ── */
function AvailableStrip({ mobile = false }) {
  return (
    <div
      style={{
        padding: mobile ? "12px 20px" : "14px 24px",
        borderTop: "3px solid rgba(0,0,0,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0a0a0a",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: mobile ? 6 : 7,
            height: mobile ? 6 : 7,
            borderRadius: "50%",
            background: "#5adb8a",
            display: "inline-block",
            animation: "nbPulseC 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontSize: mobile ? 9 : 10,
            color: "#5adb8a",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}>
          Available for opportunities
        </span>
      </div>
      {/* JP status */}
      <span
        style={{
          fontFamily: JP,
          fontSize: 9,
          color: "rgba(90,219,138,.35)",
          letterSpacing: ".05em",
        }}>
        求職中
      </span>
    </div>
  );
}

/* ── Terminal bar ── */
function TerminalBar({ mobile = false }) {
  return (
    <div
      style={{
        background: "#111",
        borderBottom: "3px solid #1a1a1a",
        padding: mobile ? "10px 20px" : "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
      <div style={{ display: "flex", gap: mobile ? 5 : 6 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            style={{
              width: mobile ? 8 : 10,
              height: mobile ? 8 : 10,
              borderRadius: "50%",
              background: c,
              display: "inline-block",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: mobile ? 9 : 10,
            color: "#555",
            letterSpacing: ".15em",
            textTransform: "uppercase",
          }}>
          // send_message.init()
        </span>
        <span
          style={{
            fontFamily: JP,
            fontSize: 8,
            color: "#2a2a2a",
            letterSpacing: ".04em",
          }}>
          メッセージ送信
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main export
══════════════════════════════════════════════ */
export default function Contact() {
  const hRef = useReveal();
  const lRef = useReveal();
  const rRef = useReveal();
  const isMobile = useIsMobile();

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrMsg("Failed to send. Please try again.");
    }
  };

  const sending = status === "sending";
  const sent = status === "sent";
  const border = "3px solid #0a0a0a";

  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "64px 0" : "96px 0",
        background: "#fafaf8",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
        .nb-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1);}
        .nb-reveal-l{opacity:0;transform:translateX(-24px);transition:opacity .65s cubic-bezier(.16,1,.3,1) .1s,transform .65s cubic-bezier(.16,1,.3,1) .1s;}
        .nb-reveal-r{opacity:0;transform:translateX(24px);transition:opacity .65s cubic-bezier(.16,1,.3,1) .2s,transform .65s cubic-bezier(.16,1,.3,1) .2s;}
        .nb-reveal.visible,.nb-reveal-l.visible,.nb-reveal-r.visible{opacity:1;transform:none;}
        @keyframes nbSpin{to{transform:rotate(360deg)}}
        @keyframes nbPulseC{0%,100%{opacity:1}50%{opacity:.3}}
        textarea::placeholder,input::placeholder{color:#aaa;}
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
            marginBottom: isMobile ? 32 : 64,
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
              border,
              padding: isMobile ? "7px 12px" : "8px 16px",
              whiteSpace: "nowrap",
            }}>
            {/* section number depends on whether GitHub section exists */}
            06 — Contact
          </span>
          <div style={{ flex: 1, height: 3, background: "#0a0a0a" }} />
          {/* JP annotation */}
          <span
            style={{
              fontFamily: JP,
              fontSize: 11,
              color: "rgba(0,0,0,.25)",
              letterSpacing: ".08em",
              padding: "0 16px",
              whiteSpace: "nowrap",
            }}>
            お問い合わせ
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
                border,
                padding: "5px 20px",
                background: "#f0ee42",
                whiteSpace: "nowrap",
              }}>
              Let's Talk
            </span>
          )}
        </div>

        {/* ══ DESKTOP: 2-col ══ */}
        {!isMobile && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: 0,
              border,
            }}>
            {/* left */}
            <div
              ref={lRef}
              className="nb-reveal-l"
              style={{
                borderRight: border,
                display: "flex",
                flexDirection: "column",
              }}>
              <div
                style={{
                  padding: "40px 40px 32px",
                  borderBottom: "3px solid rgba(0,0,0,.12)",
                }}>
                <CtaText size={64} />
              </div>
              <div style={{ borderBottom: "3px solid rgba(0,0,0,.12)" }}>
                <ContactInfoRows />
              </div>
              <SocialLinks btnBorderTop="3px solid rgba(0,0,0,.12)" />
              <AvailableStrip />
            </div>

            {/* right — dark form */}
            <div
              ref={rRef}
              className="nb-reveal-r"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#0a0a0a",
              }}>
              <TerminalBar />
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "40px 44px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  flex: 1,
                }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                  }}>
                  <NbInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your name..."
                    value={form.name}
                    onChange={handleChange}
                    dark
                  />
                  <NbInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    dark
                  />
                </div>
                <NbInput
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry..."
                  value={form.subject}
                  onChange={handleChange}
                  dark
                />
                <NbTextarea
                  label="Message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  dark
                />
                <SubmitBtn sending={sending} sent={sent} />
                {sent && (
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "#5adb8a",
                      letterSpacing: ".1em",
                      textAlign: "center",
                    }}>
                    // メッセージを受信しました。近日中にご連絡します。
                  </p>
                )}
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "#ff6b6b",
                      letterSpacing: ".1em",
                      textAlign: "center",
                    }}>
                    // Error: {errMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}

        {/* ══ MOBILE: stacked ══ */}
        {isMobile && (
          <div style={{ border, display: "flex", flexDirection: "column" }}>
            <div ref={lRef} className="nb-reveal-l">
              <div
                style={{
                  padding: "28px 24px 22px",
                  borderBottom: "3px solid rgba(0,0,0,.12)",
                }}>
                <CtaText size={44} />
              </div>
              <div style={{ borderBottom: "3px solid rgba(0,0,0,.12)" }}>
                <ContactInfoRows />
              </div>
              <SocialLinks />
              <AvailableStrip mobile />
            </div>

            <div
              ref={rRef}
              className="nb-reveal-r"
              style={{ background: "#0a0a0a", borderTop: border }}>
              <TerminalBar mobile />
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}>
                <NbInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name..."
                  value={form.name}
                  onChange={handleChange}
                  dark
                />
                <NbInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  dark
                />
                <NbInput
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry..."
                  value={form.subject}
                  onChange={handleChange}
                  dark
                />
                <NbTextarea
                  label="Message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  dark
                />
                <SubmitBtn sending={sending} sent={sent} />
                {sent && (
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "#5adb8a",
                      letterSpacing: ".1em",
                      textAlign: "center",
                    }}>
                    // メッセージを受信しました。近日中にご連絡します。
                  </p>
                )}
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "#ff6b6b",
                      letterSpacing: ".1em",
                      textAlign: "center",
                    }}>
                    // Error: {errMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
