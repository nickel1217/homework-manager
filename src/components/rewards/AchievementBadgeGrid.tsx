import { ACHIEVEMENT_DEFINITIONS } from '../../utils/gamification'

interface AchievementBadgeGridProps {
  unlockedIds: string[]
  title?: string
  description?: string
  accent?: 'amber' | 'rose'
}

const ACCENT_STYLES = {
  amber: {
    card: 'bg-white shadow-lg shadow-amber-100/80 ring-1 ring-amber-100',
    accent: 'text-amber-600',
    count: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
    unlockedTile: 'bg-amber-50 ring-1 ring-amber-100',
    unlockedIcon: 'bg-white ring-4 ring-amber-100',
    unlockedStatus: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  },
  rose: {
    card: 'bg-white shadow-lg shadow-rose-100/80 ring-1 ring-rose-100',
    accent: 'text-rose-600',
    count: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
    unlockedTile: 'bg-rose-50 ring-1 ring-rose-100',
    unlockedIcon: 'bg-white ring-4 ring-rose-100',
    unlockedStatus: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  },
} as const

function AchievementBadgeGrid({
  unlockedIds,
  title = '成就徽章',
  description = '每一枚徽章都在记录你的成长闪光点。',
  accent = 'amber',
}: AchievementBadgeGridProps) {
  const styles = ACCENT_STYLES[accent]
  const unlockedSet = new Set(unlockedIds)
  const unlockedCount = ACHIEVEMENT_DEFINITIONS.filter((item) => unlockedSet.has(item.id)).length

  return (
    <section className={`rounded-3xl px-5 py-5 ${styles.card}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${styles.count}`}>
          {unlockedCount}/{ACHIEVEMENT_DEFINITIONS.length}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {ACHIEVEMENT_DEFINITIONS.map((achievement) => {
          const unlocked = unlockedSet.has(achievement.id)

          return (
            <article
              key={achievement.id}
              className={
                unlocked
                  ? `rounded-3xl px-4 py-4 ${styles.unlockedTile}`
                  : 'rounded-3xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200'
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={
                    unlocked
                      ? `flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${styles.unlockedIcon}`
                      : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl ring-1 ring-slate-200 grayscale'
                  }
                >
                  {achievement.icon}
                </div>

                <span
                  className={
                    unlocked
                      ? `inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles.unlockedStatus}`
                      : 'inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-500'
                  }
                >
                  {unlocked ? '已解锁' : '未解锁'}
                </span>
              </div>

              <h3 className={`mt-4 text-base font-black ${unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                {achievement.title}
              </h3>
              <p className={`mt-2 text-sm leading-6 ${unlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                {achievement.description}
              </p>
            </article>
          )
        })}
      </div>

      {unlockedCount === 0 ? (
        <p className={`mt-4 text-sm font-bold ${styles.accent}`}>先完成一项作业，就能点亮第一枚徽章啦！</p>
      ) : null}
    </section>
  )
}

export default AchievementBadgeGrid
