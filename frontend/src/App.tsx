import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'

import { ToastProvider } from './components/ui'
import { LandingPage } from './components/landing/LandingPage'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'

export default function App() {
  const [entered, setEntered] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('tf_entered') === '1'
    } catch {
      return false
    }
  })

  function enter() {
    try {
      sessionStorage.setItem('tf_entered', '1')
    } catch {
      // sessionStorage may be unavailable (private mode) — ignore.
    }
    setEntered(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {entered ? (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ToastProvider>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ToastProvider>
          </motion.div>
        ) : (
          <LandingPage key="landing" onEnter={enter} />
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
