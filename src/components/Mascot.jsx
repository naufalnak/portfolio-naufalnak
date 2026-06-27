import { useState, useEffect, useRef } from "react";

// Pesan per halaman — akan berganti otomatis tiap beberapa detik
const PAGE_SCRIPTS = {
  home: [
    "Halo! Selamat datang di portfolio saya! 👋",
    "Saya Naufal, seorang Back End & Mobile Developer!",
    "Scroll ke bawah buat lihat project dan tech stack saya!",
    "Klik 'View Projects' buat lihat semua project saya! 🚀",
  ],
  skills: [
    "Ini halaman About & Skills saya!",
    "Saya spesialis di backend pakai Go dan Node.js! ⚙️",
    "Untuk mobile, saya pakai Kotlin & Jetpack Compose! 📱",
    "Frontend? React dan Next.js sudah jadi teman sehari-hari! ✨",
    "Oh iya, saya juga punya sertifikat BNSP lho! 🏅",
  ],
  projects: [
    "Ini semua project yang udah saya bangun! 💪",
    "ServisYuk adalah project fullstack terbaru saya!",
    "Ada juga Food Tourism AI pakai TensorFlow Lite! 🍜",
    "Klik card-nya buat baca case study lengkapnya!",
    "Semua project ini dikerjain sendiri lho! 😄",
  ],
  experience: [
    "Ini perjalanan karir saya! 🗺️",
    "Saya pernah intern di PT. Lentera Bangsa Benderang!",
    "Di sana saya bangun RESTful API pakai Node.js!",
    "Sebelumnya juga intern sebagai Android Developer!",
    "Pengalaman di lapangan ngajarin banyak hal! 🙏",
  ],
  github: [
    "Ini aktivitas GitHub saya! ⭐",
    "Saya punya 36+ public repositories!",
    "TypeScript dan Go adalah bahasa favorit saya!",
    "Contribution graph lumayan hijau kan? 😅",
    "Follow saya di GitHub @naufalnak!",
  ],
  contact: [
    "Mau kerja sama? Hubungi saya yuk! 📬",
    "Isi form di sebelah kanan buat kirim pesan!",
    "Atau langsung email ke naufal.ndak17@gmail.com!",
    "Saya juga aktif di LinkedIn lho!",
    "Response time saya cepet kok, dijamin! 😊",
  ],
  "project-detail": [
    "Makasih udah baca case study-nya! 📖",
    "Setiap project punya cerita tersendiri!",
    "Kalau tertarik kolaborasi, hubungi saya yuk!",
    "Ada feedback? Saya selalu terbuka! 😄",
  ],
};

const CHAR_WIDTH = 48;

function PixelChar({ blinking, frame, facingLeft }) {
  const leftLegDown = frame === 1;
  const rightLegDown = frame === 2;
  return (
    <svg
      width="48"
      height="64"
      viewBox="0 0 12 16"
      style={{
        imageRendering: "pixelated",
        transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
        display: "block",
      }}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="0" width="8" height="2" fill="#1a0a00" />
      <rect x="1" y="1" width="10" height="2" fill="#1a0a00" />
      <rect x="1" y="2" width="10" height="6" fill="#f4c490" />
      {blinking ? (
        <>
          <rect x="3" y="5" width="2" height="1" fill="#1a0a00" />
          <rect x="7" y="5" width="2" height="1" fill="#1a0a00" />
        </>
      ) : (
        <>
          <rect x="3" y="4" width="2" height="2" fill="#1a0a00" />
          <rect x="7" y="4" width="2" height="2" fill="#1a0a00" />
          <rect x="3" y="4" width="1" height="1" fill="#4f6ef7" />
          <rect x="7" y="4" width="1" height="1" fill="#4f6ef7" />
        </>
      )}
      <rect x="4" y="7" width="4" height="1" fill="#c87850" />
      <rect x="0" y="3" width="1" height="3" fill="#f4c490" />
      <rect x="11" y="3" width="1" height="3" fill="#f4c490" />
      <rect x="4" y="8" width="4" height="1" fill="#f4c490" />
      <rect x="2" y="9" width="8" height="5" fill="#4f6ef7" />
      <rect x="4" y="9" width="4" height="1" fill="#3a5ae8" />
      <rect
        x="0"
        y={leftLegDown ? 10 : 9}
        width="2"
        height="4"
        fill="#4f6ef7"
      />
      <rect
        x="10"
        y={rightLegDown ? 10 : 9}
        width="2"
        height="4"
        fill="#4f6ef7"
      />
      <rect
        x="0"
        y={leftLegDown ? 14 : 13}
        width="2"
        height="1"
        fill="#f4c490"
      />
      <rect
        x="10"
        y={rightLegDown ? 14 : 13}
        width="2"
        height="1"
        fill="#f4c490"
      />
      <rect
        x="3"
        y={leftLegDown ? 15 : 14}
        width="2"
        height={leftLegDown ? 1 : 2}
        fill="#1a0a00"
      />
      <rect
        x="7"
        y={rightLegDown ? 15 : 14}
        width="2"
        height={rightLegDown ? 1 : 2}
        fill="#1a0a00"
      />
      <rect x="2" y="15" width="3" height="1" fill="#222" />
      <rect x="7" y="15" width="3" height="1" fill="#222" />
    </svg>
  );
}

export default function Mascot({ currentPage }) {
  const posX = 400;
  const [frame, setFrame] = useState(1);
  const [blinking, setBlinking] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [msgVisible, setMsgVisible] = useState(false);
  const [dropped, setDropped] = useState(false);

  const msgIdxRef = useRef(0);
  const scriptRef = useRef([]);

  // Drop animation on first mount
  useEffect(() => {
    const t = setTimeout(() => {
      setDropped(true);
      setTimeout(() => setMsgVisible(true), 600);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  // Update script on page change
  useEffect(() => {
    const script = PAGE_SCRIPTS[currentPage] || PAGE_SCRIPTS.home;
    scriptRef.current = script;
    msgIdxRef.current = 0;
    setMsgIdx(0);
    if (dropped) setMsgVisible(true);
  }, [currentPage]);

  // Auto rotate messages every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setMsgVisible(false);
      setTimeout(() => {
        const script = scriptRef.current;
        msgIdxRef.current = (msgIdxRef.current + 1) % script.length;
        setMsgIdx(msgIdxRef.current);
        setMsgVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Leg animation
  useEffect(() => {
    let f = 1;
    const iv = setInterval(() => {
      setFrame(f);
      f = f === 1 ? 2 : 1;
    }, 200);
    return () => clearInterval(iv);
  }, []);

  // Blink
  useEffect(() => {
    const iv = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const script = PAGE_SCRIPTS[currentPage] || PAGE_SCRIPTS.home;
  const message = script[msgIdx] || "";

  return (
    <>
      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bubbleOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.85) translateY(4px); }
        }
        @keyframes dropIn {
          0%   { transform: translateY(-120px); opacity: 0; }
          60%  { transform: translateY(10px);   opacity: 1; }
          75%  { transform: translateY(-8px); }
          88%  { transform: translateY(5px); }
          100% { transform: translateY(0);       opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "86px",
          left: 0,
          zIndex: 55,
          pointerEvents: "none",
          transform: `translateX(${posX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${CHAR_WIDTH}px`,
        }}>
        {/* Speech bubble */}
        <div
          style={{
            position: "relative",
            marginBottom: "8px",
            background: "#fff",
            border: "2.5px solid #0a0a0a",
            borderRadius: "10px",
            padding: "8px 12px",
            fontSize: "11px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            color: "#0a0a0a",
            boxShadow: "3px 3px 0 #0a0a0a",
            width: "170px",
            lineHeight: 1.55,
            whiteSpace: "normal",
            animation: msgVisible
              ? "bubbleIn 0.25s ease forwards"
              : "bubbleOut 0.25s ease forwards",
          }}>
          {message}
          {/* Tail */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid #0a0a0a",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-7px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "6px solid #fff",
            }}
          />
        </div>

        {/* Character */}
        <div
          style={{
            animation: dropped
              ? "none"
              : "dropIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
            opacity: dropped ? 1 : 0,
          }}>
          <PixelChar
            blinking={blinking}
            frame={dropped ? frame : 0}
            facingLeft={false}
          />
        </div>
      </div>
    </>
  );
}
