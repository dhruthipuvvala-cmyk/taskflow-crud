import { FiInbox, FiPlus } from 'react-icons/fi'

import { Button } from '../ui'

interface EmptyStateProps {
  filtered: boolean
  onAdd: () => void
  onClear: () => void
}

export function EmptyState({ filtered, onAdd, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-slate-400">
        <FiInbox size={26} />
      </span>
      <h3 className="text-lg font-semibold text-white">
        {filtered ? 'No matching tasks' : 'No tasks yet'}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">
        {filtered
          ? 'Try adjusting your search or filters.'
          : 'Create your first task to get started.'}
      </p>
      <div className="mt-5">
        {filtered ? (
          <Button variant="secondary" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        ) : (
          <Button size="sm" onClick={onAdd}>
            <FiPlus /> Add Task
          </Button>
        )}
      </div>
    </div>
  )
}
