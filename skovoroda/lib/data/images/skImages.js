
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
  ['anna_zhuk', {
    fullName: 'Анна Жук',
    genetiveFullName: 'Ганни Жук',
    link: {
      href: "https://www.instagram.com/annkenry?igsh=MXF1NmwxdW1pd2JsMQ%3D%3D&utm_source=qr",
      title: "Інстаграм Ганни Жук"
    },
  }],
  ['sophi', {
    fullName: 'Софія',
    genetiveFullName: 'Софії',
    link: {
      href: "https://www.behance.net/d11fa29d",
      title: "Behance Софії"
    },
  }],
]);

// Important
const songNames = new Map([
  [1, 'Бояться люди зійти гнити в домовину'],
  [2, 'Покинь, духу мій, скоріше усі земні місця'],
  [3, 'Весна люба, ах, прийшла! Зима люта, ах, пройшла!'],
  [4, 'Різдвяна - Ангели знижайтеся, до землі зближайтеся'],
  [5, 'Різдвяна - Тайна дивна і преславна!..'],
  [6, 'Водохресна - Слухай небо, слухай, земле, і жахніться!'],
  [7, 'Великодна - Хто у мене відбере любов до Тебе?'],
  [8, 'Великодна - Вкрився я весь ранами смертоносними'],
  [9, 'Святому Духу - Усяка голова має свій розум'],
  [10, 'Всякому городу нрав і права'],
  [11, 'Не можна безодні океана закидати жменею попелу'],
  [12, 'Не піду я до багатого міста – буду жити на полях'],
  [13, 'Ах поля, поля зелені'],
  [14, 'Що таке слава тепер?'],
  [15, 'Лежиш во гробѣ. Празднуеш Субботу...'],
  [16, 'Пройшли облака. Радостна дуга сіяет...'],
  [17, 'Бачучи горе свого життя'],
  [18, 'Ой ти, птичко жовтобока'],
  [19, 'Ах ти тоска проклята! Ох докучлива печаль!'],
  [20, 'Хто серцем чистий і душею'],
  [21, 'Щастя! Де ти живеш? Горлиці – скажіть!'],
  [22, 'Пусти в далечінь погляд твій і промені розуму'],
  [23, 'О найдорожчий життя час!'],
  [24, 'За Горацієм - О, спокою наш небесний! Де ти сховався від наших очей?'],
  [25, 'Ѣдеш, хочешь нас оставить?..'],
  [26, 'Поспѣшай, Гостю! поспѣшай!..'],
  [27, 'Вышних наук саде святый!..'],
  [28, 'Хоч злети на небеса, хоч піди у Версальські ліси'],
  [29, 'Човник мій хитає вихор бурі'],
  [30, 'Осінь наша проходить, а весна вже пройшла'],
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
function buildSongAlt(songNumber, authorId) {
  const songName = songNames.get(songNumber);
  const genetiveFullName = SkImageAuthors.get(authorId).genetiveFullName;
  return `Ілюстрація до Пісні Григорія Сковороди "${songName}" від ${genetiveFullName}`;
}

// Important
function buildSongTitle(songNumber) {
  const songName = songNames.get(songNumber);
  return `Ілюстрація Пісні "${songName}" Григорія Сковороди`;
}

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
function buildSongImage(songNumber, imageUrl, authorId, width, height, highlightColor) {
  const alt = buildSongAlt(songNumber, authorId);
  const title = buildSongTitle(songNumber);
  const image = {
    author: SkImageAuthors.get(authorId),
    imageUrl: imageUrl,
    alt: alt,
    title: title,
    songNumber: songNumber,
    type: 'song',
    highlightColor: highlightColor ? highlightColor : null,
    isProtected: true
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
function buildFableImage(fableNumber, imageUrl, authorId, width, height, highlightColor) {
  const alt = buildFableAlt(fableNumber, authorId);
  const title = buildFableTitle(fableNumber);
  const image = {
    author: SkImageAuthors.get(authorId),
    imageUrl: imageUrl,
    alt: alt,
    title: title,
    fableNumber: fableNumber,
    type: 'fable',
    highlightColor: highlightColor ? highlightColor : null,
    isProtected: true
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
function buildTextImage(type, textUrlId, imageUrl, authorId, title, width, height, highlightColor, options) {
  const author = SkImageAuthors.get(authorId);
  const alt = `Ілюстрація до твору Григорія Сковороди - ${title}. Авторка: ${author.fullName}.`;
  const imgTitle = `Ілюстрація до твору Григорія Сковороди - ${title}`;
  const isFullWidth = options && options.some(option => option ==='fullWidth');
  const image = {
    author: author,
    imageUrl: imageUrl,
    alt: alt,
    title: imgTitle,
    type: type,
    urlId: textUrlId,
    isFullWidth: isFullWidth ? true : false,
    highlightColor: highlightColor ? highlightColor : null,
    isProtected: true
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

  fable1byOlenka: buildFableImage(1, "/images/fables/fable-1-sobaky.webp",                  'olenka', 1438, 2081, "#AD7A55"),
  fable2byOlenka: buildFableImage(2, "/images/fables/fable-2-vorona-i-chyzh.webp",          'olenka', 736, 1024,  "#b62f34"),
  fable3byOlenka: buildFableImage(3, "/images/fables/fable-3-zhayvoronky.webp",             'olenka', 2864, 4000, "#AC342B"),
  fable4byOlenka: buildFableImage(4, "/images/fables/fable-4-holova-i-tulub.webp",          'olenka', 768, 1056,  "#dab728"),
  fable5byOlenka: buildFableImage(5, "/images/fables/fable-5-chyzh-i-shchyhlyk.webp",       'olenka', 1547, 2133, "#8f0b1b"),
  fable6byOlenka: buildFableImage(6, "/images/fables/fable-6-kolesa-hodynnykovi.webp",      'olenka', 1580, 2161, "#192E9B"),
  fable7byOlenka: buildFableImage(7, "/images/fables/fable-7-orel-i-soroka.webp",           'olenka', 1808, 2478, "#1E191F"),
  fable8byOlenka: buildFableImage(8, "/images/fables/fable-8-holova-i-tulub.webp",          'olenka', 1442, 1990, "#49B9D4"),
  fable9byOlenka: buildFableImage(9, "/images/fables/fable-9-murashka-i-svynya.webp",       'olenka', 1714, 2338, "#7cb3cb"),
  fable10byOlenka: buildFableImage(10, "/images/fables/fable-10-dvi-kurky.webp",            'olenka', 2183, 3001, "#c37094"),
  fable11byOlenka: buildFableImage(11, "/images/fables/fable-11-viter-i-filosof.webp",      'olenka', 2359, 3295, "#ce825a"),
  fable12byOlenka: buildFableImage(12, "/images/fables/fable-12-brusok-i-nizh.webp",        'olenka', 2311, 3201, "#834e17"),
  fable13byOlenka: buildFableImage(13, "/images/fables/fable-13-orel-i-cherepakha.webp",    'olenka', 2581, 3588, "#834e17"),
  fable14: buildFableImage(14, "/images/fables/Fable 14 - Owl and Thrush - Skovoroda.webp", 'olenka', 900, 1260,  "#834e17"),
  fable15: buildFableImage(15, "/images/fables/Fable 15 - Snake and Buffoon - Skovoroda.webp", 'pryanya', 900, 1260, "#16230A"),
  fable16: buildFableImage(16, "/images/fables/Fable 16 - Zhaba - Skovoroda.webp", 'polik', 900, 1260, "#8da81c"),
  fable17: buildFableImage(17, "/images/fables/Fable 17 - Almaz i Smarahd - Skovoroda.webp", 'sophi', 900, 1260, "#41742e"),
  fable18: buildFableImage(18, "/images/fables/Fable 18 - Pes i Kobyla - Skovoroda.webp", 'pryanya', 900, 1260, "#726180"),
  fable19: buildFableImage(19, "/images/fables/Fable 19 - Kazhan i Dvoie Ptasheniat.webp", 'zmiika', 900, 1260, "#1D2328"),
  fable20: buildFableImage(20, "/images/fables/Fable 20 - Verbliud i Olen - Skovoroda.webp", 'pryanya', 900, 1260, "#3f3d3d"),
  fable21: buildFableImage(21, "/images/fables/Fable 21 - Zozulya and Kosyk - Skovoroda.webp", 'polik', 900, 1260, "#996d48"),
  fable22: buildFableImage(22, "/images/fables/Fable 22 - Dung and Diamond - Skovoroda.webp", 'zmiika', 900, 1260, "#8f3d72"),
  fable23: buildFableImage(23, "/images/fables/Fable 23 - Dogs and Wolf - Skovoroda.webp", 'zmiika', 1400, 1960, "#26353b"),
  fable24: buildFableImage(24, "/images/fables/Fable 24 - Mole and Lynx - Skovoroda.webp", 'polik', 1400, 1960, "#845939"),
  fable25: buildFableImage(25, "/images/fables/Fable 25 - Lion and Monkeys - Skovoroda.webp", 'pryanya', 900, 1260, "#3E0E03"),
  fable26: buildFableImage(26, "/images/fables/Fable 26 - Pike and Cancer - Skovoroda.webp", 'olenka', 900, 1260, "#348094"),
  fable27: buildFableImage(27, "/images/fables/Fable 27 - Bjola and Hornet - Skovoroda.webp", 'pryanya', 900, 1260, "#532D17"),
  fable28: buildFableImage(28, "/images/fables/Fable 28 - Olenytsia i Kaban.webp", 'pryanya', 900, 1260, "#507421"),
  fable29: buildFableImage(29, "/images/fables/Fable 29 - Baba and Potter.webp", 'anna_zhuk', 900, 1302, "#3A170E"),
  fable30: buildFableImage(30, "/images/fables/Fable 30 - Solovei, Zhaivoronok i Drizd - Skovoroda.webp", 'anna_zhuk', 900, 1302, "#603218"),
  
  song1: buildSongImage(1, "/images/garden/Song 1 Illustration - Skovoroda.webp", 'olenka', 1163, 1453, "#8d5d75"),
  song2: buildSongImage(2, "/images/garden/Song 2 Illustration - Skovoroda.webp", 'olenka', 1400, 1422, "#3E455C"),
  song3: buildSongImage(3, "/images/garden/Song 3 Illustration - Skovoroda.webp", 'olenka', 1400, 1452, "#96ab43"),
  song4: buildSongImage(4, "/images/garden/Song 4 Illustration - Skoboroda.webp", 'olenka', 1400, 1428, "#5750AA"),
  song5: buildSongImage(5, "/images/garden/Song 5 Illustration - Skoboroda.webp", 'olenka', 1328, 1384, "#091859"),
  song6: buildSongImage(6, "/images/garden/Song 6 Illustration - Skoboroda.webp", 'olenka', 1300, 1388, "#02af8d"),
  song7: buildSongImage(7, "/images/garden/Song 7 Illustration - Skoboroda.webp", 'olenka', 1340, 1348, "#694129"),
  song8: buildSongImage(8, "/images/garden/Song 8 Illustration - Skoboroda.webp", 'olenka', 1368, 1371, "#538363"),
  song9: buildSongImage(9, "/images/garden/Song 9 Illustration - Skoboroda.webp", 'olenka', 1369, 1748, "#407F9E"),
  song10: buildSongImage(10, "/images/garden/Song 10 Illustration - Skoboroda.webp", 'olenka', 1316, 1318, "#8F5848"),
  song11: buildSongImage(11, "/images/garden/Song 11 Illustration - Skoboroda.webp", 'olenka', 1385, 1375, "#24164D"),
  song12: buildSongImage(12, "/images/garden/Song 12 Illustration - Skoboroda - V2.webp", 'olenka', 1341, 1355, "#789D45"),
  song13: buildSongImage(13, "/images/garden/Song 13 Illustration - Skoboroda.webp", 'olenka', 1362, 1362, "#2B5B22"),
  song14: buildSongImage(14, "/images/garden/Song 14 Illustration - Skoboroda.webp", 'olenka', 1373, 1368, "#8E5722"),
  song15: buildSongImage(15, "/images/garden/Song 15 Illustration - Skoboroda.webp", 'olenka', 1360, 1415, "#5D4143"),

  gardenByOlenka: {
    imageUrl: "/images/garden/Skovoroda Garden of Divine Songs by Olenka.webp",
    alt: "Ілюстрація до Саду Божественних Пісень Григорія Сковороди від Олени Горецької",
    title: "Ілюстрація Саду Божественних Пісень",
    isProtected: true
  },

  erodyi: buildTextImage('treatise', "blahodarnyi_erodii", "/images/treatise/Erodii.webp", "pryanya", "Вдячний Еродій", 900, 1291),
  narcisByOlenka: buildTextImage('treatise', "narcis",  "/images/treatise/NarcisOlenkaImg1.webp", "olenka", "Наркіс. Розмова про те: Пізнай себе", 900, 1125),
  ubohyiZhaivoronok: buildTextImage('treatise', "ubohii_zhaivoronok",  "/images/treatise/Ubohii_Zhaivoronok.webp", "zmiika", "Убогий Жайворонок", 900, 1260),
  dveriDobronravia: buildTextImage('treatise', "vstupni_dveri_do_khrystyianskoi_dobronravnosti",  "/images/treatise/The Door to Christian Morality.webp", "olenka", "Вступні двері до християнської добронравності", 1960, 1400, "#192539", [ "fullWidth" ]),
  bukvarMyru: buildTextImage('treatise', 'bukvar_myru', "/images/fables/Fable 20 - Verbliud i Olen - Skovoroda.webp", 'pryanya', 'Розмова, названа Алфавіт, або Буквар миру', 900, 1260, "#3f3d3d"),

  parable_about_cats: buildTextImage('read', "parable_about_cats",  "/images/treatise/Bukvar Myru - Parable about cats.webp", "polik", "Байка про Котів", 900, 1714),
  oznaky_srodnostei: buildTextImage('read', "oznaky_srodnostei",  "/images/treatise/Bukvar Myru - Oznaky srodnostei.webp", "polik", "Ознаки деяких сродностей", 1200, 1697, "#004E46"),
  aesops_fable_about_the_wolf: buildTextImage('read', "aesops_fable_about_the_wolf",  "/images/treatise/Bukvar Myru - Aesops fable about the wolf.webp", "pryanya", "Байка Езопа про вовка", 1200, 1680, "#585252"),
};
export const SkImagesArray = Object.values(SkImages);