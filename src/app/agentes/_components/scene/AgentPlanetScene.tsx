'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { useMouseRef } from './use-scroll-progress';
import type { SquadId } from '@/data/agentes';

const SQUAD_CONFIG: Record<SquadId, {
  texture: string;
  tint: string;
  radius: number;
  rotationSpeed: number;
  axialTilt: number;
  atmosphere?: { color: string; size?: number };
  ring?: { innerRadius: number; outerRadius: number; color: string; opacity?: number };
}> = {
  dev: {
    texture: '/textures/planets/jupiter-4k.jpg',
    tint: '#9B7FFF',
    radius: 7,
    rotationSpeed: 0.04,
    axialTilt: 0.18,
    atmosphere: { color: '#A78BFA', size: 1.05 },
    ring: { innerRadius: 8.8, outerRadius: 12.5, color: '#A78BFA', opacity: 0.30 },
  },
  sites: {
    texture: '/textures/planets/mars-8k.jpg',
    tint: '#FF7A4D',
    radius: 6.5,
    rotationSpeed: 0.07,
    axialTilt: 0.25,
    atmosphere: { color: '#FF6B3D', size: 1.06 },
  },
  social: {
    texture: '/textures/planets/venus-8k.jpg',
    tint: '#FF8DC2',
    radius: 6.2,
    rotationSpeed: 0.04,
    axialTilt: 0.4,
    atmosphere: { color: '#EC4899', size: 1.08 },
  },
  traffic: {
    texture: '/textures/planets/neptune-clouds-4k.jpg',
    tint: '#7BE0E5',
    radius: 6.5,
    rotationSpeed: 0.06,
    axialTilt: 0.3,
    atmosphere: { color: '#06B6D4', size: 1.07 },
    ring: { innerRadius: 7.8, outerRadius: 9.4, color: '#06B6D4', opacity: 0.26 },
  },
};

function DarkBackground() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color('#02020a');
    return () => { scene.background = null; };
  }, [scene]);
  return null;
}

// Scroll-driven camera: planet recedes and drifts up as user scrolls past hero
function ScrollCamera({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const { camera } = useThree();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const baseZ = isMobile ? 30 : 24;
  const currentZ = useRef(baseZ);
  const currentY = useRef(0);

  useFrame(() => {
    const t = scrollRef.current ?? 0;
    const targetZ = baseZ + t * 20;
    const targetY = t * 6;
    currentZ.current += (targetZ - currentZ.current) * 0.05;
    currentY.current += (targetY - currentY.current) * 0.05;
    camera.position.set(0, currentY.current, currentZ.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface AgentPlanetSceneProps {
  squadId: SquadId;
}

export function AgentPlanetScene({ squadId }: AgentPlanetSceneProps) {
  const config = SQUAD_CONFIG[squadId];
  const { mouseRef, targetRef: mouseTargetRef } = useMouseRef();
  const dragRef = useRef(0);
  const scrollRef = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Smooth mouse
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

  // Track scroll progress 0..1
  useEffect(() => {
    const compute = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    return () => window.removeEventListener('scroll', compute);
  }, []);

  // Drag-to-rotate
  useEffect(() => {
    let dragging = false;
    let lastX = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchHorizontal = false;

    const onDown = (e: MouseEvent) => { dragging = true; lastX = e.clientX; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      dragRef.current += (e.clientX - lastX) * 0.008;
      lastX = e.clientX;
    };
    const onUp = () => { dragging = false; };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0]!;
      touchStartX = t.clientX; touchStartY = t.clientY;
      touchHorizontal = false;
      dragging = true; lastX = t.clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length !== 1) return;
      const t = e.touches[0]!;
      const dx = Math.abs(t.clientX - touchStartX);
      const dy = Math.abs(t.clientY - touchStartY);
      if (!touchHorizontal && (dx > 4 || dy > 4)) touchHorizontal = dx > dy;
      if (!touchHorizontal) { dragging = false; return; }
      e.preventDefault();
      dragRef.current += (t.clientX - lastX) * 0.008;
      lastX = t.clientX;
    };
    const onTouchEnd = () => { dragging = false; };

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
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, isMobile ? 30 : 24], fov: isMobile ? 50 : 42, near: 0.1, far: 500 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['#02020a']} />
      <fog attach="fog" args={['#02020a', 60, 280]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[30, 20, 20]} intensity={0.8} color="#FFE5C2" />
      <directionalLight position={[-20, -10, 20]} intensity={0.2} color={config.tint} />

      <Suspense fallback={null}>
        <DarkBackground />

        <Planet
          position={[0, 0, 0]}
          radius={config.radius}
          textureUrl={config.texture}
          tint={config.tint}
          rotationSpeed={config.rotationSpeed}
          axialTilt={config.axialTilt}
          atmosphere={config.atmosphere}
          ring={config.ring}
          mouseInfluence={0.18}
          mouseRef={mouseRef}
          dragRef={dragRef}
          segments={isMobile ? 64 : 96}
        />

        <Starfield count={isMobile ? 150 : 400} radius={280} mouseRef={mouseRef} />
      </Suspense>

      <ScrollCamera scrollRef={scrollRef} />
    </Canvas>
  );
}
