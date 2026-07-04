import { motion } from 'framer-motion'
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiCircle,
  FiClock,
  FiList,
  FiTrendingUp,
} from 'react-icons/fi'

import { StatCard } from './StatCard'
import { staggerContainer } from '../../animations/variants'
import type { TaskStats } from '../../types/task'

export function StatsSection({ stats }: { stats: TaskStats | null }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      style={{ perspective: 1200 }}
    >
      <StatCard label="Total" value={stats?.total ?? 0} icon={FiList} accent="text-brand-300" />
      <StatCard label="To Do" value={stats?.todo ?? 0} icon={FiCircle} accent="text-slate-300" />
      <StatCard
        label="In Progress"
        value={stats?.in_progress ?? 0}
        icon={FiClock}
        accent="text-amber-300"
      />
      <StatCard
        label="Completed"
        value={stats?.done ?? 0}
        icon={FiCheckCircle}
        accent="text-emerald-300"
      />
      <StatCard
        label="Overdue"
        value={stats?.overdue ?? 0}
        icon={FiAlertTriangle}
        accent="text-rose-300"
      />
      <StatCard
        label="Completion"
        value={stats?.completion_rate ?? 0}
        suffix="%"
        icon={FiTrendingUp}
        accent="text-accent-400"
      />
    </motion.div>
  )
}
