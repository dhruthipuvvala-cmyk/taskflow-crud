import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

import { AnimatedNumber, TiltCard } from '../ui'
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
      <TiltCard className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>
          <Icon className={cn('text-base', accent)} />
        </div>
        <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
          <AnimatedNumber value={value} suffix={suffix} />
        </p>
      </TiltCard>
    </motion.div>
  )
}
