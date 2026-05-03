'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { CameraRig } from './CameraRig';
import { useScrollProgress, useMouseRef } from './use-scroll-progress';

const TEX = {
  jupiter: '/textures/planets/jupiter.jpg',
  mars: '/textures/planets/mars.jpg',
  venus: '/textures/planets/venus.jpg',
  neptune: '/textures/planets/neptune.jpg',
};

/**
 * Lateral choreography: 4 planets aligned on X axis. Camera pans right with scroll.
 * Each planet enters from right → centers → exits to left as camera passes.
 */
export const PLANET_X = {
  dev: 0,
  sites: 50,
  social: 100,
  traffic: 150,
};

export function SolarSystemScene() {
  const { progressRef, targetRef } = useScrollProgress();
  const { mouseRef, targetRef: mouseTargetRef } = useMouseRef();

  // Smooth mouse — runs in main thread once
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.06;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef, mouseTargetRef]);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 3, 45], fov: 38, near: 0.1, far: 700 }}
      dpr={[1, 2]}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['#02020a']} />
      <fog attach="fog" args={['#02020a', 70, 320]} />

      {/* Lights */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[80, 40, 30]} intensity={0.7} color="#FFE5C2" />
      <directionalLight position={[-40, -20, 40]} intensity={0.25} color="#A78BFA" />

      <Suspense fallback={null}>
        {/* Dev — violet gas giant @ x=0 (first squad) */}
        <Planet
          position={[PLANET_X.dev, 0, 0]}
          radius={6.5}
          textureUrl={TEX.jupiter}
          tint="#9B7FFF"
          rotationSpeed={0.04}
          axialTilt={0.18}
          atmosphere={{ color: '#A78BFA', size: 1.05 }}
          ring={{ innerRadius: 8.2, outerRadius: 11.5, color: '#A78BFA', opacity: 0.32 }}
          mouseInfluence={0.18}
          mouseRef={mouseRef}
        />

        {/* Sites — ember rocky @ x=100 */}
        <Planet
          position={[PLANET_X.sites, 0, 0]}
          radius={5.8}
          textureUrl={TEX.mars}
          tint="#FF7A4D"
          rotationSpeed={0.07}
          axialTilt={0.25}
          atmosphere={{ color: '#FF6B3D', size: 1.06 }}
          mouseInfluence={0.20}
          mouseRef={mouseRef}
        />

        {/* Social — pink venus @ x=150 */}
        <Planet
          position={[PLANET_X.social, 0, 0]}
          radius={5.2}
          textureUrl={TEX.venus}
          tint="#FF8DC2"
          rotationSpeed={0.04}
          axialTilt={0.4}
          atmosphere={{ color: '#EC4899', size: 1.08 }}
          mouseInfluence={0.16}
          mouseRef={mouseRef}
        />

        {/* Traffic — cyan neptune @ x=200 */}
        <Planet
          position={[PLANET_X.traffic, 0, 0]}
          radius={5.5}
          textureUrl={TEX.neptune}
          tint="#7BE0E5"
          rotationSpeed={0.06}
          axialTilt={0.3}
          atmosphere={{ color: '#06B6D4', size: 1.07 }}
          ring={{ innerRadius: 7.2, outerRadius: 8.6, color: '#06B6D4', opacity: 0.28 }}
          mouseInfluence={0.22}
          mouseRef={mouseRef}
        />

        {/* Background stars */}
        <Starfield count={5500} radius={320} mouseRef={mouseRef} />
      </Suspense>

      <CameraRig progressRef={progressRef} targetRef={targetRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
