import type { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

import { AnimatedBackground } from '../components/ui'
import { pageVariants, spring } from '../animations/variants'

export function AppLayout({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 14px 34px -14px rgba(0,0,0,0.7)'],
  )
  const lineOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen">
        <motion.header style={{ boxShadow: shadow }} className="glass sticky top-0 z-40">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4 sm:px-8">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={spring}
              className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-600/40"
            >
              <FiCheckCircle size={18} />
            </motion.span>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold tracking-tight text-white">TaskFlow</p>
              <p className="text-[11px] text-slate-500">Task management</p>
            </div>
          </div>
          <motion.div
            style={{ opacity: lineOpacity }}
            className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent"
          />
        </motion.header>

        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl px-5 py-10 sm:px-8"
        >
          {children}
        </motion.main>
      </div>
    </>
  )
}
