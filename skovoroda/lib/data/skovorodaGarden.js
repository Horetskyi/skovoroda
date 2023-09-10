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
    
    const songMetadataFileContent = fs.readFileSync(jsonFilePath).toString();
    if (!songMetadataFileContent || !songMetadataFileContent.length) {
      return undefined;
    }
    const songMetadata = JSON.parse(songMetadataFileContent);
    songMetadata.id = getSongId(songMetadata);
    
    const contentString = fs.readFileSync(txtFilePath).toString();
    const content = parseFileContent(contentString);

    return {
      songMetadata: songMetadata,
      songContent: content,
    };
  }).filter(x => x);
  return allParsedSongs;
}

function readNotes() {
  const directoryPath = path.join(process.cwd(), "lib", "data", "gardenRefactored");
  const fileNames = fs.readdirSync(directoryPath);
  return fileNames.filter(fileName => fileName.includes(".json") && fileName.includes("Примітки")).map(jsonFileName => {
    
    const jsonFilePath = path.join(directoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const notesMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    const notesString = fs.readFileSync(txtFilePath).toString();
    const notes = parseFileContent(notesString);

    return {
      notes: notes,
      notesMetadata: notesMetadata
    };
  });
}

export const SkovorodaGardenRefactored = {
  allSongs: readSongs(),
  allNotes: readNotes(),
  originalGardenName: "Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія"
};