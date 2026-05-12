"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./archive.module.css";
import type { ArchiveProject } from "./projects";
import ArchiveCategoryIcon from "./ArchiveCategoryIcon";

// Banner —— 局部高度（~520px）的精选项目横向轮播
//
// 设计点：
//  - 不接管 viewport，只在 .banner 容器内水平滚动
//  - 3 秒自动翻一屏，hover/手动操作暂停
//  - 底部右下角浮动控件：左右箭头 + 分页点
//  - 键盘 ← → 翻页
//  - 每屏 CTA 跳详情页

type Props = {
  projects: ArchiveProject[];
  autoplayMs?: number;
};

export default function ArchiveBanner({
  projects,
  autoplayMs = 3000,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = projects.length;
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const userInterrupted = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 同步用户手动滚动
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const w = track.clientWidth;
        if (w > 0) {
          const idx = Math.round(track.scrollLeft / w);
          setCurrent(Math.max(0, Math.min(total - 1, idx)));
        }
        rafId = null;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [total]);

  // 自动播放
  useEffect(() => {
    if (!playing || total <= 1) return;
    const timer = setInterval(() => {
      goto((current + 1) % total, false);
    }, autoplayMs);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, playing, total, autoplayMs]);

  // 手动操作暂停 4 秒
  const interrupt = () => {
    userInterrupted.current = true;
    setPlaying(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      userInterrupted.current = false;
      setPlaying(true);
    }, 4000);
  };

  const goto = (i: number, isUser: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    const wrap = current === total - 1 && i === 0;
    track.scrollTo({
      left: w * i,
      behavior: wrap ? "auto" : "smooth",
    });
    setCurrent(i);
    if (isUser) interrupt();
  };

  // 键盘
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const track = trackRef.current;
      if (!track) return;
      // 仅当 banner 在视口可见时才响应键盘
      const rect = track.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;
      if (e.key === "ArrowRight") goto((current + 1) % total, true);
      if (e.key === "ArrowLeft") goto((current - 1 + total) % total, true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <section
      className={styles.banner}
      onMouseEnter={() => !userInterrupted.current && setPlaying(false)}
      onMouseLeave={() => !userInterrupted.current && setPlaying(true)}
    >
      <div ref={trackRef} className={styles.bannerTrack}>
        {projects.map((p) => (
          <article
            key={p.slug}
            className={styles.bannerSlide}
            style={
              p.accent
                ? ({ ["--p-accent"]: p.accent } as React.CSSProperties)
                : undefined
            }
          >
            {p.cover ? (
              <div
                className={styles.bannerBg}
                style={{ backgroundImage: `url(${p.cover})` }}
              />
            ) : (
              <>
                <div className={styles.bannerBgPlaceholder} />
                <ArchiveCategoryIcon
                  category={p.category}
                  size={260}
                  className={styles.bannerPlaceholderIcon}
                />
              </>
            )}
            <div className={styles.bannerOverlay} />
            <div className={styles.bannerGrain} aria-hidden />

            <div className={styles.bannerContent}>
              <div className={styles.bannerMeta}>
                <span>{p.category}</span>
                <span>{p.year}</span>
                <span>case · {p.index}</span>
              </div>

              <div className={styles.bannerIndex}>{p.index}</div>

              <h2 className={styles.bannerTitle}>{p.title}</h2>
              {p.subtitle && (
                <p className={styles.bannerSubtitle}>{p.subtitle}</p>
              )}

              <p className={styles.bannerPitch}>{p.pitch}</p>

              <Link href={`/archive/${p.slug}`} className={styles.bannerCta}>
                进入主题 <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* 控件通栏：左箭头贴左 / 分页点居中 / 右箭头贴右，max-w 与列表对齐 */}
      <div className={styles.bannerControls}>
        <div className={styles.bannerControlsInner}>
          <button
            className={styles.bannerArrow}
            aria-label="上一项"
            onClick={() => goto((current - 1 + total) % total, true)}
          >
            ‹
          </button>

          <div className={styles.bannerDots}>
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                className={`${styles.bannerDot} ${
                  i === current ? styles.bannerDotActive : ""
                }`}
                aria-label={`第 ${i + 1} 项`}
                onClick={() => goto(i, true)}
              />
            ))}
          </div>

          <button
            className={styles.bannerArrow}
            aria-label="下一项"
            onClick={() => goto((current + 1) % total, true)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
