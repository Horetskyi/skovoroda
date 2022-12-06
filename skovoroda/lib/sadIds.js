
export function getFullSongId(songId) {
  return "pisnya-" + songId;
}

export function getOriginalSongId(fullSongId) {
  const idParts = fullSongId.split('-');
  const originalId = idParts[0]+'-'+idParts[1];
  return originalId;
}

export function getSongId(fullSongId) {
  return fullSongId.split("-")[1];;
}