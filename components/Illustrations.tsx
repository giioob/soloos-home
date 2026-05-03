// 手绘风 SVG 插画 —— 全部用 var(--ink) + var(--accent) 上色
// 亮模式自动 黑线 + 焦糖珊瑚；暗模式自动 暖象牙 + 暖珊瑚
//
// 风格锚点：Zara's Tokyo List 那种细线手绘 + 单色点缀，
// 主题契合 SoloOS 「一个人 + AI = 一支团队」

import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

/** Hero 大插画 —— 一个人在笔电前 + 周围漂浮的 ✻ */
export function HeroIllustration(props: Props) {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--ink)"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* 桌面 */}
      <line x1="40" y1="240" x2="280" y2="240" />
      {/* 笔记本底座 */}
      <line x1="80" y1="238" x2="240" y2="238" strokeWidth="2.4" />
      {/* 笔记本屏幕 */}
      <rect x="100" y="160" width="120" height="78" rx="4" />
      {/* 屏幕里：放大的 ✻ */}
      <g stroke="var(--accent)" strokeWidth="1.8">
        <line x1="160" y1="180" x2="160" y2="220" />
        <line x1="140" y1="200" x2="180" y2="200" />
        <line x1="146" y1="186" x2="174" y2="214" />
        <line x1="174" y1="186" x2="146" y2="214" />
      </g>
      {/* 人头 */}
      <circle cx="160" cy="98" r="22" />
      {/* 头发线条（一撇刘海） */}
      <path d="M148 86 Q156 78 168 84" />
      {/* 身体（梯形毛衣） */}
      <path d="M138 138 L138 160 L182 160 L182 138 Z" />
      {/* 脖子两笔 */}
      <line x1="152" y1="120" x2="148" y2="138" />
      <line x1="168" y1="120" x2="172" y2="138" />
      {/* 左臂搭桌 */}
      <path d="M138 145 Q120 152 110 162" />
      {/* 右臂搭桌 */}
      <path d="M182 145 Q200 152 210 162" />
      {/* 左边咖啡杯 */}
      <g>
        <rect x="56" y="218" width="22" height="22" rx="2" />
        <path d="M78 222 Q86 222 86 230 Q86 238 78 238" />
        {/* 咖啡热气 */}
        <path d="M62 212 Q60 206 64 200" />
        <path d="M70 214 Q72 208 68 202" />
      </g>
      {/* 右上角漂浮 ✻ A */}
      <g stroke="var(--accent)" strokeWidth="1.4" transform="translate(252 78)">
        <line x1="-12" y1="0" x2="12" y2="0" />
        <line x1="0" y1="-12" x2="0" y2="12" />
        <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
        <line x1="8.5" y1="-8.5" x2="-8.5" y2="8.5" />
      </g>
      {/* 左上漂浮 ✻ B（小）*/}
      <g stroke="var(--accent)" strokeWidth="1.2" transform="translate(70 60)">
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="0" y1="-7" x2="0" y2="7" />
        <line x1="-5" y1="-5" x2="5" y2="5" />
        <line x1="5" y1="-5" x2="-5" y2="5" />
      </g>
      {/* 右下漂浮 ✻ C（极小）*/}
      <g stroke="var(--accent)" strokeWidth="1.1" transform="translate(264 200)">
        <line x1="-5" y1="0" x2="5" y2="0" />
        <line x1="0" y1="-5" x2="0" y2="5" />
        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
        <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" />
      </g>
      {/* 头顶上方"灵感"小线条点缀 */}
      <g stroke="var(--ink-mute)" strokeWidth="1">
        <line x1="148" y1="62" x2="152" y2="56" />
        <line x1="160" y1="56" x2="160" y2="50" />
        <line x1="172" y1="62" x2="168" y2="56" />
      </g>
    </svg>
  );
}

/** WORK · 工具 / 工作台（扳手 + 文件） */
export function WorkIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 80 60"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--ink)"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* 文件夹 */}
      <path d="M8 16 L20 16 L24 12 L52 12 L52 48 L8 48 Z" />
      <line x1="8" y1="22" x2="52" y2="22" />
      {/* 文件夹上盖 */}
      <line x1="14" y1="32" x2="46" y2="32" />
      <line x1="14" y1="40" x2="38" y2="40" />
      {/* 笔（焦糖色斜置） */}
      <g stroke="var(--accent)" strokeWidth="1.6">
        <line x1="56" y1="44" x2="72" y2="14" />
        <path d="M54 48 L58 42 L60 44 L56 50 Z" fill="var(--accent)" />
      </g>
    </svg>
  );
}

/** LIBRARY · 书堆 + 一个 ✻ 标签 */
export function LibraryIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 80 60"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--ink)"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* 底层书 */}
      <rect x="8" y="40" width="50" height="10" rx="1" />
      <line x1="14" y1="40" x2="14" y2="50" />
      {/* 中层书 */}
      <rect x="14" y="28" width="42" height="12" rx="1" />
      <line x1="48" y1="28" x2="48" y2="40" />
      {/* 顶层书（细） */}
      <rect x="20" y="20" width="32" height="8" rx="1" />
      {/* ✻ 标签（书签） */}
      <g stroke="var(--accent)" strokeWidth="1.6" transform="translate(64 18)">
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="0" y1="-7" x2="0" y2="7" />
        <line x1="-5" y1="-5" x2="5" y2="5" />
        <line x1="5" y1="-5" x2="-5" y2="5" />
      </g>
      {/* 书签丝带从书顶下来 */}
      <path d="M64 11 L64 4" stroke="var(--accent)" strokeWidth="1.4" />
    </svg>
  );
}

/** JOURNEY · 打开的笔记本 + 一行字 */
export function JourneyIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 80 60"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--ink)"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* 笔记本左页 */}
      <path d="M8 14 L38 10 L38 50 L8 54 Z" />
      {/* 笔记本右页 */}
      <path d="M38 10 L68 14 L68 54 L38 50 Z" />
      {/* 中间装订线 */}
      <line x1="38" y1="10" x2="38" y2="50" />
      {/* 左页几行字（细线条） */}
      <line x1="14" y1="22" x2="32" y2="20" strokeWidth="1" />
      <line x1="14" y1="28" x2="32" y2="26" strokeWidth="1" />
      <line x1="14" y1="34" x2="28" y2="32" strokeWidth="1" />
      {/* 右页：一个圈起来的 day 标记（焦糖色） */}
      <circle
        cx="50"
        cy="22"
        r="5"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <line x1="58" y1="32" x2="62" y2="30" strokeWidth="1" />
      <line x1="44" y1="38" x2="62" y2="36" strokeWidth="1" />
      <line x1="44" y1="44" x2="58" y2="42" strokeWidth="1" />
    </svg>
  );
}

/** CONTACT · 纸飞机 */
export function ContactIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 80 60"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--ink)"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* 飞机轮廓 */}
      <path d="M8 30 L70 8 L52 50 L40 36 L8 30 Z" />
      {/* 飞机折痕 */}
      <line x1="40" y1="36" x2="70" y2="8" />
      {/* 飞行轨迹（虚线 + 焦糖色） */}
      <path
        d="M2 50 Q12 44 22 46"
        stroke="var(--accent)"
        strokeDasharray="2 3"
        strokeWidth="1.3"
      />
    </svg>
  );
}
