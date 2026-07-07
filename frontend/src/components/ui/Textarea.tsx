import type { TextareaHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

const FIELD =
  'w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 backdrop-blur-xl transition-all duration-200 focus:border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/25 focus:shadow-[0_0_0_4px_rgba(255,178,92,0.1)]'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
      )}
      <textarea className={cn(FIELD, error && 'border-rose-500/60', className)} {...props} />
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  )
}
