function RewardsPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-lg shadow-amber-100/80 ring-1 ring-amber-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
          ⭐
        </div>
        <h1 className="mt-5 text-3xl font-black text-slate-800">积分乐园</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">
          做完作业、考出好成绩就能收集闪亮积分，快来兑换喜欢的小奖励吧！
        </p>
      </div>
    </section>
  )
}

export default RewardsPage
