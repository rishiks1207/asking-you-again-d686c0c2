import { createFileRoute, Link } from "@tanstack/react-router";
import paperBg from "@/assets/paper-bg.jpg";
import { HeartRain } from "@/components/hearts";

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
      {/* bombardment of hearts */}
      <HeartRain count={70} symbol="♥" className="text-rose-deep/55" />
      <HeartRain count={28} symbol="❣" className="text-rose-deep/40" />

      <article
        className="deckle-edge relative z-10 mx-auto w-full max-w-2xl rounded-sm p-10 sm:p-14 shadow-[0_30px_60px_-20px_rgba(80,40,20,0.55),0_8px_20px_-10px_rgba(80,40,20,0.4)]"
        style={{
          backgroundImage: `url(${paperBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "oklch(0.88 0.05 70 / 0.85)",
          animation: "ink-fade 1.2s ease-out both",
          transform: "rotate(-0.35deg)",
          filter: "sepia(0.18) contrast(1.05)",
        }}
      >
        {/* faux postage stamp */}
        <div
          aria-hidden
          className="absolute -right-3 -top-3 hidden h-20 w-16 -rotate-6 items-center justify-center border border-dashed border-sepia/60 bg-cream/80 text-center text-[10px] uppercase tracking-widest text-sepia shadow-sm sm:flex"
          style={{ fontFamily: "var(--font-type)" }}
        >
          <span className="leading-tight">
            par<br/>avion<br/>♥
          </span>
        </div>

        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-sepia" style={{ fontFamily: "var(--font-type)" }}>
            A LETTER · est. always
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-sepia/50" />
        </header>

        <div className="space-y-5 text-lg leading-relaxed text-ink sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>
          <p className="text-3xl italic text-sepia" style={{ fontFamily: "var(--font-script)" }}>
            My dearest you,
          </p>
          <p>
            I've been turning the words over in my head for days, trying to find the right ones — and the truth is, no
            words feel big enough. So I'll just say it plainly: <em>I'm sorry.</em> I made a promise that i would'nt give up on us, no matter what happens.Thus here I am. I'm not gonna give up that easily. All the fights nd what not convo we had after breakup, was a cry of help. I was yearning for you. every convo, every text, and every interaction mattered to me.
          </p>
          <p className="whitespace-pre-line">
            I'm sorry for the moments I wasn't the person you deserved. For the silences I should have filled with kindness, and the small things I let slip away that were never small at all. You trusted me with something tender. well i cant't go back and fix everything, if i could i would've done so.{"\n"}
            If I could go back, I would. I'd hold the moment a little longer, listen a little closer, and tell you — properly — how much light you bring into my ordinary days.You make me wanna be a better person.{"\n"}
            Say I'm going crazy, but I need you more than food at night,{"\u00a0\n"}
            cuz{"\n\n\n\n\n"}
            I need you beside me like a flower needs the light;{"\n"}
            Be my last and only, let me hold you every night{"\u00a0\n\n"}
            Pleaseee can you think about it, we will keep it quite. if it works we'll hard launch, till then it should be between us. If it didn't work out well,{"\n"}
            we can forget about everything and move on, more importantly i'll move without annoyin u.
          </p>
          <div className="whitespace-pre-line">{"\n"}</div>
          <p className="whitespace-pre-line">
            I'm such a loser, swear to god I'm the worst{"\n"}
            I always fuck everything up it's a curse{"\n"}
            I promise you that i wont fuck this up again.{"\u00a0\n"}
            You don't owe me anything. Not your forgiveness, not your time. But I needed you to know that you are thought of, deeply, and that the place you took up in my heart hasn't moved an inch.
          </p>
          <p className="pt-2 text-right text-2xl italic text-sepia" style={{ fontFamily: "var(--font-script)" }}>
            — yours, still.
          </p>
        </div>

        {/* wax seal */}
        <div className="mt-10 flex items-center justify-center">
          <div
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-full text-2xl text-cream shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_-3px_8px_rgba(0,0,0,0.35),inset_0_3px_6px_rgba(255,255,255,0.15)]"
            style={{
              background: "radial-gradient(circle at 35% 30%, oklch(0.65 0.18 22), oklch(0.38 0.16 22) 70%)",
              transform: "rotate(-8deg)",
              fontFamily: "var(--font-script)",
            }}
          >
            ♥
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
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
