"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { coffeeShops, type BrewMethod } from "@/data/coffeeShops";

const brewMethodLabels: Record<BrewMethod, string> = {
  v60: "V60",
  chemex: "Chemex",
  kalita: "Kalita",
  aeropress: "AeroPress",
  batch: "Batch brew",
};

export default function CoffeeShopList() {
  const [city, setCity] = useState<string>("all");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [brewMethods, setBrewMethods] = useState<BrewMethod[]>([]);
  const [onlyWifi, setOnlyWifi] = useState(false);
  const [onlyOutlets, setOnlyOutlets] = useState(false);
  const [onlyGoodForWork, setOnlyGoodForWork] = useState(false);
  const [onlyEspresso, setOnlyEspresso] = useState(false);

  // Уникальные города из данных
  const cities = useMemo(
    () => Array.from(new Set(coffeeShops.map((s) => s.city))).sort(),
    []
  );

  // Переключение метода заваривания в фильтре
  const toggleBrewMethod = (method: BrewMethod) => {
    setBrewMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  // Применяем все фильтры к списку кофеен
  const filtered = coffeeShops.filter((s) => {
    if (city !== "all" && s.city !== city) return false;
    if (onlyVerified && !s.verified) return false;

    // Если выбраны какие-то методы заваривания — оставляем кофейни,
    // у которых есть хотя бы один из этих методов
    if (
      brewMethods.length > 0 &&
      !brewMethods.some((m) => s.brewMethods.includes(m))
    ) {
      return false;
    }

    if (onlyWifi && !s.hasWifi) return false;
    if (onlyOutlets && !s.hasOutlets) return false;
    if (onlyGoodForWork && !s.goodForWork) return false;
    if (onlyEspresso && !s.hasEspresso) return false;

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Панель фильтров */}
      <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-sm">
        {/* Верхняя строка: город + Verified + счётчик */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Город:</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm"
            >
              <option value="all">Все города</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
            />
            <span className="text-zinc-400">Только Verified</span>
          </label>

          <span className="ml-auto text-xs text-zinc-500">
            Показано кофеен: {filtered.length}
          </span>
        </div>

        {/* Вторая строка: методы заваривания и удобства */}
        <div className="flex flex-wrap gap-4">
          {/* Методы заваривания */}
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Методы заваривания
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(brewMethodLabels).map(([key, label]) => {
                const method = key as BrewMethod;
                const active = brewMethods.includes(method);
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => toggleBrewMethod(method)}
                    className={[
                      "rounded-full border px-2 py-0.5 text-xs transition-colors",
                      active
                        ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                        : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Удобства */}
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Удобства
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlyWifi}
                  onChange={(e) => setOnlyWifi(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                />
                <span className="text-xs text-zinc-300">Wi-Fi</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlyOutlets}
                  onChange={(e) => setOnlyOutlets(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                />
                <span className="text-xs text-zinc-300">Розетки</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlyGoodForWork}
                  onChange={(e) => setOnlyGoodForWork(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                />
                <span className="text-xs text-zinc-300">Подходит для работы</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlyEspresso}
                  onChange={(e) => setOnlyEspresso(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                />
                <span className="text-xs text-zinc-300">Эспрессо</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Список кофеен */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((shop) => (
          <Link
            key={shop.slug}
            href={`/coffee-shops/${shop.slug}`}
            className="block rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-500"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              {shop.verified && (
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  Verified
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-400">
              {shop.city}
              {shop.district ? ` • ${shop.district}` : ""}
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              Обжарщики: {shop.roasters.join(", ")}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Происхождение: {shop.originCountry} • Обработка: {shop.process}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                Альтернативы: {shop.brewMethods.join(", ")}
              </span>
              {shop.hasEspresso && (
                <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                  Эспрессо
                </span>
              )}
              {shop.hasWifi && (
                <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                  Wi-Fi
                </span>
              )}
              {shop.hasOutlets && (
                <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                  Розетки
                </span>
              )}
              {shop.goodForWork && (
                <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                  Подходит для работы
                </span>
              )}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-zinc-400">
            По выбранным фильтрам пока нет кофеен.
          </p>
        )}
      </div>
    </div>
  );
}
