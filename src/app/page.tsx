"use client";

import CoffeeShopList from "@/components/CoffeeShopList";
import { dictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HomePage() {
  const { language } = useLanguage();
  const t = dictionary[language].home;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{t.title}</h1>
        <p className="max-w-2xl text-zinc-300">{t.intro}</p>
      </header>

      <CoffeeShopList />
    </section>
  );
}
