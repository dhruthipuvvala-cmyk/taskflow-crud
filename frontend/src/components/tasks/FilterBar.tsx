import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FiGrid, FiList } from 'react-icons/fi'

import { Select } from '../ui'
import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'
import { ORDERING_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../utils/taskMeta'

export type TaskView = 'cards' | 'table'

interface FilterBarProps {
  status: string
  priority: string
  ordering: string
  view: TaskView
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  onOrderingChange: (value: string) => void
  onViewChange: (view: TaskView) => void
}

export function FilterBar({
  status,
  priority,
  ordering,
  view,
  onStatusChange,
  onPriorityChange,
  onOrderingChange,
  onViewChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filter by priority"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Sort tasks"
          value={ordering}
          onChange={(event) => onOrderingChange(event.target.value)}
          className="col-span-2 sm:col-auto"
        >
          {ORDERING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-surface-900/60 p-1 md:flex">
        <ViewToggle active={view === 'cards'} label="Card view" onClick={() => onViewChange('cards')}>
          <FiGrid size={16} />
        </ViewToggle>
        <ViewToggle
          active={view === 'table'}
          label="Table view"
          onClick={() => onViewChange('table')}
        >
          <FiList size={16} />
        </ViewToggle>
      </div>
    </div>
  )
}

function ViewToggle({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="relative rounded-lg p-1.5"
    >
      {active && (
        <motion.span
          layoutId="viewToggle"
          transition={spring}
          className="absolute inset-0 rounded-lg bg-brand-600"
        />
      )}
      <span className={cn('relative z-10 block', active ? 'text-white' : 'text-slate-400')}>
        {children}
      </span>
    </button>
  )
}
