"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  slug: string;
  title: string;
  scenario: string;
  summary: string;
  tags: string[];
  tested: boolean;
  uses: number;
};

type Props = {
  items: Item[];
  scenarios: { name: string; count: number }[];
};

export default function PromptsClient({ items, scenarios }: Props) {
  const [activeScenario, setActiveScenario] = useState<string>("ALL");

  const filtered = useMemo(() => {
    if (activeScenario === "ALL") return items;
    return items.filter((i) => i.scenario === activeScenario);
  }, [items, activeScenario]);

  return (
    <section className="section">
      <div className="wrap">
        {/* 场景筛选 tabs */}
        <div className="tabs" style={{ marginBottom: "var(--s-5)" }}>
          <button
            className={activeScenario === "ALL" ? "active" : ""}
            onClick={() => setActiveScenario("ALL")}
          >
            全部 <span className="count">{items.length}</span>
          </button>
          {scenarios.map((s) => (
            <button
              key={s.name}
              className={activeScenario === s.name ? "active" : ""}
              onClick={() => setActiveScenario(s.name)}
            >
              {s.name} <span className="count">{s.count}</span>
            </button>
          ))}
        </div>

        {/* Prompt 卡片 grid */}
        <div className="grid-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/prompts/${p.slug}`}
              className="card mini accent-card"
            >
              <div className="card-eyebrow t-eyebrow">// {p.scenario}</div>
              <h3>{p.title}</h3>
              {p.summary && <p>{p.summary}</p>}
              <div className="card-foot">
                <span>{p.tested ? "已测试 ✓" : "未测试"}</span>
                <span>查看 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
