import { AnimatePresence, motion } from 'framer-motion'

import { TaskCard } from '../tasks/TaskCard'
import { staggerContainer } from '../../animations/variants'
import { STATUS_META } from '../../utils/taskMeta'
import { cn } from '../../utils/cn'
import type { BadgeTone } from '../ui'
import type { Status, Task } from '../../types/task'

const DOT: Record<BadgeTone, string> = {
  amber: 'bg-amber-400',
  ember: 'bg-coral-500',
  emerald: 'bg-emerald-400',
  teal: 'bg-teal-400',
  slate: 'bg-slate-400',
  rose: 'bg-rose-400',
}

interface LaneProps {
  status: Status
  tasks: Task[]
  onSelect: (task: Task) => void
}

export function Lane({ status, tasks, onSelect }: LaneProps) {
  const meta = STATUS_META[status]

  return (
    <div className="rounded-3xl border border-white/[0.05] bg-white/[0.015] p-3">
      <div className="mb-3 flex items-center gap-2 px-2 pt-1">
        <span className={cn('h-2 w-2 rounded-full', DOT[meta.tone])} />
        <h2 className="text-sm font-semibold text-white">{meta.label}</h2>
        <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-xs tabular-nums text-slate-400">
          {tasks.length}
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onSelect={onSelect} />
          ))}
        </AnimatePresence>
      </motion.div>

      {tasks.length === 0 && (
        <p className="px-2 py-10 text-center text-xs text-slate-600">Nothing here yet</p>
      )}
    </div>
  )
}
