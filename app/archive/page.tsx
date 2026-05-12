import type { Metadata } from "next";
import Link from "next/link";
import styles from "./archive.module.css";
import { ARCHIVE_PROJECTS, HIGHLIGHTED_PROJECTS } from "./projects";
import ArchiveBanner from "./ArchiveBanner";
import ArchiveCategoryIcon from "./ArchiveCategoryIcon";

export const metadata: Metadata = {
  title: "项目档案 · 一个人的十年文旅履历 · SoloOS",
  description:
    "任弘 / 连云港。20+ 个文旅活动、舞美工程、品牌策划项目档案。也是 SoloOS 之前的我。",
};

export default function ArchivePage() {
  const total = ARCHIVE_PROJECTS.length;

  return (
    <>
      {/* ===== Banner ===== */}
      <ArchiveBanner projects={HIGHLIGHTED_PROJECTS} />

      {/* ===== Intro ===== */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introEyebrow}>// 关于这份档案</div>
          <p className={styles.introLead}>
            连云港 · <em>十年</em> · 文旅活动策划、执行、舞美与品牌的项目档案。
            <br />
            也是 SoloOS 之前的我。
          </p>
          <dl className={styles.introStats}>
            <div className={styles.introStat}>
              <dt>项目数</dt>
              <dd>{total}+</dd>
            </div>
            <div className={styles.introStat}>
              <dt>时间跨度</dt>
              <dd>2015 — 2025</dd>
            </div>
            <div className={styles.introStat}>
              <dt>主战场</dt>
              <dd>连云港</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== 项目列表 ===== */}
      <section className={styles.list}>
        <div className={styles.listInner}>
          <header className={styles.listHeader}>
            <div>
              <div className={styles.listEyebrow}>// 全部项目档案</div>
              <h2 className={styles.listTitle}>
                {total} 个项目 · 按时间倒序
              </h2>
            </div>
            <div className={styles.listFilter}>
              <span>景区文旅</span>
              <span>舞美工程</span>
              <span>品牌策划</span>
              <span>活动现场</span>
            </div>
          </header>

          {ARCHIVE_PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/archive/${p.slug}`}
              className={styles.listItem}
              style={
                p.accent
                  ? ({ ["--p-accent"]: p.accent } as React.CSSProperties)
                  : undefined
              }
            >
              {/* 缩略图（或概念封面占位） */}
              {p.cover ? (
                <div
                  className={styles.listThumb}
                  style={{ backgroundImage: `url(${p.cover})` }}
                />
              ) : (
                <div
                  className={`${styles.listThumb} ${styles.listThumbPlaceholder}`}
                >
                  <ArchiveCategoryIcon
                    category={p.category}
                    size={56}
                    className={styles.listThumbIcon}
                  />
                  <span className={styles.listThumbIndex}>{p.index}</span>
                </div>
              )}

              {/* 项目元数据 + 标题 + pitch */}
              <div className={styles.listMeta}>
                <div className={styles.listMetaTop}>
                  <span className={styles.listIndex}>{p.index}</span>
                  <span className={styles.sep}>·</span>
                  <span>{p.category}</span>
                  <span className={styles.sep}>·</span>
                  <span>{p.year}</span>
                </div>

                <h3 className={styles.listItemTitle}>{p.title}</h3>
                {p.subtitle && (
                  <p className={styles.listItemSubtitle}>{p.subtitle}</p>
                )}
                <p className={styles.listItemPitch}>{p.pitch}</p>
              </div>

              {/* 右侧进入箭头 */}
              <span className={styles.listArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 收尾 CTA ===== */}
      <section className={styles.archiveFoot}>
        <div className={styles.archiveFootEyebrow}>—— 现在做的事 ——</div>
        <h2 className={styles.archiveFootTitle}>
          十年现场经验，<em>现在装进了 AI 里。</em>
        </h2>
        <Link href="/work" className="btn btn-primary">
          看看现在能帮你做什么 →
        </Link>
      </section>
    </>
  );
}
