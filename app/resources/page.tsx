import { getAllResources, getCategories } from "../../lib/resources";
import ResourcesClient from "./ResourcesClient";

export const metadata = {
  title: "Resources · 资源库 · SoloOS",
};

// 服务端读 JSON → 传给客户端组件做交互（搜索/筛选）
export default function ResourcesPage() {
  const all = getAllResources();
  const categories = getCategories();

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="t-eyebrow">// RESOURCES</div>
          <h1 className="t-h1">读到好东西就丢进来。</h1>
          <p>
            外部好文 / 工具 / 书籍 / 播客 / 一人公司方法论。点开直接跳原网址，不在本站存内容。
            {all.length > 0 && ` 共 ${all.length} 条。`}
          </p>
        </div>
      </header>

      <ResourcesClient resources={all} categories={categories} />
    </>
  );
}
