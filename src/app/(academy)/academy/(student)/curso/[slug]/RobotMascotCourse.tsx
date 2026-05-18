'use client'
import { SplineSceneGlobal } from '@/shared/components/ui/SplineSceneGlobal'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function RobotMascotCourse() {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center"
      style={{ width: 130 }}
      aria-hidden="true"
    >
      <SplineSceneGlobal scene={SCENE} className="w-full h-full" />
    </div>
  )
}
