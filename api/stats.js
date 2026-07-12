import crypto from "node:crypto";

/**
 * GET /api/stats
 *
 * Diautentikasi lewat cookie httpOnly `stats_auth` (di-set oleh
 * /api/stats-login setelah secret dicocokkan). Browser ngirim cookie ini
 * otomatis, jadi frontend nggak perlu simpen/kirim secret sama sekali.
 *
 * Balikin per blog post: uniqueVisitors, totalClicks, dan daftar visitor
 * (fingerprint anonim, firstSeen, lastSeen, hits). Fingerprint BUKAN IP
 * asli, cuma hash -- cukup buat mastiin "ini beneran 2 orang berbeda"
 * tanpa nyimpen data pribadi pengunjung.
 */
export default async function handler(req, res) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    return res.status(200).json({ error: "not_configured", data: [] });
  }

  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/(?:^|;\s*)stats_auth=([^;]+)/);
  const cookieValue = match ? match[1] : null;
  const expectedToken = crypto
    .createHash("sha256")
    .update(`${ADMIN_SECRET}:stats-cookie`)
    .digest("hex");

  if (cookieValue !== expectedToken) {
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

    const data = [];

    for (const slug of slugs) {
      const totalRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
        "GET",
        `blogclick:total:${slug}`,
      ]);
      const fpRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
        "SMEMBERS",
        `blogclick:visitors:${slug}`,
      ]);
      const fingerprints = fpRes.result || [];

      let visitors = [];
      if (fingerprints.length > 0) {
        const recordsRes = await upstash(UPSTASH_URL, UPSTASH_TOKEN, [
          "MGET",
          ...fingerprints.map((fp) => `blogclick:visitor:${slug}:${fp}`),
        ]);
        visitors = fingerprints
          .map((fp, i) => {
            const raw = recordsRes.result?.[i];
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return {
              visitorId: fp.slice(0, 10),
              firstSeen: parsed.firstSeen,
              lastSeen: parsed.lastSeen,
              hits: parsed.hits,
            };
          })
          .filter(Boolean)
          .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen));
      }

      data.push({
        slug,
        uniqueVisitors: fingerprints.length,
        totalClicks: Number(totalRes.result || 0),
        visitors,
      });
    }

    data.sort((a, b) => b.uniqueVisitors - a.uniqueVisitors);

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
