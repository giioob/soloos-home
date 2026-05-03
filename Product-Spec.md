# SoloOS Home · Product Spec

**版本：** v1.0
**日期：** 2026-05-03
**负责人：** Hong（giioob）
**状态：** Draft，等首次代码落地后回填验证

---

## 一、项目定位

### 1.1 一句话

**Hong 个人 + SoloOS 公司的官方主页。一个零代码小白用 90 天裸辞造一人公司的公开实验室。**

### 1.2 它不是什么

- ❌ 不是 SoloOS 商学院（那是子产品）
- ❌ 不是 B2B 政企培训官网（PRD v1 已废弃）
- ❌ 不是 SaaS 产品页
- ❌ 不是博客（虽然包含博客功能）

### 1.3 它是什么

**个人 IP 站为主 + 公司业务为辅 + 工具/资料聚合 + Build in Public 日记。**

---

## 二、目标受众

| 优先级 | 人群 | 他们来这里要什么 |
|---|---|---|
| **P0** | 想用 AI 创业的零代码小白 | 看 Hong 怎么做 → 抄方法 / 买课 / 加社群 |
| **P1** | 想接 AI 服务的中小企业主 | 看案例 → 联系咨询 |
| **P2** | 自媒体同行 / 研究者 | 看内容质量 → 关注 / 转发 / 同行链接 |
| **P3** | 招聘 / 合作 / 媒体 | 直接联系 |

---

## 三、核心目标（V1 上线 90 天后回看的指标）

| 目标 | 衡量 |
|---|---|
| 个人 IP 信任建立 | 月独立访客 ≥ 1000 |
| 内容资产沉淀 | Resources ≥ 50 条，Prompts ≥ 30 条，Journey ≥ 10 篇 |
| 转化承接 | 联系咨询 / 知识星球跳转 ≥ 30 次/月 |
| 自我教学产出 | 整个开发过程产生的内容素材 ≥ 5 篇可发的自媒体内容 |

---

## 四、信息架构

### 4.1 页面地图

```
/                    首页（核心流量页）
├── /about           个人简介 + 公司介绍
├── /work            业务展示（已完成 + 可承接 + 心得）
├── /journey         90 天裸辞日记（build in public）
├── /resources       资源库（外链书签卡片）
├── /prompts         Prompt 库（自有内容）
├── /tools           小工具集合（V2 起步）
└── /membership      知识付费跳转（外链）
```

### 4.2 导航栏

**桌面端：**
```
SoloOS    Work · Journey · Resources · Prompts · About    [联系]
```

**移动端：** 汉堡菜单展开同链接 + 主题切换。

### 4.3 全局元素

- 顶部 nav 固定（半透明毛玻璃）
- 右上角 **亮/暗模式切换** 按钮（持久化到 localStorage）
- 页脚：联系方式 + 社交媒体 + 版权 + 最近更新时间

---

## 五、各页面功能详述

### 5.1 首页 `/`

**目的：** 3 秒建立认知 → 引导访客进入感兴趣的板块。

**内容板块（自上而下）：**

1. **Hero**
   - 大字 Fraunces 衬线："✻ 用 AI，把一个人 / 变成一支团队。"
   - 副标：「零代码小白用 90 天造一人公司，公开记录每一步——包括失败。」
   - CTA：[开始阅读] [关于我]

2. **Now / Build in Public 状态条**
   - 一句话写"我现在在 build 什么"
   - 手动维护，每周更新一次
   - 灵感来源：Naval、Dan Koe

3. **业务/作品概览**（4 张卡片，焦糖珊瑚 hover）
   - 链到 /work 详情

4. **资源库 / Prompt 库 概览**（混合 6 张精选卡片）
   - 链到 /resources 和 /prompts

5. **最近 Journey 文章**（3 篇）
   - 链到具体文章

6. **联系 CTA 横幅**
   - 微信号 + 公众号二维码 + 邮箱
   - 知识付费跳转按钮（外链小报童 / 知识星球）

### 5.2 `/about`

- 个人故事（裸辞、为什么做 SoloOS、价值观）
- 时间线（关键节点）
- SoloOS 是什么 / 为什么叫这个名字
- 联系方式
- 一句话："我帮和我一样的零代码普通人，用 AI 做出能赚钱的产品。"

### 5.3 `/work`

**布局：** Tab 切换 [已完成案例 | 可承接服务 | 实战心得]

- **已完成案例：** 卡片 grid，每张：行业 / 客户类型 / 痛点 / 解决方案 / 量化成果
- **可承接服务：** 4 类清单（AI 工作流 / AI 培训 / AI 工具选型 / AI 产品开发）+ 合作流程时间轴
- **实战心得：** 文章列表（同 Journey 但分类不同）

### 5.4 `/journey` —— 90 天裸辞日记

**目的：** Build in Public 的核心内容池，最高权重。

**形式：** MDX 文章 + 时间倒序列表
- 每篇 frontmatter: `{ title, date, day, tags, summary, cover }`
- 自动从 `content/journey/*.mdx` 读取
- 单篇页面：标题（衬线）+ 元数据 + 正文 + 上一篇/下一篇导航

**数据：**
```
content/journey/
├── 2026-05-02-day-01-从零到一.mdx
├── 2026-05-03-day-02-技术栈定型.mdx
└── ...
```

### 5.5 `/resources` —— 资源库

**核心：** JSON 驱动的外链书签卡片库

**数据格式：** `content/resources.json`
```json
[
  {
    "title": "Anthropic 官方 Prompt 教程",
    "url": "https://github.com/anthropics/prompt-eng-interactive-tutorial",
    "source": "GitHub",
    "category": "prompt",
    "tags": ["prompt", "claude", "教程"],
    "note": "Anthropic 官方互动教程，必看",
    "added": "2026-05-03"
  }
]
```

**功能：**
- 卡片网格，按 category 分类（Prompt / 工具 / 一人公司 / AI 资讯 / 其他）
- 顶部搜索框（前端 fuzzy search，无后端）
- Tag 筛选
- 点卡片直接打开外链（`target="_blank"`）

**添加新资源的流程（用户视角）：**
1. 看到好文章 → 复制 URL
2. 编辑 `content/resources.json` → 粘贴新对象
3. `git push` → 自动上线

**永远不做：**
- ❌ 不抓原文存到本站（版权、原作者信任问题）
- ❌ 不做用户评论
- ❌ 不自动 OG 抓取（可控性差，V2 再说）

### 5.6 `/prompts` —— Prompt 库

**核心：** 你自己写的、可直接复用的 prompt。

**数据：** `content/prompts/*.mdx`
- 每个 prompt 一个 mdx 文件
- frontmatter: `{ title, scenario, model, tags, tested }`
- 正文：使用场景说明 + 完整 prompt（在等宽代码块里）+ 示例输出

**关键功能：**
- **一键复制按钮**（最重要）
- 按场景分类（小红书 / 视频脚本 / 客服 / 商业分析 / 其他）
- 搜索

### 5.7 `/tools` —— V2 起步

**V1 不做。** 占位页：「Coming Soon · 第一个工具预计 V2 上线」。

### 5.8 `/membership` —— 知识付费跳转

**V1 形态：** 静态页面，列出"加入哪些社群/课程"，每张卡片是一个外链。

| 平台 | 跳转目标 |
|---|---|
| 知识星球 | 球外链 |
| 小报童 | 专栏链接 |
| SOLO OS 商学院 | 之前的 `school.html` 部署后链过来 |
| 微信社群 | 加微信好友的引导页 |

**V1 不做：**
- ❌ 自建支付
- ❌ 用户登录
- ❌ 内容权限分级

---

## 六、视觉规范（已锁定，详见 `public/styleguide.html`）

- **风格锚点：** Claude 桌面端 —— 奶油暖白 + 焦糖珊瑚 + 衬线编辑感
- **强调色：** `#D97757`（亮）/ `#E8896A`（暗）
- **字体：** 标题 Fraunces + Noto Serif SC，正文 Inter + PingFang SC，代码 JetBrains Mono
- **亮暗双模式切换：** 必须有，用 `data-theme` 属性 + localStorage
- **动效：** 仅 3 处（hero 渐入、滚动 fade-up、卡片 hover）
- **圆角：** 8 / 16 两档
- **间距：** 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 八档

---

## 七、技术架构

### 7.1 已确定的技术栈

| 层 | 技术 | 备注 |
|---|---|---|
| 框架 | **Next.js 16 (App Router)** | 已搭好 |
| 语言 | TypeScript | |
| 样式 | Tailwind CSS 4 + CSS 变量 | 设计 token 用 CSS 变量管 |
| 内容 | **MDX**（Journey/Prompts）+ **JSON**（Resources） | |
| 包管理 | bun 1.3 | |
| 部署 | **Vercel** | 推 GitHub 自动上线 |
| 域名 | TBD（V1 用 `*.vercel.app`） | 用户后期买 |

### 7.2 待加的依赖

```bash
bun add @next/mdx gray-matter reading-time remark-gfm rehype-slug
bun add -D @types/mdx
```

### 7.3 目录结构

```
soloos-home/
├── app/
│   ├── layout.tsx            根布局（含 ThemeProvider）
│   ├── page.tsx              首页
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── journey/
│   │   ├── page.tsx          列表
│   │   └── [slug]/page.tsx   详情
│   ├── resources/page.tsx
│   ├── prompts/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── tools/page.tsx
│   ├── membership/page.tsx
│   └── globals.css           设计 token + Tailwind base
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ThemeToggle.tsx
│   ├── ResourceCard.tsx
│   ├── PromptCard.tsx
│   └── JourneyCard.tsx
├── content/
│   ├── resources.json
│   ├── journey/*.mdx
│   └── prompts/*.mdx
├── lib/
│   ├── mdx.ts                MDX 加载工具
│   └── resources.ts          JSON 加载工具
├── public/
│   ├── styleguide.html       (已存在，开发参考用)
│   └── styleguide-v2.html    (已存在，废弃方向参考)
└── ...
```

### 7.4 内容工作流

```
新增 Journey 文章   →  在 content/journey/ 新建 .mdx → push → 自动上线
新增 Prompt        →  在 content/prompts/ 新建 .mdx → push → 自动上线
新增外链资源        →  编辑 content/resources.json 加一条 → push → 自动上线
改文案/视觉        →  改对应组件 / globals.css → push → 自动上线
```

**只用一个工具：Cursor / Claude Code，不依赖任何 CMS。**

---

## 八、SEO / 性能基线

| 项 | 目标 |
|---|---|
| Lighthouse Performance | ≥ 90 |
| 移动端可用 | 100%（必须） |
| Meta tags | 每页都有 title / description / og:image |
| sitemap.xml | 自动生成 |
| robots.txt | 允许全部 |
| 中文 SEO | 关键词："一人公司"、"AI 创业"、"零代码"、"裸辞"、"build in public" |

---

## 九、开放问题（等回答）

1. **域名什么时候买？** 不影响 V1 上线，但越早越好做品牌。
2. **个人头像 / 个人照片有吗？** Hero 和 About 页需要。
3. **微信 / 公众号二维码** 准备一下，Contact 区要用。
4. **小报童 / 知识星球链接** 准备好，Membership 区要用。
5. **过往业务案例** 整理 3~5 个真实案例（行业 / 痛点 / 方案 / 成果）。
6. **第一篇 Journey 文章** 想从 Day 1 写起还是从 Day 当下起？建议从今天起 Day 1。

---

## 十、V1 / V2 / V3 范围

### ✅ V1（2~3 周内上线）

- [ ] Nav + Footer + 主题切换
- [ ] 首页（Hero / Now / Work 概览 / Resources 概览 / Journey 概览 / Contact）
- [ ] /about
- [ ] /work（含 Tab 切换的三个子板块）
- [ ] /journey 列表 + 详情（先发 3~5 篇）
- [ ] /resources（先放 20 条）
- [ ] /prompts 列表 + 详情（先放 10 条）
- [ ] /tools（占位 Coming Soon）
- [ ] /membership（外链跳转列表）
- [ ] 移动端适配
- [ ] 部署 Vercel
- [ ] SEO 基础（meta / sitemap / robots）

### 🟡 V2（V1 跑通 1 个月后）

- 第一个 AI 小工具上线（候选：小红书标题生成器）
- Resources 自动 OG 抓取（脚本辅助）
- Prompt 库支持"运行试试"（接 Claude API）
- 简单的访客统计（Umami 或 GA）
- RSS 订阅

### 🔵 V3（V2 跑通 3 个月后）

- 用户登录（Supabase）
- 会员制内容分级（如果真有付费需求）
- 多个工具矩阵
- 自有支付（如果月活 ≥ 3000）

---

## 十一、变更记录

| 日期 | 版本 | 变更 |
|---|---|---|
| 2026-05-03 | v1.0 | 初稿，对齐对话中所有决策 |

---

**这份文档是活的。** V1 写代码过程中发现需求要调整，直接更新这份文档 + 加一行变更记录。代码和 spec 永远保持同步。
