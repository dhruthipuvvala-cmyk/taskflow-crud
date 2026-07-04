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
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          {dateLabel} · <span className="tabular-nums text-slate-400">{timeLabel}</span>
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="group relative flex-1 md:w-72">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-brand-300" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks…"
            aria-label="Search tasks"
            className="w-full rounded-xl border border-white/10 bg-surface-900/60 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-brand-400/70 focus:outline-none focus:ring-2 focus:ring-brand-400/25 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.08)]"
          />
        </div>
        <Button onClick={onAdd} className="group shrink-0">
          <FiPlus className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
    </div>
  )
}
