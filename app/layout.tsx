import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  title: "TaleMori",
  description:
    "Ready-to-use story adventure kits for screen-light parent-child play."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="TaleMori home">
            <span className="brand-mark">T</span>
            <span>TaleMori</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/kit/adventure-kit-1">First kit</Link>
            <Link href="/how-it-works">How it works</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>TaleMori creates ready-to-use story adventure kits for screen-light parent-child play.</p>
          <p>Future collectible objects require parent supervision and verified production standards before sale.</p>
        </footer>
      </body>
    </html>
  );
}
