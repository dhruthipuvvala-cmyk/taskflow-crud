import type { SelectHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

const FIELD =
  'w-full appearance-none rounded-xl border border-white/10 bg-surface-900/60 px-3.5 py-2.5 text-sm text-slate-100 transition-all duration-200 focus:border-brand-400/70 focus:outline-none focus:ring-2 focus:ring-brand-400/25 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.08)]'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
      )}
      <select className={cn(FIELD, className)} {...props}>
        {children}
      </select>
    </label>
  )
}
