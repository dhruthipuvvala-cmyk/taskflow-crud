import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { cn } from '../../utils/cn'
import { backdropVariants, sheetVariants } from '../../animations/variants'
import { ORDERING_OPTIONS, PRIORITY_META, PRIORITY_OPTIONS, STATUS_META } from '../../utils/taskMeta'
import type { BadgeTone } from '../ui'
import type { Task } from '../../types/task'

const DOT: Record<BadgeTone, string> = {
  amber: 'bg-amber-400',
  ember: 'bg-coral-500',
  emerald: 'bg-emerald-400',
  teal: 'bg-teal-400',
  slate: 'bg-slate-400',
  rose: 'bg-rose-400',
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs transition-colors',
        active
          ? 'border-amber-400/40 bg-amber-400/20 text-amber-200'
          : 'border-white/10 text-slate-400 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  search: string
  onSearchChange: (value: string) => void
  priority: string
  onPriorityChange: (value: string) => void
  ordering: string
  onOrderingChange: (value: string) => void
  tasks: Task[]
  onSelect: (task: Task) => void
  onCreate: () => void
}

export function CommandPalette({
  open,
  onClose,
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  ordering,
  onOrderingChange,
  tasks,
  onSelect,
  onCreate,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current?.focus(), 10)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.clearTimeout(timer)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="glass-strong w-full max-w-xl overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <FiSearch className="text-slate-500" size={18} />
              <input
                ref={inputRef}
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search tasks, run a command…"
                aria-label="Search tasks"
                className="w-full bg-transparent text-[15px] text-white placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-3">
              <button
                type="button"
                onClick={() => {
                  onCreate()
                  onClose()
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-b from-amber-300 to-coral-500 text-ink-950">
                  <FiPlus size={16} />
                </span>
                Create new task
              </button>

              <div className="mt-3 px-3">
                <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">Priority</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRIORITY_OPTIONS.map((option) => (
                    <Chip
                      key={option.value || 'all-priority'}
                      active={priority === option.value}
                      onClick={() => onPriorityChange(option.value)}
                    >
                      {option.label}
                    </Chip>
                  ))}
                </div>
                <p className="mb-2 mt-3 text-[10px] uppercase tracking-[0.16em] text-slate-500">Sort</p>
                <div className="flex flex-wrap gap-1.5">
                  {ORDERING_OPTIONS.map((option) => (
                    <Chip
                      key={option.value}
                      active={ordering === option.value}
                      onClick={() => onOrderingChange(option.value)}
                    >
                      {option.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1 px-3 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {tasks.length} task{tasks.length === 1 ? '' : 's'}
                </p>
                <div className="flex flex-col">
                  {tasks.slice(0, 8).map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => {
                        onSelect(task)
                        onClose()
                      }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', DOT[STATUS_META[task.status].tone])} />
                      <span className="flex-1 truncate text-sm text-slate-200">{task.title}</span>
                      <span className="text-xs text-slate-500">{PRIORITY_META[task.priority].label}</span>
                    </button>
                  ))}
                  {tasks.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-slate-500">No matching tasks</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
