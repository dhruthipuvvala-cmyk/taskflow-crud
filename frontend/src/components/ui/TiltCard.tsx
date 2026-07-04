import { useRef, type MouseEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
  onClick?: () => void
}

/** Glass surface that tilts in 3D toward the cursor with a moving glare. */
export function TiltCard({ children, className, max = 7, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 20 })
  const gx = useTransform(mx, [0, 1], ['0%', '100%'])
  const gy = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(220px circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 55%)`

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }
  function reset() {
    mx.set(0.5)
    my.set(0.5)
  }

  if (reduce) {
    return (
      <div onClick={onClick} className={cn('glass rounded-2xl', className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={spring}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={cn('glass relative rounded-2xl', className)}
    >
      <motion.span
        aria-hidden
        style={{ backgroundImage: glare }}
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
