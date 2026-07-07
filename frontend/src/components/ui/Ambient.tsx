import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

/**
 * The cinematic environment shared with the landing hero: the same sunset
 * footage (deep blur), volumetric glow orbs that parallax to the cursor,
 * grain, and a depth-of-field vignette. Reduced motion → static.
 */
export function Ambient() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 1400], [0, 140])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20 })
  const sy = useSpring(py, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (reduce) return
    const onMove = (event: PointerEvent) => {
      px.set((event.clientX / window.innerWidth - 0.5) * 2)
      py.set((event.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py, reduce])

  const aX = useTransform(sx, [-1, 1], [-26, 26])
  const aY = useTransform(sy, [-1, 1], [-20, 20])
  const bX = useTransform(sx, [-1, 1], [22, -22])
  const bY = useTransform(sy, [-1, 1], [18, -18])
  const cX = useTransform(sx, [-1, 1], [-14, 14])
  const cY = useTransform(sy, [-1, 1], [14, -14])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {!reduce && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ y: videoY }}
          className="absolute left-0 top-0 h-[120%] w-full scale-110 object-cover opacity-[0.34] blur-[56px]"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </motion.video>
      )}

      <div className="absolute inset-0 bg-ink-950/75" />

      <motion.div
        style={{
          x: aX,
          y: aY,
          background: 'radial-gradient(circle, rgba(255,127,91,0.55), transparent 62%)',
        }}
        animate={reduce ? undefined : { opacity: [0.5, 0.66, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 top-[-14%] h-[46rem] w-[46rem] rounded-full blur-[90px]"
      />
      <motion.div
        style={{
          x: bX,
          y: bY,
          background: 'radial-gradient(circle, rgba(255,178,92,0.4), transparent 64%)',
        }}
        animate={reduce ? undefined : { opacity: [0.4, 0.55, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-[6%] h-[40rem] w-[40rem] rounded-full blur-[100px]"
      />
      <motion.div
        style={{
          x: cX,
          y: cY,
          background: 'radial-gradient(circle, rgba(139,108,255,0.22), transparent 66%)',
        }}
        animate={reduce ? undefined : { opacity: [0.3, 0.44, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-18%] left-[24%] h-[42rem] w-[42rem] rounded-full blur-[110px]"
      />

      <div className="noise absolute inset-0 opacity-[0.03]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(135% 120% at 50% -8%, transparent 52%, rgba(0,0,0,0.66))' }}
      />
    </div>
  )
}
