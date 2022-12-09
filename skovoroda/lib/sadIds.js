
export function getFullSongId(songId, translationId) {
  return "pisnya-" + songId + (translationId ? "-"+translationId : "");
}

export function getOriginalSongId(fullSongId) {
  const idParts = fullSongId.split('-');
  const originalId = idParts[0]+'-'+idParts[1];
  return originalId;
}

export function getSongId(fullSongId) {
  return fullSongId.split("-")[1];;
}

export function getTranslationId(fullSongId) {
  const split = fullSongId.split("-");
  return split.length > 2 ? split[2] : "";
}