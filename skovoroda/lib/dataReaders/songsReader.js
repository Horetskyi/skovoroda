import fs from "fs";
import path from "path";
import { skTranslatorsV2 } from "../data/skovorodaTranslators";
import { SkImagesArray } from "../data/images/skImages";
import { metaTextProcessor } from "../metaTextProcessor/metaTextProcessor";

// Filter SkImagesArray for song images (those with songNumber)
const songsImages = SkImagesArray.filter(image => image.songNumber);

function getSongImage(songNumber) {
  songNumber = +songNumber;
  const songImage = songsImages.find(image => image.songNumber == songNumber);
  return songImage ? songImage : null;
}

function getSongId(songMetadata) {
  const baseId = "song-" + songMetadata.number;
  const isOriginal = songMetadata.translatorId === 0;
  if (isOriginal) {
    return baseId;
  }
  const translator = skTranslatorsV2.find(translator => translator.translatorId === songMetadata.translatorId);
  return baseId + "-" + translator.urlId;
}

function readSongs() {
  const gardenDirectoryPath = path.join(process.cwd(), "lib", "data", "gardenRefactored");
  const gardenFileNames = fs.readdirSync(gardenDirectoryPath);
  const allParsedSongs = gardenFileNames.filter(fileName => fileName.includes(".json") && !fileName.includes("Примітки")).map(jsonFileName => {
    
    if (jsonFileName.includes('debug')) return null;

    const jsonFilePath = path.join(gardenDirectoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const songMetadataFileContent = fs.readFileSync(jsonFilePath).toString();
    if (!songMetadataFileContent || !songMetadataFileContent.length) {
      return undefined;
    }
    const songMetadata = JSON.parse(songMetadataFileContent);
    songMetadata.id = getSongId(songMetadata);

    // --- add songImage to songMetadata ---
    songMetadata.songImage = getSongImage(songMetadata.number);
    // ---

    const contentString = fs.readFileSync(txtFilePath).toString();
    const isOriginal = songMetadata.translatorId === 0;
    songMetadata.language = isOriginal ? 'oldua' : 'ua';
    const content = metaTextProcessor(contentString, isOriginal);

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
    
    if (jsonFileName.includes('debug')) return null;

    const jsonFilePath = path.join(directoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const notesMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    const notesString = fs.readFileSync(txtFilePath).toString();
    const notes = metaTextProcessor(notesString);

    if (notes) {
      fs.writeFileSync(path.join(process.cwd(), "lib", "data", "gardenRefactored", 'debug', 
        `debug_notes_${jsonFileName.replace('.json', '')}.txt`), 
        JSON.stringify(notes, null, 2));
    }

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