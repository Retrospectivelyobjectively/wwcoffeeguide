import CoffeeShopList from "@/components/CoffeeShopList";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          World Wide Coffee Guide
        </h1>
        <p className="max-w-2xl text-zinc-300">
          Веб-сайт-гид по specialty-кофейням третьей волны. Ниже —
          предварительный список заведений с базовыми фильтрами по городу
          и статусу Verified. В дальнейшем список и фильтры будут
          расширяться.
        </p>
      </header>

      <CoffeeShopList />
    </section>
  );
}
