import type { Metadata } from "next";
import Link from "next/link";
import "./styles.css";

export const metadata: Metadata = {
  title: "Milamula",
  description: "Warm story-and-activity kits for parent-child creative time."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Milamula home">
            <span className="brand-mark">M</span>
            <span>Milamula</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/kit/adventure-kit-1">Kit #1</Link>
            <Link href="/how-it-works">How it works</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>Milamula is exploring story-led activity kits for parent-child time.</p>
          <p>Physical objects require parent supervision and verified production standards before sale.</p>
        </footer>
      </body>
    </html>
  );
}
