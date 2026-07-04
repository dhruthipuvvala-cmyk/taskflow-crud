import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { cn } from '../../utils/cn'

export type BadgeTone = 'indigo' | 'cyan' | 'amber' | 'emerald' | 'slate' | 'rose'

const TONES: Record<BadgeTone, string> = {
  indigo: 'bg-brand-500/15 text-brand-300 border-brand-400/30',
  cyan: 'bg-accent-500/15 text-accent-400 border-accent-400/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  slate: 'bg-slate-500/15 text-slate-300 border-slate-400/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
}

const GLOWS: Record<BadgeTone, string> = {
  indigo: 'shadow-[0_0_16px_-3px_rgba(129,140,248,0.65)]',
  cyan: 'shadow-[0_0_16px_-3px_rgba(34,211,238,0.65)]',
  amber: 'shadow-[0_0_16px_-3px_rgba(251,191,36,0.65)]',
  emerald: 'shadow-[0_0_16px_-3px_rgba(52,211,153,0.65)]',
  slate: 'shadow-[0_0_16px_-3px_rgba(148,163,184,0.4)]',
  rose: 'shadow-[0_0_16px_-3px_rgba(251,113,133,0.7)]',
}

const DOTS: Record<BadgeTone, string> = {
  indigo: 'bg-brand-400',
  cyan: 'bg-accent-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
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
