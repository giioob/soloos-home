// 4 个类别专属 SVG 图标 —— 给无图项目的概念封面使用
//
// 风格：单线条、stroke = currentColor、可自由缩放。
// 用法：在 placeholder 里居中显示，配合编号 + 标题作为"概念封面"。

import type { ArchiveCategory } from "./projects";

type Props = {
  category: ArchiveCategory;
  className?: string;
  size?: number;
};

export default function ArchiveCategoryIcon({
  category,
  className,
  size = 96,
}: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (category) {
    case "景区文旅":
      // 远山 + 月亮 + 地平线
      return (
        <svg {...common}>
          <circle cx="68" cy="30" r="10" strokeOpacity="0.9" />
          <circle cx="68" cy="30" r="14" strokeOpacity="0.3" />
          <path d="M8 78 L26 52 L42 68 L60 42 L80 62 L92 78" />
          <path d="M8 82 L92 82" strokeOpacity="0.35" />
          <path d="M16 88 L88 88" strokeOpacity="0.18" />
        </svg>
      );

    case "舞美工程":
      // 聚光灯 + 光束
      return (
        <svg {...common}>
          <path d="M38 20 L62 20 L66 30 L34 30 Z" />
          <path d="M50 30 L50 38" strokeOpacity="0.7" />
          <path
            d="M34 30 L14 85"
            strokeOpacity="0.55"
            strokeDasharray="2 4"
          />
          <path
            d="M66 30 L86 85"
            strokeOpacity="0.55"
            strokeDasharray="2 4"
          />
          <path d="M50 38 L50 85" strokeOpacity="0.35" />
          <ellipse cx="50" cy="86" rx="40" ry="3" strokeOpacity="0.18" />
        </svg>
      );

    case "品牌策划":
      // 同心圆 + 十字坐标 —— 像一枚极简 logo
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="34" />
          <circle cx="50" cy="50" r="20" strokeOpacity="0.65" />
          <circle cx="50" cy="50" r="7" fill="currentColor" stroke="none" />
          <path
            d="M50 8 L50 92 M8 50 L92 50"
            strokeOpacity="0.22"
            strokeDasharray="2 4"
          />
        </svg>
      );

    case "活动现场":
      // 烟花 / 放射线
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
          {/* 8 方向放射 */}
          <path d="M50 30 L50 14" />
          <path d="M50 70 L50 86" />
          <path d="M30 50 L14 50" />
          <path d="M70 50 L86 50" />
          <path d="M36 36 L24 24" strokeOpacity="0.7" />
          <path d="M64 36 L76 24" strokeOpacity="0.7" />
          <path d="M36 64 L24 76" strokeOpacity="0.7" />
          <path d="M64 64 L76 76" strokeOpacity="0.7" />
          {/* 外圈点 */}
          <circle cx="50" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="50" cy="92" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="50" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="92" cy="50" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );

    default:
      return null;
  }
}
