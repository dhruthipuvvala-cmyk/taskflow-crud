import { motion } from 'framer-motion'
import { FiAlertTriangle, FiInbox, FiPlus } from 'react-icons/fi'

import { Button } from '../ui'
import { EASE } from '../../animations/variants'

export function BoardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map((col) => (
        <div key={col} className="rounded-3xl border border-white/[0.05] bg-white/[0.015] p-3">
          <div className="mb-3 h-4 w-24 rounded bg-white/[0.06]" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: col === 1 ? 3 : 2 }).map((_, i) => (
              <div key={i} className="card shimmer p-4">
                <div className="h-4 w-2/3 rounded bg-white/[0.06]" />
                <div className="mt-3 h-3 w-full rounded bg-white/[0.04]" />
                <div className="mt-2 h-3 w-4/5 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function EmptyBoard({
  filtered,
  onCreate,
  onClear,
}: {
  filtered: boolean
  onCreate: () => void
  onClear: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="panel flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-coral-500/25 blur-2xl" />
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-amber-200">
          <FiInbox size={26} />
        </span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        {filtered ? 'No matching tasks' : 'A clean slate'}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
        {filtered
          ? 'Nothing matches your search or filters yet.'
          : 'Create your first task and start building momentum.'}
      </p>
      <div className="mt-7">
        {filtered ? (
          <Button variant="secondary" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        ) : (
          <Button onClick={onCreate}>
            <FiPlus /> Create your first task
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export function BoardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="panel flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-rose-500/20 blur-2xl" />
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] text-rose-300">
          <FiAlertTriangle size={26} />
        </span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-white">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">{message}</p>
      <Button variant="secondary" size="sm" className="mt-7" onClick={onRetry}>
        Try again
      </Button>
    </motion.div>
  )
}
