'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { CameraRig } from './CameraRig';
import { useScrollProgress, useMouseRef } from './use-scroll-progress';

interface PlanetTarget {
  x: number;
  radius: number;
  dragRef: React.MutableRefObject<number>;
}

function DragController({ planets }: { planets: PlanetTarget[] }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const ray = new THREE.Raycaster();
    let dragging = false;
    let lastX = 0;
    let activeRef: React.MutableRefObject<number> | null = null;

    const getActiveRef = (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
      for (const { x, radius, dragRef } of planets) {
        const sphere = new THREE.Sphere(new THREE.Vector3(x, 0, 0), radius * 1.2);
        if (ray.ray.intersectsSphere(sphere)) return dragRef;
      }
      return null;
    };

    const onDown = (e: MouseEvent) => {
      const hit = getActiveRef(e.clientX, e.clientY);
      if (!hit) return;
      dragging = true;
      lastX = e.clientX;
      activeRef = hit;
    };

    const onMove = (e: MouseEvent) => {
      if (!dragging || !activeRef) return;
      activeRef.current += (e.clientX - lastX) * 0.008;
      lastX = e.clientX;
    };

    const onUp = () => { dragging = false; activeRef = null; };

    // Touch support — only intercept horizontal drags on planets
    let touchStartX = 0;
    let touchStartY = 0;
    let touchIsHorizontal = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0]!;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchIsHorizontal = false;
      const hit = getActiveRef(t.clientX, t.clientY);
      if (!hit) return;
      dragging = true;
      lastX = t.clientX;
      activeRef = hit;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || !activeRef || e.touches.length !== 1) return;
      const t = e.touches[0]!;
      const dx = Math.abs(t.clientX - touchStartX);
      const dy = Math.abs(t.clientY - touchStartY);
      if (!touchIsHorizontal && (dx > 4 || dy > 4)) touchIsHorizontal = dx > dy;
      if (!touchIsHorizontal) { dragging = false; activeRef = null; return; }
      e.preventDefault();
      activeRef.current += (t.clientX - lastX) * 0.008;
      lastX = t.clientX;
    };

    const onTouchEnd = () => { dragging = false; activeRef = null; };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [camera, gl, planets]);

  return null;
}

const TEX = {
  jupiter: '/textures/planets/jupiter-4k.jpg',  // 4096×2048 (solarsystemscope max)
  mars: '/textures/planets/mars-8k.jpg',         // 8192×4096
  venus: '/textures/planets/venus-8k.jpg',       // 8192×4096
  neptune: '/textures/planets/neptune-clouds-4k.jpg', // 4096×2048 cloud swirl tinted cyan
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

function DarkBackground() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color('#02020a');
    return () => { scene.background = null; };
  }, [scene]);
  return null;
}

export function SolarSystemScene() {
  const { progressRef, targetRef } = useScrollProgress();
  const { mouseRef, targetRef: mouseTargetRef } = useMouseRef();

  // Read once at mount — canvas props can't change after mount anyway
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const segments = isMobile ? 64 : 96;

  const devDrag = useRef(0);
  const sitesDrag = useRef(0);
  const socialDrag = useRef(0);
  const trafficDrag = useRef(0);

  const dragPlanets: PlanetTarget[] = [
    { x: PLANET_X.dev,     radius: 6.5, dragRef: devDrag },
    { x: PLANET_X.sites,   radius: 5.8, dragRef: sitesDrag },
    { x: PLANET_X.social,  radius: 5.2, dragRef: socialDrag },
    { x: PLANET_X.traffic, radius: 5.5, dragRef: trafficDrag },
  ];

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
      gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' }}
      camera={{ position: [0, 3, 45], fov: isMobile ? 50 : 38, near: 0.1, far: 700 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['#02020a']} />
      <fog attach="fog" args={['#02020a', 70, 320]} />

      {/* Lights */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[80, 40, 30]} intensity={0.7} color="#FFE5C2" />
      <directionalLight position={[-40, -20, 40]} intensity={0.25} color="#A78BFA" />

      <Suspense fallback={null}>
        <DragController planets={dragPlanets} />
        <DarkBackground />

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
          dragRef={devDrag}
          segments={segments}
        />

        {/* Sites — ember rocky @ x=50 */}
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
          dragRef={sitesDrag}
          segments={segments}
        />

        {/* Social — pink venus @ x=100 */}
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
          dragRef={socialDrag}
          segments={segments}
        />

        {/* Traffic — cyan neptune @ x=150 */}
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
          dragRef={trafficDrag}
          segments={segments}
        />

        {/* Background stars */}
        <Starfield count={isMobile ? 600 : 1400} radius={320} mouseRef={mouseRef} />
      </Suspense>

      <CameraRig progressRef={progressRef} targetRef={targetRef} mouseRef={mouseRef} mobile={isMobile} />
    </Canvas>
  );
}
