'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * Lateral camera path. The camera pans right along the X axis as the user scrolls,
 * passing each planet positioned along x = [0 (Dev), 50 (Sites), 100 (Social), 150 (Traffic)].
 *
 * Each keyframe = [scrollProgress, posX, posY, posZ, lookX, lookY, lookZ]
 *
 *   0.00  Hero — Dev planet visible (slightly distant, looking forward)
 *   0.10  Stats — drift, Dev coming closer
 *   0.20  Dev centered — cards animate in
 *   0.32  Sites entering (camera pans right)
 *   0.42  Sites centered
 *   0.55  Social entering
 *   0.65  Social centered
 *   0.78  Traffic entering
 *   0.88  Traffic centered
 *   1.00  CTA / pull back at traffic
 */
export const CAMERA_PATH: Array<[number, number, number, number, number, number, number]> = [
  [0.00, -15,  3, 38,    0,   0, 0],   // Hero — Dev planet visible to the right, distant
  [0.10,  -8,  2, 26,    0,   0, 0],   // Stats — coming in
  [0.20,   0,  2, 22,    0,   0, 0],   // Dev centered
  [0.32,  35,  2, 22,   50,   0, 0],   // Sites entering
  [0.42,  50,  2, 22,   50,   0, 0],   // Sites centered
  [0.55,  85,  2, 22,  100,   0, 0],   // Social entering
  [0.65, 100,  2, 22,  100,   0, 0],   // Social centered
  [0.78, 135,  2, 22,  150,   0, 0],   // Traffic entering
  [0.88, 150,  2, 22,  150,   0, 0],   // Traffic centered
  [1.00, 150, 10, 60,  150,   0, 0],   // CTA — pull back at traffic
];

// Mobile: portrait viewport is narrow → bring camera closer, FOV is wider (set on Canvas)
const CAMERA_PATH_MOBILE: Array<[number, number, number, number, number, number, number]> = [
  [0.00, -15,  3, 48,    0,   0, 0],
  [0.10,  -8,  2, 36,    0,   0, 0],
  [0.20,   0,  2, 30,    0,   0, 0],   // Dev centered — z=30 with FOV50 gives dramatic close-up
  [0.32,  35,  2, 30,   50,   0, 0],
  [0.42,  50,  2, 30,   50,   0, 0],
  [0.55,  85,  2, 30,  100,   0, 0],
  [0.65, 100,  2, 30,  100,   0, 0],
  [0.78, 135,  2, 30,  150,   0, 0],
  [0.88, 150,  2, 30,  150,   0, 0],
  [1.00, 150,  8, 75,  150,   0, 0],
];

interface CameraRigProps {
  progressRef: React.RefObject<number>;
  targetRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  mobile?: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function CameraRig({ progressRef, targetRef, mouseRef, mobile }: CameraRigProps) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3());
  const path = mobile ? CAMERA_PATH_MOBILE : CAMERA_PATH;

  useFrame((_, delta) => {
    progressRef.current += (targetRef.current - progressRef.current) * Math.min(1, delta * 5);
    const t = progressRef.current;

    let i = 0;
    for (let j = 1; j < path.length; j++) {
      const kf = path[j]!;
      if (kf[0] >= t) {
        i = j - 1;
        break;
      }
      if (j === path.length - 1) i = j - 1;
    }
    const a = path[i]!;
    const b = path[Math.min(i + 1, path.length - 1)]!;
    const range = b[0] - a[0];
    const localT = range > 0 ? Math.max(0, Math.min(1, (t - a[0]) / range)) : 0;
    const e = smoothstep(localT);

    // Subtle mouse parallax — keep it small so it doesn't break the lateral feel
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;
    const parallaxX = mx * 0.6;
    const parallaxY = my * 0.5;

    camera.position.set(
      lerp(a[1], b[1], e) + parallaxX,
      lerp(a[2], b[2], e) + parallaxY,
      lerp(a[3], b[3], e),
    );
    lookAt.current.set(
      lerp(a[4], b[4], e),
      lerp(a[5], b[5], e),
      lerp(a[6], b[6], e),
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}
