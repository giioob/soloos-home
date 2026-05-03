"use client";

import { useMemo, useState } from "react";
import type { Resource } from "../../lib/resources";

type Props = {
  resources: Resource[];
  categories: { name: string; count: number }[];
};

// 客户端组件：处理 tab 筛选 + 关键词搜索
export default function ResourcesClient({ resources, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    let list = resources;
    if (activeCategory !== "ALL") {
      list = list.filter((r) => r.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) => {
        const hay =
          r.title +
          " " +
          (r.note || "") +
          " " +
          (r.tags?.join(" ") || "") +
          " " +
          r.source;
        return hay.toLowerCase().includes(q);
      });
    }
    return list;
  }, [resources, activeCategory, query]);

  return (
    <section className="section">
      <div className="wrap">
        {/* 搜索框 */}
        <div style={{ marginBottom: "var(--s-4)" }}>
          <input
            type="text"
            placeholder="// 搜索：标题 / 来源 / 标签 / 备注"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 480,
              padding: "12px 16px",
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--ink-line)",
              background: "var(--bg-elevated)",
              color: "var(--ink)",
              fontFamily: "var(--mono)",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* 分类 tabs */}
        <div className="tabs" style={{ marginBottom: "var(--s-5)" }}>
          <button
            className={activeCategory === "ALL" ? "active" : ""}
            onClick={() => setActiveCategory("ALL")}
          >
            全部 <span className="count">{resources.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              className={activeCategory === c.name ? "active" : ""}
              onClick={() => setActiveCategory(c.name)}
            >
              {c.name} <span className="count">{c.count}</span>
            </button>
          ))}
        </div>

        {/* 卡片网格 */}
        {filtered.length === 0 ? (
          <p className="t-body">// 没有匹配的资源</p>
        ) : (
          <div className="grid-3">
            {filtered.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
              >
                <div className="card-eyebrow t-eyebrow">// {r.category}</div>
                <h3>{r.title}</h3>
                {r.note && <p>{r.note}</p>}
                <div className="card-foot">
                  <span>{r.source}</span>
                  <span>{r.added.slice(5)} ↗</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
