import { Route, Routes } from 'react-router-dom'

import TabNav from './components/common/TabNav'
import ExamPage from './pages/ExamPage'
import HomeworkPage from './pages/HomeworkPage'
import ProfilePage from './pages/ProfilePage'
import RewardsPage from './pages/RewardsPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[linear-gradient(180deg,#eef2ff_0%,#f8fafc_42%,#fff7ed_100%)]">
        <main className="flex-1 px-4 pt-5 pb-32">
          <Routes>
            <Route path="/" element={<HomeworkPage />} />
            <Route path="/exams" element={<ExamPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <TabNav />
      </div>
    </div>
  )
}

export default App
