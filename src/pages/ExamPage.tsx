import { useCallback, useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useExamStore } from '../store/useExamStore'
import ExamForm from '../components/exam/ExamForm'
import ExamList from '../components/exam/ExamList'

function ExamPage() {
  const { hydrated, loadUserData } = useAppStore()
  const { items, loading, error, loadExams, addExam, clearError } = useExamStore()

  useEffect(() => {
    if (!hydrated) {
      loadUserData()
    }
  }, [hydrated, loadUserData])

  useEffect(() => {
    loadExams()
  }, [loadExams])

  const handleSave = useCallback(
    async (subject: string, score: number, totalScore: number, date: string) => {
      await addExam(subject, score, totalScore, date)
    },
    [addExam],
  )

  const handleRefresh = useCallback(() => {
    clearError()
    loadExams()
  }, [clearError, loadExams])

  return (
    <div className="mx-auto max-w-md space-y-6 pb-8">
      <header className="text-center">
        <h1 className="text-3xl font-black text-slate-800">📝 考试小本本</h1>
        <p className="mt-1 text-sm text-slate-500">记录每一次进步，稳稳冲刺好成绩！</p>
      </header>

      <div className="rounded-3xl bg-white p-6 shadow-lg shadow-emerald-100/80 ring-1 ring-emerald-100">
        <h2 className="mb-4 text-xl font-black text-slate-800">记录成绩</h2>
        <ExamForm onSave={handleSave} />
      </div>

      <ExamList
        items={items}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
      />
    </div>
  )
}

export default ExamPage
