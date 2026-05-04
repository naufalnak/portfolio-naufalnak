import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { personal } from "../data/portfolio";
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

export default function Contact() {
  const headerRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: Integrate with your backend / EmailJS / Resend
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute left-1/3 bottom-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="fade-in mb-16 text-center">
          <p className="font-mono text-cyan-400 text-sm mb-2 tracking-widest">
            06. CONTACT
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="neon-text-cyan">Touch</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 max-w-lg mx-auto">
            Have a project in mind? Looking for a backend/fullstack developer?
            I'm always open to discussing new opportunities and interesting
            challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info panel */}
          <div ref={infoRef} className="fade-in md:col-span-2 space-y-6">
            {/* Contact info cards */}
            {[
              {
                icon: FiMail,
                label: "Email",
                value: personal.email,
                href: `mailto:${personal.email}`,
              },
              {
                icon: FiMapPin,
                label: "Location",
                value: personal.location,
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="glass border border-white/5 rounded-xl p-5
                            hover:border-cyan-500/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <item.icon className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-600 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass border border-white/5 rounded-xl p-5">
              <p className="font-mono text-xs text-slate-600 mb-4">
                // FIND ME ONLINE
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: FiGithub,
                    href: `https://github.com/${personal.github}`,
                    label: "GitHub",
                  },
                  {
                    icon: FiLinkedin,
                    href: `https://linkedin.com/in/${personal.linkedin}`,
                    label: "LinkedIn",
                  },
                  {
                    icon: FiTwitter,
                    href: `https://twitter.com/${personal.twitter}`,
                    label: "Twitter",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className="p-3 glass border border-white/5 rounded-lg text-slate-500 hover:text-cyan-400
                               hover:border-cyan-500/40 transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="fade-in md:col-span-3">
            <div className="gradient-border rounded-xl">
              <div className="glass rounded-xl p-6">
                <p className="font-mono text-xs text-slate-600 mb-6">
                  // SEND_MESSAGE.exe
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-slate-500 mb-1 block">
                        YOUR_NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-300
                                   placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60
                                   focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-slate-500 mb-1 block">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-300
                                   placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60
                                   focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-500 mb-1 block">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project inquiry..."
                      className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-300
                                 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60
                                 focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-500 mb-1 block">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/3 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-300
                                 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/60
                                 focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 font-mono text-sm font-semibold
                               bg-cyan-500 hover:bg-cyan-400 text-dark-900 rounded-lg transition-all
                               hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] active:scale-[0.98]
                               disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ color: "#030712" }}>
                    {status === "sending" && (
                      <span className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                    )}
                    {status === "sent" ? (
                      "✓ Message Sent!"
                    ) : status === "sending" ? (
                      "Sending..."
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </button>

                  {status === "sent" && (
                    <p className="font-mono text-xs text-green-400 text-center">
                      // Thanks! I'll get back to you soon.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
