'use client'

import { useState, useEffect } from 'react'

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const readProgress = scrollTop / docHeight
      setProgress(readProgress)
    }

    window.addEventListener('scroll', updateProgress)

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} />
}

