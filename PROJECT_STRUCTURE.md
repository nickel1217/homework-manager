# 项目结构

```
homework/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署到 Pages
├── .sisyphus/
│   └── plans/                  # 工作计划存放
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   ├── icons/                  # PWA图标 (192x192, 512x512)
│   └── index.html
├── src/
│   ├── main.tsx                # 入口
│   ├── App.tsx                 # 根组件 + 路由
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── homework/
│   │   │   ├── HomeworkForm.tsx       # 作业录入表单
│   │   │   ├── HomeworkList.tsx       # 作业列表
│   │   │   ├── HomeworkCard.tsx       # 单条作业卡片
│   │   │   ├── Timer.tsx             # 做作业计时器
│   │   │   └── PhotoCapture.tsx      # 拍照+OCR组件
│   │   ├── exam/
│   │   │   ├── ExamForm.tsx          # 考试录入
│   │   │   ├── ExamList.tsx          # 考试列表
│   │   │   └── ScoreChart.tsx        # 分数趋势图
│   │   ├── rewards/
│   │   │   ├── PointsDisplay.tsx     # 积分展示（动画）
│   │   │   ├── RewardShop.tsx        # 积分兑换商店
│   │   │   ├── AchievementBadge.tsx  # 成就徽章
│   │   │   └── LevelProgress.tsx     # 等级进度条
│   │   ├── dashboard/
│   │   │   ├── ParentView.tsx        # 家长看板主视图
│   │   │   ├── StatsCard.tsx         # 统计卡片
│   │   │   ├── WeeklyReport.tsx      # 周报
│   │   │   └── PinLock.tsx           # PIN码验证组件
│   │   └── common/
│   │       ├── Button.tsx            # 大按钮组件
│   │       ├── Card.tsx              # 圆角卡片
│   │       ├── TabNav.tsx            # 底部导航
│   │       ├── Loading.tsx           # 加载动画
│   │       ├── Confetti.tsx          # 完成任务烟花
│   │       └── Avatar.tsx            # 头像（长按切换角色）
│   ├── pages/
│   │   ├── HomeworkPage.tsx
│   │   ├── ExamPage.tsx
│   │   ├── RewardsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── ParentDashboard.tsx
│   ├── hooks/
│   │   ├── useGitHub.ts             # GitHub API 数据读写
│   │   ├── useTimer.ts              # 计时器逻辑
│   │   ├── useOCR.ts                # OCR识别hook
│   │   ├── usePoints.ts             # 积分计算
│   │   └── useRole.ts               # 角色切换（孩子/家长）
│   ├── services/
│   │   ├── github.ts                # GitHub API 封装
│   │   ├── ocr.ts                   # 百度OCR API
│   │   └── storage.ts               # 本地缓存（离线用）
│   ├── store/
│   │   ├── useAppStore.ts           # 全局状态
│   │   ├── useHomeworkStore.ts      # 作业数据
│   │   ├── useExamStore.ts          # 考试数据
│   │   └── useRewardStore.ts        # 积分奖励
│   ├── types/
│   │   ├── homework.ts
│   │   ├── exam.ts
│   │   ├── reward.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── points.ts               # 积分规则计算
│   │   ├── date.ts                  # 日期格式化
│   │   ├── id.ts                    # ID生成
│   │   └── achievements.ts          # 成就判定逻辑
│   └── assets/
│       ├── badges/                  # 成就徽章SVG
│       └── sounds/                  # 音效（完成、升级）
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── AGENTS.md
├── PROJECT_STRUCTURE.md
└── README.md
```
