'use client'
import { SplineScene } from '@/shared/components/ui/SplineScene'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function CourseCoverSpline() {
  return (
    <div className="w-full h-full" style={{ background: 'var(--ink-2)' }}>
      <SplineScene scene={SCENE} className="w-full h-full" />
    </div>
  )
}
