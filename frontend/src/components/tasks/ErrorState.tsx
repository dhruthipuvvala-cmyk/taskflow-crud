import { FiAlertTriangle } from 'react-icons/fi'

import { Button } from '../ui'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 px-6 py-16 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-rose-500/10 text-rose-300">
        <FiAlertTriangle size={26} />
      </span>
      <h3 className="text-lg font-semibold text-white">Something went wrong</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">{message}</p>
      <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
