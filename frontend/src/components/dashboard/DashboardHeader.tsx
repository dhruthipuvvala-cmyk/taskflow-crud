import { useEffect, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { Button } from '../ui'

interface DashboardHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  onAdd: () => void
}

export function DashboardHeader({ search, onSearchChange, onAdd }: DashboardHeaderProps) {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400">
          {dateLabel} · <span className="tabular-nums">{timeLabel}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:w-64">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks…"
            aria-label="Search tasks"
            className="w-full rounded-xl border border-white/10 bg-surface-900/60 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-brand-400/60 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          />
        </div>
        <Button onClick={onAdd} className="shrink-0">
          <FiPlus />
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
    </div>
  )
}
