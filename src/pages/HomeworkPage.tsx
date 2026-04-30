function HomeworkPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-4xl">
          ✏️
        </div>
        <h1 className="mt-5 text-3xl font-black text-slate-800">作业小站</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">
          今天的任务会在这里集合，认真写完每一项，离小小学霸又近一步！
        </p>
      </div>
    </section>
  )
}

export default HomeworkPage
