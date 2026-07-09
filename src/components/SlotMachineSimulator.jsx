import { useState } from "react";

const SYMBOLS = [
  { key: "cherry", icon: "🍒", payout: 2 },
  { key: "lemon", icon: "🍋", payout: 3 },
  { key: "bell", icon: "🔔", payout: 5 },
  { key: "diamond", icon: "💎", payout: 10 },
  { key: "seven", icon: "7️⃣", payout: 20 },
];

const BET = 10000;
const START_BALANCE = 100000;
const DEFAULT_WIN_CHANCE = 2; // %
const DEFAULT_NEAR_MISS = 55; // %

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/* Mode "fair": tiap reel independen, murni acak. Masih ada house edge
   matematis bawaan (itu memang cara kerja semua mesin slot), tapi
   gak ada manipulasi tambahan di luar itu. Admin gak bisa ngatur ini. */
function spinFair() {
  return [randomSymbol(), randomSymbol(), randomSymbol()];
}

/* Mode "judol": pakai dua angka yang "admin" atur lewat slider.
   - winChance: peluang beneran dapat 3 simbol sama.
   - nearMissChance: porsi hasil yang sengaja dipaksa "2 sama, 1 beda"
     biar kerasa hampir menang, meski hasilnya tetap kalah. */
function spinRigged(winChance, nearMissChance) {
  const roll = Math.random();

  if (roll < winChance) {
    const s = randomSymbol();
    return [s, s, s];
  }

  if (roll < winChance + nearMissChance) {
    const temptingPool = SYMBOLS.slice(2); // bell, diamond, seven
    const s = temptingPool[Math.floor(Math.random() * temptingPool.length)];
    let other = randomSymbol();
    while (other.key === s.key) other = randomSymbol();
    const missSlot = Math.floor(Math.random() * 3);
    const reels = [s, s, s];
    reels[missSlot] = other;
    return reels;
  }

  let a = randomSymbol();
  let b = randomSymbol();
  while (b.key === a.key) b = randomSymbol();
  let c = randomSymbol();
  while (c.key === a.key || c.key === b.key) c = randomSymbol();
  return [a, b, c];
}

function playOneRound(mode, winChance, nearMissChance) {
  const result =
    mode === "fair" ? spinFair() : spinRigged(winChance / 100, nearMissChance / 100);
  const isWin = result[0].key === result[1].key && result[1].key === result[2].key;
  const winAmount = isWin ? BET * result[0].payout : 0;
  return { result, isWin, winAmount, netDelta: winAmount - BET };
}

export default function SlotMachineSimulator() {
  const [mode, setMode] = useState("fair");
  const [viewAsAdmin, setViewAsAdmin] = useState(false);
  const [winChance, setWinChance] = useState(DEFAULT_WIN_CHANCE);
  const [nearMissChance, setNearMissChance] = useState(DEFAULT_NEAR_MISS);

  const [balance, setBalance] = useState(START_BALANCE);
  const [reels, setReels] = useState([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);
  const [spinning, setSpinning] = useState(false);
  const [stats, setStats] = useState({ spins: 0, wagered: 0, won: 0 });
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const fmt = (n) => "Rp" + n.toLocaleString("id-ID");

  function applyRound(round) {
    setReels(round.result);
    setBalance((b) => b - BET + round.winAmount);
    setStats((s) => ({
      spins: s.spins + 1,
      wagered: s.wagered + BET,
      won: s.won + round.winAmount,
    }));
    setHistory((h) => [...h.slice(-19), { win: round.isWin, netDelta: round.netDelta }]);
    setLastResult(round.isWin ? "win" : "lose");
  }

  function spin() {
    if (spinning || balance < BET) return;
    setSpinning(true);
    setLastResult(null);
    setTimeout(() => {
      applyRound(playOneRound(mode, winChance, nearMissChance));
      setSpinning(false);
    }, 450);
  }

  function autoSimulate(n) {
    if (spinning) return;
    let bal = balance;
    let localStats = { ...stats };
    let localHistory = [...history];
    let lastRound = null;
    for (let i = 0; i < n && bal >= BET; i++) {
      const round = playOneRound(mode, winChance, nearMissChance);
      bal = bal - BET + round.winAmount;
      localStats = {
        spins: localStats.spins + 1,
        wagered: localStats.wagered + BET,
        won: localStats.won + round.winAmount,
      };
      localHistory = [...localHistory.slice(-19), { win: round.isWin, netDelta: round.netDelta }];
      lastRound = round;
    }
    setBalance(bal);
    setStats(localStats);
    setHistory(localHistory);
    if (lastRound) {
      setReels(lastRound.result);
      setLastResult(lastRound.isWin ? "win" : "lose");
    }
  }

  function reset() {
    setBalance(START_BALANCE);
    setStats({ spins: 0, wagered: 0, won: 0 });
    setHistory([]);
    setLastResult(null);
    setReels([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);
  }

  const net = stats.won - stats.wagered;
  const rtp = stats.wagered > 0 ? ((stats.won / stats.wagered) * 100).toFixed(1) : "—";

  return (
    <div
      style={{
        border: "2.5px solid #0a0a0a",
        borderRadius: "12px",
        padding: "1.2rem",
        background: "#fafbff",
        boxShadow: "5px 5px 0 #0a0a0a",
        margin: "1.4rem 0",
      }}>
      <style>{`
        .slotsim-btn { font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 14px; border: 2px solid #0a0a0a; border-radius: 8px; cursor: pointer; background: #fff; transition: transform .1s; }
        .slotsim-btn:active { transform: translateY(1px); }
        .slotsim-btn.active { background: #4f6ef7; color: #fff; }
        .slotsim-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .slotsim-reel { font-size: 34px; width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; background: #fff; border: 2px solid #0a0a0a; border-radius: 8px; }
        .slotsim-slider { width: 100%; accent-color: #c23b3b; }
      `}</style>

      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#888",
          marginBottom: "10px",
        }}>
        // Simulasi — Uang Virtual, Bukan Beneran
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        <button
          className={`slotsim-btn${mode === "fair" ? " active" : ""}`}
          onClick={() => {
            setMode("fair");
            reset();
          }}>
          Fair (RNG asli)
        </button>
        <button
          className={`slotsim-btn${mode === "rigged" ? " active" : ""}`}
          onClick={() => {
            setMode("rigged");
            reset();
          }}>
          Judol (RNG diatur)
        </button>
        {mode === "rigged" && (
          <button
            className={`slotsim-btn${viewAsAdmin ? " active" : ""}`}
            onClick={() => setViewAsAdmin((v) => !v)}
            style={{ marginLeft: "auto", background: viewAsAdmin ? "#c23b3b" : "#fff", color: viewAsAdmin ? "#fff" : "#0a0a0a", borderColor: "#c23b3b" }}>
            🔧 Panel Admin
          </button>
        )}
      </div>

      {mode === "rigged" && viewAsAdmin && (
        <div
          style={{
            border: "2px dashed #c23b3b",
            borderRadius: "8px",
            padding: "12px 14px",
            marginBottom: "14px",
            background: "#fff5f5",
          }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              fontWeight: 700,
              color: "#c23b3b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px",
            }}>
            Ini yang bisa diatur admin/operator, gak kelihatan sama pemain
          </p>

          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
              <span>Peluang menang asli</span>
              <strong>{winChance}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={winChance}
              onChange={(e) => setWinChance(Number(e.target.value))}
              className="slotsim-slider"
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
              <span>Frekuensi "hampir menang" (near-miss)</span>
              <strong>{nearMissChance}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={nearMissChance}
              onChange={(e) => setNearMissChance(Number(e.target.value))}
              className="slotsim-slider"
            />
          </div>

          <p style={{ fontSize: "10px", color: "#a35050", marginTop: "10px", marginBottom: 0, lineHeight: 1.5 }}>
            Di situs judol asli, dua angka ini biasanya cuma baris config di
            server, bisa diubah kapan aja tanpa pemain tahu, misalnya diturunkan
            begitu ada pemain yang lagi "kebanyakan menang".
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
        {reels.map((s, i) => (
          <div className="slotsim-reel" key={i}>
            {s.icon}
          </div>
        ))}
        {lastResult && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              color: lastResult === "win" ? "#1a8f4c" : "#c23b3b",
              marginLeft: "4px",
            }}>
            {lastResult === "win" ? "MENANG!" : "kalah"}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        <button
          className="slotsim-btn"
          onClick={spin}
          disabled={spinning || balance < BET}
          style={{ background: "#0a0a0a", color: "#fff" }}>
          {spinning ? "Muter..." : `Spin (${fmt(BET)})`}
        </button>
        <button
          className="slotsim-btn"
          onClick={() => autoSimulate(50)}
          disabled={spinning || balance < BET}>
          Simulasi cepat 50x
        </button>
        <button className="slotsim-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "8px",
          marginBottom: "12px",
        }}>
        {[
          ["Saldo", fmt(balance)],
          ["Spin", stats.spins],
          ["Net", (net >= 0 ? "+" : "") + fmt(net)],
          ["RTP", rtp === "—" ? "—" : rtp + "%"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1.5px solid #0a0a0a",
              borderRadius: "8px",
              padding: "6px 8px",
            }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                color: "#aaa",
                textTransform: "uppercase",
              }}>
              {label}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color:
                  label === "Net"
                    ? net >= 0
                      ? "#1a8f4c"
                      : "#c23b3b"
                    : "#0a0a0a",
              }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "3px",
            height: "40px",
          }}>
          {history.map((h, i) => (
            <div
              key={i}
              title={(h.netDelta >= 0 ? "+" : "") + fmt(h.netDelta)}
              style={{
                flex: 1,
                height: `${Math.min(100, Math.abs(h.netDelta) / (BET * 20) * 100 + 15)}%`,
                background: h.win ? "#1a8f4c" : "#f0b8b8",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
      )}

      <p
        style={{
          fontSize: "11px",
          color: "#999",
          marginTop: "12px",
          marginBottom: 0,
          lineHeight: 1.6,
        }}>
        Saldo dan taruhan di atas cuma angka virtual buat simulasi ini, bukan uang
        sungguhan. Di mode "Judol", buka Panel Admin, coba turunin "peluang
        menang asli" ke 0-1% lalu pakai "Simulasi cepat 50x" — perhatikan RTP-nya
        anjlok drastis padahal dari sisi pemain, tampilannya tetap kelihatan
        "cuma lagi apes".
      </p>
    </div>
  );
}