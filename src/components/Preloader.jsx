import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 2200));

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true);
      } else {
        window.addEventListener("load", () => resolve(true), { once: true });
      }
    });

    Promise.all([minTime, pageLoaded]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000000",
            }}>
            {/* Logo mark */}
            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "20px",
                border: "3px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
              }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "1px",
                }}>
                NAK_
              </span>
            </div>

            {/* Progress bar track, gaya boot macOS */}
            <div
              style={{
                width: "260px",
                height: "6px",
                borderRadius: "999px",
                backgroundColor: "#3a3a3c",
                overflow: "hidden",
              }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.1, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  backgroundColor: "#3b82f6",
                  borderRadius: "999px",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
