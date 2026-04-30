import { useEffect } from 'react'

import AchievementBadgeGrid from '../components/rewards/AchievementBadgeGrid'
import LevelProgressCard from '../components/rewards/LevelProgressCard'
import PointsSummaryCard from '../components/rewards/PointsSummaryCard'
import { useAppStore } from '../store/useAppStore'
import { calculateLevelProgress } from '../utils/gamification'

function ProfilePage() {
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
  const homework = userData.homework ?? []
  const exams = userData.exams ?? []
  const levelProgress = calculateLevelProgress(totalPoints)
  const redeemedRewardsCount = rewards.filter((item) => item.redeemed).length
  const activeRewardsCount = rewards.filter((item) => !item.redeemed).length

  const handleRefresh = () => {
    clearError()
    loadUserData()
  }

  return (
    <div className="mx-auto max-w-md space-y-6 pb-8">
      <header className="text-center">
        <h1 className="text-3xl font-black text-slate-800">😊 我的小宇宙</h1>
        <p className="mt-1 text-sm text-slate-500">这里住着你的等级、徽章，还有一点点一点点积攒起来的成长。</p>
      </header>

      {loading && !hydrated ? (
        <div className="rounded-3xl bg-white px-6 py-10 text-center shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
          <div className="text-5xl">🪐</div>
          <p className="mt-4 text-lg font-black text-slate-800">成长档案正在打开...</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">等一下下，你的闪光记录马上出现。</p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-3xl bg-rose-50 px-5 py-5 shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black text-rose-600">成长档案暂时没有同步成功</p>
              <p className="mt-2 text-sm leading-6 text-rose-500">{error}</p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-rose-500 ring-1 ring-rose-200"
              aria-label="重新加载成长档案"
            >
              🔄
            </button>
          </div>
        </div>
      ) : null}

      <PointsSummaryCard
        title="成长总览"
        description="今天的努力都会悄悄存进你的成长小宇宙，慢慢变成更厉害的自己。"
        icon="🌈"
        totalPoints={totalPoints}
        level={level}
        accent="rose"
        summaryStats={[
          { label: '作业记录', value: `${homework.length} 条` },
          { label: '考试记录', value: `${exams.length} 条` },
        ]}
      />

      <LevelProgressCard progress={levelProgress} accent="rose" />

      <section className="rounded-3xl bg-white px-5 py-5 shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
        <div>
          <h2 className="text-xl font-black text-slate-800">成长足迹</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">把每一份努力都数一数，就会发现自己已经走了很远。</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-rose-50 px-4 py-4 ring-1 ring-rose-100">
            <p className="text-xs font-bold tracking-wide text-slate-500">已解锁徽章</p>
            <p className="mt-2 text-2xl font-black text-rose-600">{achievements.length}</p>
          </div>
          <div className="rounded-3xl bg-sky-50 px-4 py-4 ring-1 ring-sky-100">
            <p className="text-xs font-bold tracking-wide text-slate-500">待点亮奖励</p>
            <p className="mt-2 text-2xl font-black text-sky-600">{activeRewardsCount}</p>
          </div>
          <div className="rounded-3xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-100">
            <p className="text-xs font-bold tracking-wide text-slate-500">已收下奖励</p>
            <p className="mt-2 text-2xl font-black text-emerald-600">{redeemedRewardsCount}</p>
          </div>
          <div className="rounded-3xl bg-amber-50 px-4 py-4 ring-1 ring-amber-100">
            <p className="text-xs font-bold tracking-wide text-slate-500">当前等级</p>
            <p className="mt-2 text-2xl font-black text-amber-600">Lv.{level}</p>
          </div>
        </div>
      </section>

      <AchievementBadgeGrid
        unlockedIds={achievements}
        accent="rose"
        title="我的徽章墙"
        description="已经点亮的徽章会发光，没解锁的也在等你来挑战。"
      />
    </div>
  )
}

export default ProfilePage
