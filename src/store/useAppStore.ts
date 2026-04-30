import type { UserData, AppRole } from '../types'
import { defaultUserData } from '../utils/defaultUserData'
import { create } from 'zustand'

interface AppState {
  role: AppRole
  userData: UserData
  setRole: (role: AppRole) => void
  setUserData: (data: UserData) => void
  resetAppState: () => void
}

export const useAppStore = create<AppState>((set) => ({
  role: 'child',
  userData: defaultUserData,
  setRole: (role) => set({ role }),
  setUserData: (userData) => set({ userData }),
  resetAppState: () => set({ role: 'child', userData: defaultUserData }),
}))
