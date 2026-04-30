function ExamPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md items-center justify-center">
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-lg shadow-emerald-100/80 ring-1 ring-emerald-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          📝
        </div>
        <h1 className="mt-5 text-3xl font-black text-slate-800">考试小本本</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">
          考试时间、分数和进步记录都会放在这里，稳稳冲刺每一次好成绩！
        </p>
      </div>
    </section>
  )
}

export default ExamPage
