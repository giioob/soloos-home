import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../archive.module.css";
import { ARCHIVE_PROJECTS } from "../projects";
import ArchiveCategoryIcon from "../ArchiveCategoryIcon";

type Params = { slug: string };

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = ARCHIVE_PROJECTS.find((x) => x.slug === slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.title} · Archive · SoloOS`,
    description: p.pitch,
  };
}

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = ARCHIVE_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  // 找上一篇 / 下一篇用于底部导航
  const idx = ARCHIVE_PROJECTS.findIndex((p) => p.slug === slug);
  const prev = ARCHIVE_PROJECTS[idx - 1];
  const next = ARCHIVE_PROJECTS[idx + 1];

  return (
    <div
      className={styles.detailScope}
      data-archive=""
      style={
        project.accent
          ? ({ ["--p-accent"]: project.accent } as React.CSSProperties)
          : undefined
      }
    >
      {/* HERO */}
      <header className={styles.detailHero}>
        <Link href="/archive" className={styles.detailBackBtn}>
          ← 返回项目档案
        </Link>
        {project.cover ? (
          <div
            className={styles.detailHeroBg}
            style={{ backgroundImage: `url(${project.cover})` }}
          />
        ) : (
          <>
            <div className={styles.detailHeroPlaceholder} />
            <ArchiveCategoryIcon
              category={project.category}
              size={420}
              className={styles.detailPlaceholderIcon}
            />
          </>
        )}
        <div className={styles.detailHeroOverlay} />
        <div className={styles.detailHeroGrain} aria-hidden />

        <div className={styles.detailHeroContent}>
          <div className={styles.detailHeroMeta}>
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>case · {project.index}</span>
          </div>

          <div className={styles.detailHeroIndex}>{project.index}</div>

          <h1 className={styles.detailHeroTitle}>{project.title}</h1>

          {project.subtitle && (
            <p className={styles.detailHeroSubtitle}>{project.subtitle}</p>
          )}
        </div>
      </header>

      {/* 主体 */}
      <main className={styles.detailMain}>
        {/* Lede —— 一句话提炼 */}
        <p className={styles.detailLede}>{project.pitch}</p>

        {/* 项目元数据 */}
        <dl className={styles.detailFacts}>
          <div className={styles.detailFact}>
            <dt>甲方</dt>
            <dd>{project.client}</dd>
          </div>
          <div className={styles.detailFact}>
            <dt>年份</dt>
            <dd>{project.year}</dd>
          </div>
          <div className={styles.detailFact}>
            <dt>我的角色</dt>
            <dd>{project.role}</dd>
          </div>
          {project.scale && (
            <div className={styles.detailFact}>
              <dt>规模</dt>
              <dd>{project.scale}</dd>
            </div>
          )}
        </dl>

        {/* 当时做了什么 */}
        <section className={styles.detailSection}>
          <div className={styles.detailSectionEyebrow}>当时做了什么</div>
          <div className={styles.detailProse}>
            {project.intro.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>

        {/* AI 重做思路（仅部分项目有） */}
        {project.aiReboot && (
          <div className={styles.detailAi}>
            <span className={styles.detailAiLabel}>AI 重做</span>
            <p className={styles.detailAiText}>{project.aiReboot}</p>
          </div>
        )}

        {/* 占位：图集 / 更多内容待补 */}
        <section className={styles.detailSection}>
          <div className={styles.detailSectionEyebrow}>
            现场图集 · coming soon
          </div>
          <div className={styles.detailProse}>
            <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>
              更多现场素材正在整理中。完整图集与幕后花絮会陆续在这里补全。
            </p>
          </div>
        </section>

        {/* 收尾导航 */}
        <nav className={styles.detailFoot}>
          <div className={styles.detailFootNav}>
            {prev && (
              <Link href={`/archive/${prev.slug}`}>
                ← {prev.index} · {prev.title}
              </Link>
            )}
            {next && (
              <Link href={`/archive/${next.slug}`}>
                {next.index} · {next.title} →
              </Link>
            )}
          </div>

          <Link href="/work" className={styles.detailFootCta}>
            看看现在能帮你做什么 →
          </Link>
        </nav>
      </main>
    </div>
  );
}
