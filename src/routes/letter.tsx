import { createFileRoute, Link } from "@tanstack/react-router";
import paperBg from "@/assets/paper-bg.jpg";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "An apology — for you" },
      { name: "description", content: "An open letter, with all my heart." },
    ],
  }),
  component: LetterPage,
});

function LetterPage() {
  return (
    <main className="paper-grain vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 53) % 100;
          const delay = (i * 0.7) % 12;
          const duration = 9 + ((i * 1.3) % 8);
          const size = 14 + ((i * 7) % 18);
          return (
            <span
              key={i}
              className="absolute bottom-[-40px] text-rose-deep/60"
              style={{
                left: `${left}%`,
                fontSize: `${size}px`,
                animation: `float-heart ${duration}s linear ${delay}s infinite`,
              }}
            >
              ♥
            </span>
          );
        })}
      </div>
      <article
        className="relative z-10 mx-auto w-full max-w-2xl rounded-sm p-10 sm:p-14 shadow-[0_30px_60px_-20px_rgba(80,40,20,0.35),0_8px_20px_-10px_rgba(80,40,20,0.3)]"
        style={{
          backgroundImage: `url(${paperBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "ink-fade 1.2s ease-out both",
        }}
      >
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-sepia" style={{ fontFamily: "var(--font-type)" }}>
            an apology
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-sepia/50" />
        </header>

        <div className="space-y-5 text-lg leading-relaxed text-ink sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
          <p className="text-2xl italic" style={{ fontFamily: "var(--font-script)" }}>
            My dearest you,
          </p>
          <p>
            I've been turning the words over in my head for days, trying to find the right ones — and the truth is, no
            words feel big enough. So I'll just say it plainly: <em>I'm sorry.</em>
          </p>
          <p>
            I'm sorry for the moments I wasn't the person you deserved. For the silences I should have filled with
            kindness, and the small things I let slip away that were never small at all. You trusted me with something
            tender, and I want you to know I see how much that meant.
          </p>
          <p>
            If I could go back, I would. I'd hold the moment a little longer, listen a little closer, and tell you —
            properly — how much light you bring into my ordinary days.
          </p>
          <p>
            You don't owe me anything. Not your forgiveness, not your time. But I needed you to know that you are
            thought of, deeply, and that the place you took up in my heart hasn't moved an inch.
          </p>
          <p className="pt-2 text-right italic text-sepia" style={{ fontFamily: "var(--font-script)" }}>
            — yours, still.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm text-sepia underline-offset-4 hover:underline"
            style={{ fontFamily: "var(--font-type)" }}
          >
            ← back
          </Link>
          <Link
            to="/question"
            className="group inline-flex items-center gap-3 rounded-full border border-rose-deep/60 bg-cream/70 px-7 py-3 text-base text-ink shadow-[0_2px_0_var(--rose-deep)] transition-all hover:translate-y-[1px] hover:bg-rose/30 hover:shadow-none"
          >
            <span>next</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
