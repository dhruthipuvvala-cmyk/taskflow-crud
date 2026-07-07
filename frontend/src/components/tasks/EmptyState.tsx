import { motion } from 'framer-motion'
import { FiInbox, FiPlus } from 'react-icons/fi'

import { Button } from '../ui'

interface EmptyStateProps {
  filtered: boolean
  onAdd: () => void
  onClear: () => void
}

export function EmptyState({ filtered, onAdd, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="premium-card flex flex-col items-center justify-center px-6 py-20 text-center sm:py-24"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-brand-500/20 blur-2xl" />
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300">
          <FiInbox size={26} />
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {filtered ? 'No matching tasks' : 'A clean slate'}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
        {filtered
          ? 'Nothing matches these filters yet. Try adjusting your search or filters.'
          : 'Your workspace is ready. Create your first task and start building momentum.'}
      </p>
      <div className="mt-7">
        {filtered ? (
          <Button variant="secondary" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        ) : (
          <Button size="md" onClick={onAdd}>
            <FiPlus /> Create your first task
          </Button>
        )}
      </div>
    </motion.div>
  )
}
