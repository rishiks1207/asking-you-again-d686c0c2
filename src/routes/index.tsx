import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You — a little something" },
      { name: "description", content: "There's something I want to tell you." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="paper-grain vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* floating hearts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-rose-deep"
            style={{
              left: `${(i * 13 + 7) % 95}%`,
              bottom: `-${20 + (i % 3) * 10}px`,
              fontSize: `${14 + (i % 4) * 6}px`,
              opacity: 0.45,
              animation: `float-heart ${14 + i * 1.8}s linear ${i * 1.4}s infinite`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <div
        className="relative z-10 mx-auto max-w-2xl"
        style={{ animation: "ink-fade 1.4s ease-out both" }}
      >
        <p
          className="mb-6 text-sm uppercase tracking-[0.4em] text-sepia"
          style={{ fontFamily: "var(--font-type)" }}
        >
          ✦  a letter, in three parts  ✦
        </p>

        <h1
          className="text-balance text-5xl leading-tight text-ink sm:text-7xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          I want to tell you something
        </h1>

        <div className="mx-auto my-10 h-px w-24 bg-sepia/60" />

        <p className="mb-12 text-lg italic text-sepia sm:text-xl">
          …if you'll give me a moment of your time.
        </p>

        <Link
          to="/letter"
          className="group inline-flex items-center gap-3 rounded-full border border-rose-deep/60 bg-cream/60 px-8 py-3 text-base tracking-wide text-ink shadow-[0_2px_0_var(--rose-deep)] transition-all hover:translate-y-[1px] hover:bg-rose/30 hover:shadow-none"
        >
          <span style={{ fontFamily: "var(--font-serif)" }}>turn the page</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 text-center text-xs text-sepia/70" style={{ fontFamily: "var(--font-type)" }}>
        with all my heart  ·  est. today
      </footer>
    </main>
  );
}
