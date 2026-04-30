import type { Homework } from '../types'
import { readJsonFile, upsertJsonFile } from '../services/github'
import { useAppStore } from './useAppStore'
import { generateId } from '../utils/id'
import { getHomeworkPath, getCurrentMonthKey, getTodayISO } from '../utils/date'
import { create } from 'zustand'

interface HomeworkState {
  items: Homework[]
  loading: boolean
  error: string | null
  loadHomework: (monthKey?: string) => Promise<void>
  addHomework: (subject: string, content: string, imageUrl?: string) => Promise<Homework>
  updateHomeworkDuration: (id: string, duration: number) => Promise<void>
  toggleCompleted: (id: string) => Promise<void>
  clearError: () => void
}

function getMonthKeyFromDate(date: string): string {
  return date.slice(0, 7)
}

export const useHomeworkStore = create<HomeworkState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  loadHomework: async (monthKey) => {
    set({ loading: true, error: null })

    try {
      const targetMonthKey = monthKey ?? getCurrentMonthKey()
      const path = getHomeworkPath(targetMonthKey)
      const items = await readJsonFile<Homework[]>(path)
      const nextItems = items ?? []

      set({ items: nextItems })
      await useAppStore.getState().syncHomeworkRecords(nextItems, targetMonthKey, false)
    } catch {
      set({ error: '加载作业失败，请检查网络后重试。' })
    } finally {
      set({ loading: false })
    }
  },

  addHomework: async (subject, content, imageUrl) => {
    const previousItems = get().items
    const newHomework: Homework = {
      id: generateId(),
      subject,
      content,
      duration: 0,
      imageUrl,
      date: getTodayISO(),
      completed: false,
      points: 10,
    }
    const updatedItems = [...previousItems, newHomework]
    const path = getHomeworkPath(getCurrentMonthKey())

    set({ items: updatedItems, loading: true, error: null })

    try {
      await upsertJsonFile(path, updatedItems, `新增作业记录 ${newHomework.subject}`)
      await useAppStore.getState().syncHomeworkRecords(updatedItems, getCurrentMonthKey())
      return newHomework
    } catch {
      set({ items: previousItems, error: '保存作业失败，请检查网络后重试。' })
      throw new Error('保存作业失败，请检查网络后重试。')
    } finally {
      set({ loading: false })
    }
  },

  updateHomeworkDuration: async (id, duration) => {
    const previousItems = get().items
    const updatedItems = previousItems.map((item) =>
      item.id === id
        ? {
            ...item,
            duration,
          }
        : item,
    )

    const targetItem = updatedItems.find((item) => item.id === id)

    if (!targetItem) {
      return
    }

    const path = getHomeworkPath(getMonthKeyFromDate(targetItem.date))

    set({ items: updatedItems, loading: true, error: null })

    try {
      await upsertJsonFile(path, updatedItems, `更新作业时长 ${targetItem.subject}`)
      await useAppStore.getState().syncHomeworkRecords(updatedItems, getMonthKeyFromDate(targetItem.date))
    } catch {
      set({ items: previousItems, error: '更新作业时长失败，请稍后重试。' })
      throw new Error('更新作业时长失败，请稍后重试。')
    } finally {
      set({ loading: false })
    }
  },

  toggleCompleted: async (id) => {
    const previousItems = get().items
    const updatedItems = previousItems.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item,
    )

    const targetItem = updatedItems.find((item) => item.id === id)

    if (!targetItem) {
      return
    }

    const path = getHomeworkPath(getMonthKeyFromDate(targetItem.date))

    set({ items: updatedItems, loading: true, error: null })

    try {
      await upsertJsonFile(path, updatedItems, `更新作业状态 ${targetItem.subject}`)
      await useAppStore.getState().syncHomeworkRecords(updatedItems, getMonthKeyFromDate(targetItem.date))
    } catch {
      set({ items: previousItems, error: '更新作业状态失败，请稍后重试。' })
    } finally {
      set({ loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
