
function file(fileSize, fileName, fileWarnings) {
  return {
    fileSize: fileSize,
    fileName: fileName,
    fileExtensionUppercase: fileName.substring(fileName.length - 4).toUpperCase(),
    fileWarnings: fileWarnings ? fileWarnings : [],
  };
}

const fileWarning_noDigitalText = "Пошук, виділення та копіювання не працюють";
const fileWarning_badTextQuality = "Погана якість тексту";
const fileWarning_noBookmarks = "В документі немає навігації";

export default function getSkovorodaData() {
  
  // Files

  const file_tvory_u_dvox_tomax_tom_1_1994_djvu = file("7.6 MB", "Г. С. Сковорода - Твори у двох томах. Том 1 - 1994.djvu", [
    fileWarning_noDigitalText,
    fileWarning_noBookmarks
  ]);
  const file_tvory_u_dvox_tomax_tom_1_1994_pdf = file("10.4 MB", "Г. С. Сковорода - Твори у двох томах. Том 1 - 1994.pdf", [
    fileWarning_badTextQuality,
    fileWarning_noBookmarks
  ]);
  const file_philosophska_dumka_2014_nomer_5_pdf = file("2.1 MB", "Філософська думка 2014 №5.pdf", [
    fileWarning_noBookmarks
  ]);
  const file_zbirka_pdf = file("12.0 MB", "Г. С. Сковорода - Повна академічна збірка - Леонід Ушкалов - 2011.pdf");
  const files_vstupni_dveri_do_khrystyianskoi_dobronravnosti = {
    original_pdf: file("882.6 KB", "Г. С. Сковорода - Начальная Дверь ко Христїянскому Добронравїю - Л. Ушкалов.pdf"),
    shevchuk_doc: file("41.4 KB", "Г. С. Сковорода - Вступні двері до християнської добронравності - В. Шевчук.docx"),
    shevchenko_doc: file("44.3 KB", "Г. С. Сковорода - Вступні двері до християнської доброчесності - В. Шевченко.docx"),
  } 

  // Sources

  const source_lovytva = {
    id: "lovytva",
    sourceName: "Ловитва невловного птаха: життя Григорія Сковороди - Л. Ушкалов - 2017 р.",
  };
  const source_tvory_u_dvox_tomax_tom_1_1994 = {
    id: "tvory_u_dvox_tomax_tom_1_1994",
    bookCoverImageFileName: "Tvory u dvox tomax. Tom 1 - 1994.jpg",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 1 - 1994 р.",
    files: [
      file_tvory_u_dvox_tomax_tom_1_1994_pdf,
      file_tvory_u_dvox_tomax_tom_1_1994_djvu,
    ]
  };
  const source_povna_akademichna_zbirka_2011 = {
    id: "povna_akademichna_zbirka_2011",
    bookCoverImageFileName: "Povna akademichna zbirka - 2011.jpg",
    sourceName: "Григорій Сковорода: Повна академічна збірка творів - Леонід Ушкалов - 2011 р.",
    files: [
      file_zbirka_pdf,
    ]
  };
  const source_philosophska_dumka_2014_nomer_5 = {
    id: "source_philosophska_dumka_2014_nomer_5",
    bookCoverImageFileName: "Philosophska dumka - 2014 - 5.png",
    sourceName: "Філософська думка 2014 № 5",
    sourceFullName: "ISSN 0235-7941. Філософська думка, 2014, № 5",
    files: [
      file_philosophska_dumka_2014_nomer_5_pdf
    ],
    sourceLink: "https://journal.philosophy.ua/issue/2014-no5"
  }

  const sources = [
    source_lovytva,
    source_tvory_u_dvox_tomax_tom_1_1994,
    source_povna_akademichna_zbirka_2011,
    source_philosophska_dumka_2014_nomer_5,
  ];
  sources.forEach(source => {
    source.sourceHref = source.id ? "/source/" + source.id : "";
    source.bookCoverImageSrc = !source.bookCoverImageFileName ? "" : "/books-cover/" + source.bookCoverImageFileName;
  });

  // Translators

  const translator_v_shevchuk = {
    fullName: "Шевчук Валерій Олександрович",
  };
  const translator_v_shevchenko = {
    fullName: "Шевченко Віталій Володимирович",
  };


  return {
    texts: [
      {
        id: "vstupni_dveri_do_khrystyianskoi_dobronravnosti",
        writtenDateInfo: {
          dates: [
            {
              text: "написаний 1766 р.",
              source: source_lovytva,
              page: "259 с."
            },
            {
              text: "дописаний вступ 1780 р.",
              source: source_povna_akademichna_zbirka_2011,
              page: "222 c."
            },
          ],
        },
        original: {
          source: source_povna_akademichna_zbirka_2011,
          originalName: "Начальная Дверь ко Христіанскому Добронравію",
          files: [
            files_vstupni_dveri_do_khrystyianskoi_dobronravnosti.original_pdf,
          ]
        },
        translates: [
          {
            source: source_tvory_u_dvox_tomax_tom_1_1994,
            translator: translator_v_shevchuk, 
            translatedName: "Вступні двері до християнської добронравності",
            files: [
              files_vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchuk_doc,
            ]
          },
          {
            source: source_philosophska_dumka_2014_nomer_5,
            translator: translator_v_shevchenko, 
            translatedName: "Вступні двері до християнської доброчесності",
            files: [
              files_vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchenko_doc,
            ]
          },
        ],
      },
    ],
    sources: sources,
    translators: [
      translator_v_shevchuk,
      translator_v_shevchenko,
    ],
  };
}