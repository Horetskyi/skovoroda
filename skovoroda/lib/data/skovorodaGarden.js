import fs from "fs";
import path from "path";
import { translatorNamesIdsMap } from "./skovorodaTranslators";
import { parseFileContent } from "./utils/readingTextsUtils";

function getSongId(songMetadata) {
  const isOriginal = songMetadata.translatorType === "Original";
  const originalId = "song-" + songMetadata.number;
  if (isOriginal) {
    return originalId;
  }
  return originalId + "-" + translatorNamesIdsMap.get(songMetadata.translatorName);
}

function readSongs() {
  const gardenDirectoryPath = path.join(process.cwd(), "lib", "data", "gardenRefactored");
  const gardenFileNames = fs.readdirSync(gardenDirectoryPath);
  const allParsedSongs = gardenFileNames.filter(fileName => fileName.includes(".json") && !fileName.includes("Примітки")).map(jsonFileName => {
    
    const jsonFilePath = path.join(gardenDirectoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const songMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    songMetadata.id = getSongId(songMetadata);
    
    const contentString = fs.readFileSync(txtFilePath).toString();
    const content = parseFileContent(contentString);

    return {
      songMetadata: songMetadata,
      songContent: content,
    };
  });
  return allParsedSongs;
}

export const SkovorodaGardenRefactored = {
  allSongs: readSongs(),
  originalGardenName: "Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія"
};