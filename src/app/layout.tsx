import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SiteHeader from "@/components/SiteHeader";

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
        <LanguageProvider>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
