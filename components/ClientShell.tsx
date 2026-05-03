"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ClientShell —— 复刻 design bundle 里 shell.js 的全部行为
 *
 * 1. 主题切换（持久化 localStorage + 检测系统色偏好）—— 只挂一次
 * 2. .reveal 滚动渐入 —— 每次路由切换都要重新 observe（关键 bug 修复）
 * 3. .spotlight-host 鼠标聚光灯
 * 4. [data-copy] 一键复制
 * 5. data-tabs 切换
 *
 * 为什么用 usePathname 做依赖？
 * Next.js App Router 的客户端导航不会卸载 layout 里的组件，
 * 所以 [] 依赖的 useEffect 只跑一次，新页面的 .reveal 元素永远不被 observe。
 * 必须用 pathname 当依赖，让 useEffect 在每次路由变化后重新执行 DOM 查询和挂监听。
 */
export default function ClientShell() {
  const pathname = usePathname();

  // ===== 1. 主题切换（只挂一次） =====
  useEffect(() => {
    const root = document.documentElement;

    // 启动时 boot 脚本已设过 data-theme，这里只负责按钮交互
    function setTheme(t: string) {
      root.setAttribute("data-theme", t);
      localStorage.setItem("soloos-theme", t);
      document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
        (btn as HTMLElement).textContent = t === "dark" ? "☀" : "🌙";
      });
    }
    function toggleTheme() {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    }

    // 同步当前按钮图标
    const buttons = document.querySelectorAll<HTMLElement>("[data-theme-toggle]");
    buttons.forEach((btn) => {
      btn.textContent =
        root.getAttribute("data-theme") === "dark" ? "☀" : "🌙";
      btn.addEventListener("click", toggleTheme);
    });

    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", toggleTheme));
    };
  }, []);

  // ===== 2. 路由变化时：重新挂 reveal / spotlight / copy / tabs =====
  useEffect(() => {
    // ----- Reveal on scroll -----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // 关键：先清掉所有 .reveal 元素上残留的 .in 类，确保新页面进入时重置状态
    // （客户端导航回到曾经访问过的页面时，旧 .in 状态会被 React 重新渲染掉，
    //  但新元素也可能默认就在视口内，要立即触发 IO）
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      io.observe(el);
    });

    // ----- Cursor spotlight -----
    const spotlightHandlers: Array<{ el: Element; fn: (e: Event) => void }> = [];
    document.querySelectorAll(".spotlight-host").forEach((host) => {
      const fn = (e: Event) => {
        const me = e as MouseEvent;
        (host as HTMLElement).style.setProperty("--mx", me.clientX + "px");
        (host as HTMLElement).style.setProperty("--my", me.clientY + "px");
      };
      host.addEventListener("mousemove", fn);
      spotlightHandlers.push({ el: host, fn });
    });

    // ----- Copy buttons -----
    const copyHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    document
      .querySelectorAll<HTMLElement>("[data-copy]")
      .forEach((btn) => {
        const fn = () => {
          const sel = btn.dataset.copy;
          if (!sel) return;
          const target = document.querySelector(sel) as HTMLElement | null;
          if (!target) return;
          navigator.clipboard.writeText(target.innerText).then(() => {
            btn.classList.add("copied");
            const orig = btn.dataset.origText || btn.innerHTML;
            btn.dataset.origText = orig;
            btn.innerHTML = "✓ 已复制";
            showToast("Prompt 已复制到剪贴板");
            setTimeout(() => {
              btn.classList.remove("copied");
              btn.innerHTML = orig;
            }, 1500);
          });
        };
        btn.addEventListener("click", fn);
        copyHandlers.push({ el: btn, fn });
      });

    // ----- Tabs -----
    const tabHandlers: Array<{ el: Element; fn: () => void }> = [];
    document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((group) => {
      const groupId = group.dataset.tabs;
      const btns = group.querySelectorAll<HTMLElement>("[data-tab]");
      btns.forEach((b) => {
        const fn = () => {
          btns.forEach((x) => x.classList.remove("active"));
          document
            .querySelectorAll(`[data-panel][data-group="${groupId}"]`)
            .forEach((p) => p.classList.remove("active"));
          b.classList.add("active");
          document
            .querySelector(
              `[data-panel="${b.dataset.tab}"][data-group="${groupId}"]`
            )
            ?.classList.add("active");
        };
        b.addEventListener("click", fn);
        tabHandlers.push({ el: b, fn });
      });
    });

    return () => {
      io.disconnect();
      spotlightHandlers.forEach(({ el, fn }) =>
        el.removeEventListener("mousemove", fn)
      );
      copyHandlers.forEach(({ el, fn }) =>
        el.removeEventListener("click", fn)
      );
      tabHandlers.forEach(({ el, fn }) =>
        el.removeEventListener("click", fn)
      );
    };
  }, [pathname]);

  return null;
}

// ----- Toast 帮助函数（挂到 window） -----
function showToast(msg: string) {
  let t = document.querySelector(".toast") as HTMLElement | null;
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  const w = window as unknown as { _toastTid?: number };
  window.clearTimeout(w._toastTid);
  w._toastTid = window.setTimeout(() => t!.classList.remove("show"), 1500);
}
