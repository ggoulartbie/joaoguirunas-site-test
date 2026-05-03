'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';

interface PlanetProps {
  position: [number, number, number];
  radius: number;
  textureUrl: string;
  /** Tint color blended over the texture (multiplicative). */
  tint?: string;
  /** Self rotation speed (radians/sec). */
  rotationSpeed?: number;
  /** Axial tilt (radians). */
  axialTilt?: number;
  /** Optional ring (Saturn-like). */
  ring?: { innerRadius: number; outerRadius: number; color: string; opacity?: number };
  /** Subtle atmosphere glow. */
  atmosphere?: { color: string; size?: number };
  /** Mouse-driven tilt amount (0..1). Mouse pulls the planet rotation slightly. */
  mouseInfluence?: number;
  /** Reference shared via parent for mouse value. */
  mouseRef?: React.RefObject<{ x: number; y: number }>;
  /** Drag rotation delta written by DragController each frame, consumed and reset here. */
  dragRef?: React.MutableRefObject<number>;
}

export function Planet({
  position,
  radius,
  textureUrl,
  tint = '#ffffff',
  rotationSpeed = 0.05,
  axialTilt = 0.2,
  ring,
  atmosphere,
  mouseInfluence = 0.15,
  mouseRef,
  dragRef,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
      if (dragRef && dragRef.current !== 0) {
        meshRef.current.rotation.y += dragRef.current;
        dragRef.current = 0;
      }
    }
    if (groupRef.current && mouseRef?.current) {
      const targetX = axialTilt + mouseRef.current.y * mouseInfluence;
      const targetZ = mouseRef.current.x * mouseInfluence * 0.5;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[axialTilt, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          map={texture}
          color={tint}
          roughness={0.62}
          metalness={0.0}
          emissive={tint}
          emissiveIntensity={0.025}
        />
      </mesh>

      {atmosphere && (
        <mesh>
          <sphereGeometry args={[radius * (atmosphere.size ?? 1.06), 32, 32]} />
          <meshBasicMaterial color={atmosphere.color} transparent opacity={0.18} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
        </mesh>
      )}

      {ring && (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[ring.innerRadius, ring.outerRadius, 96]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity ?? 0.45} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
