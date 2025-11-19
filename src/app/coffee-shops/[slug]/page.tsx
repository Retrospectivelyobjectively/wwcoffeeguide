"use client";

import { useParams } from "next/navigation";
import { coffeeShops } from "@/data/coffeeShops";

export default function CoffeeShopPage() {
  const params = useParams<{ slug: string | string[] }>();

  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const shop = coffeeShops.find((s) => s.slug === slug);

  if (!shop) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Кофейня не найдена</h1>
        <p className="text-zinc-300">
          slug из URL:{" "}
          <code className="text-xs bg-zinc-900 px-1 py-0.5 rounded">
            {slug ?? "(пусто)"}
          </code>
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">{shop.name}</h1>
        {shop.verified && (
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
            Verified
          </span>
        )}
      </div>

      <p className="text-zinc-300">
        {shop.city}
        {shop.district ? ` • ${shop.district}` : ""}
      </p>

      <div className="space-y-2 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">Обжарщики:</span>{" "}
          {shop.roasters.join(", ")}
        </p>
        <p>
          <span className="text-zinc-400">Происхождение:</span>{" "}
          {shop.originCountry}
        </p>
        <p>
          <span className="text-zinc-400">Способ обработки:</span>{" "}
          {shop.process}
        </p>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">Альтернативные методы:</span>{" "}
          {shop.brewMethods.join(", ")}
        </p>
        <p>
          <span className="text-zinc-400">Эспрессо:</span>{" "}
          {shop.hasEspresso ? "есть" : "нет"}
        </p>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">Wi-Fi:</span>{" "}
          {shop.hasWifi ? "есть" : "нет"}
        </p>
        <p>
          <span className="text-zinc-400">Розетки:</span>{" "}
          {shop.hasOutlets ? "есть" : "нет"}
        </p>
        <p>
          <span className="text-zinc-400">Подходит для работы:</span>{" "}
          {shop.goodForWork ? "да" : "скорее нет"}
        </p>
      </div>
    </section>
  );
}
