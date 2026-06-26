const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "About",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.57 15.43 0 12.3 0c-1.7 0-3.2.76-4.2 1.95L12 6H8.5L6.36 3.55C5.9 3.84 5.5 4.2 5.18 4.62L3 2.43 1.57 3.84 4 6.28c-.01.24-.01.48 0 .72H2v2h2.09C4.42 10.92 6 12.61 8 13.4V16H6v2h2v2h2v-2h4v2h2v-2h2v-2h-2v-2.6c2-.79 3.58-2.48 3.91-4.4H22V8h-2z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <div className="pf-bottom">
      <div className="pf-bottom-pill">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isActive ? "9px" : "0px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: isActive ? "#fff" : "#0a0a0a",
                background: isActive ? "#4f6ef7" : "transparent",
                border: "none",
                borderRadius: "999px",
                padding: isActive ? "11px 18px 11px 14px" : "11px 14px",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.6,
                  transition: "opacity 0.2s",
                }}>
                {item.icon}
              </span>
              <span
                style={{
                  maxWidth: isActive ? "120px" : "0px",
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s",
                  display: "inline-block",
                  letterSpacing: "0.01em",
                }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Contact — standalone black button */}
        <button
          onClick={() => onNavigate("contact")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: active === "contact" ? "7px" : "0px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "#fff",
            background: active === "contact" ? "#333" : "#0a0a0a",
            border: "none",
            borderRadius: "999px",
            padding: active === "contact" ? "11px 18px 11px 14px" : "11px 14px",
            cursor: "pointer",
            marginLeft: "4px",
            transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            flexShrink: 0,
            overflow: "hidden",
          }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </span>
          <span
            style={{
              maxWidth: active === "contact" ? "80px" : "0px",
              opacity: active === "contact" ? 1 : 0,
              overflow: "hidden",
              transition:
                "max-width 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}>
            Contact
          </span>
        </button>
      </div>
    </div>
  );
}
