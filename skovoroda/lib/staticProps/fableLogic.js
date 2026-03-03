import { getFableLinkTitle, pathJoin, SkovorodaFablesPath } from "../skovorodaPath";

// Auxiliary
export function prepareFablesDropdownItems(allFablesMetadata, selectedTranlsatorId) {
  const set = new Set();
  const result = allFablesMetadata.filter(metadata => {
    if (metadata.translatorId != selectedTranlsatorId) {
      return false; // filter by translator id
    }
    const key = metadata.fableNumber; // distinct by fableNumber
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();

  return result.map(metadata => {
    return {
      value: ""+metadata.fableNumber,
      label: metadata.fableNumber + " – " + metadata.fableTitle,
      urlId: metadata.urlId,
      id: metadata.urlId,
      disabled: false,
      linkTitle: getFableLinkTitle(metadata),
      absoluteUrl: pathJoin(SkovorodaFablesPath, metadata.urlId),
    };
  });
}

// Auxiliary
export function prepareTranslatorsDropdownItems(allFablesMetadata, fableNumber, allTranslators) {
  
  // Example: [ original-fable-3, fedorak-fable-3, shevchuk-fable-3 ]
  const selectedFableTranslations = allFablesMetadata.filter(metadata => metadata.fableNumber == fableNumber);
  
  const seenTranslatorNames = new Set(selectedFableTranslations.map(m => m.translatorName));
  allFablesMetadata.forEach(metadata => {
    if (seenTranslatorNames.has(metadata.translatorName)) {
      return;
    }
    seenTranslatorNames.add(metadata.translatorName);
    // Example: [..., kashuba-fable-1 ]
    selectedFableTranslations.push(metadata);
  });

  const translatorsById = new Map(allTranslators.map(t => [t.translatorId, t]));
  return selectedFableTranslations.map(metadata => {
    const translator = translatorsById.get(Number(metadata.translatorId)) || allTranslators.find(t => t.translatorId == metadata.translatorId);
    return {
      value: ""+translator.translatorId,
      label: translator.fullName3,
      urlId: metadata.urlId,
      id: metadata.urlId,
      disabled: false,
      linkTitle: getFableLinkTitle(metadata),
      absoluteUrl: pathJoin(SkovorodaFablesPath, metadata.urlId),
    };
  });
}
