import { useEffect } from 'react'

import AchievementBadgeGrid from '../components/rewards/AchievementBadgeGrid'
import LevelProgressCard from '../components/rewards/LevelProgressCard'
import PointsSummaryCard from '../components/rewards/PointsSummaryCard'
import RewardsShelf from '../components/rewards/RewardsShelf'
import { useAppStore } from '../store/useAppStore'
import { calculateLevelProgress } from '../utils/gamification'

function RewardsPage() {
  const { userData, hydrated, loading, error, loadUserData, clearError } = useAppStore()

  useEffect(() => {
    if (!hydrated) {
      loadUserData()
    }
  }, [hydrated, loadUserData])

  const totalPoints = userData.totalPoints ?? 0
  const level = userData.level ?? 1
  const achievements = userData.achievements ?? []
  const rewards = userData.rewards ?? []
  const levelProgress = calculateLevelProgress(totalPoints)

  const handleRefresh = () => {
    clearError()
    loadUserData()
  }

  return (
    <div className="mx-auto max-w-md space-y-6 pb-8">
      <header className="text-center">
        <h1 className="text-3xl font-black text-slate-800">⭐ 积分乐园</h1>
        <p className="mt-1 text-sm text-slate-500">亮闪闪的积分、徽章和奖励，都会在这里排好队等你。</p>
      </header>

      {loading && !hydrated ? (
        <div className="rounded-3xl bg-white px-6 py-10 text-center shadow-lg shadow-amber-100/80 ring-1 ring-amber-100">
          <div className="text-5xl">🌟</div>
          <p className="mt-4 text-lg font-black text-slate-800">积分乐园正在整理中...</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">马上就能看到你的成长收获啦！</p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-3xl bg-rose-50 px-5 py-5 shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black text-rose-600">积分数据加载出了点小状况</p>
              <p className="mt-2 text-sm leading-6 text-rose-500">{error}</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-rose-500 ring-1 ring-rose-200"
              aria-label="重新加载积分数据"
            >
              🔄
            </button>
          </div>
        </div>
      ) : null}

      <PointsSummaryCard
        title="积分口袋"
        description="完成作业、记录考试，都会变成亮晶晶的成长积分。"
        icon="⭐"
        totalPoints={totalPoints}
        level={level}
        accent="amber"
        summaryStats={[
          { label: '已解锁徽章', value: `${achievements.length} 枚` },
          { label: '奖励清单', value: `${rewards.length} 个` },
        ]}
      />

      <LevelProgressCard progress={levelProgress} accent="amber" />

      <RewardsShelf rewards={rewards} totalPoints={totalPoints} />

      <AchievementBadgeGrid
        unlockedIds={achievements}
        accent="amber"
        title="徽章展台"
        description="每点亮一枚徽章，你的积分乐园都会更热闹一点。"
      />
    </div>
  )
}

export default RewardsPage
