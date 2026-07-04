import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'framer-motion'

import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'text-white shadow-[0_8px_30px_-8px_rgba(79,70,229,0.6)] bg-gradient-to-b from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500',
  secondary: 'glass text-slate-100 hover:border-white/15',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  danger:
    'text-white shadow-[0_8px_30px_-8px_rgba(225,29,72,0.6)] bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500',
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
        'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 disabled:pointer-events-none disabled:opacity-50',
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
