export const SkovorodaHomePath = "/";
export const SkovorodaBioPath = "/bio/";
export const SkovorodaAboutUsPath = "/about-us/";
export const SkovorodaContactPath = "/contact/";
export const SkovorodaQuotesPath = "/quotes/";
export const SkovorodaSymbolsPath = "/symbols/";
export const SkovorodaUtils1Path = "/utils1";
export const SkovorodaTextsPath = "/texts/";
export const SkovorodaCopyrightPath = "/copyright/";
export const SkovorodaReadsPath = pathJoin(SkovorodaTextsPath, "/reads/");
export const SkovorodaTreatisePath = pathJoin(SkovorodaTextsPath, "/treatise/");
export const SkovorodaGardenPath = pathJoin(SkovorodaTextsPath, "/garden/");
export const SkovorodaOtherPoemsPath = pathJoin(SkovorodaTextsPath, "/other-poems/");
export const SkovorodaFablesPath = pathJoin(SkovorodaTextsPath, "/fables/");
export const SkovorodaTranslatationsPath = pathJoin(SkovorodaTextsPath, "/translations/");
export const SkovorodaDifferentPath = pathJoin(SkovorodaTextsPath, "/different/");
export const SkovorodaLettersPath = "/letters/";
export const SkovorodaLettersFromPath = pathJoin(SkovorodaLettersPath, "/from/");
export const SkovorodaLettersToPath = pathJoin(SkovorodaLettersPath, "/to/");

export function pathWithoutEndSlash(path) {
  if (path[path.length - 1] === "/") {
    return path.substring(0, path.length - 1);
  }
  return path;
}

export function pathWithStartSlash(path) {
  if (path[0] !== "/") {
    return "/" + path;
  }
  return path;
} 

export function pathJoin(...pathArray) {
  var result = pathArray[0];
  pathArray.forEach((path, index) => {
    if (index === 0) {
      return;
    }
    result = pathWithoutEndSlash(result) + pathWithStartSlash(path); 
  });
  return result;
}

export function pathJoinWithoutEndSlash(...pathArray) {
  return pathWithoutEndSlash(pathJoin(...pathArray));
}

const linkTitles = new Map([
  [SkovorodaHomePath, "Сковорода Григорій Савич"],
  [SkovorodaBioPath, "Біографія Сковороди"],
  [SkovorodaAboutUsPath, "Про нас"],
  [SkovorodaContactPath, "Контакти"],
  [SkovorodaQuotesPath, "Цитати Сковороди"],
  [SkovorodaSymbolsPath, "Символи Сковороди"],
  [SkovorodaUtils1Path, "Інструменти"],
  [SkovorodaCopyrightPath, "Авторське право"],
  [SkovorodaTextsPath, "Твори Сковороди"],
  [SkovorodaTreatisePath, "Трактати Сковороди"],
  [SkovorodaGardenPath, "Сад Божественних Пісень"],
  [SkovorodaOtherPoemsPath, "Поезія Сковороди"],
  [SkovorodaFablesPath, "Байки Харківські"],
  [SkovorodaTranslatationsPath, "Перекладачі"],
  [SkovorodaDifferentPath, "Інше від Сковороди"],
  [SkovorodaLettersPath, "Листи Сковороди"],
  [SkovorodaLettersFromPath, "Листи від Сковороди"],
  [SkovorodaLettersToPath, "Листи до Сковороди"],
]);
export function getLinkTitle(path) {
  return linkTitles.has(path) ? linkTitles.get(path) : "Сковорода Григорій Савич";
}
export function getFableLinkTitle(fableMetadata) {
  return `Байка ${fableMetadata.fableNumber} – ${fableMetadata.fableTitle}`;
}
export function getBioPath(urlId) {
  return pathJoinWithoutEndSlash(SkovorodaBioPath, urlId);
}
export function getTreatisePath(urlId) {
  return pathJoinWithoutEndSlash(SkovorodaTreatisePath, urlId);
}
export function getReadPath(urlId) {
  return pathJoinWithoutEndSlash(SkovorodaReadsPath, urlId);
}