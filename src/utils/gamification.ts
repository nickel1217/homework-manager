import type { Exam, Homework, Reward, UserData } from '../types'

export interface AchievementDefinition {
  id: string
  icon: string
  title: string
  description: string
}

export interface LevelProgress {
  level: number
  nextLevel: number
  currentLevelPoints: number
  pointsToNextLevel: number
  progressPercent: number
}

export const LEVEL_STEP = 50

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first-homework',
    icon: '✏️',
    title: '作业起航',
    description: '完成第一项作业',
  },
  {
    id: 'homework-streak',
    icon: '🔥',
    title: '作业小能手',
    description: '累计完成 3 项作业',
  },
  {
    id: 'first-exam',
    icon: '📝',
    title: '考试初体验',
    description: '记录第一场考试',
  },
  {
    id: 'score-star',
    icon: '🌟',
    title: '高分闪耀',
    description: '获得一次 90% 以上的好成绩',
  },
  {
    id: 'points-hero',
    icon: '🏆',
    title: '积分达人',
    description: '累计获得 100 积分',
  },
]

export function calculateTotalPoints(homework: Homework[], exams: Exam[]): number {
  const homeworkPoints = homework
    .filter((item) => item.completed)
    .reduce((total, item) => total + item.points, 0)

  const examPoints = exams.reduce((total, item) => total + item.points, 0)

  return homeworkPoints + examPoints
}

export function calculateLevel(totalPoints: number): number {
  return Math.floor(totalPoints / LEVEL_STEP) + 1
}

export function calculateLevelProgress(totalPoints: number): LevelProgress {
  const level = calculateLevel(totalPoints)
  const currentLevelPoints = totalPoints % LEVEL_STEP
  const pointsToNextLevel = LEVEL_STEP - currentLevelPoints
  const progressPercent = Math.min((currentLevelPoints / LEVEL_STEP) * 100, 100)

  return {
    level,
    nextLevel: level + 1,
    currentLevelPoints,
    pointsToNextLevel,
    progressPercent,
  }
}

export function deriveAchievements(homework: Homework[], exams: Exam[], totalPoints: number): string[] {
  const completedHomeworkCount = homework.filter((item) => item.completed).length
  const hasHighScore = exams.some((item) => item.totalScore > 0 && item.score / item.totalScore >= 0.9)
  const unlocked: string[] = []

  if (completedHomeworkCount >= 1) {
    unlocked.push('first-homework')
  }

  if (completedHomeworkCount >= 3) {
    unlocked.push('homework-streak')
  }

  if (exams.length >= 1) {
    unlocked.push('first-exam')
  }

  if (hasHighScore) {
    unlocked.push('score-star')
  }

  if (totalPoints >= 100) {
    unlocked.push('points-hero')
  }

  return unlocked
}

export function buildUserData(homework: Homework[], exams: Exam[], rewards: Reward[]): UserData {
  const totalPoints = calculateTotalPoints(homework, exams)

  return {
    totalPoints,
    level: calculateLevel(totalPoints),
    achievements: deriveAchievements(homework, exams, totalPoints),
    homework,
    exams,
    rewards,
  }
}
