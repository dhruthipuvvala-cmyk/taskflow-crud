import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Premium glass card with a soft cursor-following spotlight and a subtle lift.
 * Restrained (no 3D tilt) — the tasteful Vercel/Linear hover.
 */
export function SpotlightCard({ children, className, onClick }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 140, damping: 22 })
  const sy = useSpring(my, { stiffness: 140, damping: 22 })
  const glow = useMotionTemplate`radial-gradient(320px circle at ${sx}% ${sy}%, rgba(255,255,255,0.07), transparent 60%)`

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(((event.clientX - rect.left) / rect.width) * 100)
    my.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduce ? undefined : handleMove}
      onClick={onClick}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={spring}
      className={cn('premium-card group relative overflow-hidden', className)}
    >
      {!reduce && (
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  )
}
