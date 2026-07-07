import type { Transition, Variants } from 'framer-motion'

/** Motion tokens — one hand made all of it. */
export const spring: Transition = { type: 'spring', stiffness: 260, damping: 26 }
export const softSpring: Transition = { type: 'spring', stiffness: 200, damping: 30 }
export const floatSpring: Transition = { type: 'spring', stiffness: 140, damping: 18 }

export const EASE = [0.22, 1, 0.36, 1] as const

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

/** Floating item — springs up from depth. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: softSpring },
  exit: { opacity: 0, scale: 0.9, filter: 'blur(6px)', transition: { duration: 0.22 } },
}

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

/** Sheet that scales/unblurs into existence. */
export const sheetVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 28, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: spring },
  exit: { opacity: 0, scale: 0.95, y: 16, filter: 'blur(8px)', transition: { duration: 0.18 } },
}

/** Right-side peek panel. */
export const peekVariants: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: spring },
  exit: { opacity: 0, x: 32, filter: 'blur(6px)', transition: { duration: 0.2 } },
}
