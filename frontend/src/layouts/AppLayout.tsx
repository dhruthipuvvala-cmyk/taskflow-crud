import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

import { AnimatedBackground } from '../components/ui'
import { pageVariants } from '../animations/variants'

export function AppLayout({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()
  const barOpacity = useTransform(scrollY, [0, 60], [0, 1])
  const lineOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen">
        <header className="sticky top-0 z-40">
          <motion.div
            style={{ opacity: barOpacity }}
            className="absolute inset-0 border-b border-white/[0.06] bg-black/30 backdrop-blur-2xl"
          />
          <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-600/40">
                <FiCheckCircle size={16} />
              </span>
              <span className="text-sm font-semibold tracking-[0.22em] text-white">TASKFLOW</span>
            </div>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-slate-500 sm:block">
              Workspace
            </span>
          </div>
          <motion.div
            style={{ opacity: lineOpacity }}
            className="relative h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent"
          />
        </header>

        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
        >
          {children}
        </motion.main>
      </div>
    </>
  )
}
