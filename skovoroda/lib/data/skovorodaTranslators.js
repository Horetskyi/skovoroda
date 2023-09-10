
export const translatorNamesIdsMap = new Map([
  ["Петро Пелех", "peleh"],
  ["Леонід Ушкалов", "uskalov"],
  ["Хоткевич Гнат Мартинович", "hotkevych"],
  ["Шевчук Валерій Олександрович", "shevchuk"],
  ["Микола Зеров", "zerov"],
]);

const skovorodaTranslators = {
  v_shevchuk: {
    fullName: "Шевчук Валерій Олександрович",
  },
  v_shevchenko: {
    fullName: "Шевченко Віталій Володимирович",
  },
  h_hoytkevych: {
    fullName: "Хоткевич Гнат Мартинович",
  },
  m_kashuba: {
    fullName: "Кашуба Марія Василівна"
  },
  m_zerov: {
    fullName: "Зеров Микола Костянтинович"
  },
}

export const skTranslatorsV2 = [
  {
    translatorId: 0,
    firstName: "Оригінал",
    lastName: "Оригінал",
    byFatherName: "Оригінал",
    urlId: "original",
  },
  {
    translatorId: 1,
    firstName: "Назар",
    lastName: "Федорак",
    byFatherName: "Любомирович",
    urlId: "fedorak",
  },
].map(translator => {
  if (translator.translatorId === 0) {
    translator.fullName3 = "Оригінал";
  } else {
    translator.fullName3 = translator.lastName + " " + translator.firstName + " " + translator.byFatherName;
  }
  return translator;
});

const skovorodaTranslatorsArray = Object.values(skovorodaTranslators);
export const SkovorodaTranslatorsArray = skovorodaTranslatorsArray;
export const SkovorodaTranslators = skovorodaTranslators;
