import Link from "next/link";

export const metadata = {
  title: "About · SoloOS",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// ABOUT</div>
          <h1 className="t-h1">关于 Hong &amp; SoloOS</h1>
          <p>
            零代码小白。正在裸辞 90 天用 AI 打造一人公司。
            这一页正在写——先去看{" "}
            <Link href="/journey" className="uline">
              90 天日记
            </Link>{" "}
            或{" "}
            <Link href="/" className="uline">
              首页
            </Link>
            。
          </p>
        </div>
      </header>
      <section className="section">
        <div className="wrap-r">
          <p className="t-body">这一页 Coming Soon。详细个人简介、时间线、核心价值观会在 V1 上线前补完。</p>
        </div>
      </section>
    </>
  );
}
