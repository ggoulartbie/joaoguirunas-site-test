'use client'
import { SplineSceneGlobal } from '@/shared/components/ui/SplineSceneGlobal'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function CourseCoverSpline() {
  return (
    <div className="w-full h-full" style={{ background: 'var(--ink-2)' }}>
      <SplineSceneGlobal scene={SCENE} className="w-full h-full" />
    </div>
  )
}
