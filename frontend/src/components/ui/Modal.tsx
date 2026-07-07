import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

import { backdropVariants, sheetVariants } from '../../animations/variants'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'Tab') {
        const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current
      if (panel && !panel.contains(document.activeElement)) panel.focus()
    }, 0)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.clearTimeout(focusTimer)
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="glass-strong relative w-full max-w-lg rounded-3xl p-6 focus:outline-none"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id={titleId} className="text-lg font-semibold tracking-tight text-white">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <IoClose size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
