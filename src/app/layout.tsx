import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Wide Coffee Guide",
  description: "Веб-сайт-гид по specialty-кофейням третьей волны",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
        <header className="border-b border-zinc-800">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold">
              WWCoffeeGuide
            </Link>
            <nav className="flex gap-4 text-sm text-zinc-300">
              <Link href="/about">О проекте</Link>
              <Link href="/apply">Как подать заявку</Link>
              <Link href="/account">Личный кабинет</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
