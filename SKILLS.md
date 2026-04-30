# 开发所需 Skills 清单

## OpenCode 内置 Skills（直接可用）

| Skill | 用途 | 使用场景 |
|-------|------|----------|
| `frontend-ui-ux` | UI组件开发、样式、动画 | 所有界面开发、TailwindCSS、Framer Motion动画 |
| `playwright` | 浏览器自动化测试 | PWA功能验证、E2E测试 |
| `dev-browser` | 浏览器交互 | 开发时预览验证 |
| `git-master` | Git操作 | 提交、分支管理、部署 |
| `review-work` | 代码审查 | 每个Phase完成后review |
| `ai-slop-remover` | 代码质量 | 清理AI生成代码的冗余模式 |

## 需要的外部技能/知识（通过 librarian agent 获取）

| 领域 | 具体内容 |
|------|----------|
| **GitHub API** | Contents API（读写文件）、认证（PAT）、Base64编码 |
| **百度OCR API** | 通用文字识别接口、图片Base64上传、返回值解析 |
| **Vite PWA** | vite-plugin-pwa配置、Service Worker、离线缓存策略 |
| **Zustand** | Store设计模式、persist middleware（本地缓存） |
| **Framer Motion** | 动画变体、手势交互、页面过渡 |
| **TailwindCSS** | 响应式设计、暗色模式、自定义主题 |
| **React Router v6** | 嵌套路由、Tab导航模式 |
| **GitHub Pages** | 部署SPA的404重定向处理 |

## 开发阶段 Agent 使用策略

### Phase 1 — 基础框架搭建
```
category: "quick"
load_skills: ["frontend-ui-ux"]
librarian: Vite+React+TS脚手架、TailwindCSS配置、PWA配置
```

### Phase 2 — 核心功能开发
```
category: "visual-engineering"
load_skills: ["frontend-ui-ux"]
librarian: GitHub Contents API文档、百度OCR API文档
oracle: 数据同步策略（离线→在线）、GitHub API限流处理
```

### Phase 3 — 趣味化功能
```
category: "visual-engineering"  
load_skills: ["frontend-ui-ux"]
librarian: Framer Motion高级动画、Canvas confetti
ultrabrain: 积分算法设计、成就系统逻辑
```

### Phase 4 — 家长功能
```
category: "visual-engineering"
load_skills: ["frontend-ui-ux"]
oracle: 安全性（PIN码存储、数据隔离）
```

### Phase 5 — 部署优化
```
category: "quick"
load_skills: ["git-master"]
librarian: GitHub Actions部署配置、Workbox缓存策略
playwright: E2E测试验证
```

## 推荐的开发命令

```bash
# 启动开发
npm create vite@latest . -- --template react-ts
npm install zustand react-router-dom framer-motion
npm install -D tailwindcss postcss autoprefixer vite-plugin-pwa

# 开发
npm run dev

# 构建部署
npm run build
# GitHub Actions 自动部署到 Pages
```
