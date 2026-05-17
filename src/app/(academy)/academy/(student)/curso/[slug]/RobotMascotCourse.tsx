'use client'
import { SplineSceneGlobal } from '@/shared/components/ui/SplineSceneGlobal'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function RobotMascotCourse() {
  return (
    <div
      className="absolute right-4 lg:right-6 hidden lg:block"
      style={{ bottom: 0, width: 96, height: 96 }}
      aria-hidden="true"
    >
      <SplineSceneGlobal scene={SCENE} className="w-full h-full" />
    </div>
  )
}
