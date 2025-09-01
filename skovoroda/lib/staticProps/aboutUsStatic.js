import { metaTextProcessor } from "../metaTextProcessor/metaTextProcessor";
import { aboutUsPageKey } from "../skovorodaConstants";

const content1 = `
Cайт присвячений життю і творчості видатного українського філософа — Григорія Савича Сковороди.
`.trim();

const content2 = `
Метою проєкту є всебічне представлення спадщини Григорія Сковороди у повному, зручному та сучасному форматі. Ми прагнемо зробити доступними не лише його твори, але й наукові дослідження, що стосуються його життя, філософії та культурного контексту.

Проєкт має на меті охопити якомога ширше коло читачів: від тих, хто лише починає знайомство з постаттю Сковороди, до досвідчених науковців, яким буде запропоновано інструменти для поглиблених досліджень. Ми поєднуємо глибину змісту з зручністю доступу, щоб створити відкритий простір для вивчення, переосмислення і натхнення.

Ось декілька цитат Сковороди про ціль його трудів:
«Вельми я буду радий, якщо ця книжечка послужить для прогнання лише кількох днів суму, але який я задоволений, якщо вона [Bold]посприяє хоч краплині внутрішнього миру[Bold].» — <meta f="i">присвята до трактату <meta link="https://www.skovoroda.club/texts/treatise/kilce">«Кільце»</meta>, переклад Кашуби</meta>.
«Якщо ця книжечка хоча б кілька хвилин послужить Вам проти біса нудьги, то й тим я задоволений. Якщо ж [Bold]напоїть хоча б маленькою чашечкою спасення миру Божого[Bold] – ось мені й труд, і плід, і нагорода!» — <meta f="i">присвята до перекладу «Плутархової книжечки Про Спокій Душі», переклад Кашуби</meta>.

Проект заснований на волонтерських засадах і є некомерційним. 🙏
Якщо маєте бажання допомогти — <meta link="https://t.me/Horetskyi_Dima">пишіть нам в телеграм</meta>.
Код проекту у відкритому доступі: <meta link="true">https://github.com/Horetskyi/skovoroda</meta>
`.trim();

const content3 = `
[AllIsList]
[Bold]Горецький Дмитро[Bold] – засновник проекту, відповідає за технічну сторону сайту, за структуру, дизайн, тексти і підбір матеріалів.
[Bold]Горецька Олена[Bold] – ілюстраторка, редакторка текстів.
[Bold]Герман Ольга[Bold] – допомагає з оцифровуванням текстів.
[Bold]Аня Рубан[Bold] – ілюстраторка.
[Bold]Поліна Огірчук[Bold] – ілюстраторка.
[Bold]Ольга Райхель[Bold] – ілюстраторка.
[Bold]Софія[Bold] – ілюстраторка.
[Bold]Яна[Bold] – дизайнерка.
[Bold]Жук Анна[Bold] – ілюстраторка.
`.trim();

const contentStructure = {
  sections: [
    {
      h1: 'Про нас (Skovoroda Club)',
      content: metaTextProcessor(content1),
    },
    {
      h2: 'Мета проекту',
      content: metaTextProcessor(content2),
    },
    {
      h2: 'Команда',
      content: metaTextProcessor(content3),
    }
  ]
};

export function getAboutUsPageProps() {

  return {
    props: {
      pageKey: aboutUsPageKey,
      metadataTitle: "Про Нас - Skovoroda Club",
      metadataDescription: "Сайт присвячений життю і творчості видатного українського філософа — Григорія Савича Сковороди",
      metadataKeywords: ["Григорій Сковорода", "Команда", "Skovoroda Club", "Про нас"],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/about-us",
      contentStructure: contentStructure,
    },
  };
}
