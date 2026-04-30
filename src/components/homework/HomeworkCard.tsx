import { motion, useReducedMotion } from 'framer-motion'

import type { Homework } from '../../types'
import { formatDateDisplay, formatDuration } from '../../utils/date'

interface HomeworkCardProps {
  homework: Homework
  onToggleComplete: (id: string) => void
}

const subjectBadgeClassNames: Record<string, string> = {
  语文: 'bg-red-100 text-red-600 ring-1 ring-red-200',
  数学: 'bg-blue-100 text-blue-600 ring-1 ring-blue-200',
  英语: 'bg-purple-100 text-purple-600 ring-1 ring-purple-200',
  科学: 'bg-green-100 text-green-600 ring-1 ring-green-200',
  其他: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
}

const joinClasses = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter((value): value is string => Boolean(value)).join(' ')

function getSubjectBadgeClassName(subject: string): string {
  return subjectBadgeClassNames[subject] ?? subjectBadgeClassNames.其他
}

function truncateContent(content: string, maxLength = 50): string {
  if (content.length <= maxLength) {
    return content
  }

  return `${content.slice(0, maxLength).trimEnd()}…`
}

function HomeworkCard({ homework, onToggleComplete }: HomeworkCardProps) {
  const isCompleted = homework.completed
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      layout
      initial={false}
      animate={{
        opacity: 1,
        scale: shouldReduceMotion ? 1 : isCompleted ? 1.01 : 1,
        y: 0,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 24 }
      }
      className={joinClasses(
        'rounded-2xl p-5 shadow-lg transition-colors',
        isCompleted
          ? 'bg-emerald-50 ring-2 ring-emerald-200 shadow-emerald-100/80'
          : 'bg-white ring-1 ring-slate-200 shadow-slate-200/70',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={joinClasses(
                'inline-flex rounded-full px-3 py-1 text-sm font-bold',
                getSubjectBadgeClassName(homework.subject),
              )}
            >
              {homework.subject}
            </span>
            {isCompleted ? (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 320, damping: 20 }
                }
                className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200"
              >
                <span aria-hidden="true">✅</span>
                已完成
              </motion.span>
            ) : null}
          </div>

          <p
            className={joinClasses(
              'mt-3 text-lg font-black leading-7 text-slate-800',
              isCompleted && 'text-slate-500 line-through',
            )}
          >
            {truncateContent(homework.content)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">⏱ {formatDuration(homework.duration)}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">📅 {formatDateDisplay(homework.date)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleComplete(homework.id)}
          aria-pressed={isCompleted}
          aria-label={isCompleted ? '标记为未完成' : '标记为已完成'}
          className={joinClasses(
            'inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl px-4 py-3 text-sm font-black transition active:scale-95',
            isCompleted
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-400'
              : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 hover:bg-slate-200',
          )}
        >
          {isCompleted ? '✅ 已完成' : '☐ 去完成'}
        </button>
      </div>
    </motion.article>
  )
}

export default HomeworkCard
