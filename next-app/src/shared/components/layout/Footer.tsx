import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5"
              aria-label="Ir para pagina inicial do GrowthSales AI"
            >
              <Image
                src="/logo.svg"
                alt="Logo GrowthSales AI"
                width={40}
                height={40}
                className="h-8 sm:h-10 w-8 sm:w-10"
              />
              <span className="text-lg sm:text-xl text-white">
                <span className="font-extrabold">Growth</span>
                <span className="font-semibold text-[#FF4400]">Sales</span>
              </span>
            </Link>
            {/* [FIX A11Y-014] Aumentado de white/50 para white/60 para compliance AA */}
            <p className="mt-3 sm:mt-4 max-w-sm text-sm text-white/60 leading-relaxed">
              Multiplicando produtividade com agentes autonomos. Ferramentas open source
              para quem trabalha com IA.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5">
              <Image
                src="/images/claude-logo.png"
                alt="Logo Claude AI"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <Image
                src="/images/claude-code-logo.png"
                alt="Logo Claude Code"
                width={56}
                height={14}
                className="h-3.5 w-auto"
              />
              <span className="text-xs font-medium text-white/60">
                Built for Claude Code
              </span>
            </div>
          </div>

          {/* Ferramentas */}
          <nav aria-label="Links de ferramentas">
            <h4 className="text-sm font-semibold text-white mb-3 sm:mb-4">
              Ferramentas
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/framework/aiox-framework"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  AIOX Framework
                </Link>
              </li>
              <li>
                <Link
                  href="/monitor/aiox-monitor"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  AIOX Monitor
                </Link>
              </li>
              <li>
                <Link
                  href="/squads/xquads"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Xquads Squads
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/maestri"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Maestri
                </Link>
              </li>
            </ul>
          </nav>

          {/* Aprender */}
          <nav aria-label="Links de aprendizado">
            <h4 className="text-sm font-semibold text-white mb-3 sm:mb-4">Aprender</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/setup/claude-code"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Setup Claude Code
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/anthropic-courses"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cursos Anthropic
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/meta-ads-ai"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Meta Ads com IA
                </Link>
              </li>
              <li>
                <Link
                  href="/mentoria"
                  className="text-sm text-[#FF4400] hover:text-[#FF5C10] transition-colors font-medium"
                >
                  Mentoria
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* [FIX A11Y-014] Aumentado de white/45 para white/60 */}
          <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">
            &copy; {new Date().getFullYear()} GrowthSales AI. Todos os direitos
            reservados.
          </p>

          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Visitar GitHub da GrowthSales AI"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Visitar LinkedIn da GrowthSales AI"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Visitar Twitter/X da GrowthSales AI"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
