
export const SkovorodaHomePath = "/";
export const SkovorodaBioPath = "/bio/";
export const SkovorodaUtils1Path = "/utils1";
export const SkovorodaTextsPath = "/texts/";
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