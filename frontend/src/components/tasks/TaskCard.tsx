import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi'

import { SpotlightCard } from '../ui'
import { PriorityBadge, StatusBadge } from './badges'
import { itemVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { formatDate, isOverdue } from '../../utils/format'
import { STATUS, type Status, type Task } from '../../types/task'

const STATUS_ACCENT: Record<Status, string> = {
  [STATUS.TODO]: 'bg-slate-400',
  [STATUS.IN_PROGRESS]: 'bg-amber-400',
  [STATUS.DONE]: 'bg-emerald-400',
}

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task.due_date, task.status)

  return (
    <motion.div variants={itemVariants} layout exit="exit">
      <SpotlightCard className="h-full p-5">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span
                className={cn('mt-[7px] h-2 w-2 shrink-0 rounded-full', STATUS_ACCENT[task.status])}
              />
              <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
                {task.title}
              </h3>
            </div>
            <div className="flex shrink-0 gap-0.5 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
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
            <p className="line-clamp-2 pl-[18px] text-sm leading-relaxed text-slate-400">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pl-[18px]">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pl-[18px] pt-3.5 text-xs text-slate-500">
            <span className={cn('inline-flex items-center gap-1.5', overdue && 'text-rose-400')}>
              <FiCalendar size={13} />
              {task.due_date ? formatDate(task.due_date) : 'No due date'}
              {overdue && ' · overdue'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock size={13} />
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
