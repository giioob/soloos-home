"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../lib/mdx";

type Props = { items: TocItem[] };

/**
 * 文章左侧目录栏
 * - sticky 跟随滚动
 * - IntersectionObserver 监听当前可见的 heading，自动高亮
 * - 点击平滑滚动到对应章节
 * - 窄屏（< 1024px）由父级 grid 隐藏
 */
export default function TocSidebar({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到当前最靠上的可见 heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // 上方留 88px（导航栏高度）作为 trigger 线
        rootMargin: "-88px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="文章目录" className="toc-sidebar">
      <div className="t-eyebrow" style={{ marginBottom: "var(--s-3)" }}>
        // 目录
      </div>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc-item toc-d${item.depth} ${
              activeId === item.id ? "toc-active" : ""
            }`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="toc-link"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
