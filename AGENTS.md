# AGENTS.md — 小学生作业管理 PWA

## 项目概述

一款面向小学生的作业管理PWA应用，部署在GitHub Pages，数据通过GitHub API存储在私有仓库中。支持安卓和iPad浏览器访问。

### 技术栈
- **前端**: React 18 + TypeScript + Vite
- **UI框架**: TailwindCSS + Framer Motion（趣味动画）
- **状态管理**: Zustand
- **路由**: React Router v6
- **数据存储**: GitHub API（私有仓库存JSON）
- **OCR**: 百度OCR API（拍照识别作业内容）
- **部署**: GitHub Pages + GitHub Actions CI/CD
- **PWA**: Workbox（离线缓存）

### 核心功能
1. **作业记录** — 拍照/手动输入作业内容，计时记录用时
2. **考试管理** — 记录考试时间、科目、分数
3. **积分系统** — 完成作业/考试得高分获积分，兑换奖励
4. **家长看板** — PIN码切换角色，家长查看孩子学习情况
5. **趣味化** — 成就徽章、等级、动画反馈

### 用户角色
- **孩子** — 默认角色，记录作业和考试，查看积分
- **家长** — PIN码进入，查看数据统计、管理奖励

---

## 架构规范

### 目录结构
```
src/
├── components/        # 按功能域拆分
│   ├── homework/      # 作业相关组件
│   ├── exam/          # 考试相关组件
│   ├── rewards/       # 积分兑换组件
│   ├── dashboard/     # 家长看板组件
│   └── common/        # 通用组件（Button, Card, Timer等）
├── hooks/             # 自定义hooks
├── services/          # API层（github.ts, ocr.ts）
├── store/             # Zustand stores
├── types/             # TypeScript类型定义
├── utils/             # 工具函数
├── pages/             # 页面级组件
└── assets/            # 静态资源、图标
```

### 编码规范
- 函数组件 + hooks，禁止class组件
- 文件命名：PascalCase组件，camelCase工具/hooks
- 类型优先：所有props必须有interface，禁止`any`
- 样式：TailwindCSS utility-first，复杂动画用Framer Motion
- 数据：GitHub API调用统一走`services/github.ts`
- 错误处理：所有API调用必须有try/catch和用户友好提示

### 数据模型（存为JSON in GitHub repo）
```typescript
// 作业记录
interface Homework {
  id: string;
  subject: string;         // 科目
  content: string;         // 作业内容
  imageUrl?: string;       // 拍照原图（存GitHub）
  duration: number;        // 用时（分钟）
  date: string;            // ISO日期
  completed: boolean;
  points: number;          // 获得积分
}

// 考试记录
interface Exam {
  id: string;
  subject: string;
  score: number;
  totalScore: number;
  date: string;
  points: number;
}

// 积分兑换
interface Reward {
  id: string;
  name: string;
  cost: number;            // 所需积分
  icon: string;
  redeemed: boolean;
}

// 用户数据
interface UserData {
  totalPoints: number;
  level: number;
  achievements: string[];
  homework: Homework[];
  exams: Exam[];
  rewards: Reward[];
}
```

### GitHub API 数据存储方案
- 私有仓库 `homework-data` 存放JSON文件
- `data/user.json` — 用户主数据
- `data/homework/YYYY-MM.json` — 按月分片的作业记录
- `data/exams/YYYY.json` — 按年的考试记录
- `assets/photos/` — 作业拍照图片
- 使用GitHub PAT（Personal Access Token）认证

### UI/UX 设计原则
- 大按钮、大字体（适合小学生）
- 色彩鲜明、圆角卡片
- 每次操作都有动画反馈（完成作业放烟花🎆）
- 底部Tab导航：作业 | 考试 | 积分 | 我的
- 家长模式：长按头像 → 输入PIN码进入

---

## 开发流程

### Phase 1: 基础框架
- Vite + React + TS 脚手架
- TailwindCSS + PWA配置
- GitHub API service层
- 路由和页面骨架

### Phase 2: 核心功能
- 作业录入（手动+拍照OCR）
- 计时器组件
- 考试记录
- 数据持久化到GitHub

### Phase 3: 趣味化
- 积分系统
- 成就徽章
- 等级进度条
- 动画效果

### Phase 4: 家长功能
- PIN码角色切换
- 数据统计看板
- 奖励管理

### Phase 5: 部署优化
- GitHub Actions CI/CD
- PWA离线支持
- 性能优化

---

## Agent使用指南（OpenCode中）

### 探索阶段
```
task(subagent_type="explore", ...) — 查找项目中的模式和结构
task(subagent_type="librarian", ...) — 查询React/Zustand/GitHub API文档
```

### 实现阶段
```
task(category="visual-engineering", load_skills=["frontend-ui-ux"], ...) — UI组件开发
task(category="quick", load_skills=[], ...) — 简单修改
task(category="ultrabrain", load_skills=[], ...) — 复杂逻辑（积分算法、数据同步）
```

### 质量保证
```
task(subagent_type="oracle", ...) — 架构决策、疑难调试
/review-work — 完成重要功能后review
```
