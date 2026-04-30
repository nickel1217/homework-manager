import type { Homework } from './homework'
import type { Exam } from './exam'
import type { Reward } from './reward'

export type AppRole = 'child' | 'parent'

export interface UserData {
  totalPoints: number
  level: number
  achievements: string[]
  homework: Homework[]
  exams: Exam[]
  rewards: Reward[]
}

export type { Homework, Exam, Reward }
