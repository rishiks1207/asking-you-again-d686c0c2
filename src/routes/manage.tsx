import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/manage")({
  head: () => ({
    meta: [
      { title: "It's alright" },
      { name: "description", content: "It's alright, I'll manage." },
    ],
  }),
  component: ManagePage,
});

function ManagePage() {
  return (
    <main className="paper-grain vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* drifting broken hearts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => {
          const left = (i * 41) % 100;
          const delay = (i * 0.6) % 10;
          const duration = 11 + ((i * 1.7) % 9);
          const size = 16 + ((i * 5) % 16);
          return (
            <span
              key={i}
              className="absolute bottom-[-40px] text-sepia/50"
              style={{
                left: `${left}%`,
                fontSize: `${size}px`,
                animation: `float-heart ${duration}s linear ${delay}s infinite`,
              }}
            >
              💔
            </span>
          );
        })}
      </div>

      <article
        className="relative z-10 mx-auto w-full max-w-xl rounded-sm border border-sepia/30 bg-cream/95 p-10 sm:p-14 shadow-[0_30px_60px_-20px_rgba(80,40,20,0.45)]"
        style={{ animation: "ink-fade 1s ease-out both", transform: "rotate(-0.6deg)" }}
      >
        <p
          className="mb-4 text-xs uppercase tracking-[0.4em] text-sepia"
          style={{ fontFamily: "var(--font-type)" }}
        >
          A NOTE BACK
        </p>
        <div className="mx-auto mb-8 h-px w-16 bg-sepia/50" />

        <h1
          className="text-balance text-4xl leading-tight text-ink sm:text-5xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          It's alright, I'll manage.
        </h1>

        <p
          className="mt-8 text-xl italic text-rose-deep sm:text-2xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          still, text me asap.
        </p>

        <p className="mt-8 text-sm text-sepia" style={{ fontFamily: "var(--font-type)" }}>
          — yours, still.
        </p>

        <div className="mt-10">
          <Link
            to="/letter"
            className="text-sm text-sepia underline-offset-4 hover:underline"
            style={{ fontFamily: "var(--font-type)" }}
          >
            ← read the letter again
          </Link>
        </div>
      </article>
    </main>
  );
}
