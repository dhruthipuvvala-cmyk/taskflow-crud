import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiPlus, FiSearch, FiUser } from 'react-icons/fi'

import { cn } from '../../utils/cn'
import { spring } from '../../animations/variants'

function DockButton({
  label,
  onClick,
  primary = false,
  children,
}: {
  label: string
  onClick?: () => void
  primary?: boolean
  children: ReactNode
}) {
  return (
    <div className="group relative flex items-center">
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        transition={spring}
        onClick={onClick}
        aria-label={label}
        className={cn(
          'grid h-11 w-11 place-items-center rounded-2xl transition-colors',
          primary
            ? 'bg-gradient-to-b from-amber-300 to-coral-500 text-ink-950 shadow-[0_8px_24px_-6px_rgba(255,111,91,0.6)]'
            : 'text-slate-400 hover:bg-white/5 hover:text-white',
        )}
      >
        {children}
      </motion.button>
      <span className="pointer-events-none absolute left-full ml-3 hidden -translate-x-1 whitespace-nowrap rounded-lg bg-ink-800/90 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        {label}
      </span>
    </div>
  )
}

interface DockProps {
  onCreate: () => void
  onOpenCommand: () => void
}

export function Dock({ onCreate, onOpenCommand }: DockProps) {
  const items = (
    <>
      <DockButton label="Search  ⌘K" onClick={onOpenCommand}>
        <FiSearch size={18} />
      </DockButton>
      <DockButton label="New task" onClick={onCreate} primary>
        <FiPlus size={18} />
      </DockButton>
    </>
  )

  return (
    <>
      {/* Desktop — floating vertical rail */}
      <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="glass flex flex-col items-center gap-2 rounded-[26px] p-2">
          <span className="mb-1 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-coral-500 text-ink-950">
            <FiCheckCircle size={18} />
          </span>
          {items}
          <div className="my-1 h-px w-6 bg-white/10" />
          <DockButton label="Account">
            <FiUser size={18} />
          </DockButton>
        </div>
      </div>

      {/* Mobile — floating bottom bar */}
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <div className="glass flex items-center gap-2 rounded-full p-2">
          {items}
          <DockButton label="Account">
            <FiUser size={18} />
          </DockButton>
        </div>
      </div>
    </>
  )
}
