'use client'

import dynamic from 'next/dynamic'

const CourseHubScene = dynamic(
  () => import('./CourseHubScene').then((m) => m.CourseHubScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a0a18 0%, #02020a 70%)' }}
      />
    ),
  }
)

export function CourseHubBackground() {
  return <CourseHubScene />
}
