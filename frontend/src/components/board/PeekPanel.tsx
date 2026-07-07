import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCalendar, FiClock, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

import { PriorityBadge, StatusBadge } from '../tasks/badges'
import { Button } from '../ui'
import { backdropVariants, peekVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { formatDate, isOverdue } from '../../utils/format'
import type { Task } from '../../types/task'

interface PeekPanelProps {
  task: Task | null
  onClose: () => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function PeekPanel({ task, onClose, onEdit, onDelete }: PeekPanelProps) {
  useEffect(() => {
    if (!task) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [task, onClose])

  const overdue = task ? isOverdue(task.due_date, task.status) : false

  return createPortal(
    <AnimatePresence>
      {task && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.aside
            variants={peekVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Task details"
            className="glass-strong m-3 flex w-full max-w-md flex-col rounded-3xl p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-white">{task.title}</h2>
            {task.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{task.description}</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Due</p>
                <p
                  className={cn(
                    'mt-1 inline-flex items-center gap-1.5',
                    overdue ? 'text-coral-500' : 'text-slate-200',
                  )}
                >
                  <FiCalendar size={13} />
                  {task.due_date ? formatDate(task.due_date) : 'No date'}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Created</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-slate-200">
                  <FiClock size={13} />
                  {formatDate(task.created_at)}
                </p>
              </div>
            </div>

            <div className="mt-auto flex gap-2 pt-8">
              <Button variant="secondary" size="md" className="flex-1" onClick={() => onEdit(task)}>
                <FiEdit2 size={15} /> Edit
              </Button>
              <Button variant="danger" size="md" onClick={() => onDelete(task)}>
                <FiTrash2 size={15} /> Delete
              </Button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
