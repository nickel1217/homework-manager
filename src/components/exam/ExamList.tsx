import type { Exam } from '../../types'
import { formatDateDisplay } from '../../utils/date'

interface ExamListProps {
  items: Exam[]
  loading: boolean
  error: string | null
  onRefresh: () => void
}

const SUBJECT_STYLES: Record<string, string> = {
  语文: 'bg-red-100 text-red-600 ring-red-200',
  数学: 'bg-blue-100 text-blue-600 ring-blue-200',
  英语: 'bg-purple-100 text-purple-600 ring-purple-200',
  科学: 'bg-green-100 text-green-600 ring-green-200',
  其他: 'bg-slate-100 text-slate-600 ring-slate-200',
}

function getSubjectBadgeClassName(subject: string): string {
  return SUBJECT_STYLES[subject] ?? SUBJECT_STYLES.其他
}

function getScoreTone(percentage: number): {
  textClassName: string
  barClassName: string
  badgeClassName: string
} {
  if (percentage >= 90) {
    return {
      textClassName: 'text-emerald-600',
      barClassName: 'bg-emerald-400',
      badgeClassName: 'bg-emerald-100 text-emerald-600 ring-emerald-200',
    }
  }

  if (percentage >= 80) {
    return {
      textClassName: 'text-sky-600',
      barClassName: 'bg-sky-400',
      badgeClassName: 'bg-sky-100 text-sky-600 ring-sky-200',
    }
  }

  if (percentage >= 60) {
    return {
      textClassName: 'text-amber-600',
      barClassName: 'bg-amber-400',
      badgeClassName: 'bg-amber-100 text-amber-700 ring-amber-200',
    }
  }

  return {
    textClassName: 'text-rose-600',
    barClassName: 'bg-rose-400',
    badgeClassName: 'bg-rose-100 text-rose-600 ring-rose-200',
  }
}

function getStars(percentage: number): string {
  if (percentage >= 95) {
    return '⭐⭐⭐'
  }

  if (percentage >= 90) {
    return '⭐⭐'
  }

  if (percentage >= 85) {
    return '⭐'
  }

  return ''
}

function ExamList({ items, loading, error, onRefresh }: ExamListProps) {
  const sortedItems = [...items].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-4 shadow-lg shadow-emerald-100/80 ring-1 ring-emerald-100">
          <div>
            <h2 className="text-xl font-black text-slate-800">考试记录</h2>
            <p className="mt-1 text-sm text-slate-500">老师的小本本正在赶来～</p>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600 ring-1 ring-emerald-200 transition hover:bg-emerald-200"
            onClick={onRefresh}
            type="button"
            aria-label="刷新考试记录"
          >
            🔄
          </button>
        </div>

        <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl bg-white px-6 py-10 text-center shadow-lg shadow-sky-100/80 ring-1 ring-sky-100">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-sky-100 border-t-sky-500 text-lg">
            📚
          </div>
          <p className="mt-4 text-lg font-bold text-slate-700">加载中...</p>
          <p className="mt-2 text-sm text-slate-500">马上就能看到你的成绩啦！</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-4 shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
          <div>
            <h2 className="text-xl font-black text-slate-800">考试记录</h2>
            <p className="mt-1 text-sm text-slate-500">点一下刷新，再试一次吧。</p>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-200"
            onClick={onRefresh}
            type="button"
            aria-label="刷新考试记录"
          >
            🔄
          </button>
        </div>

        <div className="rounded-3xl bg-rose-50 px-5 py-6 text-center shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl">💌</div>
          <p className="mt-4 text-lg font-bold text-rose-600">出了点小状况，先别着急～</p>
          <p className="mt-2 text-sm leading-6 text-rose-500">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-4 shadow-lg shadow-emerald-100/80 ring-1 ring-emerald-100">
        <div>
          <h2 className="text-xl font-black text-slate-800">考试记录</h2>
          <p className="mt-1 text-sm text-slate-500">最近的成绩会排在最上面哦。</p>
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600 ring-1 ring-emerald-200 transition hover:bg-emerald-200"
          onClick={onRefresh}
          type="button"
          aria-label="刷新考试记录"
        >
          🔄
        </button>
      </div>

      {sortedItems.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-10 text-center shadow-lg shadow-amber-100/80 ring-1 ring-amber-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
            🏆
          </div>
          <p className="mt-5 text-2xl font-black text-slate-800">还没有考试记录～加油！</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">先认真完成第一场考试记录，星星成绩就在前面等你啦 ✨</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => {
            const percentage = item.totalScore > 0 ? (item.score / item.totalScore) * 100 : 0
            const safePercentage = Math.max(0, Math.min(percentage, 100))
            const scoreTone = getScoreTone(safePercentage)
            const stars = getStars(safePercentage)

            return (
              <article
                key={item.id}
                className="rounded-3xl bg-white px-5 py-5 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 ${getSubjectBadgeClassName(item.subject)}`}
                    >
                      {item.subject}
                    </span>
                    <div>
                      <p className={`text-4xl font-black tracking-tight ${scoreTone.textClassName}`}>
                        {item.score}/{item.totalScore}
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        得分率 {Math.round(safePercentage)}%
                        {stars ? <span className="ml-2">{stars}</span> : null}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 ${scoreTone.badgeClassName}`}
                    >
                      成绩状态
                    </span>
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
                      +{item.points} 积分
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-[width] duration-300 ${scoreTone.barClassName}`}
                      style={{ width: `${safePercentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-slate-500">
                  <span>📅 {formatDateDisplay(item.date)}</span>
                  <span>继续努力，越来越棒！</span>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ExamList
