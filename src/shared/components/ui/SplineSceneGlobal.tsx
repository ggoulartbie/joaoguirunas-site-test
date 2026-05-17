'use client'
import { Suspense, lazy, useRef, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface Props {
  scene: string
  className?: string
}

export function SplineSceneGlobal({ scene, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleLoad(spline: any) {
    if (spline?.canvas) canvasRef.current = spline.canvas as HTMLCanvasElement
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.dispatchEvent(
        new MouseEvent('mousemove', { clientX: e.clientX, clientY: e.clientY, bubbles: true })
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: 'rgba(255,58,14,0.4)', borderTopColor: 'transparent' }}
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={handleLoad} />
    </Suspense>
  )
}
