import { gardenPageKey, gardenSelectedPageKey, homePageKey, lettersFromPageKey, lettersPageKey, lettersToPageKey, textsPageKey, treatisePageKey, treatiseSelectedPageKey, utils1PageKey } from "./skovorodaConstants";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath, SkovorodaHomePath, SkovorodaLettersFromPath, SkovorodaLettersPath, SkovorodaLettersToPath, SkovorodaTextsPath, SkovorodaTreatisePath, SkovorodaUtils1Path } from "./skovorodaPath";

const breadcrumbsHrefsMap = new Map([
  [homePageKey.pageKey, SkovorodaHomePath],
  [utils1PageKey.pageKey, SkovorodaUtils1Path],
  [textsPageKey.pageKey, SkovorodaTextsPath],
  [treatisePageKey.pageKey, SkovorodaTreatisePath],
  [treatiseSelectedPageKey.pageKey, SkovorodaTreatisePath],
  [gardenPageKey.pageKey, SkovorodaGardenPath],
  [gardenSelectedPageKey.pageKey, SkovorodaGardenPath],
  [lettersPageKey.pageKey, SkovorodaLettersPath],
  [lettersFromPageKey.pageKey, SkovorodaLettersFromPath],
  [lettersToPageKey.pageKey, SkovorodaLettersToPath],
]);

const breadcrumbsLabelsMap = new Map([
  [homePageKey.pageKey, "Головна сторінка"],
  [utils1PageKey.pageKey, "Development Utils 1"],
  [treatisePageKey.pageKey, "Трактати, Діалоги, Притчі"],
  [textsPageKey.pageKey, "Твори"],
  [gardenPageKey.pageKey, "Сад божественних пісень"],
  [lettersPageKey.pageKey, "Листи"],
]);

function getBreadcrumbLabel(pageKey) {
  const breadcrumLabel = breadcrumbsLabelsMap.get(pageKey);
  if (!breadcrumLabel) {
    throw new Error(`You forgot to implement breadcrumb LABEL for page with key: ${pageKey}`);
  } 
  return breadcrumLabel;
} 

export function getBreadcrumbs(pageProps) {
  const breadcrumbs = [];
  let currentPageKey = pageProps.pageKey;
  while (currentPageKey) {

    const breadcrumHref = breadcrumbsHrefsMap.get(currentPageKey.pageKey);
    if (!breadcrumHref) {
      throw new Error(`You forgot to implement breadcrumb HREF for page with key: ${currentPageKey.pageKey}`);
    } 

    const breadcrumb = { 
      title: pageProps.breadcrumbLabel && !breadcrumbs.length
        ? pageProps.breadcrumbLabel
        : getBreadcrumbLabel(currentPageKey.pageKey), 
      href: pageProps.selectedId && !breadcrumbs.length
        ? pathJoinWithoutEndSlash(breadcrumHref, pageProps.selectedId)
        : breadcrumHref
    };
    breadcrumbs.push(breadcrumb);
    currentPageKey = currentPageKey.parent;
    continue;
  }
  breadcrumbs.reverse();
  if (breadcrumbs && breadcrumbs.length) {
    breadcrumbs.at(-1).isInactive = true;
  }
  return breadcrumbs;
}