import { useState, useEffect, useRef } from "react";
import { personal, stats } from "../data/portfolio";
import { ArrowDownRight } from "lucide-react";

const roles = [
  "Backend Architect",
  "Full Stack Engineer",
  "Mobile Developer",
  "API Craftsman",
];

// ── Star Field + Meteor Shower Canvas ─────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const SKY = "47,164,215";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const WHITE = "220,235,255";

    // ── LAYER 1: Star field ──────────────────────────────────────────────
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3, // lebih besar (was 1.1 + 0.15)
      base: Math.random() * 0.55 + 0.15, // lebih terang (was 0.2 + 0.04)
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.022 + 0.006,
      bright: Math.random() < 0.25,
      white: Math.random() < 0.4, // tambahan: 40% bintang putih kebiruan
    }));

    // ── LAYER 2: Meteors ─────────────────────────────────────────────────
    function mkMeteor(W, H, forceTop = false) {
      return {
        x: Math.random() * W * 1.3 - W * 0.15,
        y: forceTop ? -Math.random() * H * 0.5 : -Math.random() * 80 - 20,
        len: Math.random() * 70 + 35,
        speed: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.22 + 0.08,
        w: Math.random() * 0.9 + 0.35,
        delay: Math.random() * 300,
      };
    }
    const meteors = Array.from({ length: 6 }, () =>
      mkMeteor(canvas.width, canvas.height, true),
    );

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((s) => {
        const alpha =
          s.base * (0.45 + 0.55 * ((Math.sin(t * s.speed + s.phase) + 1) / 2));
        const col = s.white ? WHITE : SKY; // mix putih & biru
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${alpha})`;
        ctx.fill();
        if (s.bright && alpha > s.base * 0.7) {
          const arm = s.r * 4; // was 3
          ctx.strokeStyle = `rgba(${col},${alpha * 0.5})`; // was 0.45
          // ... sisa kode sama
        }
      });

      // Meteors
      meteors.forEach((m) => {
        if (m.delay > 0) {
          m.delay--;
          return;
        }
        const tailX = m.x - m.len * 0.55;
        const tailY = m.y - m.len;
        const grd = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grd.addColorStop(0, `rgba(${SKY},${m.alpha})`);
        grd.addColorStop(0.4, `rgba(${SKY},${m.alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${SKY},0)`);
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grd;
        ctx.lineWidth = m.w;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.w * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${SKY},${m.alpha * 0.7})`;
        ctx.fill();
        m.x += m.speed * 0.55;
        m.y += m.speed;
        if (m.y > canvas.height + 60 || m.x > canvas.width + 60) {
          Object.assign(m, mkMeteor(canvas.width, canvas.height));
          m.delay = Math.random() * 180 + 60;
        }
      });

      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  // Realtime clock
  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const cur = roles[roleIdx];
    let t;
    if (!deleting && char <= cur.length)
      t = setTimeout(() => setChar((c) => c + 1), 60);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && char > 0)
      t = setTimeout(() => setChar((c) => c - 1), 30);
    else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [char, deleting, roleIdx]);

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(20px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  // Clock format
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  const dateStr = time.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-between pt-16"
      style={{ background: "#0D1B2A", position: "relative" }}>
      {/* ── Particle background ── */}
      <ParticleCanvas />

      {/* ── Main content ── */}
      <div
        className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-8 py-24"
        style={{ position: "relative", zIndex: 1 }}>
        {/* Status badge + Clock */}
        <div className="inline-flex flex-col gap-2 mb-16" style={fade(0)}>
          <div className="inline-flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "#8BA8C4" }}>
              Available for opportunities — {personal.location}
            </span>
          </div>

          {/* Realtime clock */}
          <div
            className="inline-flex items-center gap-3"
            style={{ paddingLeft: "1rem" }}>
            <div
              className="font-mono font-bold tabular-nums"
              style={{
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                color: "#FFFFFF",
              }}>
              {hh}
              <span
                style={{
                  color: "#2FA4D7",
                  animation: "blink 1s step-start infinite",
                }}>
                :
              </span>
              {mm}
              <span
                style={{
                  color: "#2FA4D7",
                  animation: "blink 1s step-start infinite",
                }}>
                :
              </span>
              <span style={{ color: "#8BA8C4" }}>{ss}</span>
            </div>
            <div
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "#8BA8C4" }}>
              {dateStr} · WIB
            </div>
          </div>
        </div>

        {/* Name */}
        <div style={fade(100)} className="mb-6">
          <h1
            className="font-display leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}>
            <span style={{ color: "#FFFFFF" }}>{personal.firstName}</span>
            <br />
            <span style={{ color: "#2FA4D7" }}>{personal.lastName}</span>
          </h1>
        </div>

        {/* Typing */}
        <div className="h-8 flex items-center mb-12" style={fade(200)}>
          <span className="font-mono text-sm" style={{ color: "#8BA8C4" }}>
            {roles[roleIdx].slice(0, char)}
            <span style={{ color: "#2FA4D7" }}>|</span>
          </span>
        </div>

        {/* Bio + Stats */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div style={fade(300)}>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(139,168,196,0.8)" }}>
              {personal.bio}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-all"
                style={{ background: "#2FA4D7", color: "#0D1B2A" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2FA4D7";
                }}>
                View Work <ArrowDownRight size={12} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 border transition-all"
                style={{
                  borderColor: "rgba(139,168,196,0.3)",
                  color: "#8BA8C4",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2FA4D7";
                  e.currentTarget.style.color = "#2FA4D7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,168,196,0.3)";
                  e.currentTarget.style.color = "#8BA8C4";
                }}>
                Contact
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6" style={fade(400)}>
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="mb-3"
                  style={{ height: "1px", background: "rgba(139,168,196,0.2)" }}
                />
                <div
                  className="font-display font-bold mb-1"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}>
                  {s.value}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "#8BA8C4" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div
        className="overflow-hidden py-4"
        style={{ background: "#2FA4D7", position: "relative", zIndex: 1 }}>
        <div className="marquee-track flex gap-16 select-none">
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-16 shrink-0">
                {[
                  "Backend",
                  "Full Stack",
                  "Mobile",
                  "Go",
                  "Node.js",
                  "Flutter",
                  "PostgreSQL",
                  "Docker",
                  "Kubernetes",
                  "React",
                  "Laravel",
                  "REST API",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs tracking-widest uppercase whitespace-nowrap flex items-center gap-4"
                    style={{ color: "#0D1B2A" }}>
                    {item}
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{ background: "rgba(13,27,42,0.4)" }}
                    />
                  </span>
                ))}
              </div>
            ))}
        </div>
      </div>

      {/* Blink keyframe for clock colon */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
