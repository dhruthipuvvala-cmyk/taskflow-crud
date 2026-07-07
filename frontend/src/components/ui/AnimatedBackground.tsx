import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

/**
 * Cinematic ambient backdrop shared with the landing hero: the same footage,
 * deeply blurred and darkened so the dashboard lives in the same world.
 * Falls back to a static gradient when reduced motion is preferred.
 */
export function AnimatedBackground() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1200], [0, 120])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {!reduce && (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ y }}
          className="absolute left-0 top-0 h-[118%] w-full scale-110 object-cover opacity-40 blur-[52px]"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </motion.video>
      )}

      {/* Readability wash */}
      <div className="absolute inset-0 bg-black/72" />

      {/* Cool brand glow at the top */}
      <div
        className="absolute inset-x-0 top-0 h-[45vh]"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(99,102,241,0.14), transparent 70%)' }}
      />
      {/* Warm glow at the bottom — echoes the landing sunset */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42vh]"
        style={{ background: 'radial-gradient(65% 100% at 50% 100%, rgba(244,120,100,0.07), transparent 72%)' }}
      />

      <div className="noise absolute inset-0 opacity-[0.03]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(130% 120% at 50% -10%, transparent 55%, rgba(0,0,0,0.62))' }}
      />
    </div>
  )
}
