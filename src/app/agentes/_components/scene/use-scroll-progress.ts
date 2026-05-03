'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks the document scroll progress (0..1) without causing React re-renders.
 * Returns a ref that .current updates on every scroll/resize.
 */
export function useScrollProgress() {
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const compute = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const t = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      targetRef.current = t;
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return { progressRef, targetRef };
}

/**
 * Mouse normalized to (-1..1) on x and y, smoothed.
 */
export function useMouseRef() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return { mouseRef, targetRef };
}
