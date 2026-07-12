import { useState, useEffect } from "react";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  document.title = "Blog Stats | Naufal Andresya Kholish";

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats");
      if (res.status === 401) {
        window.location.href = "/panel-stats-login";
        return;
      }
      const json = await res.json();
      setData(json.data || []);
    } catch {
      setError("Gagal ambil data. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrapStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "3rem 1.5rem",
    fontFamily: "'Space Mono', monospace",
    minHeight: "70vh",
  };

  return (
    <div style={wrapStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800 }}>📊 Blog Stats</h1>
        <button
          onClick={fetchStats}
          disabled={loading}
          style={{
            padding: "6px 14px",
            background: "#fff",
            border: "2px solid #0a0a0a",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
          }}>
          {loading ? "..." : "↻ Refresh"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#e0524d", fontSize: "12px", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      {!data || data.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#5b5f77" }}>
          {loading
            ? "Loading..."
            : "Belum ada data. Buka salah satu halaman blog dulu."}
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.map((post) => (
            <div
              key={post.slug}
              style={{
                border: "2.5px solid #0a0a0a",
                borderRadius: "10px",
                boxShadow: "4px 4px 0 #0a0a0a",
                overflow: "hidden",
              }}>
              <button
                onClick={() =>
                  setExpanded(expanded === post.slug ? null : post.slug)
                }
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "#f0f4ff",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}>
                <span style={{ fontSize: "13px", fontWeight: 700 }}>
                  {post.slug}
                </span>
                <span
                  style={{ display: "flex", gap: "14px", fontSize: "12px" }}>
                  <span>
                    👤 <b>{post.uniqueVisitors}</b> unique
                  </span>
                  <span>
                    🔁 <b>{post.totalClicks}</b> total
                  </span>
                  <span>{expanded === post.slug ? "▲" : "▼"}</span>
                </span>
              </button>

              {expanded === post.slug && (
                <div style={{ padding: "10px 16px 16px" }}>
                  {post.visitors.length === 0 ? (
                    <p style={{ fontSize: "12px", color: "#5b5f77" }}>
                      Nggak ada detail visitor.
                    </p>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        fontSize: "11.5px",
                        borderCollapse: "collapse",
                      }}>
                      <thead>
                        <tr style={{ textAlign: "left", color: "#5b5f77" }}>
                          <th style={{ padding: "4px 6px" }}>Visitor ID</th>
                          <th style={{ padding: "4px 6px" }}>Pertama kali</th>
                          <th style={{ padding: "4px 6px" }}>Terakhir</th>
                          <th style={{ padding: "4px 6px" }}>Hits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post.visitors.map((v) => (
                          <tr
                            key={v.visitorId}
                            style={{ borderTop: "1px solid #e2e5f0" }}>
                            <td style={{ padding: "6px" }}>
                              <code>{v.visitorId}</code>
                            </td>
                            <td style={{ padding: "6px" }}>
                              {formatDate(v.firstSeen)}
                            </td>
                            <td style={{ padding: "6px" }}>
                              {formatDate(v.lastSeen)}
                            </td>
                            <td style={{ padding: "6px" }}>{v.hits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
