type CoffeeShopPageProps = {
    params: { slug: string };
  };
  
  export default function CoffeeShopPage({ params }: CoffeeShopPageProps) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">
          Карточка кофейни: {params.slug}
        </h1>
        <p className="text-zinc-300">
          Здесь будет подробная информация о кофейне: зерно, обжарщики, методы
          заваривания, удобства и статус Verified.
        </p>
      </section>
    );
  }
  