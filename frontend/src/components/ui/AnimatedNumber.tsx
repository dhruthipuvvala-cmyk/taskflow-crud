import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
}

/** Counts up to `value` (from its previous value) whenever it changes. */
export function AnimatedNumber({ value, suffix = '' }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    prev.current = value
    return () => controls.stop()
  }, [value])

  return (
    <span>
      {Math.round(display)}
      {suffix}
    </span>
  )
}
