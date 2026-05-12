import Link from "next/link";
import { ARCHIVE_PROJECTS } from "../archive/projects";

export const metadata = {
  title: "业务 · SoloOS",
  description:
    "用 AI 帮文旅圈老板做 IP / 内容 / 招生。三档服务包，明码标价。",
};

const SKUS = [
  {
    eyebrow: "// 入门",
    name: "冷启动诊断包",
    price: "¥588",
    duration: "90 分钟",
    pitch: "适合账号还没起步、想先看 AI 能做什么的老板。",
    deliverables: [
      "90 分钟 1v1 视频或线下深聊",
      "现场用 AI 出 5 条爆款标题，你的号能直接发",
      "现场用 AI 出 1 张封面样图",
      "IP 定位文档（一句话定位 + 受众画像 + 内容方向）",
      "账号头像 / 简介改造稿",
    ],
  },
  {
    eyebrow: "// 主推",
    name: "内容启动包",
    price: "¥3,888",
    duration: "1 周交付",
    pitch: "适合想自己持续做但缺章法的账号主理人。",
    deliverables: [
      "平台账号搭建（小红书 + 视频号 / 抖音）",
      "10 条 AI 生产的内容（图 + 文 / 视频脚本）",
      "一份《AI 内容生产 SOP》文档，之后能自己复用",
      "30 分钟交付复盘 + 7 天微信答疑",
    ],
  },
  {
    eyebrow: "// 深度",
    name: "陪跑包",
    price: "¥18,888",
    duration: "30 天",
    pitch: "适合有招生 / 销售 KPI、需要一个月内看到账号起势的老板。",
    deliverables: [
      "30 条内容生产 + 排期发布",
      "每周 1 次复盘视频会（共 4 次）",
      "完整 AI 工具包：prompt 模板 + 工作流",
      "30 天数据报告 + 续做建议",
    ],
  },
];

const FAQS = [
  {
    q: "可以远程合作吗？",
    a: "诊断包和内容启动包都可以远程视频。陪跑包优先长三角及周边线下见面，远程也能做，看具体情况。",
  },
  {
    q: "如果效果不达预期能退款吗？",
    a: "诊断包当场交付完成后不可退。内容启动包未开始交付前可退 80%。陪跑包前 7 天可退 50%，过了不退，但会保证做满 30 天。",
  },
  {
    q: "我能不能先加你微信简单聊聊？",
    a: "可以。扫首页二维码加我，备注「来自 soloos.cc」。简单了解没问题，深入诊断建议直接预约「冷启动诊断包」。",
  },
  {
    q: "我不在文旅行业，也能合作吗？",
    a: "如果是文旅圈老板介绍的非文旅项目，欢迎聊。完全没有文旅连接的陌生行业暂时不主动接，避免做不好砸自己招牌。",
  },
];

// 信任背书条 —— 取 6 个有真图的 highlight 项目
const FEATURED_CASES = ARCHIVE_PROJECTS.filter(
  (p) => p.highlight && p.cover
).slice(0, 6);

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// 业务</div>
          <h1 className="t-h1">用 AI 帮你做 IP 和内容</h1>
          <p>三档服务包，明码标价。专做文旅圈老板。</p>
        </div>
      </header>

      {/* 我服务谁 */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="lead">
              <div className="t-eyebrow">// 服务对象</div>
              <h2 className="t-h2">文旅圈老板</h2>
              <p className="desc">
                我对接文旅景区多年，做过活动策划、执行、创意。把这些年的经验加上 AI，帮你解决内容和招生的问题。
              </p>
            </div>
          </div>

          <div className="grid-3 reveal" style={{ marginTop: "var(--s-5)" }}>
            <div className="card">
              <h3>民宿 / 精品酒店主理人</h3>
              <p>有客房有故事但流量起不来，AI 内容能直接打到种草。</p>
            </div>
            <div className="card">
              <h3>活动策划 / 地接旅行社</h3>
              <p>用 AI 把策划方案、宣传素材、客户提案做快做好。</p>
            </div>
            <div className="card">
              <h3>文旅 MCN / 个人 IP</h3>
              <p>已经在做内容但产能有限，AI 提效让一人产出像一支团队。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 信任背书 —— 引流到 /archive */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="lead">
              <div className="t-eyebrow">// 信任背书</div>
              <h2 className="t-h2">凭什么相信我？</h2>
              <p className="desc">
                {ARCHIVE_PROJECTS.length} 个文旅项目档案——十年现场经验。
                AI 是新工具，文旅是老本行。
              </p>
            </div>
            <Link href="/archive" className="more">
              全部 {ARCHIVE_PROJECTS.length} 项目 →
            </Link>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--s-3)",
              marginTop: "var(--s-5)",
            }}
          >
            {FEATURED_CASES.map((p) => (
              <Link
                key={p.slug}
                href={`/archive/${p.slug}`}
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                <div
                  style={{
                    padding: "var(--s-3)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    flex: 1,
                  }}
                >
                  <span className="t-meta">
                    {p.category} · {p.year}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: 1.3,
                      margin: 0,
                      color: "var(--ink)",
                    }}
                  >
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 三档 SKU */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="lead">
              <div className="t-eyebrow">// 服务包</div>
              <h2 className="t-h2">三档可选</h2>
            </div>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--s-4)",
              marginTop: "var(--s-5)",
            }}
          >
            {SKUS.map((sku) => (
              <div
                key={sku.name}
                className="card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="card-eyebrow t-eyebrow">{sku.eyebrow}</div>
                <h3>{sku.name}</h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--s-3)",
                    margin: "var(--s-2) 0 var(--s-3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 32,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    {sku.price}
                  </span>
                  <span className="t-meta">{sku.duration}</span>
                </div>
                <p style={{ marginBottom: "var(--s-4)" }}>{sku.pitch}</p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: 14.5,
                    lineHeight: 1.75,
                    color: "var(--ink-soft)",
                    flex: 1,
                  }}
                >
                  {sku.deliverables.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        paddingLeft: 20,
                        position: "relative",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--accent)",
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap-r">
          <div className="t-eyebrow">// 常见问题</div>
          <h2 className="t-h2">合作前你可能想知道</h2>

          <div style={{ marginTop: "var(--s-5)" }}>
            {FAQS.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--s-4) 0",
                  borderBottom: "1px solid var(--ink-line-soft)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 17,
                    fontWeight: 600,
                    marginBottom: "var(--s-2)",
                    color: "var(--ink)",
                  }}
                >
                  {item.q}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "var(--ink-soft)",
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="t-eyebrow">// 联系我</div>
          <h2 className="t-h2">想合作？</h2>
          <p
            className="t-body"
            style={{ maxWidth: 520, margin: "var(--s-4) auto var(--s-5)" }}
          >
            扫首页二维码加我微信，备注「来自 soloos.cc」即可。
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--s-3)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/#contact" className="btn btn-primary">
              扫码加微信
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
