import Link from "next/link";

// 全局 Footer —— 像素级复刻 Claude design 的 .footer 区块
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="name">
              ✻ Solo<span style={{ color: "var(--accent)" }}>OS</span>
            </div>
            <p className="tag">
              用 AI 把一个人变成一支团队。一个零代码小白用 90 天裸辞造一人公司的公开实验室。
            </p>
          </div>
          <div>
            <h4>站点</h4>
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/journey">Journey</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/prompts">Prompts</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4>社区</h4>
            <ul>
              <li><a href="#">知识星球</a></li>
              <li><a href="#">小报童</a></li>
              <li><a href="#">公众号</a></li>
              <li><a href="#">微信社群</a></li>
            </ul>
          </div>
          <div>
            <h4>关注</h4>
            <ul>
              <li><a href="#">小红书</a></li>
              <li><a href="#">即刻</a></li>
              <li><a href="#">X / Twitter</a></li>
              <li><a href="https://github.com/giioob" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SOLOOS · MADE BY HONG</span>
          <span>LAST UPDATED · 2026.05.03</span>
        </div>
      </div>
    </footer>
  );
}
