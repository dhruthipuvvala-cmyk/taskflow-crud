import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 61) % 100,
  size: 1 + (i % 3),
  delay: (i % 6) * 0.7,
  duration: 10 + (i % 5) * 2,
  drift: 18 + (i % 4) * 12,
}))

/** Fixed, non-interactive backdrop: aurora blobs + parallax + particles + noise. */
export function AnimatedBackground() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 80])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-surface-950" />

      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </motion.div>

      {!reduce && (
        <div className="absolute inset-0">
          {PARTICLES.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-white/40"
              style={{
                left: `${particle.left}%`,
                bottom: -12,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0], y: [0, -620], x: [0, particle.drift, 0] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="noise absolute inset-0 opacity-[0.035]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(130% 120% at 50% -10%, transparent 45%, rgba(0,0,0,0.55))',
        }}
      />
    </div>
  )
}
