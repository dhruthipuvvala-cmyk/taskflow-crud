import { AnimatePresence, motion } from 'framer-motion'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { PriorityBadge, StatusBadge } from './badges'
import { cn } from '../../utils/cn'
import { formatDate, isOverdue } from '../../utils/format'
import type { Task } from '../../types/task'

interface TaskTableProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-5 py-4 font-medium">Task</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Priority</th>
              <th className="px-5 py-4 font-medium">Due</th>
              <th className="px-5 py-4 font-medium">Created</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {tasks.map((task) => {
                const overdue = isOverdue(task.due_date, task.status)
                return (
                  <motion.tr
                    key={task.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.025]"
                  >
                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate font-medium text-white">{task.title}</p>
                      {task.description && (
                        <p className="truncate text-xs text-slate-500">{task.description}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-5 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className={cn('px-5 py-4 text-slate-400', overdue && 'text-rose-400')}>
                      {task.due_date ? formatDate(task.due_date) : '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-400">{formatDate(task.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-0.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
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
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
