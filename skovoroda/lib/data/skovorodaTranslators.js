
export const translatorNamesIdsMap = new Map([
  ["Петро Пелех", "peleh"],
  ["Леонід Ушкалов", "uskalov"],
  ["Хоткевич Г.", "hotkevych"],
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

const skovorodaTranslatorsArray = Object.values(skovorodaTranslators);
export const SkovorodaTranslatorsArray = skovorodaTranslatorsArray;
export const SkovorodaTranslators = skovorodaTranslators;
