
export function languagesToShortString(languages) {
  if (!languages || !languages.length) {
    return "";
  }
  const result =  languages.map(language => language.shortName).reduce((result,current) => {
    if (!result) {
      return current;
    }
    return result + ", " + current;
  }, "");
  return `(${result})`;
}

const languagesMap = new Map([
  ["ua", {
    languageName: "Українська",
    shortName: "Укр.",
    id: "ua"
  }],
  ["oldua", {
    languageName: "Староукраїнська",
    shortName: "Староукр.",
    id: "oldua"
  }],
  ["latin", {
    languageName: "Латинська",
    shortName: "Лат.",
    id: "latin"
  }],
]);
export function parseLanguages(languageCodesString) {
  if (!languageCodesString) {
    return [];
  }
  const languageCodes = languageCodesString.split(',');
  return languageCodes.map(languageCode => languagesMap.get(languageCode));
}