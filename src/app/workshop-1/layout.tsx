import type { ReactNode } from 'react';

export default function Workshop1Layout({ children }: { children: ReactNode }) {
  return (
    <>
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
