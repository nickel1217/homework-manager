import { useCallback, useEffect, useState } from 'react'
import { useHomeworkStore } from '../store/useHomeworkStore'
import Timer from '../components/homework/Timer'
import HomeworkForm from '../components/homework/HomeworkForm'
import HomeworkList from '../components/homework/HomeworkList'

function HomeworkPage() {
  const { items, loading, error, loadHomework, addHomework, toggleCompleted, clearError } =
    useHomeworkStore()
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    loadHomework()
  }, [loadHomework])

  const handleTimerStop = useCallback((minutes: number) => {
    setDuration(minutes)
  }, [])

  const handleSave = useCallback(
    async (subject: string, content: string, dur: number, imageUrl?: string) => {
      await addHomework(subject, content, dur, imageUrl)
      setDuration(0)
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

      <Timer onStop={handleTimerStop} />

      {duration > 0 && (
        <div className="rounded-2xl bg-sky-50 px-4 py-3 text-center text-sm font-bold text-sky-700 ring-1 ring-sky-200">
          ⏱ 已计时 {duration} 分钟，现在记录这次作业吧！
        </div>
      )}

      <div className="rounded-3xl bg-white p-6 shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100">
        <h2 className="mb-4 text-xl font-black text-slate-800">记录作业</h2>
        <HomeworkForm onSave={handleSave} duration={duration} />
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
