import { pathJoin, SkovorodaTextsPath, SkovorodaTreatisePath } from "../../skovorodaPath";

export function getTreatiseShortTitle(treatise) {
  if (treatise.shortTitle && treatise.shortTitle.length) {
    return treatise.shortTitle;
  }
  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  if (preferedVersion && preferedVersion.title && preferedVersion.title.length) {
    return preferedVersion.title;
  }
  return treatise.versions[0].title;
}

export function getTreariseRelatedItem(treatise) {
  return {
    href: pathJoin(SkovorodaTreatisePath, treatise.urlId),
    shortName: getTreatiseShortTitle(treatise),
    sourceType: "treatise",
  };
}

export function getReadRelatedItem(read) {
  return {
    href: pathJoin(SkovorodaTextsPath, read.urlId),
    shortName: read.title,
    sourceType: read.type,
  }
}