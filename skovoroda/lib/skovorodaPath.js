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

export const SkovorodaTextsPath = "/texts/";
export const SkovorodaSadPath = pathJoin(SkovorodaTextsPath, "/garden/");
export const SkovorodaLettersFromPath = pathJoin(SkovorodaTextsPath, "/letters-from/");