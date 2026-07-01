'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { Planet } from '@/app/agentes/_components/scene/Planet'
import { Starfield } from '@/app/agentes/_components/scene/Starfield'
import { useScrollProgress, useMouseRef } from '@/app/agentes/_components/scene/use-scroll-progress'

// [progress, posX, posY, posZ, lookX, lookY, lookZ]
const CAMERA_PATH: Array<[number, number, number, number, number, number, number]> = [
  [0.00, -12,  2, 38,    0,  0, 0],
  [0.15,  -4,  2, 28,    0,  0, 0],
  [0.30,   0,  2, 22,    0,  0, 0],
  [0.55,  30,  2, 22,   40,  0, 0],
  [0.75,  40,  2, 22,   40,  0, 0],
  [1.00,  52,  2, 22,   46,  0, 0],
]

const CAMERA_PATH_MOBILE: Array<[number, number, number, number, number, number, number]> = [
  [0.00, -10,  2, 52,    0,  0, 0],
  [0.15,  -3,  2, 40,    0,  0, 0],
  [0.30,   0,  2, 36,    0,  0, 0],
  [0.55,  30,  2, 36,   40,  0, 0],
  [0.75,  40,  2, 36,   40,  0, 0],
  [1.00,  52,  2, 36,   46,  0, 0],
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function smoothstep(t: number) { return t * t * (3 - 2 * t) }

function HubCameraRig({ progressRef, targetRef, mouseRef, mobile }: {
  progressRef: React.RefObject<number>
  targetRef: React.RefObject<number>
  mouseRef: React.RefObject<{ x: number; y: number }>
  mobile: boolean
}) {
  const { camera } = useThree()
  const lookAt = useRef(new THREE.Vector3())
  const path = mobile ? CAMERA_PATH_MOBILE : CAMERA_PATH

  useFrame((_, delta) => {
    progressRef.current += (targetRef.current - progressRef.current) * Math.min(1, delta * 3)
    const t = progressRef.current
    let i = 0
    for (let j = 1; j < path.length; j++) {
      if ((path[j]![0] ?? 0) >= t) { i = j - 1; break }
      if (j === path.length - 1) i = j - 1
    }
    const a = path[i]!
    const b = path[Math.min(i + 1, path.length - 1)]!
    const range = b[0] - a[0]
    const localT = range > 0 ? Math.max(0, Math.min(1, (t - a[0]) / range)) : 0
    const e = smoothstep(localT)
    const mx = mouseRef.current?.x ?? 0
    const my = mouseRef.current?.y ?? 0
    camera.position.set(lerp(a[1], b[1], e) + mx * 0.5, lerp(a[2], b[2], e) + my * 0.4, lerp(a[3], b[3], e))
    lookAt.current.set(lerp(a[4], b[4], e), lerp(a[5], b[5], e), lerp(a[6], b[6], e))
    camera.lookAt(lookAt.current)
  })
  return null
}

function DarkBackground() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#02020a')
    return () => { scene.background = null }
  }, [scene])
  return null
}

export function CourseHubScene() {
  const { progressRef, targetRef } = useScrollProgress()
  const { mouseRef, targetRef: mouseTargetRef } = useMouseRef()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const segments = isMobile ? 64 : 96

  const devDrag = useRef(0)
  const sitesDrag = useRef(0)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.05
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mouseRef, mouseTargetRef])

  return (
    <Canvas
      gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' }}
      camera={{ position: [0, 3, 45], fov: isMobile ? 50 : 38, near: 0.1, far: 500 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <color attach="background" args={['#02020a']} />
      <fog attach="fog" args={['#02020a', 60, 250]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[60, 40, 30]} intensity={0.7} color="#FFE5C2" />
      <directionalLight position={[-30, -20, 40]} intensity={0.25} color="#A78BFA" />

      <Suspense fallback={null}>
        <DarkBackground />

        {/* Dev — Jupiter violeta com anel @ x=0 */}
        <Planet
          position={[0, 0, 0]}
          radius={6.5}
          textureUrl="/textures/planets/jupiter-4k.jpg"
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

        {/* Sites — Mars ember @ x=40 */}
        <Planet
          position={[40, 0, 0]}
          radius={5.8}
          textureUrl="/textures/planets/mars-8k.jpg"
          tint="#FF7A4D"
          rotationSpeed={0.07}
          axialTilt={0.25}
          atmosphere={{ color: '#FF6B3D', size: 1.06 }}
          mouseInfluence={0.20}
          mouseRef={mouseRef}
          dragRef={sitesDrag}
          segments={segments}
        />

        <Starfield count={isMobile ? 400 : 900} radius={250} mouseRef={mouseRef} />
      </Suspense>

      <HubCameraRig progressRef={progressRef} targetRef={targetRef} mouseRef={mouseRef} mobile={isMobile} />
    </Canvas>
  )
}
