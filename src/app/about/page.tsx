"use client";

import { dictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = dictionary[language].about;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{t.title}</h1>
        <p className="max-w-3xl text-zinc-300">
          Это веб-гид по specialty кофейням третьей волны. Мы делаем акцент на качество, прозрачность
          и понятные критерии отбора, а не на список «популярных мест рядом».
        </p>
      </header>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{t.audience}</h2>
        <div className="space-y-2 text-zinc-300">
          <p>Путешественники и туристы, которым важен хороший кофе в незнакомом городе.</p>
          <p>Люди, кто уже интересуется specialty-кофе и хочет открывать новые места.</p>
          <p>Бариста и обжарщики, которым важно понимать, какие кофейни разделяют похожие стандарты качества.</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{t.difference}</h2>
        <div className="space-y-2 text-zinc-300">
          <p>Обычные карты показывают все кофейни подряд по рейтингу и расстоянию.</p>
          <p>
            WWCoffeeGuide показывает только заведения, которые соответствуют набору критериев: specialty-кофе,
            работа с местными обжарщиками, альтернативные методы заваривания, прозрачность информации.
          </p>
          <p>Важно не только «вкусно/невкусно», но и сам подход к кофе.</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{t.criteria}</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-300">
          <li>Работа со specialty-зерном: известное происхождение и адекватное качество.</li>
          <li>Местные обжарщики: обжарка в той же стране или регионе, где находится кофейня.</li>
          <li>Наличие хотя бы одного альтернативного метода заваривания: V60, Chemex, Kalita, AeroPress, batch brew и т. д.</li>
          <li>Прозрачная информация о зерне на пачке: обжарщик, страна происхождения, способ обработки.</li>
          <li>Базовые профессиональные практики: помол перед приготовлением, использование весов, профильное оборудование.</li>
        </ul>
        <p className="text-sm text-zinc-400">
          Критерии могут меняться со временем. В пограничных случаях кофейня всегда может связаться с командой гида для уточнения.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{t.roadmap}</h2>
        <div className="space-y-2 text-zinc-300">
          <p>Расширим базу кофеен в разных странах и городах.</p>
          <p>Добавим личные кабинеты, избранное и отзывы, чтобы сохранять и делиться находками.</p>
          <p>Разовьём систему Verified, где модераторы или приглашённые эксперты лично посещают кофейни.</p>
        </div>
      </div>
    </section>
  );
}
