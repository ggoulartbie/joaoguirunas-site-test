'use client'
import { SplineScene } from '@/shared/components/ui/SplineScene'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function RobotMascot() {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden lg:block pointer-events-none"
      style={{ width: 96, height: 96 }}
    >
      <SplineScene scene={SCENE} className="w-full h-full" />
    </div>
  )
}
