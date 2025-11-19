"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { coffeeShops } from "@/data/coffeeShops";

export default function CoffeeShopList() {
  const [city, setCity] = useState<string>("all");
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Список городов без повторов
  const cities = useMemo(
    () => Array.from(new Set(coffeeShops.map((s) => s.city))).sort(),
    []
  );

  // Применяем фильтры
  const filtered = coffeeShops.filter((s) => {
    if (city !== "all" && s.city !== city) return false;
    if (onlyVerified && !s.verified) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Фильтры */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-sm">
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

      {/* Список кофеен */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((shop) => (
          <Link
            key={shop.slug}
            href={`/coffee-shops/${shop.slug}`}
            className="block rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-500 transition-colors"
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
