export type Language = "ru" | "en";

type DictionarySection = {
  nav: {
    about: string;
    apply: string;
    account: string;
  };
  home: {
    title: string;
    intro: string;
  };
  about: {
    title: string;
    audience: string;
    difference: string;
    criteria: string;
    roadmap: string;
  };
};

export const dictionary: Record<Language, DictionarySection> = {
  ru: {
    nav: {
      about: "О проекте",
      apply: "Как подать заявку",
      account: "Личный кабинет",
    },
    home: {
      title: "World Wide Coffee Guide",
      intro:
        "Это каталог specialty-кофеен с акцентом на прозрачность, качество и альтернативные методы заваривания. Мы показываем только места, которые соответствуют нашим критериям, а не просто популярные точки поблизости.",
    },
    about: {
      title: "О проекте World Wide Coffee Guide",
      audience: "Для кого этот гид",
      difference: "Чем гид отличается от обычных карт",
      criteria: "Кратко о критериях включения",
      roadmap: "Что планируется дальше",
    },
  },
  en: {
    nav: {
      about: "About",
      apply: "How to apply",
      account: "Account",
    },
    home: {
      title: "World Wide Coffee Guide",
      intro:
        "This is a guide to third-wave specialty coffee shops focused on quality, transparency, and alternative brew methods. We list only places that meet clear criteria, not just popular spots nearby.",
    },
    about: {
      title: "About World Wide Coffee Guide",
      audience: "Who this guide is for",
      difference: "How this guide differs from regular maps",
      criteria: "Briefly about inclusion criteria",
      roadmap: "What’s next",
    },
  },
};
