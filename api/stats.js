/**
 * GET /api/stats?secret=YOUR_SECRET
 * atau header: x-admin-secret: YOUR_SECRET
 *
 * Cuma buat kamu sendiri. Balikin jumlah unique visitor & total klik
 * per blog post, diurutkan dari yang paling banyak dilihat.
 */
export default async function handler(req, res) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  const provided = req.headers["x-admin-secret"] || req.query.secret;

  if (!ADMIN_SECRET || !provided || provided !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(200).json({ error: "not_configured", data: [] });
  }

  try {
    const slugsRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
      "SMEMBERS",
      "blogclick:slugs",
    ]);
    const slugs = slugsRes.result || [];

    if (slugs.length === 0) {
      return res.status(200).json({ data: [] });
    }

    const uniqueRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
      "MGET",
      ...slugs.map((s) => `blogclick:unique:${s}`),
    ]);
    const totalRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
      "MGET",
      ...slugs.map((s) => `blogclick:total:${s}`),
    ]);

    const data = slugs
      .map((slug, i) => ({
        slug,
        uniqueVisitors: Number(uniqueRes.result?.[i] || 0),
        totalClicks: Number(totalRes.result?.[i] || 0),
      }))
      .sort((a, b) => b.uniqueVisitors - a.uniqueVisitors);

    return res.status(200).json({ data });
  } catch (err) {
    console.error("stats error:", err);
    return res.status(500).json({ error: "internal_error" });
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
