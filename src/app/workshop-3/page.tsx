import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { WORKSHOP_3_SLIDES } from './_components/slides';

export const metadata: Metadata = {
  title: 'Workshop 3 — Growth Sales',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const totalMin = WORKSHOP_3_SLIDES.reduce((acc, s) => acc + parseInt(s.duration, 10), 0);

export default function Workshop3IndexPage() {
  return (
    <main className="relative min-h-screen bg-[#050507] text-white">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 sm:py-20 md:py-28">

        <header className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/brand/growth/logo-header.png"
              alt="Growth Sales A.I."
              width={160}
              height={40}
              className="opacity-90"
            />
          </div>

          <span
            className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Evento · {totalMin} min · 9 slides
          </span>

          <h1
            className="text-4xl font-light italic leading-[1.05] md:text-6xl"
            style={{ fontFamily: SERIF }}
          >
            Negócio com{' '}
            <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: EMBER }}>
              IA
            </span>
            <br />
            começa onde?
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Deck do evento de encerramento. Empresário pra empresário — sem teatro.
          </p>
        </header>

        <section>
          <h2
            className="mb-5 font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.4)' }}
          >
            Slides · siga em ordem
          </h2>
          <ol className="flex flex-col gap-2">
            {WORKSHOP_3_SLIDES.map((slide) => (
              <li key={slide.slug}>
                <Link
                  href={slide.href}
                  className="group flex items-center justify-between gap-4 border px-6 py-5 transition-colors hover:border-[#FF3A0E]/40 hover:bg-white/[0.03]"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase flex-shrink-0 w-8"
                      style={{ fontFamily: MONO, color: EMBER }}
                    >
                      {String(slide.number).padStart(2, '0')}
                    </span>
                    <span
                      className="text-lg font-semibold text-white/80 transition-colors group-hover:text-white"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {slide.title}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] uppercase flex-shrink-0"
                    style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
                  >
                    {slide.duration}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14">
          <Link
            href={WORKSHOP_3_SLIDES[0]!.href}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-sm text-black transition-opacity hover:opacity-90"
            style={{ background: EMBER, fontFamily: DISPLAY }}
          >
            Começar apresentação
            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
