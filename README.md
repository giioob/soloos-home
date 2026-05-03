# SoloOS Home

> 用 AI 把一个人变成一支团队。一个零代码小白用 90 天裸辞造一人公司的公开实验室。

这是 [SoloOS](https://soloos.cc) 的官网源码。**Build in public** —— 整个项目从 Day 1 就开源在这里。

## 站点结构

- `/` — 首页（Hero + Now + Work + Library + Journey + Contact）
- `/journey` — 90 天裸辞日记
- `/resources` — 外链资源库（Prompt / 工具 / 一人公司方法论 / AI 资讯）
- `/prompts` — 自有 Prompt 库（一键复制即用）
- `/about` `/work` `/membership` — 个人介绍 / 业务承接 / 知识付费跳转

## 技术栈

- **Framework**: Next.js 16 (App Router) + TypeScript
- **样式**: Tailwind CSS 4 + CSS 变量（设计 token）
- **内容**: MDX 文件（Journey + Prompts）+ JSON 文件（Resources）
- **字体**: Fraunces（衬线）+ Inter（无衬线）+ JetBrains Mono（等宽）+ Noto Serif SC（中文衬线）
- **包管理**: bun
- **部署**: Vercel

## 添加内容

加新内容**只要往 `content/` 文件夹丢一个文件**，git push 后 Vercel 自动上线。

| 内容类型 | 加新内容方式 |
|---|---|
| Journey 文章 | `content/journey/2026-xx-xx-day-N-标题.mdx` |
| Prompt | `content/prompts/场景-标题.mdx` |
| 外链资源 | 编辑 `content/resources.json`，加一条对象 |

## 本地开发

```bash
bun install
bun dev          # 启动 dev server (localhost:3000)
bun run build    # 生产构建
```

## 设计 / 规划文档

- `Product-Spec.md` —— 产品需求 + 信息架构 + 技术架构
- `Design-Brief.md` —— 视觉规范 + 反面参考 + 各页面视觉决策
- `DEV-PLAN.md` —— 16 个任务的 V1 开发计划

## 配色锚点

Claude 桌面端：奶油暖白 `#F4EFE6` + 焦糖珊瑚 `#D97757` + 衬线编辑感。亮暗双模式。

## License

MIT —— 想抄随便抄。但请别复制我的 Journey 文章和 Prompt 内容（那些是我的故事和实战经验）。
