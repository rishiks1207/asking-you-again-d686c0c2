import { useEffect, useState } from "react";

type Burst = {
  id: number;
  x: number;
  y: number;
  kind: "love" | "broken";
};

let burstSeq = 0;

export function useHeartBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const fire = (x: number, y: number, kind: "love" | "broken" = "love") => {
    const id = ++burstSeq;
    setBursts((b) => [...b, { id, x, y, kind }]);
    setTimeout(() => {
      setBursts((b) => b.filter((it) => it.id !== id));
    }, 1600);
  };

  return { bursts, fire };
}

export function HeartBurstLayer({ bursts }: { bursts: Burst[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {bursts.map((b) => (
        <SingleBurst key={b.id} {...b} />
      ))}
    </div>
  );
}

function SingleBurst({ x, y, kind }: Burst) {
  const [count] = useState(() => 36);
  const symbol = kind === "broken" ? "💔" : "❤";
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 140 + Math.random() * 220;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rot = Math.random() * 720 - 360;
        const size = 18 + Math.random() * 28;
        const dur = 0.9 + Math.random() * 0.6;
        const endScale = 0.6 + Math.random() * 1.2;
        const color = kind === "broken" ? "oklch(0.45 0.08 50)" : "oklch(0.55 0.18 20)";
        return (
          <span
            key={i}
            style={{
              position: "fixed",
              left: x,
              top: y,
              fontSize: `${size}px`,
              color,
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
              animation: `heart-burst ${dur}s cubic-bezier(0.2, 0.7, 0.3, 1) forwards`,
              ["--tx" as never]: `${tx}px`,
              ["--ty" as never]: `${ty}px`,
              ["--rot" as never]: `${rot}deg`,
              ["--end-scale" as never]: `${endScale}`,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </>
  );
}

/** Drifting background hearts — bombard the page softly. */
export function HeartRain({
  count = 60,
  symbol = "♥",
  className = "text-rose-deep/55",
}: {
  count?: number;
  symbol?: string;
  className?: string;
}) {
  const [items] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      left: (i * 37 + Math.random() * 8) % 100,
      delay: (i * 0.45 + Math.random() * 2) % 14,
      duration: 9 + ((i * 1.3) % 9) + Math.random() * 2,
      size: 12 + ((i * 5) % 22) + Math.random() * 6,
    })),
  );

  useEffect(() => {}, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className={`absolute bottom-[-40px] ${className}`}
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animation: `float-heart ${it.duration}s linear ${it.delay}s infinite`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
