import type { Reward } from '../../types'

interface RewardsShelfProps {
  rewards: Reward[]
  totalPoints: number
}

function RewardsShelf({ rewards, totalPoints }: RewardsShelfProps) {
  if (rewards.length === 0) {
    return (
      <section className="rounded-3xl bg-white px-5 py-6 shadow-lg shadow-amber-100/80 ring-1 ring-amber-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-3xl ring-4 ring-amber-50">
          🎁
        </div>
        <h2 className="mt-4 text-center text-2xl font-black text-slate-800">奖励清单正在准备中</h2>
        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          先把积分小口袋装满，喜欢的小奖励很快就会住进这里啦！
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-3xl bg-white px-5 py-5 shadow-lg shadow-amber-100/80 ring-1 ring-amber-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800">奖励清单</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">看看现在的积分能点亮哪些心愿吧。</p>
        </div>

        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
          {rewards.length} 个奖励
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {rewards.map((reward) => {
          const canAfford = totalPoints >= reward.cost
          const remainingPoints = Math.max(reward.cost - totalPoints, 0)

          return (
            <article
              key={reward.id}
              className="flex items-center gap-4 rounded-3xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl ring-4 ring-amber-100">
                {reward.icon || '🎁'}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black text-slate-800">{reward.name}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">需要 {reward.cost} 积分</p>
                  </div>

                  <span
                    className={
                      reward.redeemed
                        ? 'inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200'
                        : canAfford
                          ? 'inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200'
                          : 'inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200'
                    }
                  >
                    {reward.redeemed ? '已兑换' : canAfford ? '积分够啦' : `还差 ${remainingPoints}`}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default RewardsShelf
