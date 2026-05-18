'use client'
import { SplineSceneGlobal } from '@/shared/components/ui/SplineSceneGlobal'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function RobotMascotCourse() {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 hidden lg:block overflow-hidden"
      style={{ width: 220 }}
      aria-hidden="true"
    >
      {/* Render scene taller than container and shift up — shows arms, clips legs */}
      <div style={{ position: 'relative', width: '100%', height: '150%', top: '-10%' }}>
        <SplineSceneGlobal scene={SCENE} className="w-full h-full" />
      </div>
    </div>
  )
}
