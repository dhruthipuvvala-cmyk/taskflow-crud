import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  LuArrowRight,
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuMenu,
  LuPlay,
  LuSearch,
  LuSparkles,
  LuUser,
  LuX,
  LuZap,
} from 'react-icons/lu'

import { cn } from '../../utils/cn'

const EASE = [0.22, 1, 0.36, 1] as const

const reveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(20px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE, delay },
  }),
}

function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      variants={reveal}
      custom={delay}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

const NAV_LINKS = ['Overview', 'Tasks', 'Analytics', 'Integrations', 'Changelog']

const SLIDES = [
  {
    title: 'Step Through. Work Smarter.',
    description: 'Plan, prioritize, and ship your work in one calm, beautiful workspace.',
  },
  {
    title: 'Focus On What Matters.',
    description: 'Filter the noise, surface what’s due, and keep momentum every single day.',
  },
  {
    title: 'Ship With Confidence.',
    description: 'Track progress, hit deadlines, and watch your completion rate climb in real time.',
  },
]

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const current = SLIDES[slide]

  const prev = () => setSlide((value) => (value - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setSlide((value) => (value + 1) % SLIDES.length)

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-white"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
          type="video/mp4"
        />
      </video>

      {/* Bottom blur overlay (no darkening) */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
        <Reveal delay={0}>
          <span className="text-lg font-semibold tracking-[0.22em] md:text-xl">TASKFLOW</span>
        </Reveal>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, index) => (
            <Reveal key={link} delay={0.1 + index * 0.05}>
              <a href="#" className="text-sm text-white/75 transition-colors hover:text-white">
                {link}
              </a>
            </Reveal>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Reveal delay={0.35} className="hidden sm:block">
            <button
              type="button"
              className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm md:px-6"
            >
              <LuSearch size={18} /> Search
            </button>
          </Reveal>
          <Reveal delay={0.4} className="hidden sm:block">
            <button
              type="button"
              aria-label="Account"
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full"
            >
              <LuUser size={18} />
            </button>
          </Reveal>
          <Reveal delay={0.35} className="lg:hidden">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="liquid-glass relative flex h-10 w-10 items-center justify-center rounded-full"
            >
              <LuMenu
                size={18}
                className={cn(
                  'absolute transition-all duration-500 ease-out',
                  menuOpen ? 'rotate-180 scale-50 opacity-0' : 'opacity-100',
                )}
              />
              <LuX
                size={18}
                className={cn(
                  'absolute transition-all duration-500 ease-out',
                  menuOpen ? 'opacity-100' : 'rotate-180 scale-50 opacity-0',
                )}
              />
            </button>
          </Reveal>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'absolute inset-x-0 top-[72px] z-40 border-y border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden',
          menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
        )}
      >
        <div className="flex flex-col p-3">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link}
              href="#"
              style={{ transitionDelay: `${index * 50}ms` }}
              className={cn(
                'rounded-lg px-3 py-3 text-sm text-white/80 transition-all hover:bg-gray-800/50 hover:text-white',
                menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
              )}
            >
              {link}
            </a>
          ))}
          <div className="mt-2 flex gap-2 border-t border-gray-800 pt-3 sm:hidden">
            <button
              type="button"
              className="liquid-glass flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm"
            >
              <LuSearch size={16} /> Search
            </button>
            <button
              type="button"
              aria-label="Account"
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full"
            >
              <LuUser size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end">
          <div className="flex-1">
            <Reveal delay={0.3}>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8">
                <span className="inline-flex items-center gap-2 font-medium">
                  <LuSparkles size={16} className="text-brand-300 sm:h-5 sm:w-5" /> Premium workspace
                </span>
                <span className="inline-flex items-center gap-2 text-white/75">
                  <LuZap size={16} /> Realtime sync
                </span>
                <span className="inline-flex items-center gap-2 text-white/75">
                  <LuCalendar size={16} /> 2026 edition
                </span>
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 30, filter: 'blur(16px)' }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.7, ease: EASE, delay: 0.1 },
                }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.3 } }}
              >
                <h1 className="mb-4 text-3xl font-normal tracking-[-0.04em] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                  {current.title}
                </h1>
                <p className="mb-6 max-w-2xl text-base text-gray-300 sm:text-lg md:mb-12 md:text-xl">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Reveal delay={0.6}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onEnter}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3"
                >
                  <LuPlay size={18} className="fill-black" /> Enter Dashboard
                </motion.button>
              </Reveal>
              <Reveal delay={0.7}>
                <button
                  type="button"
                  onClick={onEnter}
                  className="liquid-glass flex items-center gap-2 rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3"
                >
                  Learn More <LuArrowRight size={18} />
                </button>
              </Reveal>
            </div>
          </div>

          {/* Slide navigation */}
          <div className="flex gap-3">
            <Reveal delay={0.8}>
              <button
                type="button"
                aria-label="Previous"
                onClick={prev}
                className="liquid-glass flex items-center justify-center rounded-full px-4 py-2.5 sm:px-6 sm:py-3"
              >
                <LuChevronLeft size={18} />
              </button>
            </Reveal>
            <Reveal delay={0.9}>
              <button
                type="button"
                aria-label="Next"
                onClick={next}
                className="liquid-glass flex items-center justify-center rounded-full px-4 py-2.5 sm:px-6 sm:py-3"
              >
                <LuChevronRight size={18} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
