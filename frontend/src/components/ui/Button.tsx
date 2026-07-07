import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'framer-motion'

import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'text-ink-950 font-semibold shadow-[0_10px_34px_-8px_rgba(255,111,91,0.6)] bg-gradient-to-b from-amber-300 to-coral-500 hover:from-amber-300 hover:to-amber-400',
  secondary: 'glass text-slate-100 hover:border-white/15',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  danger:
    'text-white font-semibold shadow-[0_10px_34px_-8px_rgba(224,72,60,0.6)] bg-gradient-to-b from-coral-500 to-ember-600 hover:from-coral-500 hover:to-coral-500',
}

const SIZES: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2',
}

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 18 })
  const sy = useSpring(y, { stiffness: 300, damping: 18 })

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.3)
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.4)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
      style={{ x: sx, y: sy }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
