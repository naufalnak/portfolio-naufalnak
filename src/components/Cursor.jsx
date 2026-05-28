import { useEffect, useRef, useState } from "react";

/*
  Tokyo Neobrutalist Custom Cursor
  ─────────────────────────────────
  Two layers:
    1. dot   — small 10×10 square, yellow, snaps instantly to mouse
    2. trail — larger 36×36 square, hollow, lags behind with spring easing

  States:
    default  → yellow filled dot + hollow black-border box
    hovering → box expands (52×52), fills with semi-transparent yellow
    clicking → dot pulses, box squishes
    text     → dot becomes I-beam crosshair (thin rectangle)

  All styles are injected via a <style> tag so nothing in index.css needs
  touching.  cursor:none is set on <html> by this component directly.
*/

export default function Cursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  /* track mouse with RAF for butter-smooth trail */
  const mouse = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* ── inject global styles ── */
    const styleId = "nb-cursor-global";
    if (!document.getElementById(styleId)) {
      const st = document.createElement("style");
      st.id = styleId;
      st.textContent = `
        html, body { cursor: none !important; }
        a, button, [data-cursor], input, textarea, select, label {
          cursor: none !important;
        }
        @keyframes nbCursorPulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
          50%  { transform: translate(-50%,-50%) scale(1.8); opacity: .4; }
          100% { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
        }
        @keyframes nbCursorClick {
          0%   { transform: translate(-50%,-50%) scale(1);    }
          40%  { transform: translate(-50%,-50%) scale(.65);  }
          100% { transform: translate(-50%,-50%) scale(1);    }
        }
      `;
      document.head.appendChild(st);
    }

    /* ── RAF loop: trail lags behind dot ── */
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      trail.current.x = lerp(trail.current.x, mouse.current.x, 0.12);
      trail.current.y = lerp(trail.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + "px";
        dotRef.current.style.top = mouse.current.y + "px";
      }
      if (trailRef.current) {
        trailRef.current.style.left = trail.current.x + "px";
        trailRef.current.style.top = trail.current.y + "px";
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    /* ── mouse move ── */
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    /* ── hover: links / buttons ── */
    const onEnterInteract = () => {
      dotRef.current?.classList.add("nb-cur-hover");
      trailRef.current?.classList.add("nb-cur-hover");
    };
    const onLeaveInteract = () => {
      dotRef.current?.classList.remove("nb-cur-hover");
      trailRef.current?.classList.remove("nb-cur-hover");
    };

    /* ── hover: text inputs ── */
    const onEnterText = () => {
      dotRef.current?.classList.add("nb-cur-text");
      trailRef.current?.classList.add("nb-cur-text");
    };
    const onLeaveText = () => {
      dotRef.current?.classList.remove("nb-cur-text");
      trailRef.current?.classList.remove("nb-cur-text");
    };

    /* ── click ── */
    const onDown = () => {
      dotRef.current?.classList.add("nb-cur-click");
      trailRef.current?.classList.add("nb-cur-click");
    };
    const onUp = () => {
      dotRef.current?.classList.remove("nb-cur-click");
      trailRef.current?.classList.remove("nb-cur-click");
    };

    /* ── leave / enter window ── */
    const onLeaveWin = () => setVisible(false);
    const onEnterWin = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWin);
    document.addEventListener("mouseenter", onEnterWin);

    /* attach hover listeners to interactive elements */
    const attachListeners = () => {
      const interactables = document.querySelectorAll(
        "a, button, [data-cursor]",
      );
      const textEls = document.querySelectorAll("input, textarea");

      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteract);
        el.addEventListener("mouseleave", onLeaveInteract);
      });
      textEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnterText);
        el.addEventListener("mouseleave", onLeaveText);
      });
    };

    /* initial attach + re-attach on DOM mutations */
    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWin);
      document.removeEventListener("mouseenter", onEnterWin);
      observer.disconnect();
    };
  }, []);

  /* inject component-scoped styles */
  const css = `
    /* ── dot ── */
    .nb-cursor-dot {
      position: fixed;
      width: 10px; height: 10px;
      background: #f0ee42;
      border: 2px solid #0a0a0a;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
      transition: width .18s, height .18s, background .18s, border-radius .18s, opacity .25s;
    }

    /* ── trail ── */
    .nb-cursor-trail {
      position: fixed;
      width: 36px; height: 36px;
      background: transparent;
      border: 2.5px solid #0a0a0a;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99998;
      transition: width .28s cubic-bezier(.16,1,.3,1),
                  height .28s cubic-bezier(.16,1,.3,1),
                  background .22s,
                  border-color .22s,
                  border-radius .22s,
                  opacity .25s;
    }

    /* ── hover state ── */
    .nb-cursor-dot.nb-cur-hover {
      width: 8px; height: 8px;
      background: #0a0a0a;
    }
    .nb-cursor-trail.nb-cur-hover {
      width: 52px; height: 52px;
      background: rgba(240, 238, 66, 0.18);
      border-color: #f0ee42;
      border-width: 2.5px;
    }

    /* ── text / input state ── */
    .nb-cursor-dot.nb-cur-text {
      width: 3px; height: 20px;
      background: #f0ee42;
      border-color: #f0ee42;
    }
    .nb-cursor-trail.nb-cur-text {
      width: 3px; height: 20px;
      border-color: transparent;
      opacity: 0;
    }

    /* ── click state ── */
    .nb-cursor-dot.nb-cur-click {
      animation: nbCursorClick .25s ease forwards;
      background: #fff;
    }
    .nb-cursor-trail.nb-cur-click {
      width: 28px; height: 28px;
      background: rgba(240, 238, 66, 0.35);
      border-color: #f0ee42;
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* dot — snaps instantly */}
      <div
        ref={dotRef}
        className="nb-cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* trail — lags behind */}
      <div
        ref={trailRef}
        className="nb-cursor-trail"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
