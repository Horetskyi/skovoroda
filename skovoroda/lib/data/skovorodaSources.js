import { SkovorodaFiles } from "./skovorodaFiles";

const skovorodaSources = {
  lovytva: {
    id: "lovytva",
    sourceName: "Ловитва невловного птаха: життя Григорія Сковороди - Л. Ушкалов - 2017 р.",
    // TODO: Now: add cover image
    devNumber: 1,
  },
  tvory_u_dvox_tomax_tom_1_1994: {
    id: "tvory_u_dvox_tomax_tom_1_1994",
    bookCoverImageFileName: "Tvory u dvox tomax. Tom 1 - 1994.jpg",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 1 - 1994 р.",
    files: [
      SkovorodaFiles.tvory_u_dvox_tomax_tom_1_1994_pdf,
      SkovorodaFiles.tvory_u_dvox_tomax_tom_1_1994_djvu,
    ],
    devNumber: 9,
  },
  tvory_u_dvox_tomax_tom_2_1994: {
    devNumber: 13,
    id: "tvory_u_dvox_tomax_tom_2_1994",
    // TODO: Now: add cover image
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 2 - 1994 р.",
    files: [], // TODO: add file
  },
  povna_akademichna_zbirka_2011: {
    id: "povna_akademichna_zbirka_2011",
    bookCoverImageFileName: "Povna akademichna zbirka - 2011.jpg",
    sourceName: "Григорій Сковорода: Повна академічна збірка творів - Леонід Ушкалов - 2011 р.",
    files: [
      SkovorodaFiles.zbirka_pdf,
    ],
    devNumber: 3,
  },
  philosophska_dumka_2014_nomer_5: {
    id: "source_philosophska_dumka_2014_nomer_5",
    bookCoverImageFileName: "Philosophska dumka - 2014 - 5.png",
    sourceName: "Філософська думка 2014 № 5",
    sourceFullName: "ISSN 0235-7941. Філософська думка, 2014, № 5",
    files: [
      SkovorodaFiles.philosophska_dumka_2014_nomer_5_pdf
    ],
    sourceLink: "https://journal.philosophy.ua/issue/2014-no5",
    devNumber: 7,
  },
  ukrainska_musa_2009: {
    id: "ukrainska_musa_2009",
    year: 2009,
    // TODO: Now: add cover image
    sourceName: 'Г. Сковорода. Вибрані твори в українських перекладах / Серія "Українська муза" у 12-ти томах, том 1 - 2009',
    sourceFullName: 'Г. Сковорода. Вибрані твори в українських перекладах / Серія "Українська муза" у 12-ти томах, том 1 - Упорядкування текстів, передмова та примітки Л. В. Ушкалова - 2009',
    // TODO: Now: add file
    devNumber: 10,
  },
}

const sourcesArray = Object.values(skovorodaSources);
sourcesArray.forEach(source => {
  source.sourceHref = source.id ? "/source/" + source.id : "";
  source.bookCoverImageSrc = !source.bookCoverImageFileName ? "" : "/books-cover/" + source.bookCoverImageFileName;
});

export const SkovorodaSourcesArray = sourcesArray;
export const SkovorodaSources = skovorodaSources;
