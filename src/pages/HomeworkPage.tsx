import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { useAppStore } from '../store/useAppStore'
import { useHomeworkStore } from '../store/useHomeworkStore'
import Timer from '../components/homework/Timer'
import HomeworkForm from '../components/homework/HomeworkForm'
import HomeworkList from '../components/homework/HomeworkList'

function HomeworkPage() {
  const { hydrated, loadUserData } = useAppStore()
  const { items, loading, error, loadHomework, addHomework, updateHomeworkDuration, toggleCompleted, clearError } =
    useHomeworkStore()
  const [activeHomeworkId, setActiveHomeworkId] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!hydrated) {
      loadUserData()
    }
  }, [hydrated, loadUserData])

  useEffect(() => {
    loadHomework()
  }, [loadHomework])

  const handleTimerStop = useCallback((minutes: number) => {
    if (!activeHomeworkId) {
      return
    }

    updateHomeworkDuration(activeHomeworkId, minutes)
      .then(() => {
        setActiveHomeworkId(null)
      })
      .catch(() => {
        // store already surfaces user-friendly error state
      })
  }, [activeHomeworkId, updateHomeworkDuration])

  const handleSave = useCallback(
    async (subject: string, content: string, imageUrl?: string) => {
      const newHomework = await addHomework(subject, content, imageUrl)
      setActiveHomeworkId(newHomework.id)
    },
    [addHomework],
  )

  const handleRefresh = useCallback(() => {
    clearError()
    loadHomework()
  }, [clearError, loadHomework])

  return (
    <div className="mx-auto max-w-md space-y-6 pb-8">
      <header className="text-center">
        <h1 className="text-3xl font-black text-slate-800">✏️ 作业小站</h1>
        <p className="mt-1 text-sm text-slate-500">计时、记录、完成，每天进步一点点！</p>
      </header>

      {activeHomeworkId ? <Timer key={activeHomeworkId} onStop={handleTimerStop} /> : null}

      <AnimatePresence initial={false}>
        {activeHomeworkId ? (
          <motion.div
            key={activeHomeworkId}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
            className="rounded-2xl bg-sky-50 px-4 py-3 text-center text-sm font-bold text-sky-700 ring-1 ring-sky-200"
          >
            ⏱ 作业已创建，现在开始为这条作业计时吧！
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="rounded-3xl bg-white p-6 shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100">
        <h2 className="mb-4 text-xl font-black text-slate-800">记录作业</h2>
        <HomeworkForm onSave={handleSave} />
      </div>

      <HomeworkList
        items={items}
        loading={loading}
        error={error}
        onToggleComplete={toggleCompleted}
        onRefresh={handleRefresh}
      />
    </div>
  )
}

export default HomeworkPage
