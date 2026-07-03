import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi'

import { Card } from '../ui'
import { PriorityBadge, StatusBadge } from './badges'
import { itemVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { formatDate, isOverdue } from '../../utils/format'
import type { Task } from '../../types/task'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task.due_date, task.status)

  return (
    <motion.div variants={itemVariants} layout exit={{ opacity: 0, scale: 0.95 }}>
      <Card interactive className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold text-white">{task.title}</h3>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-brand-300"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task)}
              aria-label="Delete task"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-rose-300"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="line-clamp-2 text-sm text-slate-400">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-slate-500">
          <span className={cn('inline-flex items-center gap-1', overdue && 'text-rose-400')}>
            <FiCalendar size={13} />
            {task.due_date ? formatDate(task.due_date) : 'No due date'}
            {overdue && ' · overdue'}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiClock size={13} />
            {formatDate(task.created_at)}
          </span>
        </div>
      </Card>
    </motion.div>
  )
}
