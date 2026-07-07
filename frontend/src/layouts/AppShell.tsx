import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { Ambient } from '../components/ui'
import { Dock } from '../components/board/Dock'
import { pageVariants } from '../animations/variants'

interface AppShellProps {
  children: ReactNode
  onCreate: () => void
  onOpenCommand: () => void
}

export function AppShell({ children, onCreate, onOpenCommand }: AppShellProps) {
  return (
    <>
      <Ambient />
      <Dock onCreate={onCreate} onOpenCommand={onOpenCommand} />

      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 pb-28 pt-10 sm:px-6 lg:pb-16 lg:pl-28 lg:pr-8"
      >
        {children}
      </motion.main>
    </>
  )
}
