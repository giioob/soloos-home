import Link from "next/link";
import { getAllDocs, type PromptMeta } from "../../lib/mdx";
import PromptsClient from "./PromptsClient";

export const metadata = {
  title: "Prompts · Prompt 库 · SoloOS",
};

export default function PromptsPage() {
  const docs = getAllDocs<PromptMeta>("prompts");

  // 收集所有出现过的场景，用于筛选 tab
  const scenarios = Array.from(
    new Set(docs.map((d) => d.meta.scenario).filter(Boolean))
  ).map((name) => ({
    name,
    count: docs.filter((d) => d.meta.scenario === name).length,
  }));

  // 简化的传给客户端的数据
  const items = docs.map((d) => ({
    slug: d.slug,
    title: d.meta.title,
    scenario: d.meta.scenario,
    summary: (d.meta as PromptMeta & { summary?: string }).summary || "",
    tags: d.meta.tags || [],
    tested: !!d.meta.tested,
    uses: d.meta.uses || 0,
  }));

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// PROMPTS</div>
          <h1 className="t-h1">写好的 prompt 都开源在这里。</h1>
          <p>
            实战测试过的 prompt。按场景分类。点进详情可一键复制。
            {docs.length > 0 && ` 共 ${docs.length} 个。`}
          </p>
        </div>
      </header>

      {docs.length === 0 ? (
        <section className="section">
          <div className="wrap">
            <p className="t-body">// 还没有 Prompt · 第一个正在写</p>
          </div>
        </section>
      ) : (
        <PromptsClient items={items} scenarios={scenarios} />
      )}
    </>
  );
}
