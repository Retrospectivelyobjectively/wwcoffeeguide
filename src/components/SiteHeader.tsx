"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useAuth } from "@/auth/AuthProvider";

export default function SiteHeader() {
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();
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
          {currentUser ? (
            <>
              <Link href="/account" className="font-medium text-zinc-100">
                Личный кабинет
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-zinc-400 transition-colors hover:text-emerald-300"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="font-medium text-zinc-100">
              Войти
            </Link>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
