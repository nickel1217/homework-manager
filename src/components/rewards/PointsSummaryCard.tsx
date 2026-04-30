interface SummaryStat {
  label: string
  value: string
}

interface PointsSummaryCardProps {
  title: string
  description: string
  icon: string
  totalPoints: number
  level: number
  accent?: 'amber' | 'rose'
  summaryStats?: SummaryStat[]
}

const ACCENT_STYLES = {
  amber: {
    card: 'bg-gradient-to-br from-amber-100 via-white to-yellow-50 shadow-lg shadow-amber-100/80 ring-1 ring-amber-100',
    icon: 'bg-white text-amber-500 ring-4 ring-amber-100',
    eyebrow: 'text-amber-600',
    levelBadge: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
    statCard: 'bg-white/90 ring-1 ring-amber-100',
    statValue: 'text-amber-600',
  },
  rose: {
    card: 'bg-gradient-to-br from-rose-100 via-white to-fuchsia-50 shadow-lg shadow-rose-100/80 ring-1 ring-rose-100',
    icon: 'bg-white text-rose-500 ring-4 ring-rose-100',
    eyebrow: 'text-rose-600',
    levelBadge: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
    statCard: 'bg-white/90 ring-1 ring-rose-100',
    statValue: 'text-rose-600',
  },
} as const

function PointsSummaryCard({
  title,
  description,
  icon,
  totalPoints,
  level,
  accent = 'amber',
  summaryStats = [],
}: PointsSummaryCardProps) {
  const styles = ACCENT_STYLES[accent]

  return (
    <section className={`rounded-3xl px-5 py-5 ${styles.card}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-sm font-black tracking-wide ${styles.eyebrow}`}>{title}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">{totalPoints} 积分</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className={`flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${styles.icon}`}>
            {icon}
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${styles.levelBadge}`}>
            Lv.{level}
          </span>
        </div>
      </div>

      {summaryStats.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {summaryStats.map((item) => (
            <div key={item.label} className={`rounded-2xl px-4 py-3 ${styles.statCard}`}>
              <p className="text-xs font-bold tracking-wide text-slate-500">{item.label}</p>
              <p className={`mt-2 text-lg font-black ${styles.statValue}`}>{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default PointsSummaryCard
