import fs from "fs";
import path from "path";
import { skTranslatorsV2 } from "../data/skovorodaTranslators";
import { parseFileContent } from "../data/utils/readingTextsUtils";
import { SkImagesArray } from "../data/images/skImages";
import { fixText } from "./auxiliary";

const fablesImages = SkImagesArray.filter(image => image.fableNumber);

function getImage(fableNumber) {
  fableNumber = +fableNumber;
  const fableImage = fablesImages.find(image => image.fableNumber == fableNumber);
  return fableImage ? fableImage : null;
}

function readAllFablesInDirectory(directoryName) {
  const directoryPath = path.join(process.cwd(), "lib", "data", "fables", directoryName);
  const fileNames = fs.readdirSync(directoryPath);
  const allParsedItems = fileNames
    .filter(fileName => fileName.includes(".json"))
    .map(jsonFileName => {

      // File 1. "fable 1.json"
      const jsonFilePath = path.join(directoryPath, jsonFileName); 
      
      // File 2. "fable 1.txt"
      const txtFilePath = jsonFilePath.replace(".json", ".txt"); 

      // File 3. "fable 1 power.txt"
      const txtPowerFilePath = jsonFilePath.replace(".json", " power.txt");
     
      let metadataFileContent = fs.readFileSync(jsonFilePath).toString();
      if (!metadataFileContent || !metadataFileContent.length) {
        return undefined;
      }
      metadataFileContent = fixText(metadataFileContent);
      const metadata = JSON.parse(metadataFileContent);
      const translator = skTranslatorsV2.find(translator => translator.translatorId === metadata.translatorId);
      metadata.urlId = `fable-${metadata.fableNumber}-${translator.urlId}`;
      metadata.fableImage = getImage(metadata.fableNumber);
      if (metadata.fableImage) {
        metadata.fableImage.alt = `Байка ${metadata.fableNumber} - ${metadata.fableTitle}`
      }

      let contentString = fs.readFileSync(txtFilePath).toString();
      if (!contentString || !contentString.length) {
        return undefined;
      }
      const content = parseFileContent(contentString);

      const powerContentString = fs.readFileSync(txtPowerFilePath).toString();
      if (!powerContentString || !powerContentString.length) {
        return undefined;
      }
      const powerContent = parseFileContent(powerContentString);

      return {
        metadata: metadata,
        content: content,
        powerContent: powerContent,
      };
    })
    .filter(item => item);

  return allParsedItems;
}

function readNotesInDirectory(directoryName) {
  const fileName = path.join(process.cwd(), "lib", "data", "fables", directoryName, "notes.txt");
  const fileContent = fs.readFileSync(fileName).toString();
  if (!fileContent || !fileContent.length) {
    return null;
  }
  const content = parseFileContent(fileContent);
  return content;
}

function readCommentsInDirectory(directoryName) {
  const directoryPath = path.join(process.cwd(), "lib", "data", "fables", directoryName);
  const fileNames = fs.readdirSync(directoryPath);
  const allComments = fileNames.map(fileName => {
    const filePath = path.join(directoryPath, fileName); 
    const contentString = fs.readFileSync(filePath).toString();
    if (!contentString || !contentString.length) {
      return undefined;
    }
    const content = parseFileContent(contentString);
    return {
      content: content,
      fableNumber: +(fileName.replace('.txt', '')),
    }
  }).filter(item => item);
  return allComments;
}

function readCommonMetadataInDirectory(directoryName) {
  const directoryPath = path.join(process.cwd(), "lib", "data", "fables", directoryName);
  const fileNames = fs.readdirSync(directoryPath);
  const allCommonMetadata = fileNames.map(fileName => {
    const filePath = path.join(directoryPath, fileName); 
    let fileString = fs.readFileSync(filePath).toString();
    if (!fileString || !fileString.length) {
      return undefined;
    }
    fileString = fixText(fileString);
    const metadata = JSON.parse(fileString);
    return metadata;
  }).filter(item => item);
  return allCommonMetadata;
}

export function readAllFables() {

  const directories = ["fedorak", "original"];
  const allNotes = {};
  const allFables = directories
    .map(directory => {
      const fables = readAllFablesInDirectory(directory);
      const notes = readNotesInDirectory(directory);
      allNotes[directory] = notes;
      fables.forEach(fable => {
        fable.metadata.notesId = directory;
      });
      return fables;
    })
    .flat(1);
  const allComments = readCommentsInDirectory("comments");
  const allCommonMetadata = readCommonMetadataInDirectory("commonMetadata");
  return {allFables,allNotes,allComments,allCommonMetadata};
} 