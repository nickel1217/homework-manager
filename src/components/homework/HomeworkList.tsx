import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import type { Homework } from '../../types'
import HomeworkCard from './HomeworkCard'

interface HomeworkListProps {
  items: Homework[]
  loading: boolean
  error: string | null
  onToggleComplete: (id: string) => void
  onRefresh: () => void
}

function HomeworkList({ items, loading, error, onToggleComplete, onRefresh }: HomeworkListProps) {
  const shouldReduceMotion = useReducedMotion()
  const sortedItems = useMemo(
    () =>
      [...items].sort((leftItem, rightItem) => {
        return new Date(rightItem.date).getTime() - new Date(leftItem.date).getTime()
      }),
    [items],
  )

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
      className="mx-auto w-full max-w-md space-y-4"
    >
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-lg shadow-indigo-100/70 ring-1 ring-indigo-100">
        <div>
          <h2 className="text-xl font-black text-slate-800">作业记录</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">把今天的小任务一项项完成吧！</p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl text-indigo-600 transition hover:bg-indigo-200 active:scale-95"
          aria-label="刷新作业记录"
        >
          🔄
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="loading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            className="rounded-2xl bg-white px-6 py-10 text-center shadow-lg shadow-sky-100/70 ring-1 ring-sky-100"
          >
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sky-100 border-t-sky-500" />
            <p className="mt-4 text-base font-bold text-slate-700">正在努力加载作业中...</p>
          </motion.div>
        ) : null}

        {!loading && error ? (
          <motion.div
            key="error"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            className="rounded-2xl bg-red-50 px-6 py-8 text-center shadow-lg shadow-red-100/70 ring-1 ring-red-200"
          >
            <div className="text-4xl">😵</div>
            <p className="mt-3 text-lg font-black text-red-600">糟糕，作业记录没有加载出来</p>
            <p className="mt-2 text-sm font-medium leading-6 text-red-500">{error}</p>
          </motion.div>
        ) : null}

        {!loading && !error && sortedItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            className="rounded-2xl bg-white px-6 py-10 text-center shadow-lg shadow-indigo-100/70 ring-1 ring-indigo-100"
          >
            <div className="text-5xl">📚</div>
            <p className="mt-4 text-xl font-black text-slate-800">还没有作业记录哦～</p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">写下第一条任务，今天的学习冒险就开始啦！</p>
          </motion.div>
        ) : null}

        {!loading && !error && sortedItems.length > 0 ? (
          <motion.div
            key="list"
            layout
            className="space-y-3"
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'show'}
            variants={
              shouldReduceMotion
                ? undefined
                : {
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.04,
                      },
                    },
                  }
            }
          >
            {sortedItems.map((homework) => (
              <motion.div
                key={homework.id}
                layout
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0 },
                      }
                }
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
              >
                <HomeworkCard homework={homework} onToggleComplete={onToggleComplete} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  )
}

export default HomeworkList
