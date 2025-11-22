"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function SiteHeader() {
  const { language } = useLanguage();
  const t = dictionary[language].nav;

  return (
    <header className="border-b border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          WWCoffeeGuide
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/about">{t.about}</Link>
          <Link href="/apply">{t.apply}</Link>
          <Link href="/account">{t.account}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
