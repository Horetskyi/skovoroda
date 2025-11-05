import { pathJoin, SkovorodaGardenPath } from "../skovorodaPath";

// Auxiliary
export function prepareGardenSongsDropdownItems(allSongsMetadata, selectedTranlsatorId) {
  const set = new Set();
  const result = allSongsMetadata.filter(metadata => {
    if (metadata.translatorId != selectedTranlsatorId) {
      return false; // filter by translator id
    }
    const key = metadata.number; // distinct by song number
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();

  return result.map(metadata => {
    return {
      value: ""+metadata.number,
      label: metadata.number + " – " + metadata.name,
      urlId: metadata.id,
      id: metadata.id,
      disabled: false,
      linkTitle: metadata.name,
      absoluteUrl: pathJoin(SkovorodaGardenPath, metadata.id),
    };
  });
}

// Auxiliary
export function prepareGardenSongsTranslatorsDropdownItems(allSongsMetadata, number, allTranslators) {
  
  // Example: [ original-fable-3, fedorak-fable-3, shevchuk-fable-3 ]
  const selectedSongTranslations = allSongsMetadata.filter(metadata => metadata.number == number);
  
  allSongsMetadata.forEach(metadata => {
    if (selectedSongTranslations.some(translationMetadata => translationMetadata.translatorName == metadata.translatorName)) {
      return;
    }
    // Example: [..., kashuba-fable-1 ]
    selectedSongTranslations.push(metadata);
  });

  return selectedSongTranslations.map(metadata => {
    const translator = allTranslators.find(translator => translator.translatorId == metadata.translatorId);
    return {
      value: ""+translator.translatorId,
      label: translator.fullName3,
      urlId: metadata.id,
      id: metadata.id,
      disabled: false,
      linkTitle: metadata.name,
      absoluteUrl: pathJoin(SkovorodaGardenPath, metadata.id),
    };
  });
}

// Auxiliary
export function getPreparedSongsTranslationsList(allSongsMetadata) {

  if (!allSongsMetadata || allSongsMetadata.length === 0) return [];
  
  const preferredTranslationsOrder = [2]; // Shevchuk

  const translatedSongsMetadataMap = new Map();

  preferredTranslationsOrder.forEach(preferredTranslationId => {
    allSongsMetadata.forEach(songMetadata => {
      if (songMetadata.translatorId === preferredTranslationId) {
        if (!translatedSongsMetadataMap.has(songMetadata.number)) {
          translatedSongsMetadataMap.set(songMetadata.number, songMetadata); // set preferred translation
        }
      }
    });
  });

  allSongsMetadata.forEach(songMetadata => {
    if (songMetadata.translatorId === 0) return; // skip original
    if (!translatedSongsMetadataMap.has(songMetadata.number)) {
      translatedSongsMetadataMap.set(songMetadata.number, songMetadata); // set any translation
    }
  });

  allSongsMetadata
    .filter(songMetadata => songMetadata.translatorId === 0) // last trial - original
    .forEach(songMetadata => {
      if (!translatedSongsMetadataMap.has(songMetadata.number)) {
        translatedSongsMetadataMap.set(songMetadata.number, songMetadata);
      }
    });

  const translatedSongsMetadataArray = Array.from(translatedSongsMetadataMap.values());
  translatedSongsMetadataArray.sort((a,b) => a.number - b.number);
  return translatedSongsMetadataArray;
}