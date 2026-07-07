import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const RADIUS = 52
const CIRC = 2 * Math.PI * RADIUS

/** Volumetric completion ring — the dashboard's single hero metric. */
export function MomentumRing({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const [pct, setPct] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    if (reduce) {
      setPct(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setPct,
    })
    prev.current = value
    return () => controls.stop()
  }, [value, reduce])

  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)

  return (
    <div className="relative grid h-[160px] w-[160px] shrink-0 place-items-center">
      <div className="absolute inset-3 rounded-full bg-coral-500/25 blur-2xl" />
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="url(#momentum)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="momentum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd8a8" />
            <stop offset="1" stopColor="#ff6f5b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-semibold tabular-nums text-white">
          {Math.round(pct)}
          <span className="text-xl text-slate-500">%</span>
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">shipped</span>
      </div>
    </div>
  )
}
