import type { Exam } from '../types'
import { readJsonFile, upsertJsonFile } from '../services/github'
import { useAppStore } from './useAppStore'
import { generateId } from '../utils/id'
import { getExamPath, getCurrentYearKey, getTodayISO } from '../utils/date'
import { create } from 'zustand'

interface ExamState {
  items: Exam[]
  loading: boolean
  error: string | null
  loadExams: (yearKey?: string) => Promise<void>
  addExam: (subject: string, score: number, totalScore: number, date?: string) => Promise<void>
  clearError: () => void
}

function calculateExamPoints(score: number, totalScore: number): number {
  const ratio = totalScore > 0 ? score / totalScore : 0

  if (ratio >= 0.9) {
    return 20
  }

  if (ratio >= 0.8) {
    return 15
  }

  if (ratio >= 0.6) {
    return 10
  }

  return 5
}

export const useExamStore = create<ExamState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  loadExams: async (yearKey?: string) => {
    set({ loading: true, error: null })

    try {
      const targetYearKey = yearKey ?? getCurrentYearKey()
      const path = getExamPath(targetYearKey)
      const items = await readJsonFile<Exam[]>(path)
      const nextItems = items ?? []

      set({ items: nextItems, loading: false })
      await useAppStore.getState().syncExamRecords(nextItems, targetYearKey, false)
    } catch (error) {
      console.error('加载考试记录失败', error)
      set({ error: '加载考试记录失败，请稍后重试', loading: false })
    }
  },
  addExam: async (subject: string, score: number, totalScore: number, date?: string) => {
    set({ loading: true, error: null })

    try {
      const examDate = date ?? getTodayISO()
      const yearKey = examDate.slice(0, 4) || getCurrentYearKey()
      const newExam: Exam = {
        id: generateId(),
        subject,
        score,
        totalScore,
        date: examDate,
        points: calculateExamPoints(score, totalScore),
      }

      const currentItems = get().items
      const nextItems = [...currentItems, newExam]
      const path = getExamPath(yearKey)

      await upsertJsonFile<Exam[]>(path, nextItems, `更新 ${yearKey} 考试记录`)
      await useAppStore.getState().syncExamRecords(nextItems, yearKey)
      set({ items: nextItems, loading: false })
    } catch (error) {
      console.error('保存考试记录失败', error)
      set({ error: '保存考试记录失败，请检查网络后重试', loading: false })
    }
  },
  clearError: () => set({ error: null }),
}))
