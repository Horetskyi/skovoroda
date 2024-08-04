
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
    };
  });
}
