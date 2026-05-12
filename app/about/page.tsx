import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About · SoloOS",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// ABOUT</div>
          <h1 className="t-h1">关于 SoloOS</h1>
          <p>
            正在用 AI 打造一人公司——90 天，全程公开。包括失败。
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap-r">
          {/* 真照片代替之前的 ✻ 占位 */}
          <div
            className="avatar-frame"
            style={{
              width: 200,
              height: 200,
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              border: "1px solid var(--ink-line)",
              marginBottom: "var(--s-5)",
            }}
          >
            <Image
              src="/me/avatar.jpg"
              alt="Hong / 任弘"
              width={400}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>

          <p className="t-body" style={{ marginBottom: "var(--s-4)" }}>
            <strong style={{ color: "var(--ink)" }}>任弘</strong> · 公众号{" "}
            <a
              className="uline"
              href="https://mp.weixin.qq.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UNDER风GROUND
            </a>{" "}
            主理人。
          </p>

          <p className="t-body">
            这一页详细版正在写。先去{" "}
            <Link href="/journey" className="uline">
              Journey 看每天发生了什么
            </Link>
            ，或{" "}
            <Link href="/#contact" className="uline">
              扫码加我聊
            </Link>
            。
          </p>
        </div>
      </section>
    </>
  );
}
