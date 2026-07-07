import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

import { AnimatedNumber, SpotlightCard } from '../ui'
import { itemVariants } from '../../animations/variants'
import { cn } from '../../utils/cn'

interface StatCardProps {
  label: string
  value: number
  icon: IconType
  accent?: string
  suffix?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'text-brand-300',
  suffix = '',
}: StatCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <SpotlightCard className="p-5">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon className={cn('text-sm', accent)} />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em]">{label}</span>
        </div>
        <p className="mt-4 text-4xl font-semibold tracking-tight tabular-nums text-white">
          <AnimatedNumber value={value} suffix={suffix} />
        </p>
      </SpotlightCard>
    </motion.div>
  )
}
