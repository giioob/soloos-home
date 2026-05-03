"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 顶部导航 —— 像素级复刻 Claude design 的 .nav 区块
export default function Nav() {
  const pathname = usePathname();

  // 把 pathname 映射成 data-link 关键字（首页不高亮任何 nav 项）
  const active = (() => {
    if (pathname.startsWith("/work")) return "work";
    if (pathname.startsWith("/journey")) return "journey";
    if (pathname.startsWith("/resources")) return "resources";
    if (pathname.startsWith("/prompts")) return "prompts";
    if (pathname.startsWith("/about")) return "about";
    return "";
  })();

  const link = (href: string, key: string, label: string) => (
    <Link href={href} className={active === key ? "active" : undefined}>
      {label}
    </Link>
  );

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="star">✻</span>Solo<span className="os">OS</span>
        </Link>
        <div className="nav-links">
          {link("/work", "work", "Work")}
          {link("/journey", "journey", "Journey")}
          {link("/resources", "resources", "Resources")}
          {link("/prompts", "prompts", "Prompts")}
          {link("/about", "about", "About")}
        </div>
        <div className="nav-right">
          {/* 主题切换按钮 —— 文字由 ClientShell 注入 */}
          <button className="theme-toggle" aria-label="切换主题" data-theme-toggle>
            🌙
          </button>
          <Link href="/#contact" className="btn btn-primary">
            联系
          </Link>
        </div>
      </div>
    </nav>
  );
}
