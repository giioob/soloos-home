// 读取 content/resources.json —— 外链书签卡片库
//
// 数据格式（每条记录）：
// {
//   "title": "Anthropic 官方 Prompt 教程",
//   "url":   "https://github.com/anthropics/prompt-eng-interactive-tutorial",
//   "source":"GitHub",
//   "category":"prompt",      // prompt / 工具 / 一人公司 / AI 资讯 / 其他
//   "tags":  ["prompt", "claude"],
//   "note":  "Anthropic 官方互动教程，必看",
//   "added": "2026-05-03"
// }

import fs from "node:fs";
import path from "node:path";

export type Resource = {
  title: string;
  url: string;
  source: string;       // 来源域名 / 平台名
  category: string;     // 分类
  tags?: string[];
  note?: string;
  added: string;        // yyyy-mm-dd
};

const FILE = path.join(process.cwd(), "content", "resources.json");

export function getAllResources(): Resource[] {
  if (!fs.existsSync(FILE)) return [];
  const raw = fs.readFileSync(FILE, "utf-8");
  const list = JSON.parse(raw) as Resource[];
  // 按时间倒序
  return list.sort((a, b) => b.added.localeCompare(a.added));
}

/** 列出所有出现过的分类，按数量倒序 */
export function getCategories(): { name: string; count: number }[] {
  const list = getAllResources();
  const map = new Map<string, number>();
  list.forEach((r) => {
    map.set(r.category, (map.get(r.category) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
