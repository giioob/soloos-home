// 读取 content/<type>/*.mdx 的工具
//
// 一篇 MDX 文章的结构（frontmatter + 正文）：
// ---
// title: 第一篇日记
// date: 2026-05-03
// day: 1
// summary: 一句话摘要
// tags: [复盘, 定位]
// ---
// 正文内容（支持 markdown + JSX 组件）

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * 把 frontmatter 里的 Date 对象规范化成 yyyy-mm-dd 字符串。
 * gray-matter 会把 YAML 里的 yyyy-mm-dd 解析成 Date，但我们 UI 想要原始字符串。
 */
function normalizeFrontmatter<T>(data: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...data };
  if (out.date instanceof Date) {
    out.date = out.date.toISOString().slice(0, 10);
  }
  return out as T;
}

/** 一篇 MDX 文档的完整数据 */
export type MdxDoc<TMeta = Record<string, unknown>> = {
  slug: string;       // 文件名去掉 .mdx
  meta: TMeta;        // frontmatter 解析后的对象
  content: string;    // 正文（markdown 字符串）
  readingMin: number; // 估算阅读时长（分钟）
};

// --------- Journey 文章 ---------
export type JourneyMeta = {
  title: string;
  date: string;       // ISO yyyy-mm-dd
  day: number;        // 第 N 天
  summary: string;
  tags?: string[];
  cover?: string;
};

// --------- Prompt 条目 ---------
export type PromptMeta = {
  title: string;
  scenario: string;   // 场景：小红书 / 视频脚本 / 客服 / 商业分析 ...
  model?: string;     // 推荐模型：Claude / GPT-4 / 通用
  tags?: string[];
  tested?: boolean;   // 是否实战测试过
  uses?: number;      // 使用次数
  prompt: string;     // 真实 prompt 内容（在 frontmatter 里整块塞）
  example?: string;   // 示例输出（可选）
  date?: string;
};

/**
 * 读取一个分类下所有 mdx 文件
 * @param subdir 子目录名，如 "journey" / "prompts"
 */
export function getAllDocs<TMeta>(subdir: string): MdxDoc<TMeta>[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        meta: normalizeFrontmatter<TMeta>(data),
        content,
        readingMin: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    })
    .sort((a, b) => {
      // 按日期倒序（journey）；没日期就按 slug 倒序
      // 注意：gray-matter 会把 yyyy-mm-dd 格式的 date 解析成 Date 对象，
      // 所以用 String() 强制转换再比较，确保 localeCompare 一定可用
      const da = String((a.meta as { date?: string | Date }).date ?? a.slug);
      const db = String((b.meta as { date?: string | Date }).date ?? b.slug);
      return db.localeCompare(da);
    });
}

/** 读单篇 mdx
 * macOS 上中文文件名可能有 NFC / NFD 两种 Unicode 规范化形式，
 * fs.existsSync 对它们是不同的字符串，所以这里做扫描匹配代替直接拼路径
 */
export function getDocBySlug<TMeta>(
  subdir: string,
  slug: string
): MdxDoc<TMeta> | null {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return null;

  // URL 可能带 %xx，先解码
  const decoded = decodeURIComponent(slug);
  // 同时 normalize 成 NFC
  const target = decoded.normalize("NFC");

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const matched = files.find(
    (f) => f.replace(/\.mdx$/, "").normalize("NFC") === target
  );
  if (!matched) return null;

  const raw = fs.readFileSync(path.join(dir, matched), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: matched.replace(/\.mdx$/, ""),
    meta: normalizeFrontmatter<TMeta>(data),
    content,
    readingMin: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/** 列出某个子目录下所有 slug —— 用于生成 generateStaticParams */
export function getAllSlugs(subdir: string): string[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
