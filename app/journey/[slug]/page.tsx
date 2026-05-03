import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getAllDocs,
  getAllSlugs,
  getDocBySlug,
  type JourneyMeta,
} from "../../../lib/mdx";

// 让 Next 在构建时为每篇文章生成一个静态页面（SSG）
export async function generateStaticParams() {
  return getAllSlugs("journey").map((slug) => ({ slug }));
}

// 动态生成每篇文章的 metadata（title 用文章 title）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug<JourneyMeta>("journey", slug);
  if (!doc) return { title: "Journey · SoloOS" };
  return {
    title: `${doc.meta.title} · Journey · SoloOS`,
    description: doc.meta.summary,
  };
}

// MDX 自定义组件 —— 用项目设计 token 渲染文章正文
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="t-h1" style={{ marginTop: "var(--s-6)", marginBottom: "var(--s-4)" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="t-h2" style={{ marginTop: "var(--s-6)", marginBottom: "var(--s-3)" }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="t-h3" style={{ marginTop: "var(--s-5)", marginBottom: "var(--s-3)" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink)", marginBottom: "var(--s-3)" }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ paddingLeft: "1.5em", marginBottom: "var(--s-4)", listStyle: "disc", color: "var(--ink-soft)" }} {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol style={{ paddingLeft: "1.5em", marginBottom: "var(--s-4)", listStyle: "decimal", color: "var(--ink-soft)" }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 8, fontSize: 16, lineHeight: 1.7 }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="t-quote"
      style={{
        borderLeft: "3px solid var(--accent)",
        paddingLeft: 20,
        margin: "var(--s-4) 0",
        color: "var(--ink-soft)",
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="uline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.92em",
        background: "var(--accent-soft)",
        color: "var(--accent-deep)",
        padding: "2px 6px",
        borderRadius: 4,
      }}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table style={{ width: "100%", margin: "var(--s-4) 0", borderCollapse: "collapse", fontSize: 14 }} {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      style={{
        textAlign: "left",
        padding: "10px 12px",
        borderBottom: "1px solid var(--ink-line)",
        fontFamily: "var(--mono)",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: "var(--ink-mute)",
      }}
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--ink-line-soft)", color: "var(--ink-soft)" }} {...props} />
  ),
};

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug<JourneyMeta>("journey", slug);
  if (!doc) notFound();

  // 上一篇 / 下一篇导航（按日期倒序后的相邻篇）
  const all = getAllDocs<JourneyMeta>("journey");
  const idx = all.findIndex((d) => d.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : null;       // 倒序排列下，前一项是更新的
  const older = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <article className="spotlight-host">
      {/* 文章 Hero */}
      <header className="page-hero">
        <div className="wrap-r" style={{ position: "relative", zIndex: 2 }}>
          <Link
            href="/journey"
            className="t-meta"
            style={{ display: "inline-block", marginBottom: "var(--s-3)" }}
          >
            ← 返回 Journey
          </Link>
          <div className="t-eyebrow" style={{ marginBottom: "var(--s-3)" }}>
            // DAY {String(doc.meta.day).padStart(2, "0")} · {doc.meta.date}
          </div>
          <h1 className="t-h1" style={{ marginBottom: "var(--s-3)" }}>
            {doc.meta.title}
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", marginBottom: "var(--s-3)" }}>
            {doc.meta.summary}
          </p>
          <div className="t-meta">
            {doc.readingMin} 分钟
            {doc.meta.tags?.length ? (
              <>
                {" · "}
                {doc.meta.tags.map((t, i) => (
                  <span key={t} className={i === 0 ? "tag" : "tag tag-mute"} style={{ marginLeft: 6 }}>
                    {t}
                  </span>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </header>

      {/* 正文 */}
      <section className="section" style={{ position: "relative", zIndex: 2 }}>
        <div className="wrap-r">
          <MDXRemote
            source={doc.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>
      </section>

      {/* 上一篇 / 下一篇 */}
      {(newer || older) && (
        <section className="section" style={{ position: "relative", zIndex: 2 }}>
          <div className="wrap-r">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--s-4)",
                paddingTop: "var(--s-5)",
                borderTop: "1px solid var(--ink-line-soft)",
              }}
            >
              <div>
                {older && (
                  <Link href={`/journey/${older.slug}`} className="card" style={{ display: "block" }}>
                    <div className="t-meta">← 上一篇 · DAY {String(older.meta.day).padStart(2, "0")}</div>
                    <h3 style={{ marginTop: 8 }}>{older.meta.title}</h3>
                  </Link>
                )}
              </div>
              <div>
                {newer && (
                  <Link href={`/journey/${newer.slug}`} className="card" style={{ display: "block", textAlign: "right" }}>
                    <div className="t-meta">下一篇 · DAY {String(newer.meta.day).padStart(2, "0")} →</div>
                    <h3 style={{ marginTop: 8 }}>{newer.meta.title}</h3>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
