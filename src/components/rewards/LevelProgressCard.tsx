import { motion, useReducedMotion } from 'framer-motion'

import type { LevelProgress } from '../../utils/gamification'

interface LevelProgressCardProps {
  progress: LevelProgress
  accent?: 'amber' | 'rose'
}

const ACCENT_STYLES = {
  amber: {
    card: 'bg-white shadow-lg shadow-amber-100/80 ring-1 ring-amber-100',
    pill: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
    barTrack: 'bg-amber-50',
    barFill: 'bg-amber-400',
    value: 'text-amber-600',
  },
  rose: {
    card: 'bg-white shadow-lg shadow-rose-100/80 ring-1 ring-rose-100',
    pill: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
    barTrack: 'bg-rose-50',
    barFill: 'bg-rose-400',
    value: 'text-rose-600',
  },
} as const

function LevelProgressCard({ progress, accent = 'amber' }: LevelProgressCardProps) {
  const styles = ACCENT_STYLES[accent]
  const shouldReduceMotion = useReducedMotion()
  const levelTotalPoints = progress.currentLevelPoints + progress.pointsToNextLevel
  const clampedPercent = Math.max(0, Math.min(progress.progressPercent, 100))

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
      className={`rounded-3xl px-5 py-5 ${styles.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800">升级进度</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            再收集 {progress.pointsToNextLevel} 积分，就能升到 Lv.{progress.nextLevel} 啦！
          </p>
        </div>

        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${styles.pill}`}>
          Lv.{progress.level} → Lv.{progress.nextLevel}
        </span>
      </div>

      <div className="mt-5">
        <div className={`h-4 overflow-hidden rounded-full ${styles.barTrack}`}>
          <motion.div
            className={`h-full rounded-full ${styles.barFill}`}
            initial={shouldReduceMotion ? false : { width: 0 }}
            animate={shouldReduceMotion ? undefined : { width: `${clampedPercent}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            style={shouldReduceMotion ? { width: `${clampedPercent}%` } : undefined}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-sm font-medium text-slate-500">
          <span>
            本级积分 <span className={`font-black ${styles.value}`}>{progress.currentLevelPoints}</span> /{' '}
            {levelTotalPoints}
          </span>
          <motion.span
            key={Math.round(clampedPercent)}
            initial={shouldReduceMotion ? false : { opacity: 0.5, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
          >
            {Math.round(clampedPercent)}%
          </motion.span>
        </div>
      </div>
    </motion.section>
  )
}

export default LevelProgressCard
