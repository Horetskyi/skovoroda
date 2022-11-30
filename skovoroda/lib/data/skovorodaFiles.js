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

export const SkovorodaFiles = {
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
  vstupni_dveri_do_khrystyianskoi_dobronravnosti: {
    original_pdf: file("882.6 KB", "Г. С. Сковорода - Начальная Дверь ко Христїянскому Добронравїю - Л. Ушкалов.pdf"),
    shevchuk_doc: file("41.4 KB", "Г. С. Сковорода - Вступні двері до християнської добронравності - В. Шевчук.docx"),
    shevchenko_doc: file("44.3 KB", "Г. С. Сковорода - Вступні двері до християнської доброчесності - В. Шевченко.docx"),
  },
}
