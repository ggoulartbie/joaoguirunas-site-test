import type { ReactNode } from 'react';

/**
 * Minimal layout for the Reveal.js presentation page.
 * Hides the root layout's Header/Footer and removes padding
 * so the presentation can render full-screen.
 */
export default function ApresentacaoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Override root layout styles: hide Header/Footer, remove main padding */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header, footer, .skip-link { display: none !important; }
            #main-content { padding-top: 0 !important; }
            body { overflow: hidden; }
          `,
        }}
      />
      {children}
    </>
  );
}
