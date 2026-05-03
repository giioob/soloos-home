import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllSlugs,
  getDocBySlug,
  type PromptMeta,
} from "../../../lib/mdx";

export async function generateStaticParams() {
  return getAllSlugs("prompts").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug<PromptMeta>("prompts", slug);
  if (!doc) return { title: "Prompts · SoloOS" };
  return {
    title: `${doc.meta.title} · Prompts · SoloOS`,
    description:
      (doc.meta as PromptMeta & { summary?: string }).summary || doc.meta.title,
  };
}

const mdxComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="t-h1" style={{ marginTop: 32, marginBottom: 16 }} {...p} />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="t-h2" style={{ marginTop: 32, marginBottom: 12 }} {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="t-h3" style={{ marginTop: 24, marginBottom: 12 }} {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink)", marginBottom: 16 }} {...p} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ paddingLeft: "1.5em", marginBottom: 20, listStyle: "disc", color: "var(--ink-soft)" }} {...p} />
  ),
  ol: (p: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol style={{ paddingLeft: "1.5em", marginBottom: 20, listStyle: "decimal", color: "var(--ink-soft)" }} {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 6, fontSize: 16, lineHeight: 1.7 }} {...p} />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="uline" target="_blank" rel="noopener noreferrer" {...p} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.92em",
        background: "var(--accent-soft)",
        color: "var(--accent-deep)",
        padding: "2px 6px",
        borderRadius: 4,
      }}
      {...p}
    />
  ),
};

export default async function PromptDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug<PromptMeta>("prompts", slug);
  if (!doc) notFound();

  const meta = doc.meta;

  return (
    <article className="spotlight-host">
      <header className="page-hero">
        <div className="wrap-r" style={{ position: "relative", zIndex: 2 }}>
          <Link
            href="/prompts"
            className="t-meta"
            style={{ display: "inline-block", marginBottom: "var(--s-3)" }}
          >
            ← 返回 Prompts
          </Link>
          <div className="t-eyebrow" style={{ marginBottom: "var(--s-3)" }}>
            // {meta.scenario}
            {meta.model ? ` · ${meta.model}` : ""}
            {meta.tested ? " · 已测试 ✓" : ""}
          </div>
          <h1 className="t-h1" style={{ marginBottom: "var(--s-3)" }}>
            {meta.title}
          </h1>
          {(meta as PromptMeta & { summary?: string }).summary && (
            <p style={{ fontSize: 18, color: "var(--ink-soft)" }}>
              {(meta as PromptMeta & { summary?: string }).summary}
            </p>
          )}
        </div>
      </header>

      {/* 主体：先显示 prompt 代码块（带复制按钮），再显示正文（场景说明） */}
      <section className="section" style={{ position: "relative", zIndex: 2 }}>
        <div className="wrap-r">
          {/* —— Prompt 代码块（核心） —— */}
          <div className="code-block">
            <div className="code-head">
              <span className="label">// PROMPT</span>
              <button className="copy-btn" data-copy="#prompt-body">
                ⌘ 复制
              </button>
            </div>
            <pre className="code-body" id="prompt-body">
              {meta.prompt}
            </pre>
          </div>

          {/* —— 示例输出（如果有） —— */}
          {meta.example && (
            <div className="code-block" style={{ background: "var(--bg-elevated)" }}>
              <div className="code-head" style={{ borderBottom: "1px solid var(--ink-line-soft)" }}>
                <span className="label" style={{ color: "var(--ink-mute)" }}>
                  // EXAMPLE OUTPUT
                </span>
              </div>
              <pre
                className="code-body"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--ink-soft)",
                }}
              >
                {meta.example}
              </pre>
            </div>
          )}

          {/* —— 文章正文 —— */}
          <div style={{ marginTop: "var(--s-6)" }}>
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
