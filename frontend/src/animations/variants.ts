import type { Transition, Variants } from 'framer-motion'

/** Shared spring — the signature "alive" feel used across the app. */
export const spring: Transition = { type: 'spring', stiffness: 260, damping: 26 }

const softSpring: Transition = { type: 'spring', stiffness: 200, damping: 30 }

/** Root page fade/slide on mount. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/** Staggered container for lists / grids. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

/** Individual card / list item — springs up with a touch of scale. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: softSpring },
  exit: { opacity: 0, scale: 0.9, filter: 'blur(4px)', transition: { duration: 0.2 } },
}

/** Modal backdrop. */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

/** Modal panel — morphs into existence with spring physics. */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: spring },
  exit: { opacity: 0, scale: 0.95, y: 12, filter: 'blur(6px)', transition: { duration: 0.18 } },
}
