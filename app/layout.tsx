import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ClientShell from "../components/ClientShell";

// 主无衬线 (Claude UI / 正文)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 主衬线 (标题，Tiempos 替代)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

// 等宽 (代码 / Prompt / mono 标签)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// 中文衬线 (思源宋体) ——
// Next.js 16 + Turbopack 对 Noto_Serif_SC 的 next/font 集成有兼容问题，
// 改用传统 <link> 标签从 Google Fonts 加载，效果一致
const notoSerifSCHref =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://soloos.cc"),
  title: "SoloOS · 用 AI 把一个人变成一支团队",
  description:
    "正在用 AI 打造一人公司——90 天，全程公开。包括失败。",
  openGraph: {
    title: "SoloOS · 用 AI 把一个人变成一支团队",
    description:
      "正在用 AI 打造一人公司——90 天，全程公开。包括失败。",
    url: "https://soloos.cc",
    siteName: "SoloOS",
    images: [
      {
        url: "/me/underground-logo.png",
        width: 1240,
        height: 1240,
        alt: "SoloOS · UNDER风GROUND",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SoloOS · 用 AI 把一个人变成一支团队",
    description: "正在用 AI 打造一人公司——90 天，全程公开。包括失败。",
    images: ["/me/underground-logo.png"],
  },
};

// 在客户端水合前先把 data-theme 设好，避免亮模式闪烁
const themeBootScript = `
(function(){
  try {
    var stored = localStorage.getItem('soloos-theme');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={notoSerifSCHref} />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <ClientShell />
      </body>
    </html>
  );
}
