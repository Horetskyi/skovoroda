
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
    shortName: "Укр."
  }],
  ["oldua", {
    languageName: "Староукраїнська",
    shortName: "Староукр."
  }],
  ["letin", {
    languageName: "Латинська",
    shortName: "Лат."
  }],
]);
export function parseLanguages(languageCodesString) {
  if (!languageCodesString) {
    return [];
  }
  const languageCodes = languageCodesString.split(',');
  return languageCodes.map(languageCode => languagesMap.get(languageCode));
}