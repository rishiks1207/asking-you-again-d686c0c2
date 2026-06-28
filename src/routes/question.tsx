import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeartBurstLayer, HeartRain, useHeartBurst } from "@/components/hearts";
import photo01Asset from "@/assets/user-photo-01.png.asset.json";
import photo02Asset from "@/assets/user-photo-02.png.asset.json";
import photo03Asset from "@/assets/user-photo-03.png.asset.json";
import photo04Asset from "@/assets/user-photo-04.png.asset.json";
import photo05Asset from "@/assets/user-photo-05.png.asset.json";
import photo06Asset from "@/assets/user-photo-06.png.asset.json";
import photo07Asset from "@/assets/user-photo-07.png.asset.json";
import photo08Asset from "@/assets/user-photo-08.png.asset.json";
import photo09Asset from "@/assets/user-photo-09.png.asset.json";
import photo10Asset from "@/assets/user-photo-10.png.asset.json";
import photo11Asset from "@/assets/user-photo-11.png.asset.json";
import photo12Asset from "@/assets/user-photo-12.png.asset.json";
import photo13Asset from "@/assets/user-photo-13.png.asset.json";
import photo14Asset from "@/assets/user-photo-14.png.asset.json";
import photo15Asset from "@/assets/user-photo-15.png.asset.json";
import photo16Asset from "@/assets/user-photo-16.png.asset.json";
import photo17Asset from "@/assets/user-photo-17.png.asset.json";
import photo18Asset from "@/assets/user-photo-18.png.asset.json";
import photo19Asset from "@/assets/user-photo-19.png.asset.json";
import photo20Asset from "@/assets/user-photo-20.png.asset.json";
import photo21Asset from "@/assets/user-photo-21.png.asset.json";
import photo22Asset from "@/assets/user-photo-22.png.asset.json";
import photo23Asset from "@/assets/user-photo-23.png.asset.json";
import photo24Asset from "@/assets/user-photo-24.png.asset.json";
import photo25Asset from "@/assets/user-photo-25.png.asset.json";
import photo26Asset from "@/assets/user-photo-26.png.asset.json";
import photo27Asset from "@/assets/user-photo-27.png.asset.json";
import photo28Asset from "@/assets/user-photo-28.png.asset.json";


export const Route = createFileRoute("/question")({
  head: () => ({
    meta: [
      { title: "One question for you" },
      { name: "description", content: "Just one little question." },
    ],
  }),
  component: QuestionPage,
});

const coupleFilms = [
  photo01Asset.url,
  photo02Asset.url,
  photo03Asset.url,
  photo04Asset.url,
  photo05Asset.url,
  photo06Asset.url,
  photo07Asset.url,
  photo08Asset.url,
  photo09Asset.url,
  photo10Asset.url,
  photo11Asset.url,
  photo12Asset.url,
  photo13Asset.url,
  photo14Asset.url,
  photo15Asset.url,
  photo16Asset.url,
  photo17Asset.url,
  photo18Asset.url,
  photo19Asset.url,
  photo20Asset.url,
  photo21Asset.url,
  photo23Asset.url,
  photo24Asset.url,
  photo27Asset.url,
];

const soloFilms = [
  photo22Asset.url,
  photo25Asset.url,
  photo26Asset.url,
  photo28Asset.url,
];

const films = (() => {
  const ordered: string[] = [];
  const blocks = Math.max(Math.ceil(coupleFilms.length / 3), Math.ceil(soloFilms.length / 2));

  for (let i = 0; i < blocks; i += 1) {
    ordered.push(...coupleFilms.slice(i * 3, i * 3 + 3));
    ordered.push(...soloFilms.slice(i * 2, i * 2 + 2));
  }

  return ordered;
})();

function FilmStrip({ reverse = false, speed = 60 }: { reverse?: boolean; speed?: number }) {
  const looped = [...films, ...films];

  return (
    <div className="relative h-44 overflow-hidden border-y-[14px] border-ink/90 bg-ink/95 sm:h-56">
      {/* sprocket holes */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[14px] -translate-y-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--cream) 0 4px, transparent 5px)",
          backgroundSize: "28px 14px",
          backgroundPosition: "center",
        }}
      />
      <div
        className="flex h-full w-max gap-4 px-4 will-change-transform"
        style={{
          animation: `${reverse ? "filmstrip-scroll-rev" : "filmstrip-scroll"} ${speed}s linear infinite`,
        }}
      >
        {looped.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-full aspect-square shrink-0 overflow-hidden border-2 border-cream/20 bg-cream/5"
            style={{ filter: "sepia(0.35) contrast(1.05) brightness(0.95)" }}
          >
            <img
              src={src}
              alt=""
              loading="eager"
              decoding="async"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


function QuestionPage() {
  const navigate = useNavigate();
  const { bursts, fire } = useHeartBurst();
  const [submitting, setSubmitting] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const DODGE_LIMIT = 50;
  const caught = dodgeCount >= DODGE_LIMIT;

  useEffect(() => {
    if (caught) return;
    const handler = (e: PointerEvent) => {
      const btn = noBtnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 110) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxX = Math.min(vw / 2 - r.width, 180);
        const maxY = Math.min(vh / 2 - r.height, 140);
        const nx = Math.max(-maxX, Math.min(maxX, noOffset.x + (Math.random() * 220 - 110) - dx * 0.6));
        const ny = Math.max(-maxY, Math.min(maxY, noOffset.y + (Math.random() * 160 - 80) - dy * 0.6));
        setNoOffset({ x: nx, y: ny });
        setDodgeCount((c) => c + 1);
      }
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [noOffset, caught]);

  const burstFromButton = (
    btn: HTMLButtonElement | null,
    kind: "love" | "broken",
    waves = 1,
  ) => {
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    for (let i = 0; i < waves; i += 1) {
      setTimeout(() => fire(x, y, kind), i * 140);
    }
  };

  const handleYes = async () => {
    if (submitting) return;
    setSubmitting(true);
    burstFromButton(yesBtnRef.current, "love", 4);
    try {
      await supabase.from("responses").insert({
        answer: "yes",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => setThanks(true), 650);
  };

  const CLICK_DODGE_LIMIT = 20;
  const [noClicks, setNoClicks] = useState(0);

  const handleNo = async () => {
    if (submitting) return;
    if (noClicks < CLICK_DODGE_LIMIT) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const r = noBtnRef.current?.getBoundingClientRect();
      const maxX = Math.min(vw / 2 - (r?.width ?? 160), 220);
      const maxY = Math.min(vh / 2 - (r?.height ?? 56), 180);
      setNoOffset({
        x: (Math.random() * 2 - 1) * maxX,
        y: (Math.random() * 2 - 1) * maxY,
      });
      setNoClicks((c) => c + 1);
      return;
    }
    setSubmitting(true);
    burstFromButton(noBtnRef.current, "broken", 3);
    try {
      await supabase.from("responses").insert({
        answer: "no",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => navigate({ to: "/manage" }), 900);
  };



  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-ink">
      {/* film strips background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-between py-8 opacity-70">
        <FilmStrip speed={55} />
        <FilmStrip reverse speed={75} />
        <FilmStrip speed={65} />
      </div>

      {/* warm overlay */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />

      {/* drifting hearts everywhere */}
      <HeartRain count={55} symbol="♥" className="text-rose/70" />

      {/* burst layer (fixed, above all) */}
      <HeartBurstLayer bursts={bursts} />


      {/* content */}
      <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div
          className="paper-grain rounded-sm border border-rose/30 bg-cream/95 p-8 sm:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          style={{ animation: "ink-fade 1s ease-out both" }}
        >
          <p
            className="mb-3 text-xs uppercase tracking-[0.4em] text-sepia"
            style={{ fontFamily: "var(--font-type)" }}
          >
            SO HERE'S THE MILLION DOLLAR QUESTION
          </p>

          {!thanks ? (
            <>
              <h1
                className="text-balance text-4xl leading-tight text-ink sm:text-5xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                do you mind dating me again?
              </h1>

              <p className="mt-6 text-xl italic text-rose-deep sm:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                I love youuuu!!!! so much
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <button
                  ref={yesBtnRef}
                  onClick={handleYes}
                  disabled={submitting}
                  className="group inline-flex min-w-[160px] items-center justify-center gap-2 rounded-full bg-rose-deep px-10 py-4 text-lg text-cream shadow-[0_6px_0_oklch(0.4_0.15_20)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_oklch(0.4_0.15_20)] disabled:opacity-50"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <span>Yes</span>
                  <span className="transition-transform group-hover:scale-125">♥</span>
                </button>

                <button
                  ref={noBtnRef}
                  onClick={handleNo}
                  disabled={submitting}
                  className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-sepia/60 bg-transparent px-10 py-4 text-lg text-sepia transition-transform duration-300 ease-out hover:bg-sepia/10 disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-serif)",
                    transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  }}
                >

                  No
                </button>
              </div>
            </>
          ) : (
            <div style={{ animation: "ink-fade 0.8s ease-out both" }}>
              <h1
                className="text-balance text-5xl leading-tight text-rose-deep sm:text-6xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                you said yes ♥
              </h1>
              <p className="mt-6 text-lg italic text-sepia whitespace-pre-line">
                you've just made me the happiest person alive.{"\n"}
                TEXTTTTT MEEE ASAPPP!!!!!
              </p>
              <div className="mt-8 text-3xl">🌹</div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
