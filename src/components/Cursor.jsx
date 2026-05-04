import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX - 4 + "px";
        dot.current.style.top = e.clientY - 4 + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 16 + "px";
        ring.current.style.top = e.clientY - 16 + "px";
      }
    };

    const onEnter = () => ring.current?.classList.add("hover");
    const onLeave = () => ring.current?.classList.remove("hover");

    window.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
