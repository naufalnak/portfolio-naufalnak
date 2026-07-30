import { useState, useRef, useEffect } from "react";

// ── Ganti dengan file MP3 kamu di public/music/ ──
const TRACK = {
  title: "Lofi Yorushika",
  artist: "Yorushika",
  src: "/music/lofi-yorushika.mp3",
};

function formatTime(s) {
  if (isNaN(s) || !s) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [started, setStarted] = useState(false); // has user interacted?
  const audioRef = useRef(null);

  // ── Autoplay on first user interaction ──
  useEffect(() => {
    const tryPlay = () => {
      if (started) return;
      setStarted(true);
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {}); // silently fail if browser still blocks
    };

    // Listen for any interaction
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });
    document.addEventListener("scroll", tryPlay, { once: true });

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
  }, [started]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <>
      <style>{`
        @keyframes eq {
          from { height: 4px; }
          to   { height: 14px; }
        }
        .mp-icon-btn {
          background: none; border: none; cursor: pointer; padding: 4px;
          border-radius: 6px; display: flex; align-items: center;
          justify-content: center; color: #0a0a0a; transition: background 0.15s;
        }
        .mp-icon-btn:hover { background: #f0f4ff; }
        .mp-vol { -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; }
        .mp-vol::-webkit-slider-thumb {
          -webkit-appearance: none; width: 10px; height: 10px;
          background: #0a0a0a; border-radius: 50%; border: 1.5px solid #0a0a0a;
        }
        .mp-progress-bar:hover { height: 6px !important; }
      `}</style>

      <audio
        ref={audioRef}
        src={TRACK.src}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
        }}
        loop={false}
      />

      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "12px",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}>
        {/* ── Expanded player ── */}
        <div
          style={{
            width: "min(280px, calc(100vw - 24px))",
            background: "#fff",
            border: "2.5px solid #0a0a0a",
            borderRadius: "16px",
            boxShadow: "5px 5px 0 #0a0a0a",
            overflow: "hidden",
            transformOrigin: "bottom right",
            transform: open ? "scale(1)" : "scale(0.85)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "all" : "none",
            transition:
              "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
          }}>
          {/* Header */}
          <div
            style={{
              background: "#4f6ef7",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #0a0a0a",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Equalizer bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "2px",
                  height: "14px",
                }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span
                    key={i}
                    style={{
                      width: "3px",
                      borderRadius: "2px",
                      background: "#fff",
                      display: "inline-block",
                      height: playing ? undefined : "4px",
                      animation: playing
                        ? `eq 0.8s ease-in-out ${d}s infinite alternate`
                        : "none",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.1em",
                }}>
                NOW PLAYING
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "5px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                color: "#fff",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                padding: 0,
              }}>
              ✕
            </button>
          </div>

          {/* Track info */}
          <div
            style={{
              padding: "14px 14px 10px",
              borderBottom: "2px solid #f0f0f0",
            }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#0a0a0a",
                marginBottom: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {TRACK.title}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: "#888",
              }}>
              {TRACK.artist}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ padding: "10px 14px 4px" }}>
            <div
              onClick={seek}
              className="mp-progress-bar"
              style={{
                height: "4px",
                background: "#e8e8e8",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
                transition: "height 0.15s",
              }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "#4f6ef7",
                  borderRadius: "4px",
                  transition: "width 0.1s linear",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${pct}%`,
                  transform: "translate(-50%,-50%)",
                  width: "10px",
                  height: "10px",
                  background: "#4f6ef7",
                  border: "2px solid #0a0a0a",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
              }}>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: "#aaa",
                }}>
                {formatTime(current)}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: "#aaa",
                }}>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              padding: "4px 14px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            {/* Restart */}
            <button
              className="mp-icon-btn"
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              title="Restart">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                width: "42px",
                height: "42px",
                background: "#4f6ef7",
                border: "2.5px solid #0a0a0a",
                borderRadius: "50%",
                boxShadow: "3px 3px 0 #0a0a0a",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-1px,-1px)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #0a0a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "3px 3px 0 #0a0a0a";
              }}>
              {playing ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#888">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="mp-vol"
                style={{ width: "60px", height: "4px", accentColor: "#4f6ef7" }}
              />
            </div>
          </div>
        </div>

        {/* ── Float button ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            width: "48px",
            height: "48px",
            background: open ? "#4f6ef7" : "#fff",
            border: "2.5px solid #0a0a0a",
            borderRadius: "12px",
            boxShadow: "3px 3px 0 #0a0a0a",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.15s, box-shadow 0.15s, background 0.2s",
            flexShrink: 0,
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-2px,-2px)";
            e.currentTarget.style.boxShadow = "5px 5px 0 #0a0a0a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0,0)";
            e.currentTarget.style.boxShadow = "3px 3px 0 #0a0a0a";
          }}
          title={open ? "Close player" : "Open music player"}>
          {playing ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                height: "18px",
              }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <span
                  key={i}
                  style={{
                    width: "4px",
                    borderRadius: "2px",
                    background: open ? "#fff" : "#4f6ef7",
                    animation: `eq 0.8s ease-in-out ${d}s infinite alternate`,
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "20px" }}>🎵</span>
          )}

          {/* Playing indicator dot */}
          {playing && !open && (
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "7px",
                height: "7px",
                background: "#22c55e",
                borderRadius: "50%",
                border: "1.5px solid #0a0a0a",
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}
