'use client'
import { SplineScene } from '@/shared/components/ui/SplineScene'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function RobotMascotCourse() {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 hidden lg:block pointer-events-none"
      style={{ width: 160 }}
      aria-hidden="true"
    >
      <SplineScene scene={SCENE} className="w-full h-full" />
    </div>
  )
}
