import { useState } from "react";
import emailjs from "@emailjs/browser";
import { personal } from "../data/portfolio";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          date: new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const links = [
    {
      ico: "📧",
      label: "Email",
      val: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      ico: "💼",
      label: "LinkedIn",
      val: `in/${personal.linkedin}`,
      href: `https://linkedin.com/in/${personal.linkedin}`,
    },
    {
      ico: "🐙",
      label: "GitHub",
      val: `github.com/${personal.github}`,
      href: `https://github.com/${personal.github}`,
    },
    { ico: "📍", label: "Location", val: personal.location, href: null },
  ];

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: "2px solid #0a0a0a",
    borderRadius: "7px",
    fontSize: "13px",
    fontFamily: "'Space Grotesk', sans-serif",
    background: "#f0f4ff",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };
  const labelStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: "5px",
    display: "block",
  };
  const onFocus = (e) => {
    e.target.style.borderColor = "#4f6ef7";
    e.target.style.boxShadow = "2px 2px 0 #4f6ef7";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "#0a0a0a";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="pf-page">
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>

      <p className="pg-label">Let's Talk</p>
      <h2 className="pg-title">Contact</h2>

      <div className="contact-grid">
        {/* Left — CTA + Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="nb-card-blue">
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#b8caff",
                marginBottom: "4px",
                fontFamily: "'Space Mono', monospace",
              }}>
              Available for hire
            </div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
              }}>
              Let's build something great together.
            </div>
          </div>

          <div
            className="nb-card"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Your name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
              },
              {
                name: "subject",
                label: "Subject",
                type: "text",
                placeholder: "Project inquiry...",
              },
            ].map((f) => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <button
              className="nb-btn nb-btn-blue"
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{ alignSelf: "flex-start" }}>
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent! ✓"
                  : "Send message ↗"}
            </button>
            {status === "error" && (
              <p
                style={{
                  fontSize: "11px",
                  color: "#e53e3e",
                  fontFamily: "'Space Mono', monospace",
                }}>
                Failed to send. Try email directly.
              </p>
            )}
          </div>
        </div>

        {/* Right — Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {links.map((l) => (
            <div
              key={l.label}
              className="nb-card"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#f0f4ff",
                  border: "2px solid #0a0a0a",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  flexShrink: 0,
                }}>
                {l.ico}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#aaa",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                  {l.label}
                </div>
                {l.href ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0a0a0a",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}>
                    {l.val}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0a0a0a",
                    }}>
                    {l.val}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
