import crypto from "node:crypto";

/**
 * Routing Middleware (jalan di edge, SEBELUM halaman di-serve sama sekali).
 *
 * /panel-stats cuma bisa diakses kalau browser punya cookie `stats_auth`
 * yang valid. Cookie ini didapat lewat /panel-stats-login (lihat
 * StatsLoginPage.jsx + api/stats-login.js). Tanpa cookie yang benar,
 * request langsung dibales 404 di edge -- SPA-nya nggak pernah ke-load.
 *
 * URL /panel-stats sendiri TETAP BERSIH, nggak butuh query param apa pun.
 */
export const config = {
  runtime: "nodejs",
  matcher: ["/panel-stats"],
};

function deriveToken(secret) {
  return crypto
    .createHash("sha256")
    .update(`${secret}:stats-cookie`)
    .digest("hex");
}

export default function middleware(request) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    return new Response("Not Found", { status: 404 });
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)stats_auth=([^;]+)/);
  const cookieValue = match ? match[1] : null;

  if (cookieValue !== deriveToken(ADMIN_SECRET)) {
    return new Response("Not Found", { status: 404 });
  }

  // Cookie valid -> lanjut, biarkan request diproses seperti biasa
  return undefined;
}
