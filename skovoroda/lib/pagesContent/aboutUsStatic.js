import { parseFileContent } from "../data/utils/readingTextsUtils";
import { aboutUsPageKey } from "../skovorodaConstants";

const content = `
Cайт присвячений життю і творчості видатного українського філософа — Григорія Савича Сковороди.
Мета проекту розкривається в цитатах Сковороди:

[Italic]\"Вельми я буду радий, якщо ця книжечка послужить для прогнання лише кількох днів суму, але який я задоволений, якщо вона посприяє хоч краплині внутрішнього миру.\"[Italic] — присвята до трактату \"Кільце\", переклад Кашуби.

[Italic]\"Якщо ця книжечка хоча б кілька хвилин послужить Вам проти біса нудьги, то й тим я задоволений. Якщо ж напоїть хоча б маленькою чашечкою спасення миру Божого – ось мені й труд, і плід, і нагорода!\"[Italic] — присвята до перекладу \"Плутархової книжечки Про Спокій Душі\", переклад Кашуби.

Проект заснований на волонтерських засадах і є некомерційним. 🙏,
`;

export function getAboutUsPageProps() {

  const parsedContent = parseFileContent(content);

  return {
    props: {
      pageKey: aboutUsPageKey,
      metadataTitle: "Про Нас",
      metadataDescription: "Про Нас",
      metadataKeywords: ["Про Нас"],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      parsedContent: parsedContent,
    },
  };
}
