
export const skovorodaPlaces = {
  chornuhy: {
    id: "chornuhy",
    title: "Чорнухи",
    // https://uk.wikipedia.org/wiki/%D0%A7%D0%BE%D1%80%D0%BD%D1%83%D1%85%D0%B8
  },
  kyivo_mohylyanska_akademia: {
    id: "kyivo_mohylyanska_akademia",
    title: "Києво-Могилянська академія",
    // https://uk.wikipedia.org/wiki/%D0%9A%D0%B8%D1%94%D0%B2%D0%BE-%D0%9C%D0%BE%D0%B3%D0%B8%D0%BB%D1%8F%D0%BD%D1%81%D1%8C%D0%BA%D0%B0_%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D1%96%D1%8F_(1659%E2%80%941817)
  },
  sankt_peterburg: {
    id: "sankt_peterburg",
    title: "Санкт-Петербург",
  },
  hluhov_music_school: {
    id: "hluhov_music_school",
    title: "Глухів",
  },
};

export const skovorodaStates = {
  child: {
    id: "child",
  },
  child_at_school: {
    id: "child_at_school",
  },
  student_at_kyiv: {
    id: "student_at_kyiv",
  },
  competitive_selection: {
    id: "competitive_selection",
  },
  singer_at_kapela: {
    id: "singer_at_kapela",
  },
};

const monthNames = new Map([
  ["january", 1],
  ["february", 2],
  ["march", 3],
  ["april", 4],
  ["may", 5],
  ["june", 6],
  ["july", 7],
  ["august", 8],
  ["september", 9],
  ["octover", 10],
  ["november", 11],
  ["december", 11],
]);

const seasonNames = new Map([
  ["winter", [1-2]],
  ["spring", [3-5]],
  ["summer", [6-8]],
  ["autumn", [9-11]],
]);

function date(year, month, day) {
  
  const result = {
    year: year
  };

  if (month) {
    if (typeof month === 'string' || month instanceof String) {
      if (monthNames.has(month)) {
        result.month = monthNames.get(month);
      }
    } else {
      result.month = month;
    }
  }

  if (day) {
    if (typeof day === 'string' || day instanceof String) { 
      if (day.includes("-")) {
        const daySplit = day.split("-");
        result.day = [daySplit[0], daySplit[1]];
      }
    } else {
      result.day = day;
    }
  }
  
  return result;
}

const timePoints = [
  
  { 
    id: "day-of-birth",
    date: date(1722, 12, 3), 
    state: skovorodaStates.child,
    place: skovorodaPlaces.chornuhy,
    text: "Народився в сотенному містечку Чорнухи Любенського полку.",
    source: 1,
    sourcePage: "29 с.",
    // TODO: 
    // Можна додати про батьків.
    // Старший брат Степан [16] 26 c.
    // Можна додати вірш Сковороди написаний Ковалинському про свій день народження (див. Ловитва 29 с.) 
  },
  
  {
    id: "go-to-school",
    date: date(1729),
    endDate: date(1734, "summer"), // [1] 47 c.
    state: skovorodaStates.child_at_school,
    place: skovorodaPlaces.chornuhy,
    text: "Батьки віддали Григорія до дяківської школи",
    source: 1,
    sourcePage: "40 с.",
    // Грав на флейті [1] 46 c.
    // З 7 років почав співав у церковному хорі [1] 44 c.
    // З дитинства любив читати [1] 44 c.
    // В школі вчили читати, писати, рахувати і співати [16] 26 c. 
  },

  {
    id: "student_at_kyiv_1",
    moveDays: 7,
    date: date(1734, "august"),
    endDate: date(1741, "december", "6-8"), // [1] 90 c.
    state: skovorodaStates.student_at_kyiv,
    place: skovorodaPlaces.kyivo_mohylyanska_akademia,
    text: "Студент Києво-Могилянської академії",
    source: 1,
    sourcePage: "48 с.",

    details: [
      // 1734-1735 
      // Перший клас - аналогія, чи фара. (Граматика книжної української та польської мов, поступово латинська мова)
      // Викладач: ієродиякон Веніамін Григорович
      // [1] 55 c.

      // Другий клас - нижчий, або ініфіма 
      // Третій клас - середній, або граматика
      // Четвертий клас - вищий, або синтаксима
      // 2-4 клас вивчали майже виключно латинську мову [1] 56 с.
      // Навчаючись у класі поетики Сковорода починає відвідувати екстраординарні класи мов: грецької, німецької та єврейської
      // Співав в хорі [1] 68 c.

      // з вересня 1740 року Сковорода почав навчатись у класі філософії [16] 34 c.
    ]
  },

  {
    id: "competitive_selection",
    date: date(1741, "december"),
    state: skovorodaStates.competitive_selection,
    place: skovorodaPlaces.hluhov_music_school,
    source: 1,
    sourcePage: "96 с.",
    // В Глухові музична школа. Саме в цій школі в грудні 1741 ркоу Сковорода пройшов конкурсний відбір 
    // (випробуванн в церковному співі та в співі на "італійський манір")
    // альтист придворної капели імператриці Єлизавети
  },
  
  {
    id: "prydvorna_kapela",
    date: date(1741, "december", 21), 
    endDate: date(1744),
    state: skovorodaStates.singer_at_kapela,
    place: skovorodaPlaces.sankt_peterburg,
    source: 1,
    sourcePage: "98 с.",
    // Співаки придворної капели мешкали тоді в старому Зимовому палаці [1] 98 с. 

    details: [
      // 28 лютого 1742 Москва [1] 101 c. Там співав Сковорода. Урочиста відправа в Успенському соборі Кремля. 
      // 28 квітня 1742 урочиста коронація в тому ж соборі. Виступав Сковорода з хором теж, опера "La clemenza di Tito".
      // цю опера ще двічі в Москві на початку 1743 року, а потім декілька разів в Санкт-Петербурзі
      // грудень 1742 повертається до Санкт-Петербурга, і ввесь 1743 в Санкт-Петербурзі
      // саме в цей час Сковорода склав наспів духовної пісні "Іже Херувими", 
      // веселий і урочистий наспів "Христос воскресе" і канон "Воскресеніє день"
      // 21 січня 1744 року Петербург - Москва
      // 29 червня 1744 року Сковорода співав на урочистостях заручин княгині і княза [1] 116 c.

      // Батько Сковороди - Сава Сковорода - помер в 1741-1742 [16] 21 c.
    ],
  },
  
  {
    id: "student_at_kyiv_2",
    date: date(1744, "september", 11),
    state: skovorodaStates.student_at_kyiv,
    place: skovorodaPlaces.kyivo_mohylyanska_akademia,
    source: 16,
    sourcePage: "45 с.", // + [1] 121 c.
    // кінець серпня 1744 року Київ з Єлизаветою .. 11 вересня імператриця поїхала до Глухова .. Сковорода залишився в Києві [1] 121 c.
    // повертаэться до навчання у клас філософії 
  },

  // Сковорода завершив філософський курс [16] 46 c.
  // Опинився у складі особливої Токайської комісії. [16] 46 c.
  // генерал Федір Вишневський
  // 35 осіб. Більшість становила офіцерсько-солдатська озброєнаа охорона, 
  // майже десяток "членів комісіїї" - то була особиста прислуга генерала Вишневського,
  // два "бочкарі", покликані дбати про тару для перевезення продукту
  // перекладач із німецької, священник і дячок (~Сковорода)
  // дячок - Служитель православної церкви, що допомагає священику під час богослужіння; псаломщик - http://sum.in.ua/s/djak

  // Угорщина - місто Токай

  // мав нагоду поїхати з Угорщини до Відня, Офена, Пресбурга й інших довколишніх міст [16] 48 с.
  // - Австрія (Австрія) - Відень
  // - Вільне місто (Угорщина) - Офен (частина Будапешту) https://uk.wikipedia.org/wiki/%D0%91%D1%83%D0%B4%D0%B0_(%D0%91%D1%83%D0%B4%D0%B0%D0%BF%D0%B5%D1%88%D1%82)
  // - На той час столиця Угорщини (Словаччина) - Пресбург (Братислава) https://uk.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D1%82%D0%B8%D1%81%D0%BB%D0%B0%D0%B2%D0%B0

  // імовірно - німецьке місто Галле - і навчання в ньому 3 роки // можлвио тут почав писати байки [16] 49 c.
  
  // 27 січня 1749 року керівник Токайської комісіїї Федір Вишневський помер

  // восени 1750-го зі збігом 5-річного котракту на працю в Токайській комісії - Сковорода вирушив додому [16] 52 c.
  // 10 жовтня він був уже в Києві
  // з порожньою кишенею, з крайнім браком усього найпотрібнішого і мешкав деякий час у своїх колишніх приятелів і знайомих

  // Невдовзі відкрилося місце вчителя поезії в Переяславі, куди він і вирушив на запрошення тамтешнього єпископа

  // ...

  // "Сон" 1758 р. написав Сковорода перебуваючи у селі Кавраї [16] 43 c.

  {
    id: "death",
    date: date(1794, "november", 9),
  },

];

export const SkovorodaTravelData = {
  timePoints,
};
