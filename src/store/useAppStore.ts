import type { UserData, AppRole } from '../types'
import { readJsonFile, upsertJsonFile } from '../services/github'
import { buildUserData } from '../utils/gamification'
import { defaultUserData } from '../utils/defaultUserData'
import { create } from 'zustand'

interface AppState {
  role: AppRole
  userData: UserData
  loading: boolean
  error: string | null
  hydrated: boolean
  summaryLoaded: boolean
  setRole: (role: AppRole) => void
  setUserData: (data: UserData) => void
  loadUserData: () => Promise<void>
  syncHomeworkRecords: (items: UserData['homework'], monthKey: string, shouldPersist?: boolean) => Promise<void>
  syncExamRecords: (items: UserData['exams'], yearKey: string, shouldPersist?: boolean) => Promise<void>
  clearError: () => void
  resetAppState: () => void
}

const USER_DATA_PATH = 'data/user.json'

function mergeHomeworkByMonth(existingItems: UserData['homework'], nextItems: UserData['homework'], monthKey: string) {
  const remainingItems = existingItems.filter((item) => item.date.slice(0, 7) !== monthKey)
  return [...remainingItems, ...nextItems]
}

function mergeExamsByYear(existingItems: UserData['exams'], nextItems: UserData['exams'], yearKey: string) {
  const remainingItems = existingItems.filter((item) => item.date.slice(0, 4) !== yearKey)
  return [...remainingItems, ...nextItems]
}

export const useAppStore = create<AppState>((set) => ({
  role: 'child',
  userData: defaultUserData,
  loading: false,
  error: null,
  hydrated: false,
  summaryLoaded: false,
  setRole: (role) => set({ role }),
  setUserData: (userData) => set({ userData }),
  loadUserData: async () => {
    set({ loading: true, error: null })

    try {
      const userData = await readJsonFile<UserData>(USER_DATA_PATH)
      set({ userData: userData ?? defaultUserData, hydrated: true, summaryLoaded: true })
    } catch {
      set({ error: '成长数据加载失败，先使用本地默认状态。', hydrated: true, summaryLoaded: false })
    } finally {
      set({ loading: false })
    }
  },
  syncHomeworkRecords: async (items, monthKey, shouldPersist = true) => {
    const state = useAppStore.getState()

    if (!state.hydrated) {
      await state.loadUserData()
    }

    const latestState = useAppStore.getState()

    if (!latestState.summaryLoaded) {
      if (shouldPersist) {
        set({ error: '成长汇总暂时无法同步，请稍后再试。' })
      }

      return
    }

    if (!shouldPersist) {
      const homework = mergeHomeworkByMonth(latestState.userData.homework, items, monthKey)
      const nextUserData = buildUserData(homework, latestState.userData.exams, latestState.userData.rewards)

      set({ userData: nextUserData })
      return
    }

    let remoteUserData: UserData

    try {
      remoteUserData = (await readJsonFile<UserData>(USER_DATA_PATH)) ?? latestState.userData
    } catch {
      set({ error: '成长汇总暂时无法同步，请稍后再试。' })
      return
    }

    const homework = mergeHomeworkByMonth(remoteUserData.homework, items, monthKey)
    const nextUserData = buildUserData(homework, remoteUserData.exams, remoteUserData.rewards)

    set({ userData: nextUserData })

    try {
      await upsertJsonFile(USER_DATA_PATH, nextUserData, '更新成长数据：作业积分')
    } catch {
      set({ error: '成长数据保存失败，但作业记录已经更新。' })
    }
  },
  syncExamRecords: async (items, yearKey, shouldPersist = true) => {
    const state = useAppStore.getState()

    if (!state.hydrated) {
      await state.loadUserData()
    }

    const latestState = useAppStore.getState()

    if (!latestState.summaryLoaded) {
      if (shouldPersist) {
        set({ error: '成长汇总暂时无法同步，请稍后再试。' })
      }

      return
    }

    if (!shouldPersist) {
      const exams = mergeExamsByYear(latestState.userData.exams, items, yearKey)
      const nextUserData = buildUserData(latestState.userData.homework, exams, latestState.userData.rewards)

      set({ userData: nextUserData })
      return
    }

    let remoteUserData: UserData

    try {
      remoteUserData = (await readJsonFile<UserData>(USER_DATA_PATH)) ?? latestState.userData
    } catch {
      set({ error: '成长汇总暂时无法同步，请稍后再试。' })
      return
    }

    const exams = mergeExamsByYear(remoteUserData.exams, items, yearKey)
    const nextUserData = buildUserData(remoteUserData.homework, exams, remoteUserData.rewards)

    set({ userData: nextUserData })

    try {
      await upsertJsonFile(USER_DATA_PATH, nextUserData, '更新成长数据：考试积分')
    } catch {
      set({ error: '成长数据保存失败，但考试记录已经更新。' })
    }
  },
  clearError: () => set({ error: null }),
  resetAppState: () =>
    set({ role: 'child', userData: defaultUserData, loading: false, error: null, hydrated: false, summaryLoaded: false }),
}))
