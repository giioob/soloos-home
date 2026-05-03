import Link from "next/link";
import { getAllDocs, type JourneyMeta } from "../../lib/mdx";

export const metadata = {
  title: "Journey · 90 天裸辞日记 · SoloOS",
};

// 列表页：读 content/journey/*.mdx，按日期倒序渲染
export default function JourneyPage() {
  const docs = getAllDocs<JourneyMeta>("journey");

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// JOURNEY · 90 DAYS</div>
          <h1 className="t-h1">
            <span className="italic-em">公开</span>记录每一步——包括失败。
          </h1>
          <p>
            90 天裸辞日记。哪天卡住了、哪天赚到第一块钱、哪天差点放弃，都在这里。
            {docs.length > 0 && ` 已发布 ${docs.length} 篇。`}
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          {docs.length === 0 ? (
            <p className="t-body">
              // 还没有 Journey · 第一篇正在写
            </p>
          ) : (
            <div className="journey-list">
              {docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/journey/${doc.slug}`}
                  className="journey-row reveal in"
                >
                  <div className="day">
                    <span className="day-n">
                      {String(doc.meta.day).padStart(2, "0")}
                    </span>
                    <span className="day-l">DAY</span>
                  </div>
                  <div className="j-body">
                    <h3>{doc.meta.title}</h3>
                    <p>{doc.meta.summary}</p>
                    <div className="j-meta">
                      {doc.meta.date} · {doc.readingMin} 分钟
                      {doc.meta.tags?.map((t, i) => (
                        <span
                          key={t}
                          className={i === 0 ? "tag" : "tag tag-mute"}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="j-arrow">→</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
