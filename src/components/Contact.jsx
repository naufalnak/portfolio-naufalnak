import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useReveal } from "../hooks/useReveal";
import { personal } from "../data/portfolio";
import { MapPin, Mail, Send, Github, Linkedin, Twitter } from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FORM_FIELDS = [
  {
    name: "subject",
    label: "Subject",
    placeholder: "Project inquiry...",
    type: "text",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Tell me about your project...",
    rows: 5,
  },
];

const inputStyle = {
  borderBottom: "1px solid #E4EDF5",
  color: "#0D1B2A",
};

const cardStyle = {
  background: "#F8FAFC",
  border: "1px solid #E4EDF5",
};

const hoverCard = {
  enter: (e) => {
    e.currentTarget.style.borderColor = "#2FA4D7";
    e.currentTarget.style.background = "rgba(47,164,215,0.04)";
  },
  leave: (e) => {
    e.currentTarget.style.borderColor = "#E4EDF5";
    e.currentTarget.style.background = "#F8FAFC";
  },
};

const hoverSocial = {
  enter: (e) => {
    e.currentTarget.style.borderColor = "#2FA4D7";
    e.currentTarget.style.color = "#2FA4D7";
    e.currentTarget.style.background = "rgba(47,164,215,0.06)";
  },
  leave: (e) => {
    e.currentTarget.style.borderColor = "#E4EDF5";
    e.currentTarget.style.color = "#8BA8C4";
    e.currentTarget.style.background = "#F8FAFC";
  },
};

function MonoLabel({ children }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-widest mb-1"
      style={{ color: "#8BA8C4" }}>
      {children}
    </p>
  );
}

function InputField({ field, value, onChange }) {
  return (
    <div>
      <MonoLabel>{field.label}</MonoLabel>

      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        required
        placeholder={field.placeholder}
        className="w-full bg-transparent outline-none text-sm font-sans pb-2 transition-colors"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#2FA4D7")}
        onBlur={(e) => (e.target.style.borderColor = "#E4EDF5")}
      />
    </div>
  );
}

function TextareaField({ field, value, onChange }) {
  return (
    <div>
      <MonoLabel>{field.label}</MonoLabel>

      <textarea
        name={field.name}
        value={value}
        onChange={onChange}
        required
        rows={field.rows}
        placeholder={field.placeholder}
        className="w-full bg-transparent outline-none text-sm font-sans resize-none pt-1 transition-colors"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#2FA4D7")}
        onBlur={(e) => (e.target.style.borderColor = "#E4EDF5")}
      />
    </div>
  );
}

function SubmitButton({ status }) {
  const isDisabled = status === "sending" || status === "sent";

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-full flex items-center justify-center gap-2 py-3.5 font-mono text-xs tracking-widest uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: "#0D1B2A",
        color: "#FFFFFF",
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.background = "#2FA4D7";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#0D1B2A";
      }}>
      {status === "sending" ? (
        <>
          <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
          Sending...
        </>
      ) : status === "sent" ? (
        "✓ Message Sent"
      ) : (
        <>
          <Send size={12} />
          Send Message
        </>
      )}
    </button>
  );
}

export default function Contact() {
  const headingRef = useReveal();
  const leftRef = useReveal();
  const rightRef = useReveal();

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personal.location,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: `https://github.com/${personal.github}`,
    },
    {
      icon: Linkedin,
      href: `https://linkedin.com/in/${personal.linkedin}`,
    },
    {
      icon: Twitter,
      href: `https://twitter.com/${personal.twitter}`,
    },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
    } catch (error) {
      console.error(error);

      setStatus("error");
      setErrMsg("Gagal mengirim pesan, coba lagi.");
    }
  };

  return (
    <section id="contact" className="py-32" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Heading */}
        <div ref={headingRef} className="reveal flex items-center gap-6 mb-20">
          <span className="section-num">06</span>

          <div className="rule flex-1" />

          <h2
            className="font-display text-3xl font-semibold"
            style={{ color: "#0D1B2A" }}>
            Contact
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left Panel */}
          <div ref={leftRef} className="reveal-left md:col-span-2 space-y-6">
            <p
              className="text-base leading-relaxed font-light"
              style={{ color: "#4A6E8E" }}>
              Open to discussing new opportunities, interesting challenges, and
              collaborative projects.
            </p>

            {/* Contact Cards */}
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="p-5 transition-all"
                style={cardStyle}
                onMouseEnter={hoverCard.enter}
                onMouseLeave={hoverCard.leave}>
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5"
                    style={{
                      background: "rgba(47,164,215,0.1)",
                      border: "1px solid rgba(47,164,215,0.2)",
                    }}>
                    <item.icon size={13} style={{ color: "#2FA4D7" }} />
                  </div>

                  <div>
                    <MonoLabel>{item.label}</MonoLabel>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm transition-colors"
                        style={{ color: "#0D1B2A" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#2FA4D7")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#0D1B2A")
                        }>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: "#0D1B2A" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div>
              <MonoLabel>Online</MonoLabel>

              <div className="flex gap-3 mt-3">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 transition-all"
                    style={{
                      border: "1px solid #E4EDF5",
                      color: "#8BA8C4",
                      background: "#F8FAFC",
                    }}
                    onMouseEnter={hoverSocial.enter}
                    onMouseLeave={hoverSocial.leave}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div ref={rightRef} className="reveal md:col-span-3">
            <div className="px-6 py-4" style={{ background: "#0D1B2A" }}>
              <p className="font-mono text-xs" style={{ color: "#8BA8C4" }}>
                {"// send_message.init()"}
              </p>
            </div>

            <div
              className="p-8"
              style={{
                border: "1px solid #E4EDF5",
                borderTop: "none",
              }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    field={{
                      name: "name",
                      label: "Name",
                      placeholder: "Name",
                      type: "text",
                    }}
                    value={form.name}
                    onChange={handleChange}
                  />

                  <InputField
                    field={{
                      name: "email",
                      label: "Email",
                      placeholder: "name@email.com",
                      type: "email",
                    }}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Dynamic Fields */}
                {FORM_FIELDS.map((field) =>
                  field.rows ? (
                    <TextareaField
                      key={field.name}
                      field={field}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  ) : (
                    <InputField
                      key={field.name}
                      field={field}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  ),
                )}

                <SubmitButton status={status} />

                {status === "sent" && (
                  <p
                    className="font-mono text-xs text-center"
                    style={{ color: "#22c55e" }}>
                    // Message received — I'll be in touch soon.
                  </p>
                )}

                {status === "error" && (
                  <p
                    className="font-mono text-xs text-center"
                    style={{ color: "#ef4444" }}>
                    // Error: {errMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
