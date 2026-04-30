function ProfilePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-lg shadow-rose-100/80 ring-1 ring-rose-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-4xl">
          😊
        </div>
        <h1 className="mt-5 text-3xl font-black text-slate-800">我的小宇宙</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">
          你的等级、成就和成长足迹都会住在这里，看看自己今天又变厉害了多少！
        </p>
      </div>
    </section>
  )
}

export default ProfilePage
