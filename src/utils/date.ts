/** 获取当前月份路径键，如 "2026-05" */
export function getCurrentMonthKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

/** 获取当前年份字符串，如 "2026" */
export function getCurrentYearKey(): string {
  return String(new Date().getFullYear())
}

/** 获取作业数据文件路径 */
export function getHomeworkPath(monthKey?: string): string {
  const key = monthKey || getCurrentMonthKey()
  return `data/homework/${key}.json`
}

/** 获取考试数据文件路径 */
export function getExamPath(yearKey?: string): string {
  const key = yearKey || getCurrentYearKey()
  return `data/exams/${key}.json`
}

/** 格式化日期为中文友好显示，如 "5月1日" */
export function formatDateDisplay(isoDate: string): string {
  const date = new Date(isoDate)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

/** 格式化时长（分钟）为友好显示 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`
}

/** 获取当前 ISO 日期字符串 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}
