import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'

import { Spotlight } from '../ui'
import { PriorityBadge } from './badges'
import { itemVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { formatDate, isOverdue } from '../../utils/format'
import { STATUS, type Status, type Task } from '../../types/task'

const DOT: Record<Status, string> = {
  [STATUS.TODO]: 'bg-slate-400',
  [STATUS.IN_PROGRESS]: 'bg-amber-400',
  [STATUS.DONE]: 'bg-teal-400',
}

interface TaskCardProps {
  task: Task
  onSelect: (task: Task) => void
}

export function TaskCard({ task, onSelect }: TaskCardProps) {
  const overdue = isOverdue(task.due_date, task.status)

  return (
    <motion.div variants={itemVariants} layout exit="exit">
      <Spotlight onClick={() => onSelect(task)} className="cursor-pointer p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className={cn('mt-[6px] h-2 w-2 shrink-0 rounded-full', DOT[task.status])} />
              <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
                {task.title}
              </h3>
            </div>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p className="line-clamp-2 pl-[18px] text-sm leading-relaxed text-slate-400">
              {task.description}
            </p>
          )}

          <div className="flex items-center pl-[18px] pt-0.5 text-xs text-slate-500">
            <span className={cn('inline-flex items-center gap-1.5', overdue && 'text-coral-500')}>
              <FiCalendar size={13} />
              {task.due_date ? formatDate(task.due_date) : 'No date'}
              {overdue && ' · overdue'}
            </span>
          </div>
        </div>
      </Spotlight>
    </motion.div>
  )
}
