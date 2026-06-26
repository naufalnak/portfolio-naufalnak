import { useEffect, useState } from "react";

const DISCORD_ID = "496560152279777289";

const STATUS_COLOR = {
  online: "#22c55e",
  idle: "#f59e0b",
  dnd: "#ef4444",
  offline: "#6b7280",
};

const STATUS_LABEL = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

export default function DiscordStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const status = data.discord_status || "offline";
  const username = data.discord_user?.username || "brosnoopy";
  const avatar = data.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=64`
    : null;

  // Current activity
  const activity = data.activities?.find((a) => a.type === 0);
  const spotify = data.listening_to_spotify ? data.spotify : null;

  return (
    <div
      style={{
        background: "#fff",
        border: "2.5px solid #0a0a0a",
        borderRadius: "12px",
        padding: "0.9rem 1rem",
        boxShadow: "4px 4px 0 #0a0a0a",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Avatar + status dot */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #0a0a0a",
              overflow: "hidden",
              background: "#5865f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>
                {username[0]?.toUpperCase()}
              </span>
            )}
          </div>
          {/* Status dot */}
          <span
            style={{
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: STATUS_COLOR[status],
              border: "2px solid #fff",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "1px",
            }}>
            {/* Discord icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#5865f2">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                color: "#0a0a0a",
              }}>
              {username}
            </span>
          </div>

          {/* Status / activity */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: STATUS_COLOR[status],
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                color: "#888",
                letterSpacing: "0.06em",
              }}>
              {spotify
                ? `🎵 ${spotify.song} — ${spotify.artist}`
                : activity
                  ? `Playing ${activity.name}`
                  : STATUS_LABEL[status]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
