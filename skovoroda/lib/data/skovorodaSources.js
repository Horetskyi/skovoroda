import { SkovorodaFiles } from "./skovorodaFiles";

const skovorodaSources = {
  skovorodaClub: {
    devNumber: -1,
    id: "skovoroda_club",
    sourceName: "Стаття написана спеціально для сайту Skovoroda Club",
    shortTitle: "Стаття написана спеціально для сайту Skovoroda Club",
    productionYear: 2025,
  },
  lovytva: {
    devNumber: 1,
    id: "lovytva",
    sourceName: "Ловитва невловного птаха: життя Григорія Сковороди - Л. Ушкалов - 2017 р.",
    shortTitle: "Ловитва невловного птаха - Ушкалов",
    productionYear: 2017,
  },
  uchytel_zyttia: {
    devNumber: 2,
    id: "uchytel_zyttia",
    sourceName: "Учитель Життя - Володимир Стадниченко - 2016",
    productionYear: 2016,
  },
  povna_akademichna_zbirka_2011: {
    devNumber: 3,
    id: "povna_akademichna_zbirka_2011",
    bookCoverImageFileName: "Povna akademichna zbirka - 2011.webp",
    sourceName: "Григорій Сковорода: Повна академічна збірка творів - Леонід Ушкалов - 2011 р.",
    files: [
      SkovorodaFiles.zbirka_pdf,
    ],
    productionYear: 2011,
  },
  piznai_v_sobi_liudynu_1995: {
    devNumber: 4,
    id: "piznai_v_sobi_liudynu_1995",
    bookCoverImageFileName: "Piznai v sobi liudynu - 1995.webp",
    sourceName: "Пізнай в собі людину - М. Кашуба - 1995",
    files: [
      SkovorodaFiles.piznai_v_sobi_liudynu_1995_doc,
    ], 
    productionYear: 1995,
  },
  philosophska_dumka_2014_nomer_5: {
    devNumber: 7,
    id: "source_philosophska_dumka_2014_nomer_5",
    bookCoverImageFileName: "Philosophska dumka - 2014 - 5.webp",
    sourceName: "Філософська думка 2014 № 5",
    sourceFullName: "ISSN 0235-7941. Філософська думка, 2014, № 5",
    files: [
      SkovorodaFiles.philosophska_dumka_2014_nomer_5_pdf
    ],
    sourceLink: "https://journal.philosophy.ua/issue/2014-no5",
    productionYear: 2014,
  },
  tvory_u_dvox_tomax_tom_1_1994: {
    devNumber: 9,
    id: "tvory_u_dvox_tomax_tom_1_1994",
    bookCoverImageFileName: "Tvory u dvox tomax. Tom 1 - 1994.webp",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 1 - 1994 р.",
    files: [
      SkovorodaFiles.tvory_u_dvox_tomax_tom_1_1994_pdf,
      SkovorodaFiles.tvory_u_dvox_tomax_tom_1_1994_djvu,
    ],
    productionYear: 1994,
  },
  ukrainska_musa_2009: {
    devNumber: 10,
    id: "ukrainska_musa_2009",
    bookCoverImageFileName: "ukrainska_musa_2009.webp",
    year: 2009,
    productionYear: 2009,
    sourceName: 'Г. Сковорода. Вибрані твори в українських перекладах / Серія "Українська муза" у 12-ти томах, том 1 - 2009',
    sourceFullName: 'Г. Сковорода. Вибрані твори в українських перекладах / Серія "Українська муза" у 12-ти томах, том 1 - Упорядкування текстів, передмова та примітки Л. В. Ушкалова - 2009',
  },
  povne_zibrannya_tvoriv_1973_tom_2: {
    devNumber: 12,
    id: "povne_zibrannya_tvoriv_1973_tom_2",
    year: 1997,
    productionYear: 1973,
    sourceName: "Григорій Сковорода. Повне зібрання творів: У 2-х т. — К., 1973 — Т. 2.",
  },
  tvory_u_dvox_tomax_tom_2_1994: {
    devNumber: 13,
    id: "tvory_u_dvox_tomax_tom_2_1994",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 2 - 1994 р.",
    productionYear: 1994,
    bookCoverImageFileName: "Tvory u dvox tomax. Tom 2 - 1994.webp",
    files: [], 
  },
  skovorodar: {
    devNumber: 16,
    id: "skovorodar",
    sourceName: "Скороводар - Життя, творчість, спадок. Григорія Сковороди - Назар Федорак",
    shortTitle: "Скороводар - Назар Федорак",
    productionYear: 2022,
    bookCoverImageFileName: "Skovorodar.webp",
    files: [], 
  },
  baiki_harkivski_fedorak_2019: {
    devNumber: 17,
    id: "baiki_harkivski_fedorak_2019",
    year: 2019,
    sourceName: "Байки Харківські [Текст] / Григорій Сковорода; пер. Назара Федорака. - Львів:Видавництво Terra Incognita, 2019. - 108с - (Серія \"Українська езотерика\"). ISBN 978-966-97596-8-9)",
    files: [], 
    bookCoverImageFileName: "fables1.webp",
    shortTitle: "Байки Харківські",
    productionYear: 2019,
  },
  baiki_harkivski_shevchuk: {
    devNumber: 18,
    id: "baiki_harkivski_shevchuk",
    year: 0,
    sourceName: "Григорій Савич Сковорода. Байки Харківські (збірка). Переклад Валерія Шевчука.",
    files: [],
    shortTitle: "Байки Харківські",
  },
  baiki_harkivski_shevchuk: {
    devNumber: 27,
    id: "seminaryi",
    sourceName: "Григорій Сковорода: семінарій. – Ушкалов Л.В. – Харків: Майдан, 2004",
    productionYear: 2004,
  },
  evgen_glyva_ontologial_theory: {
    devNumber: 28,
    id: "evgen_glyva_ontologial_theory",
    sourceName: "Євген Глива: Онтологічний образ людини в творчості Григорія Сковороди.: – К.: Видавництво ТОВ \"КММ\", 2006",
    productionYear: 2006,
  },
  piznanyi_ne_piznanyi_sphinks: {
    devNumber: 29,
    id: "piznanyi_ne_piznanyi_sphinks",
    sourceName: "Валерій Шевчук. Пізнаний і непізнаний Сфінкс: Григорій Сковорода – Видавництво Пульсари 2008",
    isbn: "ISBN 978-966-2171-04-4",
    productionYear: 2008,
  },
  vid_baroko_do_postmodern_ushkalov: {
    devNumber: 32,
    id: "vid_baroko_do_postmodern_ushkalov",
    sourceName: "Леонід Ушкалов. Від бароко до постмодерну",
    isbn: "978-966-465-340-1",
    productionYear: 2011,
    bookCoverImage: {
      imageUrl: '/images/books/vid-baroko-do-postmodernu.webp',
      alt: 'Леонід Ушкалов. Від бароко до постмодерну',
      title: 'Леонід Ушкалов. Від бароко до постмодерну',
      width: 575,
      height: 800,
    }
  }
}

const sourcesArray = Object.values(skovorodaSources);
sourcesArray.forEach(source => {
  source.sourceHref = source.id ? "/source/" + source.id : "";
  source.bookCoverImageSrc = !source.bookCoverImageFileName ? "" : "/books-cover/" + source.bookCoverImageFileName;
  if (!source.sourceFullName) {
    source.sourceFullName = source.sourceName;
  }
  if (!source.bookCoverImage ?? source.bookCoverImageSrc) {
    source.bookCoverImage = {
      imageUrl: source.bookCoverImageSrc,
      alt: source.sourceFullName,
      title: source.sourceFullName,
    }
  }
  if (!source.shortTitle) {
    source.shortTitle = source.sourceName;
  }
  if (source.devNumber) {
    source.sourceId = source.devNumber;
  }
});

export const SkovorodaSourcesArray = sourcesArray;
export const SkovorodaSources = skovorodaSources;
