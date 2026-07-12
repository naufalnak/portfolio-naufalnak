import crypto from "node:crypto";

/**
 * POST /api/stats-login
 * body: { secret: string }
 *
 * Verifikasi ADMIN_SECRET, kalau benar set cookie httpOnly `stats_auth`
 * yang dipakai middleware.js (buat gerbang /panel-stats) dan api/stats.js
 * (buat gerbang data) -- keduanya recompute token yang sama dari
 * ADMIN_SECRET, jadi nggak perlu nyimpen session di database manapun.
 *
 * Ada rate limit sederhana (max 5 percobaan / 15 menit per IP) pakai
 * Upstash yang sama dengan tracking, biar nggak gampang di-brute-force.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const SALT = process.env.TRACK_SALT || "default-salt-ganti-ini";

  if (!ADMIN_SECRET) {
    return res.status(500).json({ error: "not_configured" });
  }

  // Rate limit percobaan login
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${SALT}:${ip}`)
      .digest("hex");
    const attemptsKey = `stats_login_attempts:${fingerprint}`;

    const attemptsRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
      "INCR",
      attemptsKey,
    ]);
    const attempts = Number(attemptsRes.result || 1);
    if (attempts === 1) {
      await upstash(UPSTASH_URL, UPSTASH_TOKEN, ["EXPIRE", attemptsKey, "900"]);
    }
    if (attempts > 5) {
      return res
        .status(429)
        .json({ error: "Terlalu banyak percobaan, coba lagi 15 menit lagi." });
    }
  }

  const { secret } = req.body || {};
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Secret salah." });
  }

  const token = crypto
    .createHash("sha256")
    .update(`${ADMIN_SECRET}:stats-cookie`)
    .digest("hex");

  // httpOnly -> nggak bisa dibaca lewat JS/XSS
  // Secure -> cuma dikirim lewat HTTPS
  // SameSite=Lax -> tetap kekirim pas navigasi langsung ke domain sendiri
  // Max-Age 180 hari -> nggak perlu login ulang tiap kali
  res.setHeader(
    "Set-Cookie",
    `stats_auth=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=15552000; Path=/`,
  );

  return res.status(200).json({ ok: true });
}

async function upstash(url, token, command) {
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  return r.json();
}
