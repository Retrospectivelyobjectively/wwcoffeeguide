"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

const languages = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {languages.map(({ code, label }) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={[
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              active
                ? "border border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
