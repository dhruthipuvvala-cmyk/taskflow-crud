import { motion } from 'framer-motion'
import { FiAlertTriangle } from 'react-icons/fi'

import { Button } from '../ui'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="premium-card flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 rounded-full bg-rose-500/20 blur-2xl" />
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] text-rose-300">
          <FiAlertTriangle size={26} />
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">{message}</p>
      <Button variant="secondary" size="sm" className="mt-7" onClick={onRetry}>
        Try again
      </Button>
    </motion.div>
  )
}
