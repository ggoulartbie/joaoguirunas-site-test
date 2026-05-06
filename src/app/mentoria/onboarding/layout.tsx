import type { ReactNode } from 'react';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header, footer, .skip-link { display: none !important; }
            #main-content { padding-top: 0 !important; }
          `,
        }}
      />
      {children}
    </>
  );
}
