import { useCallback, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import type { IconType } from 'react-icons'

import { cn } from '../../utils/cn'
import { ToastContext, type ToastType } from './toastContext'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

const ICONS: Record<ToastType, IconType> = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
}

const TONES: Record<ToastType, string> = {
  success: 'text-emerald-300 border-emerald-400/30',
  error: 'text-rose-300 border-rose-400/30',
  info: 'text-brand-300 border-brand-400/30',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = (idRef.current += 1)
      setToasts((current) => [...current, { id, type, message }])
      setTimeout(() => remove(id), 3500)
    },
    [remove],
  )

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-xs flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type]
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  'glass-strong pointer-events-auto flex items-start gap-2.5 rounded-xl border p-3 shadow-xl',
                  TONES[toast.type],
                )}
              >
                <Icon className="mt-0.5 shrink-0" />
                <span className="flex-1 text-sm text-slate-100">{toast.message}</span>
                <button
                  type="button"
                  onClick={() => remove(toast.id)}
                  aria-label="Dismiss"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
