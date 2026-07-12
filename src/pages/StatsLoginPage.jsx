import { useState } from "react";

export default function StatsLoginPage() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  document.title = "Login | Naufal Andresya Kholish";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secret.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secret.trim() }),
      });
      if (res.ok) {
        // full navigation (bukan SPA route) supaya request berikutnya
        // ke /panel-stats bawa cookie & lewat middleware edge
        window.location.href = "/panel-stats";
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Gagal login.");
    } catch {
      setError("Gagal login. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        fontFamily: "'Space Mono', monospace",
      }}>
      <h1 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "1.2rem" }}>
        🔒 Login Stats
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="password"
          placeholder="Masukin secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "2.5px solid #0a0a0a",
            borderRadius: "8px",
            fontFamily: "inherit",
            fontSize: "13px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 18px",
            background: "#4f6ef7",
            color: "#fff",
            border: "2.5px solid #0a0a0a",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            boxShadow: "3px 3px 0 #0a0a0a",
          }}>
          {loading ? "..." : "Masuk"}
        </button>
      </form>
      {error && (
        <p style={{ color: "#e0524d", fontSize: "12px", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
