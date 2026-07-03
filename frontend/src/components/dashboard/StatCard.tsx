import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

import { Card } from '../ui'
import { itemVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'

interface StatCardProps {
  label: string
  value: string | number
  icon: IconType
  accent?: string
}

export function StatCard({ label, value, icon: Icon, accent = 'text-brand-300' }: StatCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card interactive className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
          <Icon className={cn('text-lg', accent)} />
        </div>
        <p className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</p>
      </Card>
    </motion.div>
  )
}
