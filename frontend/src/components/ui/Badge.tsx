import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { cn } from '../../utils/cn'

export type BadgeTone = 'amber' | 'ember' | 'emerald' | 'teal' | 'slate' | 'rose'

const TONES: Record<BadgeTone, string> = {
  amber: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  ember: 'bg-coral-500/15 text-coral-500 border-coral-500/35',
  emerald: 'bg-emerald-400/12 text-emerald-300 border-emerald-400/30',
  teal: 'bg-teal-400/12 text-teal-300 border-teal-400/30',
  slate: 'bg-slate-400/12 text-slate-300 border-slate-400/25',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
}

const GLOWS: Record<BadgeTone, string> = {
  amber: 'shadow-[0_0_16px_-3px_rgba(255,178,92,0.6)]',
  ember: 'shadow-[0_0_18px_-3px_rgba(255,111,91,0.75)]',
  emerald: 'shadow-[0_0_16px_-3px_rgba(52,211,153,0.6)]',
  teal: 'shadow-[0_0_16px_-3px_rgba(94,234,212,0.6)]',
  slate: 'shadow-[0_0_16px_-3px_rgba(148,163,184,0.4)]',
  rose: 'shadow-[0_0_16px_-3px_rgba(251,113,133,0.7)]',
}

const DOTS: Record<BadgeTone, string> = {
  amber: 'bg-amber-400',
  ember: 'bg-coral-500',
  emerald: 'bg-emerald-400',
  teal: 'bg-teal-400',
  slate: 'bg-slate-400',
  rose: 'bg-rose-400',
}

export interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
  glow?: boolean
  pulse?: boolean
}

export function Badge({ tone = 'slate', children, className, glow = false, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-shadow duration-300',
        TONES[tone],
        glow && GLOWS[tone],
        className,
      )}
    >
      {pulse && (
        <motion.span
          className={cn('h-1.5 w-1.5 rounded-full', DOTS[tone])}
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.75, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {children}
    </span>
  )
}
