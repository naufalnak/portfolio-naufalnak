/**
 * Ngirim event "seseorang buka halaman blog ini" ke /api/track-click.
 * Fire-and-forget: nggak pernah nge-throw, nggak pernah nge-block render.
 * Di-skip pas localhost/dev supaya ngetes sendiri nggak nyampur ke data production.
 */
export function trackBlogView(slug) {
  if (!slug) return;

  const isLocal =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (isLocal) return;

  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
    keepalive: true,
  }).catch(() => {
    /* diemin aja kalau gagal, jangan ganggu user */
  });
}
