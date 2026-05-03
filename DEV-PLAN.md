# SoloOS Home · DEV PLAN

**版本：** v1.0
**日期：** 2026-05-03
**目标：** V1 上线（≤ 3 周）

---

## 总体节奏

| 周 | 主题 | 关键产出 |
|---|---|---|
| **Week 1** | 地基 + 首页 | nav / footer / 主题切换 / 首页能跑 |
| **Week 2** | 内容管道 + 子页 | MDX / JSON 跑通，journey / resources / prompts 三页能用 |
| **Week 3** | 收尾 + 上线 | 内容填充、移动端、SEO、部署 Vercel |

**节奏原则：每个任务结束 git commit，每周末推 GitHub。**

---

## Week 1 · 地基 + 首页

### Task 1.1 · 注入设计 token（30 分钟）
- 把 `public/styleguide.html` 里的 CSS 变量复制到 `app/globals.css`
- 引入 Google Fonts（Fraunces / Inter / JetBrains Mono / Noto Serif SC）
- 配置 Tailwind 用 CSS 变量（`tailwind.config.ts` 扩展 colors / fontFamily）
- **验收：** 任意组件用 `bg-bg-base text-text-primary` 类能渲染出 styleguide 颜色

### Task 1.2 · 主题切换（45 分钟）
- 新建 `components/ThemeProvider.tsx` —— React Context 管 theme
- 新建 `components/ThemeToggle.tsx` —— 右上角切换按钮
- localStorage 持久化 + 系统色偏好检测
- **验收：** 点切换按钮，整站颜色平滑切换

### Task 1.3 · Nav + Footer（45 分钟）
- `components/Nav.tsx` —— 顶部固定，含 logo / 菜单 / 主题切换 / 联系按钮
- 移动端汉堡菜单
- `components/Footer.tsx` —— 联系方式 / 社交 / 版权
- 加到 `app/layout.tsx`
- **验收：** 任意页面都看到 nav + footer

### Task 1.4 · 首页 Hero + Now（60 分钟）
- `components/Hero.tsx` —— 衬线大字 + 副标 + CTA + 焦糖珊瑚 ✻
- `components/NowBar.tsx` —— "现在在 build 什么" 一句话条
- 动效：hero 文字 fade-in（一次性）

### Task 1.5 · 首页其他区块（90 分钟）
- 业务卡片预览区（4 张卡，先用占位数据）
- 资源/Prompt 混合预览（先用占位）
- Journey 最新 3 篇（先用占位）
- 联系 CTA 横幅
- 全部用相同的 `Card` 组件复用

**Week 1 结束验收：** 首页所有区块在亮/暗模式下都好看，移动端也 OK，但内容是占位的。

---

## Week 2 · 内容管道 + 子页

### Task 2.1 · 装 MDX 依赖（20 分钟）
```bash
bun add @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time remark-gfm rehype-slug
bun add -D @types/mdx
```
- 配置 `next.config.ts` 加 MDX 支持
- 写 `lib/mdx.ts` —— 读 `content/*/` 下的 MDX 文件，返回 frontmatter + 内容

### Task 2.2 · /journey 列表 + 详情（90 分钟）
- `app/journey/page.tsx` —— 时间倒序列表
- `app/journey/[slug]/page.tsx` —— 文章详情
- `components/JourneyCard.tsx`
- MDX 自定义组件：标题加锚点 / 代码块复制按钮 / 引用样式
- **手写第一篇** `content/journey/2026-05-03-day-01-从零到一.mdx`（建站过程本身就是素材）

### Task 2.3 · /resources（60 分钟）
- `content/resources.json` —— 先填 5 条
- `lib/resources.ts` —— 读 JSON，返回 typed data
- `app/resources/page.tsx` —— 卡片网格 + 分类 tab + 前端搜索
- `components/ResourceCard.tsx`

### Task 2.4 · /prompts 列表 + 详情（90 分钟）
- `app/prompts/page.tsx` —— 列表，按 scenario 筛选
- `app/prompts/[slug]/page.tsx` —— 详情（关键：一键复制按钮）
- `components/PromptCard.tsx`
- 写 2 条示例 prompt 测通管道

### Task 2.5 · /about + /work + /membership + /tools 占位（90 分钟）
- 这 4 个页面 V1 优先级低，先给框架 + 静态内容
- `/tools` 直接放"Coming Soon"
- `/membership` 静态外链卡片列表

**Week 2 结束验收：** 所有路由都能访问，MDX 和 JSON 管道跑通，加新内容只要改文件。

---

## Week 3 · 收尾 + 上线

### Task 3.1 · 内容填充（持续）
- Journey 写到 3~5 篇
- Resources 填到 20 条
- Prompts 填到 10 条
- About / Work 填真实文案

### Task 3.2 · 移动端适配（90 分钟）
- 用 Chrome devtools 模拟 iPhone / iPad，每个页面过一遍
- nav 汉堡菜单
- 间距 / 字号自适应
- 卡片 grid 单列布局

### Task 3.3 · SEO + 性能（60 分钟）
- `app/layout.tsx` 加全局 metadata
- 每个页面单独 metadata
- 自动生成 `sitemap.xml`（用 next-sitemap）
- `robots.txt`
- og:image 准备一张

### Task 3.4 · 推 GitHub（15 分钟）
- 在 GitHub 新建 `soloos-home` 仓库（公开，build in public）
- 本地 git init / commit / push
- README 写一段："一个零代码小白用 90 天造一人公司的官网。源码公开。"

### Task 3.5 · 部署 Vercel（30 分钟）
- Vercel 连 GitHub 仓库，auto-deploy
- 暂时用 `soloos-home.vercel.app`
- 等域名买了再绑定

### Task 3.6 · 上线后（持续 1 周）
- 每天看一遍站点
- Vercel Analytics 看流量
- 修小 bug
- 收集"哪里要加"列表，进入 V2 backlog

---

## 风险清单（提前防）

| 风险 | 怎么办 |
|---|---|
| 中途又想改设计 | **拒绝。** 设计已锁，只在 V2 调整 |
| 内容写不出来 | **降低标准。** Journey 写"今天我装了 bun"也算一篇 |
| 想加新功能 | 写到 V2 backlog，**不进 V1** |
| 卡在某个技术细节 1 小时以上 | **跳过那个细节，先继续往后走。** 卡住的那一刻 = 该问 Claude 的时刻 |
| 移动端调不好 | 牺牲细节，确保能用就行 |

---

## 不在 V1 范围内（明确）

- ❌ 用户登录系统
- ❌ AI 工具实际开发
- ❌ 自建支付
- ❌ 评论系统
- ❌ Resources 自动 OG 抓取
- ❌ 多语言（中文优先，英文 V3 再说）
- ❌ Algolia 搜索
- ❌ 评论 / 点赞 / 收藏

---

## 进度追踪

每完成一个 Task → 在这个文档里勾 [x]。

```
Week 1
[ ] 1.1 注入设计 token
[ ] 1.2 主题切换
[ ] 1.3 Nav + Footer
[ ] 1.4 Hero + Now
[ ] 1.5 首页其他区块

Week 2
[ ] 2.1 装 MDX
[ ] 2.2 /journey
[ ] 2.3 /resources
[ ] 2.4 /prompts
[ ] 2.5 /about /work /membership /tools 占位

Week 3
[ ] 3.1 内容填充
[ ] 3.2 移动端
[ ] 3.3 SEO
[ ] 3.4 GitHub
[ ] 3.5 Vercel
[ ] 3.6 上线监测
```

---

## 下一个动作

**Week 1, Task 1.1：注入设计 token。**

回复 "走" 我立刻开干。
