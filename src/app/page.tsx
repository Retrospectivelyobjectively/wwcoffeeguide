export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">
        World Wide Coffee Guide
      </h1>
      <p className="max-w-2xl text-zinc-300">
        Веб-сайт-гид по specialty-кофейням третьей волны. Здесь будут каталог
        кофеен, фильтры по городу, методам заваривания, обжарщику и удобствам.
      </p>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-sm text-zinc-400">
          Поиск и фильтры будут реализованы позже. Сейчас это заглушка главной
          страницы под будущий функционал.
        </p>
      </div>
    </section>
  );
}
