import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeartBurstLayer, HeartRain, useHeartBurst } from "@/components/hearts";

// Photos now live as real files in /public/photos and are referenced by
// root-relative path. This avoids the Lovable "lazy asset" pointer files
// (*.png.asset.json) which only resolve inside Lovable's own preview/hosting
// and 404 when the raw repo is built and served elsewhere (e.g. Vercel).
const photoPath = (n: number) => `/photos/user-photo-${String(n).padStart(2, "0")}.jpg`;


export const Route = createFileRoute("/question")({
  head: () => ({
    meta: [
      { title: "One question for you" },
      { name: "description", content: "Just one little question." },
    ],
  }),
  component: QuestionPage,
});

// Total number of photos in /public/photos, named user-photo-01.jpg ... user-photo-NN.jpg
const PHOTO_COUNT = 26;

const films = Array.from({ length: PHOTO_COUNT }, (_, i) => photoPath(i + 1));

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
