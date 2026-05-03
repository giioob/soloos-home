import Link from "next/link";

export const metadata = {
  title: "Work · SoloOS",
};

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// WORK</div>
          <h1 className="t-h1">在做的，能接的，做完的。</h1>
          <p>个人接单 + 一人公司 SoloOS 在跑的业务。每一项都是真实交付过的。</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <p className="t-body">
            这一页正在搭——案例 / 服务 / 心得 三 Tab 视图开发中。
            先回{" "}
            <Link href="/" className="uline">
              首页 Work 概览
            </Link>{" "}
            看 4 个精选。
          </p>
        </div>
      </section>
    </>
  );
}
