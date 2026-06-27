import { useState, useEffect } from "react";

const TOTAL_BARS = 36;
const DURATION = 5000;
const FADE_DURATION = 1000;

const STEPS = [
  { label: "initializing portfolio...", at: 0 },
  { label: "loading projects", at: 30 },
  { label: "fetching github stats", at: 60 },
  { label: "starting up...", at: 90 },
];

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const iv = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setPercent(pct);
      if (pct >= 100) clearInterval(iv);
    }, 30);

    const t1 = setTimeout(() => setPhase(1), DURATION);
    const t2 = setTimeout(() => onDone(), DURATION + FADE_DURATION);

    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const filledBars = Math.round((percent / 100) * TOTAL_BARS);
  const barString =
    "█".repeat(filledBars) + " ".repeat(TOTAL_BARS - filledBars);

  return (
    <>
      <style>{`
        @keyframes preloaderFadeOut {
          from { opacity: 1; transform: scale(1); filter: blur(0px); }
          to   { opacity: 0; transform: scale(1.04); filter: blur(4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a0a",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation:
            phase === 1
              ? `preloaderFadeOut ${FADE_DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards`
              : "none",
        }}>
        <div style={{ width: "280px" }}>
          {/* Label row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "10px",
              fontFamily: "'Space Mono', monospace",
            }}>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#777",
              }}>
              Loading
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
              }}>
              {percent}%
            </span>
          </div>

          {/* Bar */}
          <div
            style={{
              border: "2.5px solid #fff",
              borderRadius: "4px",
              padding: "6px 8px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              lineHeight: 1,
              color: "#4f6ef7",
              whiteSpace: "pre",
              overflow: "hidden",
            }}>
            {barString}
          </div>

          {/* Status line */}
          <div
            style={{
              marginTop: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "#555",
              letterSpacing: "0.1em",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <span>NAK_portfolio.exe</span>
            <span style={{ animation: "blink 0.8s infinite" }}>▋</span>
          </div>

          {/* Boot messages */}
          <div
            style={{
              marginTop: "20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.06em",
              lineHeight: 1.9,
            }}>
            {STEPS.map((step, i) => {
              const done = percent >= step.at;
              const isCurrent =
                done && (i === STEPS.length - 1 || percent < STEPS[i + 1].at);
              return (
                <div
                  key={step.label}
                  style={{
                    color: done ? "#4f6ef7" : "#3a3a3a",
                    opacity: done ? 1 : 0.5,
                  }}>
                  {done ? "✓" : "○"} {step.label}
                  {isCurrent && i === STEPS.length - 1 && (
                    <span style={{ animation: "blink 1s infinite" }}> ▶</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom accent scrubber, fixed to viewport */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          height: "4px",
          width: `${percent}%`,
          background: "#4f6ef7",
          zIndex: 10000,
          opacity: phase === 1 ? 0 : 1,
          transition: `opacity ${FADE_DURATION}ms ease`,
        }}
      />
    </>
  );
}
