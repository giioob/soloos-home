"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// 顶部导航 —— 桌面横排 / 移动汉堡菜单
export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // 路由切换时自动关菜单
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);


  // 把 pathname 映射成 data-link 关键字（首页不高亮任何 nav 项）
  const active = (() => {
    if (pathname.startsWith("/work")) return "work";
    if (pathname.startsWith("/journey")) return "journey";
    if (pathname.startsWith("/archive")) return "archive";
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

        {/* 桌面端横排链接 */}
        <div className="nav-links">
          {link("/work", "work", "业务")}
          {link("/archive", "archive", "项目")}
          {link("/journey", "journey", "日记")}
          {link("/resources", "resources", "资源")}
          {link("/prompts", "prompts", "Prompts")}
          {link("/about", "about", "关于")}
        </div>

        <div className="nav-right">
          <button
            className="theme-toggle"
            aria-label="切换主题"
            data-theme-toggle
          >
            🌙
          </button>
          <Link href="/#contact" className="btn btn-primary nav-contact-btn">
            联系
          </Link>
          {/* 移动端汉堡菜单按钮（≤720px 才显示）*/}
          <button
            className={`nav-burger ${menuOpen ? "is-open" : ""}`}
            aria-label="菜单"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* 移动端展开菜单（用 max-height 动画，干净） */}
      <div className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}>
        <div className="nav-mobile-inner">
          {link("/work", "work", "业务")}
          {link("/archive", "archive", "项目")}
          {link("/journey", "journey", "日记")}
          {link("/resources", "resources", "资源")}
          {link("/prompts", "prompts", "Prompts")}
          {link("/about", "about", "关于")}
          <Link href="/#contact" className="nav-mobile-contact">
            联系 →
          </Link>
        </div>
      </div>
    </nav>
  );
}
