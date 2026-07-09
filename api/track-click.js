import crypto from "node:crypto";

/**
 * POST /api/track-click
 * body: { slug: string }
 *
 * Mencatat 1 "view" untuk blog post tertentu.
 * - blogclick:total:{slug}  -> semua hit (termasuk yang berulang dari IP yang sama)
 * - blogclick:unique:{slug} -> cuma naik kalau IP ini belum "ketangkep" dalam 24 jam terakhir
 *
 * IP nggak pernah disimpan mentah, cuma di-hash (SHA-256 + salt) buat dedup key.
 * Kalau env var Upstash belum di-set, endpoint ini diem-diem aja (nggak pernah bikin app crash).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.body || {};
  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Missing slug" });
  }

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const SALT = process.env.TRACK_SALT || "default-salt-ganti-ini";

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    // Belum dikonfigurasi -> jangan bikin error, cuma laporan diam-diam
    return res.status(200).json({ ok: false, reason: "not_configured" });
  }

  try {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    const hashedIp = crypto
      .createHash("sha256")
      .update(`${SALT}:${ip}`)
      .digest("hex");

    const dedupKey = `blogclick:seen:${slug}:${hashedIp}`;
    const uniqueKey = `blogclick:unique:${slug}`;
    const totalKey = `blogclick:total:${slug}`;
    const slugsKey = "blogclick:slugs";

    // Selalu naikkan total hit
    await upstash(UPSTASH_URL, UPSTASH_TOKEN, ["INCR", totalKey]);

    // Coba tandai IP ini "sudah pernah lihat" dalam 24 jam terakhir.
    // SET ... NX EX 86400 cuma berhasil kalau key ini belum ada.
    const setResult = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
      "SET",
      dedupKey,
      "1",
      "NX",
      "EX",
      "86400",
    ]);

    if (setResult?.result === "OK") {
      // IP baru dalam 24 jam ini -> hitung sebagai unique view
      await upstash(UPSTASH_URL, UPSTASH_TOKEN, ["INCR", uniqueKey]);
    }

    // Catat slug ini supaya muncul di /api/stats
    await upstash(UPSTASH_URL, UPSTASH_TOKEN, ["SADD", slugsKey, slug]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("track-click error:", err);
    // Tetap balikin 200 supaya tracking yang gagal nggak pernah ganggu UX
    return res.status(200).json({ ok: false });
  }
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
