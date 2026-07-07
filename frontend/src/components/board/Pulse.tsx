import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { MomentumRing } from './MomentumRing'
import { AnimatedNumber, Button } from '../ui'
import { EASE } from '../../animations/variants'
import type { TaskStats } from '../../types/task'

function greeting(hour: number): string {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

interface PulseProps {
  stats: TaskStats | null
  onCreate: () => void
  onOpenCommand: () => void
}

export function Pulse({ stats, onCreate, onOpenCommand }: PulseProps) {
  const [now, setNow] = useState<Date>(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const timeLabel = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const total = stats?.total ?? 0
  const active = stats?.in_progress ?? 0
  const overdue = stats?.overdue ?? 0

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="panel flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-300/80">
          {greeting(now.getHours())}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          Your day, in focus.
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          {dateLabel} · <span className="tabular-nums text-slate-300">{timeLabel}</span>
        </p>

        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
          <span className="text-slate-200">
            <AnimatedNumber value={total} /> tasks
          </span>
          in your workspace ·
          <span className="text-amber-300">
            <AnimatedNumber value={active} /> in progress
          </span>
          ·
          <span className={overdue ? 'text-coral-500' : 'text-slate-400'}>
            <AnimatedNumber value={overdue} /> overdue
          </span>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <Button onClick={onCreate} className="group">
            <FiPlus className="transition-transform duration-300 group-hover:rotate-90" /> New task
          </Button>
          <button
            type="button"
            onClick={onOpenCommand}
            className="glass inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <FiSearch size={15} /> Search
            <kbd className="ml-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-end">
        <MomentumRing value={stats?.completion_rate ?? 0} />
      </div>
    </motion.section>
  )
}
