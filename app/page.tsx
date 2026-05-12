import Link from "next/link";
import { getAllDocs, type JourneyMeta, type PromptMeta } from "../lib/mdx";
import { getAllResources } from "../lib/resources";
import { ARCHIVE_PROJECTS } from "./archive/projects";
import Image from "next/image";
import {
  HeroIllustration,
  WorkIcon,
  LibraryIcon,
  JourneyIcon,
  ContactIcon,
} from "../components/Illustrations";

// 5 个真实平台的二维码 —— 文件在 public/me/
const QR_PLATFORMS = [
  { name: "微信", file: "/me/qr-wechat.jpg", note: "聊真东西" },
  { name: "公众号", file: "/me/qr-mp.jpg", note: "UNDER风GROUND" },
  { name: "视频号", file: "/me/qr-shipinhao.jpg", note: "刷我的视频" },
  { name: "小红书", file: "/me/qr-xiaohongshu.jpg", note: "图文 + 笔记" },
  { name: "抖音", file: "/me/qr-douyin.jpg", note: "短视频" },
];

// 首页 —— 数据来自 content/ 文件夹，加新内容自动出现在首页
export default function Home() {
  // 取最新 3 篇 Journey
  const journeyDocs = getAllDocs<JourneyMeta>("journey").slice(0, 3);

  // Library 区块：取最新 3 个 prompt + 最新 3 条 resource，交错排列
  const promptDocs = getAllDocs<PromptMeta>("prompts").slice(0, 3);
  const resourceList = getAllResources().slice(0, 3);

  // 数字概览（标题旁 // X 显示真数）
  const totalJourney = getAllDocs<JourneyMeta>("journey").length;
  const totalPrompts = getAllDocs<PromptMeta>("prompts").length;
  const totalResources = getAllResources().length;
  const totalArchive = ARCHIVE_PROJECTS.length;

  // 首页 Archive 板块：取 3 个有真图的 highlight 项目作信任背书
  const featuredArchive = ARCHIVE_PROJECTS.filter(
    (p) => p.highlight && p.cover
  ).slice(0, 3);

  return (
    <>
      {/* ======= HERO ======= */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-inner">
              <div className="hero-eyebrow t-eyebrow reveal in">
                // PERSONAL · BUILD IN PUBLIC · 2026
              </div>
              <h1 className="hero-title reveal in">
                <span className="star-mark entry" aria-hidden="true">
                  ✻
                </span>
                用 <span className="italic-em">AI</span>，<br />
                把一个人 <span className="hero-slash">/</span> 变成一支团队。
              </h1>
              <p className="hero-sub reveal in">
                零代码小白用 90 天造一人公司，公开记录每一步——
                <em>包括失败</em>。
              </p>
              <div className="hero-cta reveal in">
                <Link href="/journey" className="btn btn-primary">
                  开始阅读 →
                </Link>
                <Link href="/about" className="btn btn-ghost">
                  关于我
                </Link>
              </div>
              <div className="hero-meta reveal in">
                <span className="dot"></span>
                <span className="t-meta">LAST UPDATE · 2026.05.03</span>
              </div>
            </div>
            <div className="hero-art reveal in" aria-hidden="true">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </header>

      {/* ======= NOW STATUS BAR ======= */}
      <section className="now-strip reveal">
        <div className="wrap">
          <div className="now-card">
            <div className="now-left">
              <span className="t-eyebrow">// NOW</span>
              <span className="now-pulse"></span>
            </div>
            <div className="now-body">
              <p className="t-quote">
                正在做 <span className="italic-em">SoloOS 的官网</span>。
              </p>
              <div className="now-foot">
                <span className="t-meta">上次更新 · 2026.05.03</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= WORK OVERVIEW ======= */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal section-head-iconed">
            <div className="lead">
              <WorkIcon className="section-icon" />
              <div>
                <div className="t-eyebrow">// WORK · 04</div>
                <h2 className="t-h2">用 AI 帮你做 IP 和内容</h2>
                <p className="desc">
                  三档服务包，明码标价。专做文旅圈老板。
                </p>
              </div>
            </div>
            <Link href="/work" className="more">
              所有业务
            </Link>
          </div>

          <div className="grid-4 reveal">
            <Link href="/work" className="card">
              <div className="card-eyebrow t-eyebrow">// 入门</div>
              <h3>冷启动诊断包</h3>
              <p>90 分钟现场诊断，AI 出 5 条标题、1 张封面图、IP 定位文档。</p>
              <div className="card-foot">
                <span>¥588</span>
                <span>90 分钟</span>
              </div>
            </Link>
            <Link href="/work" className="card">
              <div className="card-eyebrow t-eyebrow">// 主推</div>
              <h3>内容启动包</h3>
              <p>1 周搭账号 + 10 条 AI 内容 + 一份 SOP 文档。</p>
              <div className="card-foot">
                <span>¥3,888</span>
                <span>1 周</span>
              </div>
            </Link>
            <Link href="/work" className="card">
              <div className="card-eyebrow t-eyebrow">// 深度</div>
              <h3>陪跑包</h3>
              <p>30 天 30 条内容 + 4 次复盘会 + 完整 AI 工具包。</p>
              <div className="card-foot">
                <span>¥18,888</span>
                <span>30 天</span>
              </div>
            </Link>
            <Link href="/work" className="card accent-card">
              <div className="card-eyebrow t-eyebrow">// 先聊聊</div>
              <h3>看看适不适合？</h3>
              <p>不确定选哪档？加微信备注「来自 soloos.cc」，先简单聊聊你的情况。</p>
              <div className="card-foot">
                <span>免费</span>
                <span>了解 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ======= ARCHIVE · 信任背书 ======= */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="lead">
              <div className="t-eyebrow">// ARCHIVE · {totalArchive}</div>
              <h2 className="t-h2">
                我之前是<span className="italic-em">文旅人</span>。
              </h2>
              <p className="desc">
                连云港十年文旅活动策划、执行、舞美、品牌——
                {totalArchive} 个项目档案。SoloOS 之前的我。
              </p>
            </div>
            <Link href="/archive" className="more">
              全部 {totalArchive} 项目
            </Link>
          </div>

          <div className="grid-3 reveal" style={{ marginTop: "var(--s-5)" }}>
            {featuredArchive.map((p) => (
              <Link
                href={`/archive/${p.slug}`}
                key={p.slug}
                className="card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                {p.cover && (
                  <div
                    style={{
                      backgroundImage: `url(${p.cover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      aspectRatio: "4 / 3",
                      width: "100%",
                    }}
                    aria-hidden
                  />
                )}
                <div style={{ padding: "var(--s-4)" }}>
                  <div className="card-eyebrow t-eyebrow">
                    // {p.category} · {p.year}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.pitch}</p>
                  <div className="card-foot">
                    <span>{p.subtitle ?? p.client}</span>
                    <span>查看 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======= RESOURCES + PROMPTS ======= */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal section-head-iconed">
            <div className="lead">
              <LibraryIcon className="section-icon" />
              <div>
                <div className="t-eyebrow">// LIBRARY · 资源 + PROMPT</div>
                <h2 className="t-h2">收的，写的，都在这里。</h2>
                <p className="desc">
                  读到好东西就丢进 Resources，写好的 prompt 就丢进 Prompts。两个库都开源，可搜可筛可抄。
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
              <Link href="/resources" className="more">
                资源库 · {totalResources}
              </Link>
              <Link href="/prompts" className="more">
                Prompt 库 · {totalPrompts}
              </Link>
            </div>
          </div>

          <div className="grid-3 reveal">
            {/* 交错呈现：3 个 prompt + 3 个 resource，按 P R P R P R 顺序 */}
            {Array.from({ length: 3 }).flatMap((_, i) => {
              const cards = [];
              const p = promptDocs[i];
              if (p) {
                cards.push(
                  <Link
                    key={`p-${p.slug}`}
                    href={`/prompts/${p.slug}`}
                    className="card mini accent-card"
                  >
                    <div className="card-eyebrow t-eyebrow">
                      // MINE · {p.meta.scenario}
                    </div>
                    <h3>{p.meta.title}</h3>
                    {(p.meta as PromptMeta & { summary?: string }).summary && (
                      <p>
                        {(p.meta as PromptMeta & { summary?: string }).summary}
                      </p>
                    )}
                    <div className="card-foot">
                      <span>{p.meta.tested ? "已测试 ✓" : "未测试"}</span>
                      <span>查看 →</span>
                    </div>
                  </Link>
                );
              }
              const r = resourceList[i];
              if (r) {
                cards.push(
                  <a
                    key={`r-${r.url}`}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card mini"
                  >
                    <div className="card-eyebrow t-eyebrow">// {r.category}</div>
                    <h3>{r.title}</h3>
                    {r.note && <p>{r.note}</p>}
                    <div className="card-foot">
                      <span>{r.source}</span>
                      <span>{r.added.slice(5)} ↗</span>
                    </div>
                  </a>
                );
              }
              return cards;
            })}
          </div>
        </div>
      </section>

      {/* ======= JOURNEY ======= */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal section-head-iconed">
            <div className="lead">
              <JourneyIcon className="section-icon" />
              <div>
                <div className="t-eyebrow">// JOURNEY · 90 DAYS</div>
                <h2 className="t-h2">
                  <span className="italic-em">公开</span>记录每一步——包括失败。
                </h2>
                <p className="desc">
                  90 天裸辞日记。每周 2-3 篇。哪天卡住了、哪天赚到第一块钱、哪天差点放弃，都在这里。
                </p>
              </div>
            </div>
            <Link href="/journey" className="more">
              全部 {totalJourney} 篇
            </Link>
          </div>

          <div className="journey-list reveal">
            {journeyDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/journey/${doc.slug}`}
                className="journey-row"
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
        </div>
      </section>

      {/* ======= CONTACT CTA ======= */}
      <section className="section contact-cta" id="contact">
        <div className="wrap">
          <div className="contact-card reveal">
            <div className="contact-left">
              <ContactIcon
                className="section-icon"
                style={{ marginBottom: 16 }}
              />
              <div className="t-eyebrow">// CONTACT</div>
              <h2 className="t-h2">
                想聊聊？或者
                <span className="italic-em">一起做点什么</span>？
              </h2>
              <p
                className="desc"
                style={{
                  marginTop: 12,
                  color: "var(--ink-soft)",
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                无论是想接 AI 服务、想加社群一起 build、还是单纯想问个问题——
                <br />
                我都看，回得不快但每条都回。
              </p>
              <div className="contact-rows">
                <div className="contact-row">
                  <span className="t-meta">邮箱</span>
                  <a
                    href="mailto:lygrenhong@me.com"
                    style={{ color: "var(--ink)" }}
                  >
                    lygrenhong@me.com
                  </a>
                </div>
                <div className="contact-row">
                  <span className="t-meta">公众号</span>
                  <span>UNDER风GROUND</span>
                </div>
                <div className="contact-row">
                  <span className="t-meta">微信</span>
                  <span style={{ color: "var(--ink-mute)" }}>稍后开放</span>
                </div>
              </div>
            </div>
            <div className="contact-right">
              <div
                className="contact-link"
                style={{ opacity: 0.55, pointerEvents: "none" }}
              >
                <div className="t-eyebrow">// 知识星球</div>
                <h3>SoloOS · Build in Public</h3>
                <p>每天一条进度 + 每周直播</p>
                <span className="ext">筹备中</span>
              </div>
              <div
                className="contact-link"
                style={{ opacity: 0.55, pointerEvents: "none" }}
              >
                <div className="t-eyebrow">// 小报童</div>
                <h3>一人公司方法论</h3>
                <p>付费专栏，每周一更</p>
                <span className="ext">筹备中</span>
              </div>
            </div>
          </div>

          {/* —— 5 个平台二维码 —— */}
          <div className="qr-strip reveal">
            <div className="qr-strip-head">
              <div className="t-eyebrow">// FOLLOW · 扫码关注</div>
              <p className="t-meta" style={{ marginTop: 6 }}>
                直接扫码，最快的"找到我"。
              </p>
            </div>
            <div className="qr-grid">
              {QR_PLATFORMS.map((p) => (
                <div key={p.name} className="qr-card">
                  <div className="qr-img-wrap">
                    <Image
                      src={p.file}
                      alt={`${p.name} 二维码`}
                      width={300}
                      height={300}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                  <div className="qr-meta">
                    <strong>{p.name}</strong>
                    <span className="t-meta">{p.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
