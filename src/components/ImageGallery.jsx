import { useState, useRef } from "react";

export default function ImageGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef(null);

  if (!images.length) return null;

  const hasMultiple = images.length > 1;

  const goTo = (i) => setIndex((i + images.length) % images.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  }

  return (
    <>
      <style>{`
        .imgcarousel { margin: 1.2rem 0; }
        .imgcarousel-frame {
          position: relative;
          border: 2.5px solid #0a0a0a;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 5px 5px 0 #0a0a0a;
          background: #fff;
        }
        .imgcarousel-frame img {
          display: block;
          width: 100%;
          max-height: 420px;
          object-fit: cover;
          cursor: zoom-in;
        }
        .imgcarousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid #0a0a0a;
          background: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 2px 0 #0a0a0a;
        }
        .imgcarousel-arrow:hover { background: #4f6ef7; color: #fff; }
        .imgcarousel-arrow.prev { left: 10px; }
        .imgcarousel-arrow.next { right: 10px; }
        .imgcarousel-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }
        .imgcarousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid #0a0a0a;
          background: #fff;
          cursor: pointer;
          padding: 0;
        }
        .imgcarousel-dot.active { background: #4f6ef7; }
        .imgcarousel-count {
          position: absolute;
          top: 8px;
          right: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgba(10,10,10,0.6);
          padding: 3px 7px;
          border-radius: 6px;
        }
      `}</style>

      <div className="imgcarousel">
        <div
          className="imgcarousel-frame"
          onTouchStart={hasMultiple ? onTouchStart : undefined}
          onTouchEnd={hasMultiple ? onTouchEnd : undefined}>
          <img src={images[index]} alt="" onClick={() => setLightbox(true)} />
          {hasMultiple && (
            <span className="imgcarousel-count">
              {index + 1}/{images.length}
            </span>
          )}
          {hasMultiple && (
            <>
              <button
                className="imgcarousel-arrow prev"
                onClick={prev}
                aria-label="Sebelumnya">
                ‹
              </button>
              <button
                className="imgcarousel-arrow next"
                onClick={next}
                aria-label="Berikutnya">
                ›
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="imgcarousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`imgcarousel-dot${i === index ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ke gambar ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.85)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "2rem",
          }}>
          <img
            src={images[index]}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "8px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </>
  );
}
