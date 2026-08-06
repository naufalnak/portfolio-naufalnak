import { useEffect, useRef } from "react";

/* elemen yang dianggap "tombol" dan bakal bunyi kalau diklik */
const CLICK_SELECTOR =
  'button, a, [role="button"], input[type="submit"], input[type="button"], .nb-tab, [data-sfx]';

/**
 * Global click SFX ala game — bunyi "blip" pendek tiap nge-klik tombol/link.
 * Suara di-generate langsung lewat Web Audio API (no file, no loading).
 */
export function useClickSound({ enabled = true, volume = 0.15 } = {}) {
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const getCtx = () => {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctxRef.current = new AudioCtx();
      }
      if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume();
      }
      return ctxRef.current;
    };

    const playBlip = () => {
      const ctx = getCtx();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(760, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.08);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.11);
      } catch {
        /* audio gagal, diamkan aja biar ga ganggu UX */
      }
    };

    const onPointerDown = (e) => {
      const target = e.target.closest(CLICK_SELECTOR);
      if (!target || target.disabled) return;
      playBlip();
    };

    // capture phase biar tetap kepencet walau ada stopPropagation di child
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [enabled, volume]);
}
