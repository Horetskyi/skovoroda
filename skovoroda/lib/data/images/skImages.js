const standardFableOlenkaAltAndTitle = "Ілюстрація до байки від Олени Лещенко";

// Important
export const SkImageAuthors = new Map([
  ['olenka', {
    fullName: 'Олена Горецька',
    genetiveFullName: 'Олени Горецької',
    link: {
      href: "https://instagram.com/olenka_art_vision",
      title: "Instagram Олени Горецької"
    },
  }],
  ['pryanya', {
    fullName: 'Аня Рубан',
    genetiveFullName: 'Ані Рубан',
    link: {
      href: "https://www.behance.net/annruban",
      title: "Behance Ані Рубан"
    },
  }],
  ['polik', {
    fullName: 'Поліна Огірчук',
    genetiveFullName: 'Поліни Огірчук',
    link: {
      href: "https://www.behance.net/linakot",
      title: "Behance Поліни Огірчук"
    },
  }],
  ['zmiika', {
    fullName: 'Ольга Райхель',
    genetiveFullName: 'Ольги Райхель',
    link: {
      href: "https://www.behance.net/5ee96a80",
      title: "Behance Ольги Райхель"
    },
  }],
]);

// Important
const fableNames = new Map([
  [1, 'Собаки'],
  [2, 'Ворона і Чиж'],
  [3, 'Жайворонки'],
  [4, 'Голова і Тулуб'],
  [5, 'Чиж і Щиглик'],
  [6, 'Колеса Годинникові'],
  [7, 'Орел і Сорока'],
  [8, 'Голова і Тулуб'],
  [9, 'Мурашка і Свиня'],
  [10, 'Дві Курки'],
  [11, 'Вітер і Філософ'],
  [12, 'Брусок і Ніж'],
  [13, 'Орел і Черепаха'],
  [14, 'Сова і Дрізд'],
  [15, 'Змія і Буфон'],
  [16, 'Жаби'],
  [17, 'Два цінні камінці: Алмаз і Смарагд'],
  [18, 'Пес і Кобила'],
  [19, 'Кажан і Двоє Пташенят: Горлицине та Голубчине'],
  [20, 'Верблюд і Олень'],
  [21, 'Зозуля і Косик'],
  [22, 'Гній та Алмаз'],
  [23, 'Собаки і Вовк'],
  [24, 'Кріт і Рись'],
  [25, 'Лев і Мавпи'],
  [26, 'Щука і Рак'],
  [27, 'Бджола і Шершень'],
  [28, 'Олениця і Кабан'],
  [29, 'Баба і Гончар'],
  [30, 'Соловей, Жайворонок і Дрізд'],
]);

// Important
function buildFableAlt(fableNumber, authorId) {
  const fableName = fableNames.get(fableNumber);
  const genetiveFullName = SkImageAuthors.get(authorId).genetiveFullName;
  return `Ілюстрація до байки Григорія Сковороди "${fableName}" від ${genetiveFullName}`;
}

// Important
function buildFableTitle(fableNumber) {
  const fableName = fableNames.get(fableNumber);
  return `Ілюстрація байки "${fableName}" Григорія Сковороди`;
}

// Tech
function buildFableImage(fableNumber, imageUrl, authorId, width, height) {
  const alt = buildFableAlt(fableNumber, authorId);
  const title = buildFableTitle(fableNumber);
  const image = {
    author: SkImageAuthors.get(authorId),
    imageUrl: imageUrl,
    alt: alt,
    title: title,
    fableNumber: fableNumber,
    type: 'fable',
  };
  if (width) {
    image.width = width;
  }
  if (height) {
    image.height = height;
  }
  return image;
}

// Tech
function buildTextImage(type, textUrlId, imageUrl, authorId, title, width, height) {
  const author = SkImageAuthors.get(authorId);
  const alt = `Ілюстрація до твору Григорія Сковороди - ${title}. Авторка: ${author.fullName}.`;
  const imgTitle = `Ілюстрація до твору Григорія Сковороди - ${title}`;
  const image = {
    author: author,
    imageUrl: imageUrl,
    alt: alt,
    title: imgTitle,
    type: type,
    urlId: textUrlId,
  };
  if (width) {
    image.width = width;
  }
  if (height) {
    image.height = height;
  }
  return image;
}

export const SkImages = {
  fable1byOlenka: buildFableImage(1, "/images/fables/fable-1-sobaky.webp", 'olenka'),
  fable2byOlenka: buildFableImage(2, "/images/fables/fable-2-vorona-i-chyzh.webp", 'olenka'),
  fable3byOlenka: buildFableImage(3, "/images/fables/fable-3-zhayvoronky.webp", 'olenka'),
  fable4byOlenka: buildFableImage(4, "/images/fables/fable-4-holova-i-tulub.webp", 'olenka'),
  fable5byOlenka: buildFableImage(5, "/images/fables/fable-5-chyzh-i-shchyhlyk.webp", 'olenka'),
  fable6byOlenka: buildFableImage(6, "/images/fables/fable-6-kolesa-hodynnykovi.webp", 'olenka'),
  fable7byOlenka: buildFableImage(7, "/images/fables/fable-7-orel-i-soroka.webp", 'olenka', 1808, 2478),
  fable8byOlenka: buildFableImage(8, "/images/fables/fable-8-holova-i-tulub.webp", 'olenka'),
  fable9byOlenka: buildFableImage(9, "/images/fables/fable-9-murashka-i-svynya.webp", 'olenka'),
  fable10byOlenka: buildFableImage(10, "/images/fables/fable-10-dvi-kurky.webp", 'olenka'),
  fable11byOlenka: buildFableImage(11, "/images/fables/fable-11-viter-i-filosof.webp", 'olenka'),
  fable12byOlenka: buildFableImage(12, "/images/fables/fable-12-brusok-i-nizh.webp", 'olenka'),
  fable13byOlenka: buildFableImage(13, "/images/fables/fable-13-orel-i-cherepakha.webp", 'olenka'),
  fable14byOlenka: buildFableImage(14, "/images/fables/fable-14-sova-i-drizd.webp", 'olenka', 900, 1258),
  gardenByOlenka: {
    imageUrl: "/images/garden/Skovoroda Garden of Divine Songs by Olenka.webp",
    alt: "Ілюстрація до Саду Божественних Пісень Григорія Сковороди від Олени Горецької",
    title: "Ілюстрація Саду Божественних Пісень",
  },
  erodyi: buildTextImage('treatise', "blahodarnyi_erodii", "/images/treatise/Erodii.webp", "pryanya", "Вдячний Еродій", 900, 1291),
  narcisByOlenka: buildTextImage('treatise', "narcis",  "/images/treatise/NarcisOlenkaImg1.webp", "olenka", "Наркіс. Розмова про те: Пізнай себе", 900, 1125),
  proKotiv: buildTextImage('read', "parable_about_cats",  "/images/treatise/Bukvar Myru - Parable about cats.webp", "polik", "Байка про Котів", 900, 1714),
  ubohyiZhaivoronok: buildTextImage('treatise', "ubohii_zhaivoronok",  "/images/treatise/Ubohii_Zhaivoronok.webp", "zmiika", "Убогий Жайворонок", 900, 1260),
};
export const SkImagesArray = Object.values(SkImages);