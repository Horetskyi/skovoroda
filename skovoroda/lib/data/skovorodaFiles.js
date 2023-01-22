function file(fileSize, fileName, fileWarnings, sourceLink) {
  return {
    fileSize: fileSize,
    fileName: fileName,
    fileExtensionUppercase: fileName.substring(fileName.length - 4).toUpperCase(),
    fileWarnings: fileWarnings ? fileWarnings : [],
    sourceLink: sourceLink ? sourceLink : null,
  };
}

const fileWarning_noDigitalText = "Пошук, виділення та копіювання не працюють";
const fileWarning_notTheBestFileScan = "Не найкращий скан тексту";
const fileWarning_badTextQuality = "Погана якість тексту";
const fileWarning_noBookmarks = "В документі немає навігації";

const sourceLinkType_exact = "Exact";
const sourceLinkType_basedOn = "BasedOn";

const sourceLink_piznai_ludynu = {
  href: "https://chtyvo.org.ua/authors/Skovoroda/Piznai_v_sobi_liudynu_zbirka/",
  type: sourceLinkType_basedOn
};

export const SkovorodaFiles = {
  piznai_v_sobi_liudynu_1995_doc: file("3.1 MB", "Пізнай в собі людину - М. Кашуба - 1995.doc", [
    fileWarning_noBookmarks,
    fileWarning_notTheBestFileScan
  ]), 
  tvory_u_dvox_tomax_tom_1_1994_djvu: file("7.6 MB", "Г. С. Сковорода - Твори у двох томах. Том 1 - 1994.djvu", [
    fileWarning_noDigitalText,
    fileWarning_noBookmarks
  ]),
  tvory_u_dvox_tomax_tom_1_1994_pdf: file("10.4 MB", "Г. С. Сковорода - Твори у двох томах. Том 1 - 1994.pdf", [
    fileWarning_badTextQuality,
    fileWarning_noBookmarks
  ]),
  philosophska_dumka_2014_nomer_5_pdf: file("2.1 MB", "Філософська думка 2014 №5.pdf", [
    fileWarning_noBookmarks
  ]),
  zbirka_pdf: file("12.0 MB", "Г. С. Сковорода - Повна академічна збірка - Леонід Ушкалов - 2011.pdf"),
  prokynuvshys_pobachyly_slavu_yoho: {
    original_pdf: file("531.1 KB", "Г. С. Сковорода - Убуждшеся видеша славу его - Л. Ушкалов.pdf"),
    kashuba_pdf: file("161.6 KB", "Г. С. Сковорода - Прокинувшись, побачили славу його - М. Кашуба.pdf", [fileWarning_notTheBestFileScan]),
    kashuba_doc: file("25.1 KB", "Г. С. Сковорода - Прокинувшись, побачили славу його - М. Кашуба.docx", [fileWarning_notTheBestFileScan]),
  },
  khai_tsiluie_mene_potsilunkamy_ust_svoikh: {
    original_pdf: file("541.1 KB", "Г. С. Сковорода - Да лобжет мя от лобзаній уст своих - Л. Ушкалов.pdf"),
    kashuba_pdf: file("181.7 KB", "Г. С. Сковорода - Хай цілує мене поцілунками уст своїх - М. Кашуба.pdf", [fileWarning_notTheBestFileScan]),
    kashuba_doc: file("29.6 KB", "Г. С. Сковорода - Хай цілує мене поцілунками уст своїх - М. Кашуба.docx", [fileWarning_notTheBestFileScan]),
  },
  vstupni_dveri_do_khrystyianskoi_dobronravnosti: {
    original_pdf: file("882.6 KB", "Г. С. Сковорода - Начальная Дверь ко Христїянскому Добронравїю - Л. Ушкалов.pdf"),
    shevchuk_doc: file("41.4 KB", "Г. С. Сковорода - Вступні двері до християнської добронравності - В. Шевчук.docx"),
    shevchuk_pdf: file("257.2 KB", "Г. С. Сковорода - Вступні двері до християнської добронравності - В. Шевчук.pdf", [
      fileWarning_noBookmarks
    ]),
    shevchenko_doc: file("44.3 KB", "Г. С. Сковорода - Вступні двері до християнської доброчесності - В. Шевченко.docx"),
    shevchenko_pdf: file("262.1 KB", "Г. С. Сковорода - Вступні двері до християнської доброчесності - В. Шевченко.pdf", [
      fileWarning_noBookmarks
    ]),
  },
  narcis: {
    original_pdf: file("1.0 MB", "Г. С. Сковорода - Наркісс. Разглагол о Том. Узнай себе - Л. Ушкалов.pdf"),
    shevchuk_pdf: file("867.4 KB", "Г. С. Сковорода - Наркіс. Розмова про Те. Пізнай себе - В. Шевчук.pdf",[],
      {
        href: "http://sites.utoronto.ca/elul/Main-Ukr.html",
        type: sourceLinkType_exact
      }),
  },
  askhan: {
    original_pdf: file("1.3 MB", "Г. С. Сковорода - Симфоніа, нареченная Книга Асхань о Познаніи самаго себе - Л. Ушкалов.pdf"),
    kashuba_pdf: file("551.1 KB", "Г. С. Сковорода - Симфонія, названа книга Асхань, про пізнання самого себе - М. Кашуба.pdf", [], 
      sourceLink_piznai_ludynu),
  },
  besida_nazvana_dvoie: {
    original_pdf: file("", ""),
    kashuba_pdf: file("", "", [], 
      sourceLink_piznai_ludynu),
  }
}
